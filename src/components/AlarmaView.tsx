import React, { useState, useEffect, useRef } from 'react';
import { Siren, PhoneCall, CheckCircle2, Search, Calendar, PlusCircle, Heart, Store, Volume2, VolumeX } from 'lucide-react';

interface AlarmaViewProps {
  onNavigate: (tab: string) => void;
  onShowNotification: (title: string, message: string) => void;
}

export default function AlarmaView({ onNavigate, onShowNotification }: AlarmaViewProps) {
  const [alarmActive, setAlarmActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Sound generator for sirens
  const playSiren = () => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);

      // Create ambulance/siren frequency sweep
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(400, now);
      // Linear ramp up and down repetitively
      let t = 0;
      const interval = setInterval(() => {
        if (!oscillatorRef.current) {
          clearInterval(interval);
          return;
        }
        const freq = t % 2 === 0 ? 800 : 500;
        osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.4);
        t++;
      }, 500);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn('Audio is not supported or was blocked by browser policy', e);
    }
  };

  const stopSiren = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
  };

  const handleActivateAlarm = () => {
    if (alarmActive) {
      stopSiren();
      setAlarmActive(false);
      onShowNotification('Sistema', 'Alarma vecinal desactivada exitosamente.');
    } else {
      setAlarmActive(true);
      setCountdown(15);
      playSiren();
      onShowNotification(
        '🚨 ALERTA GENERAL',
        '¡La alarma vecinal del Barrio El Trigal ha sido ACTIVADA! Se envió la alerta a todos los vecinos y autoridades.'
      );
    }
  };

  useEffect(() => {
    let timer: any;
    if (alarmActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (alarmActive && countdown === 0) {
      // Keep active but reset/silence after 15s to be polite
      stopSiren();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [alarmActive, countdown]);

  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {/* Dynamic Slogan and Greeting Banner */}
      <div className="text-left mt-2">
        <h1 className="text-white text-2xl font-bold tracking-tight">Construyamos juntos</h1>
        <h2 className="text-brand-yellow text-2xl font-bold tracking-tight">un mejor barrio.</h2>
        <p className="text-gray-400 text-xs mt-1 font-mono">Barrio El Trigal • Tarija, Bolivia</p>
      </div>

      {/* Search Input Custom Design */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar servicios, eventos, tiendas..."
          className="w-full bg-[#1c1b1b] text-white pl-10 pr-4 py-3 rounded-lg border border-gray-800 text-sm focus:outline-none focus:border-brand-yellow transition"
        />
      </div>

      {/* Quick Navigation Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('eventos')}
          className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 hover:border-brand-yellow hover:scale-[1.02] flex flex-col items-center justify-center text-center transition group cursor-pointer"
        >
          <div className="bg-brand-green/10 text-brand-green p-3 rounded-full mb-2 group-hover:bg-brand-green/20 group-hover:scale-110 transition">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="text-white text-xs font-semibold mb-1">Eventos Barrio</span>
          <span className="text-gray-500 text-[10px] line-clamp-1">Actividades y reuniones</span>
        </button>

        <button
          onClick={() => onNavigate('farmacias')}
          className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 hover:border-brand-yellow hover:scale-[1.02] flex flex-col items-center justify-center text-center transition group cursor-pointer"
        >
          <div className="bg-brand-yellow/10 text-brand-yellow p-3 rounded-full mb-2 group-hover:bg-brand-yellow/20 group-hover:scale-110 transition">
            <PlusCircle className="h-5 w-5" />
          </div>
          <span className="text-white text-xs font-semibold mb-1">Farmacias de Turno</span>
          <span className="text-gray-500 text-[10px] line-clamp-1">Farmacias abiertas hoy</span>
        </button>

        <button
          onClick={() => onNavigate('mascotas')}
          className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 hover:border-brand-yellow hover:scale-[1.02] flex flex-col items-center justify-center text-center transition group cursor-pointer"
        >
          <div className="bg-rose-500/10 text-rose-400 p-3 rounded-full mb-2 group-hover:bg-rose-500/20 group-hover:scale-110 transition">
            <Heart className="h-5 w-5" />
          </div>
          <span className="text-white text-xs font-semibold mb-1">Animales Perdidos</span>
          <span className="text-gray-500 text-[10px] line-clamp-1">Encuentra a tu mascota</span>
        </button>

        <button
          onClick={() => onNavigate('negocios')}
          className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 hover:border-brand-yellow hover:scale-[1.02] flex flex-col items-center justify-center text-center transition group cursor-pointer"
        >
          <div className="bg-brand-green/10 text-brand-green p-3 rounded-full mb-2 group-hover:bg-brand-green/20 group-hover:scale-110 transition">
            <Store className="h-5 w-5" />
          </div>
          <span className="text-white text-xs font-semibold mb-1">Negocios y Emprendedores</span>
          <span className="text-gray-500 text-[10px] line-clamp-1">Guía comercial local</span>
        </button>
      </div>

      {/* Main Interactive Alarm Circular Button Panel */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 flex flex-col items-center text-center relative overflow-hidden">
        {alarmActive && (
          <div className="absolute inset-0 bg-brand-yellow/5 animate-pulse pointer-events-none" />
        )}

        {/* Audio Toggle */}
        <button
          onClick={() => {
            const next = !audioEnabled;
            setAudioEnabled(next);
            if (!next) stopSiren();
            else if (alarmActive) playSiren();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition p-1.5 focus:outline-none"
          title={audioEnabled ? "Silenciar" : "Activar Sonido"}
        >
          {audioEnabled ? <Volume2 className="h-4 w-4 text-brand-yellow" /> : <VolumeX className="h-4 w-4" />}
        </button>

        {/* Outer pulsing ring for active alarm */}
        <div className="relative flex justify-center items-center my-6">
          <div
            onClick={handleActivateAlarm}
            className={`cursor-pointer w-48 h-48 rounded-full flex flex-col justify-center items-center p-4 text-center select-none transition-all duration-300 relative z-10 ${
              alarmActive
                ? 'bg-brand-red text-white shadow-lg shadow-red-500/40 scale-105 border-4 border-orange-400'
                : 'bg-brand-yellow text-gray-950 shadow-lg shadow-yellow-500/20 hover:scale-[1.03] border-4 border-yellow-200'
            }`}
          >
            <Siren className={`h-12 w-12 mb-2 ${alarmActive ? 'animate-bounce' : ''}`} />
            <span className="font-extrabold text-sm tracking-wider uppercase leading-tight">
              {alarmActive ? 'APAGAR ALARMA' : 'ACTIVAR ALARMA'}
            </span>
            <span className="font-bold text-lg uppercase tracking-tight mt-1">
              VECINAL
            </span>
            {alarmActive && countdown > 0 && (
              <span className="text-xl font-mono mt-1 animate-pulse bg-black/30 px-3 py-0.5 rounded-full text-white">
                {countdown}s
              </span>
            )}
          </div>

          {/* Dynamic ripple rings */}
          <div
            className={`absolute rounded-full w-56 h-56 border-2 transition-all duration-1000 ${
              alarmActive ? 'border-brand-red animate-ping opacity-75' : 'border-brand-yellow/20'
            }`}
          />
          <div
            className={`absolute rounded-full w-64 h-64 border transition-all duration-1000 ${
              alarmActive ? 'border-brand-red animate-pulse opacity-40' : 'border-transparent'
            }`}
          />
        </div>

        {/* Emergency Call Options */}
        <div className="w-full space-y-3 mt-2">
          <a
            href="tel:110"
            className="w-full bg-[#2ECC71] text-gray-950 hover:bg-[#27ae60] py-3.5 px-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition text-sm cursor-pointer shadow-md shadow-emerald-500/15"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Llamar para activar Alarma Vecinal (110)</span>
          </a>

          {/* Compliance Info box */}
          <div className="bg-black/30 border border-gray-800 rounded-xl p-3 flex items-start space-x-2.5 text-left">
            <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-400 leading-normal">
              La alarma se enviará a todos los vecinos registrados, la directiva del barrio El Trigal y emitirá una alerta visual instantánea en la central de seguridad coordinada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
