# Lista de Módulos Node del Proyecto — CMS Barrio El Trigal

> Documento generado el 2026-06-25. Detalla cada módulo/dependencia declarado en `package.json` y su propósito en este CMS.

---

## 1. Contexto del proyecto

**Barrio El Trigal** es una aplicación web comunitaria / panel vecinal para el Barrio El Trigal, Zona Sur de Tarija (Bolivia). Funciona como un **CMS de contenido vecinal**: los administradores editan la información en **Google Sheets** y un **Google Apps Script** sincroniza los datos a `public/data.json`, que el frontend consume en tiempo de ejecución.

| Aspecto | Detalle |
|---|---|
| **Stack frontend** | Vite 6 + React 19 + TypeScript 5.8 + Tailwind CSS v4 |
| **Backend real** | Serverless — Google Apps Script (`apps-script/Code.gs`) + Google Sheets como base de datos |
| **Despliegue** | SPA estática en GitHub Pages (`base: '/barrio-el-trigal/'`) |
| **Sistema de módulos** | `"type": "module"` (ESM nativo) |
| **Secciones del CMS** | Alarma Vecinal, Proyectos, Eventos, Farmacias de turno, Negocios locales, Mascotas perdidas, Afiliación |

> ⚠️ **Importante:** El backend NO es un servidor Node. Es Google Apps Script. Por eso, varias dependencias de Node que aparecen en el `package.json` son **herencia del scaffold de Google AI Studio** y no se usan realmente (ver sección 6).

---

## 2. Resumen de dependencias (18 paquetes)

| # | Módulo | Versión | Tipo | Categoría de uso real |
|---|---|---|---|---|
| 1 | `react` | `^19.0.1` | dep | ✅ Activo en runtime |
| 2 | `react-dom` | `^19.0.1` | dep | ✅ Activo en runtime |
| 3 | `lucide-react` | `^0.546.0` | dep | ✅ Activo en runtime |
| 4 | `vite` | `^6.2.3` | dep + dev | ✅ Build/configuración |
| 5 | `@vitejs/plugin-react` | `^5.0.4` | dep | ✅ Build/configuración |
| 6 | `@tailwindcss/vite` | `^4.1.14` | dep | ✅ Build/configuración |
| 7 | `tailwindcss` | `^4.1.14` | dev | ✅ Build/configuración |
| 8 | `typescript` | `~5.8.2` | dev | ✅ Build/configuración |
| 9 | `@types/node` | `^22.14.0` | dev | ✅ Build/configuración |
| 10 | `esbuild` | `^0.25.0` | dev | 🔧 Soporte pasivo |
| 11 | `tsx` | `^4.21.0` | dev | 🔧 Soporte pasivo |
| 12 | `autoprefixer` | `^10.4.21` | dev | 🔧 Soporte pasivo |
| 13 | `@google/genai` | `^2.4.0` | dep | ❌ No usado (herencia AI Studio) |
| 14 | `express` | `^4.21.2` | dep | ❌ No usado (herencia AI Studio) |
| 15 | `dotenv` | `^17.2.3` | dep | ❌ No usado (herencia AI Studio) |
| 16 | `motion` | `^12.23.24` | dep | ❌ No usado (herencia AI Studio) |
| 17 | `@types/express` | `^4.17.21` | dev | ❌ No usado (herencia AI Studio) |

> `vite` aparece duplicado en `dependencies` y `devDependencies`, patrón común para anclar la versión del CLI.

---

## 3. Módulos activos en runtime (se importan en `src/`)

Estos son los **únicos** módulos que el bundle del navegador carga en producción.

### 3.1 `react` — `^19.0.1`
**Propósito:** Núcleo del framework de UI. Base para todos los componentes funcionales y hooks de estado/ciclo de vida de la SPA.

**Dónde se usa (ejemplos):**
- `src/main.tsx` → `import { StrictMode } from 'react';`
- `src/App.tsx` → `import React, { useState, useEffect, useRef } from 'react';`
- `src/hooks/useSheetData.ts` → `import { useState, useEffect } from 'react';`
- Todos los componentes de `src/components/*View.tsx` importan `useState`, `useEffect`, `useRef`.

### 3.2 `react-dom` — `^19.0.1`
**Propósito:** Renderiza el árbol de React al DOM del navegador.

**Dónde se usa:**
- `src/main.tsx` → `import { createRoot } from 'react-dom/client';` — monta `<App/>` en el contenedor `#root`.

### 3.3 `lucide-react` — `^0.546.0`
**Propósito:** Librería de iconos SVG (tree-shakeable). Proporciona toda la iconografía del panel: navegación, badges, encabezados de sección y botones de acción.

**Dónde se usa (selección de iconos por componente):**
| Archivo | Iconos usados |
|---|---|
| `src/App.tsx` | `Siren, LayoutGrid, Calendar, LogIn, Heart, Store, PlusSquare, Bell, Menu, X, Info, Activity` |
| `src/components/AlarmaView.tsx` | `Siren, PhoneCall, CheckCircle2, Search, Calendar, PlusCircle, Heart, Store, Volume2, VolumeX, Shield, Zap, Users` |
| `src/components/EventosView.tsx` | `Search, Calendar, MapPin, Users, HeartHandshake, HelpCircle, X, Bell, Eye` |
| `src/components/FarmaciasView.tsx` | `PlusCircle, MapPin, Phone, Building2, Calendar, Clock, Sparkles` |
| `src/components/MascotasView.tsx` | `Search, MapPin, Phone, Building, Calendar, HelpCircle, X, PlusCircle, AlertCircle, Heart` |
| `src/components/NegociosView.tsx` | `Search, MapPin, Star, Clock, ShoppingCart, Sparkles, Store, X, PlusCircle, Bookmark, Check` |
| `src/components/ProyectosView.tsx` | `Search, MapPin, CheckCircle, Clock, FileText, X, ChevronRight, ThumbsUp, MessageSquare` |

---

## 4. Módulos de build / configuración activos

No se importan dentro de `src/`, pero son **esenciales** para compilar y servir el proyecto.

### 4.1 `vite` — `^6.2.3`
**Propósito:** Empaquetador (bundler) y servidor de desarrollo. Convierte TS/TSX en JS para producción y recarga en caliente en desarrollo.

- Configurado en `vite.config.ts` → `import { defineConfig } from 'vite';`
- Define `base: '/barrio-el-trigal/'` (ruteo en GitHub Pages) y alias `@` → raíz.
- Usado por los scripts: `dev`, `build`, `preview`.

### 4.2 `@vitejs/plugin-react` — `^5.0.4`
**Propósito:** Plugin oficial de React para Vite. Compila JSX/TSX y habilita Fast Refresh.

- `vite.config.ts` → `import react from '@vitejs/plugin-react';`
- Registrado en `plugins: [react(), tailwindcss()]`.

### 4.3 `@tailwindcss/vite` — `^4.1.14`
**Propósito:** Integración de Tailwind CSS v4 como plugin de Vite. Procesa el `@import "tailwindcss";` del CSS y aplica el tema definido en `@theme {}`.

- `vite.config.ts` → `import tailwindcss from '@tailwindcss/vite';`
- El tema define marca (p. ej. `--color-brand-yellow: #ffd700`), fuentes (Hanken Grotesk / Geist) y un breakpoint `tall`.

### 4.4 `tailwindcss` — `^4.1.14` (dev)
**Propósito:** Motor del framework CSS utility-first v4. Dependencia subyacente del plugin `@tailwindcss/vite`. Toda la UI se estiliza con utilidades (`flex`, `backdrop-blur-xl`, `bg-brand-yellow`, etc.).

### 4.5 `typescript` — `~5.8.2` (dev)
**Propósito:** Compilador y verificador de tipos. Configurado vía `tsconfig.json` (`target: ES2022`, `jsx: react-jsx`, `module: ESNext`, alias `@/*`).

- El script `lint` ejecuta `tsc --noEmit` (valida tipos sin emitir).

### 4.6 `@types/node` — `^22.14.0` (dev)
**Propósito:** Tipos de Node.js. Necesario porque `vite.config.ts` importa `path` (`import path from 'path';`) y usa `__dirname`.

---

## 5. Módulos dev de soporte pasivo

No se invocan directamente, pero son dependencias subyacentes del tooling. Mantenerlos para que el build funcione.

| Módulo | Versión | Por qué está |
|---|---|---|
| `esbuild` | `^0.25.0` | Bundler de JS ultrarrápido usado internamente por Vite y `tsx`. |
| `tsx` | `^4.21.0` | Runner para ejecutar TypeScript directamente sin compilar. Reservado para tooling (no aparece en scripts actuales). |
| `autoprefixer` | `^10.4.21` | Plugin PostCSS para añadir prefijos de navegador. En Tailwind v4 (con plugin de Vite) no se configura activamente; es herencia de soporte. |

---

## 6. Módulos declarados pero NO usados ⚠️

Estas dependencias **no tienen ningún `import`** en `src/`, `vite.config.ts` ni en los scripts. Son herencia del scaffold de **Google AI Studio** y pueden eliminarse con seguridad (salvo que se planee usar IA o animaciones avanzadas).

| Módulo | Versión | Razón de su presencia |
|---|---|---|
| `@google/genai` | `^2.4.0` | SDK de la API de Gemini. `metadata.json` lista la capability `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, pero no hay llamadas a Gemini en el código. |
| `express` | `^4.21.2` | Servidor Node de desarrollo de AI Studio. El script `clean` borra `server.js`. El backend real es Google Apps Script. |
| `dotenv` | `^17.2.3` | Cargaba `GEMINI_API_KEY` para el servidor Express que ya no existe. Innecesario en un frontend estático. |
| `motion` | `^12.23.24` | Librería de animaciones. Se instaló pero nunca se importó. Las animaciones actuales se hacen con CSS puro (`@keyframes`: `glow-pulse`, `fade-slide-up`, `pop-in`) y utilidades de Tailwind (`animate-pulse`, `animate-spin`). |
| `@types/express` | `^4.17.21` | Tipos para Express, que tampoco se usa. |

---

## 7. Notas finales

- **Sistema de módulos:** el proyecto declara `"type": "module"` → ESM nativo en todos los archivos.
- **Despliegue:** el `base: '/barrio-el-trigal/'` en `vite.config.ts` es crítico para que los assets se resuelvan correctamente bajo el subdirectorio de GitHub Pages.
- **Sin servidor Node en producción:** no existe `server.js` ni `server.ts`. El único backend es `apps-script/Code.gs`, que lee 5 hojas de Google Sheets (`Proyectos`, `Eventos`, `Farmacias`, `Negocios`, `Mascotas`) y commitea `public/data.json` vía la API de GitHub. GitHub Actions compila Vite y publica en GitHub Pages.
- **Carga de datos en el frontend:** `src/hooks/useSheetData.ts` hace `fetch('/data.json')` y, si falla, usa datos fallback de `src/data.ts`.
- **Login de afiliación:** `index.html` carga `script.google.com/gsi/client` (Google Identity Services) para OAuth; `AfiliacionView.tsx` hace POST a la Web App de Apps Script y los datos se guardan en la hoja privada `Datos`.
