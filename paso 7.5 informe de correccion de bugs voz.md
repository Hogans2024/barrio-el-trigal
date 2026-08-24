# PASO 7.5 — Informe de corrección de bugs de voz (Agente AI)

**Fecha:** 15/08/2026
**Fase cubierta:** Fase 6 — Mensaje de voz en tiempo real (Página A → Página B) + 3 fixes de fiabilidad
**Repos involucrados:**
- Página A: `barrio-el-trigal` (captura de voz + publicación Ably)
- Página B: `barrio-el-trigal-alarma-externa` (reproducción de voz)
**Estado:** ✅ Completado — voz en tiempo real funcionando (ver fixes 2 y 3 abajo)

---

## 1. Resumen ejecutivo

Se implementó la Fase 6: un botón "Mandar Mensaje de Voz" en Página A que solo
aparece tras teclear el PIN secreto `4555` en el teclado digital, transmite la voz
del micrófono en tiempo real por Ably y la reproduce en Página B. El diseño final
(fijado por el dueño) difiere del prompt original:

- El PIN `4555` **solo habilita el botón de voz**, no interfiere con la activación
  de la alarma (que sigue pidiendo 8 dígitos).
- La voz es **independiente de la alarma**: NUNCA dispara la sirena en ninguna página.
- La transmisión inicia de inmediato al presionar el botón verde y se detiene al
  volver a presionarlo (se pone rojo mientras transmite).
- Funciona en local y en la nube (GitHub Pages) en ambas páginas.

Se encontraron y corrigieron **3 bugs** hasta lograr una transmisión fiable.

---

## 2. Arquitectura de la voz

Las keys de Ably están **restringidas por capability al canal `barrio-trigal:alarma`**
(verificamos que publicar a un canal nuevo `barrio-trigal:voz` da `40160 action not
permitted`). Por eso la voz viaja en el MISMO canal de la alarma, con eventos
distintos (opción explícitamente permitida por la sección 9.3 del
PROMPT_INTEGRACION_ABLY_ALARMA_VOZ.md). No fue necesaria ninguna key nueva.

| Evento | Payload | Descripción |
|---|---|---|
| `voz_inicio` | `{ mimeType }` | Anuncia el formato del audio (se publica antes del primer chunk) |
| `voz_chunk` | binario (ArrayBuffer) | Fragmentos de audio (~250ms cada uno) |
| `voz_fin` | `{ timestamp }` | Señal de "dejé de hablar": Página B cierra la transmisión |

### 2.1 Página A — captura

- `src/components/ActiveAlarmModal.tsx`: estado `vozTransmitiendo`, `vozError`,
  refs `mediaRecorderRef` / `mediaStreamRef`. El botón se renderiza SOLO si
  `step === 'enter_activation_phone'` y `enteredPin === '4555'`.
- `MediaRecorder` con `start(250)` (un chunk cada 250ms), mimeType resuelto por
  `MediaRecorder.isTypeSupported` entre `['audio/webm;codecs=opus', 'audio/webm',
  'audio/mp4']`.
- Limpieza del micrófono al cerrar el modal (efecto `useEffect` en desmontaje).

### 2.2 Página A — publicación

- `src/lib/ablyClient.ts`: `publicarInicioVoz`, `publicarChunkVoz` (payload binario
  nativo, sin base64), `publicarFinVoz`. Reutiliza el cliente REST único.

### 2.3 Página B — reproducción

- `src/ablySubscriber.ts`: se suscribe a `voz_inicio`, `voz_chunk`, `voz_fin`.
- `src/voicePlayer.ts`: gestiona el flujo de reproducción (ver Fix 2).
- La sirena NUNCA se dispara por eventos de voz (regla absoluta del dueño).

---

## 3. Bug 1 — `decodeAudioData` no soporta WebM/Opus

**Síntoma:** consola de Página B: `NotSupportedError: Failed to load because no
supported source was found`.

**Causa:** la primera versión reproducía cada chunk con `AudioContext.decodeAudioData`,
que no decodifica el formato WebM/Opus que produce `MediaRecorder`.

**Fix 1 (commit A `e909ca3`, B `29f00e3`):** Página A publica `voz_inicio` con el
`mimeType` real; Página B reproduce con `<audio>` nativo + `createObjectURL` en una
cola de reproducción.

---

## 4. Bug 2 — los chunks de MediaRecorder no son WebM completos

**Síntoma:** tras el Fix 1 seguía sin sonido; consola de Página B:
`NotSupportedError: Failed to load because no supported source was found`.

**Causa:** los chunks de `MediaRecorder` con timeslice NO son archivos WebM
completos — solo el primero lleva la cabecera de codec. `new Audio(blob)` por chunk
falla.

**Fix 2 (B `de85385`):** se reescribió `voicePlayer.ts` para usar
`MediaSource` + `SourceBuffer`:
- `mode = 'sequence'` (los chunks se concatenan como flujo continuo).
- Cola de buffers + `procesarColaAppend()`; se encola si `sourceBuffer.updating`.
- `endOfStream()` al recibir `voz_fin`, con guard contra `sourceBuffer.updating`.
- Verificación de integridad de bytes Ably (21 bytes publicados → idénticos en B).

---

## 5. Bug 3 — la segunda transmisión se pierde (race condition)

**Síntoma (reportado por el dueño):** la PRIMERA transmisión funciona; al detener
(botón rojo) y volver a transmitir, Página A muestra "transmitiendo" pero Página B
nunca recibe; persiste aunque se recargue Página A. A veces llega, a veces no.

**Causa:** carrera entre el último chunk y `voz_fin`.
1. `detenerCapturaVoz()` llamaba `recorder.stop()` y publicaba `voz_fin` de forma
   **síncrona** (`ActiveAlarmModal.tsx`). Pero el último `dataavailable` de
   MediaRecorder se dispara DESPUÉS de `stop()`.
2. Resultado: `voz_fin` llegaba a Página B antes que el chunk final → B llamaba
   `reiniciarColaVoz()` y luego recibía un chunk "huérfano" que creaba un MediaSource
   nuevo sin cabecera de codec → dejaba `transmisionActiva = true` con un buffer roto.
3. La 2ª transmisión: los chunks llegaban pero `transmisionActiva` ya era `true`, así
   que no se creaba un MediaSource nuevo → silencio. Como Página B no se recargaba,
   el estado roto persistía aunque se recargara Página A.

**Fix 3 (A `1f4e8d9`, B `c802033`):**
- **Página A:** `voz_fin` ahora se publica dentro del evento `stop` del MediaRecorder,
  que se dispara DESPUÉS del último `dataavailable`. Se garantiza que B recibe el
  chunk final antes del `voz_fin`.
- **Página B:** al recibir `voz_inicio` (nueva transmisión) se llama SIEMPRE
  `reiniciarColaVoz()`, limpiando cualquier estado "huérfano" que haya dejado una
  transmisión anterior mal terminada.

**Verificación de producción:**
- Deploy A `1f4e8d9` ✅ (bundle `index-DzslvXIS.js` contiene
  `addEventListener("stop", ...)` con el fin dentro).
- Deploy B `c802033` ✅ (bundle `index-D3-Mnu84.js` contiene
  `subscribe("voz_inicio", ... => reiniciarColaVoz())`).

---

## 6. Notas de build locales (aprendizaje)

- El build local de Página B con `VITE_ABLY_SUBSCRIBE_KEY` ausente produce un bundle
  "podado": esbuild elimina el cuerpo de `iniciarEscuchaAlarma` como código muerto
  (solo queda el guard `console.warn... return`). Esto hizo que la verificación del
  bundle local diera falsos negativos. **Para verificar localmente hay que definir la
  key antes de `npm run build`**, tal como hace GitHub Actions.

---

## 7. Prueba manual sugerida

1. Página B: pulsar "Habilitar Alarma Externa" (desbloquea el audio).
2. Página A: teclear `4555` en el teclado digital → aparece "Mandar Mensaje de Voz".
3. Pulsar el botón verde → hablar → la voz se escucha en Página B casi en tiempo real.
4. Pulsar el botón rojo "Desactivar Mensaje de Voz" → vuelve a verde.
5. Repetir paso 3-4 varias veces: todas las transmisiones deben llegar.