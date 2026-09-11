import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Volume2, VolumeX, Check, CheckCircle, RefreshCw, X, Shield, Phone, Smartphone, Mic, MicOff, Loader2 } from 'lucide-react';
import { stopSiren, startSiren, playTone } from './AudioSiren';
import { AlarmLog } from '../types.alarma';
import { publicarChunkVoz, publicarFinVoz, publicarInicioVoz, publicarEventoAlarma, crearClienteAblyParaVoz } from '../lib/ablyClient';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWMU9bKHzy5SQoUP5p5rxSsH2KCx4ujVZ2Beh-M_LyY3UN1pYOFt8xKVHjOxsxz0mG/exec";

interface ActiveAlarmModalProps {
  isOpen: boolean;
  onClose: (newLog: AlarmLog) => void;
  type: 'panic' | 'suspicious' | 'test' | 'medical';
}

const COORDINATORS = [
  { phone: '72947032', name: 'Coordinador El Trigal 1' },
  { phone: '60272812', name: 'Coordinador El Trigal 2' },
  { phone: '74545456', name: 'Coordinador El Trigal 3' },
  { phone: '72972988', name: 'Coordinador El Trigal 4' },
  { phone: '69835999', name: 'Coordinador El Trigal 5' }
];

/**
 * Modal de activación/desactivación de la alarma vecinal con PIN de
 * celular, temporizador, bitácora de despacho y sirena Web Audio.
 *
 * Responsive (sección 5.1):
 *  - sin prefijo / `tall:` (mobile): hoja completa con scroll vertical.
 *    Los dos paneles (info + teclado) se apilan uno sobre otro.
 *  - `sm:` (≥ 640px): layout de dos paneles estilo origen (1000×620).
 */
const AUTO_DEACTIVATE_SECONDS = 90;

export default function ActiveAlarmModal({ isOpen, onClose, type }: ActiveAlarmModalProps) {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showMissingPinAlert, setShowMissingPinAlert] = useState(false);
  const [step, setStep] = useState<'enter_activation_phone' | 'flashing'>('enter_activation_phone');
  const [activatedByPhone, setActivatedByPhone] = useState('12345678');
  const [showUnregisteredModal, setShowUnregisteredModal] = useState(false);
  const [attemptedPhone, setAttemptedPhone] = useState('');

  const [isVerifying, setIsVerifying] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);
  const activationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [deactivationSuccess, setDeactivationSuccess] = useState(false);
  const deactivationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [serverDuration, setServerDuration] = useState(AUTO_DEACTIVATE_SECONDS);

  const autoDeactivateCountdown = Math.max(0, serverDuration - seconds);
  const [showKeypadForDeactivation, setShowKeypadForDeactivation] = useState(false);

  const [dispatchLogs, setDispatchLogs] = useState<string[]>([]);

  // ---- Fase 6: Mensaje de voz en tiempo real con Token Seguro ----
  const [vozTransmitiendo, setVozTransmitiendo] = useState(false);
  const [vozError, setVozError] = useState<string | null>(null);
  const [modoVoz, setModoVoz] = useState(false);
  const [celularParaVoz, setCelularParaVoz] = useState('');
  const [pinVoz, setPinVoz] = useState('');
  const [isVerifyingVoz, setIsVerifyingVoz] = useState(false);
  const [tokenVozAutorizado, setTokenVozAutorizado] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  // Contador de secuencia de los fragmentos de voz de la transmisión ACTUAL.
  const vozSeqRef = useRef<number>(0);

  // Limpieza de la captura de voz al cerrar/desmontar el modal
  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current = null;
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    };
  }, []);

  // sirenId de la sesión de alarma actual.
  const sirenIdRef = useRef<string | null>(null);

  // Setup modal state on open
  useEffect(() => {
    if (isOpen) {
      setSeconds(0);
      setEnteredPin('');
      setPinError(false);
      setStep('enter_activation_phone');
      setIsMuted(false);
      setShowUnregisteredModal(false);
      setShowKeypadForDeactivation(false);
      setVozTransmitiendo(false);
      setVozError(null);
      setModoVoz(false);
      setCelularParaVoz('');
      setPinVoz('');
      setIsVerifyingVoz(false);
      setTokenVozAutorizado(false);
      setIsVerifying(false);
      setActivationSuccess(false);
      if (activationTimerRef.current) {
        clearTimeout(activationTimerRef.current);
        activationTimerRef.current = null;
      }
      setDeactivationSuccess(false);
      if (deactivationTimerRef.current) {
        clearTimeout(deactivationTimerRef.current);
        deactivationTimerRef.current = null;
      }
      setDispatchLogs([
        'Iniciando secuencia de validación de identidad...',
        'Esperando ingreso de número de celular de 8 dígitos para activación...',
      ]);
    }
    return () => {
      stopSiren();
      if (activationTimerRef.current) {
        clearTimeout(activationTimerRef.current);
        activationTimerRef.current = null;
      }
      if (deactivationTimerRef.current) {
        clearTimeout(deactivationTimerRef.current);
        deactivationTimerRef.current = null;
      }
    };
  }, [isOpen]);

  // Handle siren activation upon transitioning to flashing mode
  useEffect(() => {
    if (isOpen && step === 'flashing') {
      if (!isMuted) {
        startSiren();
      }
      setShowKeypadForDeactivation(false);
      setDispatchLogs([
        'Secuencia de alerta comunitaria iniciada.',
        'Siren disuasivo físico de poste activado (simulado).',
        'Notificación push enviada a los 142 afiliados del barrio.',
        `Alerta reportada por el número registrado: ${activatedByPhone}`,
        'Transmitiendo coordenadas GPS de la cuenta a la central de serenazgo...',
      ]);
    } else {
      stopSiren();
    }
  }, [step, isOpen]);

  // Toggle Mute
  const handleToggleMute = () => {
    if (isMuted) {
      if (step === 'flashing') {
        startSiren();
      }
      setIsMuted(false);
    } else {
      stopSiren();
      setIsMuted(true);
    }
    playTone(440, 100);
  };

  // Stopwatch for active alarm
  useEffect(() => {
    if (!isOpen || step !== 'flashing') return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, step]);

  // Append simulated radio updates based on stopwatch
  useEffect(() => {
    if (step !== 'flashing') return;

    if (seconds === 5) {
      setDispatchLogs((prev) => [...prev, '⚡ Alerta recibida por Central de Serenazgo de Tarija (EPIC).']);
    } else if (seconds === 10) {
      setDispatchLogs((prev) => [...prev, '🚓 Patrulla asignada al cuadrante Sur (El Trigal) con prioridad máxima.']);
    } else if (seconds === 18) {
      setDispatchLogs((prev) => [...prev, '📞 Llamada de verificación del coordinador de seguridad saliendo...']);
    }
  }, [seconds, step]);

  // Auto-deactivate when countdown reaches 0: apaga Página A y apaga de inmediato Página B
  useEffect(() => {
    if (step !== 'flashing' || autoDeactivateCountdown > 0) return;
    const currentSirenId = sirenIdRef.current;
    const validPhone = activatedByPhone;

    // 1. Apagar sirena local en Página A
    stopSiren();

    // 2. Apagar de inmediato Página B en Ably con la duración exacta configurada
    if (currentSirenId) {
      publicarEventoAlarma('desactivar_alarma', {
        tipo: type,
        activatedBy: validPhone,
        timestamp: Date.now(),
        sirenId: currentSirenId,
      });

      // 3. Notificar a Apps Script para limpiar el trigger pendiente en el servidor
      fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          accion: 'desactivar_alarma_manual',
          telefono: validPhone,
          tipo: type,
          sirenId: currentSirenId,
        }),
      }).catch((err) => console.error('[Alarma] Error al cancelar temporizador en auto-desactivación:', err));
    }

    sirenIdRef.current = null;
    onClose({
      id: `log-${Date.now()}`,
      timestamp: 'Hoy, ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      type: type,
      user: `Celular Autorizado (${validPhone})`,
      status: 'resolved',
      resolvedBy: 'Auto-desactivacion',
      resolutionTime: formatTime(seconds),
    });
  }, [autoDeactivateCountdown, step]);

  if (!isOpen) return null;

  // Format time (MM:SS)
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (num: string) => {
    if (isVerifying || activationSuccess || deactivationSuccess || isVerifyingVoz) return;
    if (modoVoz) {
      if (tokenVozAutorizado) return;
      if (pinVoz.length < 4) {
        setPinVoz((prev) => prev + num);
        setVozError(null);
      }
    } else {
      if (enteredPin.length < 15) {
        setEnteredPin((prev) => prev + num);
        setPinError(false);
        setShowMissingPinAlert(false);
      }
    }
    setTimeout(() => playTone(1500, 35, 'square'), 0);
  };

  const handleBackspace = () => {
    if (isVerifying || activationSuccess || deactivationSuccess || isVerifyingVoz) return;
    if (modoVoz) {
      if (tokenVozAutorizado) return;
      setPinVoz((prev) => prev.slice(0, -1));
      setVozError(null);
    } else {
      setEnteredPin((prev) => prev.slice(0, -1));
      setPinError(false);
    }
    setTimeout(() => playTone(392, 80), 0);
  };

  const handleSolicitarTokenVoz = async () => {
    if (isVerifyingVoz || pinVoz.length < 4) return;
    setIsVerifyingVoz(true);
    setVozError(null);

    try {
      const resp = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          accion: 'solicitar_token_voz',
          telefono: celularParaVoz,
          pin: pinVoz,
        }),
      });

      const data = await resp.json();

      if (data && data.exito && data.tokenRequest) {
        playTone(880, 250);
        crearClienteAblyParaVoz(data.tokenRequest);
        setTokenVozAutorizado(true);
      } else {
        playTone(220, 400);
        setVozError(data.mensaje || 'Celular o PIN incorrecto.');
        setPinVoz('');
      }
    } catch (err) {
      console.error('[Voz] Error al solicitar token a Apps Script:', err);
      playTone(220, 400);
      setVozError('Error de conexión con el servidor. Intente nuevamente.');
    } finally {
      setIsVerifyingVoz(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (isVerifying) return;
    setIsVerifying(true);

    try {
      if (step === 'enter_activation_phone') {
        // Paso 1: Validar únicamente el contacto en Google Sheets (Apps Script).
        // NO dispara Ably todavía; Página B permanece en silencio total.
        const resp = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            accion: 'validar_contacto',
            telefono: enteredPin,
          }),
        });

        const data = await resp.json();

        if (data && data.exito) {
          playTone(880, 250);
          if (data.duracion && Number(data.duracion) > 0) {
            setServerDuration(Number(data.duracion));
          }
          const validPhone = enteredPin;
          setActivatedByPhone(validPhone);
          if (data.nombreVecino) {
            setDispatchLogs((prev) => [
              ...prev,
              `Vecino validado en base de datos: ${data.nombreVecino} (${validPhone})`,
              `Tiempo de activación programado por servidor: ${data.duracion || AUTO_DEACTIVATE_SECONDS} segundos.`,
            ]);
          }

          // Notificación visual inmediata en el botón: ALARMA ACTIVADA CON ÉXITO
          // Página B todavía NO suena; el vecino lee la confirmación con total claridad.
          setIsVerifying(false);
          setActivationSuccess(true);

          // Pausa de 2.9 segundos para que el usuario visualice la confirmación.
          // RECIÉN cuando termina este tiempo, se activa la alarma en Página B y Página A.
          activationTimerRef.current = setTimeout(() => {
            const nuevoSirenId = crypto.randomUUID();
            sirenIdRef.current = nuevoSirenId;

            // 1. Activar sonido en Página B vía Ably de forma inmediata
            publicarEventoAlarma('activar_alarma', {
              tipo: type,
              activatedBy: validPhone,
              timestamp: Date.now(),
              sirenId: nuevoSirenId,
            });

            // 2. Programar apagado automático en el servidor (Apps Script)
            fetch(APPS_SCRIPT_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain;charset=utf-8' },
              body: JSON.stringify({
                accion: 'activar_alarma',
                telefono: validPhone,
                tipo: type,
                sirenId: nuevoSirenId,
              }),
            }).catch((err) => console.error('[Alarma] Error al programar apagado en servidor:', err));

            // 3. Activar sirena local en Página A y pasar a pantalla activa
            setActivationSuccess(false);
            setEnteredPin('');
            setStep('flashing');
          }, 2900);

          return;
        } else {
          // No autorizado o número no registrado
          playTone(220, 400); // Error buzz
          setAttemptedPhone(enteredPin);
          setShowUnregisteredModal(true);
          setEnteredPin('');
        }
      } else {
        // Desactivación manual — Paso 1: Solo validar el número en Sheets,
        // SIN publicar a Ably todavía. Página B sigue sonando en este punto.
        const validPhone = enteredPin;
        const resp = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            accion: 'validar_contacto',
            telefono: validPhone,
          }),
        });

        const data = await resp.json();

        if (data && data.exito) {
          playTone(880, 250);

          // Notificación visual inmediata: ALARMA DESACTIVADA CON ÉXITO
          // Página B todavía SUENA; el vecino lee la confirmación con claridad.
          setIsVerifying(false);
          setDeactivationSuccess(true);

          const durationStr = formatTime(seconds);
          const currentSirenId = sirenIdRef.current;

          // Pausa de 2.9 s para que el usuario vea la confirmación.
          // RECIÉN cuando termina, se apaga Página A primero y se envía la petición al backend en Apps Script
          // para que sea Google quien envíe la petición a los servidores de Ably y apague Página B.
          deactivationTimerRef.current = setTimeout(() => {
            // 1. Apagar sirena local en Página A
            stopSiren();

            // 2. Enviar petición a Apps Script para que Google publique en Ably y apague Página B
            fetch(APPS_SCRIPT_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain;charset=utf-8' },
              body: JSON.stringify({
                accion: 'desactivar_alarma_manual',
                telefono: validPhone,
                tipo: type,
                sirenId: currentSirenId || '',
              }),
            }).catch((err) => console.error('[Alarma] Error al enviar desactivación a Apps Script:', err));

            // 3. Limpiar estado y cerrar modal
            sirenIdRef.current = null;
            setDeactivationSuccess(false);
            onClose({
              id: `log-${Date.now()}`,
              timestamp: 'Hoy, ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
              type: type,
              user: `Celular Autorizado (${activatedByPhone})`,
              status: 'resolved',
              resolvedBy: `Vecino (${validPhone})`,
              resolutionTime: durationStr,
            });
          }, 2900);

          return;
        } else {
          playTone(220, 400);
          setPinError(true);
        }
      }
    } catch (err) {
      console.error('[Alarma] Error al conectar con Apps Script:', err);
      playTone(220, 400);
      alert('Error de conexión con el servidor de alarma. Verifique su conexión.');
    } finally {
      setIsVerifying(false);
    }
  };

  // ---- Fase 6: Captura de voz (walkie-talkie) ----
  // No todos los navegadores soportan el mismo mimeType; se verifica antes
  // de instanciar MediaRecorder o lanza excepción en runtime.
  const iniciarCapturaVoz = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const mimeTypeCandidatos = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
      const mimeType = mimeTypeCandidatos.find((t) => MediaRecorder.isTypeSupported(t));
      if (!mimeType) {
        throw new Error('Ningún formato de audio soportado por este navegador.');
      }

      // Reiniciar el contador de secuencia: cada transmisión nueva empieza en 0.
      vozSeqRef.current = 0;
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      // Anunciar el formato ANTES del primer chunk: Página B necesita el
      // mimeType para construir el Blob y reproducir con <audio> nativo.
      publicarInicioVoz(mimeType);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          // Asignación SÍNCRONA del número de secuencia — debe ocurrir aquí,
          // dentro del propio callback de ondataavailable, ANTES de que
          // publicarChunkVoz inicie su conversión asíncrona (blob.arrayBuffer()).
          // Si esto se moviera dentro de una función async, el orden de creación
          // ya no quedaría garantizado y todo el fix perdería su efecto.
          const seq = vozSeqRef.current;
          vozSeqRef.current += 1;
          publicarChunkVoz(e.data, seq);
        }
      };
      // Un Blob cada 250ms — balance entre latencia percibida y overhead.
      mediaRecorder.start(250);
      mediaRecorderRef.current = mediaRecorder;
      setVozTransmitiendo(true);
      setVozError(null);
    } catch (err) {
      // getUserMedia rechaza si el usuario denegó el permiso o el navegador
      // lo bloqueó previamente. Se muestra un mensaje claro, no se rompe el modal.
      console.warn('[Voz] Error al iniciar captura:', err);
      setVozTransmitiendo(false);
      setVozError('Permiso de micrófono denegado. Habilítelo en el navegador para enviar voz.');
    }
  };

  const detenerCapturaVoz = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    mediaRecorderRef.current = null;
    // CRÍTICO: publicar 'voz_fin' solo cuando el MediaRecorder haya terminado
    // de emitir su último chunk ('stop' se dispara DESPUÉS del último
    // 'dataavailable'). Si se publica aquí de forma síncrona, el chunk final
    // (asíncrono) puede llegar a Página B DESPUÉS del 'voz_fin', dejando un
    // estado "huérfano" que rompe la siguiente transmisión.
    recorder.addEventListener('stop', () => {
      // CRÍTICO: detener las pistas del stream, o el ícono de micrófono queda
      // encendido aunque MediaRecorder ya haya parado.
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      publicarFinVoz();
      setVozTransmitiendo(false);
    });
    recorder.stop();
  };

  const handleToggleVoz = () => {
    playTone(880, 100);
    if (vozTransmitiendo) {
      detenerCapturaVoz();
    } else {
      iniciarCapturaVoz();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-stretch justify-center bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain font-sans pt-[45px] pb-14 md:pt-4 md:pb-4">

      {/* Flashing Warning Visuals (only if alarm is flashing) */}
      {step === 'flashing' && (
        <div className={`fixed inset-0 opacity-15 pointer-events-none transition-colors duration-300 ${seconds % 2 === 0 ? 'bg-[#FFD700]' : 'bg-[#F87171]'}`} />
      )}

      {/* Contenedor: en mobile hoja completa con scroll; en sm: panel fijo 1000×620 */}
      <div className="relative w-full max-h-[100dvh] sm:max-h-[620px] sm:w-[1000px] bg-[#0c101d] rounded-none sm:rounded-[32px] border-y sm:border border-white/10 overflow-y-auto sm:overflow-hidden custom-scrollbar shadow-[0_0_80px_rgba(248,113,113,0.15)] flex flex-col sm:h-[620px]">

        {/* HEADER SUPERIOR UNIFICADO Y ULTRA-PROFESIONAL — sin botón Volver Atrás (movido a App.tsx header) */}
        <div className="sticky top-0 z-50 w-full flex items-center justify-start sm:justify-center px-4 sm:px-5 py-1.5 bg-[#0a0d18]/95 backdrop-blur-md border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3 min-w-0 w-full max-w-[220px] mx-auto sm:max-w-none sm:mx-auto px-1 sm:px-0">
            <div className={`ml-[-8px] sm:ml-0 p-2.5 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              step === 'enter_activation_phone'
                ? 'bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 text-[#FFD700] border border-[#FFD700]/30 shadow-[#FFD700]/5'
                : 'bg-gradient-to-br from-red-500/20 to-red-500/5 text-red-400 border border-red-500/30 shadow-red-500/5'
            }`}>
              <ShieldAlert className={`w-5 h-5 ${step === 'flashing' ? 'animate-pulse text-red-400' : 'text-[#FFD700]'}`} />
            </div>
            <div className="flex flex-col ml-[6px]">
              <div className="flex items-center space-x-2">
                <h3 className={`text-sm sm:text-base font-extrabold tracking-wide uppercase font-sans whitespace-nowrap transition-all duration-300 ${
                  step === 'enter_activation_phone' ? 'text-white' : 'text-red-400 animate-pulse'
                }`}>
                  {step === 'enter_activation_phone' ? 'Activar Alarma' : 'Desactivar Alarma'}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">ID TERM: #0912</span>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                  step === 'enter_activation_phone' ? 'bg-[#FFD700] animate-pulse' : 'bg-red-500 animate-ping'
                }`} />
              </div>
            </div>
          </div>
        </div>

        {/* CUERPO DEL MODAL (PANELES SPLIT) */}
        {/* En mobile sin overflow: el contenido fluye y es el contenedor
            principal (línea 180) el único que hace scroll, así teclado +
            texto "ALARMA VECINAL ACTIVA" + bitácora se deslizan juntos.
            En desktop (sm:) cada panel mantiene su scroll independiente. */}
        <div className="flex-1 flex flex-col sm:flex-row sm:overflow-hidden">

          {/* Left pane: Activation Info or Flashing Siren logs.
              Sin overflow en mobile para que todo fluya en un solo scroll
              junto con el teclado; en desktop cada panel tiene su propio scroll. */}
          <div className="order-2 sm:order-none flex-1 px-5 pb-6 sm:p-8 flex flex-col justify-between border-t sm:border-t-0 sm:border-r border-white/5 bg-gradient-to-br from-black/40 to-transparent sm:overflow-y-auto">

            {step === 'enter_activation_phone' ? (
              <div className="flex flex-col gap-4 sm:gap-6 justify-center">

                {/* Escudo + "Validación de Vecinos" — SOLO desktop */}
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="p-2.5 bg-[#FFD700]/10 rounded-2xl border border-[#FFD700]/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <span className="text-gray-400 font-mono text-xs uppercase tracking-widest font-semibold">Validación de Vecinos</span>
                </div>

                {/* Texto "Para evitar activaciones..." */}
                <div className="order-2 sm:order-none">
                  <h2 className="hidden sm:block text-2xl font-bold tracking-tight text-white mb-2 leading-tight font-sans">
                    Activación de Alarma Vecinal
                  </h2>
                  <p className="text-gray-300 text-[11px] sm:text-xs leading-relaxed sm:max-w-md">
                    Para evitar activaciones accidentales o por parte de personas no residentes, el sistema requiere verificar su número de celular de 8 dígitos registrado.
                  </p>
                </div>

                {/* Tarjeta azul de llamadas — SOLO desktop */}
                <div className="hidden sm:flex bg-blue-500/10 border border-blue-500/20 rounded-xl p-3.5 items-start space-x-2.5 text-[10px] text-blue-300 sm:max-w-md leading-normal">
                  <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Las llamadas y alertas son georreferenciadas y grabadas automáticamente para la seguridad de toda la comunidad del Barrio El Trigal.</p>
                </div>
              </div>
            ) : (
              <>
                {/* Siren Visualization */}
                <div className="flex items-center space-x-4 sm:space-x-6 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all shrink-0 ${seconds % 2 === 0 ? 'bg-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'bg-[#F87171] text-white shadow-[0_0_20px_rgba(248,113,113,0.5)]'}`}>
                    <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-semibold text-white">Transmisión de Sirena</span>
                      <span className="text-xs font-mono text-gray-400">{formatTime(seconds)} activo</span>
                    </div>
                    <div className="flex space-x-1 h-6 items-end">
                      {[...Array(24)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t transition-all duration-100 ${seconds % 2 === 0 ? 'bg-[#FFD700]' : 'bg-[#F87171]'}`}
                          style={{
                            height: `${Math.max(10, Math.sin(seconds + i * 0.5) * 100 + Math.random() * 20 + 40)}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alarma Activa info */}
                <div className="mt-4 sm:mt-6">
                  <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F87171] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F87171]"></span>
                    </span>
                    <span className="text-[#F87171] font-mono text-xs uppercase tracking-widest font-semibold">Alarma Vecinal Activa</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
                    {type === 'panic' && '🚨 Botón de Pánico Activado'}
                    {type === 'suspicious' && '🔍 Actividad Sospechosa Reportada'}
                    {type === 'medical' && '⚕️ Alerta de Emergencia Médica'}
                    {type === 'test' && '⚙️ Modo de Prueba de Alarma'}
                  </h2>
                  <p className="text-gray-400 text-xs sm:max-w-md">
                    La señal disuasiva de alta potencia ha sido propagada. Las familias vecinas y las patrullas policiales de Tarija están en alerta.
                  </p>
                </div>

                {/* Dispatch Logs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Bitácora de Despacho</h4>
                  <div className="bg-[#070912] rounded-xl p-4 border border-white/5 h-32 sm:h-44 overflow-y-auto font-mono text-xs space-y-2 text-gray-300 custom-scrollbar">
                    {dispatchLogs.map((log, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-[#FFD700] shrink-0">[{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    <div className="flex items-center space-x-1 text-gray-500 text-[10px] italic animate-pulse pt-1">
                      <RefreshCw className="w-3 h-3 animate-spin mr-1" /> Escuchando actualizaciones de radio...
                    </div>
                  </div>
                </div>

                {/* Volume and Mute Toggle */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">Audio disuasivo de tu altavoz:</span>
                  <button
                    onClick={handleToggleMute}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg border text-xs font-bold transition-all ${
                      isMuted
                        ? 'bg-[#F87171]/10 border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/20'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Siren Silenciada</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-[#FFD700] animate-pulse" />
                        <span>Siren Sonando</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

          </div>

          {/* Right pane: Keypad to Enter phone number.
              Sin overflow en mobile: fluye con el scroll único del modal. */}
          <div className="order-1 sm:order-none w-full sm:w-[420px] px-4 sm:px-8 pt-1 pb-3 flex flex-col justify-between bg-black/20 relative sm:overflow-y-auto">

            <div className="mb-1 sm:mb-2">
              {step === 'enter_activation_phone' ? (
                modoVoz ? (
                  <div>
                    <div className="flex items-center justify-between bg-[#FFD700]/10 border border-[#FFD700]/20 rounded px-2.5 py-1 mb-2">
                      <span className="text-[11px] text-[#FFD700] font-mono font-bold truncate">
                        📞 Celular: {celularParaVoz}
                      </span>
                      <button
                        onClick={() => {
                          setModoVoz(false);
                          setVozError(null);
                          setPinVoz('');
                          playTone(400, 80);
                        }}
                        className="text-[10px] text-gray-400 hover:text-white uppercase font-mono ml-2 underline cursor-pointer"
                      >
                        Volver a Alarma
                      </button>
                    </div>
                    <div className="w-[90%] mx-auto flex items-center justify-center text-gray-400 text-[11px] leading-normal px-0 text-center">
                      {tokenVozAutorizado ? (
                        <span className="text-[#22c55e] uppercase text-xs font-extrabold animate-pulse">
                          ¡CANAL DE VOZ AUTORIZADO (10 MIN)!
                        </span>
                      ) : isVerifyingVoz ? (
                        <span className="text-[#FFD700] uppercase text-xs font-extrabold animate-pulse">
                          VERIFICANDO PIN EN BASE DE DATOS...
                        </span>
                      ) : pinVoz.length >= 4 ? (
                        <span className="animate-typing text-white uppercase text-xs font-bold">
                          AHORA PRESIONE AUTORIZAR MENSAJE DE VOZ
                        </span>
                      ) : (
                        <span className="whitespace-nowrap uppercase text-[#FFD700] animate-pulse text-[11.5px] tracking-[0.05em]">
                          DIGITE SU PIN DE VOZ (4 DÍGITOS)
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="hidden sm:inline-block bg-[#FFD700]/10 border border-[#FFD700]/20 rounded px-2.5 py-0.5 mb-2">
                      <span className="text-[11px] text-[#FFD700] font-mono font-bold">Vecino Autorizado: 12345678</span>
                    </div>
                    <div className="w-[90%] mx-auto flex items-center justify-center text-gray-400 text-[11px] leading-normal px-0">
                      {activationSuccess ? (
                        <span className="text-[#22c55e] uppercase text-xs font-extrabold animate-pulse">¡NÚMERO AUTORIZADO EN PADRÓN!</span>
                      ) : enteredPin.length >= 8 ? (
                        <span className="animate-typing text-white uppercase text-xs font-bold">AHORA PRESIONE ACTIVAR ALARMA</span>
                      ) : enteredPin.length < 1 && !showMissingPinAlert ? (
                        <span className="whitespace-nowrap uppercase text-[#FFD700] animate-pulse text-[11.5px] tracking-[0.05em] max-[319px]:block max-[319px]:w-full max-[319px]:tracking-[0.02em] max-[319px]:[text-align-last:justify]">PRIMERO DIGITE SU NUMERO DE CELULAR</span>
                      ) : (
                        <span className="whitespace-nowrap uppercase text-white text-[11.5px] tracking-[0.05em]">PRIMERO DIGITE SU NUMERO DE CELULAR</span>
                      )}
                    </div>
                  </div>
                )
              ) : showKeypadForDeactivation ? (
                <div>
                  <div className="w-[90%] mx-auto flex items-center justify-center text-gray-400 text-[11px] leading-normal px-0">
                    {deactivationSuccess ? (
                      <span className="text-[#22c55e] uppercase text-xs font-extrabold animate-pulse">¡DESACTIVACIÓN CONFIRMADA!</span>
                    ) : enteredPin.length >= 8 ? (
                      <span className="animate-typing text-white uppercase text-xs font-bold">AHORA PRESIONE DESACTIVAR ALARMA</span>
                    ) : (
                      <span className="whitespace-nowrap uppercase text-[#FFD700] animate-pulse text-[11.5px] tracking-[0.05em]">DIGITE SU CELULAR PARA DESACTIVAR</span>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            {/* ====== Teclado premium: display de dígitos + rejilla ====== */}
            <div className="alarm-keypad-card relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 pt-3 px-3 pb-[0.9rem] sm:pt-4 sm:px-4 sm:pb-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)] w-[90%] mx-auto">
              {/* Translucent overlay with manual deactivate button when alarm is active */}
              {step === 'flashing' && !showKeypadForDeactivation && (
                <div className="absolute inset-0 z-10 rounded-2xl bg-black/5 backdrop-blur-[6px] flex flex-col items-center pt-7 gap-2">
                  <span className="-mt-[2px] text-xs sm:text-sm font-semibold text-[#FFD700]/90 text-center uppercase tracking-wider">ESTIMADO VECIN@</span>
                  <span className="text-xs sm:text-sm text-gray-300 text-center uppercase">La Alarma Vecinal se desactivara en:</span>
                  <div className="flex items-center justify-center bg-white/[0.06] backdrop-blur-md px-5 py-2 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(255,215,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#FF8C00] font-mono tracking-[0.08em] drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">{String(Math.floor(autoDeactivateCountdown / 60)).padStart(2, '0')}:{String(autoDeactivateCountdown % 60).padStart(2, '0')}</span>
                    <span className="text-sm sm:text-base font-semibold text-[#FFD700]/80 ml-2 uppercase tracking-wider">{autoDeactivateCountdown >= 60 ? 'minutos' : 'segundos'}</span>
                  </div>
                  <button
                    onClick={() => setShowKeypadForDeactivation(true)}
                    className="mt-6 bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg shadow-[#22c55e]/30 transition-all active:scale-95 cursor-pointer uppercase"
                  >
                    DESACTIVAR ALARMA MANUAL
                  </button>
                  <p className="text-xs sm:text-sm text-gray-300 text-center w-[250px] leading-relaxed mt-2">
                    Presione el boton verde para acceder al teclado e ingresar su celular nuevamente.
                  </p>
                </div>
              )}
              {/* Display de dígitos: alineado a la izquierda del teclado, cursor parpadeante */}
              <div className="alarm-keypad-display flex justify-start items-center mb-3 min-h-[2rem] max-w-[220px] mx-auto w-full px-1">
                <span className={`font-mono font-bold text-[22px] sm:text-2xl tracking-[0.2em] ${pinError || vozError ? 'text-red-400' : 'text-white'}`}>
                  {modoVoz ? pinVoz : enteredPin}
                </span>
                {(modoVoz ? pinVoz.length < 4 : enteredPin.length < 12) && (
                  <span className="font-mono font-bold text-[22px] sm:text-2xl text-[#FFD700] animate-pulse ml-0.5">|</span>
                )}
              </div>
              {pinError && !modoVoz && (
                <p className="text-center text-red-400 text-xs mb-2 font-medium animate-pulse">
                  Número no válido. Intente nuevamente.
                </p>
              )}
              {vozError && modoVoz && (
                <p className="text-center text-red-400 text-xs mb-2 font-medium animate-pulse">
                  {vozError}
                </p>
              )}

              {/* Rejilla numérica premium — botones compactos */}
              {/* touch-action:manipulation elimina el delay de 300ms del navegador en móvil */}
              <div className="alarm-keypad-grid grid grid-cols-3 gap-[0.9rem] sm:gap-2 max-w-[220px] mx-auto" style={{ touchAction: 'manipulation' }}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <button
                    key={num}
                    onPointerDown={(e) => { e.preventDefault(); handleKeyPress(num); }}
                    className="h-10 max-sm:tall:h-12 sm:h-10 rounded-xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-[#FFD700]/15 hover:to-[#FFD700]/5 active:from-[#FFD700]/25 active:to-[#FFD700]/10 border border-white/10 hover:border-[#FFD700]/40 text-white font-bold font-mono text-base tall:text-lg sm:text-sm transition-all active:scale-90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer select-none"
                  >
                    {num}
                  </button>
                ))}
                {/* Botón limpiar a la izquierda */}
                <button
                  onPointerDown={(e) => {
                    e.preventDefault();
                    if (modoVoz) {
                      if (!tokenVozAutorizado) setPinVoz('');
                    } else {
                      setEnteredPin('');
                    }
                    setTimeout(() => playTone(300, 100), 0);
                  }}
                  className="h-10 max-sm:tall:h-12 sm:h-10 rounded-xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-red-500/20 hover:to-red-500/5 active:from-red-500/30 active:to-red-500/10 border border-white/10 hover:border-red-500/30 text-gray-300 hover:text-red-400 transition-all active:scale-90 text-[10px] tall:text-[11px] sm:text-[11px] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer select-none"
                >
                  Limpiar
                </button>
                {/* Botón 0 en el centro */}
                <button
                  onPointerDown={(e) => { e.preventDefault(); handleKeyPress('0'); }}
                  className="h-10 max-sm:tall:h-12 sm:h-10 rounded-xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-[#FFD700]/15 hover:to-[#FFD700]/5 active:from-[#FFD700]/25 active:to-[#FFD700]/10 border border-white/10 hover:border-[#FFD700]/40 text-white font-bold font-mono text-base tall:text-lg sm:text-sm transition-all active:scale-90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer select-none"
                >
                  0
                </button>
                {/* Botón retroceder a la derecha */}
                <button
                  onPointerDown={(e) => { e.preventDefault(); handleBackspace(); }}
                  className="h-10 max-sm:tall:h-12 sm:h-10 rounded-xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-white/[0.16] hover:to-white/[0.06] active:from-white/[0.22] active:to-white/[0.08] border border-white/10 hover:border-white/25 text-gray-300 font-bold transition-all active:scale-90 text-base tall:text-lg sm:text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer select-none"
                >
                  ⌫
                </button>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN: MODO VOZ vs MODO ALARMA */}
            {modoVoz ? (
              <div className="w-[90%] mx-auto mt-3 space-y-2">
                {!tokenVozAutorizado ? (
                  <button
                    disabled={isVerifyingVoz || pinVoz.length < 4}
                    onClick={handleSolicitarTokenVoz}
                    className={`w-full py-2.5 tall:py-3 sm:py-2.5 px-2 rounded-xl font-bold font-sans text-sm tall:text-base sm:text-sm transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer relative ${
                      isVerifyingVoz
                        ? 'bg-yellow-500/20 text-[#FFD700] border-2 border-[#FFD700]/50 cursor-wait'
                        : pinVoz.length >= 4
                        ? 'bg-black/40 hover:bg-black/70 text-[#FFD700] font-extrabold border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:shadow-[0_0_45px_rgba(255,215,0,0.25)]'
                        : 'bg-gray-600/20 text-gray-500 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    {isVerifyingVoz ? (
                      <div className="flex w-full items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-[#FFD700] flex-shrink-0" />
                        <span className="whitespace-nowrap tracking-wide text-xs sm:text-sm font-extrabold text-[#FFD700]">
                          VALIDANDO PIN EN BASE DE DATOS...
                        </span>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-center gap-2">
                        <Mic className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                        <span className="whitespace-nowrap tracking-wide text-xs sm:text-sm font-extrabold text-[#FFD700]">
                          AUTORIZAR MENSAJE DE VOZ
                        </span>
                      </div>
                    )}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={handleToggleVoz}
                      className={`w-full py-2.5 tall:py-3 sm:py-2.5 px-2 rounded-xl font-bold font-sans text-sm tall:text-base sm:text-sm transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer gap-1.5 sm:gap-2 border-2 ${
                        vozTransmitiendo
                          ? 'bg-red-500 hover:bg-red-600 text-white border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.25)] ring-4 ring-red-500/30'
                          : 'bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/50 shadow-[0_0_30px_rgba(34,197,94,0.15)]'
                      }`}
                    >
                      {vozTransmitiendo ? (
                        <>
                          <MicOff className="w-4 h-4 flex-shrink-0 animate-pulse" />
                          <span className="whitespace-nowrap tracking-normal sm:tracking-wide text-center pr-1">DESACTIVAR MENSAJE DE VOZ</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap tracking-normal sm:tracking-wide text-center pr-1">MANDAR MENSAJE DE VOZ</span>
                        </>
                      )}
                    </button>
                    {vozTransmitiendo && (
                      <p className="text-center text-[#22c55e] text-[10px] uppercase tracking-wider animate-pulse">
                        Transmitiendo voz en tiempo real...
                      </p>
                    )}
                  </div>
                )}
                <button
                  onClick={() => {
                    setModoVoz(false);
                    setVozError(null);
                    setPinVoz('');
                    playTone(400, 80);
                  }}
                  className="w-full py-1.5 text-center text-xs text-gray-400 hover:text-white uppercase font-mono tracking-wider transition-colors cursor-pointer"
                >
                  ← Volver al teclado de alarma
                </button>
              </div>
            ) : (
              (step !== 'flashing' || showKeypadForDeactivation) ? (
                <>
                  <button
                    disabled={isVerifying || activationSuccess || deactivationSuccess}
                    onClick={() => {
                      if (isVerifying || activationSuccess || deactivationSuccess) return;
                      if (enteredPin.length < 8) {
                        setShowMissingPinAlert(true);
                        return;
                      }
                      handleVerifyPhone();
                    }}
                    className={`w-[90%] mx-auto mt-3 py-2.5 tall:py-3 sm:py-2.5 px-2 rounded-xl font-bold font-sans text-sm tall:text-base sm:text-sm transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer relative ${
                      activationSuccess || deactivationSuccess
                        ? 'bg-[#22c55e] text-white border-2 border-[#22c55e] shadow-[0_0_35px_rgba(34,197,94,0.4)] animate-pulse'
                        : isVerifying
                        ? 'bg-yellow-500/20 text-[#FFD700] border-2 border-[#FFD700]/50 cursor-wait'
                        : step === 'enter_activation_phone'
                        ? enteredPin.length >= 8
                          ? 'bg-black/40 hover:bg-black/70 text-[#FFD700] font-extrabold border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:shadow-[0_0_45px_rgba(255,215,0,0.25)]'
                          : 'bg-gray-600/20 text-gray-500 border border-white/5 cursor-not-allowed'
                        : enteredPin.length >= 8
                          ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 hover:shadow-red-500/30 font-extrabold ring-4 ring-red-500/30'
                          : 'bg-red-500/40 text-white/50 border border-red-500/30 cursor-not-allowed'
                    }`}
                  >
                    {activationSuccess ? (
                      <div className="flex w-full items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                        <span className="whitespace-nowrap tracking-normal sm:tracking-wide text-center text-xs sm:text-sm font-extrabold text-white uppercase">
                          ALARMA ACTIVADA CON ÉXITO
                        </span>
                      </div>
                    ) : deactivationSuccess ? (
                      <div className="flex w-full items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                        <span className="whitespace-nowrap tracking-normal sm:tracking-wide text-center text-xs sm:text-sm font-extrabold text-white uppercase">
                          ALARMA DESACTIVADA CON ÉXITO
                        </span>
                      </div>
                    ) : isVerifying ? (
                      <div className="flex w-full items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-[#FFD700] flex-shrink-0" />
                        <span className="whitespace-nowrap tracking-normal sm:tracking-wide text-center text-xs sm:text-sm font-extrabold text-[#FFD700]">
                          VERIFICANDO EN BASE DE DATOS...
                        </span>
                      </div>
                    ) : step === 'enter_activation_phone' ? (
                      showMissingPinAlert ? (
                        <div className="flex w-full items-center justify-center">
                          <span className="text-[#FFD700] text-xs font-extrabold animate-pulse text-center">PRIMERO DIGITE SU NUMERO DE CELULAR</span>
                        </div>
                      ) : (
                        <div className="flex w-full items-center justify-center gap-1.5 sm:gap-2">
                          <span className="text-base sm:text-lg flex-shrink-0">🚨</span>
                          <span className="whitespace-nowrap tracking-normal sm:tracking-wide text-center pr-1">ACTIVAR ALARMA VECINAL</span>
                        </div>
                      )
                    ) : (
                      <div className="flex w-full items-center justify-center gap-2">
                        <Check className="w-4 h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap text-center">DESACTIVAR ALARMA VECINAL 🔴</span>
                      </div>
                    )}
                  </button>

                  {/* Acceso a Mensaje de Voz para vecinos autorizados */}
                  {step === 'enter_activation_phone' && (
                    <button
                      onClick={() => {
                        if (enteredPin.length < 8) {
                          setShowMissingPinAlert(true);
                          playTone(300, 100);
                          return;
                        }
                        setCelularParaVoz(enteredPin);
                        setPinVoz('');
                        setVozError(null);
                        setModoVoz(true);
                        playTone(600, 100);
                      }}
                      className="w-[90%] mx-auto mt-2 py-2 px-2 rounded-xl font-bold font-sans text-xs transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer gap-2 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 shadow-sm"
                    >
                      <Mic className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="tracking-wide uppercase font-extrabold">Mandar Mensaje de Voz (Autorizados)</span>
                    </button>
                  )}
                </>
              ) : null
            )}

            {/* Pasos 1,2,3 — pegado al teclado y solo visible en modo de activación */}
            {step === 'enter_activation_phone' && (
              <div className="mt-3 bg-white/[0.02] border border-white/5 rounded-2xl p-3 space-y-2.5">
                <div className="hidden sm:flex items-center space-x-3 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] font-mono text-[10px] font-bold shrink-0">1</div>
                  <span>Ingrese su celular de 8 dígitos en el teclado táctico.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] font-mono text-[10px] font-bold shrink-0 hidden sm:flex">2</div>
                  <div className="w-5 h-5 rounded bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] font-mono text-[10px] font-bold shrink-0 sm:hidden">1</div>
                  <div className="flex flex-col xs:flex-row xs:items-center">
                    <span>Presione el botón inferior</span>
                    <strong className="text-[#FFD700] xs:ml-1">"ACTIVAR ALARMA"</strong><span>.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] font-mono text-[10px] font-bold shrink-0 hidden sm:flex">3</div>
                  <div className="w-5 h-5 rounded bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] font-mono text-[10px] font-bold shrink-0 sm:hidden">2</div>
                  <span>La sirena de alta potencia del barrio El Trigal sonará al instante.</span>
                </div>
              </div>
            )}


          {/* CUSTOM MODAL FOR UNREGISTERED NEIGHBOR */}
          {showUnregisteredModal && (
            <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4 overflow-y-auto overscroll-contain animate-fade-in">
              <div className="w-full max-w-sm max-h-[100dvh] overflow-y-auto custom-scrollbar bg-[#0e1324] border border-red-500/30 rounded-3xl p-5 text-center space-y-4 shadow-2xl relative my-auto">

                {/* Botón cerrar (X) superior derecho — mismo estilo que el modal del teclado */}
                <button
                  onClick={() => { playTone(400, 100); setShowUnregisteredModal(false); }}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors active:scale-90"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-500">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-sans">Número No Registrado</h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    El celular <span className="text-red-400 font-bold">{attemptedPhone}</span> no se encuentra registrado en el sistema.
                  </p>
                </div>

                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 text-[11px] text-gray-300 text-left leading-relaxed space-y-2">
                  <p>
                    Su número no se encuentra registrado, contáctese con este número para ser agregado a la base de datos de vecinos que pueden activar la alarma vecinal:
                  </p>
                  <p className="text-[#FFD700] font-bold text-[10px] uppercase tracking-wider">
                    Vecinos Autorizados del Barrio El Trigal:
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {COORDINATORS.map((coord) => (
                    <a
                      key={coord.phone}
                      href={`tel:${coord.phone}`}
                      onClick={() => playTone(600, 100)}
                      className="flex items-center justify-between p-2 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 border border-[#22c55e]/20 hover:border-[#22c55e]/30 rounded-xl text-[#22c55e] font-bold text-xs transition-all"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                        <span className="font-sans text-[10px] text-gray-300">{coord.name}</span>
                      </div>
                      <span className="font-mono text-xs">{coord.phone}</span>
                    </a>
                  ))}
                </div>

                <p className="text-[9px] text-gray-500 leading-normal">
                  Estos números son los que pueden agregar a los nuevos usuarios o vecinos al sistema de la alarma vecinal. Contáctese para ser agregado al sistema de Alarma Vecinal.
                </p>

                <button
                  onClick={() => setShowUnregisteredModal(false)}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold py-2 rounded-xl text-xs transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  </div>
  );
}
