# Versión 0.1.42 — Modal Centro de Llamadas

## Fecha
2026-07-17

## Propósito
Reemplazar la antigua simulación VoIP de la Central de Llamadas por un marcador directo `tel:`, renovar los contactos de emergencia, y preparar todo para la futura integración con Google Sheets + Code.gs + GitHub Pages.

---

## Cambios realizados

### 1. Eliminación de simulación VoIP (CallModal.tsx)
**Antes:** El modal tenía estados `connecting/ringing/active`, reproducía tonos con `playTone()`, mostraba un contador de duración, y tenía botón "Colgar".

**Ahora:** Al presionar cualquier contacto se abre el marcador nativo del dispositivo vía `window.location.href = 'tel:...'`. Sin simulación, sin audio, sin contador.

**Archivos modificados:** `src/components/CallModal.tsx`

### 2. Nuevos contactos de emergencia (data.alarma.ts)
Se reemplazó la lista anterior por 8 contactos:

| id | name | number | category | icon |
|----|------|--------|----------|------|
| 1 | Activar alarma llamando | 72944411 | serenazgo | Phone |
| 2 | Policía Nacional (EPIC) | 110 | policia | Shield |
| 3 | Tránsito Emergencias | 111 | transito | Car |
| 4 | Bomberos Voluntarios | 119 | bomberos | Flame |
| 5 | Ambulancias Emergencias | 118 | ambulancia | Cross |
| 6 | Hospital San Juan de Dios | 4 664-5555 | salud | Heart |
| 7 | Hospital San Juan de Dios | 4 664-2883 | salud | Heart |
| 8 | Coordinador de Seguridad | 72944810 | vecinal | User |

**Nota:** Todos son números de ejemplo (placeholders). No son números reales de emergencia.

**Archivos modificados:** `src/data.alarma.ts`

### 3. Nuevas categorías en EmergencyContact (types.alarma.ts)
Se añadieron `'transito'` y `'ambulancia'` al union type de `category`:

```
category: 'policia' | 'serenazgo' | 'transito' | 'bomberos' | 'salud' | 'vecinal' | 'ambulancia'
```

**Archivos modificados:** `src/types.alarma.ts`

### 4. Icono de Policía cambiado a verde
**Antes:** `text-amber-400` (amarillo/dorado)
**Ahora:** `text-emerald-400` (verde), para diferenciarlo de Serenazgo que sigue siendo dorado `text-[#FFD700]`.

**Archivos modificados:** `src/components/CallModal.tsx`

### 5. Reducción de altura de las tarjetas de contacto (~15%)
- `p-4` → `py-3 px-4` (padding vertical 16px → 12px)
- `w-11 h-11 rounded-xl` → `w-10 h-10 rounded-lg` (icono 44px → 40px)
- `space-x-4` → `space-x-3` (separación 16px → 12px)

**Archivos modificados:** `src/components/CallModal.tsx`

### 6. Alineación exacta del botón número con "Número directo:"
Se añadió `relative top-2` al botón del número para que quede exactamente en la misma línea horizontal que el texto "Número directo:".

**Archivos modificados:** `src/components/CallModal.tsx`

### 7. Ocultar número visual de "Activar alarma llamando"
El contacto con id `'1'` no muestra el botón verde con el número (`72944411`), pero el botón de llamada (icono Phone) sigue marcando ese número al presionarlo.

**Archivos modificados:** `src/components/CallModal.tsx`

### 8. Nuevo campo `label` en EmergencyContact
Se añadió `label?: string` opcional al interface. Define el texto que se muestra junto al número (ej: "Número directo:"). Si no se define, el frontend muestra `'Número directo:'` por defecto.

**Archivos modificados:** `src/types.alarma.ts`, `src/data.alarma.ts`, `src/components/CallModal.tsx`

### 9. Comentarios de migración futura
Se actualizaron todos los comentarios en los 3 archivos para documentar que en el futuro:
- Toda la información de la modal (título, subtítulo, contactos) se editará desde Google Sheets
- Code.gs (Apps Script) leerá la hoja "Contactos_Emergencia"
- `sheetToObjects()` convertirá filas a JSON
- `exportDataToGitHub()` publicará en GitHub Pages
- El frontend consumirá: `json.emergencyContacts ?? EMERGENCY_CONTACTS`
- El nombre del array en Code.gs es `HOJAS_PARA_LA_WEB` (hojas que se publican en la web)

**Archivos modificados:** `src/types.alarma.ts`, `src/data.alarma.ts`, `src/components/CallModal.tsx`

### 10. Limpieza de código residual
- Comentario `EMERGENCY VOIP TELEPHONE DIALER MODAL` → `EMERGENCY DIRECT DIALER MODAL`
- Sin código zombi: no quedan estados, funciones, imports ni lógica de la versión VoIP anterior.

**Archivos modificados:** `src/components/AlarmaView.tsx`

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/components/CallModal.tsx` | Nueva lógica tel:, layout, iconos, label dinámico, comentarios |
| `src/data.alarma.ts` | 8 nuevos contactos, campo label, comentarios |
| `src/types.alarma.ts` | Nuevas categorías, campo label opcional, comentarios |
| `src/components/AlarmaView.tsx` | Comentario de modal corregido |

---

## Próximos pasos (Fase Backend)
1. Crear hoja "Contactos_Emergencia" en Google Sheets con columnas: `id, name, number, category, icon, label`
2. Añadir `"Contactos_Emergencia"` al array `HOJAS_PARA_LA_WEB` en Code.gs
3. Code.gs: sheetToObjects() → exportDataToGitHub()
4. Frontend: leer `json.emergencyContacts` con fallback a `EMERGENCY_CONTACTS`
