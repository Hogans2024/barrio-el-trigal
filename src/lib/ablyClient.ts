/**
 * Cliente de Ably para Página A (Barrio El Trigal).
 *
 * Único punto de contacto del proyecto con Ably. Usa el cliente REST (no
 * Realtime) a propósito: Página A solo PUBLICARÁ eventos de alarma y no
 * necesita mantener un socket abierto. Las peticiones de publish() son
 * HTTP puntuales, livianas y sin gestión de reconexión.
 *
 * Seguridad (ver sección 3 del PROMPT_INTEGRACION_ABLY_ALARMA_VOZ.md):
 * - Esta key es publish-only restringida al canal barrio-trigal:alarma.
 * - En un frontend 100% estático (GitHub Pages) cualquier key embebida en
 *   el bundle puede ser extraída por un tercero. Riesgo conocido y
 *   aceptado: un atacante podría publicar falsos eventos de alarma. La
 *   mitigación real (tokens firmados) requiere un backend, fuera de alcance
 *   en esta fase. Se documenta aquí deliberadamente, no se esconde.
 */
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

// ===== Mensaje de voz en tiempo real (Fase 6) =====
// Eventos de voz publicados en el MISMO canal de la alarma. La publish key
// actual está restringida por capability al canal `barrio-trigal:alarma`
// (un canal nuevo `barrio-trigal:voz` daría 40160), y la sección 9.3 del
// PROMPT_INTEGRACION_ABLY_ALARMA_VOZ.md permite explícitamente esta opción.
// Los chunks se envían como payload binario nativo (sin base64).
//
// NOTA sobre la puerta de entrada: quién puede transmitir voz se controla
// hoy con el MISMO PIN de prueba temporal VOZ_PIN = '4555' definido en
// ActiveAlarmModal.tsx (validación 100% cliente, visible en el bundle
// público — riesgo conocido y aceptado igual que la key embebida). Cuando
// exista el backend (Apps Script + Sheets, ver sección 9 del
// PLAN_SEGURIDAD_ABLY_APPS_SCRIPT.md), este canal quedará protegido por
// tokens temporales emitidos tras validar el JWT + PIN de voz por vecino.

export const VOZ_CHUNK_EVENT = 'voz_chunk';
export const VOZ_FIN_EVENT = 'voz_fin';
/** Anuncia el mimeType del audio que se va a transmitir (necesario para que
 * Página B construya el Blob correcto al reproducir con <audio> nativo). */
export const VOZ_INICIO_EVENT = 'voz_inicio';

/** Anuncia el formato de audio que se transmitirá a continuación. */
export function publicarInicioVoz(mimeType: string): void {
  const client = getAblyRestClient();
  if (!client) return;
  client.channels
    .get(ALARMA_CHANNEL_NAME)
    .publish(VOZ_INICIO_EVENT, { mimeType, timestamp: Date.now() })
    .catch((err) => console.error('[Ably] Error enviando inicio de voz:', err));
}

/**
 * Publica un fragmento de audio hacia Página B. Fire-and-forget.
 *
 * IMPORTANTE — orden de entrega: cada fragmento se numera con "seq" (asignado
 * de forma SÍNCRONA por quien llama a esta función, antes de que empiece la
 * conversión asíncrona de abajo — ver ActiveAlarmModal.tsx). El número viaja
 * embebido en los primeros 4 bytes del paquete binario (Uint32 big-endian),
 * seguido de los bytes de audio reales. Página B usa ese número para
 * reordenar los fragmentos antes de reproducirlos, porque ni la conversión
 * Blob→ArrayBuffer ni las peticiones HTTP de Ably.Rest garantizan que los
 * fragmentos lleguen en el mismo orden en que se generaron.
 *
 * @param blob El fragmento de audio crudo, tal como lo entrega MediaRecorder.
 * @param seq  Número de secuencia de este fragmento (0, 1, 2, 3...), asignado
 *             por el llamador de forma síncrona, antes de esta función.
 */
export function publicarChunkVoz(blob: Blob, seq: number): void {
  const client = getAblyRestClient();
  if (!client) return;
  blob.arrayBuffer().then((buffer) => {
    // Empaquetar: 4 bytes de secuencia (Uint32 big-endian) + los bytes de
    // audio originales, sin modificar. Página B debe usar EXACTAMENTE este
    // mismo formato al leer (ver voicePlayer.ts en el repo de Página B).
    const framed = new Uint8Array(4 + buffer.byteLength);
    const seqView = new DataView(framed.buffer, 0, 4);
    seqView.setUint32(0, seq, false); // false = big-endian, OBLIGATORIO
    framed.set(new Uint8Array(buffer), 4);
    client.channels
      .get(ALARMA_CHANNEL_NAME)
      .publish(VOZ_CHUNK_EVENT, framed.buffer)
      .catch((err) => console.error('[Ably] Error enviando chunk de voz:', err));
  });
}

/** Señal de "dejé de hablar": Página B vacía su cola de reproducción. */
export function publicarFinVoz(): void {
  const client = getAblyRestClient();
  if (!client) return;
  client.channels
    .get(ALARMA_CHANNEL_NAME)
    .publish(VOZ_FIN_EVENT, { timestamp: Date.now() })
    .catch((err) => console.error('[Ably] Error enviando fin de voz:', err));
}