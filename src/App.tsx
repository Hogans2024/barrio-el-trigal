import React, { useState, useEffect, useRef } from 'react';
import {
  Siren, LayoutGrid, Calendar, LogIn, Heart, Store, PlusSquare,
  Bell, Menu, X, Info, Activity
} from 'lucide-react';

// Sub-views
import AlarmaView from './components/AlarmaView';
import ProyectosView from './components/ProyectosView';
import EventosView from './components/EventosView';
import FarmaciasView from './components/FarmaciasView';
import NegociosView from './components/NegociosView';
import MascotasView from './components/MascotasView';
import AfiliacionView from './components/AfiliacionView';

interface NotificationToast {
  id: string;
  title: string;
  message: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('alarma');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const mainScrollRef = useRef<HTMLElement>(null);

  // Auto-scroll al inicio al cambiar de pestaña
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);
  
  // Custom states for toast alerts
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  // Static pre-populated notification broadcasts inside system
  const mockAlerts = [
    {
      id: 'n1',
      title: '🚨 Simulacro de Emergencia',
      desc: 'Este sábado a las 10:00 AM realizaremos el primer testeo de sirenas unificadas.',
      time: 'Hace 2 horas'
    },
    {
      id: 'n2',
      title: '🐕 Vacunación de Mascotas',
      desc: 'La campaña gratuita se traslada a la Plaza Principal del Trigal para facilitar acceso.',
      time: 'Hace 1 día'
    },
    {
      id: 'n3',
      title: '💡 Tarifas Gas domiciliario',
      desc: 'La directiva vecinal logró un 15% de subvención para sectores en desarrollo.',
      time: 'Hace 3 días'
    }
  ];

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
              src="/logo.png" 
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
        <header className="bg-black/30 border-b border-gray-900/60 px-5 py-4 flex justify-between items-center shrink-0 backdrop-blur-md">
          
          {/* Left part varies between mobile and desktop */}
          <div className="flex items-center space-x-3 md:hidden">
            <img 
              src="/logo.png" 
              alt="Logo Barrio El Trigal" 
              className="w-12 h-12 object-contain drop-shadow-md"
            />
            <div>
              <span className="text-gray-500 text-[11px] uppercase font-mono block tracking-widest">BARRIO</span>
              <h2 className="text-white text-base font-extrabold tracking-tight">El Trigal</h2>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Activity className="h-5 w-5 text-brand-green animate-pulse" />
            <span className="text-gray-400 text-sm font-mono">Panel Seccional:</span>
            <span className="text-white font-mono font-bold text-sm uppercase">{currentTabTitle()}</span>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-3">
            {/* Notifications bell */}
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 md:px-4 md:py-2 text-gray-400 hover:text-white transition focus:outline-none cursor-pointer bg-black/40 rounded-xl border border-gray-800 hover:border-gray-600 flex items-center gap-2"
            >
              <Bell className="h-5 w-5" />
              <span className="hidden md:inline font-mono font-bold text-xs">Avisos</span>
              <span className="absolute -top-1 -right-1 md:relative md:top-0 md:right-0 bg-brand-yellow text-gray-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#111] animate-pulse shadow-lg">
                2
              </span>
            </button>

            {/* Hamburger menu (Mobile Only) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 text-gray-400 hover:text-white transition focus:outline-none cursor-pointer bg-black/40 rounded-xl border border-gray-800 hover:border-gray-600"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Central scrolling panel area */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto px-4 py-6 md:p-8 scrollbar-none relative w-full pb-28 md:pb-8">
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            {activeTab === 'alarma' && <AlarmaView onNavigate={setActiveTab} onShowNotification={addToast} />}
            {activeTab === 'proyectos' && <ProyectosView />}
            {activeTab === 'eventos' && <EventosView onShowNotification={addToast} />}
            {activeTab === 'farmacias' && <FarmaciasView onShowNotification={addToast} />}
            {activeTab === 'negocios' && <NegociosView onShowNotification={addToast} />}
            {activeTab === 'mascotas' && <MascotasView onShowNotification={addToast} />}
            {activeTab === 'afiliacion' && <AfiliacionView onShowNotification={addToast} />}
          </div>
        </main>
      </div>

      {/* -------------------- BOTTOM NAVIGATION BAR (MOBILE ONLY) -------------------- */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-black/95 backdrop-blur-xl border-t border-gray-900/80 px-2 py-1.5 tall:py-3 flex justify-around items-center z-40">
        <div className="w-full max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => setActiveTab('alarma')}
            className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${
              activeTab === 'alarma' ? 'text-brand-yellow scale-110' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Siren className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Alarma</span>
          </button>

          <button
            onClick={() => setActiveTab('proyectos')}
            className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${
              activeTab === 'proyectos' ? 'text-brand-yellow scale-110' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <LayoutGrid className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Proyectos</span>
          </button>

          <button
            onClick={() => setActiveTab('eventos')}
            className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${
              activeTab === 'eventos' ? 'text-brand-yellow scale-110' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Calendar className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Eventos</span>
          </button>

          <button
            onClick={() => setActiveTab('afiliacion')}
            className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${
              activeTab === 'afiliacion' ? 'text-brand-yellow scale-110' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <LogIn className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Afiliación</span>
          </button>
        </div>
      </nav>

      {/* 3. NOTIFICATION DRAWER / OVERLAY PANEL */}
      {notificationsOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-[#121212] border-l border-gray-800 w-full max-w-sm p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-900">
              <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-yellow" />
                <span>Mensajes Colectivos</span>
              </h3>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="bg-black/50 hover:bg-black/80 text-gray-400 hover:text-white rounded-full p-2 border border-gray-800 transition focus:outline-none cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {mockAlerts.map((alt) => (
                <div
                  key={alt.id}
                  className="bg-[#181818] border border-gray-800/80 rounded-xl p-4 space-y-2 hover:border-gray-700 transition shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-white font-bold text-sm">{alt.title}</span>
                    <span className="text-[10px] font-mono text-gray-500 shrink-0">{alt.time}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{alt.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-brand-yellow/5 border border-brand-yellow/15 p-5 rounded-xl space-y-3 mt-8">
              <span className="text-brand-yellow text-sm font-bold leading-normal block">🚨 Canales de Emergencia</span>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4 leading-normal">
                <li><span className="text-white font-semibold">Bomberos Tarija:</span> 119</li>
                <li><span className="text-white font-semibold">Radio Patrullas:</span> 110</li>
                <li><span className="text-white font-semibold">Hospital Regional:</span> 4 6642010</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. HAMBURGER MENU DRAWER OVERLAY (MOBILE ONLY) */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-start">
          <div className="bg-[#121212] border-r border-gray-800 w-full max-w-xs p-6 overflow-y-auto space-y-6 animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-900">
              <h3 className="text-brand-yellow font-extrabold text-sm tracking-widest uppercase">BARRIO EL TRIGAL</h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="bg-black/50 hover:bg-black/80 text-gray-400 hover:text-white rounded-full p-2 border border-gray-800 transition focus:outline-none cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Secondary navigation for mobile drawers */}
            <div className="space-y-2 text-sm font-semibold">
              <button
                onClick={() => { setActiveTab('alarma'); setMenuOpen(false); }}
                className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer"
              >
                🚨 Central Alarma Vecinal
              </button>
              <button
                onClick={() => { setActiveTab('proyectos'); setMenuOpen(false); }}
                className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer"
              >
                🧱 Proyectos del Barrio
              </button>
              <button
                onClick={() => { setActiveTab('eventos'); setMenuOpen(false); }}
                className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer"
              >
                📆 Eventos programados
              </button>
              <button
                onClick={() => { setActiveTab('farmacias'); setMenuOpen(false); }}
                className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer"
              >
                💊 Farmacias de Turno
              </button>
              <button
                onClick={() => { setActiveTab('negocios'); setMenuOpen(false); }}
                className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer"
              >
                🍔 Negocios Locales
              </button>
              <button
                onClick={() => { setActiveTab('mascotas'); setMenuOpen(false); }}
                className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer"
              >
                🐾 Mascotas Perdidas
              </button>
              <button
                onClick={() => { setActiveTab('afiliacion'); setMenuOpen(false); }}
                className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer"
              >
                📝 Registro de Afiliados
              </button>
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
          <div
            key={t.id}
            className="pointer-events-auto bg-[#1a1a1a] border border-brand-yellow/30 text-white rounded-2xl p-4 shadow-2xl flex items-start space-x-3 animate-in slide-in-from-bottom-4 fade-in duration-300"
          >
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
