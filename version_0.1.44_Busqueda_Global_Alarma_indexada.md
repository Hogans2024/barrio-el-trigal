# Versión 0.1.44 — Búsqueda Global desde Alarma indexada en todas las secciones

## Fecha
2026-07-17

## Propósito
Convertir la barra de búsqueda de la sección Alarma en un buscador global que indexa los datos de **todas las secciones** del proyecto (Farmacias, Mascotas, Eventos, Negocios, Proyectos, Noticias y la propia Alarma), permitiendo al usuario encontrar cualquier contenido desde un solo lugar y navegar directamente al resultado con su detalle abierto.

---

## Cambios realizados

### 1. Interfaz `SearchResult` y sistema de relevancia (App.tsx)
Se creó el tipo `SearchResult` con los campos: `id`, `section`, `sectionLabel`, `icon`, `title`, `description`, `matchField`, `relevance`.

Se implementó `calcRelevance()` que asigna puntaje según:
- Coincidencia exacta en título → 100 pts
- Título empieza con la búsqueda → 80 pts
- Título contiene la búsqueda → 60 pts
- Descripción contiene la búsqueda → 40 pts
- Otros campos → 20 pts
- Bonus si el campo coincide exactamente con la búsqueda → +15 pts

Los resultados se ordenan globalmente por relevancia descendente (máximo 20 resultados).

**Archivos modificados:** `src/App.tsx`

### 2. Indexación de todas las secciones
La búsqueda indexa:
- **Farmacias**: nombre, dirección, teléfono, barrio
- **Mascotas**: nombre, tipo, barrio, última vez visto, contacto
- **Eventos**: título, categoría, ubicación
- **Negocios**: nombre, categoría, teléfono, dirección
- **Proyectos**: título, ubicación
- **Noticias**: título, categoría, ubicación
- **Alarma**: contactos de emergencia, vecinos, logs, slides del carrusel, accesos rápidos

**Archivos modificados:** `src/App.tsx`

### 3. Dropdown de resultados rediseñado
- Resultados agrupados por sección con ícono representativo
- Secciones ordenadas por la relevancia de su mejor resultado
- Cada resultado muestra: título (negrita) + descripción (truncada a 100 caracteres)
- Línea divisoria horizontal blanca (`border-b border-white/5`) entre secciones
- Cuando no hay resultados: mensaje `No se encontraron resultados para "término"`
- Lista scrolleable con `max-h-[70vh] overflow-y-auto`

**Archivos modificados:** `src/App.tsx`

### 4. Navegación a sección + apertura de detalle
Al hacer clic en un resultado:
1. Se asigna `highlightCardId` con formato `seccion::id`
2. Se cambia la pestaña activa a la sección correspondiente
3. El componente de la sección detecta `highlightId` via `useEffect` y abre automáticamente el modal de detalle del item

**Archivos modificados:** `src/App.tsx`, `src/components/FarmaciasView.tsx`, `src/components/MascotasView.tsx`, `src/components/EventosView.tsx`, `src/components/NegociosView.tsx`, `src/components/ProyectosView.tsx`, `src/components/NoticiasView.tsx`

### 5. Prop `highlightId` y `onClearHighlight` en componentes de sección
Cada componente de sección (Farmacias, Mascotas, Eventos, Negocios, Proyectos, Noticias) ahora acepta:
- `highlightId?: string | null` — id del item a resaltar
- `onClearHighlight?: () => void` — callback para limpiar después de abrir el modal

Un `useEffect` en cada componente parsea `highlightId`, busca el item por id, abre el modal de detalle y llama a `onClearHighlight()`.

**Archivos modificados:** `src/components/FarmaciasView.tsx`, `src/components/MascotasView.tsx`, `src/components/EventosView.tsx`, `src/components/NegociosView.tsx`, `src/components/ProyectosView.tsx`, `src/components/NoticiasView.tsx`

### 6. Limpieza de props obsoletas en AlarmaView
Se eliminó `globalSearchQuery` del interface `AlarmaViewProps` y el `useEffect` que sincronizaba el query local con el global, ya que ahora la búsqueda global se maneja completamente desde `App.tsx`.

**Archivos modificados:** `src/components/AlarmaView.tsx`

### 7. La barra solo aparece en la pestaña Alarma
La barra de búsqueda se mantiene exclusivamente en la vista Alarma (`activeTab === 'alarma'`). Las demás secciones conservan su buscador interno original sin modificaciones.

**Archivos modificados:** `src/App.tsx`

### 8. Restauración del layout original en secciones no-Alarma
Se corrigió el layout del header para que en las secciones que no son Alarma:
- La sección derecha NO tiene `flex-1` (solo ancho de contenido)
- El logo y texto "BARRIO El Trigal" vuelven a estar centrados como en la versión original
- La sección izquierda (botón volver) mantiene `flex-1`

**Archivos modificados:** `src/App.tsx`

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/App.tsx` | SearchResult, índice global, dropdown con relevancia, highlightCardId, layout corregido |
| `src/components/AlarmaView.tsx` | Eliminado globalSearchQuery prop |
| `src/components/FarmaciasView.tsx` | Añadido highlightId + useEffect para apertura de detalle |
| `src/components/MascotasView.tsx` | Añadido highlightId + useEffect para apertura de detalle |
| `src/components/EventosView.tsx` | Añadido highlightId + useEffect para apertura de detalle |
| `src/components/NegociosView.tsx` | Añadido highlightId + useEffect para apertura de detalle |
| `src/components/ProyectosView.tsx` | Añadido highlightId + useEffect para apertura de detalle |
| `src/components/NoticiasView.tsx` | Añadido highlightId + useEffect para apertura de detalle |

---

## Próximos pasos
- *(ninguno)* — funcionalidad completa, esperando siguiente solicitud.
