import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Shield,
  Phone,
  CheckCircle,
  Lock,
  Users,
  FileText,
  Volume2,
  X,
  Siren,
  Activity,
  HeartPulse,
  Wrench,
} from 'lucide-react';

import { CAROUSEL_SLIDES, QUICK_ACCESS_ITEMS, ALARM_LOGS } from '../data.alarma';
import { AlarmLog } from '../types.alarma';
import { playTone } from './AudioSiren';

// Subcomponents migrados del proyecto origen (con imports a *.alarma)
import ActiveAlarmModal from './ActiveAlarmModal';
import CallModal from './CallModal';
import DetailModal from './DetailModal';

interface AlarmaViewProps {
  /** Navegación entre pestañas del CMS (no usada activamente aquí, pero se conserva la firma). */
  onNavigate: (tab: string) => void;
  /** Muestra un toast flotante global (equivalente a onToast del proyecto origen). */
  onShowNotification: (title: string, message: string) => void;
  /** Búsqueda global desde el header (mobile) */
  globalSearchQuery?: string;
}

/**
 * Central de Alarma Vecinal.
 *
 * Migración de la vista "CentralAlarmaView" del proyecto origen al CMS.
 * Conserva la firma de props del CMS (`onNavigate`, `onShowNotification`).
 * Usa datos MOCK (decisión 4.2): los accesos rápidos (eventos, farmacias,
 * mascotas, negocios) abren DetailModal con datos de prueba, NO Sheets.
 *
 * BREAKPOINTS (sección 5):
 *  - sin prefijo: celular pequeño (< 700px de alto)
 *  - tall: celular grande (≥ 700px de alto)
 *  - sm: tablet/escritorio (≥ 640px de ancho) — fiel al diseño del origen.
 */
export default function AlarmaView({ onShowNotification, globalSearchQuery = '' }: AlarmaViewProps) {
  // Main interactive modals toggles
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [activeAlarmType, setActiveAlarmType] = useState<'panic' | 'suspicious' | 'test' | 'medical'>('panic');
  const [isDialerOpen, setIsDialerOpen] = useState(false);

  // Detail views state (accesos rápidos)
  const [activeDetailType, setActiveDetailType] = useState<'eventos' | 'farmacias' | 'mascotas' | 'negocios' | null>(null);

  // Dynamic state for data
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<AlarmLog[]>(ALARM_LOGS);

  // Update local search query if global changes
  useEffect(() => {
    setSearchQuery(globalSearchQuery);
  }, [globalSearchQuery]);

  // Tipos de alarma seleccionables (panic / suspicious / test / medical)
  const ALARM_TYPES: { id: 'panic' | 'suspicious' | 'test' | 'medical'; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'panic', label: 'Pánico', icon: <Siren className="w-4 h-4" />, color: 'text-red-400 border-red-500/40 bg-red-500/10' },
    { id: 'suspicious', label: 'Sospechoso', icon: <Search className="w-4 h-4" />, color: 'text-[#FFD700] border-[#FFD700]/40 bg-[#FFD700]/10' },
    { id: 'medical', label: 'Médica', icon: <HeartPulse className="w-4 h-4" />, color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
    { id: 'test', label: 'Prueba', icon: <Wrench className="w-4 h-4" />, color: 'text-gray-300 border-white/20 bg-white/5' },
  ];

  // Carousel timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    playTone(400, 50);
    setCarouselIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNextSlide = () => {
    playTone(400, 50);
    setCarouselIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  // Open Alarm triggers
  const handleTriggerAlarm = (type: 'panic' | 'suspicious' | 'test' | 'medical') => {
    playTone(1000, 150);
    setActiveAlarmType(type);
    setIsAlarmActive(true);
  };

  // Close Alarm trigger & write dynamic log
  const handleCloseAlarm = (newLog: AlarmLog) => {
    setLogs((prev) => [newLog, ...prev]);
    setIsAlarmActive(false);
    onShowNotification('Sistema', `Alarma desactivada correctamente. Registro #${newLog.id} guardado.`);
  };

  // Filtramos los items rápidos si hay búsqueda
  const filteredItems = QUICK_ACCESS_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-2.5 tall:space-y-4 sm:space-y-6">

      {/* ============ 1. CARRUSEL HERO ============ */}
      <section className="relative -mt-6 -mx-4 md:mt-0 md:mx-0 rounded-none sm:rounded-b-[20px] overflow-hidden border-b md:border-x border-white/10 h-32 tall:h-44 sm:h-64 shrink-0 select-none bg-[#080a0f]">
        {/* Mobile Title Overlay (dentro del slide show en la parte superior izquierda) */}
        <div className="md:hidden absolute top-3 left-4 z-20 flex items-center space-x-2">
          <div className="p-1.5 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/20 flex items-center justify-center backdrop-blur-md">
            <Shield className="w-4 h-4 text-[#FFD700]" />
          </div>
          <h2 className="text-sm font-bold font-sans text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Central de Alarma Vecinal</h2>
        </div>

        <img
          alt="Barrio El Trigal"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src={CAROUSEL_SLIDES[carouselIndex].imageUrl}
        />
        {/* Dark overlay vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex flex-col justify-center px-4 tall:px-6 sm:px-10 mt-6 md:mt-0">
          <h2 className="text-sm tall:text-lg sm:text-2xl font-light text-white leading-tight">
            {CAROUSEL_SLIDES[carouselIndex].title}
          </h2>
          <h3 className="text-sm tall:text-lg sm:text-2xl font-bold text-[#FFD700] mb-0.5 sm:mb-1 font-sans uppercase tracking-tight">
            {CAROUSEL_SLIDES[carouselIndex].subtitle}
          </h3>
          <p className="hidden sm:block text-gray-300 max-w-xl text-[11px] leading-relaxed font-sans">
            {CAROUSEL_SLIDES[carouselIndex].description}
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/5 flex items-center justify-center text-white transition-all active:scale-90 z-10"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/5 flex items-center justify-center text-white transition-all active:scale-90 z-10"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Carousel Page Indicators */}
        <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {CAROUSEL_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => { playTone(400, 50); setCarouselIndex(index); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                carouselIndex === index ? 'w-3 bg-[#FFD700]' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ============ 2. BIENVENIDA + BUSCADOR ============ */}
      {/* Oculto en móviles, visible solo en escritorio (md:flex) */}
      <section className="hidden md:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none shrink-0 py-1">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/20 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-[#FFD700]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold font-sans truncate">Central de Alarma Vecinal</h2>
            <p className="text-gray-400 text-[11px]">Selecciona una opción o busca lo que necesitas.</p>
          </div>
        </div>

        {/* Search Input Bar - Solo visible en desktop, oculta en mobile (md:block) */}
        <div className="hidden md:block w-full sm:w-72 relative">
          <input
            className="w-full bg-[#080a0f] border border-white/10 rounded-xl py-1.5 pl-9 pr-4 text-xs text-white focus:border-[#FFD700] focus:outline-none focus:ring-0 transition-all placeholder-gray-500 font-sans"
            placeholder="Buscar farmacias, mascotas, eventos..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* INTERACTIVE SEARCH RESULTS DRAWER */}
      {searchQuery && (
        <div className="bg-[#080a0f] border border-[#FFD700]/20 rounded-2xl p-3 space-y-2 shadow-xl animate-fade-in shrink-0">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Resultados de búsqueda:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div
              onClick={() => { setActiveDetailType('farmacias'); setSearchQuery(''); }}
              className="p-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl cursor-pointer flex justify-between items-center"
            >
              <span>💊 Farmacias Abiertas</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <div
              onClick={() => { setActiveDetailType('mascotas'); setSearchQuery(''); }}
              className="p-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl cursor-pointer flex justify-between items-center"
            >
              <span>🐕 Mascotas Perdidas</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <div
              onClick={() => { setActiveDetailType('eventos'); setSearchQuery(''); }}
              className="p-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl cursor-pointer flex justify-between items-center"
            >
              <span>📅 Asambleas y Simulacros</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <div
              onClick={() => { setActiveDetailType('negocios'); setSearchQuery(''); }}
              className="p-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl cursor-pointer flex justify-between items-center"
            >
              <span>🛒 Tiendas Cercanas</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            </div>
          </div>
        </div>
      )}

      {/* ============ 3. ACCESOS RÁPIDOS (grid mock → DetailModal) ============ */}
      <section className="grid grid-cols-2 tall:grid-cols-4 sm:grid-cols-4 gap-2 tall:gap-3 sm:gap-4 select-none shrink-0">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => { playTone(600, 80); setActiveDetailType(item.id as any); }}
            className="group relative rounded-xl overflow-hidden border border-white/5 hover:border-[#FFD700]/30 cursor-pointer h-16 tall:h-20 sm:h-20 transition-all duration-300 hover:shadow-lg flex animate-fade-in"
          >
            <img
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-500"
              src={item.imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 p-2 sm:p-3 flex flex-col justify-end w-full">
              <h4 className="font-bold text-[11px] sm:text-xs text-white group-hover:text-[#FFD700] transition-colors leading-tight">{item.title}</h4>
              <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 leading-none hidden sm:block">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ============ 4. CENTRAL DE ALARMA ============ */}
      <section className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl sm:rounded-[24px] p-3 tall:p-4 sm:p-4.5 relative overflow-hidden shrink-0 shadow-[0_0_30px_rgba(255,215,0,0.03)]">
        {/* En desktop: grid de 12 columnas estilo origen. En mobile: apilado. */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 sm:items-center">

          {/* Left Column: Description (desktop) / oculta en mobile corto */}
          <div className="hidden sm:block sm:col-span-4 space-y-2.5">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#FFD700]" />
              </div>
              <h3 className="text-sm font-bold font-sans text-white">Central de Alarma Vecinal</h3>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              Si ves una situación sospechosa o emergencia en tu barrio El Trigal, activa la alarma vecinal. Puedes probar el sistema sin compromiso.
            </p>
          </div>

          {/* Middle Column: Selector de tipo + Pulsating Panic Button + Direct Dial */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center space-y-2.5 sm:border-l sm:border-r sm:border-white/5 sm:px-4">

            {/* Selector de tipo de alarma (4 tipos: panic/suspicious/test/medical) */}
            <div className="w-full">
              <p className="text-[9px] tall:text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5 text-center sm:text-left">Tipo de alerta</p>
              <div className="grid grid-cols-4 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {ALARM_TYPES.map((t) => {
                  const isSelected = activeAlarmType === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => { playTone(700, 60); setActiveAlarmType(t.id); }}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-2 py-1.5 rounded-lg border text-[9px] sm:text-[10px] font-bold transition-all active:scale-95 ${
                        isSelected ? t.color : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {t.icon}
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Circular pulsing trigger */}
            <button
              onClick={() => handleTriggerAlarm(activeAlarmType)}
              className="w-28 h-28 tall:w-32 tall:h-32 sm:w-36 sm:h-36 rounded-full border-4 border-[#FFD700] flex flex-col items-center justify-center bg-black/40 hover:bg-black/70 transition-all duration-300 group shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:shadow-[0_0_45px_rgba(255,215,0,0.25)] relative active:scale-95 shrink-0"
            >
              <span className="absolute inset-0 rounded-full border border-[#FFD700]/30 animate-ping pointer-events-none" />
              <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFD700] mb-1 sm:mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-[8px] sm:text-[9px] font-black text-[#FFD700] tracking-widest text-center uppercase leading-tight">
                Activar<br />Alarma<br />Vecinal
              </span>
            </button>

            {/* Call Emergency contact phone button */}
            <button
              onClick={() => { playTone(600, 100); setIsDialerOpen(true); }}
              className="bg-[#22c55e] hover:bg-green-600 px-4 py-2 rounded-xl flex items-center justify-center space-x-2 text-white font-bold transition-all transform hover:scale-102 active:scale-95 w-full text-xs font-sans whitespace-nowrap shadow-lg shadow-green-500/10 hover:shadow-green-500/20"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>Llamar Alarma vecinal</span>
            </button>

          </div>

          {/* Right Column: Key Benefits Indicators */}
          <div className="sm:col-span-4 space-y-2.5 sm:pl-4">
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e] shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Respuesta rápida</h4>
                <p className="text-[10px] text-gray-400 leading-normal">Notificación inmediata a vecinos y seguridad.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Protegemos tu barrio</h4>
                <p className="text-[10px] text-gray-400 leading-normal">Seguridad para todos, todos los días de Tarija.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center text-[#FFD700] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Red de vecinos</h4>
                <p className="text-[10px] text-gray-400 leading-normal">Comunidad conectada para un barrio más seguro.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Ambient background decoration glowing circle */}
        <div className="absolute -right-24 -bottom-24 w-40 h-40 bg-[#FFD700]/5 rounded-full blur-[50px] pointer-events-none" />
      </section>

      {/* ============ 5. BITÁCORA DE ALERTAS ============ */}
      <section className="bg-white/[0.01] border border-white/5 rounded-2xl sm:rounded-[20px] p-3 tall:p-4 sm:p-5 select-none flex flex-col shrink-0 space-y-3 pb-6 sm:pb-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 shrink-0">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <h4 className="font-bold text-xs text-white">Bitácora de Alertas de El Trigal</h4>
          </div>
          <span className="text-[8.5px] font-mono text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20 px-1.5 py-0.5 rounded">
            Base de Datos Local Activa
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-[11px] font-sans min-w-[520px]">
            <thead className="sticky top-0 bg-[#070707] z-10 text-gray-500 border-b border-white/5 font-mono text-[9.5px]">
              <tr>
                <th className="pb-1.5 pt-2 font-semibold">Momento</th>
                <th className="pb-1.5 pt-2 font-semibold">Tipo de Emergencia</th>
                <th className="pb-1.5 pt-2 font-semibold">Reportado Por</th>
                <th className="pb-1.5 pt-2 font-semibold">Estado</th>
                <th className="pb-1.5 pt-2 font-semibold">Atendido Por</th>
                <th className="pb-1.5 pt-2 font-semibold">Respuesta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2 font-mono text-gray-400 text-[9.5px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2 font-bold whitespace-nowrap">
                    {log.type === 'panic' && <span className="text-red-400">🚨 Pánico General</span>}
                    {log.type === 'suspicious' && <span className="text-[#FFD700]">🔍 Sospechoso</span>}
                    {log.type === 'medical' && <span className="text-blue-400">⚕️ Médica</span>}
                    {log.type === 'test' && <span className="text-gray-400">⚙️ Prueba Técnica</span>}
                  </td>
                  <td className="py-2 text-white">{log.user}</td>
                  <td className="py-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[7.5px] font-bold font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Resuelta
                    </span>
                  </td>
                  <td className="py-2 text-gray-400 whitespace-nowrap">{log.resolvedBy || 'Central de Serenazgo'}</td>
                  <td className="py-2 font-mono text-emerald-400 text-[9.5px] whitespace-nowrap">{log.resolutionTime || '---'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============ MODALES ============ */}
      {/* FULL-SCREEN SIREN ALARM TRIGGER OVERLAY MODAL */}
      <ActiveAlarmModal
        isOpen={isAlarmActive}
        onClose={handleCloseAlarm}
        type={activeAlarmType}
      />

      {/* EMERGENCY VOIP TELEPHONE DIALER MODAL */}
      <CallModal
        isOpen={isDialerOpen}
        onClose={() => setIsDialerOpen(false)}
      />

      {/* MULTIPURPOSE COMPONENT PORTAL PORT (Eventos, Farmacias, Mascotas, Negocios) */}
      <DetailModal
        isOpen={activeDetailType !== null}
        onClose={() => setActiveDetailType(null)}
        type={activeDetailType || 'eventos'}
      />

    </div>
  );
}
