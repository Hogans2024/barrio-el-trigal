# Credenciales en `AfiliacionView.tsx` — Por qué están ahí y por qué NO se eliminan

> **Archivo:** `src/components/AfiliacionView.tsx` — líneas 54-55
> **Fecha:** Julio 2026

---

## Las credenciales en cuestión

```typescript
const CLIENT_ID = "778103287737-no8f38pn830lrrqodr5qdlrfulmqk4iq.apps.googleusercontent.com";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWMU9bKHzy5SQoUP5p5rxSsH2KCx4ujVZ2Beh-M_LyY3UN1pYOFt8xKVHjOxsxz0mG/exec";
```

---

## ¿Por qué están en el código fuente?

Porque **deben estar ahí**. Ambas son credenciales del lado cliente (públicas por diseño):

### `CLIENT_ID` — Google Identity Services (OAuth 2.0)

- Es el identificador de tu aplicación registrada en Google Cloud Console.
- Google lo considera público. Se envía en cada petición de login OAuth desde el navegador.
- La seguridad **no** está en ocultar el `CLIENT_ID`, sino en los **Authorized JavaScript origins** configurados en Google Cloud Console.
- Si en Google Cloud Console solo tienes `https://hogans2024.github.io` como origen autorizado, ese `CLIENT_ID` es inútil desde cualquier otro dominio.

### `APPS_SCRIPT_URL` — Endpoint de Google Apps Script

- Es la URL de despliegue de un Web App de Google Apps Script, también semipública por diseño.
- La seguridad real está en el `doPost()` del script, que:
  1. Recibe el token JWT de Google junto con los datos.
  2. Ejecuta `verificarToken()` para validar que el token sea legítimo.
  3. Compara que `datosToken.aud === CLIENT_ID` para asegurar que el token fue emitido para esta aplicación.
- Sin un token JWT válido, la URL sola no sirve para enviar datos fraudulentos.

---

## ¿De dónde vienen?

Fueron migradas desde el proyecto independiente **"afiliacion-web"**, que ya estaba en producción con esta misma arquitectura:

```
Login con Google → fetch POST → Google Apps Script → Google Sheets
```

Ese proyecto funcionaba con HTML/CSS/JS plano. Al migrar la funcionalidad a este proyecto (React/TypeScript), las constantes se copiaron tal cual desde el archivo `js/config.js` del proyecto original.

---

## ¿Por qué NO se eliminan ni se reemplazan por placeholders?

| Razón | Explicación |
|-------|-------------|
| Son públicas por diseño | Google recomienda tenerlas en el código cliente |
| La seguridad es por configuración, no por ocultación | El CLIENT_ID está protegido por los orígenes autorizados en Google Cloud Console |
| La URL sola no sirve | Sin un token JWT válido, el endpoint de Apps Script rechaza cualquier petición |
| El proyecto original ya está en producción | Estas credenciales funcionan y están verificadas |
| Eliminarlas rompe la funcionalidad | Sin CLIENT_ID no se renderiza el botón de Google Sign-In; sin APPS_SCRIPT_URL no se puede enviar el formulario de afiliación |

---

## Lo único que hay que verificar

1. Entrar a [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Ir a la sección **OAuth 2.0 Client IDs**
3. Seleccionar este Client ID
4. En **Authorized JavaScript origins** verificar que **solo** esté:
   ```
   https://hogans2024.github.io
   ```
5. Si hay otros orígenes (como `http://localhost` o URLs de desarrollo), evaluar si deben permanecer.

---

## Conclusión

**No muevas, no elimines, no reemplaces.** El proyecto ya está protegido correctamente para el caso de uso que tiene. El CLIENT_ID es público por diseño, y la APPS_SCRIPT_URL requiere autenticación JWT para funcionar.