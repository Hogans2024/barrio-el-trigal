# Versión 0.2.20 - Slideshow de Noticias, Limpieza de Mascotas, Redes Sociales en Farmacias/Negocios y Correcciones de TypeScript

**Fecha:** 2026-08-09

## Resumen

Esta versión acumula todo el trabajo realizado desde la **versión 0.2.19 (Optimización de Carga Incremental y Corrección de Parpadeo en Infinite Scroll)** hasta el estado actual del proyecto.

Los ejes de esta versión:

1. **Noticias:** nuevo slideshow global en el modal, reglas de visualización de imágenes y tarjetas estilo Mascotas.
2. **Mascotas:** limpieza de *campos fantasma* de `LostPet` e incorporación del campo/botón de Facebook.
3. **CMS:** Mascotas pasa a conectarse directo al JSON en el bloque B comentado de `useSheetData.ts`.
4. **Farmacias (Fase 1 de 2):** botones de redes sociales (solo lectura) en el modal de detalle.
5. **TypeScript — Lazy Loading:** corrección quirúrgica de 313 errores por inferencia fallida del genérico en `useIncrementalBatch`.
6. **TypeScript — Errores preexistentes:** corrección de los 3 errores restantes (AlarmaView + Blob en Mascotas/Negocios).
7. **Negocios (Fase 2):** botones de redes sociales en el modal y eliminación del campo fantasma `distanceInfo`.
8. **CI/Pipeline:** actualización de las acciones del workflow a v5 (elimina el warning de deprecación de Node 20).

> **Nota:** las optimizaciones de `useIncrementalBatch` (fingerprint + `useMemo` de filtros) pertenecen a la **versión 0.2.19**, documentada en `version_0.2.19_Optimizacion_Carga_Incremental_Lotes_y_Correccion_Parpadeo_Infinite_Scroll.md`. Aquí solo se listan las correcciones de TypeScript hechas sobre ese mismo hook.

---

## Cambios por tema desde la versión 0.2.19

### 1. Noticias: tarjetas estilo Mascotas, nuevo modal y reglas de imagen

Corresponde a una serie de commits del motor de Noticias.

- **Tarjetas estilo Mascotas** aplicadas a Noticias/Proyectos/Eventos y modales que respetan el formato de imagen (vertical/cuadrado/horizontal), replicando el comportamiento de las tarjetas de Mascotas (`1511e09`, `be71c03`, `4162521`).
- Imagen de la primera tarjeta de Eventos en 1920x1080 horizontal (`95d5d19`).
- **Nueva modal de Noticias** con botonera ajustada: se quitó "Contactar", "Comentar"+"Ver Detalles" agrupados y centrados, "Comentar" con texto y "Compartir" con la altura del botón "Ver Detalles" (`0b28924`).
- **Regla de imagen en la modal:** la imagen se muestra a tamaño completo (proporción natural). Una imagen horizontal se muestra a ancho completo y centrada verticalmente; una vertical, con alto de 264px y *blur* de fondo, igual que en la tarjeta (`187021c`, `cab8d3a`).
- **Slideshow global en la modal:** cuando el evento tiene más de una imagen (campo `images` en `NeighborhoodEvent`), la modal muestra un carrusel con hasta **5 imágenes** (`.slice(0, 5)`), autoplay cada 4 s, flechas, miniaturas, swipe y pausa al hover; con 1 sola imagen se mantiene la modal simple (`0fdf020`, `e8bf926`).
- Corrección de bug: el `onLoad` de la modal ya no escribe los estados `portraitNews`/`squareNews` (que contaminaban la tarjeta), solo `portraitSlides`/`squareSlides`.

### 2. Mascotas: limpieza de campos fantasma y campo/botón de Facebook

- Se **eliminaron** los campos de deuda de copy-paste de `LostPet`: `phones`, `schedule`, `actionText` y `address`; se conserva `facebook?: string` (`b9af1c3`).
- `getPhoneNumbers` se simplificó a `[pet.contact ?? ...]` (arreglo de teléfonos eliminado).
- Se eliminó el modal/propiedad `schedulePet` (Schedule) de MascotasView.
- Formulario: se reemplazaron los arreglos `newPhones`/`phoneWhatsapp` por un único campo `newPhone`, y se agregó el campo **`newFacebook`** con su input y guardado.
- Modal de detalle: botón **Facebook** con ícono de la marca (premium), que solo aparece si el campo tiene valor (`w-[66px]`, degradado `#1877F2 → #0a4db0`).
- **Datos de prueba:** los 30 mocks de `LOST_PETS_DATA` llevan un link de Facebook de un grupo real ("MASCOTAS PERDIDAS TARIJA") marcado como `NOTA TEMPORAL` (`4e95179`). Se creó el documento `eliminacion_ghosts.md` como registro de la limpieza.

### 3. CMS: Mascotas se conecta directo al JSON

- En `src/hooks/useSheetData.ts`, dentro del **bloque B comentado**, la línea de Mascotas quedó como `mascotas: json.mascotas ?? FALLBACK.mascotas` (`00cc521`).
- El comentario del WORKAROUND se actualizó para indicar que el respaldo forzado ahora aplica **solo a Farmacias y Negocios** (Mascotas ya no forma parte del workaround).

### 4. Farmacias (Fase 1 de 2): redes sociales en el modal

- **Tipo `Pharmacy` ampliado** con `tiktok?`, `instagram?` y `youtube?` (además del `facebook?` ya existente), con comentario `NOTA CMS (Farmacias)` indicando que son de **solo lectura** (no hay formulario de farmacias; el origen exclusivo futuro serán columnas de Google Sheets cargadas por el administrador).
- **Botones en la modal de detalle:** bloque de 4 botones de redes sociales (Facebook/TikTok/Instagram/YouTube) replicando íconos con círculo de marca y enlace "Ver"; cada botón aparece solo si su campo tiene valor (patrón usado posteriormente también en Negocios).
- **Datos de prueba:** una sola farmacia del mock (`p1` Farmacia Kurmi) recibió un valor de `facebook` con `NOTA TEMPORAL` (sin inventar URLs de TikTok/Instagram/YouTube).
- Documentación de **Fase 2 pendiente** para Negocios en la cabecera de `NegociosView.tsx`.
- La línea `farmacias: FALLBACK.farmacias` en `useSheetData.ts` **se mantiene forzada** (aún restan por definir `transport` y `schedule`).

### 5. TypeScript — Corrección quirúrgica del lazy loading (313 errores)

El diagnóstico verificado fue que `useIncrementalBatch<T>()` se llamaba sin especificar `T` en 6 vistas; en el contexto completo del proyecto TypeScript no infería `T` y el arreglo `visibleItems` quedaba como `unknown[]`, generando ~313 errores de "Property X does not exist on type unknown".

- `src/hooks/useIncrementalBatch.ts`:
  - Se agregó `import type { RefObject } from 'react';`.
  - `sentinelRef: React.RefObject<HTMLDivElement | null>` → `sentinelRef: RefObject<HTMLDivElement | null>` (el namespace `React` no estaba importado).
- Se especificó el tipo genérico explícito en las 6 llamadas (cambio exclusivamente de anotación, sin efecto en runtime):
  - `FarmaciasView.tsx` → `useIncrementalBatch<Pharmacy>(filteredPharmacies)`
  - `NegociosView.tsx` → `useIncrementalBatch<LocalBusiness>(filteredBusinesses)`
  - `ProyectosView.tsx` → `useIncrementalBatch<Project>(filteredProjects)`
  - `MascotasView.tsx` → `useIncrementalBatch<LostPet>(filteredPets)`
  - `NoticiasView.tsx` → `useIncrementalBatch<NeighborhoodEvent>(filteredNews)`
  - `EventosView.tsx` → `useIncrementalBatch<NeighborhoodEvent>(filteredEvents)`

### 6. TypeScript — Corrección de los 3 errores preexistentes restantes

El diagnóstico original reportaba "4 errores" fuera del alcance del fix de lazy loading; la medición real arrojó **3**:

- **`AlarmaView.tsx` (tipo `"cancel"`):** el cierre manual del modal de alarma construía un `AlarmLog` con `type: 'cancel'`, inexistente en la unión. Se extendió `AlarmLog.type` en `src/types.alarma.ts` con `'cancel'` y un campo opcional `message?`, y el literal ahora incluye `user` y `status`.
- **MascotasView / NegociosView (Blob):** en la subida de imágenes, el callback de `.map()` sobre los `File` leídos con `FileReader` tenía su parámetro inferido como `unknown`, fallando `readAsDataURL(file)` con "Argument of type 'unknown' is not assignable to parameter of type 'Blob'". Se anotó el parámetro como `(file: File)`.

### 7. Negocios (Fase 2): botones de redes sociales y eliminación de `distanceInfo`

Completa la nota de "FASE 2 PENDIENTE" agregada en la fase de Farmacias.

- **Modal de detalle (`activeBiz`):** reemplazado el único enlace "Ver en Facebook" por el mismo patrón de 4 botones de redes sociales de Farmacias (Facebook/TikTok/Instagram/YouTube), cada uno visible solo si su campo tiene valor. Los campos siguen siendo editables por el vecino (formulario → `newBiz.socialNetworks`) y, a futuro, por el administrador en Google Sheets.
- **`distanceInfo?: string` eliminado** de `LocalBusiness` (`src/types.ts`) y su único valor mock en `src/data.ts` ("A 200m de la Plaza Central"), porque nunca se leía ni renderizaba — campo fantasma, mismo criterio que la limpieza de `LostPet`.
- Comentario de cabecera de `NegociosView.tsx` actualizado a "FASE 2 COMPLETADA".

### 8. CI / Pipeline: acciones del workflow a v5

- `.github/workflows/deploy.yml` actualizado de `actions/*@v4` a `@v5` (`checkout`, `setup-node`, `configure-pages`, `upload-pages-artifact`, `deploy-pages`) para eliminar el warning de deprecación de Node 20 y estar alineado con Node 24 (`e2e4ffb`).

### 9. Otros (documentación)

- `PROMPT_MAESTRO_v2.md` pasa a ser la **única fuente de verdad** del proyecto; `Como_debes_trabajar.md` queda marcado como SUPERSEDIDO (`ab65a54`).

---

## Archivos modificados (recuento)

| Archivo | Motivo |
| --- | --- |
| `src/hooks/useIncrementalBatch.ts` | `RefObject` en `sentinelRef` + anotación del hook (el fingerprint/parpadeo es de la 0.2.19) |
| `src/components/NoticiasView.tsx` | Slideshow, reglas de imagen, modal, tarjetas, genérico |
| `src/components/MascotasView.tsx` | Limpieza LostPet, Facebook, fix Blob, genérico |
| `src/components/NegociosView.tsx` | Fase 2 redes, fix Blob, genérico, doc Fase 2 |
| `src/components/EventosView.tsx` / `ProyectosView.tsx` | Tarjetas estilo Mascotas + genérico |
| `src/components/FarmaciasView.tsx` | Redes sociales Fase 1 + genérico |
| `src/components/AlarmaView.tsx` | Fix de tipo `AlarmLog` (cancel) |
| `src/types.ts` | `Pharmacy` ampliado, `distanceInfo` eliminado, `LostPet` limpio |
| `src/types.alarma.ts` | `AlarmLog.type` + `message?` |
| `src/data.ts` | Facebook en mocks, distanceInfo eliminado, test farmacia |
| `src/hooks/useSheetData.ts` | Mascotas directo al JSON + comentario WORKAROUND |
| `.github/workflows/deploy.yml` | Acciones v5 |
| `eliminacion_ghosts.md` | Documento de limpieza de campos fantasma |

---

## Verificación de calidad

- **Typecheck:** en esta máquina `tsc --noEmit` global no completa por límite de memoria (OOM ~2-4 GB). Se verificó por **batches reducidos** (`tsconfig` temporales que extienden el del proyecto y cubren, en conjunto, todo el grafo de `src/`): ambas corridas con **0 errores** tras los fixes de las secciones 5 y 6.
- **Vite Build (`npm run build`):** PASADO (2091 módulos, bundle en `dist/`). Aviso no bloqueante de chunk >500 kB (preexistente).
- **Prueba manual (infinite scroll):** verificada visualmente por el dueño en el navegador local. **Mascotas y Farmacias** cargan las tarjetas de 5 en 5 al hacer scroll, sin parpadeos ni cambios de comportamiento respecto a antes del cambio de anotación de tipos.

---

## Notas y pendientes

- Los cambios de esta versión se encuentran **sin commit/push** en el working directory (decisión del dueño de revisión manual previa).
- **Fuera de alcance / futuras sesiones:**
  - Definir fuente de datos real para `transport` y `schedule` de `Pharmacy` para poder revertir `farmacias: FALLBACK.farmacias` en `useSheetData.ts`.
  - Conectar Farmacias y Negocios al CMS (hoy forzados a fallback local).
  - Campos aún editoriales: `socialNetworks` del formulario de Negocios guarda también WhatsApp y X (Twitter) que no se mapean a campos de `LocalBusiness`.