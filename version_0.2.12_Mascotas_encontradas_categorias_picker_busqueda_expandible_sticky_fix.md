# Versión 0.2.12 — Mascotas encontradas + categorías + picker + búsqueda expandible + sticky fix

## Fecha
2026-07-22

## Propósito
Expansión completa de la sección Mascotas: datos locales, sección "Encontradas", botones Perdidas/Encontradas siempre visibles, picker al añadir mascota (extraviada/encontrada), categorías con iconos y colores animados, barra de búsqueda expandible al enfocar, y fix del sticky header para que siempre reaparezca al subir. Además se reemplazaron URLs rotas de imágenes en varias secciones.

---

## Cambios realizados

### 1. Datos expandidos y CMS bloqueado
- Farmacias: 4 → 25 con fotos reales de farmacia Unsplash (sin duplicados)
- Eventos: 4 → 15
- Negocios: 15 → 30
- Mascotas: 3 → 20 (cada una con `images[]` de 5 fotos Unsplash del tipo correcto, `w=400&q=60`)
- Noticias: 15 → 20
- Proyectos: 3 → 15
- CMS bloqueado temporalmente en `useSheetData.ts` — BLOQUE A (FALLBACK) activo, BLOQUE B (fetch data.json) comentado con documentación en español

### 2. Sección "Encontradas"
- `FOUND_PETS_DATA` con 15 entradas en `data.ts` (imágenes de lp20→lp6 en reversa)
- Botón **Encontradas** (verde emerald) y **Perdidas** (rojo) siempre visibles en la barra superior
- Texto dinámico: "Mascotas Perdidas:" / "Mascotas Encontradas:" y "Se busca a" / "Encontrado"
- Tarjeta "¿Encontraste un animal perdido?" eliminada

### 3. Botón "Volver Atrás" interno
- Al presionar "Volver Atrás" en la barra superior dentro de Mascotas:
  1. Cierra modal de contacto
  2. Cierra modal de horario
  3. Cierra detalle de mascota activa
  4. Sale de vista "Encontradas" y vuelve a "Perdidas"
  5. Si no hay sub-vista, navega a la sección anterior normalmente
- Implementado mediante `onRegisterBackHandler`

### 4. Barra de búsqueda expandible
- Al enfocar el input de búsqueda: los botones **Perdidas** y **Encontradas** se ocultan
- La barra de búsqueda (`flex-1`) ocupa todo el ancho disponible
- Al presionar fuera (blur): ambos botones reaparecen y la barra vuelve a su posición original
- El mismo comportamiento aplica a ambas instancias del input (layout normal y sticky)

### 5. Picker al añadir mascota
- Al presionar "Añadir Mascota" aparece un modal con dos opciones:
  - **Añadir Mascota Extraviada** (rojo) → formulario completo con campos de nombre, tipo, descripción, última vez visto, teléfono, zona, fecha e imágenes
  - **Añadir Mascota Encontrada** (verde) → formulario adaptado con campo "Lugar encontrado" en vez de "Última vez visto" y placeholder diferente
- Título y notificación se actualizan según el modo seleccionado

### 6. Categorías con iconos y colores animados
- Nuevas categorías: **Conejos**, **Tortugas**, **Otros animales** (renombrado de "Otras")
- Orden: Todos → Perros → Gatos → Aves → Conejos → Tortugas → Otros animales
- Cada categoría tiene su propio icono de Lucide con color único:
  - Perros → `Dog` (amber)
  - Gatos → `Cat` (orange)
  - Aves → `Bird` (sky)
  - Conejos → `Rabbit` (rose)
  - Tortugas → `Shield` (emerald)
  - Otros animales → `HelpCircle` (purple)
- Animación `icon-slide`: los iconos aparecen deslizándose de izquierda a derecha con fade in, escalonados por fila (60ms de delay)
- Formulario "Añadir Mascota" actualizado con las nuevas opciones de tipo

### 7. Botones con estilo unificado
- Botones **Encontradas** y **Perdidas**: mismo estilo que el botón "Todas" (`rounded-full`, `text-xs font-semibold`, `bg-*-500/10 text-*-400 border-*-500/40`)
- Encontradas: siempre verde emerald brillante
- Perdidas: siempre rojo brillante

### 8. Fix sticky header (centinela)
- **Problema**: al volver a la parte superior, a veces el header original (texto, botones Añadir/Perdidas/Encontradas, barra de búsqueda) no reaparecía
- **Causa**: el centinela del `IntersectionObserver` medía solo 1px (`h-px`) y con `threshold: 0` el navegador no siempre disparaba el callback al borde exacto del viewport
- **Solución**:
  - Centinela: `h-px` → `h-1` (4px de alto)
  - `threshold: 0` → `threshold: [0, 0.5, 1]` (múltiples puntos de intersección)
  - Agregado `rootMargin: '-2px 0px 0px 0px'` (tolerancia de 2px en borde superior)

### 9. URLs rotas reemplazadas
- 11 URLs de Unsplash rotas reemplazadas en `data.ts`, `AfiliacionView.tsx`, `NegociosView.tsx`

---

## Detalles técnicos

### MascotasView.tsx
- Nuevos estados: `formMode` ('lost' | 'found'), `showFormPicker`, `searchFocused`
- Nuevos imports: `Dog`, `Cat`, `Bird`, `Rabbit`, `Shield` de lucide-react
- `showFloatingBtns` toggle mejorado con `rootMargin` y `threshold` múltiple
- Perdidas button se oculta condicionalmente con `{!searchFocused && ...}` envuelve ambos botones
- Picker modal con dos botones de acción que setean `formMode` y abren el formulario
- Formulario adapta título, labels, placeholders y notificación según `formMode`
- Categorías extendidas con iconos únicos y animación `icon-slide`
- `DEFAULT_IMAGES` ampliado con Conejo y Tortuga

### App.tsx
- Se pasó `onRegisterBackHandler={registerBackHandler}` a `MascotasView`

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/data.ts` | Datos expandidos en todas las secciones; FOUND_PETS_DATA agregado; 11 URLs rotas reemplazadas |
| `src/hooks/useSheetData.ts` | CMS bloqueado con FALLBACK + comentarios de reconexión |
| `src/components/MascotasView.tsx` | Encontradas/Perdidas toggle, picker, formulario dual, categorías con iconos animados, búsqueda expandible, sticky header fix, Volver Atrás interno |
| `src/App.tsx` | registerBackHandler pasado a MascotasView |
| `src/components/AfiliacionView.tsx` | 1 URL rota reemplazada |
| `src/components/NegociosView.tsx` | 1 URL rota reemplazada |

---

## Próximos pasos
- *(ninguno)* — funcionalidad completa de Mascotas según requerimientos actuales.
