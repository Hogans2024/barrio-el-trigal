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
    /*
      BREAKPOINTS:
      - sin prefijo (default): pantallas MUY pequeñas de alto < 700px CSS
      - tall: (min-height: 700px): celulares grandes normales modernos (el layout 2x2 clásico)
      - sm: (min-width: 640px): tablets / desktop (sidebar layout)
    */
    <div className="flex flex-col space-y-2.5 tall:space-y-4 sm:space-y-6">

      {/* Eslogan */}
      <div className="text-left -mt-3 tall:mt-0">
        <h1 className="text-white text-lg tall:text-xl sm:text-2xl font-bold tracking-tight">Construyamos juntos</h1>
        <h2 className="text-brand-yellow text-lg tall:text-xl sm:text-2xl font-bold tracking-tight">un mejor barrio.</h2>
        <p className="hidden tall:block text-gray-400 text-[9px] tall:text-[10px] sm:text-xs mt-0.5 font-mono">Barrio El Trigal • Tarija, Bolivia</p>
      </div>

      {/* Buscador */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-3.5 w-3.5 text-gray-500" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar servicios, eventos, tiendas..."
          className="w-full bg-[#1c1b1b] text-white pl-9 pr-4 py-2 tall:py-2.5 sm:py-3 rounded-lg border border-gray-800 text-[12px] tall:text-[13px] sm:text-sm focus:outline-none focus:border-brand-yellow transition"
        />
      </div>

      {/*
        Tarjetas de navegación:
        - Pantallas pequeñas (short, <700px alto): 4 columnas en 1 FILA, icono pequeño, sin descripción
        - Celulares grandes (tall: ≥700px alto): 2x2 columnas, con descripción
      */}
      <div className="grid grid-cols-4 tall:grid-cols-2 gap-1.5 tall:gap-2 sm:gap-3">
        <button
          onClick={() => onNavigate('eventos')}
          className="bg-[#1a1a1a] p-2 tall:p-3 sm:p-4 rounded-xl border border-gray-800 hover:border-brand-yellow hover:scale-[1.02] flex flex-col items-center justify-start tall:justify-center text-center transition group cursor-pointer"
        >
          <div className="bg-brand-green/10 text-brand-green p-1.5 tall:p-2 sm:p-3 rounded-full mb-1 tall:mb-1.5 sm:mb-2 group-hover:bg-brand-green/20 group-hover:scale-110 transition shrink-0">
            <Calendar className="h-3.5 w-3.5 tall:h-4 tall:w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-white text-[8px] tall:text-[11px] sm:text-xs font-semibold leading-tight tall:mb-0.5 sm:mb-1">Eventos</span>
          <span className="hidden tall:block text-gray-500 text-[9px] tall:text-[10px] line-clamp-1">Actividades y reuniones</span>
        </button>

        <button
          onClick={() => onNavigate('farmacias')}
          className="bg-[#1a1a1a] p-2 tall:p-3 sm:p-4 rounded-xl border border-gray-800 hover:border-brand-yellow hover:scale-[1.02] flex flex-col items-center justify-start tall:justify-center text-center transition group cursor-pointer"
        >
          <div className="bg-brand-yellow/10 text-brand-yellow p-1.5 tall:p-2 sm:p-3 rounded-full mb-1 tall:mb-1.5 sm:mb-2 group-hover:bg-brand-yellow/20 group-hover:scale-110 transition shrink-0">
            <PlusCircle className="h-3.5 w-3.5 tall:h-4 tall:w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-white text-[8px] tall:text-[11px] sm:text-xs font-semibold leading-tight tall:mb-0.5 sm:mb-1">Farmacias</span>
          <span className="hidden tall:block text-gray-500 text-[9px] tall:text-[10px] line-clamp-1">Farmacias abiertas hoy</span>
        </button>

        <button
          onClick={() => onNavigate('mascotas')}
          className="bg-[#1a1a1a] p-2 tall:p-3 sm:p-4 rounded-xl border border-gray-800 hover:border-brand-yellow hover:scale-[1.02] flex flex-col items-center justify-start tall:justify-center text-center transition group cursor-pointer"
        >
          <div className="bg-rose-500/10 text-rose-400 p-1.5 tall:p-2 sm:p-3 rounded-full mb-1 tall:mb-1.5 sm:mb-2 group-hover:bg-rose-500/20 group-hover:scale-110 transition shrink-0">
            <Heart className="h-3.5 w-3.5 tall:h-4 tall:w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-white text-[8px] tall:text-[11px] sm:text-xs font-semibold leading-tight tall:mb-0.5 sm:mb-1">Mascotas</span>
          <span className="hidden tall:block text-gray-500 text-[9px] tall:text-[10px] line-clamp-1">Encuentra tu mascota</span>
        </button>

        <button
          onClick={() => onNavigate('negocios')}
          className="bg-[#1a1a1a] p-2 tall:p-3 sm:p-4 rounded-xl border border-gray-800 hover:border-brand-yellow hover:scale-[1.02] flex flex-col items-center justify-start tall:justify-center text-center transition group cursor-pointer"
        >
          <div className="bg-brand-green/10 text-brand-green p-1.5 tall:p-2 sm:p-3 rounded-full mb-1 tall:mb-1.5 sm:mb-2 group-hover:bg-brand-green/20 group-hover:scale-110 transition shrink-0">
            <Store className="h-3.5 w-3.5 tall:h-4 tall:w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-white text-[8px] tall:text-[11px] sm:text-xs font-semibold leading-tight tall:mb-0.5 sm:mb-1">Negocios</span>
          <span className="hidden tall:block text-gray-500 text-[9px] tall:text-[10px] line-clamp-1">Guía comercial local</span>
        </button>
      </div>

      {/*
        Panel de Alarma:
        - Pantallas pequeñas (<700px alto): contenedor compacto p-3, círculo reducido w-36 h-36
        - Celulares grandes (tall: ≥700px alto): círculo original w-48 h-48
        - Desktop (sm:): igual que celular grande pero con más padding
      */}
      <div className="bg-[#1a1a1a] rounded-2xl p-3 tall:p-4 sm:p-6 border border-gray-800 flex flex-col items-center text-center relative overflow-hidden">
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
          className="absolute top-2.5 right-2.5 tall:top-3 tall:right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-white transition p-1.5 focus:outline-none z-20"
          title={audioEnabled ? "Silenciar" : "Activar Sonido"}
        >
          {audioEnabled ? <Volume2 className="h-4 w-4 text-brand-yellow" /> : <VolumeX className="h-4 w-4" />}
        </button>

        {/* Círculo de alarma con anillos */}
        <div className="relative flex justify-center items-center my-2 tall:my-4 sm:my-6">
          <div
            onClick={handleActivateAlarm}
            className={`cursor-pointer w-36 h-36 tall:w-48 tall:h-48 rounded-full flex flex-col justify-center items-center p-3 tall:p-4 text-center select-none transition-all duration-300 relative z-10 ${
              alarmActive
                ? 'bg-brand-red text-white shadow-lg shadow-red-500/40 scale-105 border-4 border-orange-400'
                : 'bg-brand-yellow text-gray-950 shadow-lg shadow-yellow-500/20 hover:scale-[1.03] border-4 border-yellow-200'
            }`}
          >
            <Siren className={`h-8 w-8 tall:h-12 tall:w-12 mb-1 ${alarmActive ? 'animate-bounce' : ''}`} />
            <span className="font-extrabold text-[10px] tall:text-sm tracking-wider uppercase leading-tight">
              {alarmActive ? 'APAGAR ALARMA' : 'ACTIVAR ALARMA'}
            </span>
            <span className="font-bold text-sm tall:text-lg uppercase tracking-tight mt-0.5">
              VECINAL
            </span>
            {alarmActive && countdown > 0 && (
              <span className="text-base tall:text-xl font-mono mt-1 animate-pulse bg-black/30 px-2 tall:px-3 py-0.5 rounded-full text-white">
                {countdown}s
              </span>
            )}
          </div>

          {/* Anillos de pulso */}
          <div
            className={`absolute rounded-full w-44 h-44 tall:w-56 tall:h-56 border-2 transition-all duration-1000 ${
              alarmActive ? 'border-brand-red animate-ping opacity-75' : 'border-brand-yellow/20'
            }`}
          />
          <div
            className={`absolute rounded-full w-52 h-52 tall:w-64 tall:h-64 border transition-all duration-1000 ${
              alarmActive ? 'border-brand-red animate-pulse opacity-40' : 'border-transparent'
            }`}
          />
        </div>

        {/* Botón de llamada y aviso legal */}
        <div className="w-full space-y-1.5 tall:space-y-2 sm:space-y-3 mt-0.5 tall:mt-1 sm:mt-2">
          <a
            href="tel:110"
            className="w-full bg-[#2ECC71] text-gray-950 hover:bg-[#27ae60] py-2 tall:py-2.5 sm:py-3.5 px-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition text-[11px] tall:text-xs sm:text-sm cursor-pointer shadow-md shadow-emerald-500/15"
          >
            <PhoneCall className="h-3.5 w-3.5 tall:h-4 tall:w-4" />
            <span>Llamar a Emergencias (110)</span>
          </a>

          <div className="bg-black/30 border border-gray-800 rounded-xl p-2 tall:p-2.5 sm:p-3 flex items-start space-x-2 text-left">
            <CheckCircle2 className="h-3.5 w-3.5 tall:h-4 tall:w-4 sm:h-5 sm:w-5 text-brand-green shrink-0 mt-0.5" />
            <p className="text-[9px] tall:text-[10px] sm:text-[11px] text-gray-400 leading-tight sm:leading-normal">
              La alarma se enviará a todos los vecinos registrados y emitirá una alerta visual instantánea en la central de seguridad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
