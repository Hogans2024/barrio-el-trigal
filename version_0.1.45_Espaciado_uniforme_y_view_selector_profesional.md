# Versión 0.1.45 — Espaciado uniforme 7.2px/12.2px en AfiliacionView y View Selector profesional

## Fecha
2026-07-17

## Propósito
Unificar la estructura visual de todos los formularios dentro de la sección AfiliacionView aplicando un espaciado estándar (padding vertical 12.2px, padding horizontal 7.2px, gap entre hijos 7.2px) para lograr una apariencia consistente y profesional. Además, se renombró el selector de vistas con nombres descriptivos e iconos de Lucide.

---

## Cambios realizados

### 1. View Selector renombrado (SelectOption)
Los nombres de las vistas del selector principal se cambiaron de etiquetas genéricas a nombres profesionales con iconos de Lucide:
- "Alarma" → 🛡️ Gestión Vecinal
- "Farmacias" → 💊 Farmacias El Trigal
- "Mascotas" → 🐾 Mascotas Perdidas
- "Eventos" → 📅 Cartelera de Eventos
- "Negocios" → 🏪 Directorio de Negocios
- "Proyectos" → 🏗️ Proyectos y Obras
- "Noticias" → 📰 Noticias del Barrio

**Archivo modificado:** `src/components/App.tsx`

### 2. Búsqueda de Vecinos (acción ②) reconstruida con espaciado uniforme
Se rediseñó el formulario de búsqueda de vecinos reemplazando el espaciado predeterminado de Tailwind por valores precisos:
- Card: `pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px]`
- Labels: `text-[10px] font-bold uppercase tracking-wider font-mono leading-none`
- Se restauraron labels visibles para cada campo (Nombre, Apellido, C.I., Celular)

**Archivo modificado:** `src/components/AfiliacionView.tsx`

### 3. Espaciado uniforme replicado en todas las acciones de AfiliacionView

#### Acción ① — Registro de Nuevos Afiliados
- 4 secciones (Datos Personales, Contacto, Ubicación, Participación Comunitaria) con padding `12.2px/7.2px` y `gap-[7.2px]`
- Grids internos: `gap-4` → `gap-[7.2px]`
- Fields (label+input): `space-y-1` → `flex flex-col gap-[7.2px]`
- Toggles de Participación: `space-y-0.5` → `flex flex-col gap-[7.2px]`
- Botones de nivel de interés: `space-y-1.5 pt-1` → `flex flex-col gap-[7.2px]`

#### Acción ③ — Estado de Afiliación
- Card con padding uniforme y `flex flex-col gap-[7.2px]`
- Input + botón: `gap-2` → `gap-[7.2px]`
- Resultado dinámico: `mt-4` eliminado (el gap del padre maneja el espaciado)
- Se eliminó el `space-y-3` wrapper innecesario

#### Acción ④ — Tomar Lista de Reunión
- Card con padding uniforme
- Barra de acciones inferior: `pt-3` → `pt-[7.2px]`, `gap-4` → `gap-[7.2px]`

#### Acciones ⑤-⑧ — Requisitos informativos
- Cards con padding uniforme
- Títulos: `mb-4` eliminado
- Listas: `space-y-3` → `flex flex-col gap-[7.2px]`

### 4. Búsqueda Global indexada (sesión anterior)
La barra de búsqueda de Alarma ahora funciona como buscador global indexando datos de todas las secciones con sistema de relevancia y navegación directa al detalle.

**Archivo modificado:** `src/App.tsx` (arrastrado de versión anterior)

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/components/AfiliacionView.tsx` | Espaciado uniforme 7.2px/12.2px en todas las cards y formularios |
| `src/components/App.tsx` | SelectOption renombrado con nombres profesionales e iconos Lucide |

---

## Próximos pasos
- *(ninguno)* — espaciado visual unificado en toda la sección AfiliacionView.
