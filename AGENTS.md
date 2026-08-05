# AGENTS.md — Barrio El Trigal

App web comunitaria (React 19 + TypeScript + Vite 6 + Tailwind CSS v4) para la asociación vecinal del Barrio El Trigal, Tarija, Bolivia. SPA de pestañas, sin router. Hosting: GitHub Pages (`base: '/barrio-el-trigal/'`). Repo: `Hogans2024/barrio-el-trigal`.

## Instrucciones maestras
- `PROMPT_MAESTRO_v2.md` (raíz) es la **única fuente de verdad** del proyecto (contrato completo: roles, arquitectura CMS, reglas absolutas, formato de trabajo). Este `AGENTS.md` es solo un resumen operativo rápido. Donde ambos difieran, prevalece `PROMPT_MAESTRO_v2.md`.
- ⚠ `Como_debes_trabajar.md` (raíz) está **SUPERSEDIDO** por `PROMPT_MAESTRO_v2.md`. Se conserva en el repo únicamente como historial; no se usa como fuente de reglas.
- El proyecto está en **Fase Frontend**: NO se toca `Code.gs` ni Google Sheets.

## Comandos
- `npm run dev` — Vite (puerto 3000). Para la ruta de producción: `npx vite --port 5173 --base /barrio-el-trigal/`.
- `npm run lint` — **NO es ESLint**: es `tsc --noEmit` (typecheck). No hay test runner ni linter de estilo. Verificación = `npm run lint` + `npm run build`.
- `npm run build` → `dist/`. El deploy lo hace GitHub Actions (node 24, `npm ci`).

## Quirk de Windows (servidor dev)
El shell tool mata procesos de larga duración al cumplirse el timeout. Para dejar Vite corriendo, usa `INICIAR_SERVIDOR_SIN_SHELL_TOOLS.bat` o `Start-Process -WindowStyle Hidden` (ver `SOLUCION_SERVIDOR.md`). No asumas que `npm run dev` queda vivo tras el comando.

## Arquitectura (no evidente desde los nombres)
- `src/hooks/useSheetData.ts` es el ÚNICO punto de integración CMS. Hoy está bloqueado: **BLOQUE A** (FALLBACK local) activo, **BLOQUE B** (fetch de `data.json`) comentado. Farmacias, Negocios y Mascotas están en fallback **intencionalmente** (la hoja Sheets no tiene aún los campos extendidos). No "arreglarlo" sin orden explícita.
- `public/data.json` es el archivo maestro generado por Apps Script. No editarlo manualmente para producción.
- `AfiliacionView.tsx` usa **Google Auth real + doPost a Apps Script** (producción). Alto riesgo: no romperlo.
- Dos universos de tipos separados a propósito: `src/types.ts` (CMS real) vs `src/types.alarma.ts` (Alarma/Afiliación mock). **No mezclarlos** ni duplicar tipos.
- Los componentes reciben datos por **props desde App.tsx**; nunca llaman a `useSheetData` directamente.
- Alias `@` configurado apunta a la **raíz** del repo (no a `src/`). El código usa imports relativos; no uses `@/`.

## Comentarios orientados al CMS (obligatorio)
Usa estos tags al tocar datos que vendrán del CMS:
- `CMS_READY` → el campo existe en el tipo pero aún viene del fallback local.
- `CMS_PENDING` → el campo/hoja aún no existe en Sheets (pendiente de crear).
- `CMS_CONNECTED` → el campo ya viene del CMS; no renombrar la prop.

NUNCA borres marcadores previos (`WORKAROUND`, `MIGRACIÓN FUTURA`, `CAMPO PENDIENTE DE CMS`).

## Reglas de código
- Assets: siempre `${import.meta.env.BASE_URL}...`; nunca `/logo.svg` ni `./logo.svg`.
- Usa optional chaining (`?.`) y valores por defecto explícitos para campos que el CMS puede no enviar.
- `any` prohibido, salvo en la función de merge del BLOQUE B de `useSheetData.ts`.
- `FileList`: usa `Array.from(fileList)` (conflicto `@types/node` vs `lib.dom`).
- Navegación: `navigateToTab(id)` o `window.dispatchEvent(new CustomEvent('navigate', { detail: id }))`. Nunca react-router ni `window.location`.
- El scroll vive en `<main>`, no en `<body>`: no uses `position: fixed` dentro de componentes hijos; los modales usan `fixed` con `z-50`+ y overlay oscuro.
- Estilos con variables de `src/index.css`: `brand-yellow`, `brand-green`, `brand-red`, `surface-charcoal`, `bg-dark`. Breakpoints custom: `xs:` (≥480px) y `tall:` (≥700px de alto).

## Seguridad — no alarmar
`CLIENT_ID` y `APPS_SCRIPT_URL` en `AfiliacionView.tsx` son **públicas por diseño** (Google Identity Services + Web App de Apps Script con verificación JWT en el backend). No las muevas a `.env`, no las elimines ni las comentes. Antes de reportar una "credencial expuesta", evalúa si la tecnología fue diseñada para llevarla en el frontend.

## Reglas duras
- NUNCA push a GitHub sin instrucción explícita y por escrito del dueño.
- NUNCA tocar `Code.gs`, Google Sheets ni `FILE_PATH = 'public/data.json'`.
- NUNCA conectar `AlarmaView` al CMS (usa datos propios de `data.alarma.ts`).
- NUNCA modificar `useSheetData.ts` salvo que se indique reconectar el CMS.

## Convenciones
- Datos mock: constantes `SCREAMING_SNAKE_CASE` en `src/data.ts` (CMS) y `src/data.alarma.ts` (Alarma).
- localStorage: claves `barrio_[seccion]_[tipo]` (ej: `barrio_negocios_extra`, `barrio_vecinos`); IDs locales `custom_biz_<ts>`, `custom_pet_<ts>`.
- Iconos vía `lucide-react`; el campo `icon` es string snake_case resuelto en el componente.
- Animaciones vía `motion/react` (paquete `motion`).
- Cada versión/feature se documenta en un `version_*.md` en la raíz (español).
- Respuestas y preguntas al dueño en español.
