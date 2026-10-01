# Versión 0.2.24 - Slideshow con texto rotativo arriba (Alarma)

**Fecha:** 2026-10-01

## Resumen

En el slideshow de la **Central de Alarma** (vista móvil) se eliminó el texto fijo "Central de Alarma Vecinal" junto al escudo. En su ubicación ahora rotan el título y subtítulo de cada slide ("Juntos cuidamos / lo que más importa", "Botón de Alarma / Úsalo con responsabilidad", "Números de Emergencia / Siempre a la mano"), sincronizados con el carrusel (cada 8s). El escudo se conserva.

## Cambios realizados (`src/components/AlarmaView.tsx`, solo móvil)

1. **Overlay superior** (`md:hidden`, `top-1.5 left-8`): el `<h2>` fijo se reemplazó por título + subtítulo del slide actual (`CAROUSEL_SLIDES[carouselIndex]`), con `truncate`, sombra de lectura y `key={carouselIndex}` + `animate-fade-in` para re-disparar el fade en cada rotación.
2. **Caption inferior**: título y subtítulo pasan a `hidden md:block` (solo desktop) para no duplicar el texto en móvil. La descripción ya era solo `sm+`. En desktop no cambia nada.
3. **Alineación** (v0.2.24b, pedido del dueño): el overlay superior pasó de `left-8` a `left-1.5`, misma banda horizontal de arriba pero pegado al borde izquierdo, alineado con la flecha izquierda del carrusel. Verificado con captura. Re-build ✅. Servidor preview detenido.
4. **Tipo oración** (v0.2.24c, pedido del dueño): el subtítulo amarillo del overlay ya no va en mayúsculas (`uppercase` eliminado); se normaliza en JS a primera letra mayúscula + resto minúsculas (`Lo que más importa`, `Úsalo con responsabilidad`, `Siempre a la mano`). El caption inferior de desktop no cambia. Verificado con captura. Re-build ✅. Servidor preview detenido.
5. **Misma tipografía** (v0.2.24d, pedido del dueño): el subtítulo amarillo igualado al título blanco en todo (`text-[13px] font-light`, sin `font-bold` ni `font-sans` extra); la única diferencia es el color `#FFD700`. Verificado con captura. Re-build ✅. Servidor preview detenido.
6. **Sin escudo + al ras de la flecha** (v0.2.24e, pedido del dueño): eliminado el chip del escudo del overlay; los dos textos quedan en la misma banda superior pero arrancando en `left-1.5`, al ras izquierdo del botón de flecha izquierda. Verificado con captura. Re-build ✅. Servidor preview detenido.
7. **Sobre el centro de la flecha** (v0.2.24f, pedido del dueño): los textos se quedan arriba pero arrancan en `left-[18px]`, sobre la línea vertical del centro de la flecha izquierda (`left-1.5` + `w-6`/2). Verificado con captura. Re-build ✅. Servidor preview detenido.
8. **Al lado de la flecha + blanca sobre su eje** (v0.2.24g, pedido del dueño): textos a la altura media, colindando con el borde derecho de la flecha (`left-8`); translate de `-8px` (mitad de la línea blanca) para que la BLANCA quede centrada justo sobre el eje horizontal de la flecha y la AMARILLA debajo. Verificado con captura. Re-build ✅. Servidor preview detenido.
9. **Flechas a los bordes exteriores** (v0.2.24h, pedido del dueño, revertido en v0.2.24i): ambas flechas de `left/right-1.5` (6px) a `left/right-0.5` (2px). Revertido abajo.
10. **Flechas eliminadas + texto al ras** (v0.2.24i, pedido del dueño): botones prev/next eliminados del JSX (se quita también el import `ChevronLeft` sin uso; `ChevronRight` se conserva por el drawer de búsqueda; las funciones `handlePrev/NextSlide` siguen vivas por el swipe táctil). Textos a `left-1` (4px), casi al ras del borde izquierdo. Carrusel: auto-rotación 8s + swipe + indicadores. Verificado con captura. Re-build ✅. Servidor preview detenido.
11. **Texto abajo-izquierda moderado** (v0.2.24j, pedido del dueño): el `left-1` quedó demasiado al ras → se relajó a `left-3` (12px); y los textos bajaron de la altura media a casi al ras inferior (`bottom-2`, 8px), sin exagerar. No choca con los indicadores (viven abajo-derecha). Verificado con captura. Re-build ✅. Servidor preview detenido.
12. **Slide 3 con líneas intercambiadas** (v0.2.24k, pedido del dueño, solo ese slide): en `CAROUSEL_SLIDES` id 3, título ↔ subtítulo (`Siempre a la mano` arriba-blanco, `Números de Emergencia` abajo-amarillo → el overlay lo deja en `Números de emergencia`, minúscula pedida). Slides 1 y 2 intactos. Nota: también se refleja en el caption de desktop (misma data). Verificado con captura (espera virtual al 3er slide). Re-build ✅. Servidor preview detenido.
13. **Tipografía circular libre** (v0.2.24l/m/n, pedido del dueño): se probó Hanken 200 (descartada por el dueño) y Quicksand (nunca llegó a verificarse); final **Comfortaa** peso 300 — circular, bonita y con licencia libre OFL — cargada en `index.html`, aplicada solo al overlay del slideshow en 12px (un punto más pequeña) con `tracking 0.08em`. Resto de la app intacto (sigue Hanken/Geist). Verificado con captura. Re-build ✅. Servidor preview detenido.
14. **Más pequeña + 90% opacidad** (v0.2.24o, pedido del dueño): misma Comfortaa pero en 11px y colores al 90% (`text-white/90`, `text-[#FFD700]/90`). Verificado con captura. Re-build ✅. Servidor preview detenido.

## Archivos modificados

| Archivo | Motivo |
| --- | --- |
| `src/components/AlarmaView.tsx` | Overlay rotativo + caption inferior solo md+ |
| `version_0.2.24_Slideshow_texto_rotativo_arriba.md` | Este documento |

## Verificación de calidad

- `npm run build`: ✅ (warning de chunk >500 kB pre-existente).
- Captura real (`vite preview` + Chrome headless, 390px): arriba se lee "Botón de Alarma / ÚSALO CON RESPONSABILIDAD" con escudo; abajo sin texto duplicado.
- ⚠️ `npm run lint` (tsc) NO ejecutado por orden del dueño (PC con pocos recursos).
- **Sin push** a GitHub (regla de oro).
