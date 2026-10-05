# Versión 0.2.28 - Corrección de validación de celular en Página A (Alarma Web) y sincronización con flujo de tokens de Code.gs v3.1

**Fecha:** 2026-10-04

## Resumen

Se solucionó el problema en la **Página A** (`ActiveAlarmModal.tsx`) donde al ingresar un celular registrado (ej. `12345678`) la verificación fallaba arrojando la modal de número inexistente en la base de datos.
El origen se debía a que el frontend seguía enviando la acción obsoleta `accion: 'validar_contacto'` (removida en el rediseño v15 de `Code.gs` a favor del flujo seguro de tokens de acción), lo que provocaba que `Code.gs` cayera en el manejador por defecto de Afiliación y rechazara la petición por falta de token de Google.

Se actualizó la comunicación del modal web para alinearse al mismo flujo y contrato que ya utiliza Termux de manera exitosa, **sin tocar ni alterar el backend `Code.gs`**, garantizando que las peticiones de Termux sigan funcionando al 100%.

## Cambios realizados (`src/components/ActiveAlarmModal.tsx`)

1. **Paso 1 de Activación (`handleVerifyPhone`):**
   - Se reemplazó `accion: 'validar_contacto'` por `accion: 'solicitar_token_alarma'` con `origen: 'web'`.
   - Se captura el `token` emitido por Apps Script (`data.token`).
2. **Paso 2 de Activación:**
   - La petición `accion: 'activar_alarma'` ahora incluye el campo obligatorio `token: tokenAccion`.
3. **Paso 1 y 2 de Desactivación Manual:**
   - Se actualizó para solicitar token con `accion: 'solicitar_token_alarma'` y enviarlo en `accion: 'desactivar_alarma_manual'`.
4. **Auto-desactivación por tiempo (`useEffect`):**
   - Se reemplazó la llamada anterior por `accion: 'apagar_alarma_tiempo'`, la cual no requiere token y limpia el trigger huérfano en el servidor.

## Archivos modificados

| Archivo | Motivo |
| --- | --- |
| `src/components/ActiveAlarmModal.tsx` | Migración de peticiones hacia `solicitar_token_alarma`, `activar_alarma` y `desactivar_alarma_manual` con token |
| `version_0.2.28_Fix_Validacion_Telefono_Alarma_Web_Token_Action.md` | Documentación de la versión |

## Verificación de calidad

- `npm run build`: ✅ Exitoso (`built in 37.41s`, 0 errores).
- Push a GitHub: ✅ Autorizado por Alberto (deploy en producción).
