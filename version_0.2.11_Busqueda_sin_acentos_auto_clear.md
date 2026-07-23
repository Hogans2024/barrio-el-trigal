# Versión 0.2.11 — Búsqueda sin acentos + auto-clear + refactor UI del modal de activación

## Fecha
2026-07-22

## Propósito
Rediseño completo del modal de activación de alarma vecinal (ActiveAlarmModal) y mejoras en la barra de búsqueda global. Se unificó la experiencia del botón de activación, se refinaron los estados visuales (sin dígitos / con dígitos / 8+ dígitos), se agregó efecto typing, se rediseñó el botón cerrar con estilo "Volver Atrás", y se mejoró la usabilidad de la búsqueda global (cierre al presionar fuera, auto-clear del texto tras 20s, búsqueda sin acentos ni mayúsculas).

---

## Cambios realizados

### 1. Display de dígitos (ActiveAlarmModal)
- Display simplificado: caracteres como `<span>` plano sin bordes ni fondos
- Cursor dorado parpadeante `|` al final de la inserción
- Sin guiones bajos `_` de placeholder

### 2. Texto superior de instrucción
Tres estados según la cantidad de dígitos ingresados:

| Dígitos | Texto | Color | Efecto |
|---------|-------|-------|--------|
| 0 (sin presionar botón) | ⚠️ PRIMERO DIGITE SU NUMERO DE CELULAR | `#FFD700` (amarillo) | `animate-pulse` |
| 0 (después de presionar botón gris) | ⚠️ PRIMERO DIGITE SU NUMERO DE CELULAR | Blanco | Sin efecto |
| 1–7 | ⚠️ PRIMERO DIGITE SU NUMERO DE CELULAR | Blanco | Sin efecto |
| 8+ | AHORA PRESIONE ACTIVAR ALARMA | Blanco | `animate-typing` (revelado progresivo clip-path con cursor dorado, 0.5s de delay, steps(30)) |

### 3. Botón de acción principal
Tres estados visuales:

| Dígitos | Estilo | Texto |
|---------|--------|-------|
| 0–7 | `bg-gray-600/20` text-gray-500, cursor-not-allowed | 🚨 ACTIVAR ALARMA 00 DIGITOS |
| 0–7 (después de click) | Mismo gris, texto amarillo pulse | ⚠️ PRIMERO DIGITE SU NUMERO DE CELULAR |
| 8+ | `bg-black/40 hover:bg-black/70` text-[#FFD700] font-extrabold, `border-2 border-[#FFD700]`, `shadow-[0_0_30px_rgba(255,215,0,0.15)]` | 🚨 ACTIVAR ALARMA |

- Mismo ancho que la tarjeta del teclado: `w-[90%] mx-auto`
- Borde dorado reducido a `border-2`
- Sin efecto ping ni animate en el botón activo

### 4. Contador de dígitos (counter-pop)
- Animación `counter-pop`: escala 3.0 → 0.7 → 1 en 0.55s
- Sin opacidad intermedia

### 5. Header del modal
- Contenido centrado (escudo + título "Activar Alarma" + "ID TERM: #0912")
- Botón de cerrar en la esquina superior izquierda

### 6. Botón cerrar → "Volver Atrás"
- Reemplazado el icono X (primero rojo, luego azul) por un botón amarillo "← Volver Atrás"
- Estilo idéntico al botón "Volver Atrás" de la sección Afiliados:
  - `bg-white/5 hover:bg-white/10`
  - `text-[#FFD700] hover:text-[#ffe16d]`
  - `border border-white/10`
  - `rounded-xl`
  - Icono `ArrowLeft` + texto "Volver Atrás"
- Posición: `absolute top-1 left-1`

### 7. Búsqueda global — cerrar al presionar fuera
- Se agregó condición `isSearchFocused &&` al render de resultados
- Al presionar en cualquier lugar fuera de la barra de búsqueda: los resultados desaparecen al instante
- Mecanismo: `mousedown` listener a nivel de documento que chequea `searchRef.contains()`

### 8. Búsqueda global — auto-clear del texto tras 20s
- Al presionar fuera, se inicia un `setTimeout` de 20 segundos
- Si el usuario vuelve a la barra antes de los 20s: el timeout se cancela
- Si pasan 20s: se ejecuta `setGlobalSearchQuery('')` y el texto se borra automáticamente
- Timer único, sin bucles ni repeticiones
- Al cambiar de sección (navegación inferior, botón flotante, resultado de búsqueda): se cancela el timeout y se limpia todo inmediatamente

### 9. Búsqueda global — sin acentos ni mayúsculas
- Se agregó función `normalize(s)` que aplica:
  - `toLowerCase()`
  - `normalize('NFD')` + regex `[\u0300-\u036f]` para eliminar diacríticos (tildes, diéresis, etc.)
  - `trim()`
- Tanto el query como los campos de búsqueda se normalizan antes de comparar
- Ejemplo: "canción", "Cancion", "CANCION", "cançión" → todas encuentran los mismos resultados

---

## Detalles técnicos

### ActiveAlarmModal.tsx
- Nuevo estado: `showMissingPinAlert`
- Condiciones de render para texto superior: `enteredPin.length >= 8`, `enteredPin.length < 1 && !showMissingPinAlert`, y caso default
- Condiciones de render para botón: tres ramas (showMissingPinAlert, >= 8, default con counter)
- Clases del botón activo: `bg-black/40 hover:bg-black/70 text-[#FFD700] font-extrabold border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:shadow-[0_0_45px_rgba(255,215,0,0.25)]`
- Header: `justify-center` con botón cerrar en `absolute top-1 left-1`

### App.tsx
- Nuevos refs: `searchTimeoutRef`
- Nueva función: `normalize(s)` para búsqueda sin acentos
- Modificado `useEffect` de click-outside: agrega timeout de 20s y cancela al hacer click dentro
- Modificada condición de render de resultados: `isSearchFocused && (searchResults.length > 0 || globalSearchQuery.length > 0)`
- Modificado `calcRelevance` y `addIfMatch`: usan texto normalizado
- Modificados `navigateToTab`, `goBackTab`, handler de custom event 'navigate', onClick de resultados y botón BUSCAR: todos limpian timeout y búsqueda

### index.css
- Animación `@keyframes counter-pop`: `scale(3.0)` → `scale(0.7)` → `scale(1)` en 0.55s
- Animación `@keyframes typing-reveal`: `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`
- Clase `.animate-typing`: overflow hidden, white-space nowrap, display inline-block, 2s steps(30) end, 0.5s delay, both fill mode, border-right cursor gold

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/components/ActiveAlarmModal.tsx` | Display dígitos, texto superior, botón acción, header centrado, botón Volver Atrás, estados pin |
| `src/App.tsx` | Búsqueda sin acentos, click-outside con timeout 20s, auto-clear, limpieza al cambiar sección |
| `src/index.css` | Animaciones counter-pop y typing-reveal |

---

## Próximos pasos
- *(ninguno)* — funcionalidad completa según requerimientos actuales del modal de activación y búsqueda global.
