# Clonación Secciones Motor Noticias Optimizadas

**Commit:** `51d0e4a7edd98d4bb00ae742cc3d39e30fbe9ff1`
**Título:** Clonación de motor de Noticias en todas las secciones
**Fecha:** Julio 2026

---

## ¿Qué se hizo?

Se unificó el motor de barra sticky (búsqueda + categorías + vista) de `NoticiasView.tsx` en **las 6 vistas** del proyecto, y se eliminó código muerto.

### Archivos modificados

| Archivo | Cambio principal |
|---------|-----------------|
| `NoticiasView.tsx` | Limpieza: eliminados `headerHeight`, `cardWidth` y sus 2 effects (nunca se leían) |
| `ProyectosView.tsx` | Limpieza: eliminados `headerHeight`, `cardWidth`, `handleLike`, `likes` state, imports `ThumbsUp`/`Heart` |
| `EventosView.tsx` | Limpieza: eliminados `headerHeight`, `cardWidth` y sus 2 effects |
| `FarmaciasView.tsx` | Clonado: engine sticky completo (refs, states, effects) + `cardsContainerRef` |
| `NegociosView.tsx` | Clonado: engine sticky completo (refs, states, effects) + `cardsContainerRef` |
| `MascotasView.tsx` | Clonado: engine sticky completo (refs, states, effects) + `cardsContainerRef` |

### Resumen técnico

- **+477 líneas / −307 líneas** neto
- **0 errores nuevos** de TypeScript
- Bundle JS: 685 kB → 693 kB (8 kB por el engine replicado en 3 vistas nuevas)
- Sin cambios de UI ni funcionalidad visible

### Lo que NO se tocó

- `App.tsx`, `types.ts`, `data.ts`, `useSheetData.ts`
- Texto fijo "Sábado, 24 de Mayo de 2026" en Eventos (placeholder intencional)
- Altura fija `h-[145px]` en tarjetas de Proyectos (decisión deliberada)
- `AlarmaView.tsx`, `AfiliacionView.tsx`

---

## Para cualquier agente AI o programador

Si necesitas continuar desde esta versión:

1. El motor sticky vive en el JSX dentro de un `div` con `ref={stickyBarRef}` y `position: sticky`
2. Cuando el usuario scrollea hacia abajo (`showFloatingBtns = true`), aparecen 4 botones (Categorías, filtro activo, Vista, Buscar) con un campo de búsqueda debajo
3. El ancho del campo de búsqueda se mide dinámicamente via `buttonsRef` + `stickyBarWidth`
4. La altura de la barra sticky se mide via `stickyBarRef` + `stickyBarHeight`
5. `isMobile` controla layout responsive (breakpoint 1024px)
6. Las tarjetas se envuelven en `cardsContainerRef` para futuras mediciones
