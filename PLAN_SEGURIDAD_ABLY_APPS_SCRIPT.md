# PLAN DE SEGURIDAD FUTURO — Ably detrás de Apps Script

**Fecha:** 14/08/2026
**Estado:** 📄 DOCUMENTADO (NO implementado — pendiente de decisión del dueño)
**Relacionado:** `paso 7 informe de cambios agente AI.md` (debilidades actuales) y `PROMPT_INTEGRACION_ABLY_ALARMA_VOZ.md` (fases)
**Impacto de reglas:** Implementar esto implica, a propósito, tocar `Code.gs` (hoy prohibido por "Fase Frontend"). Solo se hace en una Fase Backend explícita.

---

## 1. Problema que resuelve

Hoy la API key de Ably (Página A = publish-only) está **embebida en el `.js` de
producción** de GitHub Pages. Cualquier persona puede extraerla con las herramientas
de desarrollador del navegador y, con ella, **publicar falsas alarmas** al canal
`barrio-trigal:alarma` sin pasar por el flujo de PIN de Página A.

Este plan elimina por completo esa exposición: la key de Ably **nunca sale del
servidor** (Apps Script). El navegador ya no la ve.

---

## 2. Arquitectura propuesta

### 2.1 Antes (hoy)

```
Página A (GitHub Pages, bundle estático)
   └─ lleva la API key de Ably incrustada en el .js  ← AQUÍ ESTÁ LA FALLA
        └─ publish(activar_alarma) → Ably → Página B
```

### 2.2 Después (propuesto)

```
Página A (GitHub Pages)
   │  1. usuario valida PIN (igual que hoy)
   │  2. POST a Apps Script { tokenGoogle, accion: "token_alarma" }
   ▼
Apps Script (Code.gs — tiene la key de Ably, NADIE más)
   │  3. verificaToken(Google JWT)  (mismo patrón que Afiliación)
   │  4. valida que el usuario esté autorizado para alarmas
   │  5. opción A: publica directamente en Ably (REST, key privada)
   │     opción B: emite TokenRequest firmado con TTL corto
   ▼
Ably → Página B suena
```

**Resultado:** la API key de Ably vive SOLO en Apps Script. El navegador de Página A
nunca la recibe; el `.js` desplegado no contiene ninguna clave de Ably.

---

## 3. Dos variantes (decisión de diseño)

### Variante A — Apps Script publica directamente

- Apps Script, tras validar el JWT y el PIN, llama a la API REST de Ably con la key
  (guardada en `PropertiesService` de Apps Script, no en el código).
- Página A no necesita nada de Ably: solo hace el POST y recibe `{ ok: true }`.
- **Pro:** máxima simplicidad; el frontend queda sin ninguna clave de Ably.
- **Contra:** latencia de un salto extra (Página A → Apps Script → Ably → Página B);
  si Apps Script está lento, la señal a Página B se retrasa.

### Variante B — Apps Script emite TokenRequest con TTL corto (recomendada)

- Apps Script valida el JWT/PIN y firma un **`TokenRequest`** de Ably con:
  - **TTL corto** (ej. 60–120 segundos, justo lo que dura una alarma).
  - **Capability restringida** a `barrio-trigal:alarma` con solo `publish`.
- Página A usa ese token temporal con `Ably.Rest({ authUrl / tokenDetails })` para
  publicar el evento.
- **Pro:** el cliente publica con baja latencia (sin pasar por Apps Script en el
  momento del disparo); el token expira en segundos; un atacante que lo intercepte
  solo puede publicar en ese canal durante ese TTL.
- **Contra:** requiere el flujo de obtener token antes de activar (una llamada más
  al activar, no al publicar).

**Recomendación:** Variante B. Es el patrón estándar de Ably ("token auth") y
mantiene la latencia del disparo casi igual a la actual.

---

## 4. Seguridad en el lado de Apps Script

Apps Script es una **Web App pública** (URL semipública, como la de Afiliación).
La seguridad NO viene de ocultar la URL, sino de lo que hay DENTRO del `doPost`:

1. **`verificarToken(token)`** — reutilizar el patrón EXISTENTE de Afiliación
   (`https://oauth2.googleapis.com/tokeninfo?id_token=...`), que comprueba:
   - el token es un JWT legítimo de Google,
   - `aud === CLIENT_ID` (emitido para esta app).
2. **Autorización de rol** — además del JWT, validar que el usuario está registrado
   y autorizado para activar alarmas (revisar la hoja `Datos` o una hoja nueva
   `Autorizados_Alarma`). Sin esto, cualquiera con una cuenta de Google podría
   obtener tokens para publicar falsas alarmas.
3. **Rate limiting** — ventana por usuario (ej. máx. 2 alarmas por minuto) para
   limitar el impacto de una cuenta comprometida o un script automatizado.
4. **Key de Ably guardada en `PropertiesService`** de Apps Script (script
   properties), NO hardcodeada en `Code.gs`, para poder rotarla sin tocar código.

**Tabla de amenazas (después de este plan):**

| Amenaza | Antes | Después |
|---|---|---|
| Extraer key de Ably del bundle | ✅ Posible (fácil) | ❌ Imposible (no hay key en el bundle) |
| Publicar falsa alarma sin PIN | ✅ Posible con la key extraída | ❌ Bloqueado (Apps Script exige JWT + rol + rate limit) |
| Abusar del endpoint de Apps Script | — | ⚠️ Mitigado: JWT + rol + rate limit. Sin token válido, el endpoint no hace nada (mismo principio que Afiliación) |

---

## 5. Ficha técnica de implementación (para la fase futura)

### 5.1 En Apps Script (`Code.gs`) — NUEVO, no toca lo existente

```javascript
// Pseudo-código orientativo (NO escribir hasta Fase Backend)
const ABLY_API_KEY = PropertiesService.getScriptProperties().getProperty('ABLY_API_KEY');
const CLIENT_ID_ALARMA = PropertiesService.getScriptProperties().getProperty('CLIENT_ID_ALARMA');

function doPostAlarma(e) {
  const body = JSON.parse(e.postData.contents);
  const token = body.token;            // JWT de Google
  const verificacion = verificarToken(token); // patrón ya existente
  if (!verificacion.valido) return respuesta(401, { error: 'Token inválido' });

  // 1) autorizar rol
  if (!usuarioAutorizadoParaAlarma(verificacion.email)) return respuesta(403, { error: 'No autorizado' });

  // 2) rate limit
  if (!dentroDelLimite(verificacion.email)) return respuesta(429, { error: 'Demasiadas alarmas' });

  // 3a) Variante A: publicar directo
  // UrlFetchApp.fetch('https://rest.ably.io/channels/barrio-trigal:alarma/messages', {
  //   method: 'post', headers: { 'Authorization': 'Basic ' + Utilities.base64Encode(ABLY_API_KEY) }, ...
  // })

  // 3b) Variante B: firmar TokenRequest
  const tokenRequest = generarTokenRequestAbly({ ttl: 120000, cap: { 'barrio-trigal:alarma': ['publish'] } });
  return respuesta(200, { tokenRequest });
}
```

### 5.2 En Página A (`ablyClient.ts`) — reemplazar la key embebida

```typescript
// Pseudo-código (Variante B)
// 1) fetch(APPS_SCRIPT_URL_ALARMA, { body: { token: jwtGoogle, accion: 'token_alarma' } })
// 2) new Ably.Rest({ tokenDetails: tokenRequest.tokenDetails })   // o authUrl
// 3) channel.publish('activar_alarma', payload)
```

- Página A necesita el **JWT de Google en RAM** (igual que Afiliación ya lo tiene).
- Se elimina `VITE_ABLY_PUBLISH_KEY` del bundle por completo.

### 5.3 En Página B — SIN cambios

- Página B sigue suscrita con su key subscribe+history. No necesita saber quién
  publicó; solo recibe el evento. (La key de B es de solo escucha; puede seguir
  embebida con el riesgo ya documentado de leer historial.)

---

## 6. Costes / consideraciones

| Aspecto | Detalle |
|---|---|
| Latencia Variante B | Solo una llamada a Apps Script al ACTIVAR (no al publicar); el disparo sigue siendo directo a Ably. Aceptable. |
| Latencia Variante A | Un salto más en el momento de activar. Puede notarse 0.5–1 s. |
| Apps Script gratis | 6 min de ejecución/día por usuario, límites de UrlFetch. Suficiente para una alarma vecinal de baja frecuencia. |
| Clave de Ably | Guardada en `PropertiesService`; rotación manual sin tocar código. |
| Alcance | Toca `Code.gs` → **rompe la regla de "Fase Frontend"** a propósito. Solo en Fase Backend aprobada. |

---

## 7. Alternativas fuera del alcance (mención, no plan)

- **Ably "token auth" con tu propio servidor Node** (más control que Apps Script,
  pero requiere hosting con backend — no existe hoy).
- **`channel.history()` + firma de eventos** (Página B verifica una firma del
  emisor antes de sonar) — complejo, requiere compartir clave pública.

---

## 8. Checklist para cuando se decida implementar

- [ ] El dueño aprueba pasar a una Fase Backend que autoriza tocar `Code.gs`.
- [ ] Decidir Variante A vs B (recomendada: B).
- [ ] Crear hoja/s `Autorizados_Alarma` (o reutilizar `Datos`) para el control de rol.
- [ ] Mover la publish key de Ably a `PropertiesService` de Apps Script.
- [ ] Escribir `doPostAlarma` sin romper el `doPost` de Afiliación existente.
- [ ] Refactorizar `ablyClient.ts` de Página A para usar token temporal.
- [ ] Eliminar `VITE_ABLY_PUBLISH_KEY` del workflow de Página A (y del secret).
- [ ] Test end-to-end (Página A → Apps Script → Ably → Página B).
- [ ] Actualizar los informes `paso 7` y este documento con el resultado.

---

## 9. PIN de voz — extensión del plan de backend

**Fecha:** 24/08/2026 · **Estado:** 📄 DOCUMENTADO (NO implementado — pertenece a la misma Fase Backend que este plan)

Hoy el botón "Mandar Mensaje de Voz" (Fase 6) se habilita con un PIN de prueba
único (`VOZ_PIN = '4555'` en `ActiveAlarmModal.tsx`) validado 100% en el cliente.
Esta sección extiende el plan de las secciones 2–5 para que la voz use el mismo
esquema seguro cuando exista backend.

### 9.1 Estructura futura en Google Sheets

Hoja sugerida: reutilizar `Autorizados_Alarma` (sección 8) o crear `Autorizados_Voz`.

| Columna | Tipo | Obligatoria |
|---|---|---|
| Nombre | Texto | Sí |
| Celular | 8 dígitos (texto) | Sí |
| PIN de voz | 4 dígitos (texto) | **OPCIONAL** |

- Columna vacía en "PIN de voz" → ese vecino **no puede** transmitir voz.
- Los permisos de voz y de alarma son **independientes** (decisión del dueño):
  un vecino puede tener PIN de voz sin permiso de alarma y viceversa.

### 9.2 Validación futura en Code.gs (mismo patrón — Variante B, token temporal)

1. Página A envía `{ tokenGoogle, celular, pinVoz, accion: 'token_voz' }`.
2. Apps Script verifica el JWT (mismo patrón `verificarToken()` de Afiliación),
   busca la fila por celular y compara el PIN de voz.
3. Válido → firma `TokenRequest` con TTL corto (~120 s) y capability `publish`
   solo para los eventos de voz (`voz_inicio`, `voz_chunk`, `voz_fin` en
   `barrio-trigal:alarma`).
4. El frontend publica con ese token temporal y `VOZ_PIN = '4555'` desaparece
   del código.

### 9.3 Requisito: límite de 5 intentos con bloqueo temporal

- Máximo **5 intentos fallidos** de PIN por celular; al superarlos, bloqueo
  temporal del reintento (ej. 15 minutos).
- ⚠ **NO implementable hoy**: exige estado server-side (contador por usuario).
  Una versión client-side se salta trivialmente limpiando storage. Queda como
  requisito duro de la Fase Backend.

### 9.4 Aclaración permanente

Cualquier PIN que viva en el frontend es **públicamente visible** (bundle de
GitHub Pages inspeccionable). Hasta que exista este backend, el PIN actual es
un valor de PRUEBA aceptado, no una medida de seguridad real.