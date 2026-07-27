# Versión 0.2.15 — Header: CSS Grid + botón Volver Atrás en App.tsx + centrado dinámico + modal sin gap + scroll reparado

## Fecha
2026-07-27

## Propósito
Refactorizar el header de `flex` a `CSS Grid` para centrar exactamente el logo+texto "BARRIO El Trigal" entre el borde derecho del botón "Volver Atrás" (alarma con teclado) y el borde izquierdo del botón campana. Mover el botón "Volver Atrás" del interior del modal `ActiveAlarmModal` al header de `App.tsx` para navegación unificada. Eliminar el gap superior del modal. Reparar scroll roto por la ausencia de `overflow-hidden`.

---

## Cambios realizados

### 1. Header: Flex → CSS Grid (`src/App.tsx`)
- Header cambió de `display: flex items-center` a `display: grid items-center`
- Se agregó `style={{ gridTemplateColumns: ... }}` dinámico según estado:
  - Alarma con buscardor (`activeTab === 'alarma' && !isAlarmaKeypadOpen`): `auto auto 1fr`
  - Cualquier otro estado: `auto minmax(0, 1fr) auto`
- Se eliminó `overflow-hidden` del contenedor `flex-1 flex-col` que envuelve header+main (luego restaurado en fix de scroll)

### 2. Nuevo estado `isAlarmaKeypadOpen` (`src/App.tsx`)
- `useState<boolean>(false)` para saber cuándo el teclado digital de la alarma está abierto
- Se pasa `setIsAlarmaKeypadOpen` a `<AlarmaView>` vía prop `onKeypadOpenChange`

### 3. Botón "Volver Atrás" movido del modal al header (`src/App.tsx`, `src/components/ActiveAlarmModal.tsx`)
- `ActiveAlarmModal` perdió su botón "Volver Atrás" interno (con `ArrowLeft`)
- El header de `App.tsx` ahora renderiza el botón "Volver Atrás" amarillo cuando `activeTab === 'alarma' && isAlarmaKeypadOpen`:
  - Icono `ArrowLeft` (lucide-react) — nuevo import
  - Estilo: `text-[#FFD700] bg-white/5 border border-white/10 rounded-xl ml-[9px]`
  - Texto "Volver Atrás" con `whitespace-nowrap`
  - Llama a `goBackTab()` que a su vez consulta `backHandlerRef` para cerrar el modal primero
- Se agregó `onRegisterBackHandler` prop a `AlarmaView` para que el modal registre su propio manejador de back

### 4. Sección izquierda del header simplificada (`src/App.tsx`)
- Se eliminó `className` condicional `${activeTab === 'alarma' ? 'flex-none' : 'flex-1'}`
- Ahora es siempre `flex justify-start items-center` sin flex-1/flex-none
- El ancho lo controla el grid column `auto`

### 5. Sección central del header: centrado dinámico (`src/App.tsx`)
- Contenedor siempre presente en el DOM (antes solo existía si `activeTab !== 'alarma'`)
- Contenido visible cuando `activeTab !== 'alarma' || isAlarmaKeypadOpen`
- Se eliminó el hack `-ml-[125px]` que desplazaba forzadamente el contenido
- **Nuevo centrado visual** con `paddingRight: clamp(0px, calc((100vw - 300px) * 0.4), 8px)`:
  - A 300 px de ancho: 0 px (sin ajuste)
  - A 320 px: 8 px
  - Se clampa en 8 px máximo
  - Empuja el centro visual del grupo hacia la izquierda, compensando la asimetría
- Logo con `relative left-[1px]` solo en estado keypad
- Texto con `ml-[0.3px]` solo en estado keypad
- Font sizes reducidos para pantallas pequeñas (`text-[10px]` BARRIO, `text-[15px]` El Trigal)
- `whitespace-nowrap` en el título para evitar quiebre de línea

### 6. Sección derecha del header simplificada (`src/App.tsx`)
- Se eliminó el `flex-1` condicional que tenía cuando `activeTab === 'alarma'` (ahora el grid column `1fr` lo maneja)
- Ajustes de spacing para keypad abierto: `ml-[7px] xs:ml-3 space-x-[1px] -translate-x-[9.4px] xs:translate-x-0`
- Search bar oculto cuando `isAlarmaKeypadOpen`

### 7. AlarmaView: props y back handler (`src/components/AlarmaView.tsx`)
- Nuevas props: `onKeypadOpenChange`, `onRegisterBackHandler`
- `useEffect` notifica a App.tsx cuando `isAlarmActive` cambia
- `useEffect` registra un back handler cuando el modal está abierto (cierra el modal y retorna `true`)
- Carousel `-mt-6` eliminado (ya no necesario sin el gap)

### 8. ActiveAlarmModal: header rediseñado (`src/components/ActiveAlarmModal.tsx`)
- Botón "Volver Atrás" (con `ArrowLeft`) eliminado del modal (movido a App.tsx)
- Header del modal ahora está centrado con `justify-start sm:justify-center`
- Contenido del header limitado a `max-w-[220px] mx-auto` en mobile
- Icono `ml-[-8px] sm:ml-0` para alinear visualmente
- Espaciador `w-10 sm:w-[100px]` eliminado (ya no necesario)

### 9. Modal gap superior eliminado (`src/components/ActiveAlarmModal.tsx`)
- `pt-14` (56 px) → `pt-[45px]` (altura exacta del header)
- `-mt-2 sm:mt-0` eliminado del contenedor interno (ya no necesario)

### 10. Scroll reparado (`src/App.tsx`)
- Se restauró `overflow-hidden` en el contenedor `flex-1 flex-col` que envuelve header+main
- Sin `overflow-hidden`, el `overflow-y: auto` del `<main>` no establecía correctamente el contexto de scroll dentro de la cadena de flex items
- Causa raíz: el refactor a CSS Grid eliminó `overflow-hidden` porque parecía redundante, pero era necesario para que el navegador calcule la altura finita del `<main>` y active el scroll

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/App.tsx` | Header flex→grid, nuevo `isAlarmaKeypadOpen`, botón Volver Atrás amarillo, centrado con `clamp()`, right column simplificada, main padding condicional, scroll fix `overflow-hidden` |
| `src/components/AlarmaView.tsx` | Nuevas props `onKeypadOpenChange`/`onRegisterBackHandler`, back handler useEffect, carousel `-mt-6` eliminado |
| `src/components/ActiveAlarmModal.tsx` | Botón Volver Atrás eliminado, header rediseñado centrado, `pt-[45px]`, `-mt-2` eliminado |

---

## Problemas encontrados y soluciones

### Problema: scroll no funciona en ninguna sección
- **Causa**: El refactor a CSS Grid eliminó `overflow-hidden` del contenedor `flex-1 flex-col` que envuelve header+main
- **Solución**: Restaurar `overflow-hidden` en ese contenedor

### Problema: gap entre modal y header
- **Causa**: `pt-14` (56px) no coincidía con la altura del header (~45px), y `-mt-2` no compensaba correctamente por `items-start` en el flex padre
- **Solución**: `pt-[45px]` y eliminar `-mt-2`

---

## Próximos pasos
- *(ninguno)* — funcionalidad completa del header y modal.

---

# ANEXO — Estado General del Proyecto (Julio 2026)

## Objective
Frontend de la app Barrio El Trigal en fase de pre-reconexión del CMS (Google Sheets → Apps Script → data.json → GitHub Pages).

## Important Details
- **Cada cambio debe incluir comentarios** `CMS_READY`, `CMS_PENDING` o `CMS_CONNECTED` para facilitar la reconexión futura.
- **No subir cambios a GitHub sin autorización explícita** del usuario.
- **GitHub presenta fallas intermitentes de DNS** (Could not resolve host: github.com).
- **Paleta oficial:** `--color-brand-yellow: #FFD700`, `--color-brand-green: #4AE183`, `--color-brand-red: #E74C3C`. Fondo `#070707`.
- **Breakpoints custom:** `tall:` (≥700 px altura), `xs:` (≥480 px).
- **Navegación SPA** sin react-router: `navigateToTab(id)` o evento `navigate`.
- **`useSheetData.ts`** tiene BLOQUE A activo (fallback local) y BLOQUE B comentado (fetch real). **NO tocar sin instrucción explícita**.
- **Las secciones Alarma y Afiliación NO usan CMS**; tienen datos propios y no deben conectarse.

---

## Work State

### Completed (v0.2.71 → v0.2.73 + fixes)

1. **Header refactorizado a CSS Grid** con `gridTemplateColumns` dinámico para control preciso de anchos de columna.

2. **Botón "Volver Atrás" amarillo** en el header de App.tsx para el estado de teclado digital de alarma, reemplazando el botón interno del modal.

3. **Centrado dinámico del logo+texto** sin JavaScript: `paddingRight: clamp(0px, calc((100vw - 300px) * 0.4), 8px)` en el grupo del centro, más `relative left-[1px]` en el logo para compensar asimetrías visuales.

4. **Ajustes finos de espaciado:**
   - Gap logo-texto reducido: `ml-[1.6px]` → `ml-[0.3px]`
   - Gap campana-hamburguesa: `space-x-0.5` → `space-x-[1px]`
   - Columna derecha: `-translate-x-[9.4px]` para alineación visual

5. **Modal ActiveAlarmModal sin gap superior:** `pt-[45px]` (coincide con altura del header), `-mt-2` eliminado.

6. **Overflow-hidden restaurado** en contenedor `flex-1 flex-col` para habilitar scroll.

7. **Mecanismo de "Volver Atrás" unificado:** `backHandlerRef` permite que el modal de alarma intercepte el botón back del header y cierre el modal antes de navegar.

### Active
- *(ninguno)*

### Blocked
- *(ninguno)*

### Next Move
1. *(ninguno — esperar instrucciones del usuario)*

---

## Relevant Files

| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `src/App.tsx` | Header CSS Grid, centrado dinámico, scroll container, `isAlarmaKeypadOpen` state | 735 |
| `src/components/ActiveAlarmModal.tsx` | Modal de activación/desactivación de alarma con PIN, temporizador 90s, sirena Web Audio | 595 |
| `src/components/AlarmaView.tsx` | Vista principal de alarma con carrusel, botones de activación, bitácora | 488 |
| `src/hooks/useSheetData.ts` | **BLOQUE A activo, BLOQUE B comentado — NO TOCAR** | 171 |
| `version_0.2.14_Afiliacion_boton2_busqueda_vecino_restaurada.md` | Documentación de versión anterior | 275 |
| `version_0.2.15_Header_Grid_Modal_Scroll.md` | Este archivo | — |
