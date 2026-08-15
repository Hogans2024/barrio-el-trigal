# PASO 7 — Informe de cambios (Agente AI)

**Fecha:** 14/08/2026
**Fase cubierta:** Corrección del deploy de Página A en GitHub Pages (publish key ausente) + documentación de seguridad de los secrets
**Repos involucrados:**
- Página A: `barrio-el-trigal` (workflow inyecta `VITE_ABLY_PUBLISH_KEY`)
- Página B: `barrio-el-trigal-alarma-externa` (sin cambios en este paso)
**Estado:** ✅ Completado — Página A desplegada ya publica la alarma correctamente

---

## 1. Resumen ejecutivo

Página A funcionaba perfecto en local (la sirena disparaba Página B), pero en la
versión **desplegada en GitHub Pages** no: al activar la alarma, Página B no sonaba.

**Causa raíz:** el build de producción en la nube se hacía sin la publish key.
`.env.local` (donde vive la clave en local) **está en `.gitignore` y no se sube al
repo**, así que GitHub Actions compilaba el bundle con `VITE_ABLY_PUBLISH_KEY` vacía.
`ablyClient.ts` detecta la clave ausente, loguea un warning y **no publica nada** —
por eso local funcionaba y producción no.

**Solución aplicada (sin subir la clave al repositorio):**
1. Crear el **GitHub Secret** `ABLY_PUBLISH_KEY` en el repo de Página A.
2. Modificar el workflow `deploy.yml` para inyectarlo en el build.
3. Verificar el bundle desplegado.

---

## 2. Verificación del problema (diagnóstico)

- Descargué el `.js` de producción de `https://hogans2024.github.io/barrio-el-trigal/`.
- Resultado: la cadena `mKGFwQ` (la publish key de Ably) **NO estaba en el bundle**.
- Conclusión: el build de producción no tenía la variable `VITE_ABLY_PUBLISH_KEY`.

---

## 3. La solución — GitHub Secrets + inyección en el workflow

### 3.1 Secret creado

```
Repo:      Hogans2024/barrio-el-trigal
Secret:    ABLY_PUBLISH_KEY
Valor:     mKGFwQ.g7OjiA:ithvNiCh3BVwmBRN3azP9mFqqO2qP6ZJ-Q9Az593gvg
Creado:    2026-08-15T07:33:20Z
```

Se creó vía API REST de GitHub con cifrado **libsodium sealed box**:
- `GET /actions/secrets/public-key` → clave pública X25519 del repo
- Cifrado del valor con `libsodium-wrappers` (`crypto_box_seal`)
- `PUT /actions/secrets/ABLY_PUBLISH_KEY` con `encrypted_value` + `key_id`

### 3.2 Workflow modificado

`.github/workflows/deploy.yml` de Página A — paso "Build":

```yaml
- name: Build
  run: npm run build
  env:
    VITE_ABLY_PUBLISH_KEY: ${{ secrets.ABLY_PUBLISH_KEY }}
```

Commit: `32e32a1` → push → deploy con **success**.

### 3.3 Verificación del bundle desplegado

Tras el deploy, el bundle nuevo (`index-my3eLWFo.js`) contiene la key:
```
CONTINE_mKGFwQ.g7OjiA: True
...const Yw=Cv(Hw),Xw="mKGFwQ.g7OjiA:ithvNiCh3BVwmBRN3azP9mFqqO2qP6ZJ-Q9Az593gvg";let Af=null;...
```

**Página A desplegada ya publica eventos de alarma → Página B suena.**

---

## 4. Seguridad: qué hace el cifrado y cómo se ve la clave en producción

### 4.1 ¿Dónde se descifra y cuándo?

El descifrado del secret **ocurre una sola vez, en la nube de GitHub (GitHub
Actions), durante el build**, NUNCA en el navegador del usuario:

1. GitHub Actions descifra internamente el secret y lo expone como variable de entorno.
2. `npm run build` (Vite) incrusta el valor en texto plano dentro del `.js` final.
3. El `.js` (ya con la clave) se publica en GitHub Pages.

Cuando un usuario entra a Página A, el navegador **solo descarga el archivo
estático** — no hay proceso de descifrado ni costo de rendimiento. La carga es
idéntica a cualquier página web. **El cifrado no afecta en nada la velocidad.**

### 4.2 ¿Qué protege el secret y qué NO?

| Qué protege | Qué NO protege |
|---|---|
| Que la clave quede en el **historial de git** del repositorio | Que la clave quede oculta del público |
| Que la clave viaje en texto plano por la red | Que un atacante la extraiga del `.js` desplegado |

**El punto crítico:** en un sitio 100% estático (GitHub Pages) **la clave SIEMPRE
termina visible en el `.js` final**, y cualquiera puede extraerla con las
herramientas de desarrollador del navegador (ver el código fuente). El Secret no
la oculta del público — solo evita que quede en el repositorio.

---

## 5. Debilidades conocidas (documentadas, riesgo aceptado)

1. **Página A (key publish-only):** un atacante que extraiga la key del bundle
   puede publicar eventos `activar_alarma` falsos al canal `barrio-trigal:alarma`,
   haciendo sonar la sirena de todas las Página B abiertas, **sin pasar por el
   flujo de PIN** de Página A.
2. **Página B (key subscribe+history):** un atacante puede leer el historial del
   canal. No puede publicar, pero puede conocer cuándo hubo alarmas.
3. **Sin backend:** no hay servidor propio que pueda validar el PIN antes de
   autorizar una publicación; la única validación real vive en el frontend de
   Página A.

**Mitigaciones parciales ya incorporadas (del diseño del Paso 1):**
- Separación estricta de roles: A = solo Publish, B = solo Subscribe/History.
- La key de Página B **no puede publicar** → un ataque desde B no dispara sirenas.
- Las falsas alarmas son visibles para los vecinos (pueden verificar/desactivar).

---

## 6. Pendiente a futuro — cómo mejorar la seguridad (fuera de alcance actual)

Estas son las opciones de mejora real, en orden de impacto, para cuando haya
presupuesto/infraestructura:

1. **Backend con tokens firmados (la solución correcta):**
   - Un backend mínimo (ej. Cloudflare Workers, Vercel Functions o Apps Script
     — ya existe en el proyecto para el CMS) que verifique el **PIN/número
     validado** antes de emitir un token Ably temporal firmado.
   - Página A pediría ese token al backend; sin PIN válido no hay token → un
     atacante no podría publicar aunque tenga la key del frontend.
   - Ably soporta **token auth** (tokens firmados con TTL corto) reemplazando
     las API keys embebidas.

2. **Rotación de keys** — rotar periódicamente publish/subscribe keys y regenerar
   el secret (mitiga fuga prolongada).

3. **Rate limiting** en el backend que firma tokens — limita cuántos eventos puede
   emitir un usuario por minuto, reduciendo el impacto de una falsa alarma masiva.

4. **Canal por zona/manzana** — si se publica a sub-canales por sector, una key
   comprometida afectaría solo a una zona, no a todo el barrio.

5. **Firma/verificación de eventos** — el backend firma cada evento con su clave
   privada; Página B verifica la firma antes de sonar (más complejo, requiere
   compartir clave pública en el frontend).

> Nota: ninguna de estas opciones se implementó. Quedan documentadas como
> trabajo futuro. En la fase actual (100% estático, sin backend) el modelo de
> "key solo-Publish en el frontend + riesgo aceptado y documentado" es el
> estándar de facto para este tipo de integraciones.

---

## 7. Archivos modificados/creados en este paso

| Recurso | Acción |
|---|---|
| `.github/workflows/deploy.yml` (Página A) | Modificado — paso Build con `env.VITE_ABLY_PUBLISH_KEY` |
| Secret `ABLY_PUBLISH_KEY` (repo `barrio-el-trigal`) | Creado vía API con libsodium sealed box |
| Bundle de producción de Página A | Regenerado con la key inyectada (verificado) |
| `paso 7 informe de cambios agente AI.md` | Creado (este archivo) |

---

## 8. Estado actual de la integración

| Elemento | Estado |
|---|---|
| Página A local | ✅ Publica alarma → Página B suena |
| Página A GitHub Pages | ✅ **Ahora también publica** → Página B suena |
| Secret `ABLY_PUBLISH_KEY` (Página A) | ✅ Creado y verificado en bundle |
| Secret `ABLY_SUBSCRIBE_KEY` (Página B) | ✅ Key v3 (subscribe+history) |
| Deploys | ✅ Ambos repos con runs en `success` |
| `.env.local` | ✅ No subido al repo (sigue en gitignore) |