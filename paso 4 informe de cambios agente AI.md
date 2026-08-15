# PASO 4 — Informe de cambios (Agente AI)

**Fecha:** 14/08/2026
**Fase:** 4 del `PROMPT_INTEGRACION_ABLY_ALARMA_VOZ.md` — Repositorio nuevo para Página B (receptor de alarma)
**Repos involucrados:**
- Página A: proyecto actual (Barrio El Trigal) — solo como fuente de referencia
- Página B: repo NUEVO `barrio-el-trigal-alarma-externa` (https://github.com/Hogans2024/barrio-el-trigal-alarma-externa)
**Estado:** ✅ Completado

---

## 1. Resumen ejecutivo

Se creó desde cero un **proyecto Vite vanilla-TS independiente** (Página B) que escucha en
tiempo real el canal de Ably `barrio-trigal:alarma` y reproduce la sirena vecinal cuando la
Página A la activa. Se subió a un repositorio GitHub nuevo, público, preparado para desplegar
con GitHub Actions + GitHub Pages.

---

## 2. PASO A — Creación del repositorio (vía MCP de GitHub)

- Herramienta: `github_create_repository` (MCP de GitHub instalado y operativo, usuario `Hogans2024`).
- **Nombre:** `barrio-el-trigal-alarma-externa`
- **Visibilidad:** público
- **Descripción:** "Página B — receptor de alarma vecinal en tiempo real vía Ably, Barrio El Trigal"
- **README inicial:** NO se generó automáticamente (se creó uno real más adelante).
- **URL:** https://github.com/Hogans2024/barrio-el-trigal-alarma-externa

---

## 3. PASO B — Construcción local del proyecto

Se construyó primero **en una carpeta temporal separada** (ajena a la del proyecto Página A)
para poder compilar y verificar antes de subir nada:

```
C:\Users\usuario\AppData\Local\Temp\opencode\barrio-el-trigal-alarma-externa\
```

### 3.1 Estructura creada

```
barrio-el-trigal-alarma-externa/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
├── .env.example
├── README.md
├── package-lock.json
├── src/
│   ├── main.ts
│   ├── audioSiren.ts
│   └── ablySubscriber.ts
└── .github/
    └── workflows/
        └── deploy.yml
```

### 3.2 Detalle por archivo

#### `package.json`
- Proyecto Vite vanilla-TS **liviano, SIN React** (Página B no lo necesita).
- `dependencies` (producción): `ably@^2.27.0` (misma familia mayor que Página A).
- `devDependencies`: `typescript@~5.8.2`, `vite@^6.2.3`.
- Scripts: `dev` = `vite`, `build` = `vite build`, `preview` = `vite preview`.

#### `vite.config.ts`
- `base: '/barrio-el-trigal-alarma-externa/'` — ruta del repo en GitHub Pages
  (mismo patrón que `vite.config.ts` de Página A, leído como referencia).

#### `tsconfig.json`
- Estricto (`strict: true`), `target: ES2020`, `moduleResolution: bundler`,
  `lib` con `DOM` + `DOM.Iterable` (Web Audio API + MediaRecorder),
  `types: ["vite/client"]`, `noEmit: true`, `noUnusedLocals/Parameters`.

#### `.gitignore`
- Mismo patrón exacto de Página A: `node_modules/`, `build/`, `dist/`, `.DS_Store`,
  `*.log`, `.env*` con excepción `!.env.example`.

#### `.env.example`
- Plantilla SIN valor real:
  ```
  VITE_ABLY_SUBSCRIBE_KEY="tu-clave-de-suscripcion-aqui"
  ```
- Comentario explicando que en producción la inyecta GitHub Actions desde el
  secret `ABLY_SUBSCRIBE_KEY`.

#### `src/audioSiren.ts`
- **COPIA LITERAL, carácter por carácter**, de `src/components/AudioSiren.ts` de Página A.
- Método: comparación byte a byte + copia directa por sistema de archivos
  (`Copy-Item`) para garantizar igualdad exacta (3993 bytes, 136 líneas).
- Se verificó línea a línea contra el original tras el push: **idéntico**.
- NO se reescribió ni se "mejoró" el sonido (exigencia de la sección 7 del prompt).

#### `src/ablySubscriber.ts`
- Usa **`Ably.Realtime`** (NO REST) — Página B necesita conexión persistente.
- Lee la key desde `import.meta.env.VITE_ABLY_SUBSCRIBE_KEY` (con guard de
  ausencia + `console.warn`).
- **Idempotencia por `sirenId`** exacta al ejemplo del prompt:
  - `activar_alarma`: ignora si ya está sonando el mismo `sirenId` (reenvío tras reconexión).
  - `desactivar_alarma`: ignora si el `sirenId` no coincide con el activo.
- Expone **callbacks de estado de conexión** (`connected`, `disconnected`,
  `connecting`, `suspended`) a través del segundo parámetro `onEstadoConexion`,
  para que `main.ts` pinte el indicador.
- Comentarios en español, sin `any` (tipos explícitos con `as { sirenId?: string }`).

#### `src/main.ts`
- Punto de entrada que arma la UI mínima exigida:
  - Estado grande y visible: **"En espera"** ↔ **"🚨 ALARMA ACTIVA"** (clase que
    pulsa en rojo cuando está activa).
  - **Indicador de conexión**: "Conexión: Conectado / Desconectado / Conectando… / Suspenso"
    con estilo verde (ok) / rojo (fallo).
  - **Botón "🔊 Habilitar Alarma Externa"** (CRÍTICO para autoplay): al hacer click
    desbloquea el `AudioContext` (gesto de usuario) y **recién ahí** llama a
    `iniciarEscuchaAlarma()`. Sin este botón el navegador bloquearía la sirena
    silenciosamente en producción.
  - **Botón "Silenciar sonido local"** (opcional): corta el audio SOLO en ese
    dispositivo, no publica nada a Ably.
- HTML/CSS/TS plano inyectado desde `index.html`, sin frameworks.
- Fondo oscuro, tipografía grande, colores de alerta claros (rojo activo /
  verde en espera) — legible a distancia.

#### `index.html`
- HTML mínimo, `<title>Página B — Alarma Externa Barrio El Trigal</title>`,
  CSS en línea (dark theme), carga `/src/main.ts` como módulo.

#### `.github/workflows/deploy.yml`
- Dispara en push a `main` (y `workflow_dispatch`).
- `npm ci` + `npm run build` con la variable inyectada:
  ```yaml
  env:
    VITE_ABLY_SUBSCRIBE_KEY: ${{ secrets.ABLY_SUBSCRIBE_KEY }}
  ```
- Publica `dist/` con las actions oficiales modernas:
  `actions/checkout@v5`, `actions/setup-node@v5` (Node 24),
  `actions/configure-pages@v5`, `actions/upload-pages-artifact@v5`,
  `actions/deploy-pages@v5`.

#### `README.md`
- Español: qué es, que es el receptor Ably de la alarma de Barrio El Trigal,
  cómo correr en local (requiere `.env.local` con `VITE_ABLY_SUBSCRIBE_KEY`),
  deploy automático vía GitHub Actions al hacer push a `main`.

### 3.3 Verificación local ANTES de subir

| Chequeo | Resultado |
|---|---|
| `npm install` | ✅ 55 paquetes, 0 vulnerabilidades |
| `npm run build` (Vite) | ✅ Éxito, 10 módulos, 2.08s |
| `npx tsc --noEmit` (typecheck estricto) | ✅ 0 errores (tras agregar `"types": ["vite/client"]`) |
| Comparación `audioSiren.ts` vs original | ✅ byte a byte idéntico (3993 bytes, 136 líneas) |

---

## 4. PASO C — Subida a GitHub

### 4.1 Primer commit (vía MCP `github_push_files`)
- Mensaje: **"Setup inicial Página B: receptor Ably + sirena + UI mínima"**
- Commit: `f9eb1a5` — subió los 10 archivos de la estructura (incluidos
  `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json`, `.gitignore`,
  `.env.example`, `README.md`, `src/main.ts`, `src/ablySubscriber.ts`,
  `src/audioSiren.ts`, `.github/workflows/deploy.yml`).

### 4.2 Segundo commit (vía git CLI) — `package-lock.json`
- **Motivo:** el workflow usa `npm ci`, que **falla si no existe `package-lock.json`**.
  Este archivo NO se había incluido en el primer push (archivo generado por npm,
  grande). Sin él, el deploy en GitHub Actions rompería en el paso "Install dependencies".
- Método: clone local del repo + `git add` + `git commit` + `git push`.
- Commit: `0615cc1` — "Agregar package-lock.json (requerido por npm ci en el workflow)".

### 4.3 Tercer commit (vía git CLI) — ajuste `audioSiren.ts`
- **Motivo:** el MCP de GitHub normaliza saltos de línea, por lo que el blob subido
  quedó en 3992 bytes vs 3993 del original. Se reemplazó con la copia byte a byte
  exacta vía git CLI.
- Commit: `5d226e7` — "audioSiren.ts: copia byte a byte exacta del original de Página A".
- Verificación posterior: **136 líneas idénticas al original** ✅

### 4.4 Estado final del repositorio (rama `main`)

Archivos confirmados vía API de GitHub:
```
.env.example
.gitignore
README.md
index.html
package.json
package-lock.json
tsconfig.json
vite.config.ts
.github/workflows/deploy.yml
src/ablySubscriber.ts
src/audioSiren.ts
src/main.ts
```

Historial de commits:
```
5d226e7  audioSiren.ts: copia byte a byte exacta del original de Página A
0615cc1  Agregar package-lock.json (requerido por npm ci en el workflow)
f9eb1a5  Setup inicial Página B: receptor Ably + sirena + UI mínima
5db20d3  Initial commit (generado por GitHub)
```

---

## 5. Seguridad verificada

- ✅ **NO se subió ningún archivo `.env` ni `.env.local`** — solo `.env.example`
  (plantilla sin valor real). La clave de suscripción nunca viaja al repositorio.
- ✅ El `.gitignore` bloquea `.env*` (excepto `.env.example`).
- ✅ En producción, la clave se inyecta desde el **GitHub Actions Secret**
  `ABLY_SUBSCRIBE_KEY` (referenciado en `deploy.yml`, no versionado).

---

## 6. ⚠️ Pasos manuales pendientes del dueño (no automatizables por código/MCP)

Antes de que Página B funcione en producción:

1. **Crear el Secret `ABLY_SUBSCRIBE_KEY`** en el repo
   → Settings → Secrets and variables → Actions → New repository secret
   → pegar la clave `pagina-b-subscribe-only` de Ably.
2. **Activar GitHub Pages**
   → Settings → Pages → Source → **"GitHub Actions"**.

Con eso, el próximo `push` a `main` (o `workflow_dispatch`) compilará y desplegará
Página B automáticamente.

---

## 7. Archivos modificados/creados en este paso

| Recurso | Acción |
|---|---|
| Repo `barrio-el-trigal-alarma-externa` | **Creado** (público) vía MCP GitHub |
| `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json`, `.gitignore`, `.env.example`, `README.md`, `.github/workflows/deploy.yml` | **Creados y subidos** (commit `f9eb1a5`) |
| `src/ablySubscriber.ts`, `src/main.ts` | **Creados y subidos** (commit `f9eb1a5`) |
| `src/audioSiren.ts` | **Creado** (copia literal) — commit `f9eb1a5` + ajuste byte a byte en `5d226e7` |
| `package-lock.json` | **Generado por npm y subido** (commit `0615cc1`) — requisito de `npm ci` |
| Carpeta temporal local `...\Temp\opencode\barrio-el-trigal-alarma-externa` | Construcción/verificación previa (no se sube) |

---

## 8. Siguiente paso

**Fase 5 — Validación end-to-end (checkpoint obligatorio antes de la Fase 6):**
1. Abrir Página A y Página B simultáneamente (dos pestañas o dispositivos).
2. Activar desde Página A → Página B suena en ~1-2 s.
3. "Siren Silenciada" en Página A → Página B sigue sonando (son independientes).
4. Desactivar (manual o countdown) → Página B se apaga en sincronía.
5. Decidir (junto al dueño) si se desea mecanismo de "estado actual" al reconectar
   (`channel.history()` de Ably) — NO implementar por defecto.

**La Fase 6 (voz push-to-talk) NO se implementó** — quedará para después del checkpoint.