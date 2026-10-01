# Versión 0.2.25 - Brillo +15% en tipos de alarma

**Fecha:** 2026-10-01

## Resumen

Los 4 botones de tipo de alarma de la **Central de Alarma** (Pánico, Sospechoso, Médica, Prueba) suben su brillo un 15%, solo en icono y texto (pedido del dueño).

## Cambios realizados (`src/components/AlarmaView.tsx`)

- En ambos bloques de botones (`ALARM_TYPES.slice(0, 2)` y `slice(2, 4)`): el icono se envuelve en `span.brightness-[1.15]` y el label suma `brightness-[1.15]`. Fondos y bordes intactos; funciona igual en estado seleccionado y no seleccionado.

## "Incendio" + "Evento" (mismo día, pedido del dueño)

- Segundo intento del 2º tipo: `Bomberos` → **`Incendio`** (icono Flame intacto).
- 4º tipo: `Prueba` → **`Evento`** (icono Wrench intacto).
- Solo etiquetas: los ids internos (`suspicious`, `test`) y la lógica no cambian; en bitácora seguirán saliendo "Sospechoso" y "Prueba Técnica". Verificado con captura. Re-build ✅. Servidor preview detenido.

## Error `[plugin:vite:react-babel] Identifier 'Siren' has already been declared` (fallo mío, corregido)

- Causa: al poner `Siren` en el botón circular agregué `Siren,` al import cuando ya existía (icono de Pánico) → duplicado → `npm run dev` mostraba pantalla de error y nada cargaba. El `build` de ese momento pasó de largo porque esbuild transforma sin chequear duplicados.
- Corrección: eliminado el import duplicado (una sola línea `Siren,`). Verificado con captura del dev server: app renderiza completa. Lección: tras tocar imports, verificar con el dev o revisar el bloque.
- Servidor dev de verificación detenido para dejar el puerto 3000 libre.

## Botón circular: Marcellus + Siren (v0.2.25g–j, pedido del dueño)

- Texto `ACTIVAR ALARMA VECINAL`: +20%, +10%, −4% (final 10.2px/11.4px) + tracking 0.25em; fuente **Marcellus** (OFL libre, premium) cargada en `index.html`, solo en este botón (se probó Cinzel y Megaphone, descartados por el dueño).
- Icono del botón: `Volume2` → `Megaphone` → final **`Siren`** (ya importado; se evitó duplicar el import), mismo tamaño/color/hover.

## Iconos +20% y textos +15% (v0.2.25d/e, pedido del dueño)

- Los 4 iconos de tipo (Siren, Flame, HeartPulse, Wrench) pasan de `w-4 h-4` (16px) a `w-[19px] h-[19px]` (20% exacto). Solo iconos.
- Textos: primero se probó +20% (9px→11px) y el dueño lo vio mucho → final **+15%**: `text-[9px]→text-[10px]`, `sm:text-[10px]→sm:text-[11px]`. Verificado con captura: iconos y etiquetas proporcionados. Re-build ✅. Servidor preview detenido.

## Intercambio Evento ↔ Incendio (v0.2.25f, pedido del dueño)

- Orden visual: izquierda Pánico/Evento, derecha Médica/Incendio. Se reordenó el arreglo (`test` 2º, `suspicious` 4º) porque las columnas son `slice(0, 2)` y `slice(2, 4)`. Ids, iconos, colores y lógica intactos. Verificado con captura. Re-build ✅. Servidor preview detenido.

## "Sospechoso" → "Bomberos" (mismo día, pedido del dueño, superado por "Incendio")

- Etiqueta del 2º tipo: `Sospechoso` → `Bomberos`, icono `Search` → `Flame` (import agregado), mismo estilo amarillo.
- El id interno `'suspicious'` se conserva a propósito: renombrarlo tocaría `AlarmLog`, `ActiveAlarmModal` y la bitácora. Efecto visible de esto: en la **bitácora**, una alerta de Bomberos se registra como "🔍 Sospechoso". Si quieres, lo renombro completo en otro cambio.
- Nota: el primer intento llevó un comentario `{/* */}` dentro del arreglo TS (solo válido en JSX) y rompió el build; corregido a `//`.

## Archivos modificados

| Archivo | Motivo |
| --- | --- |
| `src/components/AlarmaView.tsx` | `brightness-[1.15]` en icono + label de los 4 tipos; `Sospechoso` → `Bomberos` + icono `Flame` |
| `version_0.2.25_Brillo_tipos_alarma.md` | Este documento |

## Verificación de calidad

- `npm run build`: ✅.
- Captura real (`vite preview` + Chrome headless, 390px): iconos y textos más luminosos.
- ⚠️ `npm run lint` (tsc) NO ejecutado por orden del dueño (PC con pocos recursos).
- **Sin push** a GitHub (regla de oro).
