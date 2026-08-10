# Versión 0.2.21 - Limpieza de Código Muerto en Proyectos (imports clonados, `hasMore` y `stickyBarHeight` sin uso)

**Fecha:** 2026-08-09

## Resumen

Limpieza de *código fantasma/muerto* en la sección **Proyectos** (`src/components/ProyectosView.tsx`), detectada tras auditar la sección siguiendo el mismo criterio aplicado antes a otras secciones (limpieza de LostPet, `distanceInfo` en Negocios, etc.).

Todos estos residuos venían de la **clonación del motor de Noticias** hacia Eventos/Proyectos (commits `51d0e4a`, `4b0524e`, `7590cac`, `1511e09`): al copiar la vista, también se copiaron imports y estados que la sección no usa. No causaban errores de TypeScript (tsc daba 0), pero ensuciaban el código con elementos que no hacen nada.

## Cambios realizados

### 1. Eliminados 14 imports de `lucide-react` sin uso (línea 2)

`Calendar`, `Users`, `HeartHandshake`, `HelpCircle`, `Eye`, `Pill`, `PawPrint`, `Store`, `Newspaper`, `Trophy`, `Briefcase`, `Bus`, `Globe`, `Cpu`.

- Son **residuos de la clonación**: iconos de otras secciones (Pill = Farmacias, PawPrint = Mascotas, Store = Negocios, Newspaper = Noticias, etc.) que Proyectos nunca renderiza.
- Se conservaron solo los iconos realmente usados por Proyectos: `Search`, `MapPin`, `Heart`, `MessageCircle`, `X`, `LayoutGrid`, `CheckCircle`, `PanelLeft`, `Phone`, `Building2`, `Home`, `Clock`, `FileText`, `Zap`, `Shield`, `Images`, `UserCircle2`, `IdCard`.

### 2. Eliminado `hasMore` de la destructuración del hook

- `useIncrementalBatch<Project>(...)` devuelve `hasMore`, pero la vista nunca lo leía (el `sentinelRef` SIEMPRE está montado por regla del proyecto, no condicionado a `hasMore`).
- La línea quedó: `const { visibleItems: visibleProjects, sentinelRef: batchSentinelRef } = useIncrementalBatch<Project>(filteredProjects);`

### 3. Eliminado el estado muerto `stickyBarHeight` + su `useLayoutEffect`

- `stickyBarHeight` se seteaba con `setStickyBarHeight` y un `ResizeObserver`, pero **el valor nunca se leía** en ningún lugar del JSX.
- Al eliminarlo, también quedó sin uso el hook `useLayoutEffect`, que también se quitó del import de React (primera línea).
- `stickyBarRef` **se conservó** porque sí se usa (en el layout sticky de la barra).

## Archivos modificados

| Archivo | Motivo |
| --- | --- |
| `src/components/ProyectosView.tsx` | Limpieza de imports sin usar, `hasMore` y estado `stickyBarHeight` |

## Verificación de calidad

- **TypeScript (`tsc --noEmit`)** sobre el grafo completo de Proyectos (vista + `types.ts` + `useIncrementalBatch` + `data.ts`): **0 errores**.
- **Vite Build (`npm run build`)**: PASADO (2091 módulos, bundle generado en `dist/`). Aviso preexistente no bloqueante de chunk >500 kB.
- **Sin cambios de comportamiento**: los elementos eliminados no tenían efecto en runtime (imports sin usar, valor nunca leído, flag interno nunca consultado).

## Notas

- Los cambios de esta versión se suben a GitHub junto con este documento.
- Pendiente para próximas sesiones (misma auditoría, otras vistas): Noticias, Eventos, Alarma y Afiliación podrían tener residuos similares de clonación si se quiere la misma higiene del código.