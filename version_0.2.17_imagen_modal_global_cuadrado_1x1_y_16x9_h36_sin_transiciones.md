# Versión 0.2.17 — Mascotas: imagen del modal global (16:9 h-36 y 1:1 cuadrado), soporte formato cuadrado en tarjetas, sin transiciones en slideshow + imágenes cuadradas para tarjetas 12 y 23

## Fecha
2026-08-01

## Propósito
Normalizar la lógica de visualización de imágenes en la sección Mascotas de forma **global** (sin hardcode por tarjeta), cubriendo los tres formatos de imagen: horizontal 16:9, vertical 9:16 y cuadrado 1:1. Se ajusta la imagen dentro del modal de "Ver Detalles" para que coincida con la que se ve en la tarjeta, se quitan las transiciones/efectos del slideshow, se elimina el flash de zoom al abrir el modal y se renuevan las imágenes de las tarjetas 12 y 23 a formato cuadrado.

---

## Cambios realizados

### 1. Helper global `buildPetSlides` (`src/components/MascotasView.tsx`)
- Nueva función `buildPetSlides(pet, petIdx)` que construye las slides de forma unificada:
  - Cantidad de slides según `SLIDE_MAP` (por índice).
  - **Primera slide siempre = `pet.imageUrl`** (la misma imagen que se ve en la tarjeta).
  - Las demás slides se toman de `pet.images` excluyendo `imageUrl` (evita duplicados).
  - Rellena con `SLIDE_FALLBACKS` (sin duplicar) si faltan imágenes.
- Reemplaza los dos bloques duplicados que antes usaban `sourceImages.slice(0, slideCount)` en el modal de detalle y en las miniaturas del fullscreen.

### 2. Imagen del modal global según formato (`src/components/MascotasView.tsx`) ⭐
El `<img>` del modal de detalle ahora elige encuadre según la orientación de cada slide:
- **Una sola imagen horizontal (16:9 o >1.2 ratio)**: contenedor pasa a `h-36` (144px) y la imagen se muestra `object-cover` llenando el contenedor — exactamente como se ve en la tarjeta. El contenedor del modal ya no se estira a 264px.
- **Una sola imagen vertical (9:16, ratio < 0.8)**: se mantiene la lógica actual (`h-[264px]` + `object-contain` + fondo borroso).
- **Imagen cuadrado 1:1 (ratio 0.8–1.2)**: el contenedor **conserva sus medidas actuales** (`h-[264px]`) y la imagen se muestra **completa, sin cortar**, con `object-contain`.
- **2 a 5 imágenes**: sin cambios; se mantiene el comportamiento previo (portrait con `object-contain`, horizontales con `object-cover` centrado).

### 3. Soporte global para tarjetas formato cuadrado 1:1 (`src/components/MascotasView.tsx`) ⭐
- Nuevos estados `squarePets` y `squareSlides` (paralelos a `portraitPets`/`portraitSlides`).
- **Detección por ratio en `onLoad`**: `ratio < 0.8` → portrait; `ratio >= 0.8 && ratio <= 1.2` → cuadrado; el resto → horizontal.
- **Tarjeta (vista por defecto)**: si la imagen es cuadrada, el contenedor de la imagen pasa a `aspect-square` (alto = ancho de la tarjeta), con `object-cover`. Se ve un cuadrado 1:1 perfecto.
- **Modal**: la slide 0 usa `square0` (con fallback a `squarePets`) para no parpadear al abrir; las imágenes cuadradas se renderizan con `object-contain` completa.
- Es **global**: aplica automáticamente a cualquier tarjeta presente o futura con imagen cuadrada, sin cambios por tarjeta individual.

### 4. Fix del flash de zoom al abrir el modal (`src/components/MascotasView.tsx`) ⭐
- **Bug**: al entrar por primera vez a la modal, la imagen aparecía con un ligero zoom y a los 1–2 segundos se corregía sola.
- **Causa raíz**: `portraitSlides[id]?.[0]` era `undefined` al abrir, así que la slide 0 se trataba como horizontal (`object-cover` = zoom/corte) hasta que el `onLoad` de la imagen registraba la orientación real y re-renderizaba.
- **Solución**: `portrait0 = portraitSlides[id]?.[0] ?? portraitPets[id]` — como la tarjeta ya detectó la orientación al cargar su propia imagen (`portraitPets`), el modal abre directamente con el encuadre correcto.

### 5. Sin transiciones en el slideshow (`src/components/MascotasView.tsx`)
- Se eliminó `transition-all duration-300` de la imagen principal del modal: el cambio entre slides es instantáneo y limpio.
- Se eliminó `transition` de las miniaturas del modal (cambio directo de borde/opacidad, sin animación).
- Se eliminó `transition` de las miniaturas del fullscreen (consistencia global).
- El autoplay (cada 4s) y los botones de flecha/manual siguen funcionando igual.

### 6. Imágenes cuadradas 1:1 para tarjetas 12 y 23 (`src/data.ts`)
- **Tarjeta 12 — `fp4` "Manchitas"** (Perro, blanco con manchas negras): `photo-1602657952317-68b739c9b824?w=600&h=600&fit=crop&q=80` (perro blanco y negro, Jack Russell).
- **Tarjeta 23 — `ap8` "Rex"** (Pastor Alemán): `photo-1610968755695-d7fcb5fd4b92?w=600&h=600&fit=crop&q=80` (Pastor Alemán black & tan).
- Ambas URLs con `w=600&h=600&fit=crop` = cuadrado 1:1 exacto; verificadas HTTP 200.
- Solo se cambió `imageUrl` (la imagen de la tarjeta y slide 0 del modal); **no se tocó la lógica** ni los arrays `images`.

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/components/MascotasView.tsx` | Helper global `buildPetSlides`; imagen del modal según formato (16:9 h-36, 9:16 portrait, 1:1 cuadrado); estados `squarePets`/`squareSlides`; contenedor `aspect-square` en tarjetas cuadradas; fix flash de zoom con `portrait0`/`square0`; sin transiciones en slideshow y miniaturas |
| `src/data.ts` | `fp4` Manchitas y `ap8` Rex con nuevas imágenes 1:1 cuadradas (600×600) |

---

## Problemas encontrados y soluciones

### Problema: imagen del modal "recortada y con zoom" en tarjetas con una sola imagen
- **Causa**: la primera slide del modal usaba `images[0]` (que no siempre coincidía con `imageUrl`) y la lógica trataba toda slide no-portrait como horizontal en un contenedor de 264px.
- **Solución**: `buildPetSlides` garantiza slide 0 = `pet.imageUrl`; y el `<img>` del modal ahora respeta el tamaño de la tarjeta (h-36 para horizontales) o muestra la imagen completa (1:1 cuadrado, 9:16 portrait).

### Problema: flash de zoom al abrir la modal por primera vez
- **Causa**: `portraitSlides` vacío al abrir → encuadre incorrecto inicial → corrección tardía tras `onLoad`.
- **Solución**: usar `portraitPets[id]` (ya detectado por la tarjeta) como valor inicial de la slide 0.

### Problema: las tarjetas 12 y 23 con imagen cuadrada no se veían completas
- **Causa**: la sección solo contemplaba formatos 16:9 y 9:16; una imagen 1:1 se cortaba con `object-cover`.
- **Solución**: detección global de ratio cuadrado (0.8–1.2), contenedor `aspect-square` en la tarjeta e `object-contain` en el modal.

### Problema: transiciones no deseadas entre imágenes del slideshow
- **Causa**: clases `transition-all duration-300` / `transition` heredadas en imagen principal y miniaturas.
- **Solución**: eliminarlas para un cambio instantáneo, fluido y sin efectos.

---

## Próximos pasos
- *(ninguno)* — lógica de imágenes global de Mascotas completa para los tres formatos (16:9, 9:16, 1:1). Cambios ya commiteados y subidos a GitHub (`397d61d`, `07f2f15`).

---

# ANEXO — Estado General del Proyecto (Agosto 2026)

## Objective
Frontend de la app Barrio El Trigal en fase de pre-reconexión del CMS (Google Sheets → Apps Script → data.json → GitHub Pages).

## Important Details
- **Cada cambio debe incluir comentarios** `CMS_READY`, `CMS_PENDING` o `CMS_CONNECTED` para facilitar la reconexión futura.
- **No subir cambios a GitHub sin autorización explícita** del usuario (en esta versión se autorizó por escrito).
- **Paleta oficial:** `--color-brand-yellow: #FFD700`, `--color-brand-green: #4AE183`, `--color-brand-red: #E74C3C`. Fondo `#070707`.
- **Breakpoints custom:** `tall:` (≥700 px altura), `xs:` (≥480 px).
- **Navegación SPA** sin react-router: `navigateToTab(id)` o evento `navigate`.
- **`useSheetData.ts`** tiene BLOQUE A activo (fallback local) y BLOQUE B comentado (fetch real). **NO tocar sin instrucción explícita**.
- **Las secciones Alarma y Afiliación NO usan CMS**; tienen datos propios y no deben conectarse.

---

## Work State

### Completed

1. **Helper global `buildPetSlides`**: primera slide = `pet.imageUrl`, resto de `images` sin duplicados, relleno con fallbacks. Reutilizado en modal y fullscreen.

2. **Imagen del modal global por formato**: una sola imagen horizontal → contenedor `h-36` + `object-cover` (igual que la tarjeta); vertical 9:16 → `object-contain` con blur (sin cambios); cuadrado 1:1 → `object-contain` completa en contenedor actual; 2–5 imágenes → sin cambios.

3. **Soporte global 1:1 cuadrado**: detección por ratio, contenedor `aspect-square` en la tarjeta, imagen completa en el modal. Aplica a cualquier tarjeta futura.

4. **Fix flash de zoom al abrir el modal**: slide 0 usa `portrait0`/`square0` con fallback al estado ya detectado por la tarjeta.

5. **Sin transiciones en el slideshow**: eliminadas en imagen principal, miniaturas del modal y miniaturas del fullscreen.

6. **Imágenes nuevas 1:1**: tarjeta 12 (Manchitas, Jack Russell blanco/negro) y tarjeta 23 (Rex, Pastor Alemán) en formato 600×600 cuadrado.

### Active
- *(ninguno)*

### Blocked
- *(ninguno)*

### Next Move
1. *(ninguno — esperar instrucciones del usuario)*

---

## Relevant Files

| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `src/App.tsx` | Orquestador, header CSS Grid, back handler unificado (`backHandlerRef`) | 835 |
| `src/components/MascotasView.tsx` | Sección Mascotas: `buildPetSlides`, imagen del modal por formato (16:9/9:16/1:1), estados `squarePets`/`squareSlides`, `aspect-square`, fix flash, sin transiciones | 1755 |
| `src/data.ts` | Datos de mascotas: `fp4` Manchitas y `ap8` Rex con imágenes 1:1 cuadradas | — |
| `version_0.2.16_Mascotas_botones_fullscreen_zoom_miniaturas_fix_volver_atras.md` | Documentación de la versión anterior | 187 |
| `version_0.2.17_imagen_modal_global_cuadrado_1x1_y_16x9_h36_sin_transiciones.md` | Este archivo | — |
