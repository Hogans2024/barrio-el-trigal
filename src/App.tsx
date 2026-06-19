import React, { useState, useEffect } from 'react';
import {
  Siren, LayoutGrid, Calendar, LogIn, Heart, Store, Shield,
  PlusSquare, Bell, Menu, X, Laptop, Smartphone, HelpCircle,
  FileCheck2, ChevronRight, Activity, Info
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
  const [mobileFrame, setMobileFrame] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  
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
      case 'alarma': return 'Inicio';
      case 'proyectos': return 'Proyectos';
      case 'eventos': return 'Eventos Barrio';
      case 'farmacias': return 'Farmacias';
      case 'negocios': return 'Negocios';
      case 'mascotas': return 'Mascotas';
      case 'afiliacion': return 'Afiliación';
      default: return 'Barrio El Trigal';
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col antialiased selection:bg-brand-yellow selection:text-black">
      
      {/* Upper Control Bar (Viewport mode toggle and direct help indicator) */}
      <header className="bg-[#121212] border-b border-gray-900 px-6 py-3.5 flex justify-between items-center z-40">
        <div className="flex items-center space-x-2.5">
          <div className="bg-brand-yellow text-gray-900 p-2 rounded-xl border border-yellow-250 shadow-md">
            <Shield className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-widest uppercase">Barrio El Trigal</h1>
            <p className="text-[10px] text-gray-500 font-mono">Portal de Seguridad & Vecindad</p>
          </div>
        </div>

        {/* Dynamic viewport layout toggle buttons */}
        <div className="flex items-center bg-black/50 border border-gray-800 p-1.5 rounded-xl space-x-1.5">
          <button
            onClick={() => setMobileFrame(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              mobileFrame ? 'bg-brand-yellow text-gray-950 shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
            title="Vista Móvil (Exacta)"
          >
            <Smartphone className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Celular</span>
          </button>
          
          <button
            onClick={() => setMobileFrame(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              !mobileFrame ? 'bg-[#2ECC71] text-gray-950 shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
            title="Vista Escritorio Completa"
          >
            <Laptop className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Escritorio</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Frame container */}
      <main className="flex-1 flex justify-center items-center py-6 px-4 md:py-10 bg-[#070707] relative overflow-hidden">
        
        {/* Ambient colored background lights for aesthetic pairs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2ECC71]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* 1. SMARTPHONE SIMULATION FRAME */}
        {mobileFrame ? (
          <div className="w-full max-w-[430px] h-[860px] bg-[#131313] border-[10px] border-zinc-800 rounded-[48px] overflow-hidden shadow-2xl flex flex-col relative scale-[0.98] transition-all duration-300">
            {/* Phone Notch/Speaker */}
            <div className="absolute top-0 inset-x-0 h-7 bg-zinc-800 flex justify-center items-center z-50">
              <div className="w-32 h-4 bg-black rounded-full" />
            </div>

            {/* Simulated Phone Content container starts */}
            <div className="flex-1 flex flex-col overflow-hidden pt-7 relative">
              
              {/* App Status Header inside simulated frame */}
              <div className="bg-[#111] border-b border-gray-900/60 px-5 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand-yellow flex items-center justify-center p-1 font-black text-gray-950 border border-yellow-200">
                    <span className="text-xs">BET</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] uppercase font-mono block">BARRIO</span>
                    <h2 className="text-white text-sm font-extrabold tracking-tight">El Trigal</h2>
                  </div>
                </div>

                {/* Right controls inside App */}
                <div className="flex items-center space-x-2.5">
                  {/* Notifications bell */}
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-gray-400 hover:text-white transition focus:outline-none cursor-pointer bg-black/40 rounded-xl"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 bg-brand-yellow text-gray-950 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-black animate-pulse">
                      2
                    </span>
                  </button>

                  {/* Hamburger menu */}
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 text-gray-400 hover:text-white transition focus:outline-none cursor-pointer bg-black/40 rounded-xl"
                  >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Central scrolling panel area inside Phone Mockup */}
              <div className="flex-1 overflow-y-auto px-5 py-5 pb-24 scrollbar-none">
                {activeTab === 'alarma' && <AlarmaView onNavigate={setActiveTab} onShowNotification={addToast} />}
                {activeTab === 'proyectos' && <ProyectosView />}
                {activeTab === 'eventos' && <EventosView onShowNotification={addToast} />}
                {activeTab === 'farmacias' && <FarmaciasView onShowNotification={addToast} />}
                {activeTab === 'negocios' && <NegociosView onShowNotification={addToast} />}
                {activeTab === 'mascotas' && <MascotasView onShowNotification={addToast} />}
                {activeTab === 'afiliacion' && <AfiliacionView onShowNotification={addToast} />}
              </div>

              {/* Bottom Sticky Tab Navigation Bar (exactly matched to screenshots) */}
              <div className="absolute bottom-0 inset-x-0 bg-black/90 backdrop-blur-md border-t border-gray-900/80 px-2 py-2 flex justify-around items-center z-30 shrink-0">
                <button
                  onClick={() => setActiveTab('alarma')}
                  className={`flex flex-col items-center p-1.5 focus:outline-none transition cursor-pointer select-none ${
                    activeTab === 'alarma' ? 'text-brand-yellow' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Siren className="h-5 w-5 mb-0.5" />
                  <span className="text-[9px] font-bold tracking-tight">Alarma</span>
                </button>

                <button
                  onClick={() => setActiveTab('proyectos')}
                  className={`flex flex-col items-center p-1.5 focus:outline-none transition cursor-pointer select-none ${
                    activeTab === 'proyectos' ? 'text-brand-yellow' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <LayoutGrid className="h-5 w-5 mb-0.5" />
                  <span className="text-[9px] font-bold tracking-tight">Proyectos</span>
                </button>

                <button
                  onClick={() => setActiveTab('eventos')}
                  className={`flex flex-col items-center p-1.5 focus:outline-none transition cursor-pointer select-none ${
                    activeTab === 'eventos' ? 'text-brand-yellow' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Calendar className="h-5 w-5 mb-0.5" />
                  <span className="text-[9px] font-bold tracking-tight">Eventos Barrio</span>
                </button>

                <button
                  onClick={() => setActiveTab('afiliacion')}
                  className={`flex flex-col items-center p-1.5 focus:outline-none transition cursor-pointer select-none ${
                    activeTab === 'afiliacion' ? 'text-brand-yellow' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <LogIn className="h-5 w-5 mb-0.5" />
                  <span className="text-[9px] font-bold tracking-tight">Afiliación</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          
          // 2. DYNAMIC BROAD desktop VIEW (Premium unified bento dashboard)
          <div className="w-full max-w-6xl bg-[#131313] border border-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[720px] transition-all duration-300 animate-in fade-in zoom-in-95 duration-200">
            {/* Desktop Left navigation bar */}
            <aside className="w-full md:w-64 bg-black/40 border-r border-gray-900/80 p-5 flex flex-col justify-between shrink-0">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">ZONA SUR TARIJA</span>
                  <h3 className="text-white font-extrabold text-lg tracking-tight">El Trigal</h3>
                </div>

                {/* Vertical Tabs navigation inside wide screen layout */}
                <nav className="space-y-1.5 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('alarma')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                      activeTab === 'alarma' ? 'bg-brand-yellow text-gray-950 font-bold' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    <Siren className="h-4.5 w-4.5 shrink-0" />
                    <span>🚨 Centro de Alarmas</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('proyectos')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                      activeTab === 'proyectos' ? 'bg-brand-yellow text-gray-950 font-bold' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="h-4.5 w-4.5 shrink-0" />
                    <span>🧱 Proyectos Directivos</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('eventos')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                      activeTab === 'eventos' ? 'bg-brand-yellow text-gray-950 font-bold' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    <Calendar className="h-4.5 w-4.5 shrink-0" />
                    <span>📆 Eventos y Limpiezas</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('farmacias')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                      activeTab === 'farmacias' ? 'bg-brand-yellow text-gray-950 font-bold' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    <PlusSquare className="h-4.5 w-4.5 shrink-0" />
                    <span>💊 Farmacias de Turno</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('negocios')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                      activeTab === 'negocios' ? 'bg-brand-yellow text-gray-950 font-bold' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    <Store className="h-4.5 w-4.5 shrink-0" />
                    <span>🍔 Negocios y Comercios</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('mascotas')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                      activeTab === 'mascotas' ? 'bg-brand-yellow text-gray-950 font-bold' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    <Heart className="h-4.5 w-4.5 shrink-0" />
                    <span>🐾 Mascotas Perdidas</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('afiliacion')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                      activeTab === 'afiliacion' ? 'bg-brand-yellow text-gray-950 font-bold' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                    }`}
                  >
                    <LogIn className="h-4.5 w-4.5 shrink-0" />
                    <span>📝 Formulario Afiliación</span>
                  </button>
                </nav>
              </div>

              {/* Developer specifications footer details */}
              <div className="bg-black/40 border border-gray-900 rounded-2xl p-3.5 text-[10px] text-gray-500 font-mono tracking-wide leading-normal">
                <span className="text-white font-semibold">Tarija Unida • 2026</span>
                <p className="mt-0.5">Control de vecindad certificado bajo padrón nacional.</p>
              </div>
            </aside>

            {/* Content area wide layout */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <header className="bg-black/30 border-b border-gray-900/80 px-6 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-brand-green animate-pulse" />
                  <span className="text-gray-400 text-xs font-mono">Panel Seccional:</span>
                  <span className="text-white font-mono font-bold text-xs uppercase">{currentTabTitle()}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Notifications bell */}
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative bg-black/50 border border-gray-800 p-2 text-gray-400 hover:text-white rounded-xl cursor-pointer transition focus:outline-none text-xs flex items-center gap-2 font-mono font-bold"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Avisos</span>
                    <span className="bg-brand-yellow text-gray-950 text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                      2
                    </span>
                  </button>
                </div>
              </header>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
                {activeTab === 'alarma' && <AlarmaView onNavigate={setActiveTab} onShowNotification={addToast} />}
                {activeTab === 'proyectos' && <ProyectosView />}
                {activeTab === 'eventos' && <EventosView onShowNotification={addToast} />}
                {activeTab === 'farmacias' && <FarmaciasView onShowNotification={addToast} />}
                {activeTab === 'negocios' && <NegociosView onShowNotification={addToast} />}
                {activeTab === 'mascotas' && <MascotasView onShowNotification={addToast} />}
                {activeTab === 'afiliacion' && <AfiliacionView onShowNotification={addToast} />}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 3. NOTIFICATION DRAWER / OVERLAY PANEL */}
      {notificationsOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-[#121212] border-l border-gray-800 w-full max-w-sm p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-900">
              <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-yellow" />
                <span>Mensajes Colectivos</span>
              </h3>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="bg-black/50 hover:bg-black/80 text-gray-400 hover:text-white rounded-full p-1.5 border border-gray-800 transition focus:outline-none cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              {mockAlerts.map((alt) => (
                <div
                  key={alt.id}
                  className="bg-[#181818] border border-gray-800/80 rounded-xl p-4 space-y-2 hover:border-gray-700 transition"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-white font-bold text-xs">{alt.title}</span>
                    <span className="text-[9px] font-mono text-gray-500 shrink-0">{alt.time}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">{alt.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-brand-yellow/5 border border-brand-yellow/15 p-4 rounded-xl space-y-2">
              <span className="text-brand-yellow text-xs font-bold leading-normal block">🚨 Canales de Emergencia Directos</span>
              <ul className="text-[11px] text-gray-400 space-y-1.5 list-disc pl-4 leading-normal">
                <li><span className="text-white font-semibold">Bomberos Tarija:</span> 119</li>
                <li><span className="text-white font-semibold">Radio Patrullas:</span> 110</li>
                <li><span className="text-white font-semibold">Hospital Regional San Juan de Dios:</span> 4 6642010</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. HAMBURGER MENU DRAWER OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex justify-start">
          <div className="bg-[#121212] border-r border-gray-800 w-full max-w-xs p-6 overflow-y-auto space-y-6 animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-900">
              <h3 className="text-brand-yellow font-extrabold text-sm tracking-widest uppercase">BARRIO EL TRIGAL</h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="bg-black/50 hover:bg-black/80 text-gray-400 hover:text-white rounded-full p-1.5 border border-gray-800 transition focus:outline-none cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Secondary navigation for mobile drawers */}
            <div className="space-y-1 text-xs font-semibold">
              <button
                onClick={() => { setActiveTab('alarma'); setMenuOpen(false); }}
                className="w-full text-left py-3 px-3 hover:bg-[#1a1a1a] rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
              >
                🚨 Central Alarma Vecinal
              </button>
              <button
                onClick={() => { setActiveTab('proyectos'); setMenuOpen(false); }}
                className="w-full text-left py-3 px-3 hover:bg-[#1a1a1a] rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
              >
                🧱 Proyectos del Barrio
              </button>
              <button
                onClick={() => { setActiveTab('eventos'); setMenuOpen(false); }}
                className="w-full text-left py-3 px-3 hover:bg-[#1a1a1a] rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
              >
                📆 Eventos programados
              </button>
              <button
                onClick={() => { setActiveTab('farmacias'); setMenuOpen(false); }}
                className="w-full text-left py-3 px-3 hover:bg-[#1a1a1a] rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
              >
                💊 Farmacias de Turno
              </button>
              <button
                onClick={() => { setActiveTab('negocios'); setMenuOpen(false); }}
                className="w-full text-left py-3 px-3 hover:bg-[#1a1a1a] rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
              >
                🍔 Negocios Locales
              </button>
              <button
                onClick={() => { setActiveTab('mascotas'); setMenuOpen(false); }}
                className="w-full text-left py-3 px-3 hover:bg-[#1a1a1a] rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
              >
                🐾 Mascotas Perdidas
              </button>
              <button
                onClick={() => { setActiveTab('afiliacion'); setMenuOpen(false); }}
                className="w-full text-left py-3 px-3 hover:bg-[#1a1a1a] rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
              >
                📝 Registro de Afiliados
              </button>
            </div>

            <div className="bg-black/40 border border-gray-900 rounded-xl p-4 space-y-2 text-[10px] text-gray-500 font-mono">
              <span className="text-white font-bold block">Contacto Directiva</span>
              <p>Presidente: Don Omar Castro</p>
              <p>📍 Sede: Av. Las Begonias N° 230</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. TOAST NOTIFICATION CONTAINER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full font-sans select-none pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-[#1a1a1a] border border-brand-yellow/30 text-white rounded-2xl p-4.5 shadow-2xl flex items-start space-x-3 animate-in slide-in-from-bottom-4 fade-in duration-200"
          >
            <div className="bg-brand-yellow/10 text-brand-yellow p-1.5 rounded-full shrink-0">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <p className="font-extrabold text-xs text-brand-yellow uppercase tracking-wide">{t.title}</p>
              <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
