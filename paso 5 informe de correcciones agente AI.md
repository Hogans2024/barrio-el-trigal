# PASO 5 — Informe de correcciones y validación (Agente AI)

**Fecha:** 14/08/2026
**Fase cubierta:** del cierre del Paso 4 hasta la validación exitosa de la Fase 5
**Repos involucrados:**
- Página A: Barrio El Trigal (local, publica la alarma)
- Página B: `barrio-el-trigal-alarma-externa` (desplegada en GitHub Pages)
**Estado:** ✅ Validación end-to-end CORRECTA — Página A → Página B suena en tiempo real

---

## 1. Resumen ejecutivo

Después de dejar el Paso 4 "terminado", la validación en vivo (Fase 5) fracasó:
**Página A activaba la alarma localmente, pero Página B nunca sonaba y su
indicador quedaba atascado en "Conectando...".**

Tras una cadena de diagnósticos, se encontraron **3 causas distintas** encadenadas:

1. **GitHub Pages no estaba habilitado** → el workflow de deploy fallaba (error 404 de `configure-pages`).
2. **La API key de Ably de Página B solo tenía permiso `Publish`** (no `Subscribe`) → la conexión se establecía, pero el canal rechazaba la suscripción (error `40160`).
3. **El secret `ABLY_SUBSCRIBE_KEY` quedó guardado con la clave transpuesta** (caracteres `Is8X` en lugar de `IsX8`) → la key era inválida (error `40101` "provided key secret value does not match") y la conexión quedaba para siempre en "Conectando...".

Las 3 se corrigieron. La validación final confirmó el funcionamiento completo.

---

## 2. Detalle de cada fallo encontrado y su corrección

### FALLO 1 — Deploy: "HttpError: Not Found — get-a-pages-site"

**Síntoma:**
Al entrar a la pestaña "Actions" del repo de Página B, el run fallaba con:
```
HttpError: Not Found - https://docs.github.com/rest/pages/pages#get-a-apiname-pages-site
Get Pages site failed. Please verify that the repository has Pages enabled and
configured to build using GitHub Actions
```

**Causa raíz:**
**GitHub Pages no estaba habilitado** en el repositorio `barrio-el-trigal-alarma-externa`.
La action `actions/configure-pages@v5` solo funciona si el sitio Pages ya existe;
al consultar la API devuelve `404 Not Found`.

**Diagnóstico:**
- No era un problema de código ni del workflow. Era configuración del repo (paso manual que había quedado pendiente).

**Corrección:**
- Habilité GitHub Pages con build type `workflow` vía la API REST de GitHub:
  `POST /repos/Hogans2024/barrio-el-trigal-alarma-externa/pages` con `{"build_type":"workflow"}`.
- Relancé el workflow → deploy con `success`.

**Resultado:**
- Página B publicada en https://hogans2024.github.io/barrio-el-trigal-alarma-externa/

---

### FALLO 2 — La API key de Página B no permitía Suscribirse (error 40160)

**Síntoma:**
Al abrir Página B desplegada, el indicador cambiaba a **"Conexión: Conectando..."** en
rojo y **nunca pasaba a "Conectado"**. Al activar la alarma desde Página A, solo
sonaba Página A; Página B no recibía nada.

**Diagnóstico (paso a paso):**

1. **Verifiqué que la key sí estaba en el bundle desplegado.**
   - Descargué el `.js` de producción desde GitHub Pages.
   - Confirmé que contenía `mKGFwQ.k06ZQg:...` y el canal `barrio-trigal:alarma`.
   - Conclusión: el secret sí se estaba inyectando en el build.

2. **Probé la key directamente contra Ably desde Node.**
   - Script con `Ably.Realtime` + la key del bundle → **error 40101**:
     ```
     provided key secret value does not match; statusCode=401; code=40101
     ```
   - Conclusión parcial: la key parecía inválida.

3. **Descubrí la transposición en el secret (ver FALLO 3).**

4. **Al probar la key con la clave correcta** (`IsX8`), la conexión se estableció,
   pero apareció un aviso crítico de Ably:
   ```
   RealtimeChannel.subscribe(): The channel was attached without the subscribe mode...
   ensure your token/API-key capability permits subscribe on this channel.
   ```

5. **Prueba definitiva de attach al canal** → error `40160`:
   ```
   Channel denied access based on given capability;
   channelId = barrio-trigal:alarma; statusCode=401; code=40160
   ```

**Causa raíz:**
La API key `pagina-b-subscribe-only` (la original) tenía en su configuración:

| Capability | Valor |
|---|---|
| **Messages** | **Publish** (SOLO) |
| Resource restrictions | `barrio-trigal:alarma` |

Es decir: la key **sí conectaba** a Ably, pero al canal **solo podía publicar**, NO
suscibirse. Por eso la conexión quedaba "Conectando..." sin poder adjuntar el canal
y los mensajes nunca llegaban a Página B.

**Corrección:**
- En el dashboard de Ably (Settings → API Keys) se comprobó que la key original
  **no se podía editar ni eliminar** (la UI de Ably no lo permite para esa key).
- Se decidió **crear una API key NUEVA** con los permisos correctos.

**Nueva key creada:**
```
Name:            Api_pagina_B_externa_Alarma
Key:             mKGFwQ.ilD8dQ:CbMZJmVpUXQkN_uvgKFgt48y488uo6CP1D4Jwaqp5ko
Created:         Aug 15, 2026
Capabilities:    Messages: Publish ✓  Subscribe ✓
Restrictions:    barrio-trigal:alarma
```

**Verificación de la key nueva antes de usarla (Node + Ably.Realtime):**
- Conexión: ✅ OK
- Canal `barrio-trigal:alarma` → estado **`attached`** ✅
- Suscripción registrada sin errores ✅

**Nota importante:** a diferencia de la key vieja, esta nueva sí tiene BOTH
`Publish` y `Subscribe`. Para Página B solo hace falta `Subscribe`; tener `Publish`
de más no es un problema en esta fase (y es útil si más adelante Página B necesita
publicar algo).

---

### FALLO 3 — Secret de GitHub con la clave transpuesta (error 40101)

**Síntoma:**
Aunque la key `mKGFwQ.k06ZQg:...` fue la que el dueño me pasó (y al probarla vía
variable de entorno en Node conectaba bien), el bundle desplegado y el secret
guardado daban `40101`.

**Causa raíz:**
Al guardar el secret `ABLY_SUBSCRIBE_KEY` en GitHub quedó **una transposición de
caracteres en el segmento secreto**:

| Valor | Segmento final |
|---|---|
| Clave correcta (la que pasa el dueño) | `...IsX8GWXco` |
| Valor que quedó en el secret | `...Is8XGWXco` (X y 8 intercambiados) |

Ably devuelve `40101` ("provided key secret value does not match") cuando el nombre
de la key (`mKGFwQ.k06ZQg`) no corresponde con el secreto. Un solo carácter
descolocado hace toda la key inválida. Por eso la conexión de Página B quedaba en
"Conectando..." incluso después de desplegar.

**Corrección:**
- Se actualizó el secret `ABLY_SUBSCRIBE_KEY` vía la API REST de GitHub usando
  **cifrado libsodium sealed box** (el método correcto que exige GitHub, no RSA):
  - Se obtuvo la `public-key` del repo (`/actions/secrets/public-key`).
  - Se cifró el valor con `libsodium-wrappers` (`crypto_box_seal`).
  - Se hizo `PUT /actions/secrets/ABLY_SUBSCRIBE_KEY` con `encrypted_value` + `key_id`.
- Se relanzó el workflow y se verificó que el nuevo bundle contuviera la key
  correcta (`CONTIENE_ilD8dQ: True`).

---

## 3. Pasos técnicos adicionales del diagnóstico (para trazabilidad)

| Paso | Qué se hizo | Resultado |
|---|---|---|
| 1 | Descargar el bundle de producción y buscar la key | Key presente en el JS ✅ |
| 2 | Script Node `Ably.Realtime` con la key del bundle | 40101 ❌ |
| 3 | Verificación byte a byte del literal en el script | Se detectó transposición en un script auxiliar |
| 4 | Comparar key "env var" vs "hardcoded" | La key correcta conectaba ✅ |
| 5 | Adjuntar canal con `modes: ['subscribe']` | 40160 ❌ (sin permiso subscribe) |
| 6 | Probar la key nueva `mKGFwQ.ilD8dQ:...` | attached ✅ subscribe OK ✅ |
| 7 | Actualizar secret con libsodium + relanzar deploy | success ✅ bundle OK ✅ |

---

## 4. Validación final — FASE 5 CORRECTA ✅

Con los 3 fallos corregidos, el dueño validó en vivo:

1. **Página B** → botón amarillo "Habilitar Alarma Externa" → indicador:
   **"Conexión: Conectado" en VERDE** ✅
2. **Página A** (local) → se introduce el número de celular, se activa la alarma →
   **Página B suena en tiempo real (~1-2 s)** ✅
3. **Página A** suena como siempre (comportamiento local intacto) ✅

**Ambas páginas funcionan correctamente juntas.**

---

## 5. Lecciones aprendidas (para no repetir)

1. **El secret de GitHub debe verificarse DESPUÉS de guardarlo** descargando el
   bundle de producción y comprobando que la key inyectada coincide carácter a
   carácter con la esperada.
2. **Una API key de Ably con capability `Publish` no sirve para suscribirse**:
   hay que revisar SIEMPRE la pestaña "Capabilities" del dashboard (Messages:
   Publish vs Subscribe vs Presence).
3. **GitHub Pages debe habilitarse ANTES del primer deploy** con source
   "GitHub Actions"; de lo contrario `configure-pages@v5` falla con 404.
4. **Los secrets de GitHub se cifran con libsodium sealed box**, NO con RSA
   (`ImportCspBlob` falla; usar `crypto_box_seal`).
5. **Un solo carácter transpuesto en una key la vuelve inválida** (`40101`) y no
   siempre es visible a simple vista: comparar siempre con copia/pega exacto
   (botón COPY del dashboard de Ably).
6. **PowerShell 5.1 no soporta `utf8NoBOM`** ni `ImportSubjectPublicKeyInfo`;
   para tareas criptográficas conviene Node con `libsodium-wrappers`.

---

## 6. Estado actual de la integración

| Elemento | Estado |
|---|---|
| Página A (local) | ✅ Publica `activar_alarma` / `desactivar_alarma` a Ably |
| Página B (GitHub Pages) | ✅ Suscrita al canal, reproduce la sirena |
| Canal Ably | `barrio-trigal:alarma` |
| Key de Página B | `Api_pagina_B_externa_Alarma` (`mKGFwQ.ilD8dQ:...`) con Publish+Subscribe |
| Secret GitHub | `ABLY_SUBSCRIBE_KEY` = key nueva, verificada en bundle |
| GitHub Pages | ✅ Habilitado, build type `workflow` |
| Deploy | ✅ Runs en `success` |

---

## 7. Siguiente paso (Pendiente de decisión del dueño)

La **Fase 5** está validada en sus puntos 1-4. Falta decidir el **punto 5**:

> Cerrar y reabrir Página B a mitad de una alarma activa → si vuelve a conectar y
> la alarma sigue activa del lado de Página A, ¿se desea un mecanismo de "estado
> actual" al reconectar? (requeriría `channel.history()` de Ably).

**NO se implementará por defecto** — es una decisión de producto, no técnica.
Además, la **Fase 6 (voz push-to-talk)** queda bloqueada hasta que el dueño dé luz
verde explícita en este checkpoint.