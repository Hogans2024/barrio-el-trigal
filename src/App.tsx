import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Siren, LayoutGrid, Calendar, Users, Heart, Store, PlusSquare,
  Bell, Menu, X, Info, Activity, User, ChevronDown, Search, ChevronLeft, Newspaper, Pill, PawPrint, Building2, Phone, AlertTriangle
} from 'lucide-react';

// Sub-views
import AlarmaView from './components/AlarmaView';
import ProyectosView from './components/ProyectosView';
import EventosView from './components/EventosView';
import FarmaciasView from './components/FarmaciasView';
import NegociosView from './components/NegociosView';
import MascotasView from './components/MascotasView';
import AfiliacionView from './components/AfiliacionView';
import NoticiasView from './components/NoticiasView';
import { useSheetData } from './hooks/useSheetData';

// Cabecera global (avisos + perfil) migrada del proyecto origen.
// Reemplaza a la campana + drawer de `mockAlerts` y al área de perfil
// anteriores. Los avisos viven en `notices` (Notice[]); el sistema de
// toasts (addToast/onShowNotification) NO se toca (es un sistema distinto).
import NoticeDropdown from './components/NoticeDropdown';
import ProfileModal from './components/ProfileModal';
import { playTone } from './components/AudioSiren';
import { NOTICES, EMERGENCY_CONTACTS, CAROUSEL_SLIDES, QUICK_ACCESS_ITEMS, DEFAULT_VECINOS, ALARM_LOGS } from './data.alarma';
import { Notice } from './types.alarma';
import { Pharmacy, NeighborhoodEvent, LocalBusiness, LostPet, Project } from './types';

interface SearchResult {
  id: string;
  section: string;
  sectionLabel: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  matchField: string;
  relevance: number;
}

interface NotificationToast {
  id: string;
  title: string;
  message: string;
}

export default function App() {
  const { proyectos, eventos, farmacias, negocios, mascotas, noticias, loading, error } = useSheetData();
  const [activeTab, setActiveTab] = useState<string>('alarma');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const mainScrollRef = useRef<HTMLElement>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSearch = useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    setIsSearchFocused(false);
    setGlobalSearchQuery('');
  }, []);

  const [highlightCardId, setHighlightCardId] = useState<string | null>(null);
  const [isAfiliadoActionActive, setIsAfiliadoActionActive] = useState(false);
  const [navHistory, setNavHistory] = useState<string[]>(['alarma']);
  const backHandlerRef = useRef<(() => boolean) | null>(null);

  const registerBackHandler = useCallback((handler: (() => boolean) | null) => {
    backHandlerRef.current = handler;
  }, []);

  const navigateToTab = (tab: string) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    setIsSearchFocused(false);
    setGlobalSearchQuery('');
    setNavHistory(prev => prev[prev.length - 1] !== tab ? [...prev, tab] : prev);
    setActiveTab(tab);
  };

  const goBackTab = () => {
    if (backHandlerRef.current?.()) return;
    if (navHistory.length > 1) {
      const newHistory = [...navHistory];
      newHistory.pop();
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      setIsSearchFocused(false);
      setGlobalSearchQuery('');
      setActiveTab(newHistory[newHistory.length - 1]);
      setNavHistory(newHistory);
    }
  };

  const sectionIcons: Record<string, React.ReactNode> = {
    farmacias: <Pill className="h-4 w-4 text-emerald-400" />,
    mascotas: <PawPrint className="h-4 w-4 text-orange-400" />,
    eventos: <Calendar className="h-4 w-4 text-blue-400" />,
    negocios: <Store className="h-4 w-4 text-yellow-400" />,
    proyectos: <LayoutGrid className="h-4 w-4 text-purple-400" />,
    noticias: <Newspaper className="h-4 w-4 text-red-400" />,
    alarma: <AlertTriangle className="h-4 w-4 text-amber-400" />,
  };

  const getSectionLabel = (s: string) => {
    const map: Record<string, string> = {
      farmacias: 'Farmacias',
      mascotas: 'Mascotas Perdidas',
      eventos: 'Eventos',
      negocios: 'Negocios Locales',
      proyectos: 'Proyectos',
      noticias: 'Noticias',
      alarma: 'Central Alarma',
    };
    return map[s] ?? s;
  };

  const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const searchResults = useMemo<SearchResult[]>(() => {
    const q = normalize(globalSearchQuery);
    if (!q || q.length < 1) return [];

    const results: SearchResult[] = [];
    const addIfMatch = (section: string, id: string, title: string, desc: string, fields: string[]) => {
      const lowerTitle = normalize(title);
      const lowerDesc = normalize(desc);
      const lowerQuery = q;
      for (const f of fields) {
        const lf = normalize(f);
        if (lowerTitle.includes(lf) || lowerDesc.includes(lf)) {
          const relevance = calcRelevance(lowerTitle, lowerDesc, lowerQuery, lf);
          results.push({
            id,
            section,
            sectionLabel: getSectionLabel(section),
            icon: sectionIcons[section] ?? null,
            title,
            description: desc.length > 100 ? desc.slice(0, 100) + '…' : desc,
            matchField: f,
            relevance,
          });
          return;
        }
      }
    };

    const calcRelevance = (lowerTitle: string, lowerDesc: string, query: string, matchField: string): number => {
      let score = 0;
      if (lowerTitle === query) score += 100;
      else if (lowerTitle.startsWith(query)) score += 80;
      else if (lowerTitle.includes(query)) score += 60;
      else if (lowerDesc.includes(query)) score += 40;
      else score += 20;
      if (matchField === query) score += 15;
      return score;
    };

    // Farmacias
    farmacias.forEach((p: Pharmacy) =>
      addIfMatch('farmacias', p.id, p.name, p.description, [q, p.name, p.address, p.phone, p.neighborhood].filter(Boolean))
    );

    // Mascotas
    mascotas.forEach((m: LostPet) =>
      addIfMatch('mascotas', m.id, m.name, m.description, [q, m.name, m.type, m.neighborhood, m.lastSeen, m.contact].filter(Boolean))
    );

    // Eventos
    eventos.forEach((e: NeighborhoodEvent) =>
      addIfMatch('eventos', e.id, e.title, e.description, [q, e.title, e.category, e.location].filter(Boolean))
    );

    // Negocios
    negocios.forEach((b: LocalBusiness) =>
      addIfMatch('negocios', b.id, b.name, b.description, [q, b.name, b.category, b.phone, b.address].filter(Boolean))
    );

    // Proyectos
    proyectos.forEach((pr: Project) =>
      addIfMatch('proyectos', pr.id, pr.title, pr.description, [q, pr.title, pr.location].filter(Boolean))
    );

    // Noticias
    noticias.forEach((n: NeighborhoodEvent) =>
      addIfMatch('noticias', n.id, n.title, n.description, [q, n.title, n.category, n.location].filter(Boolean))
    );

    // Alarma — contactos
    EMERGENCY_CONTACTS.forEach((c) =>
      addIfMatch('alarma', `emergencia-${c.id}`, c.name, `${c.name} — Tel: ${c.number}`, [q, c.name, c.number].filter(Boolean))
    );

    // Alarma — vecinos
    DEFAULT_VECINOS.forEach((v, i) =>
      addIfMatch('alarma', `vecino-${i}`, v.nombre, `${v.calle} | CI: ${v.ci} | Cel: ${v.celular}`, [q, v.nombre, v.ci, v.celular, v.calle].filter(Boolean))
    );

    // Alarma — logs
    ALARM_LOGS.forEach((l) =>
      addIfMatch('alarma', `log-${l.id}`, l.user, `Tipo: ${l.type} | ${l.timestamp}`, [q, l.user, l.type].filter(Boolean))
    );

    // Alarma — carrusel
    CAROUSEL_SLIDES.forEach((s) =>
      addIfMatch('alarma', `slide-${s.id}`, s.title, s.description, [q, s.title, s.subtitle].filter(Boolean))
    );

    // Alarma — acceso rápido
    QUICK_ACCESS_ITEMS.forEach((qa) =>
      addIfMatch('alarma', `qa-${qa.id}`, qa.title, qa.subtitle, [q, qa.title, qa.subtitle].filter(Boolean))
    );

    results.sort((a, b) => b.relevance - a.relevance);
    return results.slice(0, 20);
  }, [globalSearchQuery, farmacias, mascotas, eventos, negocios, proyectos, noticias]);

  // Click outside: hide results immediately, clear text after 60s
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
        if (!searchTimeoutRef.current) {
          searchTimeoutRef.current = setTimeout(() => {
            setGlobalSearchQuery('');
            searchTimeoutRef.current = null;
          }, 20000);
        }
      } else {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = null;
        }
      }
    }
    if (isSearchFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchFocused]);

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
    if (title === 'Sistema' && window.innerWidth < 1024) return;
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
      case 'noticias': return 'Noticias del Barrio';
      case 'afiliacion': return 'Registro de Afiliados';
      default: return 'Barrio El Trigal';
    }
  };

  // Listen for floating button navigation events
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      setIsSearchFocused(false);
      setGlobalSearchQuery('');
      setActiveTab(customEvent.detail);
      setNavHistory(prev => prev[prev.length - 1] !== customEvent.detail ? [...prev, customEvent.detail] : prev);
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

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
              src={`${import.meta.env.BASE_URL}logo_01.svg`} 
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
              { id: 'noticias', icon: Newspaper, label: 'Noticias' },
              { id: 'afiliacion', icon: Users, label: 'Registro Afiliados' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToTab(item.id)}
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
        <header className="relative z-30 bg-[#070707]/85 px-5 py-0 flex items-center shrink-0 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)] will-change-transform">
          
          {/* Left: Back button with text (non-Alarma, excepto cuando hay sub-acción activa en Afiliación) / Logo (Alarma) */}
          <div className={`${activeTab === 'alarma' ? 'flex-none' : 'flex-1'} flex justify-start items-center`}>
            {activeTab !== 'alarma' && !(activeTab === 'afiliacion' && isAfiliadoActionActive) ? (
              <button
                onClick={goBackTab}
                className="flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 -ml-4 rounded-full bg-gradient-to-b from-[#1a1a1d] to-[#0C0C0E] border border-[#2a3547] hover:border-[#686D75] cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 shadow-lg shadow-black/40"
                title="Volver"
              >
                <ChevronLeft className="w-[18px] h-[18px] text-[#D1D5DB]" />
                <span className="text-[11px] text-[#D1D5DB] font-semibold font-sans">Volver Atrás</span>
              </button>
            ) : (
              activeTab === 'alarma' && (
                <>
                  <div className="flex items-center space-x-2.5 md:hidden">
                      <span>
                      <img 
                        src={`${import.meta.env.BASE_URL}logo_01.svg`} 
                        alt="Logo Barrio El Trigal" 
                        className="w-[45px] h-[45px] md:w-12 md:h-12 object-contain drop-shadow-md"
                      />
                    </span>
                    <div className="relative">
                      <div className="flex flex-col space-y-[2px]">
                        <span className="text-[#FFD700] text-[11px] uppercase font-mono block tracking-[0.15em] font-bold leading-none">BARRIO</span>
                        <h2 className="text-white text-base font-extrabold tracking-tight leading-none">El Trigal</h2>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-brand-green animate-pulse" />
                    <span className="text-gray-400 text-sm font-mono">Panel Seccional:</span>
                    <span className="text-white font-mono font-bold text-sm uppercase">{currentTabTitle()}</span>
                  </div>
                </>
              )
            )}
          </div>

          {/* Center: Logo (mobile) / Title (desktop) — only for non-Alarma */}
          {activeTab !== 'alarma' && (
            <div className="flex-1 flex justify-center items-center -ml-[125px]">
                <div className="flex items-center space-x-2.5 md:hidden">
                  <span className="img-float">
                    <img 
                      src={`${import.meta.env.BASE_URL}logo_01.svg`} 
                      alt="Logo Barrio El Trigal" 
                      className="w-[45px] h-[45px] md:w-12 md:h-12 object-contain drop-shadow-md"
                    />
                  </span>
                  <div className="relative">
                  <div className="flex flex-col space-y-[2px]">
                    <span className="text-[#FFD700] text-[11px] uppercase font-mono block tracking-[0.15em] font-bold leading-none">BARRIO</span>
                    <h2 className="text-white text-base font-extrabold tracking-tight leading-none">El Trigal</h2>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Activity className="h-5 w-5 text-brand-green animate-pulse" />
                <span className="text-gray-400 text-sm font-mono">Panel Seccional:</span>
                <span className="text-white font-mono font-bold text-sm uppercase">{currentTabTitle()}</span>
              </div>
            </div>
          )}

          {/* Right controls */}
          <div className={`flex items-center justify-end ${activeTab === 'alarma' ? 'flex-1' : ''} ${isSearchFocused ? 'ml-0 space-x-0' : activeTab === 'alarma' ? 'ml-3 space-x-1.5' : 'space-x-1.5'}`}>
            {/* Search bar (Mobile only) — solo visible en Alarma, busca en todas las secciones */}
            {activeTab === 'alarma' && (
            <div ref={searchRef} className={`md:hidden relative ${isSearchFocused ? 'flex-1 -mr-5' : 'flex-1 max-w-[200px]'}`}>
              <div className={`flex items-center w-full bg-black/60 border border-gray-800 ${isSearchFocused ? 'rounded-l-xl rounded-r-none border-r-0' : 'rounded-xl'} px-2 py-1.5`}>
                <Search className="h-4 w-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar en todo…"
                  className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-xs ml-1.5 font-sans placeholder:text-white/30"
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                {globalSearchQuery === '' ? (
                  <span className="text-[11px] font-sans text-white/30 ml-1 shrink-0">Buscar</span>
                ) : (
                  <button 
                    onClick={() => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); setGlobalSearchQuery(''); setIsSearchFocused(false); }}
                    className="ml-2 px-3 py-1 text-[10px] font-bold text-gray-400 border border-gray-400 rounded-lg hover:bg-white/5 transition-colors uppercase shrink-0"
                  >
                    BUSCAR
                  </button>
                )}
              </div>

              {isSearchFocused && (searchResults.length > 0 || globalSearchQuery.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c101d] border border-white/10 rounded-2xl shadow-xl z-50 animate-fade-in max-h-[70vh] overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="px-4 py-8 text-center text-xs text-gray-500">
                      No se encontraron resultados para <span className="text-gray-400 font-semibold">"{globalSearchQuery}"</span>
                    </div>
                  ) : (
                    (() => {
                      const grouped: Record<string, SearchResult[]> = {};
                      searchResults.forEach((r) => {
                        if (!grouped[r.section]) grouped[r.section] = [];
                        grouped[r.section].push(r);
                      });
                      const sortedSections = Object.keys(grouped).sort((a, b) =>
                        grouped[b][0].relevance - grouped[a][0].relevance
                      );
                      return (
                        <div className="py-2">
                          {sortedSections.map((sec) => {
                            const items = grouped[sec];
                            return (
                              <div key={sec}>
                                <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-white/5">
                                  {sectionIcons[sec] ?? null}
                                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">{getSectionLabel(sec)}</span>
                                  <span className="text-[10px] text-gray-600 font-mono ml-auto">{items.length}</span>
                                </div>
                                {items.map((r) => (
                                  <button
                                    key={`${r.section}-${r.id}`}
                                    onClick={() => {
                                      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                                      setGlobalSearchQuery('');
                                      setIsSearchFocused(false);
                                      setHighlightCardId(`${r.section}::${r.id}`);
                                      setActiveTab(r.section);
                                      setNavHistory(prev => prev[prev.length - 1] !== r.section ? [...prev, r.section] : prev);
                                    }}
                                    className="w-full text-left px-4 py-2.5 hover:bg-white/[0.03] transition cursor-pointer border-b border-white/[0.02] last:border-b-0"
                                  >
                                    <div className="text-xs font-semibold text-white truncate">{r.title}</div>
                                    <div className="text-[11px] text-gray-400 leading-snug mt-0.5 line-clamp-2">{r.description}</div>
                                  </button>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()
                  )}
                </div>
              )}
            </div>
            )}

            {/* Notifications bell → NoticeDropdown (cabecera global migrada) */}
            <div className={`relative ${isSearchFocused ? 'hidden' : ''}`}>
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
            </div>

            {/* Profile trigger → ProfileModal (cabecera global migrada) */}
            <button
              onClick={() => { playTone(500, 50); setIsProfileOpen(true); }}
              className={`hidden md:flex items-center space-x-2.5 cursor-pointer hover:opacity-80 transition-all focus:outline-none bg-black/40 rounded-xl border border-gray-800 hover:border-gray-600 p-1.5 md:pr-3 ${isSearchFocused ? 'hidden' : ''}`}
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
              className={`md:hidden p-1.5 text-gray-400 hover:text-white transition focus:outline-none cursor-pointer bg-black/40 rounded-xl border border-gray-800 hover:border-gray-600 ${isSearchFocused ? 'hidden' : ''}`}
            >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
          </div>
        </header>

        {/* Central scrolling panel area */}
        <main ref={mainScrollRef} className={`flex-1 overflow-y-auto px-4 scrollbar-none relative w-full pb-28 md:pb-8 -mt-px ${isAfiliadoActionActive ? 'pt-0 md:pt-0 md:px-8' : 'py-6 md:p-8'}`}>
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
            {activeTab === 'alarma' && <AlarmaView onNavigate={navigateToTab} onShowNotification={addToast} />}
            {activeTab === 'proyectos' && <ProyectosView projects={proyectos} highlightId={highlightCardId} onClearHighlight={() => setHighlightCardId(null)} onRegisterBackHandler={registerBackHandler} />}
            {activeTab === 'eventos' && <EventosView eventos={eventos} onShowNotification={addToast} highlightId={highlightCardId} onClearHighlight={() => setHighlightCardId(null)} />}
            {activeTab === 'farmacias' && <FarmaciasView farmacias={farmacias} onShowNotification={addToast} highlightId={highlightCardId} onClearHighlight={() => setHighlightCardId(null)} />}
            {activeTab === 'negocios' && <NegociosView negocios={negocios} onShowNotification={addToast} highlightId={highlightCardId} onClearHighlight={() => setHighlightCardId(null)} />}
            {activeTab === 'mascotas' && <MascotasView mascotas={mascotas} onShowNotification={addToast} highlightId={highlightCardId} onClearHighlight={() => setHighlightCardId(null)} onRegisterBackHandler={registerBackHandler} />}
            {activeTab === 'noticias' && <NoticiasView noticias={noticias} onShowNotification={addToast} highlightId={highlightCardId} onClearHighlight={() => setHighlightCardId(null)} />}
            {activeTab === 'afiliacion' && <AfiliacionView onShowNotification={addToast} onAfiliadoActionChange={setIsAfiliadoActionActive} />}
              </>
            )}
          </div>
        </main>
      </div>

      {/* -------------------- BOTTOM NAVIGATION BAR (MOBILE ONLY) -------------------- */}
      <nav id="bottom-nav" className="md:hidden fixed bottom-0 inset-x-0 bg-black/95 backdrop-blur-xl border-t border-gray-900/80 px-2 py-1.5 tall:py-3 flex justify-around items-center z-40">
        <div className="w-full max-w-md mx-auto flex justify-around items-center">
          <button onClick={() => navigateToTab('alarma')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'alarma' ? 'text-brand-yellow scale-110' : 'text-white'}`}>
            <Siren className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Alarma</span>
          </button>
          <button onClick={() => navigateToTab('proyectos')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'proyectos' ? 'text-brand-yellow scale-110' : 'text-white'}`}>
            <LayoutGrid className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Proyectos</span>
          </button>
          <button onClick={() => navigateToTab('eventos')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'eventos' ? 'text-brand-yellow scale-110' : 'text-white'}`}>
            <Calendar className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Eventos</span>
          </button>
          <button onClick={() => navigateToTab('noticias')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'noticias' ? 'text-brand-yellow scale-110' : 'text-white'}`}>
            <Newspaper className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Noticias</span>
          </button>
          <button onClick={() => navigateToTab('afiliacion')} className={`flex flex-col items-center p-1 tall:p-2 focus:outline-none transition cursor-pointer select-none ${activeTab === 'afiliacion' ? 'text-brand-yellow scale-110' : 'text-white'}`}>
            <Users className="h-5 w-5 tall:h-6 tall:w-6 mb-0.5 tall:mb-1" />
            <span className="text-[9px] tall:text-[10px] font-bold tracking-tight">Afiliación</span>
          </button>
        </div>
      </nav>

      {/* 3. CREDENCIAL DIGITAL DE PERFIL (modal global, accesible desde cualquier pestaña) */}
      {/* Reemplaza al antiguo drawer de mockAlerts. La bandeja de avisos ahora */}
      {/* vive en el header vía NoticeDropdown (es un dropdown/hoja, no un drawer). */}
      <NoticeDropdown
        isOpen={isNoticeOpen}
        notices={notices}
        onMarkRead={handleMarkRead}
        onClearAll={handleClearNotices}
        onClose={() => setIsNoticeOpen(false)}
      />
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
              {[['alarma','🚨 Central Alarma Vecinal'],['proyectos','🧱 Proyectos del Barrio'],['eventos','📆 Eventos programados'],['noticias','📰 Noticias'],['farmacias','💊 Farmacias de Turno'],['negocios','🍔 Negocios Locales'],['mascotas','🐾 Mascotas Perdidas'],['afiliacion','📝 Registro de Afiliados']].map(([id,label]) => (
                <button key={id} onClick={() => { navigateToTab(id); setMenuOpen(false); }} className="w-full text-left py-3.5 px-4 hover:bg-[#1a1a1a] rounded-xl text-gray-300 hover:text-white transition cursor-pointer">{label}</button>
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
