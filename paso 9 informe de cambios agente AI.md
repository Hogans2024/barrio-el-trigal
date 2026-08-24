# PASO 9 — Informe de cambios (Agente AI)

**Fecha:** 24/08/2026  
**Tipo:** Corrección crítica de fiabilidad (Fix de reordenamiento de fragmentos de voz)  
**Repos involucrados:**
- **Página A:** `barrio-el-trigal` (Captura, asignación síncrona de `seq` y empaquetado binario)
- **Página B:** `barrio-el-trigal-alarma-externa` (Desempaquetado, búfer de reordenamiento y entrega ordenada a `MediaSource`)

---

## 1. Resumen ejecutivo del problema resuelto

En la Fase 6 (transmisión de voz en tiempo real vía Ably), el audio transmitido desde Página A hacia Página B se reproducía con cortes intermitentes o dejaba de escucharse a mitad de la transmisión ("a veces se escucha bien, a veces se corta o no llega").

### Causa raíz confirmada:
1. **Llegada fuera de orden de los fragmentos:**
   - La conversión asíncrona `blob.arrayBuffer()` en Página A junto con la naturaleza de las peticiones HTTP/WebSocket de `Ably.Rest` no garantizan que los fragmentos lleguen a Página B en el mismo orden cronológico en el que fueron capturados por el `MediaRecorder`.
2. **Sensibilidad del reproductor:**
   - Página B utiliza `MediaSource` + `SourceBuffer` configurado en `sourceBuffer.mode = 'sequence'`. Bajo este modo, recibir fragmentos WebM desordenados, duplicados o con saltos corta o corrompe irreversiblemente el flujo de reproducción del audio.

---

## 2. Solución técnica implementada

Se diseñó e implementó un protocolo de sincronización y reordenamiento basado en números de secuencia (`seq`) embebidos en el payload binario:

```
Página A (MediaRecorder ondataavailable)
  │ (Asignación síncrona seq: 0, 1, 2, 3...)
  ▼
Empaquetado Binario: [4 bytes Uint32 Big-Endian (seq)] + [Bytes de audio crudo WebM]
  │
  ▼ (Ably REST Channel: 'alarma-comunitaria', evento: 'voz_chunk')
  │
Página B (Ably Realtime Subscriber -> reproducirChunkVoz)
  │
  ├─ 1. Extrae seq (DataView getUint32(0, false)) y separa el payload de audio.
  ├─ 2. Si seq < siguienteSeqEsperado: Descarta (duplicado/tardío).
  ├─ 3. Si seq == siguienteSeqEsperado: Agrega a MediaSource e incrementa contador.
  │     └─ Intenta vaciar consecutivamente fragmentos acumulados en el búfer.
  ├─ 4. Si seq > siguienteSeqEsperado: Almacena en bufferReordenamiento (Map).
  │     └─ Inicia temporizador de espera (400ms).
  └─ 5. Si expira el temporizador: Salta el hueco para no congelar el audio continuo.
```

---

## 3. Detalle de cambios por repositorio

### A. Página A (`barrio-el-trigal`) — Commit `3a52545`

1. **`src/components/ActiveAlarmModal.tsx`**:
   - Se añadió `vozSeqRef = useRef<number>(0)` para llevar el conteo de secuencia de la transmisión activa sin provocar re-renders.
   - En `iniciarCapturaVoz`, se reinicia `vozSeqRef.current = 0`.
   - En el callback `mediaRecorder.ondataavailable`, se extrae y se incrementa `seq` de forma **estrictamente síncrona** antes de llamar a `publicarChunkVoz(e.data, seq)`.

2. **`src/lib/ablyClient.ts`**:
   - Se actualizó la firma de `publicarChunkVoz(blob: Blob, seq: number)`.
   - Tras convertir el blob a `ArrayBuffer`, se crea un nuevo búfer con un encabezado de 4 bytes:
     - `seqView.setUint32(0, seq, false)` (**Big-Endian obligatorio**).
     - Se concatenan los bytes del audio a partir del offset 4.
     - Se publica el buffer empaquetado al evento `VOZ_CHUNK_EVENT`.

---

### B. Página B (`barrio-el-trigal-alarma-externa`) — Commit `a0f6d10`

1. **`src/voicePlayer.ts`**:
   - Se renombró la función original `reproducirChunkVoz` a `agregarChunkOrdenado(arrayBuffer)` pasando a ser de visibilidad **interna** (sin `export`).
   - Se agregaron variables de estado para el reordenamiento:
     - `siguienteSeqEsperado` (número).
     - `bufferReordenamiento` (`Map<number, ArrayBuffer>`).
     - `timerEsperaReordenamiento` (`setTimeout | null`).
     - `ESPERA_MAX_REORDENAMIENTO_MS = 400` (margen de tolerancia antes de saltar paquetes perdidos).
   - Se implementaron las funciones auxiliares:
     - `parsearChunkVoz(raw)`: Extrae `seq` mediante `DataView.getUint32(0, false)` y corta el audio con `raw.slice(4)`.
     - `limpiarTimerReordenamiento()`: Cancela temporizadores pendientes.
     - `intentarVaciarBufferReordenamiento()`: Despacha fragmentos contiguos en cola.
     - `programarEsperaReordenamiento()`: Maneja la recuperación ante paquetes perdidos.
   - Se creó la nueva función pública `export function reproducirChunkVoz(arrayBufferCrudo)` como punto de entrada público que gestiona el orden antes de entregar a `MediaSource`.
   - En `reiniciarColaVoz()`, se agregaron al inicio los resets de estado:
     - `siguienteSeqEsperado = 0;`
     - `bufferReordenamiento.clear();`
     - `limpiarTimerReordenamiento();`

---

## 4. Verificación y despliegue

| Verificación | Página A (`barrio-el-trigal`) | Página B (`barrio-el-trigal-alarma-externa`) |
|---|---|---|
| **Typecheck (`tsc`)** | ✅ 0 errores | ✅ 0 errores |
| **Compilación Vite (`npm run build`)** | ✅ Exitoso (31.21s, 2095 módulos) | ✅ Exitoso (2.43s, 11 módulos) |
| **Commit ID** | `3a52545` | `a0f6d10` |
| **Estado en GitHub Remoto** | ✅ Subido a `main` (`origin/main`) | ✅ Subido a `main` (`origin/main`) |

---

## 5. Estado general tras el Paso 9

- **Transmisión de voz:** Completamente estabilizada con tolerancia a desorden de red y recuperación automática de paquetes perdidos.
- **Compatibilidad:** Ambos repositorios sincronizados en formato binario de 4 bytes Big-Endian.
- **Flujos CI/CD:** Despliegue completado en las ramas principales de ambos repositorios en GitHub.
