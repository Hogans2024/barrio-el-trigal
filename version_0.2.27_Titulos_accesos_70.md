# Versión 0.2.27 - Títulos de accesos directos al 70%

**Fecha:** 2026-10-01

## Resumen

Los títulos blancos de los 4 accesos directos de Alarma (Eventos, Farmacias, Mascotas, Negocios) bajan su opacidad un 30% (pedido del dueño; primero se probó −40% y fue mucho).

## Cambios realizados (`src/components/AlarmaView.tsx`)

- `<h4>` de `QUICK_ACCESS_ITEMS`: `text-white` → `text-white/60` → final `text-white/70`. El hover amarillo y los subtítulos grises intactos.

## Archivos modificados

| Archivo | Motivo |
| --- | --- |
| `src/components/AlarmaView.tsx` | Títulos al 60% |
| `version_0.2.27_Titulos_accesos_60.md` | Este documento |

## Verificación de calidad

- `npm run build`: ✅.
- Captura real (390px): títulos atenuados.
- ⚠️ `npm run lint` (tsc) NO ejecutado por orden del dueño (PC con pocos recursos).
- **Sin push** a GitHub (regla de oro).
