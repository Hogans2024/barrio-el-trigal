# Versión 0.2.16 — Mejoras Mascotas (botones, modal detalle, pantalla completa con zoom y miniaturas) + Teclado Alarma sin lag + fix "Volver Atrás" en imagen fullscreen

## Fecha
2026-07-28

## Propósito
Consolidar la mejora integral de la sección Mascotas (nueva fila de botones en tarjetas, slideshow con número variable de imágenes, modal de detalle rediseñado y visor de imagen a pantalla completa con zoom/pinch + pan + miniaturas) y eliminar el lag del teclado numérico de la Alarma al presionar teclas en móvil. Además, corregir un bug crítico: al estar en la imagen a pantalla completa y presionar "Volver Atrás", el overlay quedaba pegado tapando el contenido porque el back handler no contemplaba `fullscreenImg`.

---

## Cambios realizados

### 1. Mascotas — Botones de tarjetas rediseñados (`src/components/MascotasView.tsx`)
- **Imagen movida debajo del título**: la tarjeta ahora muestra primero el nombre y estado, y la imagen queda en la parte inferior.
- **Nueva fila de 5 botones** (`gap-1.5`): Like (corazón con contador), Chat (MessageCircle), Contactar, Ver Detalles y Compartir.
  - Botón **Like**: icono `Heart`, se rellena de rojo (`fill-red-400 text-red-400`) al pulsar, con contador numérico.
  - Botón **Compartir**: `svg` propio con flecha de "reposo" escalada `scale(1.25)`, hover `sky-400`.
  - Botón **Ver Detalles**: pasó de amarillo (`bg-[#FFD700]/10`) a neutro (`bg-white/5 text-gray-300`) para distinguirlo del botón de tipo (que se eliminó de la fila).
  - Botón de **tipo de mascota** (con icono Perro/Gato/Aves/Conejo/Tortuga) eliminado de la fila de botones.
- **Persistencia de "Me gusta" en localStorage**: clave `barrio_mascotas_likes` con `useEffect` que guarda el mapa de likes en cada cambio. Inicialización segura con `JSON.parse` en `try/catch`.
- **Icono PawPrint integrado al título**: el bloque teal con `PawPrint` que estaba a la izquierda del nombre se eliminó; ahora el icono va inline junto al texto, con `text-teal-400 mr-1`.

### 2. Mascotas — Barra de búsqueda + botón "Añadir Mascota" (`src/components/MascotasView.tsx`)
- El botón **"Añadir Mascota"** se movió del header de título (esquina superior derecha) a la **barra de búsqueda**, tanto en modo normal como en modo sticky (`flex items-center gap-2` con search `flex-1 min-w-0`).
- Se eliminó el bloque duplicado de la barra de búsqueda del layout normal, unificando la estructura.

### 3. Mascotas — Slideshow con número variable de imágenes (`src/components/MascotasView.tsx`)
- Nueva constante `SLIDE_MAP` (array de 30 posiciones) que determina cuántas imágenes muestra cada tarjeta según su índice (`1,1,2,3,1,1,1,1,2,1,1,3,1,4,3,1,5,1,4,5,1,1,2,1,1,4,1,5,1,1`).
- El slideshow usa `activePet.images.slice(0, slideCount)` si hay suficientes imágenes; si no, usa `SLIDE_FALLBACKS` (5 imágenes Unsplash) recortado a `slideCount`.
- `slideCountRef.current` se actualiza con el número real de slides.

### 4. Mascotas — Modal de detalle rediseñado (`src/components/MascotasView.tsx`)
- Se eliminaron los bloques sueltos "Tipo de Mascota", "Nombre", "Barrio/Zona", "Fecha" y se reorganizó la información:
  - **Descripción** primero (con `text-gray-300 text-xs leading-relaxed`).
  - **Grid 2 columnas**: Nombre / Tipo de Mascota.
  - **Grid 2 columnas**: Barrio / Zona + Fecha.
  - Última ubicación, Contactos y el resto se mantienen.
- Botón "Compartir" (svg) y botón MessageCircle insertados en el control de flechas del slideshow (luego retirados, ver sección 8).

### 5. Mascotas — Modal de imagen a pantalla completa (fullscreen) (`src/components/MascotasView.tsx`)
- **Contenedor**: dejó de ser `fixed inset-0` para ser `fixed left-0 right-0 z-[70]` con `top: 3.5rem` y `bottom: 3.5rem`, dejando visible la barra superior (donde está "Volver Atrás").
- **Zoom con pinch mejorado**: nuevo estado `touchState` (ref) que guarda distancia entre dedos, punto medio, pan y escala. El ratio de zoom se calcula respecto al último `dist`.
- **Pan con un dedo**: cuando `zoomScale > 1`, un solo dedo arrastra la imagen (`setZoomPos`).
- **Reset automático**: `onTouchEnd` restablece `zoomPos` a `{0,0}` si `zoomScale <= 1`; y al abrir/cerrar el fullscreen se resetea `zoomScale` y `zoomPos`.
- **Transform unificado**: `translate(zoomPos.x, zoomPos.y) scale(zoomScale)` en un contenedor interno.
- **Botón cerrar "X"**: más pequeño (`h-4 w-4`), posicionado `top-[18px] right-[3px] z-[99]`.
- **Miniaturas inferiores**: fila de botones `w-14 h-14 rounded-lg border-2` que muestran las imágenes disponibles; la activa tiene borde dorado `#FFD700` + glow. Al tocar una miniatura se cambia la imagen fullscreen y se resetea zoom/posición. Solo se muestran si hay más de 1 slide.
- **Imagen**: `object-contain` dentro de contenedor `flex items-center justify-center`, ya no depende de `onClick` para cerrar.

### 6. Mascotas — Datos actualizados (`src/data.ts`)
- **`fp1` "Chispita" (Encontrado)**: cambió de `type: 'Perro'` a `type: 'Gato'`, con imagen nueva vertical (`photo-1543852786-1cf6624b9987` de 360×640), descripción reescrita en masculino ("Encontrado", "gato pequeño") y array `images` actualizado.
- **`ap1` "Max" (Perdido, Golden Retriever)**: la imagen principal pasó de Unsplash a `images.dog.ceo/breeds/retriever-golden/n02099601_1249.jpg` (imagen real de la raza).
- **`DEFAULT_IMAGES.Perro`**: se cambió la imagen fallback de perro por `photo-1601758228041-f3b2795255f1` (menor peso, `w=400&q=40`).

### 7. Alarma — Fix de lag en el teclado numérico (`src/components/ActiveAlarmModal.tsx`)
- **`onClick` → `onPointerDown`** en las teclas numéricas, botón "0", botón "Limpiar" y retroceso (⌫), con `e.preventDefault()` para respuesta táctil inmediata.
- **Audio diferido**: `playTone` ahora se ejecuta en `setTimeout(..., 0)` después de actualizar el estado, para que el render de la tecla no se bloquee.
- **`touch-action: manipulation`** en la rejilla del teclado: elimina el delay de ~300ms del navegador en móvil.
- **`select-none`** en los botones del teclado.
- Alturas de teclas: `h-9 tall:h-11` → `h-10 max-sm:tall:h-12 sm:h-10`.

### 8. Alarma — Texto y mensajes del teclado (`src/components/ActiveAlarmModal.tsx`)
- **Contador de dígitos eliminado** del botón de activación: "🚨 ACTIVAR ALARMA 🠷N DIGITOS" → siempre "🚨 ACTIVAR ALARMA VECINAL".
- **Centrado perfecto del botón ACTIVAR**: el emoji 🚨 va en un `span` propio (`text-base sm:text-lg flex-shrink-0`), el texto con `whitespace-nowrap tracking-normal sm:tracking-wide text-center`, contenedor `flex w-full items-center justify-center gap-1.5 sm:gap-2`, y `pr-1` final para balancear visualmente.
- Mensaje "AHORA PRESIONE ACTIVAR ALARMA" con `text-xs font-bold`.
- Mensaje "PRIMERO DIGITE SU NUMERO DE CELULAR" sin emoji ⚠️, con `text-[11.5px] tracking-[0.05em]` y reglas responsive para pantallas ≤319px.
- Mensaje de aviso en el botón: `text-xs font-extrabold`.

### 9. Alarma — CSS del teclado (`src/index.css`)
- Nuevas clases para el teclado con `@media`:
  - **Teléfonos altos** (`max-width: 639px` y `min-height: 700px`): `.alarm-keypad-card` con `padding-top: 4px` y `padding-bottom: 14.4px` (igual al gap entre filas), `.alarm-keypad-display` con `min-height: 26px` y `margin-bottom: 7.6px`, `.alarm-keypad-grid` con `gap: 14.4px` y botones de `48px`.
  - **Móviles pequeños** (`max-width: 639px` y `max-height: 699px`): `.alarm-keypad-card` con `padding-bottom: 14.4px` para espacio inferior uniforme.
- Las clases se referencian en el JSX: `alarm-keypad-card`, `alarm-keypad-display`, `alarm-keypad-grid`.

### 10. Fix — "Volver Atrás" cierra la imagen fullscreen (`src/components/MascotasView.tsx`) ⭐
- **Bug**: al ver una imagen a pantalla completa y presionar "Volver Atrás" (barra superior), el overlay `z-[70]` quedaba pegado tapando el contenido real.
- **Causa raíz**: el `useEffect` del back handler contemplaba `contactPet`, `schedulePet` y `activePet`, pero **no `fullscreenImg`**. Como al ver la imagen fullscreen también hay un `activePet` seteado, el handler cerraba el modal de detalle pero el overlay de fullscreen permanecía.
- **Solución**: `fullscreenImg` tiene ahora la máxima prioridad en la cadena de cierre:
  1. Si `fullscreenImg` está abierto → "Volver Atrás" solo cierra la imagen (resetea zoom y posición) y retorna `true`.
  2. Luego `contactPet` → cierra el modal de contacto.
  3. Luego `schedulePet` → cierra el modal de horario.
  4. Luego `activePet` → cierra el modal de detalle.
  5. Si no hay nada → retorna `null` y la navegación sigue hacia la pestaña anterior.
- Se agregó `fullscreenImg` a las dependencias del `useEffect`.

### 11. Limpieza — Botón MessageCircle del slideshow eliminado (`src/components/MascotasView.tsx`) ⭐
- Se eliminó el botón `MessageCircle` que estaba insertado entre las flechas ‹ › del slideshow del modal de detalle (estaba mal ubicado dentro del control de navegación).
- Se corrigió la sangría irregular de los botones ChevronLeft/ChevronRight que quedó tras la eliminación.
- El import `MessageCircle` sigue en uso en las tarjetas (chat) y en el modal de contacto (WhatsApp), sin romper nada.

### 12. Documentación nueva (no commiteada)
- `CREDENCIALES_AFILIACION_VIEW.md` — detalle de las credenciales públicas por diseño de Afiliación (añadido en el commit `ad140d2`).
- `Prácticas a futuro Frontend/PRIORIDADES_FRONTEND.md` — plan de prioridades del frontend (añadido en el commit `ad140d2`).
- `AGENTS.md` — contrato de instrucciones del proyecto (sin trackear).

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/components/MascotasView.tsx` | Botones de tarjeta (Like/chat/Contactar/Ver Detalles/Compartir), likes en localStorage, imagen debajo del título, "Añadir Mascota" en la barra de búsqueda, SLIDE_MAP, modal de detalle rediseñado, modal fullscreen con zoom+pan+miniaturas, fix "Volver Atrás", botón MessageCircle eliminado del slideshow |
| `src/components/ActiveAlarmModal.tsx` | Teclado sin lag (`onPointerDown`, audio diferido, `touch-action`), contador de dígitos eliminado, centrado del botón ACTIVAR, textos y mensajes ajustados |
| `src/index.css` | Clases `alarm-keypad-card`, `alarm-keypad-display`, `alarm-keypad-grid` con media queries para teléfonos altos y móviles pequeños |
| `src/data.ts` | `fp1` Chispita Perro→Gato con imagen vertical; `ap1` Max con imagen real de raza (dog.ceo); `DEFAULT_IMAGES.Perro` actualizada |

**Nuevos archivos (docs):** `CREDENCIALES_AFILIACION_VIEW.md`, `Prácticas a futuro Frontend/PRIORIDADES_FRONTEND.md`, `AGENTS.md`.

---

## Problemas encontrados y soluciones

### Problema: imagen fullscreen no se cierra con "Volver Atrás"
- **Causa**: el back handler de MascotasView no contemplaba `fullscreenImg`; al pulsar "Volver Atrás" se cerraba `activePet` pero el overlay `z-[70]` seguía montado.
- **Solución**: dar máxima prioridad a `fullscreenImg` en la cadena de cierre del back handler (sección 10).

### Problema: lag al presionar teclas del teclado de alarma en móvil
- **Causa**: `onClick` + reproducción de audio sincrónica antes de actualizar el estado, más el delay de 300ms del navegador en móvil.
- **Solución**: `onPointerDown` con `e.preventDefault()`, audio diferido con `setTimeout(playTone, 0)` y `touch-action: manipulation` en la rejilla (sección 7).

### Problema: botón MessageCircle mal ubicado en el slideshow
- **Causa**: se insertó entre las flechas ‹ › del control de navegación del modal de detalle, desalineando el layout.
- **Solución**: eliminarlo y corregir la sangría de las flechas (sección 11).

---

## Próximos pasos
- *(ninguno)* — funcionalidad completa de la sección Mascotas y teclado de Alarma. Los cambios del working tree quedan listos para commitear cuando el dueño lo ordene.

---

# ANEXO — Estado General del Proyecto (Julio 2026)

## Objective
Frontend de la app Barrio El Trigal en fase de pre-reconexión del CMS (Google Sheets → Apps Script → data.json → GitHub Pages).

## Important Details
- **Cada cambio debe incluir comentarios** `CMS_READY`, `CMS_PENDING` o `CMS_CONNECTED` para facilitar la reconexión futura.
- **No subir cambios a GitHub sin autorización explícita** del usuario.
- **Paleta oficial:** `--color-brand-yellow: #FFD700`, `--color-brand-green: #4AE183`, `--color-brand-red: #E74C3C`. Fondo `#070707`.
- **Breakpoints custom:** `tall:` (≥700 px altura), `xs:` (≥480 px).
- **Navegación SPA** sin react-router: `navigateToTab(id)` o evento `navigate`.
- **`useSheetData.ts`** tiene BLOQUE A activo (fallback local) y BLOQUE B comentado (fetch real). **NO tocar sin instrucción explícita**.
- **Las secciones Alarma y Afiliación NO usan CMS**; tienen datos propios y no deben conectarse.

---

## Work State

### Completed

1. **Sección Mascotas v0.2.16:** botones de tarjeta (Like persistente en localStorage, chat, Contactar, Ver Detalles neutro, Compartir), imagen debajo del título, "Añadir Mascota" en la barra de búsqueda, slideshow con número variable de imágenes (SLIDE_MAP), modal de detalle con grids de 2 columnas y descripción arriba.

2. **Modal fullscreen de imagen:** zoom con pinch (escala 1–5x), pan con un dedo, miniaturas inferiores con borde dorado, botón cerrar reposicionado y visible dentro del área del modal (`top 3.5rem / bottom 3.5rem`).

3. **Fix "Volver Atrás" en imagen fullscreen:** el back handler ahora cierra primero la imagen fullscreen antes que el modal de detalle; luego se navega hacia atrás normalmente.

4. **Teclado de Alarma sin lag:** `onPointerDown`, audio diferido, `touch-action: manipulation`, `select-none`, alturas responsive (`h-10 max-sm:tall:h-12 sm:h-10`), padding inferior uniforme en `index.css`.

5. **Botón ACTIVAR ALARMA VECINAL:** sin contador de dígitos, centrado perfecto con emoji en span propio y `pr-1` de balance.

6. **Mensajes del teclado:** "AHORA PRESIONE ACTIVAR ALARMA" y "PRIMERO DIGITE SU NUMERO DE CELULAR" sin emojis y con tracking/tamaños ajustados; reglas responsive para pantallas ≤319px.

7. **Datos de mascotas:** Chispita ahora es Gato con imagen vertical; Max (Golden) usa imagen real de la raza; fallback de perro optimizado.

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
| `src/components/MascotasView.tsx` | Sección Mascotas: tarjetas, slideshow, modal detalle, fullscreen con zoom/pan/miniaturas, back handler con prioridad fullscreen | 1741 |
| `src/components/ActiveAlarmModal.tsx` | Modal de alarma con teclado numérico sin lag, botón ACTIVAR centrado | 595 |
| `src/index.css` | Clases del teclado de alarma (`alarm-keypad-*`) con media queries | — |
| `src/data.ts` | Datos de mascotas actualizados (Chispita gato, Max golden) + resto de secciones | — |
| `version_0.2.15_Header_Grid_Modal_Scroll.md` | Documentación de la versión anterior | 166 |
| `version_0.2.16.md` | Este archivo | — |
