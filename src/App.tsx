import React, { useState, useEffect, useRef } from 'react';
import {
  Siren, LayoutGrid, Calendar, LogIn, Heart, Store, PlusSquare,
  Bell, Menu, X, Info, Activity, User, ChevronDown, Search
} from 'lucide-react';

// Sub-views
import AlarmaView from './components/AlarmaView';
import ProyectosView from './components/ProyectosView';
import EventosView from './components/EventosView';
import FarmaciasView from './components/FarmaciasView';
import NegociosView from './components/NegociosView';
import MascotasView from './components/MascotasView';
import AfiliacionView from './components/AfiliacionView';
import { useSheetData } from './hooks/useSheetData';

// Cabecera global (avisos + perfil) migrada del proyecto origen.
// Reemplaza a la campana + drawer de `mockAlerts` y al área de perfil
// anteriores. Los avisos viven en `notices` (Notice[]); el sistema de
// toasts (addToast/onShowNotification) NO se toca (es un sistema distinto).
import NoticeDropdown from './components/NoticeDropdown';
import ProfileModal from './components/ProfileModal';
import { playTone } from './components/AudioSiren';
import { NOTICES } from './data.alarma';
import { Notice } from './types.alarma';

interface NotificationToast {
  id: string;
  title: string;
  message: string;
}

export default function App() {
  const { proyectos, eventos, farmacias, negocios, mascotas, loading, error } = useSheetData();
  const [activeTab, setActiveTab] = useState<string>('alarma');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const mainScrollRef = useRef<HTMLElement>(null);
  const [isTopSearchOpen, setIsTopSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // --- Cabecera global: avisos (NoticeDropdown) + perfil (ProfileModal) ---
  // Reemplazan a la campana + drawer de mockAlerts y al perfil anteriores.
  const [notices, setNotices] = useState<Notice[]>(NOTICES);
  const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const handleMarkRead = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleClearNotices = () => {
    setNotices([]);
    setIsNoticeOpen(false);
  };

  const unreadCount = notices.filter((n) => n.unread).length;

  // Auto-scroll al inicio al cambiar de pestaña
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);
  
  // Custom states for toast alerts
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  // System triggers a new banner/toast
  const addToast = (title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message }]);
    
    // Auto-remove toast after 6 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  };

  const currentTabTitle = () => {
    switch (activeTab) {
      case 'alarma': return 'Central de Alarmas';
      case 'proyectos': return 'Proyectos del Barrio';
      case 'eventos': return 'Eventos y Limpiezas';
      case 'farmacias': return 'Farmacias de Turno';
      case 'negocios': return 'Negocios Locales';
      case 'mascotas': return 'Mascotas Perdidas';
      case 'afiliacion': return 'Registro de Afiliados';
      default: return 'Barrio El Trigal';
    }
  };

  return (
    <div className="h-[100dvh] bg-[#070707] text-white flex flex-col md:flex-row antialiased selection:bg-brand-yellow selection:text-black overflow-hidden relative">
      
      {/* Ambient colored background lights for aesthetic pairs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2ECC71]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* -------------------- SIDEBAR (DESKTOP ONLY) -------------------- */}
      <aside className="hidden md:flex flex-col w-72 bg-black/40 border-r border-gray-900/80 p-6 z-40 relative backdrop-blur-xl shrink-0">
        <div className="flex-1 space-y-8">
          <div className="flex items-center space-x-3">
            <img 
              src={`${import.meta.env.BASE_URL}logo-trigal.svg`} 
              alt="Logo Barrio El Trigal" 
              className="w-16 h-16 object-contain drop-shadow-md"
            />
            <div>
              <span className="text-gray-500 text-[10px] uppercase font-mono block tracking-widest">ZONA SUR TARIJA</span>
              <h2 className="text-white text-xl font-extrabold tracking-tight">El Trigal</h2>
            </div>
          </div>

          <nav className="space-y-2 text-sm font-semibold">
            {[
              { id: 'alarma', icon: Siren, label: 'Central Alarma Vecinal' },
              { id: 'proyectos', icon: LayoutGrid, label: 'Proyectos del Barrio' },
              { id: 'eventos', icon: Calendar, label: 'Eventos Programados' },
              { id: 'farmacias', icon: PlusSquare, label: 'Farmacias de Turno' },
              { id: 'negocios', icon: Store, label: 'Negocios Locales' },
              { id: 'mascotas', icon: Heart, label: 'Mascotas Perdidas' },
              { id: 'afiliacion', icon: LogIn, label: 'Registro Afiliados' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-brand-yellow text-gray-950 font-bold shadow-md' 
                    : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Developer footer */}
        <div className="bg-black/40 border border-gray-900 rounded-2xl p-4 text-[11px] text-gray-500 font-mono tracking-wide leading-relaxed mt-6">
          <span className="text-white font-semibold block">Tarija Unida • 2026</span>
          <p className="mt-1">Control de vecindad certificado bajo padrón nacional.</p>
        </div>
      </aside>

      {/* -------------------- MAIN CONTENT AREA -------------------- */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 w-full">
        
        {/* APP STATUS HEADER (Mobile & Desktop) */}
        <header className="bg-black/30 border-b border-gray-900/60 px-5 py-0 flex justify-between items-center shrink-0 backdrop-blur-md">
          
          {/* Left part varies between mobile and desktop */}
          <div className="flex items-center space-x-2.5 md:hidden">
            <img 
              src={`${import.meta.env.BASE_URL}logo-trigal.svg`} 
              alt="Logo Barrio El Trigal" 
              className="w-[45px] h-[45px] md:w-12 md:h-12 object-contain drop-shadow-md"
            />
            <div className="flex flex-col space-y-[2px]">
              <span className="text-[#FFD700] text-[11px] uppercase font-mono block tracking-[0.15em] font-bold leading-none">BARRIO</span>
              <h2 className="text-white text-base font-extrabold tracking-tight leading-none">El Trigal</h2>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Activity className="h-5 w-5 text-brand-green animate-pulse" />
            <span className="text-gray-400 text-sm font-mono">Panel Seccional:</span>
            <span className="text-white font-mono font-bold text-sm uppercase">{currentTabTitle()}</span>
          </div>

          {/* Right controls */}
          <div className={`flex items-center justify-end ${isTopSearchOpen ? 'flex-1 ml-3' : 'space-x-1.5'}`}>
            {isTopSearchOpen ? (
              <div className="flex items-center w-full bg-black/60 border border-brand-yellow/50 rounded-xl px-3 py-1.5 animate-in fade-in slide-in-from-right-4 duration-200">
                <Search className="h-4 w-4 text-brand-yellow shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Buscar en Alarma..."
                  className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-sm ml-2 font-sans"
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsTopSearchOpen(false);
                      // TODO: Implementar lógica de búsqueda a futuro
                    }
                  }}
                />
                {globalSearchQuery === '' ? (
                  <button 
                    onClick={() => setIsTopSearchOpen(false)}
                    className="ml-2 p-1 text-gray-400 hover:text-white shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsTopSearchOpen(false);
                      // TODO: Implementar lógica de búsqueda a futuro
                    }}
                    className="ml-2 px-3 py-1 text-[10px] font-bold text-brand-yellow border border-brand-yellow rounded-lg hover:bg-brand-yellow/10 transition-colors uppercase shrink-0"
                  >
                    BUSCAR
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Lupa (Mobile Only) - Activa la barra superior */}
                {activeTab === 'alarma' && (
                  <button 
                    onClick={() => setIsTopSearchOpen(true)}
                    className="md:hidden flex items-center bg-black/60 border border-gray-800 hover:border-brand-yellow/50 rounded-xl px-2 py-1.5 transition-all focus:outline-none cursor-pointer w-[75px]"
                  >
                    <Search className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-[11px] font-sans text-white/30 ml-1">Buscar</span>
                  </button>
                )}

                {/* Notifications bell → NoticeDropdown (cabecera global migrada) */}
                <div className="relative">
                  <button
                    onClick={() => { playTone(500, 50); setIsNoticeOpen(!isNoticeOpen); }}
                    className={`relative p-1.5 md:px-4 md:py-2 transition focus:outline-none cursor-pointer bg-black/40 rounded-xl border flex items-center gap-2 ${
                      isNoticeOpen
                        ? 'border-[#FFD700]/40 text-white'
                        : 'border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="hidden md:inline font-mono font-bold text-xs">Avisos</span>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 md:relative md:top-0 md:right-0 bg-brand-yellow text-gray-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#111] animate-pulse shadow-lg">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <NoticeDropdown
                    isOpen={isNoticeOpen}
                    notices={notices}
                    onMarkRead={handleMarkRead}
                    onClearAll={handleClearNotices}
                    onClose={() => setIsNoticeOpen(false)}
                  />
                </div>

                {/* Profile trigger → ProfileModal (cabecera global migrada) */}
                <button
                  onClick={() => { playTone(500, 50); setIsProfileOpen(true); }}
                  className="hidden md:flex items-center space-x-2.5 cursor-pointer hover:opacity-80 transition-all focus:outline-none bg-black/40 rounded-xl border border-gray-800 hover:border-gray-600 p-1.5 md:pr-3"
                  title="Credencial digital"
                >
                  <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center text-[11px] font-bold border border-white/10 text-white">
                    <User className="h-4 w-4 text-brand-yellow" />
                  </div>
                  <ChevronDown className="hidden md:block w-4 h-4 text-gray-500" />
                </button>

                {/* Hamburger menu (Mobile Only) */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-1.5 text-gray-400 hover:text-white transition focus:outline-none cursor-pointer bg-black/40 rounded-xl border border-gray-800 hover:border-gray-600"
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </>
            )}
          </div>
        </header>

        {/* Central scrolling panel area */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto px-4 py-6 md:p-8 scrollbar-none relative w-full pb-28 md:pb-8">
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            {/* Banner sutil si falló la carga del JSON dinámico (se sigue mostrando data fallback) */}
            {error && (
              <div className="mb-4 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2">
                <Info className="h-4 w-4 shrink-0" />
                <span>No se pudo actualizar el contenido en vivo. Mostrando información guardada.</span>
              </div>
            )}

            {/* Spinner de carga inicial */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-gray-700 border-t-brand-yellow animate-spin" />
                <span className="text-xs font-mono tracking-wide">Cargando contenido…</span>
              </div>
            ) : (
              <>
            {activeTab === 'alarma' && <AlarmaView onNavigate={setActiveTab} onShowNotification={addToast} globalSearchQuery={globalSearchQuery} />}
            {activeTab === 'proyectos' && <ProyectosView projects={proyectos} />}
            {activeTab === 'eventos' && <EventosView eventos={eventos} onShowNotification={addToast} />}
            {activeTab === 'farmacias' && <FarmaciasView farmacias={farmacias} onShowNotification={addToast} />}
            {activeTab === 'negocios' && <NegociosView negocios={negocios} onShowNotification={addToast} />}
            {activeTab === 'mascotas' && <MascotasView mascotas={mascotas} onShowNotification={addToast} />}
            {activeTab === 'afiliacion' && <AfiliacionView onShowNotification={addToast} />}
              </>
            )}
          </div>
        </main>
      </div>

      {/* -------------------- BOTTOM NAVIGATION BAR (MOBILE ONLY) -------------------- */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-black/95 backdrop-blur-xl border-t border-gray-900/80 px-2 py-1.5 tall:py-3 flex justify-around items-center z-40">
        <div className="w-full max-w-md mx-auto flex justify-around items-center">
          <button onClick={() => setActiveTab('alarma')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'alarma' ? 'text-brand-yellow scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
            <Siren className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Alarma</span>
          </button>
          <button onClick={() => setActiveTab('proyectos')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'proyectos' ? 'text-brand-yellow scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
            <LayoutGrid className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Proyectos</span>
          </button>
          <button onClick={() => setActiveTab('eventos')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'eventos' ? 'text-brand-yellow scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
            <Calendar className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Eventos</span>
          </button>
          <button onClick={() => setActiveTab('afiliacion')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'afiliacion' ? 'text-brand-yellow scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
            <LogIn className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Afiliación</span>
          </button>
        </div>
      </nav>

      {/* 3. CREDENCIAL DIGITAL DE PERFIL (modal global, accesible desde cualquier pestaña) */}
      {/* Reemplaza al antiguo drawer de mockAlerts. La bandeja de avisos ahora */}
      {/* vive en el header vía NoticeDropdown (es un dropdown/hoja, no un drawer). */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* 4. HAMBURGER MENU DRAWER (MOBILE ONLY) */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-start">
          <div className="bg-[#121212] border-r border-gray-800 w-full max-w-xs p-6 overflow-y-auto space-y-6 animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-900">
              <h3 className="text-brand-yellow font-extrabold text-sm tracking-widest uppercase">BARRIO EL TRIGAL</h3>
              <button onClick={() => setMenuOpen(false)} className="bg-black/50 hover:bg-black/80 text-gray-400 hover:text-white rounded-full p-2 border border-gray-800 transition focus:outline-none cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2 text-sm font-semibold">
              {[['alarma','🚨 Central Alarma Vecinal'],['proyectos','🧱 Proyectos del Barrio'],['eventos','📆 Eventos programados'],['farmacias','💊 Farmacias de Turno'],['negocios','🍔 Negocios Locales'],['mascotas','🐾 Mascotas Perdidas'],['afiliacion','📝 Registro de Afiliados']].map(([id,label]) => (
                <button key={id} onClick={() => { setActiveTab(id); setMenuOpen(false); }} className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer">{label}</button>
              ))}
              <button onClick={() => { playTone(500, 50); setIsProfileOpen(true); setMenuOpen(false); }} className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer">👤 Usuario</button>
            </div>
            <div className="bg-black/40 border border-gray-900 rounded-2xl p-5 space-y-2 text-xs text-gray-500 font-mono mt-8">
              <span className="text-white font-bold block">Contacto Directiva</span>
              <p>Presidente: Don Omar Castro</p>
              <p>📍 Sede: Av. Las Begonias N° 230</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. TOAST NOTIFICATION CONTAINER */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-3 max-w-xs md:max-w-sm w-full font-sans select-none pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto bg-[#1a1a1a] border border-brand-yellow/30 text-white rounded-2xl p-4 shadow-2xl flex items-start space-x-3 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-brand-yellow/10 text-brand-yellow p-2 rounded-full shrink-0">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs text-brand-yellow uppercase tracking-wider">{t.title}</p>
              <p className="text-xs md:text-sm text-gray-300 mt-1 leading-relaxed">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
