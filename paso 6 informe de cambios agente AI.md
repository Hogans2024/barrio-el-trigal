# PASO 6 — Informe de cambios (Agente AI)

**Fecha:** 14/08/2026
**Fase cubierta:** Corrección de seguridad de la key de Página B + push de Página A a GitHub
**Repos involucrados:**
- Página A: `barrio-el-trigal` (subida a GitHub en este paso)
- Página B: `barrio-el-trigal-alarma-externa` (key corregida a solo Subscribe)
**Estado:** ✅ Completado

---

## 1. Resumen ejecutivo

En la revisión del informe del Paso 5 se detectó un **problema de seguridad**:
la API key de Página B (`Api_pagina_B_externa_Alarma`) había quedado con permisos
`Publish` + `Subscribe` juntos, rompiendo el diseño original de separación de
roles (Página A = solo Publish, Página B = solo Subscribe).

Se corrigió creando una key nueva **solo Subscribe** (`Api_pagina_B_externa_Alarma_V2`),
actualizando el secret de GitHub, relanzando el deploy y verificando el bundle
desplegado. Posteriormente, con todo validado, se hizo el **push de Página A a
GitHub** (Fases 2-3 integradas y documentadas).

---

## 2. El problema de seguridad (por qué importaba)

**Diseño original del Paso 1:**

| Página | Rol | Permiso de key |
|---|---|---|
| A | Anuncia alarmas | solo `Publish` |
| B | Escucha alarmas | solo `Subscribe` |

**Razón de la separación:**
Página B es un sitio **100% estático y público** en GitHub Pages. Cualquiera puede
abrir la página, descargar el `.js` y extraer la key embebida con las herramientas
de desarrollador del navegador (no es un ataque sofisticado). Con una key de solo
`Subscribe`, lo peor que un atacante podría hacer es... nada: solo escuchar.

**Lo que rompía la key `Api_pagina_B_externa_Alarma` (Publish+Subscribe):**
Si alguien extraía esa key del bundle público, podría **hacerse pasar por Página A**
y publicar eventos `activar_alarma` falsos al canal `barrio-trigal:alarma`,
activando **sirenas reales en todo el barrio** sin haber pasado por el flujo de PIN
de Página A. Riesgo inaceptable en un sistema de alarma vecinal.

---

## 3. Corrección de la key (manual, dueño)

Se creó una key nueva siguiendo exactamente el patrón del Paso 1:

```
Name:            Api_pagina_B_externa_Alarma_V2
Key:             mKGFwQ.JP2yMA:V3vgA2pSG4lg-6qCovbY70KYXwWyEsIXdvDgSOdVJAg
Created:         Aug 15, 2026
Capabilities:    Messages: Subscribe  ✓ (SIN Publish)
Restrictions:    barrio-trigal:alarma
```

Y se **revocó/eliminó** la key anterior `Api_pagina_B_externa_Alarma`
(Publish+Subscribe) para que dejara de existir por completo.

---

## 4. Verificación de la key v2 (agente)

Script Node con `Ably.Realtime` + la key v2:

| Chequeo | Resultado |
|---|---|
| Conexión `connected` | ✅ |
| Canal `barrio-trigal:alarma` → `attached` | ✅ |
| Suscripción `activar_alarma` registrada | ✅ |

**La key v2 conecta correctamente y solo puede escuchar.**

---

## 5. Actualización del Secret de GitHub (agente)

Se actualizó `ABLY_SUBSCRIBE_KEY` vía API REST de GitHub con cifrado
**libsodium sealed box**:
- `GET /actions/secrets/public-key` → clave pública X25519
- Cifrado con `libsodium-wrappers` (`crypto_box_seal`)
- `PUT /actions/secrets/ABLY_SUBSCRIBE_KEY` con `encrypted_value` + `key_id`

Resultado: `SECRET_CREADO name=ABLY_SUBSCRIBE_KEY updated=2026-08-15T06:52:42Z`

---

## 6. Relanzar deploy y verificar bundle (agente)

- Relanzado `deploy.yml` vía `workflow_dispatch` → run `31870533352` con **success**.
- **Verificación carácter por carácter del bundle desplegado** (reutilizando el
  método que diagnosticó el 40101 en el Paso 5):

| Chequeo | Resultado |
|---|---|
| Contiene la key v2 (`mKGFwQ.JP2yMA:V3vgA2pSG4lg-6qCovbY70KYXwWyEsIXdvDgSOdVJAg`) | ✅ `True` |
| Contiene la key vieja (`mKGFwQ.ilD8dQ:...`) | ✅ `False` (ya no está) |

Contexto del bundle:
```
...,Oa="mKGFwQ.JP2yMA:V3vgA2pSG4lg-6qCovbY70KYXwWyEsIXdvDgSOdVJAg",Aa="ba...
```

**El bundle desplegado SOLO contiene la key solo-Subscribe.**

---

## 7. Push de Página A a GitHub

### 7.1 Verificación previa

- `git status` de Página A:
  - ✅ **`.env.local` NO aparece** (no se colará en el push)
  - Archivos esperados: `.env.example`, `package.json`, `package-lock.json`,
    `src/lib/ablyClient.ts`, `src/components/ActiveAlarmModal.tsx` (modificados) +
    prompt e informes paso 2-5 (nuevos)

### 7.2 Build de producción

`npm run build` → ✅ Éxito (2095 módulos, 15.92s). Solo el warning ya conocido de
tamaño de chunk (>500 kB), que no es un error.

### 7.3 Commit y push

```
git add .
git commit -m "Integración Ably: Página A publica eventos de alarma en tiempo real (Fases 2-3)"
git push origin main
```

- Commit: **`fdf4583`** → `08a4a6e..fdf4583 main -> main`
- 10 archivos, 1553 inserciones, 7 eliminaciones
- Repo: https://github.com/Hogans2024/barrio-el-trigal

**Archivos subidos:**

| Archivo | Estado |
|---|---|
| `.env.example` | Modificado (plantilla `VITE_ABLY_PUBLISH_KEY`) |
| `package.json` / `package-lock.json` | Modificados (dep `ably`) |
| `src/lib/ablyClient.ts` | Nuevo (cliente REST publish) |
| `src/components/ActiveAlarmModal.tsx` | Modificado (disparadores Fases 2-3) |
| `PROMPT_INTEGRACION_ABLY_ALARMA_VOZ.md` | Nuevo |
| `paso 2/3/4/5 informe *.md` | Nuevos |
| `.env.local` | **NO subido** ✅ |

---

## 8. Estado actual de la integración

| Elemento | Estado |
|---|---|
| Página A (repo `barrio-el-trigal`) | ✅ Subida, publica `activar_alarma`/`desactivar_alarma` |
| Página B (GitHub Pages) | ✅ Suscrita, reproduce sirena |
| Key de Página B | `Api_pagina_B_externa_Alarma_V2` — **solo Subscribe** ✅ |
| Key vieja (Publish+Subscribe) | ✅ Revocada/eliminada |
| Secret GitHub | `ABLY_SUBSCRIBE_KEY` = key v2, verificada en bundle |
| Validación end-to-end | ✅ A activa → B suena en tiempo real |

---

## 9. Pendientes

1. **Decidir el punto 5 de la Fase 5**: mecanismo de "estado actual" al reconectar
   con `channel.history()` de Ably (pendiente de comprensión/decision del dueño).
2. **Fase 6 (voz push-to-talk)**: bloqueada hasta la luz verde explícita del dueño
   en el checkpoint de la Fase 5.