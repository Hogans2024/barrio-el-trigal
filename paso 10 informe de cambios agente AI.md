# PASO 10 — Informe de cambios (Agente AI)

**Fecha:** 11/09/2026  
**Tipo:** Seguridad y Backend (Autorización de Mensajes de Voz vía Tokens Temporales de Ably)  
**Título de Commit:** Ahora_mensaje_de_voz_Tokens_backend  
**Repositorio:** Hogans2024/barrio-el-trigal (Página A)

---

## 1. Resumen ejecutivo

Se migró completamente el sistema de autorización para el envío de mensajes de voz desde el frontend hacia el backend, resolviendo el riesgo conocido de credenciales y PIN expuestos en el bundle público de GitHub Pages.

### Principales logros:
1. Eliminación del PIN fijo 4555 en el cliente: Ya no existe ninguna variable ni comparación local en el código descargable por el navegador.
2. Eliminación de la publish key embebida para voz: La transmisión de audio (voz_inicio, voz_chunk, voz_fin) ya no comparte la clave fija de la alarma; requiere obligatoriamente un cliente autenticado con un token temporal de vida corta.
3. Validación server-side por vecino: PIN personal de 4 dígitos guardado y validado en Google Sheets, con control de cupo diario y bloqueo temporal por intentos fallidos.
4. Emisión de TokenRequest firmado con HMAC-SHA256: Generado directamente en Google Apps Script con TTL de 10 minutos (600.000 ms), canjeado de forma transparente por el SDK de Ably.

---

## 2. Cambios en Google Sheets

Se creó la hoja Mensaje de Voz PIN dentro del Spreadsheet oficial del barrio (1eZCHP8x9ttXtIIvG6nA4v43NzqK11V7_Wkw375LzQ1U), con 9 columnas estandarizadas:
- Nombre
- Celular
- PIN
- Veces Permitidas Al Dia
- Estado
- Usos Hoy
- Fecha Ultimo Uso
- Intentos Fallidos
- Bloqueado Hasta

Se precargaron 15 vecinos iniciales con Veces Permitidas Al Dia = 1 y Estado = Activado.

---

## 3. Cambios en el Backend (Google Apps Script — Código.js)

Desplegado en la implementación activa existente bajo la versión @12:
1. Nueva acción en enrutador doPost: body.accion === 'solicitar_token_voz'
2. Función manejarSolicitudTokenVoz(body) con validación de celular, PIN, estado, cupo diario y bloqueo por intentos fallidos.
3. Función criptográfica generarTokenRequestAbly(ttlMs, capabilidad) con firma HMAC-SHA256.
4. Función de prueba manual probarGeneracionTokenVoz().

---

## 4. Cambios en el Frontend (Página A)

- src/lib/ablyClient.ts: Implementación de crearClienteAblyParaVoz(tokenRequest). Publicación de eventos de voz desacoplada de la publish key estática.
- src/components/ActiveAlarmModal.tsx: Eliminación de VOZ_PIN = '4555'. Nueva UI de doble modo para captura de PIN de voz y solicitud de token al backend.
