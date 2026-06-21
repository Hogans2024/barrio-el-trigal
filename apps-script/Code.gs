/**
 * Apps Script - Barrio El Trigal CMS
 * Pega este codigo en: Extensiones > Apps Script de la hoja Datos_Afiliacion
 * IMPORTANTE: Reemplaza TU_GITHUB_TOKEN_AQUI con tu token real antes de ejecutar
 */

var GITHUB_TOKEN  = 'TU_GITHUB_TOKEN_AQUI'; // Pega aqui tu Personal Access Token de GitHub
var GITHUB_OWNER  = 'Hogans2024';
var GITHUB_REPO   = 'barrio-el-trigal';
var GITHUB_BRANCH = 'main';
var FILE_PATH     = 'public/data.json';

function initTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'onSheetEdit') ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger('onSheetEdit').forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
  Logger.log('Trigger instalado. Ahora cada edicion en las hojas actualizara el sitio.');
}

function onSheetEdit(e) {
  var sheetName = e ? e.source.getActiveSheet().getName() : SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
  if (['Proyectos','Eventos','Farmacias','Negocios','Mascotas'].indexOf(sheetName) === -1) return;
  try { exportDataToGitHub(); } catch(err) { Logger.log('Error: ' + err.message); }
}

function exportDataToGitHub() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = {
    proyectos: sheetToObjects(ss.getSheetByName('Proyectos')),
    eventos:   sheetToObjects(ss.getSheetByName('Eventos')),
    farmacias: sheetToObjects(ss.getSheetByName('Farmacias')),
    negocios:  sheetToObjects(ss.getSheetByName('Negocios')),
    mascotas:  sheetToObjects(ss.getSheetByName('Mascotas'))
  };
  data.farmacias = data.farmacias.map(function(f) {
    f.isOnDuty = String(f.isOnDuty).toLowerCase() === 'true'; return f;
  });
  data.negocios = data.negocios.map(function(b) {
    if (b.reviewsCount !== '') b.reviewsCount = parseInt(b.reviewsCount, 10) || 0;
    if (b.isFreeDelivery !== undefined) b.isFreeDelivery = String(b.isFreeDelivery).toLowerCase() === 'true';
    Object.keys(b).forEach(function(k) { if (b[k] === '') delete b[k]; });
    return b;
  });
  var sha = getFileSha();
  commitFileToGitHub(JSON.stringify(data, null, 2), sha);
}

function sheetToObjects(sheet) {
  if (!sheet) return [];
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  var headers = values[0], rows = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (row.every(function(c){return c===''||c===null;})) continue;
    var obj = {};
    for (var j = 0; j < headers.length; j++) { if (headers[j]) obj[headers[j]] = String(row[j]||''); }
    rows.push(obj);
  }
  return rows;
}

function getFileSha() {
  var url = 'https://api.github.com/repos/'+GITHUB_OWNER+'/'+GITHUB_REPO+'/contents/'+FILE_PATH+'?ref='+GITHUB_BRANCH;
  var opts = {method:'GET',headers:{Authorization:'token '+GITHUB_TOKEN,Accept:'application/vnd.github.v3+json','User-Agent':'BarrioElTrigal'},muteHttpExceptions:true};
  try { var r = UrlFetchApp.fetch(url,opts); if(r.getResponseCode()===200) return JSON.parse(r.getContentText()).sha; } catch(e){}
  return null;
}

function commitFileToGitHub(content, sha) {
  var url = 'https://api.github.com/repos/'+GITHUB_OWNER+'/'+GITHUB_REPO+'/contents/'+FILE_PATH;
  var payload = {message:'Auto-sync desde Google Sheets - '+new Date().toISOString(),content:Utilities.base64Encode(content,Utilities.Charset.UTF_8),branch:GITHUB_BRANCH};
  if (sha) payload.sha = sha;
  var opts = {method:'PUT',headers:{Authorization:'token '+GITHUB_TOKEN,Accept:'application/vnd.github.v3+json','Content-Type':'application/json','User-Agent':'BarrioElTrigal'},payload:JSON.stringify(payload),muteHttpExceptions:true};
  try { Logger.log('GitHub: ' + UrlFetchApp.fetch(url,opts).getResponseCode()); } catch(e){ Logger.log('Error: '+e.message); }
}

function probarConexion() {
  var sha = getFileSha();
  Logger.log(sha ? 'Conexion OK. SHA: '+sha : 'Error. Verifica GITHUB_TOKEN y nombre del repo.');
}
