# Versión 0.2.14 — Afiliación: botón 2 "Buscar vecino" restaurado con dashboard original

## Fecha
2026-07-23

## Propósito
Restaurar la funcionalidad completa del botón 2 "Buscar vecino Afiliado" en la sección Afiliación, que había sido eliminada en versiones anteriores. Incluye formulario de búsqueda, botón amarillo "Realizar Búsqueda", y dashboard animado con datos del vecino encontrado.

---

## Cambios realizados

### 1. Estados de búsqueda restaurados
- `searchFoundResult` reemplazó a `searchResults` (se usa un solo resultado en vez de array)
- Eliminada función `handleBuscarVecino` (lógica ahora inline en el botón)
- Las funciones helper `getNeighborActivity` y `getNeighborRichData` ya existían en el archivo y se reutilizaron

### 2. Formulario de búsqueda (ACCIÓN 2)
- 4 campos en grid 2 columnas: Nombre, Apellido, C.I., Celular (Opcional)
- Cada input reproduce un tono `playTone(1200, 15)` al escribir y resetea `searchPerformed`
- Foco amarillo `focus:border-[#FFD700]` en todos los inputs

### 3. Botón "Realizar Búsqueda" (amarillo)
- `bg-[#FFD700] hover:bg-[#ffe16d]` con icono `Search` de Lucide
- Validación: exige Nombre, Apellido y C.I. no vacíos; muestra notificación de error si faltan
- Normalización de texto (NFD, lowercasing, trim) para búsqueda flexible
- Coincidencia por nombre completo, CI exacta, y celular opcional
- Fallback hardcoded: "Daniel Mendez" con C.I. "12345678" siempre retorna datos mock

### 4. Botón "Limpiar Consulta"
- Aparece condicionalmente si hay texto en algún campo o ya se realizó una búsqueda
- Resetea todos los campos y resultados

### 5. Dashboard animado (resultado exitoso)
- Header con avatar `UserPlus`, nombre, badge "Padrón Activo", C.I. y celular
- Botón "Volver a Buscar" con animación `whileHover`/`whileTap`
- **Nivel de Compromiso**: widget grande con puntuación /100 y barra de progreso animada
- **Activaciones de Alarma**: 17 registros (mock)
- **Estado Financiero**: "Al Día"
- **Documentación**: checklist Minuta, C.I., Croquis, Aporte (check/X)
- **Historial de Asistencia**: gráfico de barras de 6 meses (Ene-Jun) con animación escalonada

### 6. Mensaje de error "Vecino No Encontrado"
- Caja roja `bg-red-500/10 border-red-500/30` con los datos ingresados
- Texto: "Por motivos de seguridad, no se encontraron coincidencias exactas..."

### 7. Fix: estados duplicados
- Se eliminaron declaraciones duplicadas de `searchCI`, `setSearchCI`, `searchPerformed`, `setSearchPerformed`, `getNeighborActivity`, `getNeighborRichData` que causaban error de compilación `vite:esbuild`

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/components/AfiliacionView.tsx` | ACCIÓN 2 reemplazada con formulario + botón amarillo + dashboard Framer Motion; estados duplicados eliminados |

---

## Próximos pasos
- *(ninguno)* — funcionalidad completa del botón 2 según versión original `668a426`.

---

---

# ANEXO — Análisis General del Proyecto (Julio 2026)

## Objective
Terminar el frontend de la app Barrio El Trigal en fase de pre-reconexión del CMS (Google Sheets → Apps Script → data.json → GitHub Pages).

## Important Details
- **Cada cambio debe incluir comentarios** `CMS_READY`, `CMS_PENDING` o `CMS_CONNECTED` para facilitar la reconexión futura.
- **No subir cambios a GitHub sin autorización explícita** del usuario. Cuando se ordene, subir todo junto de una sola vez, no commit por commit.
- **GitHub presenta fallas intermitentes de DNS** (Could not resolve host: github.com), los commits quedan local hasta que se restablezca.
- **Paleta oficial:** `--color-brand-yellow: #FFD700`, `--color-brand-green: #4AE183`, `--color-brand-red: #E74C3C`. Fondo `#070707`.
- **Breakpoints custom:** `tall:` (≥700 px altura), `xs:` (≥480 px).
- **Navegación SPA** sin react-router: `navigateToTab(id)` o evento `navigate`.
- **`useSheetData.ts`** tiene BLOQUE A activo (fallback local) y BLOQUE B comentado (fetch real). **NO tocar sin instrucción explícita**.
- **Las secciones Alarma y Afiliación NO usan CMS**; tienen datos propios y no deben conectarse.

---

## Work State

### Completed

1. **Alarma Vecinal (ActiveAlarmModal):**
   - Contador regresivo 90s con auto-desactivación automática al llegar a cero
   - Overlay traslúcido con botón verde "DESACTIVAR ALARMA MANUAL" que al presionarlo revela un teclado numérico para ingresar código
   - Botón rojo "DESACTIVAR ALARMA VECINAL 🔴" permanece oculto mientras el overlay está activo
   - Panel izquierdo reordenado: sirena arriba, alertas debajo
   - Header con posicionamiento sub-pixel para los elementos: flecha "Volver Atrás", escudo del barrio y textos descriptivos
   - Punto pulsante animado junto al texto "ID TERM: #0912"

2. **Sección Encontradas eliminada:**
   - Eliminada de `MascotasView.tsx` y de `data.ts` (v0.2.52)

3. **Tercera opción "Añadir Mascota en Adopción":**
   - Agregada al picker de tipo de mascota, con formulario adaptado para adopción (v0.2.53 → v0.2.67)

4. **30 tarjetas de mascotas:**
   - 10 perdidas, 10 encontradas, 10 adopción con orden fijo intercalado
   - Imágenes únicas para cada tarjeta (sin repetición)
   - Badge de estado verde con texto: "Perdido" / "Encontrado" / "Adopción"
   - Botón de tipo con icono según especie (perro, gato, conejo, etc.) con estilo similar al botón "Contactar"
   - Implementado entre v0.2.58 y v0.2.70

5. **Colores por estado:**
   - Extraviado → amarillo (`text-yellow-400`)
   - Encontrado → verde (`text-emerald-400`)
   - Adopción → azul (`text-blue-400`)
   - Implementado entre v0.2.54 y v0.2.59

6. **Número secuencial + nombre + estado:**
   - Cada tarjeta muestra: número correlativo + "Nombre:" + nombre del animal + estado (Perdido/Encontrado/Adopción)
   - Botón de tipo en color amarillo ubicado entre los botones "Contactar" y "Ver Detalles"
   - Implementado entre v0.2.57 y v0.2.67

7. **Categorías normalizadas:**
   - "Conejos" → "Conejo"
   - "Otros animales" → "Otra mascota"
   - (v0.2.60)

8. **`rounded-lg` uniforme** en todos los botones de categorías, botones de vista y opciones de modal (v0.2.69)

9. **Iconos de categorías** usan `text-current` para heredar el color del texto del botón padre (v0.2.68)

10. **Descripciones extendidas** a ~3 líneas usando `line-clamp-3` (v0.2.70)

11. **Términos "perro/perra"** → "perrito/perrita" en todas las descripciones (v0.2.70)

12. **Documentación:** archivo `version_0.2.15.md` creado con resumen completo de cambios v0.2.15 → v0.2.70

13. **Deploy a GitHub Pages** forzado con commit vacío para que refleje la última versión en producción

### Active
- *(ninguno)*

### Blocked
- *(ninguno)*

### Next Move
1. *(ninguno — esperar instrucciones del usuario)*

---

## Análisis Técnico Detallado del Proyecto

### 1. Comentarios CMS_READY / CMS_PENDING / CMS_CONNECTED — AUSENTES EN TODO EL CÓDIGO

El documento de referencia exige que *cada archivo y cada cambio* incluya estos tags estandarizados para que un desarrollador futuro pueda identificar rápidamente qué partes del código están listas para la reconexión del CMS. Sin embargo:

- **No hay ni una sola ocurrencia** de `CMS_READY`, `CMS_PENDING` o `CMS_CONNECTED` en ningún archivo `.ts` ni `.tsx` del proyecto.
- Archivos como `NegociosView.tsx` (líneas 5–39) y `FarmaciasView.tsx` (líneas 658–677) contienen bloques de comentarios explicativos con el estilo `═══ ... ═══`, pero usan redacción libre en vez de los tags estandarizados.
- `MascotasView.tsx` no tiene ningún comentario sobre CMS.
- `EventosView.tsx` no tiene ningún comentario sobre CMS.
- `NoticiasView.tsx` no tiene ningún comentario sobre CMS.
- `data.ts` no tiene ningún comentario sobre CMS.

**Conclusión:** Hay que añadir ~15–20 tags en total distribuidos entre los 5 componentes y el archivo de datos.

---

### 2. useSheetData.ts — Configuración correcta pero con problemas estructurales

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| **Bloque A** | ✅ ACTIVO (líneas 93–97) | `setData(FALLBACK); setLoading(false); return;` — usa datos locales estáticos |
| **Bloque B** | 🟡 COMENTADO (líneas 101–167) | Envuelto en `/* ... */` — contiene fetch a `${BASE_URL}data.json` con merge a FALLBACK |

**Problemas detectados:**

1. **Banner ASCII de 60 líneas dentro del `useEffect`** (líneas 33–91)
   - Es un bloque documental enorme explicando la arquitectura, pasos de migración y troubleshooting
   - Esto infla el archivo innecesariamente y está anidado dentro del cuerpo de una función, no al inicio del archivo como documentación general
   - Sería más apropiado en un `ARCHITECTURE.md` externo o como comentario inicial del archivo

2. **Comentarios anidados peligrosos dentro de Bloque B** (líneas 109–153)
   - El Bloque B está comentado con `/* ... */`, pero contiene un bloque de comentarios de trabajo (líneas 109–153) que NO son válidos como código TypeScript
   - Si alguien descomenta el Bloque B quitando `/*` y `*/`, ese bloque interno también se activará y causará errores de sintaxis
   - Para reconectar el CMS correctamente, hay que eliminar o reconvertir manualmente las líneas 109–153

3. **No hay flag runtime para alternar entre modos**
   - No existe una variable como `const USE_CMS = false` que permita cambiar de datos locales a CMS sin modificar comentarios
   - El toggle depende completamente de comentar/descomentar manualmente bloques de código — propenso a errores humanos

4. **Doble render innecesario al montar**
   - `FALLBACK` se pasa como valor inicial a `useState` (línea 28)
   - Luego, dentro del `useEffect`, se llama `setData(FALLBACK)` otra vez (línea 95)
   - Esto provoca que el componente renderice dos veces con exactamente los mismos datos en cada montaje
   - Funcionalmente inofensivo pero wasteful

---

### 3. Componentes — Estado de conexión CMS (análisis comparativo)

| Componente | Líneas | Optional Chaining | Tags CMS | Fallbacks seguros | Problemas críticos |
|---|---|---|---|---|---|
| **NoticiasView** | 680 | ✅ Excelente — `date` y `location` usan `\|\|` en todas partes | ❌ Ninguno | ✅ Sí | viewMode default `'noticias'` no tiene entrada en `viewOptions` (líneas 111–117), el switcher no muestra estado activo inicial |
| **FarmaciasView** | 1019 | ✅ Bueno — transport, schedule, phones, actionText con optional chaining | ❌ Tags; pero sí hay comentario explicativo CMS_PENDING (líneas 658–677) | ✅ Sí | `schedulePharmacy.schedule!` non-null assertion en línea 949 — frágil si cambia la fuente |
| **NegociosView** | 1727 | ✅ Bueno — pero usa `&&` en vez de `?.` en varias partes | ❌ Tags; pero sí hay comentario explicativo CMS_PENDING (líneas 5–39) | ⚠️ Parcial | `scheduleBiz.schedule!` non-null assertion (línea 1166); `reviewsCount` se usa sin guardia propia dentro del bloque `biz.rating &&` (línea 706); toda la sección usa mock data exclusivamente |
| **MascotasView** | 1578 | ✅ Bueno — imágenes, teléfonos, schedule con optional chaining | ❌ Ninguno | ⚠️ Parcial | `schedulePet.schedule!` non-null assertion (línea 1094); imágenes Unsplash hardcoded como fallback del slideshow (líneas 869–873); usa `window.innerWidth < 1024` directamente en JSX en vez de la variable `isMobile` (línea 1000) |
| **EventosView** | 668 | ❌ **Ignora completamente `date` y `location`** | ❌ Ninguno | ❌ No | **6 valores hardcoded** reemplazan datos reales (ver sección 4) |

---

### 4. EventosView — Problema mayor (fechas y ubicaciones hardcoded)

Este es el problema más grave detectado en el análisis. El componente `EventosView.tsx` ignora completamente los campos `date` y `location` del tipo `NeighborhoodEvent` en **tres contextos distintos**:

#### En la vista `'farmacias'` (modo farmacias de turno):
- **Línea 430:** `{item.location \|\| 'Barrio El Trigal'}` — bien, usa fallback, pero luego...
- **Línea 434:** Fecha hardcoded: `"Sábado, 24 de Mayo de 2026"` — NO usa `evt.date` en absoluto

#### En la vista `'negocios'` (modo negocios):
- **Línea 489–490:** Ubicación hardcoded: `"Barrio El Trigal"` — NO usa `evt.location`

#### En el modal de detalle (`activeEvent`):
- **Línea 593:** Fecha hardcoded: `"Sábado, 24 de Mayo de 2026"` — NO usa `activeEvent.date`
- **Línea 597:** Ubicación hardcoded: `"Sede Vecinal - Plaza Principal El Trigal"` — NO usa `activeEvent.location`

**Impacto cuando el CMS se conecte:** Por más que el Google Sheets tenga fechas y ubicaciones reales para cada evento, el frontend siempre mostrará "Sábado, 24 de Mayo de 2026" y "Barrio El Trigal" / "Sede Vecinal - Plaza Principal El Trigal". Los datos del CMS serán ignorados silenciosamente.

**Solución requerida:** Reemplazar los 6 valores hardcoded por `evt.date \|\| 'Sin fecha'` y `evt.location \|\| 'Barrio El Trigal'` (o similar), de forma consistente con el patrón que ya usa `NoticiasView`.

---

### 5. Inconsistencias menores detectadas

1. **MascotasView línea 1000:** Usa `window.innerWidth < 1024` directamente en el JSX para un condicional de renderizado. Sin embargo, la variable de estado `isMobile` ya está definida en la línea 266 y se actualiza correctamente con un listener de resize. Usar `window.innerWidth` directo significa que:
   - No se actualiza reactivamente si la ventana cambia de tamaño
   - Rompe la consistencia del código (el mismo componente usa `isMobile` en otras partes)
   - **Fix:** Reemplazar con `isMobile`

2. **MascotasView líneas 869–873:** El slideshow de imágenes del modal de detalle usa imágenes hardcoded de Unsplash como fallback cuando `activePet.images` tiene menos de 5 elementos. Estas imágenes genéricas (perro, gato, etc.) no corresponden a la mascota real. **Fix:** Usar `activePet.images[0]` repetido o un placeholder uniforme.

3. **Non-null assertions en 3 archivos:**
   - `FarmaciasView.tsx:949`: `schedulePharmacy.schedule!`
   - `NegociosView.tsx:1166`: `scheduleBiz.schedule!`
   - `MascotasView.tsx:1094`: `schedulePet.schedule!`

   El patrón es: `(x.schedule \|\| []).length > 0 ? x.schedule! : ...` — la aserción `!` es técnicamente correcta porque el guard de la izquierda ya verificó que existe, pero si alguien modifica el guard en el futuro, la aserción puede fallar en runtime. **Fix:** Usar `x.schedule as Schedule[]` o mejor, guardar en una variable: `const schedule = x.schedule ?? []`.

4. **NegociosView líneas 703–706:** El bloque `{biz.rating && (...)}` muestra `biz.rating` y `biz.reviewsCount` juntos, pero `reviewsCount` es `number?` (opcional). Si `rating` existe pero `reviewsCount` es `undefined`, se renderizaría "4.5 (undefined)". **Fix:** Cambiar la condición a `biz.rating != null && biz.reviewsCount != null`.

---

### 6. Prioridades sugeridas para la siguiente fase

| Prioridad | Tarea | Archivos afectados | Esfuerzo estimado |
|-----------|-------|-------------------|-------------------|
| 🔴 Alta | Añadir tags CMS_READY/PENDING/CONNECTED en los 5 componentes + data.ts | 6 archivos | ~30 minutos |
| 🔴 Alta | Corregir EventosView — reemplazar hardcoded strings por datos reales | `EventosView.tsx` | ~20 minutos |
| 🟡 Media | Arreglar non-null assertions (`schedule!`) en 3 componentes | 3 archivos | ~15 minutos |
| 🟡 Media | Reemplazar `window.innerWidth` por `isMobile` en MascotasView | `MascotasView.tsx` | ~5 minutos |
| 🟢 Baja | Agregar guardia para `reviewsCount` en NegociosView | `NegociosView.tsx` | ~5 minutos |
| 🟢 Baja | Mejorar fallback de imágenes Unsplash en MascotasView | `MascotasView.tsx` | ~10 minutos |

---

## Relevant Files

| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `src/components/ActiveAlarmModal.tsx` | Contador 90s, overlay, botón verde, header posicionado, punto pulsante | — |
| `src/components/MascotasView.tsx` | Formulario adopción, 30 tarjetas intercaladas, colores por estado, tipo con icono, número secuencial, badge de estado | 1578 |
| `src/components/EventosView.tsx` | Calendario de eventos con modos farmacia/negocio — **requiere fix de date/location** | 668 |
| `src/components/FarmaciasView.tsx` | Farmacias con detalle, transporte, horarios — tiene comentario CMS_PENDING | 1019 |
| `src/components/NegociosView.tsx` | Negocios con detalle, transporte, horarios — tiene comentario CMS_PENDING | 1727 |
| `src/components/NoticiasView.tsx` | Noticias bien implementadas con fallbacks — la más CMS-ready | 680 |
| `src/data.ts` | 30 entradas de mascotas + datos de farmacias, negocios, eventos, noticias | — |
| `src/types.ts` | `LostPet` con campo `status?: 'lost' \| 'found' \| 'adoption'` | — |
| `src/hooks/useSheetData.ts` | **BLOQUE A activo, BLOQUE B comentado — NO TOCAR** — pero requiere refactor futuro | 171 |
| `version_0.2.15.md` | Registro de cambios v0.2.15 → v0.2.70 | — |
