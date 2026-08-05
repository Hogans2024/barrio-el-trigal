import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { Search, Calendar, MapPin, Users, HeartHandshake, HelpCircle, Heart, MessageCircle, X, Eye, LayoutGrid, CheckCircle, PanelLeft, Pill, PawPrint, Store, Phone, Building2, Home, Newspaper, Trophy, Briefcase, Bus, Globe, Cpu, Zap, Images, FileText, UserCircle2, IdCard } from 'lucide-react';
import { NeighborhoodEvent } from '../types';
import { useIncrementalBatch } from '../hooks/useIncrementalBatch';

// CAPA 2 (futuro, no implementado): compresión/redimensionado de imágenes en el
// navegador del usuario antes de subirlas, para reducir peso de archivo en origen.
// CAPA 3 (futuro, no implementado): migración de almacenamiento/entrega de imágenes a
// Cloudinary (plan gratuito). Subida directa desde el navegador vía "unsigned upload
// preset" (sin pasar por Apps Script), y URLs servidas con parámetros f_auto (formato
// automático WebP/AVIF) y q_auto (compresión automática) vía su CDN.

interface EventosViewProps {
  eventos: NeighborhoodEvent[];
  onShowNotification: (title: string, message: string) => void;
  highlightId?: string | null;
  onClearHighlight?: () => void;
}

export default function EventosView({ eventos, onShowNotification, highlightId, onClearHighlight }: EventosViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeEvent, setActiveEvent] = useState<NeighborhoodEvent | null>(null);
  const [subscribedEvents, setSubscribedEvents] = useState<Record<string, boolean>>({});
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [viewMode, setViewMode] = useState<string>('eventos');
  const [showViewModal, setShowViewModal] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem('barrio_eventos_likes') || '{}'); } catch { return {}; }
  });
  const [portraitEvents, setPortraitEvents] = useState<Record<string, boolean>>({});
  const [squareEvents, setSquareEvents] = useState<Record<string, boolean>>({});
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const touchState = useRef({ dist: 0, midX: 0, midY: 0, panX: 0, panY: 0, scale: 1 });
  const barRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [showFloatingBtns, setShowFloatingBtns] = useState(false);
  const [stickyBarWidth, setStickyBarWidth] = useState(0);

  useEffect(() => {
    localStorage.setItem('barrio_eventos_likes', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => { setZoomScale(1); setZoomPos({ x: 0, y: 0 }); }, [fullscreenImg]);

  useEffect(() => {
    if (!highlightId || !onClearHighlight) return;
    const id = highlightId.split('::')[1];
    if (!id) return;
    const match = eventos.find((e) => e.id === id);
    if (match) setActiveEvent(match);
    onClearHighlight();
  }, [highlightId]);

  useEffect(() => {
    const t2 = setTimeout(() => setShimmer(true), 2900);
    const t3 = setTimeout(() => setShimmer(false), 7900);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingBtns(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showFloatingBtns) return;
    const el = buttonsRef.current;
    if (!el) return;
    const measure = () => setStickyBarWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [showFloatingBtns]);

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const stickyBarRef = useRef<HTMLDivElement>(null);
  const [stickyBarHeight, setStickyBarHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useLayoutEffect(() => {
    if (!showFloatingBtns) return;
    const el = stickyBarRef.current;
    if (!el) return;
    setStickyBarHeight(el.offsetHeight);
    const ro = new ResizeObserver(() => setStickyBarHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [showFloatingBtns]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const categoryLabels: Record<string, string> = {
    Todos: 'Todas', Comunidad: 'Comunidad', Salud: 'Salud', Medio: 'Medio Ambiente',
  };

  const categories = Object.keys(categoryLabels);

  const categoryIcons: Record<string, React.ReactNode> = {
    Todos: <LayoutGrid className="w-4 h-4" />,
    Comunidad: <Users className="w-4 h-4" />,
    Salud: <HeartHandshake className="w-4 h-4" />,
    Medio: <HelpCircle className="w-4 h-4" />,
  };

  const viewOptions = [
    { id: 'eventos', label: 'Vista Rápida', icon: <Zap className="w-4 h-4" /> },
    { id: 'proyectos', label: 'Vista Galería', icon: <Images className="w-4 h-4" /> },
    { id: 'farmacias', label: 'Vista Ficha Técnica', icon: <FileText className="w-4 h-4" /> },
    { id: 'mascotas', label: 'Vista Perfil', icon: <UserCircle2 className="w-4 h-4" /> },
    { id: 'negocios', label: 'Vista Tarjeta', icon: <IdCard className="w-4 h-4" /> },
  ];

  const filteredEvents = useMemo(() => eventos.filter((evt) => {
    const matchesSearch = evt.title.toLowerCase().includes(search.toLowerCase()) ||
                          evt.description.toLowerCase().includes(search.toLowerCase());
    
    let matchesCategory = false;
    if (selectedCategory === 'Todos') {
      matchesCategory = true;
    } else if (selectedCategory === 'Medio') {
      matchesCategory = evt.category === 'Medio';
    } else {
      matchesCategory = evt.category.toLowerCase() === selectedCategory.toLowerCase();
    }

    return matchesSearch && matchesCategory;
  }), [eventos, search, selectedCategory]);

  // Carga incremental: solo monta `batchSize` tarjetas a la vez (Capa 1 — render)
  const { visibleItems: visibleEvents, sentinelRef: batchSentinelRef, hasMore } = useIncrementalBatch(filteredEvents);

  const handleSubscribe = (id: string, name: string) => {
    const nextStatus = !subscribedEvents[id];
    setSubscribedEvents(prev => ({
      ...prev,
      [id]: nextStatus
    }));

    if (nextStatus) {
      onShowNotification(
        '🔔 Inscripción Confirmada',
        `Te has suscrito para recibir recordatorios prácticos sobre el evento: "${name}".`
      );
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'trash': return <div className="text-rose-400 bg-rose-500/10 p-2.5 rounded-lg shrink-0"><Calendar className="h-5 w-5" /></div>;
      case 'users': return <div className="text-[#22c55e] bg-[#22c55e]/10 p-2.5 rounded-lg shrink-0"><Users className="h-5 w-5" /></div>;
      case 'gift': return <div className="text-amber-400 bg-amber-500/10 p-2.5 rounded-lg shrink-0"><HeartHandshake className="h-5 w-5" /></div>;
      case 'heart-pulse': return <div className="text-blue-400 bg-blue-500/10 p-2.5 rounded-lg shrink-0"><Eye className="h-5 w-5" /></div>;
      default: return <div className="text-[#FFD700] bg-[#FFD700]/10 p-2.5 rounded-lg shrink-0"><HelpCircle className="h-5 w-5" /></div>;
    }
  };

  return (
    <div className="flex flex-col space-y-5 relative">
      <div ref={sentinelRef} className="absolute top-0 left-0 w-px h-px pointer-events-none" />
      {/* Header title */}
      <div className="-mt-[16px]">
        <h2 className="text-gray-400 text-sm font-bold tracking-tight">Eventos del Barrio:</h2>
        <p className="text-gray-400 text-xs mt-0">
          Participa y disfruta de los eventos que fortalecen la unión y el bienestar de nuestra comunidad.
        </p>
        <style>{`
          @keyframes beam-sweep {
            0% { transform: translate(0, 0); opacity: 0.65; }
            100% { transform: translate(-220%, 35%); opacity: 0; }
          }
          .shimmer-beam {
            position: absolute;
            top: -15%;
            right: 0;
            width: 75%;
            height: 130%;
            pointer-events: none;
            border-radius: 9999px;
          }
          .shimmer-beam.buttons {
            background: linear-gradient(135deg, transparent 15%, rgba(255,215,0,0.08) 35%, rgba(255,215,0,0.18) 50%, rgba(255,215,0,0.08) 65%, transparent 85%);
            animation: beam-sweep 2.5s ease-out 2;
          }
        `}</style>
      </div>

      {/* Search + Category Bar — sticky wrapper */}
      <div
        ref={stickyBarRef}
        className="z-10 -mt-[7px]"
        style={{ position: 'sticky', top: '-1.5rem', background: '#070707', marginLeft: '-1rem', marginRight: '-1rem', paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {showFloatingBtns ? (
          /* ── Sticky layout: 4 buttons + search bar below ── */
          <div className="flex flex-col items-center">
            <div className={`w-full pt-1.5 pb-1 flex items-center ${isMobile ? '' : 'justify-center'}`}>
              <div ref={buttonsRef} className={`flex items-center flex-nowrap ${isMobile ? 'w-full justify-between gap-0' : 'justify-center'}`} style={!isMobile ? { gap: 'clamp(4px, calc((100vw - 320px) / 12), 19px)' } : undefined}>
                {shimmer && <div className="shimmer-beam buttons" />}
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="relative inline-flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40"
                >
                  <span>Categorías</span>
                </button>
                <div
                  onClick={() => setShowCategoryModal(true)}
                  className="relative inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                >
                  {categoryIcons[selectedCategory]}
                  <span>{selectedCategory === 'Medio' ? 'Medio Ambiente' : selectedCategory === 'Todos' ? 'Todas' : selectedCategory}</span>
                  {selectedCategory !== 'Todos' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedCategory('Todos'); }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition"
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowViewModal(true)}
                  className="relative inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-pointer border bg-blue-500/10 text-blue-400 border-blue-500/40 hover:bg-blue-500/20"
                >
                  {viewOptions.find(v => v.id === viewMode)?.icon}
                  <span>Vista</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar eventos..."]');
                    el?.focus();
                  }}
                  className="relative inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-pointer border bg-gray-500/10 text-gray-400 border-gray-500/40 hover:bg-gray-500/20"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Buscar</span>
                </button>
              </div>
            </div>
            <div className={`pb-1.5 ${isMobile ? 'w-full' : ''}`} style={{ width: isMobile ? undefined : stickyBarWidth > 0 ? stickyBarWidth : undefined }}>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-300" />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar eventos..."
                  className="w-full bg-[#080a0f] text-white pl-10 pr-4 py-1.5 rounded-xl border border-white/10 text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#FFD700] transition"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ── Normal layout: search bar + 3 buttons ── */
          <div className="relative">
            <div className="relative transition-all duration-300 ease-out">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-300" />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar eventos..."
                  className="w-full bg-[#080a0f] text-white pl-10 pr-4 py-1.5 rounded-xl border border-white/10 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#FFD700] transition"
                />
              </div>
            </div>
            <div ref={barRef} className="relative mt-2 flex items-center justify-center flex-nowrap" style={{ gap: 'clamp(4px, calc((100vw - 320px) / 12), 19px)' }}>
              {shimmer && <div className="shimmer-beam buttons" />}
              <button
                onClick={() => setShowCategoryModal(true)}
                className="relative inline-flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Categorías</span>
              </button>
              <div
                onClick={() => setShowCategoryModal(true)}
                className="relative inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
              >
                {categoryIcons[selectedCategory]}
                <span>{categoryLabels[selectedCategory] || selectedCategory}</span>
                {selectedCategory !== 'Todos' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedCategory('Todos'); }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition"
                  >
                    <X className="w-2.5 h-2.5 text-white" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowViewModal(true)}
                className="relative inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-pointer border bg-blue-500/10 text-blue-400 border-blue-500/40 hover:bg-blue-500/20"
              >
                {viewOptions.find(v => v.id === viewMode)?.icon}
                <span>Vista</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Selection Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-xs overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="p-4 bg-[#FFD700]/10 text-[#FFD700] border-b border-[#FFD700]/20 flex justify-between items-center">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <PanelLeft className="w-4 h-4" />
                <span>Cambiar Vista</span>
              </h4>
              <button onClick={() => setShowViewModal(false)} className="hover:opacity-75 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 space-y-1">
              {viewOptions.map((opt) => {
                const isActive = viewMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setViewMode(opt.id);
                      setShowViewModal(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                      isActive
                        ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-transparent'
                    }`}
                  >
                    <span className="shrink-0">{opt.icon}</span>
                    <span>{opt.label}</span>
                    {isActive && <CheckCircle className="w-3.5 h-3.5 ml-auto text-current" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-xs overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="p-4 bg-[#FFD700]/10 text-[#FFD700] border-b border-[#FFD700]/20 flex justify-between items-center">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                <span>Categorías</span>
              </h4>
              <button onClick={() => setShowCategoryModal(false)} className="hover:opacity-75 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 space-y-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const displayName = cat === 'Todos' ? 'Todas las categorías' : categoryLabels[cat] || cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryModal(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                      isActive
                        ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-transparent'
                    }`}
                  >
                    <span>{displayName}</span>
                    {isActive && <CheckCircle className="w-3.5 h-3.5 ml-auto text-current" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Event Cards Section */}
      <div ref={cardsContainerRef} className="space-y-4 -mt-[4px]">
        {visibleEvents.map((evt) => {
          // Vista tipo Proyectos (split horizontal)
          if (viewMode === 'proyectos') {
            return (
              <div
                key={evt.id}
                className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex h-[145px] tall:h-[165px] group"
              >
                <div onClick={() => setActiveEvent(evt)} className="w-[55%] tall:w-[38%] h-full bg-gray-950 overflow-hidden shrink-0 cursor-pointer">
                  <img src={evt.imageUrl} alt={evt.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="w-[45%] tall:w-[62%] p-2 tall:p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1.5 mb-1.5">
                      <h3 className="text-white text-sm font-bold leading-tight group-hover:text-[#FFD700] transition line-clamp-2">{evt.title}</h3>
                    </div>
                    <p className="text-gray-300 text-[10px] tall:text-[11px] leading-[1.4] line-clamp-3 tall:line-clamp-4">{evt.description}</p>
                  </div>
                  <div className="flex items-center justify-end mt-2 w-full">
                    <span onClick={() => setActiveEvent(evt)} className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] tall:text-[11px] font-bold px-[5px] tall:px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 transition border border-[#FFD700]/40 cursor-pointer shrink-0 text-center inline-block">
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Vista tipo Farmacias (header image + specs list)
          if (viewMode === 'farmacias') {
            return (
              <div
                key={evt.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <img src={evt.imageUrl} alt={evt.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#080a0f] to-transparent h-16 pointer-events-none" />
                </div>
                <div className="p-4 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{evt.title}</h3>
                    <span className="bg-[#22c55e]/40 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-[#22c55e]/40 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {evt.category === 'Medio' ? 'Medio Ambiente' : evt.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">{evt.description}</p>
                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                    <div className="flex items-center space-x-2.5 text-gray-300">
                      <MapPin className="h-4 w-4 text-[#22c55e] shrink-0" />
                      <span className="font-mono text-[11px]">Barrio El Trigal</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-gray-400">
                      <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
                      <span className="font-mono text-[11px]">Sábado, 24 de Mayo de 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Vista tipo Mascotas (header image + contact)
          if (viewMode === 'mascotas') {
            return (
              <div
                key={evt.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition"
              >
                <div onClick={() => setActiveEvent(evt)} className="relative h-44 w-full bg-slate-900 overflow-hidden cursor-pointer">
                  <img src={evt.imageUrl} alt={evt.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-200" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white text-base font-bold tracking-tight">{evt.title}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{evt.description}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 text-[10px] font-extrabold px-2.5 py-1 rounded [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">{evt.category === 'Medio' ? 'Medio Ambiente' : evt.category}</span>
                    <span onClick={() => setActiveEvent(evt)} className="bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] font-extrabold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 border border-[#FFD700]/40 transition cursor-pointer">
                      <Phone className="h-3.5 w-3.5" />
                      <span>Ver Detalles</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Vista tipo Negocios (header image + category + action)
          if (viewMode === 'negocios') {
            return (
              <div
                key={evt.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex flex-col group"
              >
                <div onClick={() => setActiveEvent(evt)} className="relative h-44 w-full bg-slate-900 overflow-hidden cursor-pointer">
                  <img src={evt.imageUrl} alt={evt.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{evt.title}</h3>
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 font-extrabold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {evt.category === 'Medio' ? 'Medio Ambiente' : evt.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed max-h-16 line-clamp-2">{evt.description}</p>
                  <div className="pt-2 border-t border-white/5 mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 font-mono text-[#22c55e]">
                      <MapPin className="h-3.5 w-3.5 text-[#22c55e] shrink-0" />
                      <span>Barrio El Trigal</span>
                    </div>
                    <span onClick={() => setActiveEvent(evt)} className="bg-[#FFD700]/10 text-[#FFD700] font-bold px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer">
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Default: Eventos view (nuevo diseño tipo Mascotas)
          return (
            <div
              key={evt.id}
              className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition group"
            >
              {/* Header: título + descripción ANTES de la imagen */}
              <div className="px-[10px] pt-[10px] pb-[6px] flex space-x-3 items-start">
                {getIcon(evt.icon)}

                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-bold tracking-tight mb-0.5 group-hover:text-[#FFD700] transition truncate">
                    {evt.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Imagen con soporte de formatos 1:1 / 16:9 / 9:16 */}
              <div
                className={`relative ${portraitEvents[evt.id] ? 'h-[264px]' : squareEvents[evt.id] ? 'aspect-square' : 'h-36'} w-full bg-slate-900 overflow-hidden cursor-pointer`}
                onClick={() => setActiveEvent(evt)}
                style={{ clipPath: 'inset(0)' }}
              >
                {portraitEvents[evt.id] && (
                  <>
                    <div className="absolute inset-0 bg-cover bg-center opacity-60 scale-110" style={{ backgroundImage: `url(${evt.imageUrl})` }} />
                    <div className="absolute inset-0 bg-white/[0.0075] backdrop-blur-[2px] border border-white/[0.0125] shadow-[inset_0_1px_0_rgba(255,255,255,0.0125)]" />
                  </>
                )}
                <img
                  src={evt.imageUrl}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className={`relative z-10 w-full h-full transition duration-500 ${portraitEvents[evt.id] ? 'object-contain' : 'object-cover group-hover:scale-105'}`}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const ratio = img.naturalWidth / img.naturalHeight;
                    if (ratio < 0.8) {
                      setPortraitEvents(prev => ({ ...prev, [evt.id]: true }));
                    } else if (ratio >= 0.8 && ratio <= 1.2) {
                      setSquareEvents(prev => ({ ...prev, [evt.id]: true }));
                    }
                  }}
                />
              </div>

              {/* Fila de botones */}
              <div className="flex items-center justify-center pt-[10px] pb-[11px] px-3 gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLikes(prev => ({ ...prev, [evt.id]: (prev[evt.id] || 0) + 1 }));
                  }}
                  className="px-2 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0 bg-white/5 text-gray-300 border border-white/10 hover:text-red-400 hover:border-red-400/40"
                >
                  <Heart className={`h-3.5 w-3.5 ${likes[evt.id] ? 'fill-red-400 text-red-400' : ''}`} />
                  <span>{likes[evt.id] || 0}</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="px-2 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0 bg-white/5 text-gray-300 border border-white/10 hover:text-sky-400 hover:border-sky-400/40"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEvent(evt);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap bg-white/5 text-gray-300 border border-white/10 hover:text-white shrink min-w-0"
                >
                  <Phone className="h-3 w-3" />
                  <span>Contactar</span>
                </button>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEvent(evt);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold transition flex items-center justify-center gap-1 whitespace-nowrap bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 cursor-pointer shrink min-w-0"
                >
                  Ver Detalles
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="px-2 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0 bg-white/5 text-gray-300 border border-white/10 hover:text-sky-400 hover:border-sky-400/40"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" overflow="visible" style={{ transform: 'scale(1.25)', transformOrigin: 'center' }}><path d="M12 5l7 7-7 7v-4c-5 0-8 3-9 6 1.5-4.5 4-9 9-10V5z"/></svg>
                </button>
              </div>
            </div>
          );
        })}

        {/* Sentinela de carga incremental — SIEMPRE montado para evitar loop mount/unmount del observer */}
        <div ref={batchSentinelRef} className="w-full h-4" aria-hidden="true" />

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No se encontraron eventos programados para esta búsqueda.
          </div>
        )}
      </div>

      {/* Event Details Expanded Modal */}
      {activeEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4">
          <div className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-md overflow-y-auto max-h-full animate-in fade-in zoom-in duration-200">
            <div className="relative h-44 bg-gray-950">
              <img
                src={activeEvent.imageUrl}
                alt={activeEvent.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onClick={() => setFullscreenImg(activeEvent.imageUrl)}
                onDoubleClick={() => setFullscreenImg(activeEvent.imageUrl)}
              />
              <button
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#FFD700]/10 text-[#FFD700] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide border border-[#FFD700]/40">
                  {activeEvent.category === 'Medio' ? 'Medio Ambiente' : activeEvent.category}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4 pb-16 sm:pb-5">
              <h4 className="text-white text-xl font-bold tracking-tight">{activeEvent.title}</h4>

              <div>
                <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Descripción</h5>
                <p className="text-gray-300 text-xs leading-relaxed">{activeEvent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Fecha</h5>
                  <p className="text-white text-sm font-semibold flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[#FFD700] shrink-0" />
                    Sábado, 24 de Mayo de 2026
                  </p>
                </div>
                <div>
                  <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Lugar</h5>
                  <p className="text-white text-sm font-semibold flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#22c55e] shrink-0" />
                    Sede Vecinal - Plaza Principal El Trigal
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setActiveEvent(null)}
                  className="flex-1 bg-black text-gray-300 hover:text-white border border-white/10 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    handleSubscribe(activeEvent.id, activeEvent.title);
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    subscribedEvents[activeEvent.id]
                      ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'
                      : 'bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20 border border-[#FFD700]/40'
                  }`}
                >
                  {subscribedEvents[activeEvent.id] ? 'Inscripto ✓' : 'Anotarse al Evento'}
                </button>
                <button
                  onClick={() => {
                    const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar eventos..."]');
                    el?.focus();
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="relative inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold transition cursor-pointer border bg-gray-500/10 text-gray-400 border-gray-500/40 hover:bg-gray-500/20"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Buscar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen image viewer */}
      {fullscreenImg && (
        <div
          className="fixed left-0 right-0 z-[70] bg-black flex flex-col overflow-hidden"
          style={{ top: '3.5rem', bottom: '3.5rem' }}
          onTouchStart={(e) => {
            if (e.touches.length === 2) {
              const dx = e.touches[0].clientX - e.touches[1].clientX;
              const dy = e.touches[0].clientY - e.touches[1].clientY;
              const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
              const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
              touchState.current = { dist: Math.hypot(dx, dy), midX: mx, midY: my, panX: zoomPos.x, panY: zoomPos.y, scale: zoomScale };
            } else if (e.touches.length === 1 && zoomScale > 1) {
              touchState.current.midX = e.touches[0].clientX;
              touchState.current.midY = e.touches[0].clientY;
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length === 2) {
              e.preventDefault();
              const dx = e.touches[0].clientX - e.touches[1].clientX;
              const dy = e.touches[0].clientY - e.touches[1].clientY;
              const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
              const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
              const newDist = Math.hypot(dx, dy);
              const ratio = newDist / touchState.current.dist;
              const newScale = Math.max(1, Math.min(5, touchState.current.scale * ratio));
              const cx = touchState.current.midX;
              const cy = touchState.current.midY;
              setZoomPos({ x: touchState.current.panX + (mx - cx), y: touchState.current.panY + (my - cy) });
              setZoomScale(newScale);
              touchState.current.dist = newDist;
              touchState.current.midX = mx;
              touchState.current.midY = my;
              touchState.current.scale = newScale;
            } else if (e.touches.length === 1 && zoomScale > 1) {
              setZoomPos({ x: zoomPos.x + (e.touches[0].clientX - touchState.current.midX), y: zoomPos.y + (e.touches[0].clientY - touchState.current.midY) });
              touchState.current.midX = e.touches[0].clientX;
              touchState.current.midY = e.touches[0].clientY;
            }
          }}
          onTouchEnd={() => {
            if (zoomScale <= 1) setZoomPos({ x: 0, y: 0 });
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => { setFullscreenImg(null); setZoomScale(1); setZoomPos({ x: 0, y: 0 }); }}
              className="absolute top-[18px] right-[3px] bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition cursor-pointer z-[99]"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="w-full h-full flex items-center justify-center" style={{ transform: `translate(${zoomPos.x}px, ${zoomPos.y}px) scale(${zoomScale})` }}>
              <img
                src={fullscreenImg}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating quick-action buttons */}
      <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5 transition-all duration-300 ease-out ${
        showFloatingBtns ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}>
        <div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'alarma' }))}
            className="w-10 bg-gray-600/30 hover:bg-gray-600/40 text-gray-200 border border-gray-500/50 backdrop-blur-md rounded-l-xl flex flex-col items-center gap-0 py-1 text-[9px] font-semibold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            title="Ir a Alarma"
          >
            <Home className="w-4 h-4" />
            <span className="text-[8px] font-semibold leading-none text-center">Inicio</span>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar eventos..."]');
              el?.focus();
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="w-10 bg-gray-600/30 hover:bg-gray-600/40 text-gray-200 border border-gray-500/50 backdrop-blur-md rounded-l-xl flex flex-col items-center gap-0 py-1 text-[9px] font-semibold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            title="Buscar eventos"
          >
            <Search className="w-4 h-4" />
            <span className="text-[8px] font-semibold leading-none text-center">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
