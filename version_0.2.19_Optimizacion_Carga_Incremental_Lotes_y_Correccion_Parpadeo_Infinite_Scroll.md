# Versión 0.2.19 - Optimización Carga Incremental Lotes y Corrección Parpadeo Infinite Scroll

## Cambios realizados desde la versión 0.2.18

- **Corrección de Causa Raíz de Parpadeo en Infinite Scroll (`src/hooks/useIncrementalBatch.ts`):** 
  - Se modificó la lógica de reinicio del hook de carga por lotes (`useIncrementalBatch`). En lugar de depender de la igualdad por referencia del arreglo fuente (`items !== prevItemsRef.current`), se implementó un sistema de *fingerprint* liviano (basado en la longitud del arreglo y los IDs del primer, medio y último elemento).
  - Esto evita que la generación de un nuevo arreglo al re-renderizar el componente padre reinicie el conteo a 5 tarjetas de forma enbucle, resolviendo el bug donde la 6ª tarjeta parpadeaba e impedía cargar las tarjetas siguientes.

- **Estabilización de Referencias con `useMemo` en las 6 Vistas Principales:**
  - Se envolvió el cálculo de arreglos filtrados (`.filter()`) dentro de un `useMemo` con sus respectivas dependencias (`search`, `selectedCategory`, y arreglo base) en todos los módulos de la aplicación:
    1. `src/components/MascotasView.tsx` (`filteredPets`)
    2. `src/components/EventosView.tsx` (`filteredEvents`)
    3. `src/components/FarmaciasView.tsx` (`filteredPharmacies`)
    4. `src/components/NegociosView.tsx` (`filteredBusinesses`)
    5. `src/components/NoticiasView.tsx` (`filteredNews`)
    6. `src/components/ProyectosView.tsx` (`filteredProjects`)

- **Preparación de Arquitectura de Rendimiento (Capa 1):**
  - Se añadieron los encabezados de documentación y comentarios técnicos orientados a futuro (CAPA 2: compresión local en navegador, y CAPA 3: migración e integración con Cloudinary CDN).

## Verificación de Calidad
- **TypeScript Typecheck (`npx tsc --noEmit`):** PASADO (0 errores).
- **Vite Build (`npm run build`):** PASADO (0 errores, built en dist/).
