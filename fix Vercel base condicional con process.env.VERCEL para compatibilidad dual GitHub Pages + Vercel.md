# Fix Vercel: base condicional con process.env.VERCEL para compatibilidad dual GitHub Pages + Vercel

## Fecha
2026-08-01

## Autor
Agente de IA (opencode) bajo dirección del dueño del proyecto.

---

## 1. Contexto

El proyecto **"Barrio El Trigal"** (React 19 + TypeScript + Vite + Tailwind CSS v4) vive en el repositorio `Hogans2024/barrio-el-trigal` y se despliega en **GitHub Pages** bajo la subruta `/barrio-el-trigal/`.

El dueño importó el proyecto a **Vercel** (cuenta nueva conectada vía GitHub, tecnología detectada automáticamente como "Vite"). El build en Vercel terminaba **sin errores** ("Build Completed", "Deployment completed"), pero la URL de Vercel cargaba una **página en blanco**.

## 2. Problema detectado

Al inspeccionar la consola del navegador (F12 → Console) en la página desplegada en Vercel, aparecían estos errores:

```
/barrio-el-trigal/assets/index-CiJ75hoz.js:1  Failed to load resource: 404
/favicon.ico:1  Failed to load resource: 404
index-CeEH6Gj5.css:1  Failed to load resource: 404
```

Los Build Logs de Vercel confirmaban que los archivos se generaban correctamente en la raíz de `dist`:

```
dist/index.html                   0.83 kB
dist/assets/index-CeEH6Gj5.css  109.59 kB
dist/assets/index-CiJ75hoz.js   878.40 kB
✓ built in 4.19s
Build Completed in /vercel/output [12s]
```

(El warning "chunks larger than 500 kB" es solo una recomendación de optimización de Rollup/Vite, **no es la causa**.)

### Conclusión del diagnóstico

El `index.html` generado apuntaba a `/barrio-el-trigal/assets/...`, ruta que **no existe en Vercel** (que sirve desde la raíz del dominio). Al no cargar ni el JS ni el CSS, React nunca monta la app → **página en blanco**.

### Causa raíz

El archivo `vite.config.ts` tenía la propiedad `base` con un valor fijo:

```ts
base: '/barrio-el-trigal/',
```

- **Necesario para GitHub Pages** (sirve desde `usuario.github.io/barrio-el-trigal/`).
- **Incorrecto para Vercel** (sirve desde la raíz `proyecto.vercel.app/`).

---

## 3. Solución implementada

Hacer que el valor de `base` sea **condicional según el entorno de build**, usando la variable de entorno `process.env.VERCEL`.

### Archivo modificado

`vite.config.ts` (raíz del proyecto) — única línea modificada.

### Antes

```ts
base: '/barrio-el-trigal/',
```

### Después

```ts
base: process.env.VERCEL ? '/' : '/barrio-el-trigal/',
```

### Archivo final (contexto completo)

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.VERCEL ? '/' : '/barrio-el-trigal/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```

### ¿Por qué es segura y no rompe GitHub Pages?

- `process.env.VERCEL` **no es** una variable que el usuario configura ni un `.env` subido al repo. La inyecta **Vercel automáticamente** en su infraestructura de build cada vez que ejecuta `npm run build` / `vite build`. Solo existe dentro de los servidores de Vercel.
- Tabla de comportamiento por entorno:

| Dónde se compila | ¿Existe `process.env.VERCEL`? | `base` resultante |
|---|---|---|
| Servidores de Vercel | ✅ Sí (inyectada automáticamente) | `/` |
| Computadora local del usuario | ❌ No | `/barrio-el-trigal/` |
| GitHub Actions (para GitHub Pages) | ❌ No | `/barrio-el-trigal/` |

- El flujo de GitHub Pages (build local o vía GitHub Action) **nunca define esa variable**, por lo que `base` sigue siendo `/barrio-el-trigal/` exactamente como funcionaba. **No se tocó nada de GitHub** (ni secretos ni workflows).
- Es un cambio de **una sola línea** en **un único archivo**. Ningún plugin, alias o configuración de servidor se vio afectado.

---

## 4. Revisión adicional realizada (sin modificar nada)

### 4.1 Rutas absolutas hardcodeadas con `/barrio-el-trigal/`

Se buscó en `src/` y en todo el repo:

```
rg "['\"`]/barrio-el-trigal/"
```

**Resultado:** la única coincidencia es el propio `vite.config.ts` (el fallback de la línea modificada). **No hay** rutas hardcodeadas en el código fuente.

### 4.2 Assets del proyecto

Los assets ya usan `import.meta.env.BASE_URL` correctamente:

- `src/App.tsx` → `src={`${import.meta.env.BASE_URL}logo_01.svg`}` (4 ocurrencias: líneas 326, 464, 515, 764).
- `src/hooks/useSheetData.ts` → `const url = \`${import.meta.env.BASE_URL}data.json?v=${Date.now()}\`;` (línea 102).

Esto garantiza que los assets sigan el `base` de cada entorno automáticamente (Vercel → `/logo_01.svg`; GitHub Pages → `/barrio-el-trigal/logo_01.svg`). **No requirieron cambios.**

### 4.3 React Router

Se buscó `<BrowserRouter>`, `Router` y `basename` en `src/`.

**Resultado:** el proyecto **no usa React Router**. Es una SPA de pestañas propia (`navigateToTab(id)` y eventos `navigate`). Por lo tanto **no aplica** ningún ajuste de `basename`.

### 4.4 index.html

El `<script type="module" src="/src/main.tsx">` (entry point) usa una ruta absoluta, pero **Vite la reescribe automáticamente** según el `base` durante el build, así que no requiere cambio manual.

---

## 5. Resumen de cambios

| Archivo | Línea | Antes | Después |
|---------|-------|-------|---------|
| `vite.config.ts` | 8 | `base: '/barrio-el-trigal/',` | `base: process.env.VERCEL ? '/' : '/barrio-el-trigal/',` |

**Total: 1 archivo modificado, 1 línea modificada (1 inserción, 1 eliminación).**

---

## 6. Commits relacionados

| Commit | Mensaje | Contenido |
|--------|---------|-----------|
| `dc5794d` | Antes de usar la variable de Entorno Vercel | Documento de versión `version_0.2.17_imagen_modal_global_cuadrado_1x1_y_16x9_h36_sin_transiciones.md` |
| `9fa1fb7` | fix Vercel: base condicional con process.env.VERCEL para compatibilidad dual GitHub Pages + Vercel | El cambio de `vite.config.ts` |

---

## 7. Criterio de éxito

- El despliegue en Vercel carga la aplicación correctamente (sin página en blanco).
- La consola del navegador ya no muestra errores 404 para `/barrio-el-trigal/assets/...` en el dominio de Vercel.
- El sitio en GitHub Pages sigue funcionando exactamente igual que antes del cambio.

---

## 8. Cómo verificar tras el próximo despliegue

1. En Vercel, abrir los Build Logs del nuevo deployment y confirmar que el `index.html` apunta a `/assets/...` (sin el prefijo `/barrio-el-trigal/`).
2. Abrir la URL de Vercel con F12 → Console: no deben aparecer los 404 de `/barrio-el-trigal/assets/...`.
3. Abrir la URL de GitHub Pages (`https://hogans2024.github.io/barrio-el-trigal/`) y confirmar que carga igual que siempre.
