# PROMPT PARA AGENTE DE IA — Migración completa de "afiliacion-web" a "barrio-el-trigal"

> Instrucciones de uso: copia y pega todo este documento como tu primer mensaje al agente de IA
> que trabaja en local sobre el proyecto "barrio-el-trigal". El agente debe leer y seguir cada
> sección en orden, sin saltarse pasos.

---

## 1. CONTEXTO GENERAL

Trabajo sobre el proyecto **"barrio-el-trigal"** (app web ya funcional, hecha en React/TypeScript).

Dentro de la carpeta raíz de este proyecto copié una carpeta completa llamada **"afiliacion-web"**,
que corresponde a OTRO proyecto independiente que **YA FUNCIONA EN PRODUCCIÓN**. La copié ahí
únicamente para que la explores y leas directamente del sistema de archivos (trabajas en local,
no te voy a adjuntar nada por separado).

### Proyecto 1: barrio-el-trigal (destino final)
- Tiene una sección llamada **"Afiliación"** (móvil) / **"Registro Afiliados"** (escritorio),
  implementada en el componente `AfiliacionView.tsx`.
- Actualmente esa sección:
  - Guarda los datos con `localStorage.setItem(...)`.
  - NO tiene login de Google.
  - NO tiene conexión real a Google Sheets.
  - NO tiene backend conectado.
  - Funciona solo dentro del navegador.

### Proyecto 2: afiliacion-web (fuente de la lógica a migrar, completa, sin excepciones)
Carpeta con los siguientes archivos:
- `index.html`
- `css/estilos.css`
- `js/config.js`
- `js/auth.js`
- `js/formulario.js`
- `DOCUMENTACION_PROYECTO.md` (las 20 fases de configuración ya realizadas)

Arquitectura ya funcional en producción:

```
Login con Google (OAuth 2.0 / Google Identity Services, token guardado en memoria RAM)
   ↓
Formulario Web
   ↓
fetch POST (sin forzar Content-Type, queda como text/plain, para evitar preflight CORS)
   ↓
Google Apps Script (valida el token contra los servidores de Google, sanitiza los datos)
   ↓
Google Sheets → Hoja "Datos_Afiliacion" → Pestaña "Datos"
```

**Columnas exactas de la hoja "Datos" (A → Z):**

| Col | Campo |
|---|---|
| A | Fecha de Registro |
| B | Nombres |
| C | Apellidos |
| D | CI |
| E | Fecha de Nacimiento |
| F | Sexo |
| G | Estado Civil |
| H | Profesión |
| I | Teléfono |
| J | Correo |
| K | Fecha de Afiliación |
| L | Número de Afiliado |
| M | Estado de Afiliación |
| N | Tipo de Afiliado |
| O | Monto Pagado |
| P | Número de Recibo |
| Q | Observaciones |
| R | Dirección |
| S | Número de Casa |
| T | Manzano |
| U | Zona |
| V | Referencia |
| W | Tiempo de Residencia |
| X | Participa en Reuniones |
| Y | Desea formar parte de Comisiones |
| Z | Interés: Seguridad |

---

## 2. OBJETIVO (SIN AMBIGÜEDAD — REQUISITO FIJO)

Quiero **TODA** la lógica de `afiliacion-web` funcionando igual dentro de `barrio-el-trigal`,
**SIN dejar nada fuera** y sin usarla "parecido": exactamente como funciona en `afiliacion-web`.

```
barrio-el-trigal → Pestaña "Afiliación" (AfiliacionView.tsx)
   ↓
Login con Google (igual que en afiliacion-web/js/auth.js)
   ↓
Formulario envía datos (igual que en afiliacion-web/js/formulario.js)
   ↓
Apps Script (el mismo, ya existente, sin tocar su lógica de validación)
   ↓
Google Sheets (la misma hoja "Datos_Afiliacion" → pestaña "Datos", ya existente)
```

Esto implica explícitamente:
- Agregar el login con Google (Google Identity Services) dentro de `AfiliacionView.tsx`,
  replicando la misma lógica de `auth.js`: obtención del token, decodificación, guardado en
  memoria (NO en localStorage), y uso del token en cada envío.
- Eliminar por completo el guardado en `localStorage` para los datos del formulario.
- Reemplazar el envío de datos por un `fetch POST` directo al Web App de Apps Script ya en
  producción, replicando el mismo formato de payload (incluyendo el token) que usa
  `afiliacion-web/js/formulario.js`.
- Los registros deben llegar a la MISMA hoja "Datos_Afiliacion" → pestaña "Datos", respetando
  el orden exacto de las 26 columnas.
- Mantener el diseño visual ya construido en `barrio-el-trigal` (solo cambia la lógica interna,
  no el aspecto visual de la pestaña).

---

## 3. DECISIONES YA TOMADAS (no evaluar — son requisitos fijos)

- Se reutiliza **EXACTAMENTE** el mismo Apps Script y la **MISMA** hoja de Google Sheets que ya
  está en producción. **PROHIBIDO** crear una hoja o un Apps Script nuevos.
- Se replica el login con Google igual que en `afiliacion-web`. **PROHIBIDO** omitirlo o
  simplificarlo.
- Los ajustes de Google Cloud Console (Orígenes de JavaScript autorizados) los haré YO mismo;
  el agente solo debe decirme el procedimiento exacto a seguir.
- El resultado final es UN solo sistema integrado dentro de `barrio-el-trigal`, no dos
  proyectos paralelos.

---

## 4. PLAN DE TRABAJO PASO A PASO

### Fase 1 — Analizar `afiliacion-web` a fondo
- Identificar la URL del Web App de Apps Script (en `js/config.js`).
- Estudiar la lógica completa de `auth.js`: cómo se obtiene el token, cómo se decodifica, cómo
  se guarda (memoria RAM), cómo se usa en el envío.
- Identificar el método POST utilizado y el formato exacto de `Content-Type` (queda como
  `text/plain` por defecto, para evitar preflight de CORS).
- Identificar la estructura exacta del JSON enviado (nombres de campos, orden, dónde va el token).
- Identificar los campos exactos del formulario y sus validaciones del lado del cliente.

### Fase 2 — Analizar `AfiliacionView.tsx` en `barrio-el-trigal`
- Listar los campos actuales del formulario y sus tipos en TypeScript.
- Revisar la función `handleSubmit()` actual y cómo usa `localStorage`.
- Comparar contra las 26 columnas requeridas por la hoja de Sheets y señalar cualquier
  diferencia de nombres, tipos o campos faltantes entre ambos formularios.
- Identificar el mejor punto del componente para insertar el flujo de login con Google.

### Fase 3 — Integrar la autenticación
- Añadir el flujo de login con Google dentro de `AfiliacionView.tsx` (o en el punto de entrada
  de esa sección), replicando `auth.js`: token guardado en memoria, nunca en `localStorage`.

### Fase 4 — Modificar el envío de datos
- Eliminar `localStorage.setItem(...)`.
- Reemplazar por:
  ```js
  fetch(URL_APPS_SCRIPT, {
    method: "POST",
    body: JSON.stringify(datos)
  })
  ```
  incluyendo el token de autenticación en el payload, sin forzar `Content-Type`.
- Mantener el diseño visual ya construido; solo cambia la lógica interna.

### Resultado esperado
```
Usuario → Login Google → Barrio El Trigal → AfiliacionView → Apps Script → Google Sheets
```
Sin perder el diseño actual, sin duplicar backend ni hoja de cálculo, y sin omitir ninguna
parte de la lógica de `afiliacion-web`.

---

## 5. RESTRICCIONES

- No romper ninguna funcionalidad ya operativa en `barrio-el-trigal`.
- **PROHIBIDO** crear una hoja de Sheets nueva o un Apps Script nuevo.
- **PROHIBIDO** omitir o simplificar el login con Google.
- No mantener dos sistemas paralelos.
- Replicar la lógica de `afiliacion-web` tal cual está, no una versión reducida.

---

## 6. CONTROL DE ENTREGA Y SUBIDA A GITHUB (REGLA OBLIGATORIA)

- Cuando termines de ejecutar **TODO** el plan (código integrado, probado y funcionando),
  avísame explícitamente de que el trabajo está completo, antes de hacer cualquier otra cosa.
- **NO subas ningún cambio a GitHub bajo ninguna circunstancia** hasta que yo te dé la orden
  directa y explícita de hacerlo.
- Si el plan queda incompleto, a medio terminar, o yo no he confirmado que todo funciona
  correctamente, **NO debes subir nada a GitHub**, ni siquiera como "avance" o "checkpoint".
- La subida a GitHub solo ocurre cuando: (a) el plan está 100% terminado, (b) te confirmé que
  recibí tu aviso de finalización, y (c) yo te doy la orden explícita de subir. Ninguna otra
  condición autoriza un `commit`/`push` a GitHub.

---

## 7. ANTES DE EMPEZAR (confirmación obligatoria)

Antes de tocar cualquier archivo, responde confirmando que entendiste lo siguiente:

1. Se replica **TODA** la lógica de `afiliacion-web`, incluyendo login con Google, sin omitir nada.
2. **NO** se crea nada nuevo en Google Cloud Console / Apps Script / Google Sheets.
3. **NO** se sube nada a GitHub sin mi orden explícita.
4. Si necesitas ver algún archivo adicional (`AfiliacionView.tsx`, otros componentes
   relacionados, configuración del proyecto, etc.), explóralo directamente ya que tienes acceso
   al sistema de archivos; si no lo encuentras, pídemelo.

Una vez confirmado lo anterior, comienza con la **Fase 1** del plan de trabajo.
