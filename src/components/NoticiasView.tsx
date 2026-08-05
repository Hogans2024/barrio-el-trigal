import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { Search, Calendar, MapPin, Users, HeartHandshake, HelpCircle, Heart, MessageCircle, X, Eye, LayoutGrid, CheckCircle, PanelLeft, Pill, PawPrint, Store, Phone, Building2, Home, Newspaper, Trophy, Briefcase, Bus, Globe, Cpu, Zap, Images, FileText, UserCircle2, IdCard, Copy, Share2, User } from 'lucide-react';
import { NeighborhoodEvent } from '../types';
import { useIncrementalBatch } from '../hooks/useIncrementalBatch';

// CAPA 2 (futuro, no implementado): compresión/redimensionado de imágenes en el
// navegador del usuario antes de subirlas, para reducir peso de archivo en origen.
// CAPA 3 (futuro, no implementado): migración de almacenamiento/entrega de imágenes a
// Cloudinary (plan gratuito). Subida directa desde el navegador vía "unsigned upload
// preset" (sin pasar por Apps Script), y URLs servidas con parámetros f_auto (formato
// automático WebP/AVIF) y q_auto (compresión automática) vía su CDN.

interface NoticiasViewProps {
  noticias: NeighborhoodEvent[];
  onShowNotification: (title: string, message: string) => void;
  highlightId?: string | null;
  onClearHighlight?: () => void;
}

export default function NoticiasView({ noticias, highlightId, onClearHighlight }: NoticiasViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeNews, setActiveNews] = useState<NeighborhoodEvent | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [viewMode, setViewMode] = useState<string>('noticias');
  const [showViewModal, setShowViewModal] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem('barrio_noticias_likes') || '{}'); } catch { return {}; }
  });
  const [portraitNews, setPortraitNews] = useState<Record<string, boolean>>({});
  const [squareNews, setSquareNews] = useState<Record<string, boolean>>({});
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const touchState = useRef({ dist: 0, midX: 0, midY: 0, panX: 0, panY: 0, scale: 1 });
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [descOverflow, setDescOverflow] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState(false);

  useLayoutEffect(() => {
    if (expandedDesc) return;
    setDescOverflow(false);
    const el = descriptionRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      setDescOverflow(el.scrollHeight > el.clientHeight + 1);
    });
    return () => cancelAnimationFrame(raf);
  }, [activeNews, expandedDesc]);
  const barRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [showFloatingBtns, setShowFloatingBtns] = useState(false);
  const [stickyBarWidth, setStickyBarWidth] = useState(0);

  useEffect(() => {
    localStorage.setItem('barrio_noticias_likes', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => { setZoomScale(1); setZoomPos({ x: 0, y: 0 }); }, [fullscreenImg]);

  useEffect(() => {
    if (!highlightId || !onClearHighlight) return;
    const id = highlightId.split('::')[1];
    if (!id) return;
    const match = noticias.find((n) => n.id === id);
    if (match) setActiveNews(match);
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
    Seguridad: 'Seguridad', Cultura: 'Cultura', Servicios: 'Servicios',
    Tecnologia: 'Tecnología', Politica: 'Política', Deportes: 'Deportes',
    Economia: 'Economía', Transporte: 'Transporte', Turismo: 'Turismo',
  };

  const categories = Object.keys(categoryLabels);

  const categoryIcons: Record<string, React.ReactNode> = {
    Todos: <LayoutGrid className="w-4 h-4" />,
    Comunidad: <Users className="w-4 h-4" />,
    Salud: <HeartHandshake className="w-4 h-4" />,
    Medio: <HelpCircle className="w-4 h-4" />,
    Seguridad: <Eye className="w-4 h-4" />,
    Cultura: <Calendar className="w-4 h-4" />,
    Servicios: <Building2 className="w-4 h-4" />,
    Tecnologia: <Cpu className="w-4 h-4" />,
    Politica: <Briefcase className="w-4 h-4" />,
    Deportes: <Trophy className="w-4 h-4" />,
    Economia: <Store className="w-4 h-4" />,
    Transporte: <Bus className="w-4 h-4" />,
    Turismo: <Globe className="w-4 h-4" />,
  };

  const viewOptions = [
    { id: 'noticias', label: 'Vista Rápida', icon: <Zap className="w-4 h-4" /> },
    { id: 'proyectos', label: 'Vista Galería', icon: <Images className="w-4 h-4" /> },
    { id: 'farmacias', label: 'Vista Ficha Técnica', icon: <FileText className="w-4 h-4" /> },
    { id: 'mascotas', label: 'Vista Perfil', icon: <UserCircle2 className="w-4 h-4" /> },
    { id: 'negocios', label: 'Vista Tarjeta', icon: <IdCard className="w-4 h-4" /> },
  ];

  const filteredNews = useMemo(() => noticias.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    
    let matchesCategory = false;
    if (selectedCategory === 'Todos') {
      matchesCategory = true;
    } else if (selectedCategory === 'Medio') {
      matchesCategory = item.category === 'Medio';
    } else {
      matchesCategory = item.category.toLowerCase() === selectedCategory.toLowerCase();
    }

    return matchesSearch && matchesCategory;
  }), [noticias, search, selectedCategory]);

  // Carga incremental: solo monta `batchSize` tarjetas a la vez (Capa 1 — render)
  const { visibleItems: visibleNews, sentinelRef: batchSentinelRef, hasMore } = useIncrementalBatch(filteredNews);

  const getSmallIcon = (type: string) => {
    switch(type) {
      case 'trash': return <Calendar className="h-[18px] w-[18px] text-rose-400 shrink-0 mr-1" />;
      case 'users': return <Users className="h-[18px] w-[18px] text-[#22c55e] shrink-0 mr-1" />;
      case 'gift': return <HeartHandshake className="h-[18px] w-[18px] text-amber-400 shrink-0 mr-1" />;
      case 'heart-pulse': return <Eye className="h-[18px] w-[18px] text-blue-400 shrink-0 mr-1" />;
      default: return <HelpCircle className="h-[18px] w-[18px] text-[#FFD700] shrink-0 mr-1" />;
    }
  };

  const formatNewsDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    // Fecha origen tipo: "Lunes, 30 de Junio de 2026" → "Lunes 30-06-2026"
    const match = dateStr.match(/^\s*([A-Za-zñÑ]+),?\s*(\d{1,2})\s+de\s+([A-Za-z]+)\s+de\s+(\d{4})/i);
    if (!match) return dateStr;
    const [, day, dayNum, month, year] = match;
    const months: Record<string, string> = {
      enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
      julio: '07', agosto: '08', septiembre: '09', setiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
    };
    const mm = months[month.toLowerCase()] || '01';
    const dd = dayNum.padStart(2, '0');
    const weekday = day.toLowerCase();
    return `${weekday}-${dd}-${mm}-${year}`;
  };

  const getHashtags = (cat: string): string[] => {
    const map: Record<string, string[]> = {
      Tecnologia: ['#Tecnología', '#Innovación', '#Barrio'],
      Politica: ['#Política', '#Comunidad', '#Barrio'],
      Deportes: ['#Deportes', '#Barrio', '#Comunidad'],
      Economia: ['#Economía', '#Barrio', '#Progreso'],
      Medio: ['#MedioAmbiente', '#Verde', '#Barrio'],
      Salud: ['#Salud', '#Bienestar', '#Comunidad'],
      Transporte: ['#Transporte', '#Movilidad', '#Barrio'],
      Turismo: ['#Turismo', '#Cultura', '#Barrio'],
      Cultura: ['#Cultura', '#Barrio', '#Comunidad'],
      Seguridad: ['#Seguridad', '#Barrio', '#Comunidad'],
      Servicios: ['#Servicios', '#Barrio', '#Comunidad'],
    };
    return map[cat] || ['#Comunidad', '#Barrio', '#Latinoamérica'];
  };

  return (
    <div className="flex flex-col space-y-5 relative">
      <div ref={sentinelRef} className="absolute top-0 left-0 w-px h-px pointer-events-none" />
      {/* Header title */}
      <div className="-mt-[16px]">
        <h2 className="text-gray-400 text-sm font-bold tracking-tight">Noticias del Barrio:</h2>
        <p className="text-gray-400 text-xs mt-0">
          Mantente informado con las últimas novedades y comunicados de la comunidad.
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
                    const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar noticias..."]');
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
                  placeholder="Buscar noticias..."
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
                  placeholder="Buscar noticias..."
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

      {/* News Cards Section */}
      <div ref={cardsContainerRef} className="space-y-4 -mt-[4px]">
        {visibleNews.map((item, idx) => {
          // Vista tipo Proyectos (split horizontal)
          if (viewMode === 'proyectos') {
            return (
              <div
                key={item.id}
                className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex h-[145px] tall:h-[165px] group"
              >
                <div onClick={() => setActiveNews(item)} className="w-[55%] tall:w-[38%] h-full bg-gray-950 overflow-hidden shrink-0 cursor-pointer">
                  <img src={item.imageUrl} alt={item.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="w-[45%] tall:w-[62%] p-2 tall:p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1.5 mb-1.5">
                      <h3 className="text-white text-sm font-bold leading-tight group-hover:text-[#FFD700] transition line-clamp-2">{item.title}</h3>
                    </div>
                    <p className="text-gray-300 text-[10px] tall:text-[11px] leading-[1.4] line-clamp-3 tall:line-clamp-4">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-end mt-2 w-full">
                    <span onClick={() => setActiveNews(item)} className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] tall:text-[11px] font-bold px-[5px] tall:px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 transition border border-[#FFD700]/40 cursor-pointer shrink-0 text-center inline-block">
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
                key={item.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <img src={item.imageUrl} alt={item.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#080a0f] to-transparent h-16 pointer-events-none" />
                </div>
                <div className="p-4 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{item.title}</h3>
                    <span className="bg-[#22c55e]/40 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-[#22c55e]/40 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {categoryLabels[item.category] || item.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">{item.description}</p>
                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                    <div className="flex items-center space-x-2.5 text-gray-300">
                      <MapPin className="h-4 w-4 text-[#22c55e] shrink-0" />
                      <span className="font-mono text-[11px]">{item.location || 'Barrio El Trigal'}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-gray-400">
                      <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
                      <span className="font-mono text-[11px]">{item.date || 'Sin fecha'}</span>
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
                key={item.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition"
              >
                <div onClick={() => setActiveNews(item)} className="relative h-44 w-full bg-slate-900 overflow-hidden cursor-pointer">
                  <img src={item.imageUrl} alt={item.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-200" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white text-base font-bold tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 text-[10px] font-extrabold px-2.5 py-1 rounded [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">{categoryLabels[item.category] || item.category}</span>
                    <span onClick={() => setActiveNews(item)} className="bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] font-extrabold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 border border-[#FFD700]/40 transition cursor-pointer">
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
                key={item.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex flex-col group"
              >
                <div onClick={() => setActiveNews(item)} className="relative h-44 w-full bg-slate-900 overflow-hidden cursor-pointer">
                  <img src={item.imageUrl} alt={item.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{item.title}</h3>
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 font-extrabold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {categoryLabels[item.category] || item.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed max-h-16 line-clamp-2">{item.description}</p>
                  <div className="pt-2 border-t border-white/5 mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 font-mono text-[#22c55e]">
                      <MapPin className="h-3.5 w-3.5 text-[#22c55e] shrink-0" />
                      <span>{item.location || 'Barrio El Trigal'}</span>
                    </div>
                    <span onClick={() => setActiveNews(item)} className="bg-[#FFD700]/10 text-[#FFD700] font-bold px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer">
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Default: Noticias view (nuevo diseño tipo Mascotas)
          return (
            <div
              key={item.id}
              className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition group"
            >
              {/* Header: número + icono + título ANTES de la imagen (estilo Mascotas) */}
              <div className="px-[10px] pt-[10px] pb-[6px] flex space-x-3 items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-bold tracking-tight mb-0.5 group-hover:text-[#FFD700] transition flex items-center w-full">
                    {getSmallIcon(item.icon)}
                    <span className="truncate min-w-0"><span className="text-white">{idx + 1}.</span><span className="text-white ml-2 truncate">{item.title}</span></span>
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Imagen con soporte de formatos 1:1 / 16:9 / 9:16 */}
              <div
                className={`relative ${portraitNews[item.id] ? 'h-[264px]' : squareNews[item.id] ? 'aspect-square' : 'h-36'} w-full bg-slate-900 overflow-hidden cursor-pointer`}
                onClick={() => setActiveNews(item)}
                style={{ clipPath: 'inset(0)' }}
              >
                {portraitNews[item.id] && (
                  <>
                    <div className="absolute inset-0 bg-cover bg-center opacity-60 scale-110" style={{ backgroundImage: `url(${item.imageUrl})` }} />
                    <div className="absolute inset-0 bg-white/[0.0075] backdrop-blur-[2px] border border-white/[0.0125] shadow-[inset_0_1px_0_rgba(255,255,255,0.0125)]" />
                  </>
                )}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className={`relative z-10 w-full h-full transition duration-500 ${portraitNews[item.id] ? 'object-contain' : 'object-cover group-hover:scale-105'}`}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const ratio = img.naturalWidth / img.naturalHeight;
                    if (ratio < 0.8) {
                      setPortraitNews(prev => ({ ...prev, [item.id]: true }));
                    } else if (ratio >= 0.8 && ratio <= 1.2) {
                      setSquareNews(prev => ({ ...prev, [item.id]: true }));
                    }
                  }}
                />
                <span className="absolute bottom-2 left-2 z-20 bg-black/55 text-white text-[10px] font-extrabold px-2 py-0.5 rounded border border-white/20 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap pointer-events-none">
                  {categoryLabels[item.category] || item.category}
                </span>
              </div>

              {/* Fila de botones */}
              <div className="flex items-stretch justify-between pt-[10px] pb-[11px] px-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLikes(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
                  }}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer shrink-0 bg-white/5 text-gray-300 border border-white/10 hover:text-red-400 hover:border-red-400/40"
                >
                  <Heart className={`h-3.5 w-3.5 ${likes[item.id] ? 'fill-red-400 text-red-400' : ''}`} />
                  <span>{likes[item.id] || 0}</span>
                </button>
                <div className="flex items-stretch gap-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer shrink-0 bg-white/5 text-gray-300 border border-white/10 hover:text-sky-400 hover:border-sky-400/40"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Comentar</span>
                  </button>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNews(item);
                    }}
                    className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold transition whitespace-nowrap cursor-pointer shrink min-w-0 bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                  >
                    Ver Detalles
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer shrink-0 bg-white/5 text-gray-300 border border-white/10 hover:text-sky-400 hover:border-sky-400/40"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" overflow="visible" style={{ transform: 'scale(1.25)', transformOrigin: 'center' }}><path d="M12 5l7 7-7 7v-4c-5 0-8 3-9 6 1.5-4.5 4-9 9-10V5z"/></svg>
                </button>
              </div>
            </div>
          );
        })}

        {/* Sentinela de carga incremental — SIEMPRE montado para evitar loop mount/unmount del observer */}
        <div ref={batchSentinelRef} className="w-full h-4" aria-hidden="true" />

        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No se encontraron noticias para esta búsqueda.
          </div>
        )}
      </div>

      {/* News Details Expanded Modal */}
      {activeNews && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4">
          <div className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-md overflow-y-auto max-h-full animate-in fade-in zoom-in duration-200">
            {(() => {
              return (
                <>
                  <div className="relative bg-gray-950">
                    <img
                      src={activeNews.imageUrl}
                      alt={activeNews.title}
                      referrerPolicy="no-referrer"
                      className="z-10 cursor-pointer w-full h-auto"
                      onDoubleClick={() => setFullscreenImg(activeNews.imageUrl)}
                      onClick={() => setFullscreenImg(activeNews.imageUrl)}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        const ratio = img.naturalWidth / img.naturalHeight;
                        if (ratio < 0.8) {
                          setPortraitNews(prev => ({ ...prev, [activeNews.id]: true }));
                        } else if (ratio >= 0.8 && ratio <= 1.2) {
                          setSquareNews(prev => ({ ...prev, [activeNews.id]: true }));
                        }
                      }}
                    />
                    <button
                      onClick={() => setActiveNews(null)}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition cursor-pointer z-20"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </>
              );
            })()}

            <div className="px-5 pt-1 space-y-1.5 pb-16 sm:pb-5">
              <h4 className="text-white text-xl font-bold tracking-tight">{activeNews.title}</h4>

              {/* Fecha (izquierda) + Quién publicó (derecha) — misma línea */}
              <div className="flex items-center justify-between gap-3">
                <p className="text-[#FFD700] text-xs">
                  {formatNewsDate(activeNews.date) || 'Sin fecha'}
                </p>
                <p className="text-gray-300 text-xs flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{activeNews.publisher || 'Administrador'}</span>
                </p>
              </div>

              <div>
                <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Descripción</h5>
                <div className="relative">
                  <p
                    ref={descriptionRef}
                    className={`text-gray-300 text-xs leading-relaxed ${expandedDesc ? '' : 'line-clamp-[9]'}`}
                  >
                    {activeNews.description}
                  </p>
                  {descOverflow && !expandedDesc && (
                    <button
                      onClick={() => setExpandedDesc(true)}
                      className="block text-rose-400 text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:text-rose-300 transition mt-1"
                    >
                      Seguir leyendo
                    </button>
                  )}
                </div>
              </div>

              {/* Hashtags — primera letra mayúscula, resto minúsculas */}
              <div className="flex items-center justify-between gap-2 pt-1">
                {getHashtags(activeNews.category).map((tag, i) => {
                  const clean = tag.replace(/^#/, '');
                  const normalized = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
                  return (
                    <span key={i} className="text-[10px] font-bold tracking-wider">
                      <span className="text-emerald-400">#</span>
                      <span className="text-gray-300">{normalized}</span>
                    </span>
                  );
                })}
              </div>

              <div className="border-t border-white/10 my-3"></div>

              {/* Botones: COMPARTIR, COPIAR, CERRAR — solo icono + texto */}
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex items-center gap-1.5 text-white text-[10px] font-bold tracking-wider uppercase transition cursor-pointer hover:text-gray-300"
                >
                  <Share2 className="h-3.5 w-3.5 text-white" />
                  Compartir
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex items-center gap-1.5 text-white text-[10px] font-bold tracking-wider uppercase transition cursor-pointer hover:text-gray-300"
                >
                  <Copy className="h-3.5 w-3.5 text-white" />
                  Copiar
                </button>
                <button
                  onClick={() => setActiveNews(null)}
                  className="flex items-center gap-1.5 text-white text-[10px] font-bold tracking-wider uppercase transition cursor-pointer hover:text-gray-300"
                >
                  <X className="h-3.5 w-3.5 text-white" />
                  Cerrar
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
              const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar noticias..."]');
              el?.focus();
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="w-10 bg-gray-600/30 hover:bg-gray-600/40 text-gray-200 border border-gray-500/50 backdrop-blur-md rounded-l-xl flex flex-col items-center gap-0 py-1 text-[9px] font-semibold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            title="Buscar noticias"
          >
            <Search className="w-4 h-4" />
            <span className="text-[8px] font-semibold leading-none text-center">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
