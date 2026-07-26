# Versión 0.2.13 — Alarma: escudo en contenedor amarillo, textos bajo flecha, menú móvil clon del sidebar

## Fecha
2026-07-23

## Propósito
Reorganizar la superposición del carrusel de Alarma (escudo + textos) y reemplazar el menú hamburguesa móvil por un clon exacto del sidebar de escritorio.

---

## Cambios realizados

### 1. Escudo amarillo restaurado en carrusel
- Vuelto a colocar el escudo `Shield` dentro de un contenedor con fondo amarillo (`bg-[#FFD700]/10`, `rounded-lg`, `border border-[#FFD700]/20`, `backdrop-blur-md`)
- Posicionado en `top-1.5 left-8` (esquina superior izquierda, con ajuste progresivo `left-3` → `left-5` → `left-7` → `left-8`)
- Espacio reducido entre escudo y texto: `space-x-2` → `space-x-1`

### 2. Textos del carrusel movidos bajo la flecha izquierda
- El gradiente y los textos (`title`, `subtitle`, `description`) pasaron de estar centrados verticalmente en el lado izquierdo (`absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex flex-col justify-center`) a la parte inferior del carrusel (`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end`)
- Desplazados ligeramente a la derecha: `pl-7 pr-4 tall:pl-9 tall:pr-6 sm:pl-13 sm:pr-10`

### 3. Tamaños de fuente unificados
- Todos los textos del carrusel (`title`, `subtitle`, `description`) y "Central de Alarma Vecinal" uniformados a `text-base` (16px)
- Subtítulo amarillo (`subtitle`) reducido a `text-sm` (14px) por separado

### 4. Menú hamburguesa móvil reemplazado por clon del sidebar desktop
- **Eliminado**: estilo anterior con fondo `bg-[#121212]`, emojis, header "BARRIO EL TRIGAL" con botón X, y footer de "Contacto Directiva"
- **Nuevo**: clon exacto del sidebar de escritorio:
  - Fondo `bg-black/40` con `backdrop-blur-xl`
  - Logo grande (`w-16 h-16`) con "BARRIO / El Trigal"
  - Íconos Lucide (`Siren`, `LayoutGrid`, `Calendar`, `PlusSquare`, `Store`, `Heart`, `Newspaper`, `Users`) con highlight amarillo en el activo
  - Botón "Perfil / Usuario" con ícono `User`
  - Footer "Tarija Unida • 2026"
  - Cierre al tocar fuera del drawer (overlay `onClick`)
- "ZONA SUR TARIJA" cambiado a "BARRIO"

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/components/AlarmaView.tsx` | Escudo en contenedor amarillo, textos bajo flecha izquierda, tamaños de fuente unificados |
| `src/App.tsx` | Menú hamburguesa reemplazado por clon del sidebar desktop; "ZONA SUR TARIJA" → "BARRIO" |

---

## Próximos pasos
- *(ninguno)* — ajustes visuales completados según requerimientos actuales.
