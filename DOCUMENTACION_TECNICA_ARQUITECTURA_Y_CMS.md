# 📘 Documentación Técnica: Arquitectura Frontend React + Backend Serverless (Google Apps Script & Sheets CMS)

> **Proyecto:** Aplicación Web "Barrio El Trigal"
> **Pila Tecnológica:** React (TypeScript + Vite), GitHub Pages (Hosting & CI/CD), Google Sheets (Base de Datos), Google Apps Script (API REST & Webhooks).

Esta documentación está diseñada para que cualquier desarrollador pueda entender el flujo completo de datos, la estructura del proyecto y cómo mantener o escalar el sistema.

---

## 1. 🏗️ Arquitectura General del Sistema

El proyecto funciona con una arquitectura **Serverless** que utiliza el ecosistema de Google y GitHub para evitar costos de hosting de bases de datos tradicionales. El sistema tiene dos flujos de datos principales y completamente aislados:

1. **Flujo de Ingreso (POST): Formulario de Afiliación**
   - El usuario llena el formulario en la web de React.
   - React envía un JSON vía `POST` a la URL de la Web App de Google Apps Script.
   - Apps Script verifica el Token (OAuth de Google), sanitiza los datos y los inserta como una nueva fila en la pestaña `Datos` de Google Sheets.
2. **Flujo de Salida (CMS Dinámico): Sincronización Web**
   - Un administrador edita celdas manualmente en Google Sheets en pestañas específicas (`Proyectos`, `Eventos`, etc.).
   - Un *Trigger* de Apps Script (`onEdit`) detecta el cambio, convierte las hojas a JSON, y hace un `PUT` a la API de GitHub para actualizar el archivo `public/data.json`.
   - GitHub Actions detecta el nuevo commit en `main`, compila Vite (`npm run build`) y publica la web en GitHub Pages en ~2 minutos.

---

## 2. 📂 Estructura del Repositorio Frontend (React)

Las piezas clave del código frontend para la conexión de datos son:

*   **`public/data.json`**: El archivo maestro. Actúa como la "base de datos estática" de la aplicación web en producción.
*   **`src/hooks/useSheetData.ts`**: Un Custom Hook de React que se encarga de hacer un `fetch('/data.json')` cuando la aplicación carga. Provee estado de carga (`loading`), errores (`error`) y los datos tipados (`data`).
*   **`src/App.tsx`**: Funciona como el "Provider" principal. Invoca a `useSheetData()` y pasa los arreglos de datos como *Props* a los componentes hijos.
*   **`src/components/views/*`** (Ej. `EventosView.tsx`, `ProyectosView.tsx`): Componentes de interfaz (UI) que reciben los datos por *props* y los renderizan.
*   **`.github/workflows/deploy.yml`**: Archivo YAML estándar para desplegar Vite en GitHub Pages.

---

## 3. 📊 Estructura de la Base de Datos (Google Sheets)

El documento de Google Sheets funciona bajo el ID: `1eZCHP8x9ttXtIIvG6nA4v43NzqK11V7_Wkw375LzQ1U`. Contiene 6 pestañas divididas en dos propósitos:

### A) Base de Datos de Usuarios (No sincronizada a la web)
*   **`Datos`**: Almacena de manera privada y secuencial los registros del formulario de afiliación. (Columnas A a Z estrictamente mapeadas).

### B) Hojas de Contenido CMS (Sincronizadas a la web)
Estas hojas representan tablas de base de datos relacionales simples. La **Fila 1** debe contener obligatoriamente los nombres exactos de las llaves JSON en inglés (ej: `id`, `title`, `imageUrl`, `description`).
*   `Proyectos`
*   `Eventos`
*   `Farmacias` (Contiene un parseo lógico para transformar el string "TRUE"/"FALSE" a Booleano real).
*   `Negocios` (Convierte "reviewsCount" a Number en el backend).
*   `Mascotas`

---

## 4. ⚙️ Lógica del Backend (Google Apps Script)

El núcleo del backend es un archivo único `Code.gs` instalado en la hoja de cálculo. Se fusionaron dos códigos (Formulario de Afiliación original + Sincronización de GitHub nueva) para que convivieran sin conflictos de variables ni dependencias.

> [!IMPORTANT]
> El sistema utiliza "Implementaciones" (Deployments). El formulario web apunta a una versión publicada congelada (Web App URL). Sin embargo, el trigger del CMS está anclado a la versión "Head" (el código en el editor). Esto permite modificar el CMS sin romper el formulario.

### Archivo Completo y Oficial: `Code.gs`

```javascript
/**
 * ============================================================
 *  APPS SCRIPT UNIFICADO — Barrio El Trigal
 *  Versión: 2.0 — Formulario de Afiliación + CMS Dinámico
 * ============================================================
 */

// ── Formulario de Afiliación ───────────────────────────────────
const CLIENT_ID = "778103287737-no8f38pn830lrrqodr5qdlrfulmqk4iq.apps.googleusercontent.com";
const ID_HOJA      = "1eZCHP8x9ttXtIIvG6nA4v43NzqK11V7_Wkw375LzQ1U";
const NOMBRE_HOJA  = "Datos"; // Hoja privada

const CAMPOS_OBLIGATORIOS = [
  "nombres", "apellidos", "ci", "fechaNacimiento", "sexo", "estadoCivil",
  "profesion", "telefono", "correo", "fechaAfiliacion", "numeroAfiliado",
  "estadoAfiliacion", "tipoAfiliado", "montoPagado", "numeroRecibo",
  "observaciones", "direccion", "numeroCasa", "manzano", "zona",
  "referencia", "tiempoResidencia", "participaReuniones",
  "deseaComisiones", "interesSeguridad"
];

// ── CMS Dinámico → GitHub ──────────────────────────────────────
var GITHUB_TOKEN  = 'ghp_...'; // Token con permisos de repo:status y write
var GITHUB_OWNER  = 'Hogans2024';
var GITHUB_REPO   = 'barrio-el-trigal';
var GITHUB_BRANCH = 'main';
var FILE_PATH     = 'public/data.json';
var HOJAS_CMS     = ['Proyectos', 'Eventos', 'Farmacias', 'Negocios', 'Mascotas'];


// ╔══════════════════════════════════════════════════════════════╗
// ║  LÓGICA DEL FORMULARIO DE AFILIACIÓN (doPost)                ║
// ╚══════════════════════════════════════════════════════════════╝

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const verificacion = verificarToken(body.token);
    if (!verificacion.valido) return respuestaError(verificacion.motivo);

    const validacion = validarCampos(body.datos);
    if (!validacion.valido) return respuestaError(validacion.motivo);

    const datosLimpios = sanitizarDatos(body.datos);
    guardarEnSheets(datosLimpios);
    return respuestaExito();
  } catch (error) {
    return respuestaError("Error inesperado: " + error.message);
  }
}

function verificarToken(token) {
  if (!token) return { valido: false, motivo: "No se recibió token." };
  const url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;
  const respuesta = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (respuesta.getResponseCode() !== 200) return { valido: false, motivo: "Token inválido." };
  
  const datosToken = JSON.parse(respuesta.getContentText());
  if (datosToken.aud !== CLIENT_ID) return { valido: false, motivo: "Client ID incorrecto." };
  
  const ahora = Math.floor(Date.now() / 1000);
  if (parseInt(datosToken.exp) < ahora) return { valido: false, motivo: "Token expirado." };
  
  return { valido: true, correo: datosToken.email };
}

function validarCampos(datos) {
  if (!datos) return { valido: false, motivo: "No hay datos." };
  for (const campo of CAMPOS_OBLIGATORIOS) {
    if (datos[campo] === undefined || String(datos[campo]).trim() === "") {
      return { valido: false, motivo: "Falta campo: " + campo };
    }
  }
  return { valido: true };
}

function sanitizarDatos(datos) {
  const limpio = {};
  for (const campo in datos) {
    let valor = String(datos[campo]).trim();
    if (/^[=+\-@]/.test(valor)) valor = "'" + valor; // Prevención de Inyección en Sheets
    limpio[campo] = valor;
  }
  return limpio;
}

function guardarEnSheets(datos) {
  const hoja = SpreadsheetApp.openById(ID_HOJA).getSheetByName(NOMBRE_HOJA);
  hoja.appendRow([
    new Date(), datos.nombres, datos.apellidos, datos.ci, datos.fechaNacimiento,
    datos.sexo, datos.estadoCivil, datos.profesion, datos.telefono, datos.correo,
    datos.fechaAfiliacion, datos.numeroAfiliado, datos.estadoAfiliacion, datos.tipoAfiliado,
    datos.montoPagado, datos.numeroRecibo, datos.observaciones, datos.direccion,
    datos.numeroCasa, datos.manzano, datos.zona, datos.referencia, datos.tiempoResidencia,
    datos.participaReuniones, datos.deseaComisiones, datos.interesSeguridad
  ]);
}

function respuestaExito() {
  return ContentService.createTextOutput(JSON.stringify({ exito: true, mensaje: "OK" })).setMimeType(ContentService.MimeType.JSON);
}
function respuestaError(motivo) {
  return ContentService.createTextOutput(JSON.stringify({ exito: false, mensaje: motivo })).setMimeType(ContentService.MimeType.JSON);
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  LÓGICA DEL CMS DINÁMICO (Sincronización Sheets → GitHub)   ║
// ╚══════════════════════════════════════════════════════════════╝

function initTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'onSheetEdit') ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger('onSheetEdit').forSpreadsheet(SpreadsheetApp.openById(ID_HOJA)).onEdit().create();
}

function onSheetEdit(e) {
  var sheet = e ? e.source.getActiveSheet() : SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var sheetName = sheet.getName();

  // El filtro más importante: Ignora la hoja de formulario "Datos"
  if (HOJAS_CMS.indexOf(sheetName) === -1) return; 

  try { exportDataToGitHub(); } 
  catch (err) { Logger.log('Error: ' + err.message); }
}

function exportDataToGitHub() {
  var ss = SpreadsheetApp.openById(ID_HOJA);
  var data = {
    proyectos : sheetToObjects(ss.getSheetByName('Proyectos')),
    eventos   : sheetToObjects(ss.getSheetByName('Eventos')),
    farmacias : sheetToObjects(ss.getSheetByName('Farmacias')),
    negocios  : sheetToObjects(ss.getSheetByName('Negocios')),
    mascotas  : sheetToObjects(ss.getSheetByName('Mascotas'))
  };

  data.farmacias = data.farmacias.map(function(f) {
    f.isOnDuty = (String(f.isOnDuty).toLowerCase() === 'true'); return f;
  });

  data.negocios = data.negocios.map(function(b) {
    if (b.reviewsCount !== '') b.reviewsCount = parseInt(b.reviewsCount, 10) || 0;
    if (b.isFreeDelivery !== undefined) b.isFreeDelivery = (String(b.isFreeDelivery).toLowerCase() === 'true');
    Object.keys(b).forEach(function(key) { if (b[key] === '' || b[key] === undefined) delete b[key]; });
    return b;
  });

  var jsonContent = JSON.stringify(data, null, 2);
  var currentSha = getFileSha();
  commitFileToGitHub(jsonContent, currentSha);
}

function sheetToObjects(sheet) {
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  var headers = data[0];
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (row.every(function(cell) { return cell === '' || cell === null; })) continue;
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      if (headers[j] !== '') obj[headers[j]] = row[j] !== undefined ? String(row[j]) : '';
    }
    rows.push(obj);
  }
  return rows;
}

function getFileSha() {
  var url = 'https://api.github.com/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + FILE_PATH + '?ref=' + GITHUB_BRANCH;
  var options = { method: 'GET', headers: { 'Authorization': 'token ' + GITHUB_TOKEN, 'User-Agent': 'BarrioElTrigal-AppsScript' }, muteHttpExceptions: true };
  var response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() === 200) return JSON.parse(response.getContentText()).sha;
  return null;
}

function commitFileToGitHub(jsonContent, sha) {
  var url = 'https://api.github.com/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + FILE_PATH;
  var payload = {
    message: '🔄 Auto-sync desde Google Sheets',
    content: Utilities.base64Encode(jsonContent, Utilities.Charset.UTF_8),
    branch: GITHUB_BRANCH
  };
  if (sha) payload.sha = sha;

  var options = {
    method: 'PUT',
    headers: { 'Authorization': 'token ' + GITHUB_TOKEN, 'Content-Type': 'application/json', 'User-Agent': 'BarrioElTrigal-AppsScript' },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  var response = UrlFetchApp.fetch(url, options);
  return (response.getResponseCode() === 200 || response.getResponseCode() === 201);
}
```

---

## 5. 🚨 Puntos Críticos para Futuros Desarrolladores

1. **Tokens Expirados:** Si GitHub Actions deja de recibir actualizaciones de JSON, lo primero a revisar es que el `GITHUB_TOKEN` en la línea 51 (Personal Access Token) no haya expirado o sido revocado.
2. **Columnas de Sheets:** Las llaves del objeto JSON son tomadas *textualmente* de la Fila 1 de cada hoja. Modificar el nombre de la columna "imageUrl" en Sheets a "Imagen" en español causará un *undefined* en React si no se ajusta también en los tipos (`types.ts`).
3. **Múltiples Ediciones Simultáneas:** Como Apps Script dispara triggers de forma asíncrona, si dos personas editan las hojas CMS exactamente en el mismo segundo, GitHub API puede arrojar un error HTTP 409 (Conflict). No pasará nada destructivo, simplemente uno de los commits rebotará. Una nueva edición posterior sincronizará todo correctamente.
4. **Despliegues con Vite:** Todo el código reside en `public/data.json` para evitar que TypeScript intente embeber el JSON dentro del Hash de compilación (`.js` files en `/assets`). Al estar en `public/`, puede actualizarse en el servidor sin necesidad de hacer re-compile de toda la lógica React, aunque GitHub Actions igual re-compila por protocolo de seguridad.
