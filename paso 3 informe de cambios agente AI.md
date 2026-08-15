# PASO 3 — Informe de cambios (Agente AI)

**Fecha:** 14/08/2026
**Fase:** 3 del `PROMPT_INTEGRACION_ABLY_ALARMA_VOZ.md` — Conectar los disparadores en `ActiveAlarmModal.tsx`
**Repo:** Proyecto actual (Página A, Barrio El Trigal)
**Estado:** ✅ Completado

---

## 1. Qué se hizo

Se modificó **únicamente** `src/components/ActiveAlarmModal.tsx` (cambio quirúrgico: 37 líneas añadidas, 1 eliminada). No se tocó ningún otro archivo.

### 1.1 Import nuevo (`línea 5`)
```ts
import { publicarEventoAlarma } from '../lib/ablyClient';
```
Además se agregó `useRef` al import de React (`línea 1`).

### 1.2 Ref del sirenId (`línea 49`)
```ts
const sirenIdRef = useRef<string | null>(null);
```
- `useRef` (no `useState`): no provoca re-render y sobrevive sin duplicarse.
- Se llena solo al activar, se reutiliza al desactivar y se resetea a `null` después.

### 1.3 Disparo `activar_alarma` (`líneas 190-199`)
En `handleVerifyPhone()`, rama `step === 'enter_activation_phone'`, **justo después de `setStep('flashing')`**:
```ts
const nuevoSirenId = crypto.randomUUID();
sirenIdRef.current = nuevoSirenId;
publicarEventoAlarma('activar_alarma', {
  tipo: type,
  activatedBy: enteredPin,
  timestamp: Date.now(),
  sirenId: nuevoSirenId,
});
```
- `crypto.randomUUID()` se genera **una sola vez por activación** (no por render).

### 1.4 Disparo `desactivar_alarma` manual (`líneas 207-215`)
En la rama `else` de `handleVerifyPhone()` (desactivación con PIN, `step === 'flashing'`), **antes de `onClose(...)`**:
```ts
if (sirenIdRef.current) {
  publicarEventoAlarma('desactivar_alarma', {
    tipo: type,
    activatedBy: activatedByPhone,
    timestamp: Date.now(),
    sirenId: sirenIdRef.current,
  });
  sirenIdRef.current = null;
}
```

### 1.5 Disparo `desactivar_alarma` automático (`líneas 134-143`)
En el `useEffect` de auto-desactivación por countdown (`autoDeactivateCountdown <= 0`), **después de `stopSiren()` y antes de `onClose(...)`**: mismo payload que el punto 1.4, con el mismo `sirenId` del ref y reset a `null`.

### 1.6 NO se tocó (intencional, según sección 6 del prompt)
- ❌ `handleToggleMute()` — silencio LOCAL, no debe apagar Página B.
- ❌ El `useEffect` de limpieza al desmontar (`return () => stopSiren()`) — ciclo de vida local.
- ❌ Nada de UI/JSX ni otros `useEffect`.

---

## 2. Verificación

| Chequeo | Resultado |
|---|---|
| Diff con `git diff` | ✅ Quirúrgico: solo los 3 puntos de disparo + import + ref |
| Typecheck aislado del archivo (`tsc --noEmit` sobre `ActiveAlarmModal.tsx`) | ✅ 0 errores |
| `npm run lint` (tsc completo) | ⚠️ NO ejecutado (cuelga la máquina, 8 GB RAM — quirk conocido) |
| `git commit` / `git push` | ✅ NO ejecutados (como exige el prompt) |

**Comportamiento esperado (para validar en Fase 5):**
- Activar → se publica `activar_alarma` exactamente una vez.
- Botón "Siren Silenciada" → NO publica nada de red.
- Desactivar manual o por countdown → se publica `desactivar_alarma` exactamente una vez, con el **mismo `sirenId`** que la activación.

---

## 3. Próximo paso (Fase 4 — pendiente)

- Crear el **repo nuevo de Página B** (`barrio-el-trigal-alarma-externa`) que escucha en Ably y reproduce la sirena.
- Requerirá la clave `pagina-b-subscribe-only` (`VITE_ABLY_SUBSCRIBE_KEY`) en su propio `.env.local`.

---

## 4. Archivos modificados/creados en este paso

| Archivo | Acción |
|---|---|
| `src/components/ActiveAlarmModal.tsx` | Modificado — import, ref del sirenId, 3 puntos de disparo (activar, desactivar manual, desactivar por countdown) |