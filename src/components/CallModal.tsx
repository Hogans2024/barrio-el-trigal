import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, User, Shield, Flame, Heart, X, Volume2 } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data.alarma';
import { EmergencyContact } from '../types.alarma';
import { playTone } from './AudioSiren';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Central de llamadas / marcador VoIP simulado a contactos de emergencia.
 *
 * Responsive (sección 5.1):
 *  - sin prefijo / `tall:` (mobile): hoja completa `fixed inset-0` con scroll.
 *  - `sm:` (≥ 640px): modal centrado estilo origen (w-[520px]).
 */
export default function CallModal({ isOpen, onClose }: CallModalProps) {
  const [activeCall, setActiveCall] = useState<EmergencyContact | null>(null);
  const [callStatus, setCallStatus] = useState<'connecting' | 'ringing' | 'active'>('connecting');
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setActiveCall(null);
      setDuration(0);
    }
  }, [isOpen]);

  // Duration ticking during active call
  useEffect(() => {
    if (!activeCall || callStatus !== 'active') return;

    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCall, callStatus]);

  // Call connection sequencing
  useEffect(() => {
    if (!activeCall) return;

    setCallStatus('connecting');
    setDuration(0);

    // Play telephone dialing tone
    playTone(350, 150);
    setTimeout(() => playTone(440, 150), 160);

    // Sequence to Ringing after 1.5s
    const ringTimeout = setTimeout(() => {
      setCallStatus('ringing');
      playTone(440, 600); // Phone ringtone tone

      // Sequence to Active Call after 3.5s
      const activeTimeout = setTimeout(() => {
        setCallStatus('active');
        playTone(660, 200); // Connection alert tone
      }, 2500);

      return () => clearTimeout(activeTimeout);
    }, 1500);

    return () => {
      clearTimeout(ringTimeout);
    };
  }, [activeCall]);

  if (!isOpen) return null;

  const handleStartCall = (contact: EmergencyContact) => {
    setActiveCall(contact);
  };

  const handleHangUp = () => {
    playTone(220, 200); // Hang up alert
    setActiveCall(null);
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'policia':
        return <Shield className="w-5 h-5 text-amber-400" />;
      case 'serenazgo':
        return <Shield className="w-5 h-5 text-[#FFD700]" />;
      case 'bomberos':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'salud':
        return <Heart className="w-5 h-5 text-emerald-400" />;
      default:
        return <User className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md font-sans pt-14 pb-14 md:pt-4 md:pb-4 px-4">
      <div className="relative w-full sm:w-[520px] max-h-full overflow-y-auto bg-[#0c101d] rounded-2xl border border-white/10 shadow-2xl custom-scrollbar">

        {/* Header (Only if not actively calling) */}
        {!activeCall ? (
          <>
            <div className="sticky top-0 z-10 p-6 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Central de Llamadas</h3>
                  <p className="text-xs text-gray-400">Marque directamente a las centrales de respuesta</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of Emergency Contacts */}
            <div className="p-6 space-y-3">
              {EMERGENCY_CONTACTS.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 shrink-0">
                      {getIcon(contact.category)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-white truncate">{contact.name}</h4>
                      <p className="text-xs text-gray-400 font-mono truncate">Número directo: {contact.number}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartCall(contact)}
                    className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all active:scale-95 shrink-0"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Active Call State */
          <div className="p-6 sm:p-8 flex flex-col items-center justify-between min-h-[100dvh] sm:min-h-[450px] sm:h-[450px] bg-gradient-to-b from-[#0a0d14] to-[#121829]">
            <div className="w-full flex justify-end">
              <span className="px-3 py-1 rounded bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] font-mono text-[#FFD700] uppercase tracking-wider">
                Simulador VoIP
              </span>
            </div>

            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto animate-pulse">
                  <Phone className="w-10 h-10 text-emerald-400 animate-bounce" />
                </div>
                {callStatus === 'active' && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 animate-pulse">
                    <Volume2 className="w-3 h-3" />
                    <span>Conectado</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{activeCall.name}</h3>
                <p className="text-sm text-[#FFD700] font-mono mt-1">{activeCall.number}</p>
              </div>

              <div className="h-10 flex items-center justify-center">
                {callStatus === 'connecting' && (
                  <p className="text-xs text-gray-400 animate-pulse font-mono flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-ping" />
                    Estableciendo conexión digital segura...
                  </p>
                )}
                {callStatus === 'ringing' && (
                  <p className="text-xs text-amber-400 animate-pulse font-mono flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-2 animate-ping" />
                    Timbrando (Línea de Respuesta Vecinal)...
                  </p>
                )}
                {callStatus === 'active' && (
                  <div className="text-center space-y-1">
                    <p className="text-xs text-emerald-400 font-mono font-medium flex items-center justify-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
                      Llamada activa • Transmisión encriptada
                    </p>
                    <p className="text-xl font-bold font-mono text-white tracking-wider">
                      {formatDuration(duration)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Calling Audio Wave (if active) */}
            {callStatus === 'active' && (
              <div className="flex space-x-1.5 h-12 items-center">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded bg-emerald-500 animate-pulse"
                    style={{
                      height: `${Math.max(15, Math.random() * 100)}%`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Hang up button */}
            <button
              onClick={handleHangUp}
              className="px-8 py-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold flex items-center space-x-3 transition-all transform hover:scale-105 shadow-lg shadow-red-500/20 active:scale-95"
            >
              <PhoneOff className="w-5 h-5" />
              <span className="text-sm">Finalizar Llamada</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
