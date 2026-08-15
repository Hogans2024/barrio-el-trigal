# PROMPT MAESTRO — Integración Ably: Alarma Vecinal en tiempo real (Página A → Página B) + Mensaje de voz push-to-talk

> Documento de trabajo para el agente de IA (OpenCode CLI u otro). Léelo completo antes de escribir una sola línea. Sigue el orden de fases exactamente como está escrito. **No avances de fase sin validación explícita del dueño del proyecto.**

---

## 0. Rol que debes asumir

Actúa como un ingeniero de software senior (20+ años) con experiencia específica en:
- Sistemas de mensajería en tiempo real (WebSockets, pub/sub, Ably, Pusher, Firebase Realtime).
- Arquitecturas JAMstack/estáticas (GitHub Pages, Vercel) sin servidor propio.
- Web Audio API y captura de audio en navegador (MediaRecorder, AudioContext).
- Seguridad de credenciales en frontends 100% estáticos (no hay backend que oculte secretos).

Se espera de ti el nivel de cuidado de alguien que ya ha visto fallar estos sistemas en producción: manejo de reconexión, mensajes duplicados, políticas de autoplay del navegador, límites de tamaño/tasa de mensajes, y fugas de credenciales en el bundle. **No se aceptan implementaciones "felices" que solo funcionan en el camino ideal.**

---

## 1. Contexto del proyecto (NO modificar fuera de lo indicado)

**Proyecto:** Barrio El Trigal — app comunitaria del barrio, React 19 + TypeScript + Vite 6 + Tailwind v4. SPA de pestañas sin router.

**Stack actual y su rol en ESTA tarea:**
| Pieza | Uso actual | ¿Se toca en esta tarea? |
|---|---|---|
| GitHub Pages | Hosting del frontend (Página A) | Solo para servir el build nuevo |
| Google Apps Script (`Code.gs`) | Backend de Afiliación y CMS de Sheets | **NO se toca. NO se usa para nada de esta tarea.** |
| Google Sheets | Base de datos del CMS | **NO se toca. Irrelevante para esta tarea.** |
| Ably | — | **Se incorpora ahora como el único canal de tiempo real** |

**Archivos relevantes que YA EXISTEN y debes leer antes de tocar nada:**
- `src/components/ActiveAlarmModal.tsx` — modal con teclado numérico, lógica de PIN, sirena local.
- `src/components/AudioSiren.ts` — síntesis de sonido con Web Audio API (`startSiren`, `stopSiren`, `playTone`). **Esta es la fuente de verdad del sonido**, se reutiliza tal cual en Página B.
- `src/components/AlarmaView.tsx` — vista que abre `ActiveAlarmModal`.

**Reglas duras del proyecto (heredadas de `AGENTS.md`, aplican igual aquí):**
- Un cambio a la vez. Cada fase de este documento se implementa, se prueba, y se espera confirmación antes de seguir.
- `NUNCA` hagas `git commit` ni `git push` sin autorización explícita y por escrito del dueño.
- `any` prohibido en TypeScript.
- No borres comentarios existentes tipo `WORKAROUND`, `MIGRACIÓN FUTURA`.
- Comentarios y nombres de variables en español, consistente con el resto del código.

---

## 2. Arquitectura objetivo

```
┌─────────────────────────┐        publica         ┌───────────┐        entrega        ┌─────────────────────────┐
│   Página A (este repo)  │ ───── evento JSON ────▶ │   Ably    │ ───── en tiempo real ─▶ │   Página B (repo nuevo)  │
│   GitHub Pages           │                         │  (canal)  │                        │   GitHub Pages           │
└─────────────────────────┘                         └───────────┘                        └─────────────────────────┘
```

- **Página A** solo **publica** eventos. No necesita mantener una conexión WebSocket abierta todo el tiempo — usa el **cliente REST de Ably** (`Ably.Rest`), no el Realtime. Publicar por REST es una petición HTTP puntual: más liviano, sin gestión de reconexión, exactamente lo que necesita un botón que se presiona ocasionalmente.
- **Página B** solo **escucha**. Ahí sí necesitas el **cliente Realtime** (`Ably.Realtime`), porque debe mantener la conexión abierta para recibir el evento apenas ocurre.

Este detalle (REST en el publicador, Realtime en el suscriptor) es intencional — usar `Ably.Realtime` en Página A sería un error de novato: abriría y mantendría un socket innecesario en el navegador de cada vecino que visite la sección Alarma, sin ningún beneficio.

---

## 3. Advertencia de seguridad — léela antes de escribir código

Este proyecto es 100% estático (GitHub Pages). **Cualquier valor que pongas en el código, incluidas "variables de entorno" de Vite (`import.meta.env.VITE_*`), termina embebido en texto plano dentro del archivo `.js` final que descarga el navegador.** Una variable de entorno en Vite **no es un secreto oculto en producción** — solo evita que la credencial quede en el historial de Git del código fuente. Cualquiera que abra las herramientas de desarrollador puede extraer esa clave del bundle.

Por eso:
1. **Nunca uses la API Key raíz/completa de Ably en el frontend.** Crea API Keys con **capacidades restringidas** (`capability`) en el dashboard de Ably:
   - Key de Página A: permiso **únicamente** `publish` sobre el canal específico (ej. `barrio-trigal:alarma`). Sin `subscribe`, sin `history`, sin `presence`, sin acceso a otros canales.
   - Key de Página B: permiso **únicamente** `subscribe` sobre ese mismo canal. Sin `publish`.
2. Aun así, alguien podría extraer la key de "publish" del bundle de Página A y disparar alarmas falsas manualmente contra la API de Ably. **Esto es una limitación conocida de cualquier arquitectura 100% estática sin backend**, no un descuido. La mitigación real (un endpoint intermedio que emita tokens temporales firmados) requeriría un backend, que deliberadamente no estamos usando en esta fase. Documenta este riesgo residual en el código con un comentario claro, no lo escondas.
3. Las keys van en un archivo `.env.local` (NO versionado — agrégalo a `.gitignore` si no está), y se documenta su forma en un `.env.example` sin valores reales.

---

## 4. FASE 1 — Cuenta y llaves en Ably (la hace el dueño, no el agente)

Esto ya está en proceso por el dueño del proyecto directamente en el dashboard de Ably. El agente **no necesita hacer nada en esta fase**, solo debe esperar que le compartan:
- `VITE_ABLY_PUBLISH_KEY` (capability: publish-only, canal `barrio-trigal:alarma`)
- Nombre exacto del canal acordado.

No inventes ni asumas valores de key — usa placeholders explícitos hasta recibirlos.

---

## 5. FASE 2 — Instalar el SDK de Ably en Página A

```bash
npm install ably
```

Verificar en `package.json` que quede como dependencia de producción (no `devDependencies`), ya que se usa en tiempo de ejecución del cliente.

Crear `src/lib/ablyClient.ts` (archivo nuevo) con un **singleton** del cliente REST — no instanciar `Ably.Rest` dentro del componente ni en cada click, porque cada instancia abre su propio manejo de auth interno innecesariamente:

```ts
// src/lib/ablyClient.ts
import Ably from 'ably';

const ABLY_PUBLISH_KEY = import.meta.env.VITE_ABLY_PUBLISH_KEY as string | undefined;

// Cliente único reutilizado en toda la sesión del navegador.
// Es un cliente REST (no Realtime): no mantiene socket abierto, solo hace
// peticiones HTTP puntuales cuando se llama a publish(). Ver sección 3 del
// PROMPT_INTEGRACION_ABLY_ALARMA_VOZ.md para el porqué de esta decisión.
let restClient: Ably.Rest | null = null;

function getAblyRestClient(): Ably.Rest | null {
  if (!ABLY_PUBLISH_KEY) {
    console.warn('[Ably] VITE_ABLY_PUBLISH_KEY no configurada — la señal a Página B no se enviará.');
    return null;
  }
  if (!restClient) {
    restClient = new Ably.Rest({ key: ABLY_PUBLISH_KEY });
  }
  return restClient;
}

export const ALARMA_CHANNEL_NAME = 'barrio-trigal:alarma';

interface AlarmaEventPayload {
  tipo: 'panic' | 'suspicious' | 'test' | 'medical';
  activatedBy: string;
  timestamp: number;
  /** Correlaciona el par activar/desactivar de una misma sesión de alarma. */
  sirenId: string;
}

/**
 * Publica un evento hacia Ably de forma "fire-and-forget": NUNCA debe
 * bloquear ni retrasar el sonido local en Página A. Si Ably falla (red
 * caída, key inválida, etc.), la alarma local debe sonar igual — este
 * canal es un AGREGADO, no un reemplazo del comportamiento existente.
 */
export function publicarEventoAlarma(
  nombreEvento: 'activar_alarma' | 'desactivar_alarma',
  payload: AlarmaEventPayload,
): void {
  const client = getAblyRestClient();
  if (!client) return;

  const channel = client.channels.get(ALARMA_CHANNEL_NAME);
  channel.publish(nombreEvento, payload).catch((err) => {
    // Deliberadamente solo se registra el error, no se relanza ni se
    // muestra al usuario: la sirena local ya sonó de forma independiente.
    console.error('[Ably] Error al publicar evento de alarma:', err);
  });
}
```

**Por qué `sirenId`:** Página B necesita distinguir "esta es una alarma nueva" de "esto es un reenvío/duplicado" en caso de reconexión. Genera el `sirenId` con `crypto.randomUUID()` una sola vez por activación (no en cada render).

---

## 6. FASE 3 — Enganchar el disparador en `ActiveAlarmModal.tsx`

**Punto de disparo de `activar_alarma`:** dentro de `handleVerifyPhone()`, en la rama donde hoy se hace:
```ts
if (step === 'enter_activation_phone') {
  setActivatedByPhone(enteredPin);
  setEnteredPin('');
  setStep('flashing');
}
```
Agrega la publicación **inmediatamente después** de `setStep('flashing')`, generando el `sirenId` en ese momento y guardándolo en un `useRef` (no en `useState`, porque no necesita re-render y debe sobrevivir sin duplicarse) para poder reutilizarlo en el evento de desactivación.

**Punto de disparo de `desactivar_alarma`:** aquí hay que tener cuidado — `stopSiren()` (la función local) se llama en **varios lugares distintos** del archivo (limpieza al cerrar el modal, al silenciar con `handleToggleMute`, al desactivar manualmente, al desactivar por countdown automático). **No publiques el evento de red en cada uno de esos puntos** — eso dispararía falsos "desactivar" cuando el vecino solo silencia localmente su propio parlante con el botón "Siren Silenciada" (`handleToggleMute`), lo cual NO debe apagar Página B.

El evento `desactivar_alarma` debe publicarse **únicamente** en los dos casos donde la alarma realmente termina — estos son los dos ÚNICOS disparadores válidos, no hay un tercero:

1. **Desactivación manual con PIN:** el vecino vuelve a introducir sus 8 dígitos y presiona el botón (ahora en modo "DESACTIVAR ALARMA VECINAL"), **antes** de que se cumpla el tiempo del contador regresivo. En el código, esto cae en la rama `else` de `handleVerifyPhone()` (cuando `step !== 'enter_activation_phone'`, es decir, la alarma ya estaba en `'flashing'`). Publica el evento ahí, antes de `onClose(...)`.
2. **Desactivación automática por tiempo agotado:** el contador regresivo que se muestra en la parte superior (`autoDeactivateCountdown`) llega a cero sin que el vecino haya hecho nada. En el código, esto ocurre en el `useEffect` que hoy ya hace `stopSiren()` seguido de `onClose(...)` cuando `autoDeactivateCountdown <= 0`. Publica el evento ahí también.

**Comportamiento esperado en Página B, en ambos casos:** el sonido de Página B debe detenerse de forma inmediata y en tiempo real, exactamente igual que el sonido local de Página A se detiene en ese mismo instante — no debe haber ningún retraso perceptible ni un mecanismo distinto según cuál de los dos disparadores haya ocurrido. Página B no necesita (ni debe) distinguir "fue manual" de "fue por tiempo agotado" — simplemente reacciona al evento `desactivar_alarma` de la misma forma sin importar su origen.

No agregues la publicación del evento en el `useEffect` de limpieza al desmontar (`return () => stopSiren()`) ni en `handleToggleMute` — esos son silencios locales/de ciclo de vida del componente en Página A, no el fin real del evento de alarma, y no deben apagar Página B.

**Import necesario al inicio del archivo:**
```ts
import { publicarEventoAlarma } from '../lib/ablyClient';
```

Después de implementar, verifica manualmente (antes de pasar a Página B) que:
- Activar → se llama `publicarEventoAlarma('activar_alarma', ...)` exactamente una vez.
- Silenciar con el botón "Siren Silenciada" → **no** publica nada de red.
- Desactivar manual o por countdown → se llama `publicarEventoAlarma('desactivar_alarma', ...)` exactamente una vez, con el mismo `sirenId` que la activación correspondiente.

---

## 7. FASE 4 — Repositorio nuevo para Página B

Repositorio separado (ej. `barrio-el-trigal-alarma-externa`), independiente del repo actual, con GitHub Pages activado sobre su propia rama/carpeta `dist` o `docs`.

**Reutilización de código exigida:** copia literalmente el contenido de `src/components/AudioSiren.ts` del proyecto actual (funciones `startSiren` y `stopSiren`, con su síntesis dual-oscilador) — **no lo reescribas ni "mejores" el sonido**, debe sonar idéntico al de Página A. Como es un repo distinto, se copia el archivo (no se puede importar entre repos separados sin publicar un paquete npm privado, lo cual es innecesario para este alcance).

**Estructura mínima sugerida** (puede ser un proyecto Vite vanilla-TS liviano, no necesita React):
```
barrio-el-trigal-alarma-externa/
├── index.html
├── src/
│   ├── main.ts
│   ├── audioSiren.ts        ← copiado literal de AudioSiren.ts
│   └── ablySubscriber.ts    ← nuevo
├── .env.example
└── package.json
```

**`ablySubscriber.ts` — lógica de suscripción:**
```ts
import Ably from 'ably';
import { startSiren, stopSiren } from './audioSiren';

const ABLY_SUBSCRIBE_KEY = import.meta.env.VITE_ABLY_SUBSCRIBE_KEY as string;
const ALARMA_CHANNEL_NAME = 'barrio-trigal:alarma';

let alarmaActivaSirenId: string | null = null;

export function iniciarEscuchaAlarma(onEstadoCambia: (activa: boolean) => void) {
  const client = new Ably.Realtime({ key: ABLY_SUBSCRIBE_KEY });
  const channel = client.channels.get(ALARMA_CHANNEL_NAME);

  client.connection.on('connected', () => console.info('[Ably] Conectado, esperando eventos de alarma.'));
  client.connection.on('disconnected', () => console.warn('[Ably] Desconectado, intentando reconectar...'));

  channel.subscribe('activar_alarma', (msg) => {
    const { sirenId } = msg.data;
    // Idempotencia: si ya está sonando la MISMA alarma (mismo sirenId,
    // posible reenvío tras reconexión), no reiniciar el sonido desde cero.
    if (alarmaActivaSirenId === sirenId) return;
    alarmaActivaSirenId = sirenId;
    startSiren();
    onEstadoCambia(true);
  });

  channel.subscribe('desactivar_alarma', (msg) => {
    const { sirenId } = msg.data;
    if (alarmaActivaSirenId !== sirenId) return; // evento de una sesión distinta/vieja, ignorar
    alarmaActivaSirenId = null;
    stopSiren();
    onEstadoCambia(false);
  });
}
```

**Advertencia crítica de novato a evitar — políticas de autoplay del navegador:** los navegadores modernos **bloquean la reproducción de audio** (incluido Web Audio API) si no hubo antes una interacción directa del usuario (click/tap) en esa pestaña. Si Página B intenta sonar automáticamente al recibir el evento sin que nadie haya interactuado antes con la página, **el sonido puede no reproducirse silenciosamente, sin error visible**. Por eso Página B debe mostrar, al cargar, un botón visible tipo "Habilitar Alarma Externa" que el operador presiona una sola vez al abrir la página (esto "desbloquea" el `AudioContext` para el resto de la sesión). Sin este paso, Página B puede parecer funcionar en pruebas manuales (donde el desarrollador ya clickeó cosas) y fallar en producción real (pantalla dejada abierta sin interacción).

**UI mínima de Página B:**
- Indicador de estado de conexión a Ably (conectado / reconectando / desconectado) — esta página probablemente queda abierta sin supervisión, necesita ser diagnosticable a simple vista.
- Estado grande y visible: "En espera" vs "🚨 ALARMA ACTIVA".
- Botón de "Habilitar sonido" (una vez, al cargar) explicado arriba.
- Opcional: botón de silencio local (no envía nada a Ably, solo corta el audio en ese dispositivo).

---

## 8. FASE 5 — Validación end-to-end (checkpoint obligatorio antes de Fase 6)

Antes de tocar una sola línea de la Fase 6 (voz), se debe confirmar con el dueño del proyecto que:
1. Página A y Página B abiertas simultáneamente (dos pestañas o dos dispositivos).
2. Activar desde Página A → Página B suena en menos de ~1-2 segundos.
3. Silenciar localmente en Página A (botón "Siren Silenciada") → Página B **sigue sonando** (comportamiento correcto, son independientes).
4. Desactivar (manual o por countdown) desde Página A → Página B se apaga en sincronía.
5. Cerrar y reabrir Página B a mitad de una alarma activa → si vuelve a conectar y la alarma sigue activa del lado de Página A, decidir junto al dueño si se desea un mecanismo de "estado actual" al reconectar (esto requeriría guardar el último evento, ej. con `channel.history()` de Ably) — **no implementar esto por defecto sin pedirlo explícitamente**, es una decisión de producto, no solo técnica.

No avanzar a la Fase 6 sin luz verde explícita en este checkpoint.

---

## 9. FASE 6 — Botón "Mandar mensaje de voz en tiempo real" (push-to-talk)

### 9.1 Alcance y UX

Nuevo botón en `ActiveAlarmModal.tsx`, ubicado **debajo** del botón principal actual ("ACTIVAR ALARMA VECINAL" / "DESACTIVAR ALARMA VECINAL"), visible solo cuando el PIN ya fue validado y estamos en modo `step === 'flashing'` (la alarma ya está activa) — es decir, un vecino solo puede hablar en vivo si ya activó (o está autorizado dentro de) una alarma en curso. Confirmar este criterio de visibilidad con el dueño si no está 100% claro en el diseño.

Comportamiento tipo walkie-talkie: se mantiene presionado el botón para hablar (captura mientras está presionado), se suelta para dejar de transmitir. Un pequeño lag es aceptable y esperado — **no se está construyendo una llamada VoIP de baja latencia tipo WebRTC**, sino un envío de fragmentos de audio pregrabados en microlotes.

### 9.2 Captura de audio — `MediaRecorder`

```ts
let mediaRecorder: MediaRecorder | null = null;
let mediaStream: MediaStream | null = null;

async function iniciarCapturaVoz(onChunk: (blob: Blob) => void) {
  mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // No todos los navegadores soportan el mismo mimeType — verificar antes
  // de instanciar, o MediaRecorder lanza excepción en runtime (error clásico
  // de novato: asumir 'audio/webm;codecs=opus' universalmente soportado).
  const mimeTypeCandidatos = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
  const mimeType = mimeTypeCandidatos.find((t) => MediaRecorder.isTypeSupported(t));
  if (!mimeType) {
    throw new Error('Ningún formato de audio soportado por este navegador (revisar compatibilidad Safari/iOS).');
  }

  mediaRecorder = new MediaRecorder(mediaStream, { mimeType });
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) onChunk(e.data);
  };
  // Emite un Blob cada 250ms — balance entre latencia percibida y overhead
  // de mensajes. No bajar mucho de esto sin revisar límites de tasa de Ably.
  mediaRecorder.start(250);
}

function detenerCapturaVoz() {
  mediaRecorder?.stop();
  mediaRecorder = null;
  // CRÍTICO: detener también las pistas del stream, o el ícono de
  // "micrófono en uso" del navegador queda encendido indefinidamente
  // aunque el MediaRecorder ya haya parado — error de novato muy común.
  mediaStream?.getTracks().forEach((track) => track.stop());
  mediaStream = null;
}
```

### 9.3 Envío por Ably

- Publica cada `Blob` recibido en `onChunk` directamente como payload binario (Ably soporta binario nativo — **no conviertas a base64**, eso infla ~33% el tamaño y agrega trabajo de CPU innecesario en ambos extremos).
- Usa un **canal separado** del de alarma (ej. `barrio-trigal:voz`), o el mismo canal con un `name` de evento distinto (`voz_chunk`) — preferible canal separado para que la lógica de suscripción de "alarma on/off" en Página B no tenga que filtrar mensajes binarios de audio.
- **Verifica el límite de tamaño de mensaje vigente en el plan gratuito actual de Ably** antes de fijar el `timeslice` de `MediaRecorder.start(250)` — estos límites cambian entre planes y con el tiempo; no asumas un número de memoria, revísalo en el dashboard/documentación de Ably al momento de implementar.
- Envía un evento explícito `voz_fin` al soltar el botón, para que Página B sepa cuándo cerrar/vaciar su cola de reproducción en vez de esperar un timeout arbitrario.

```ts
function publicarChunkVoz(blob: Blob) {
  const client = getAblyRestClient(); // mismo singleton de la Fase 2
  if (!client) return;
  blob.arrayBuffer().then((buffer) => {
    client.channels.get('barrio-trigal:voz').publish('voz_chunk', buffer).catch((err) =>
      console.error('[Ably] Error enviando chunk de voz:', err),
    );
  });
}
```

### 9.4 Reproducción en Página B — cola con "jitter buffer"

**Este es el punto donde más fácilmente un desarrollador junior comete un error:** reproducir cada chunk apenas llega, con `audio.play()` directo, produce cortes/gaps audibles porque la red no entrega los fragmentos con espaciado perfectamente uniforme. La solución estándar es un **buffer de reproducción programado** usando el reloj interno de `AudioContext`:

```ts
const audioCtx = new AudioContext();
let proximoInicio = 0; // en segundos, según audioCtx.currentTime

async function reproducirChunkVoz(arrayBuffer: ArrayBuffer) {
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);

  const ahora = audioCtx.currentTime;
  // Si el buffer de reproducción se vació (silencio de red), reiniciar
  // desde "ahora + pequeño margen" en vez de intentar alcanzar el pasado.
  const inicio = Math.max(proximoInicio, ahora + 0.05);
  source.start(inicio);
  proximoInicio = inicio + audioBuffer.duration;
}

function reiniciarColaVoz() {
  proximoInicio = 0; // llamar al recibir 'voz_fin' o al iniciar una nueva transmisión
}
```

Esto evita solapamientos (dos chunks sonando encima) y minimiza los huecos perceptibles, aceptando el lag inherente como parte del diseño (ya validado como aceptable por el dueño del proyecto).

### 9.5 Consideraciones que NO son opcionales

- **Permisos de micrófono denegados:** `getUserMedia` puede rechazar la promesa (usuario deniega el permiso, o el navegador lo bloqueó previamente). Debe mostrarse un mensaje claro en la UI, no fallar en silencio ni romper el resto del modal.
- **El botón de voz debe respetar el mismo gate de PIN** que ya protege la activación de la alarma — no expongas la función de transmisión a nadie que no haya validado su número.
- **Página B necesita el mismo desbloqueo de audio** mencionado en la Fase 4 (interacción previa del usuario) para poder reproducir los chunks de voz, es el mismo `AudioContext` compartido con la sirena.
- **Corta el stream del micrófono también si el modal se cierra o desmonta** mientras el botón estaba presionado (no solo al soltar el botón normalmente) — usar `useEffect` de limpieza.

---

## 10. Entregables esperados por fase

| Fase | Entregable | Repo |
|---|---|---|
| 2 | `src/lib/ablyClient.ts`, `ably` en `package.json`, `.env.example` | Proyecto actual |
| 3 | `ActiveAlarmModal.tsx` modificado con los 2 puntos de disparo exactos indicados | Proyecto actual |
| 4 | Repo nuevo funcional, desplegado en GitHub Pages, con `audioSiren.ts` copiado y `ablySubscriber.ts` | Repo nuevo |
| 5 | Confirmación manual de los 5 puntos del checklist de validación | — |
| 6 | Botón de voz en `ActiveAlarmModal.tsx` + lógica de reproducción en cola en Página B | Ambos repos |

**Recordatorio final:** documenta en cada archivo nuevo o modificado un comentario de cabecera explicando el propósito (siguiendo el estilo ya usado en `AudioSiren.ts` y `useIncrementalBatch.ts` del proyecto), y no ejecutes `git commit`/`git push` en ninguno de los dos repos sin autorización explícita.
