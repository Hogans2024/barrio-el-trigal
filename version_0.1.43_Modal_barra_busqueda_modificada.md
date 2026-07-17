# Versión 0.1.43 — Barra de búsqueda responsive con enfoque expandido

## Fecha
2026-07-17

## Propósito
Mejorar la experiencia de búsqueda en la vista Alarma: la barra se expande hasta el borde derecho al enfocarse, ocultando temporalmente los íconos de notificación y menú para maximizar el espacio de escritura.

---

## Cambios realizados

### 1. Estado `isSearchFocused` (App.tsx)
Se añadió un nuevo estado booleano `isSearchFocused` para controlar cuándo el usuario está escribiendo en la barra de búsqueda.

- Se activa con `onFocus` en el input.
- Se desactiva al hacer clic fuera del contenedor (click-outside via `searchRef` + `useEffect`).
- También se desactiva al presionar BUSCAR o seleccionar un resultado del dropdown.

**Archivos modificados:** `src/App.tsx`

### 2. Ocultamiento de íconos al escribir
Cuando `isSearchFocused = true`:
- **Campana de notificaciones** → `hidden`
- **Perfil (desktop)** → `hidden` (se añade clase)
- **Menú hamburguesa (mobile)** → `hidden`

Cuando el usuario sale de la búsqueda, los íconos vuelven a su estado original.

**Archivos modificados:** `src/App.tsx`

### 3. Expansión de la barra hacia el borde derecho
Cuando `isSearchFocused = true`:
- El contenedor padre cambia a `ml-0 space-x-0` (sin margen izquierdo ni espacio entre ítems).
- El contenedor de búsqueda usa `flex-1 -mr-5`, cancelando el `pr-5` del header para llegar al ras de la pantalla.
- El `border-radius` derecho se elimina (`rounded-r-none border-r-0`) para que el borde no se vea cortado.
- Se elimina `max-w-[200px]`, permitiendo que la barra ocupe todo el espacio disponible.

Cuando `isSearchFocused = false`:
- La barra vuelve a `max-w-[200px]` con `rounded-xl` y bordes normales.
- Los íconos reaparecen.
- El padre vuelve a `ml-3 space-x-1.5`.

**Archivos modificados:** `src/App.tsx`

### 4. Click-outside para colapsar
Se agregó un `useEffect` con `mousedown` listener en el documento: si el clic ocurre fuera de `searchRef`, se desactiva `isSearchFocused`. El listener solo está activo mientras el estado es `true`, para no afectar el rendimiento.

**Archivos modificados:** `src/App.tsx`

### 5. Resultados del dropdown también colapsan
Los 4 items del dropdown de resultados (Farmacias, Mascotas, Eventos, Negocios) ahora también llaman a `setIsSearchFocused(false)` al hacer clic, para que la barra se colapse después de navegar.

**Archivos modificados:** `src/App.tsx`

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/App.tsx` | Nuevo estado `isSearchFocused`, ref `searchRef`, click-outside handler, expansión condicional de la barra, ocultamiento de íconos |

---

## Próximos pasos
- *(ninguno)* — funcionalidad completa, esperando siguiente solicitud.
