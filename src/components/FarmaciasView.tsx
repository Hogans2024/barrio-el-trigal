import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Search, Calendar, MapPin, Phone, Building2, X, LayoutGrid, CheckCircle, PanelLeft, Pill, PawPrint, Store, HelpCircle, Home, MessageCircle } from 'lucide-react';
import { Pharmacy } from '../types';

interface FarmaciasViewProps {
  farmacias: Pharmacy[];
  onShowNotification: (title: string, message: string) => void;
}

export default function FarmaciasView({ farmacias, onShowNotification }: FarmaciasViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activePharmacy, setActivePharmacy] = useState<Pharmacy | null>(null);
  const [contactPharmacy, setContactPharmacy] = useState<Pharmacy | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [viewMode, setViewMode] = useState<string>('eventos');
  const [showViewModal, setShowViewModal] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [showFloatingBtns, setShowFloatingBtns] = useState(false);
  const [stickyBarWidth, setStickyBarWidth] = useState(0);

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

  const categories = ['Todos', 'Centro', 'Medio', 'Exterior'];

  const categoryIcons: Record<string, React.ReactNode> = {
    Todos: <LayoutGrid className="w-4 h-4" />,
    Centro: <Building2 className="w-4 h-4" />,
    Medio: <HelpCircle className="w-4 h-4" />,
    Exterior: <MapPin className="w-4 h-4" />,
  };

  const viewOptions = [
    { id: 'eventos', label: 'Eventos', icon: <Calendar className="w-4 h-4" /> },
    { id: 'proyectos', label: 'Proyectos', icon: <PanelLeft className="w-4 h-4" /> },
    { id: 'farmacias', label: 'Farmacias', icon: <Pill className="w-4 h-4" /> },
    { id: 'mascotas', label: 'Mascotas', icon: <PawPrint className="w-4 h-4" /> },
    { id: 'negocios', label: 'Negocios', icon: <Store className="w-4 h-4" /> },
  ];

  const filteredPharmacies = farmacias.filter((pharmacy) => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(search.toLowerCase()) ||
                          pharmacy.description.toLowerCase().includes(search.toLowerCase());
    let matchesCategory = false;
    if (selectedCategory === 'Todos') {
      matchesCategory = true;
    } else {
      matchesCategory = pharmacy.neighborhood.toLowerCase() === selectedCategory.toLowerCase();
    }
    return matchesSearch && matchesCategory;
  });

  const handleNavigate = (pharmacyName: string, address: string) => {
    onShowNotification(
      '📍 Navegación GPS',
      `Calculando ruta sugerida a: "${pharmacyName}" en ${address}.`
    );
  };

  return (
    <div className="flex flex-col space-y-5 relative">
      <div ref={sentinelRef} className="absolute top-0 left-0 w-px h-px pointer-events-none" />
      {/* Header title */}
      <div className="-mt-[16px]">
        <h2 className="text-gray-400 text-sm font-bold tracking-tight">Farmacias de Turno:</h2>
        <p className="text-gray-400 text-xs mt-0">
          Encuentra las farmacias que están de turno hoy en Tarija.
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
                  <span>{selectedCategory === 'Todos' ? 'Todas' : selectedCategory}</span>
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
                    const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar farmacias..."]');
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
                  placeholder="Buscar farmacias..."
                  className="w-full bg-[#080a0f] text-white pl-10 pr-4 py-1.5 rounded-xl border border-white/10 text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#FFD700] transition"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ── Normal layout: search bar + category bar ── */
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
                  placeholder="Buscar farmacias..."
                  className="w-full bg-[#080a0f] text-white pl-10 pr-4 py-1.5 rounded-xl border border-white/10 text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#FFD700] transition"
                />
              </div>
            </div>
            <div ref={barRef} className="mt-3 flex items-center justify-center flex-nowrap" style={{ gap: 'clamp(4px, calc((100vw - 320px) / 12), 19px)' }}>
              {shimmer && <div className="shimmer-beam buttons" />}
              <button
                onClick={() => setShowCategoryModal(true)}
                className="relative inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Categorías</span>
              </button>
              <div
                onClick={() => setShowCategoryModal(true)}
                className="relative inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
              >
                {categoryIcons[selectedCategory]}
                <span>{selectedCategory === 'Todos' ? 'Todas' : selectedCategory}</span>
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
                className="relative inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold transition cursor-pointer border bg-blue-500/10 text-blue-400 border-blue-500/40 hover:bg-blue-500/20"
              >
                {viewOptions.find(v => v.id === viewMode)?.icon}
                <span>Vista</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spacer matching sticky bar height */}
      {showFloatingBtns && <div style={{ height: stickyBarHeight > 0 ? stickyBarHeight : undefined }} className="h-14" />}

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
                const displayName = cat === 'Todos' ? 'Todas las zonas' : cat;
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

      {/* Pharmacy Cards Section */}
      <div ref={cardsContainerRef} className="space-y-4 -mt-[4px]">
        {filteredPharmacies.map((pharmacy) => {
          // Vista tipo Proyectos (split horizontal)
          if (viewMode === 'proyectos') {
            return (
              <div
                key={pharmacy.id}
                className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex h-[145px] tall:h-[165px] group"
              >
                <div className="w-[55%] tall:w-[38%] h-full bg-gray-950 overflow-hidden shrink-0">
                  <img src={pharmacy.imageUrl} alt={pharmacy.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="w-[45%] tall:w-[62%] p-2 tall:p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1.5 mb-1.5">
                      <h3 className="text-white text-sm font-bold leading-tight group-hover:text-[#FFD700] transition line-clamp-2">{pharmacy.name}</h3>
                    </div>
                    <p className="text-gray-300 text-[10px] tall:text-[11px] leading-[1.4] line-clamp-3 tall:line-clamp-4">{pharmacy.description}</p>
                  </div>
                  <div className="flex items-center justify-end mt-2 w-full">
                    <span onClick={() => setActivePharmacy(pharmacy)} className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] tall:text-[11px] font-bold px-[5px] tall:px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 transition border border-[#FFD700]/40 cursor-pointer shrink-0 text-center inline-block">
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
                key={pharmacy.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <img src={pharmacy.imageUrl} alt={pharmacy.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#080a0f] to-transparent h-16 pointer-events-none" />
                </div>
                <div className="p-4 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{pharmacy.name}</h3>
                    <span className="bg-[#22c55e]/40 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-[#22c55e]/40 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {pharmacy.neighborhood}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">{pharmacy.description}</p>
                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                    <div className="flex items-center space-x-2.5 text-gray-300">
                      <MapPin className="h-4 w-4 text-[#22c55e] shrink-0" />
                      <span className="font-mono text-[11px]">{pharmacy.address}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-gray-400">
                      <Phone className="h-4 w-4 text-[#FFD700] shrink-0" />
                      <span className="font-mono text-[11px]">{pharmacy.phone}</span>
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
                key={pharmacy.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <img src={pharmacy.imageUrl} alt={pharmacy.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-200" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white text-base font-bold tracking-tight">{pharmacy.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{pharmacy.description}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 text-[10px] font-extrabold px-2.5 py-1 rounded [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">{pharmacy.neighborhood}</span>
                    <span className="bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] font-extrabold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 border border-[#FFD700]/40 transition cursor-pointer">
                      <Phone className="h-3.5 w-3.5" />
                      <span>Llamar</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Vista tipo Negocios (header image + zone + action)
          if (viewMode === 'negocios') {
            return (
              <div
                key={pharmacy.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex flex-col group"
              >
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img src={pharmacy.imageUrl} alt={pharmacy.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{pharmacy.name}</h3>
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 font-extrabold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {pharmacy.neighborhood}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed max-h-16 line-clamp-2">{pharmacy.description}</p>
                  <div className="pt-2 border-t border-white/5 mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 font-mono text-[#22c55e]">
                      <MapPin className="h-3.5 w-3.5 text-[#22c55e] shrink-0" />
                      <span>{pharmacy.address}</span>
                    </div>
                    <span onClick={() => setActivePharmacy(pharmacy)} className="bg-[#FFD700]/10 text-[#FFD700] font-bold px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer">
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Default: Eventos view
          return (
            <div
              key={pharmacy.id}
              className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition group"
            >
              <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                <img
                  src={pharmacy.imageUrl}
                  alt={pharmacy.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 animate-pulse">
                  <span className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#FFD700]/40">
                    DE TURNO
                  </span>
                </div>
              </div>

              <div className="px-[10px] pt-[10px] pb-[6px] flex space-x-3 items-start">
                <div className="text-teal-400 bg-teal-500/10 p-2.5 rounded-lg shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-bold tracking-tight mb-0.5 group-hover:text-[#FFD700] transition truncate">
                    {pharmacy.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                    {pharmacy.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center pb-[11px] px-3 gap-5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setContactPharmacy(pharmacy);
                  }}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap bg-white/5 text-gray-300 border border-white/10 hover:text-white"
                >
                  <Phone className="h-3 w-3" />
                  <span>Contactar</span>
                </button>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-500/40 whitespace-nowrap">
                  {pharmacy.neighborhood}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePharmacy(pharmacy);
                  }}
                  className="bg-[#FFD700]/10 text-[#FFD700] text-[11px] font-extrabold px-3.5 py-1.5 rounded-lg group-hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer whitespace-nowrap"
                >
                  Ver Detalles
                </span>
              </div>
            </div>
          );
        })}

        {filteredPharmacies.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No se encontraron farmacias con este filtro.
          </div>
        )}
      </div>

      {/* Pharmacy Details Expanded Modal */}
      {activePharmacy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4">
          <div className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-md overflow-y-auto max-h-full animate-in fade-in zoom-in duration-200">
            <div className="relative h-44 bg-gray-950">
              <img
                src={activePharmacy.imageUrl}
                alt={activePharmacy.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePharmacy(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#FFD700]/10 text-[#FFD700] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide border border-[#FFD700]/40">
                  DE TURNO
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4 pb-16 sm:pb-5">
              <h4 className="text-white text-xl font-bold tracking-tight">{activePharmacy.name}</h4>
              <p className="text-gray-300 text-xs leading-relaxed">{activePharmacy.description}</p>

              <div className="bg-white/[0.02] rounded-xl border border-white/10 p-3.5 space-y-2.5 text-xs">
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="h-4 w-4 text-[#22c55e] shrink-0" />
                  <span className="text-white">{activePharmacy.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span className="text-white">{activePharmacy.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Building2 className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="text-white">{activePharmacy.neighborhood}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setActivePharmacy(null)}
                  className="flex-1 bg-black text-gray-300 hover:text-white border border-white/10 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => setContactPharmacy(activePharmacy)}
                  className="flex-1 bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20 border border-[#FFD700]/40 py-2.5 rounded-lg text-xs font-extrabold transition cursor-pointer"
                >
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Options Modal */}
      {contactPharmacy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4">
          <div className="bg-[#0c101d] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 space-y-4">
              <div className="text-center">
                <h4 className="text-white text-lg font-bold">Contactar</h4>
                <p className="text-gray-400 text-xs mt-1">{contactPharmacy.name}</p>
              </div>
              <button
                onClick={() => {
                  const phone = contactPharmacy.phone.replace(/[^0-9]/g, '');
                  const isAndroid = /Android/i.test(navigator.userAgent);
                  const intentUrl = `intent://send/+${phone}#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end`;
                  const waUrl = `whatsapp://send?phone=${phone}`;
                  const fallbackUrl = `https://wa.me/${phone}`;
                  if (isAndroid) {
                    window.location.href = intentUrl;
                  } else {
                    window.location.href = waUrl;
                  }
                  setTimeout(() => {
                    if (document.visibilityState !== 'hidden') {
                      window.location.href = fallbackUrl;
                    }
                  }, 3000);
                  setContactPharmacy(null);
                }}
                className="w-full flex items-center justify-center space-x-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-white border border-[#25D366]/40 py-3 rounded-xl text-sm font-bold transition cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  window.location.href = `tel:${contactPharmacy.phone}`;
                  setContactPharmacy(null);
                }}
                className="w-full flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 rounded-xl text-sm font-bold transition cursor-pointer"
              >
                <Phone className="h-5 w-5 text-[#FFD700]" />
                <span>Llamar</span>
              </button>
              <button
                onClick={() => setContactPharmacy(null)}
                className="w-full text-gray-500 hover:text-gray-300 py-2 text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
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
              const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar farmacias..."]');
              el?.focus();
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="w-10 bg-gray-600/30 hover:bg-gray-600/40 text-gray-200 border border-gray-500/50 backdrop-blur-md rounded-l-xl flex flex-col items-center gap-0 py-1 text-[9px] font-semibold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            title="Buscar farmacias"
          >
            <Search className="w-4 h-4" />
            <span className="text-[8px] font-semibold leading-none text-center">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
