# Versión 0.2.22 - Limpieza de Código Muerto en Negocios (imports clonados sin uso y `hasMore`)

**Fecha:** 2026-08-09

## Resumen

Segunda ronda de higiene de *código muerto*, ahora en la sección **Negocios** (`src/components/NegociosView.tsx`), con el mismo criterio aplicado en la 0.2.21 (Proyectos): eliminar residuos de la clonación del motor de Noticias que no causan errores de TypeScript pero ensucian el código.

En esta ronda solo se eliminaron los elementos de **riesgo cero** (imports sin uso y una variable destructurada que nunca se leía). **A propósito se dejó intacto `images[]` y `videoUrl`** del tipo `LocalBusiness`: son campos que el formulario de registro sí escribe (subida de varias fotos y link de video) y el dueño planea usarlos en el futuro cercano para mostrar la galería completa y el video en el modal de detalle.

## Cambios realizados

### 1. Eliminados 4 imports de `lucide-react` sin uso (línea 2)

`Calendar`, `Building2`, `Pill`, `PawPrint`.

- Residuos de la clonación: iconos de otras secciones (Pill = Farmacias, PawPrint = Mascotas, Building2 = Proyectos, Calendar = Eventos) que Negocios no renderiza en ningún punto.
- Se conservaron los iconos usados por Negocios: `Search`, `MapPin`, `Phone`, `X`, `LayoutGrid`, `CheckCircle`, `PanelLeft`, `Store`, `HelpCircle`, `Star`, `Clock`, `ShoppingCart`, `PlusCircle`, `Upload`, `Home`, `MessageCircle`, `Bus`, `Navigation`, `ChevronRight`, `Zap`, `Images`, `FileText`, `UserCircle2`, `IdCard`.

### 2. Eliminado `hasMore` de la destructuración del hook

- `useIncrementalBatch<LocalBusiness>(...)` devuelve `hasMore`, pero Negocios nunca lo leía (el `sentinelRef` SIEMPRE está montado por regla del proyecto). Quedó: `const { visibleItems: visibleBusinesses, sentinelRef: batchSentinelRef } = ...`

## Elementos revisados y descartados (NO se tocaron)

| Elemento | Estado | Motivo |
| --- | --- | --- |
| `images?: string[]` en `LocalBusiness` | **Conservado** | El formulario lo escribe (galería de fotos); se usará para galería completa a futuro |
| `videoUrl?: string` en `LocalBusiness` | **Conservado** | El formulario lo escribe; se usará para mostrar video a futuro |
| `stickyBarHeight` | Conservado | Aquí SÍ se usa (spacer de layout, línea 518) — a diferencia de Proyectos |
| `useLayoutEffect` | Conservado | En uso (línea 176) |
| `driveAnimIndex` | Conservado | En uso (animación de vehículos en transporte) |

## Archivos modificados

| Archivo | Motivo |
| --- | --- |
| `src/components/NegociosView.tsx` | Limpieza de 4 imports sin usar y `hasMore` |

## Verificación de calidad

- **TypeScript (`tsc --noEmit`)** sobre el grafo completo de Negocios (vista + `types.ts` + `useIncrementalBatch` + `data.ts`): **0 errores**.
- **Vite Build (`npm run build`)**: PASADO (2091 módulos, bundle generado en `dist/`). Aviso preexistente no bloqueante de chunk >500 kB.
- **Sin cambios de comportamiento**: solo se eliminaron imports sin usar y una variable nunca leída.

## Notas

- Recuento de errores de tsc global tras la verificación dirigida: 0 en el grafo auditado; el proyecto sigue en 0 errores reportados.
- Los campos `images[]`/`videoUrl` quedan documentados aquí como **pendientes de uso futuro** (galería completa y video en modal), no como código muerto a eliminar.