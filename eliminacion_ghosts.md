# Limpieza de campos fantasma en LostPet + Campo Facebook en formulario de Mascotas

**Fecha:** 05/08/2026 · **Rama:** `main` · **Commit:** `b9af1c3` (push a GitHub)

## Contexto

El tipo `LostPet` en `src/types.ts` tenía 5 campos opcionales agregados copiando el patrón de `Pharmacy`/`LocalBusiness`, pero nunca se conectaron correctamente a `MascotasView.tsx`. Análisis previo:

| Campo | ¿Se usa? | Decisión |
|---|---|---|
| `facebook` | Sí (renderiza link a perfil/publicación) | **Mantener y mejorar** |
| `phones` | Solo como respaldo opcional de `contact` | **Eliminar** (redundante) |
| `schedule` | Modal `schedulePet` nunca abre; `setSchedulePet` solo con `null` | **Eliminar** (código muerto) |
| `address` | No se usa; lo cubren `lastSeen` y `neighborhood` | **Eliminar** |
| `actionText` | No se usa en ningún lugar | **Eliminar** |

**Alcance:** este trabajo aplica ÚNICAMENTE a la interfaz `LostPet` y a `MascotasView.tsx`. Las interfaces `Pharmacy`/`LocalBusiness` y sus vistas (`FarmaciasView.tsx`, `NegociosView.tsx`) **no se tocaron**, pues ahí esos campos sí están conectados y funcionando.

---

## Parte 1 — Limpieza de campos fantasma

### `src/types.ts` — interfaz `LostPet`

Eliminadas 4 líneas opcionales (quedan solo `images`, `videoUrl` y `facebook`):

```
-  phones?: string[];
-  schedule?: DaySchedule[];
-  actionText?: string;
-  address?: string;
```

Resultado (líneas 84-97):

```ts
export interface LostPet {
  id: string;
  name: string;
  type: string;
  status?: 'lost' | 'found' | 'adoption';
  imageUrl: string;
  description: string;
  lastSeen: string;
  contact: string;
  neighborhood: string;
  date: string;
  images?: string[];
  videoUrl?: string;
  facebook?: string;
}
```

### `src/components/MascotasView.tsx`

1. **`getPhoneNumbers`** (línea 411) — se conserva (tiene 4 call sites: ~831-833 tarjeta de listado, ~1194 modal de detalle, ~1347 modal de contacto). Se simplificó para devolver solo el contacto principal:

```ts
const getPhoneNumbers = (pet: LostPet): string[] => {
  return pet.contact ? [pet.contact] : [];
};
```

2. **Eliminado el estado `schedulePet`** (`useState<LostPet | null>`).
3. **Eliminado el `setSchedulePet(null)`** del manejador de "volver atrás" y su dependencia en el `useEffect` de `onRegisterBackHandler`.
4. **Eliminado el bloque completo del "Schedule Modal"** (`{schedulePet && (...)}`, ≈48 líneas). No existía ningún botón/ícono que abriera ese modal, por lo que no quedaban referencias por limpiar.
5. **`handlePostReport`** (línea 415) — eliminada la propiedad `phones: newPhones.filter(...)`. Se mantiene `contact`.

### Decisión sobre el input múltiple de teléfonos

El formulario permitía hasta 3 números con toggle "¿WhatsApp?". Tras eliminar `phones`, solo se guardaba el primero, dejando una UI que prometía más de lo que cumplía. Por eso **se simplificó de arrays a un único campo de texto**:

- `newPhones: string[]` + `phoneWhatsapp: boolean[]` → **`newPhone: string`** (línea 255).
- Eliminado el botón "Agregar Celular/Teléfono" (`{newPhones.length < 3 && ...}`).
- Eliminado el toggle "¿WhatsApp?" y el botón de borrar por número.
- Validación: `if (!newName || !newPhone || !newSeen) return;`.

### `src/data.ts` — mocks de `LOST_PETS_DATA`

Verificados los mocks (lp1–lp10): **ninguno** tiene `phones`, `schedule`, `actionText` ni `address`. El único match del patrón era la palabra "smartphones" dentro de una descripción de texto, no un campo. No hubo que editar ningún objeto. Se agregó `facebook` al mock `lp1` (Max) para poder visualizar el botón (línea 2321).

---

## Parte 2 — Campo Facebook en formulario y botón en modal

### Estado del formulario

(línea 256)

```ts
const [newFacebook, setNewFacebook] = useState('');
```

### Input en el formulario compartido

Formulario único controlado por `formMode: 'lost' | 'found' | 'adoption'`, por lo que el campo cubre los 3 casos (Extraviada, Encontrada, Adopción) automáticamente. Se insertó justo después del bloque "Celular/Teléfono" (línea 1507) y antes del grid "Zona / Barrio · Fecha". Es opcional (sin `required`):

```jsx
<div className="space-y-1">
  <label className="text-emerald-400 text-[10px] uppercase font-bold">Link de Facebook <span className="text-[8px] text-gray-500 font-normal lowercase">opcional</span></label>
  <input
    type="url"
    value={newFacebook}
    onChange={(e) => setNewFacebook(e.target.value)}
    placeholder="Ej: https://facebook.com/perfil-o-publicacion"
    className="w-full bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
  />
</div>
```

### Guardado y limpieza en `handlePostReport`

- Guardado (línea 430) dentro de `newReport`:

```ts
facebook: newFacebook.trim() || undefined,
```

- Limpieza tras publicar: `setNewFacebook('');` junto a los demás `setNew...(...)`.

### Botón en el modal de detalle `activePet`

Dentro de la tarjeta "Contactos", justo debajo de los botones de teléfono (línea 1220).

**Nota de implementación:** al principio ningún mock tenía `facebook`, por lo que `{activePet.facebook && ...}` nunca se cumplía y el botón no aparecía. Se resolvió agregando un link falso al mock `lp1` (Max):

```ts
facebook: 'https://facebook.com/mascota.max.trigal',
```

Versión inicial del botón:

```jsx
{activePet.facebook && (
  <div className="flex items-center justify-between pt-1">
    <div className="flex items-center space-x-2 text-gray-400">
      <span className="text-blue-400 font-bold text-sm">f</span>
      <span className="text-white text-xs">Facebook</span>
    </div>
    <a
      href={activePet.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-500/10 text-blue-400 border border-blue-500/40 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition cursor-pointer min-w-[66px] text-center inline-block"
    >
      Ver en Facebook
    </a>
  </div>
)}
```

---

## Cambios posteriores en botones (anchura + ícono premium)

Ajustes solicitados por el dueño tras la primera revisión, en el modal de detalle:

1. **Texto del botón:** "Ver en Facebook" → **"Facebook"** (línea 1232).
2. **Anchura:** ambos botones (teléfono y Facebook) se fijaron en `w-[90px]` y luego se redujeron a **`w-[66px]`** con `whitespace-nowrap` para que queden compactos e idénticos en ancho. Antes usaban `min-w-[66px]` y el ancho variaba según el contenido ("Enviar Mensaje" quedaba más ancho que "Facebook").
   - Botón de teléfono (línea 1212): `... w-[66px] text-center whitespace-nowrap`.
   - Botón de Facebook (línea 1230): `... w-[66px] text-center inline-block`.
3. **Ícono premium de Facebook** (línea 1223): círculo con degradado azul oficial de Facebook y sombra:

```jsx
<span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#1877F2] to-[#0a4db0] flex items-center justify-center shadow-[0_1px_4px_rgba(24,119,242,0.5)] shrink-0">
  <span className="text-white text-[11px] font-black leading-none">f</span>
</span>
```

---

## Parte 3 — Verificación final

- `npm run build` (**tsc --noEmit**) pasó sin errores de TypeScript.
- `git status` confirmó que solo se modificaron `src/components/MascotasView.tsx`, `src/types.ts` y `src/data.ts`.
- **Confirmado:** `FarmaciasView.tsx`, `NegociosView.tsx` y las interfaces `Pharmacy`/`LocalBusiness` en `types.ts` **no fueron modificadas** (únicamente aparecen en los grep como referencia, no en el diff).
- Los cambios fueron commiteados y pusheados en `b9af1c3` por instrucción del dueño.

---

## Cambio posterior — Link de Facebook de prueba en los mocks de Mascotas

### Contexto

El botón "Facebook" de la tarjeta "Contactos" del modal de detalle solo se muestra si la mascota tiene el campo `facebook`. Como `useSheetData.ts` sigue en modo fallback local (Bloque A activo), los mocks de `src/data.ts` son lo que se muestra en producción. Inicialmente solo `lp1` (Max) tenía el campo, con una URL inventada y rota (`https://facebook.com/mascota.max.trigal`) que quedaba expuesta a usuarios reales.

### Cambios en `src/data.ts`

1. **Campo `facebook` en los 30 objetos de `LOST_PETS_DATA`** (lp1–lp10, ap1–ap10, fp1–fp10), todos con el mismo valor de prueba:

```ts
facebook: 'https://www.facebook.com/groups/343556692482348/',
```

- Se trata del grupo real y activo **"MASCOTAS PERDIDAS TARIJA"**, temáticamente correcto para el contexto de la app.
- Reemplaza la URL rota de `lp1` y agrega el campo a las 29 mascotas restantes.
- **Dato de prueba temporal:** sirve para verificar que el botón se ve y funciona en la UI; no es el link definitivo de ninguna mascota.

2. **Comentario explicativo** justo arriba de `LOST_PETS_DATA` (línea 2309):

```ts
// NOTA TEMPORAL: el campo `facebook` en estos mocks usa un link de prueba
// (grupo real "MASCOTAS PERDIDAS TARIJA") solo para verificar visualmente
// el botón "Facebook" en el modal de detalle. A futuro, cuando se conecte
// el CMS real, este campo vendrá de una columna en Google Sheets con el
// link de Facebook específico que cada vecino cargue al publicar su aviso
// (ver campo `newFacebook` en el formulario de MascotasView.tsx).
```

### Aclaración sobre el formulario

Este link de prueba aplica **solo a los mocks hardcodeados** en `data.ts`. El formulario "Añadir Mascota" con el campo `newFacebook` sigue funcionando normal: cualquier mascota nueva publicada por un vecino guardará **su propio link real**, no el de prueba.

### Verificación

- `npm run build` pasó sin errores.
- **Sin cambios en `LostPet`** (`src/types.ts`): el campo sigue como `facebook?: string;`.
- Los 30 objetos de `LOST_PETS_DATA` quedaron con el campo `facebook` actualizado.
- Cambios dejados en el working directory para revisión manual (sin commit/push).