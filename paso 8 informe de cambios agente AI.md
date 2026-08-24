# PASO 8 — Informe de cambios (Agente AI)

**Fecha:** 24/08/2026
**Tipo:** Documentación pura + comentarios de código (SIN ningún cambio de lógica)
**Repos involucrados:**
- Página A: `barrio-el-trigal` (captura de voz + publicación Ably)
- Página B: `barrio-el-trigal-alarma-externa` (reproducción de voz + recuperación de estado)

> **Nota previa — reordenamiento cronológico:** el informe que antes ocupaba el
> nombre "paso 8" documenta en realidad los 3 fixes de fiabilidad de la voz, que
> ocurrieron y se desplegaron ANTES de las conversaciones sobre el hallazgo del
> PIN expuesto. Fue renombrado a **`paso 7.5 informe de correccion de bugs voz.md`**
> (contenido intacto) y este documento ocupa el "paso 8" real.

---

## 1. Resumen ejecutivo

Este paso consolida el estado real del sistema de voz y alarma externa tras la
Fase 6, documentando hallazgos de seguridad verificados por el dueño y decisiones
de diseño confirmadas. No se modificó ninguna línea de lógica: solo comentarios
orientativos en código, una nueva sección del plan de seguridad y este informe.

---

## 2. Estado de la Fase 6 (voz en tiempo real): 100% funcional y EN PRODUCCIÓN

La Fase 6 está **100% completa a nivel de código en ambos repos** e incluye los
3 fixes de fiabilidad documentados en el "paso 7.5":

| Fix | Problema | Commits |
|---|---|---|
| 1 | `decodeAudioData` no soporta WebM/Opus → `<audio>` nativo + `voz_inicio` con mimeType | A `e909ca3`, B `29f00e3` |
| 2 | Chunks de MediaRecorder no son WebM completos → MediaSource/SourceBuffer (`mode='sequence'`) | B `de85385` |
| 3 | Race condition chunk final vs `voz_fin` → publicar dentro del evento `stop` del recorder + reinicio en `voz_inicio` | A `1f4e8d9`, B `c802033` |

**✅ YA ESTÁ DESPLEGADA EN PRODUCCIÓN desde ANTES de este informe.**

Fecha aproximada determinable por los commits del "paso 7.5": toda la Fase 6 se
commiteó en Página A el **15/08/2026** entre las 01:52 y las 03:09 (UTC-7):

```
72956ea | 2026-08-15 01:52 | Fase 6: botón MANDAR MENSAJE DE VOZ (PIN 4555), captura MediaRecorder y publicación por Ably
e909ca3 | 2026-08-15 02:03 | Fase 6 fix: anunciar mimeType al inicio de la transmisión de voz
1f4e8d9 | 2026-08-15 03:09 | Fase 6 fix 3: voz_fin tras el último chunk (evento stop del MediaRecorder)
```

El despliegue en producción quedó verificado en el "paso 7.5" mediante inspección
de los bundles servidos por GitHub Pages:

- Página A deploy `1f4e8d9` ✅ → bundle `index-DzslvXIS.js` contiene `addEventListener("stop", ...)` con el `voz_fin` dentro.
- Página B deploy `c802033` ✅ → bundle `index-D3-Mnu84.js` contiene `subscribe("voz_inicio", ... => reiniciarColaVoz())`.

---

## 3. Fase 5, punto 5 — Recuperación del estado de alarma al reconectar (Página B)

En `src/ablySubscriber.ts` de **Página B**, al reconectar el cliente Realtime se
ejecuta `channel.history()` para recuperar el último evento de
`activar_alarma` / `desactivar_alarma` y restaurar el estado visual correcto
(sirena activa o inactiva), evitando perder una alarma emitida durante la
desconexión.

Se aplica una **ventana de frescura de 120 segundos**: los eventos con más de
2 minutos de antigüedad se descartan y NO reactivan la sirena, evitando falsas
alarmas por mensajes viejos del historial.

---

## 4. Hallazgo de seguridad: `VOZ_PIN = '4555'` es público en GitHub

- El PIN del modo voz está **confirmado como público**: el dueño lo verificó
  directamente en el archivo fuente del repo
  (`src/components/ActiveAlarmModal.tsx`, constante `VOZ_PIN = '4555'`),
  visible también en el bundle desplegado.
- **Tratamiento:** riesgo conocido y aceptado temporalmente, con el mismo criterio
  ya aplicado a `COORDINATORS` y al celular autorizado `'12345678'`.
- **Mitigación real:** requiere backend. Documentado en:
  - Comentario ampliado junto a la constante (`ActiveAlarmModal.tsx`).
  - Nueva **sección 9** de `PLAN_SEGURIDAD_ABLY_APPS_SCRIPT.md`
    ("PIN de voz — extensión del plan de backend"): hoja Sheets con columna
    opcional "PIN de voz 4 dígitos", validación server-side con Variante B
    (token temporal), límite de 5 intentos con bloqueo temporal y la aclaración
    permanente de visibilidad pública.

---

## 5. Regla de exclusión mutua voz/sirena — decisión deliberada del dueño

Confirmada como **decisión deliberada del dueño** (NO deriva de la sección 9.1
del prompt original de la Fase 6):

- El botón "Mandar Mensaje de Voz" SOLO aparece cuando
  `step === 'enter_activation_phone' && enteredPin === VOZ_PIN` — es decir,
  **nunca convive con la sirena activa**.
- Para hablar hay que NO activar la alarma; para activar la alarma se sale del
  modo voz. La voz jamás dispara sirena en ninguna página.

Verificado en código: la condición de render del botón en
`ActiveAlarmModal.tsx` cumple exactamente esta regla.

---

## 6. Auditoría de keys de Ably (dashboard verificado por el dueño)

| Key | Estado | Acción |
|---|---|---|
| `Api_pagina_B_externa_Alarma_V3` | ✅ Correctamente configurada: **Subscribe + History, SIN Publish** (verificada por el dueño en el dashboard de Ably). Es la que usa Página B. | Ninguna. |
| `pagina-b-subscribe-only` | ⚠ Obsoleta: capability **Publish mal configurada desde el Paso 5**; sin uso actual en ningún repo. | Eliminación manual pendiente por el dueño en el dashboard de Ably. No urgente (no otorga permisos peligrosos más allá de lo ya analizado en el paso 7). |

---

## 7. Cambios realizados en este paso (sin lógica)

| Archivo | Cambio |
|---|---|
| `paso 7.5 informe de correccion de bugs voz.md` | Renombrado desde "paso 8 informe de cambios agente AI.md". Contenido intacto. |
| `src/components/ActiveAlarmModal.tsx` | Solo comentario sobre `VOZ_PIN`: valor de PRUEBA temporal, validación 100% cliente (visible en bundle), riesgo aceptado igual que COORDINATORS/'12345678', futuro PIN por vecino validado en servidor, independencia voz/alarma por decisión explícita del dueño. |
| `src/lib/ablyClient.ts` | Solo comentario en el bloque Fase 6: el canal de voz reutiliza el mismo PIN de prueba temporal hasta que exista el backend. |
| `PLAN_SEGURIDAD_ABLY_APPS_SCRIPT.md` | Nueva sección 9 "PIN de voz — extensión del plan de backend". |
| `paso 8 informe de cambios agente AI.md` | Este informe (nuevo, distinto del renombrado). |

---

## 8. Estado actual

| Ítem | Estado |
|---|---|
| Fase 6 (código) | ✅ 100% completa en ambos repos |
| Fase 6 (producción) | ✅ Desplegada en ambos repos (15/08/2026, commits `1f4e8d9` / `c802033`) |
| Fixes de fiabilidad voz | ✅ Los 3 aplicados y en producción (ver paso 7.5) |
| Fase 5 punto 5 (history + ventana 120 s) | ✅ Implementado en Página B |
| PIN `4555` público | ⚠ Aceptado temporal (documentado en código y sección 9) |
| Seguridad real del PIN | ⏳ Pendiente hasta Fase Backend (Code.gs + Google Sheets, sección 9) |
| Key obsoleta `pagina-b-subscribe-only` | 🗑 Pendiente eliminación manual por el dueño (no urgente) |
| Key `Api_pagina_B_externa_Alarma_V3` | ✅ Correcta (Subscribe + History, sin Publish) |

---

## 9. Verificación y alcance

- Cambios de código: **solo comentarios** (cero cambios de lógica, cero cambios
  de tipos).
- Verificación omitida a solicitud del dueño (limitaciones de RAM/disco); los cambios son solo comentarios y archivos .md, sin impacto compilable.
- **No se ejecutó `git commit` ni `git push` en ningún repo**, por instrucción
  explícita del dueño.
