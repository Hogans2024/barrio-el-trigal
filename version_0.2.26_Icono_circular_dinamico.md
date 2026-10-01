# Versión 0.2.26 - Icono del botón circular según tipo activo

**Fecha:** 2026-10-01

## Resumen

El botón circular de la **Central de Alarma** ahora muestra el icono del tipo seleccionado (pedido del dueño): Pánico → sirena, Incendio → fuego, Médica → corazón, Evento → llave. Antes siempre mostraba la sirena.

## Cambios realizados (`src/components/AlarmaView.tsx`)

- `ALARM_TYPES` guarda el **componente** (`Icon: Siren/Flame/HeartPulse/Wrench`, tipo `LucideIcon`) en vez del nodo ya renderizado, para reusarlo en dos tamaños: chico (`w-[19px]`) en los botones laterales y grande (`w-6 sm:w-8`) en el circular.
- Nuevo `ActiveTypeIcon = ALARM_TYPES.find(t => t.id === activeAlarmType) ?? primero`, renderizado en el botón circular. Al cambiar de tipo, React re-renderiza el icono solo.
- Ids, colores, modal y bitácora intactos.

## Evento en verde al seleccionarlo (mismo día, pedido del dueño)

- Su color activo era gris (`text-gray-300...`), indistinguible del no seleccionado. Nuevo: verde del botón Llamar (`text-[#22c55e] border-[#22c55e]/40 bg-[#22c55e]/10`).
- Verificado con captura forzando `useState('test')` temporalmente (botón verde + llave en el circular) y revertido a `'panic'` con re-build final.

## Archivos modificados

| Archivo | Motivo |
| --- | --- |
| `src/components/AlarmaView.tsx` | `icon:` → `Icon:` + `ActiveTypeIcon` en el circular; Evento en verde activo |
| `version_0.2.26_Icono_circular_dinamico.md` | Este documento |

## Verificación de calidad

- `npm run build`: ✅.
- Captura real (estado inicial Pánico): sirena en el circular; el cambio por tipo es re-render directo del estado (mismo mecanismo que el color del botón activo).
- ⚠️ `npm run lint` (tsc) NO ejecutado por orden del dueño (PC con pocos recursos).
- **Sin push** a GitHub (regla de oro).
