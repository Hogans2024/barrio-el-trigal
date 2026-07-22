import React, { useState, useEffect } from 'react';
import { ShieldAlert, Volume2, VolumeX, Check, RefreshCw, X, Shield, Phone, Smartphone } from 'lucide-react';
import { stopSiren, startSiren, playTone } from './AudioSiren';
import { AlarmLog } from '../types.alarma';

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
export default function ActiveAlarmModal({ isOpen, onClose, type }: ActiveAlarmModalProps) {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [step, setStep] = useState<'enter_activation_phone' | 'flashing'>('enter_activation_phone');
  const [activatedByPhone, setActivatedByPhone] = useState('12345678');
  const [showUnregisteredModal, setShowUnregisteredModal] = useState(false);
  const [attemptedPhone, setAttemptedPhone] = useState('');

  const [dispatchLogs, setDispatchLogs] = useState<string[]>([]);

  // Setup modal state on open
  useEffect(() => {
    if (isOpen) {
      setSeconds(0);
      setEnteredPin('');
      setPinError(false);
      setStep('enter_activation_phone');
      setIsMuted(false);
      setShowUnregisteredModal(false);
      setDispatchLogs([
        'Iniciando secuencia de validación de identidad...',
        'Esperando ingreso de número de celular de 8 dígitos para activación...',
      ]);
    }
    return () => {
      stopSiren();
    };
  }, [isOpen]);

  // Handle siren activation upon transitioning to flashing mode
  useEffect(() => {
    if (isOpen && step === 'flashing') {
      if (!isMuted) {
        startSiren();
      }
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

  if (!isOpen) return null;

  // Format time (MM:SS)
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (num: string) => {
    playTone(1500, 35, 'square'); // Tech beep
    // Sin límite de dígitos: el backend (Apps Script) valida el número real.
    if (enteredPin.length < 15) {
      setEnteredPin((prev) => prev + num);
      setPinError(false);
    }
  };

  const handleBackspace = () => {
    playTone(392, 80);
    setEnteredPin((prev) => prev.slice(0, -1));
    setPinError(false);
  };

  const handleVerifyPhone = () => {
    // Permite activar con el celular por defecto '12345678' o cualquier celular de los coordinadores
    const isAuthorized = enteredPin === '12345678' || COORDINATORS.some(c => c.phone === enteredPin);
    if (isAuthorized) {
      playTone(880, 250);
      if (step === 'enter_activation_phone') {
        setActivatedByPhone(enteredPin);
        setEnteredPin('');
        setStep('flashing');
      } else {
        stopSiren();
        const durationStr = formatTime(seconds);
        onClose({
          id: `log-${Date.now()}`,
          timestamp: 'Hoy, ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          type: type,
          user: `Celular Autorizado (${activatedByPhone})`,
          status: 'resolved',
          resolvedBy: `Vecino (${enteredPin})`,
          resolutionTime: durationStr,
        });
      }
    } else {
      // Unregistered cell phone number
      playTone(220, 400); // Error buzz
      setAttemptedPhone(enteredPin);
      setShowUnregisteredModal(true);
      setEnteredPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-stretch justify-center bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain font-sans pt-14 pb-14 md:pt-4 md:pb-4">

      {/* Flashing Warning Visuals (only if alarm is flashing) */}
      {step === 'flashing' && (
        <div className={`fixed inset-0 opacity-15 pointer-events-none transition-colors duration-300 ${seconds % 2 === 0 ? 'bg-[#FFD700]' : 'bg-[#F87171]'}`} />
      )}

      {/* Contenedor: en mobile hoja completa con scroll; en sm: panel fijo 1000×620 */}
      <div className="relative w-full max-h-[100dvh] sm:max-h-[620px] sm:w-[1000px] bg-[#0c101d] rounded-none sm:rounded-[32px] border-y sm:border border-white/10 overflow-y-auto sm:overflow-hidden custom-scrollbar shadow-[0_0_80px_rgba(248,113,113,0.15)] flex flex-col sm:h-[620px] -mt-2 sm:mt-0">

        {/* HEADER SUPERIOR UNIFICADO Y ULTRA-PROFESIONAL */}
        <div className="sticky top-0 z-50 w-full flex items-center justify-between px-5 py-1.5 bg-[#0a0d18]/95 backdrop-blur-md border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              step === 'enter_activation_phone'
                ? 'bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 text-[#FFD700] border border-[#FFD700]/30 shadow-[#FFD700]/5'
                : 'bg-gradient-to-br from-red-500/20 to-red-500/5 text-red-400 border border-red-500/30 shadow-red-500/5'
            }`}>
              <ShieldAlert className={`w-5 h-5 ${step === 'flashing' ? 'animate-pulse text-red-400' : 'text-[#FFD700]'}`} />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center space-x-2">
                <h3 className={`text-sm sm:text-base font-extrabold tracking-wide uppercase font-sans transition-all duration-300 ${
                  step === 'enter_activation_phone' ? 'text-white' : 'text-red-400 animate-pulse'
                }`}>
                  {step === 'enter_activation_phone' ? 'Activar Alarma' : 'Desactivar Alarma'}
                </h3>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                  step === 'enter_activation_phone' ? 'bg-[#FFD700] animate-pulse' : 'bg-red-500 animate-ping'
                }`} />
              </div>
              <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-0.5">ID TERM: #0912</span>
            </div>
          </div>

          <button
            onClick={() => {
              playTone(400, 100);
              onClose({
                id: `log-${Date.now()}`,
                timestamp: 'Hoy, ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                type: type,
                user: 'Vecino',
                status: 'resolved',
                resolvedBy: 'Cancelado',
                resolutionTime: '00:00',
              });
            }}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors active:scale-90"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
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
                <div>
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

                {/* Siren Visualization */}
                <div className="my-4 sm:my-6 flex items-center space-x-4 sm:space-x-6 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
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
                <div>
                  <div className="hidden sm:inline-block bg-[#FFD700]/10 border border-[#FFD700]/20 rounded px-2.5 py-0.5 mb-2">
                    <span className="text-[11px] text-[#FFD700] font-mono font-bold">Vecino Autorizado: 12345678</span>
                  </div>
                  <div className="w-full flex items-center justify-center text-gray-400 text-[11px] sm:text-xs leading-normal px-0">
                    <span className="whitespace-nowrap uppercase">INGRESE SU NUMERO DE CELULAR - ACTIVAR ALARMA</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-red-200 bg-red-500/10 border border-red-500/30 p-2 sm:p-3 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.1)] font-medium animate-pulse">
                  Vecino, si desea desactivar la alarma vecinal, coloque de nuevo los dígitos de su celular y presione el botón rojo inferior.
                </div>
              )}
            </div>

            {/* ====== Teclado premium: display de dígitos + rejilla ====== */}
            <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 p-3 sm:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] w-4/5 mx-auto">
              {/* Display de dígitos: alineado a la izquierda del teclado, cursor parpadeante */}
              <div className="flex justify-start items-center mb-3 min-h-[2rem] max-w-[220px] mx-auto w-full px-1">
                <span className={`font-mono font-bold text-[22px] sm:text-2xl tracking-[0.2em] ${pinError ? 'text-red-400' : 'text-white'}`}>
                  {enteredPin}
                </span>
                {enteredPin.length < 12 && (
                  <span className="font-mono font-bold text-[22px] sm:text-2xl text-[#FFD700] animate-pulse ml-0.5">|</span>
                )}
              </div>
              {pinError && (
                <p className="text-center text-red-400 text-xs mb-2 font-medium animate-pulse">
                  Número no válido. Intente nuevamente.
                </p>
              )}

              {/* Rejilla numérica premium — botones compactos */}
              <div className="grid grid-cols-3 gap-[0.9rem] sm:gap-2 max-w-[220px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeyPress(num)}
                    className="h-9 tall:h-11 sm:h-10 rounded-xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-[#FFD700]/15 hover:to-[#FFD700]/5 active:from-[#FFD700]/25 active:to-[#FFD700]/10 border border-white/10 hover:border-[#FFD700]/40 text-white font-bold font-mono text-base tall:text-lg sm:text-sm transition-all active:scale-90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
                {/* Botón limpiar a la izquierda */}
                <button
                  onClick={() => {
                    playTone(300, 100);
                    setEnteredPin('');
                  }}
                  className="h-9 tall:h-11 sm:h-10 rounded-xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-red-500/20 hover:to-red-500/5 active:from-red-500/30 active:to-red-500/10 border border-white/10 hover:border-red-500/30 text-gray-300 hover:text-red-400 transition-all active:scale-90 text-[10px] tall:text-[11px] sm:text-[11px] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer"
                >
                  Limpiar
                </button>
                {/* Botón 0 en el centro */}
                <button
                  key="0"
                  onClick={() => handleKeyPress('0')}
                  className="h-9 tall:h-11 sm:h-10 rounded-xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-[#FFD700]/15 hover:to-[#FFD700]/5 active:from-[#FFD700]/25 active:to-[#FFD700]/10 border border-white/10 hover:border-[#FFD700]/40 text-white font-bold font-mono text-base tall:text-lg sm:text-sm transition-all active:scale-90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer"
                >
                  0
                </button>
                {/* Botón retroceder a la derecha */}
                <button
                  onClick={handleBackspace}
                  className="h-9 tall:h-11 sm:h-10 rounded-xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-white/[0.16] hover:to-white/[0.06] active:from-white/[0.22] active:to-white/[0.08] border border-white/10 hover:border-white/25 text-gray-300 font-bold transition-all active:scale-90 text-base tall:text-lg sm:text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer"
                >
                  ⌫
                </button>
              </div>
            </div>

            {/* Main Action Button */}
            <button
              onClick={handleVerifyPhone}
              disabled={enteredPin.length < 1}
              className={`max-w-[280px] mx-auto w-full mt-3 py-2.5 tall:py-3 sm:py-2.5 rounded-xl font-bold font-sans text-sm tall:text-base sm:text-sm transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
                step === 'enter_activation_phone'
                  ? enteredPin.length >= 1
                    ? 'bg-[#FFD700] hover:bg-[#ffe16d] text-black shadow-[0_0_25px_rgba(255,215,0,0.5)] font-extrabold ring-4 ring-[#FFD700]/30'
                    : 'bg-gray-600/20 text-gray-500 border border-white/5 cursor-not-allowed'
                  : enteredPin.length >= 1
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 hover:shadow-red-500/30 font-extrabold ring-4 ring-red-500/30'
                    : 'bg-red-500/40 text-white/50 border border-red-500/30 cursor-not-allowed'
              }`}
            >
              {step === 'enter_activation_phone' ? (
                <span className="whitespace-nowrap">🚨 ACTIVAR ALARMA <span key={enteredPin.length} className="animate-counter-pop">{enteredPin.length || '00'}</span> DIGITOS</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>DESACTIVAR ALARMA VECINAL 🔴</span>
                </>
              )}
            </button>

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
