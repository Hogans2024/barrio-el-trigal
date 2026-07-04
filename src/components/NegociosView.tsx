import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Search, Calendar, MapPin, Phone, Building2, X, LayoutGrid, CheckCircle, PanelLeft, Pill, PawPrint, Store, HelpCircle, Star, Clock, ShoppingCart, PlusCircle, Upload, Home } from 'lucide-react';
import { LocalBusiness } from '../types';

interface NegociosViewProps {
  negocios: LocalBusiness[];
  onShowNotification: (title: string, message: string) => void;
}

export default function NegociosView({ negocios, onShowNotification }: NegociosViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeBiz, setActiveBiz] = useState<LocalBusiness | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [viewMode, setViewMode] = useState<string>('eventos');
  const [showViewModal, setShowViewModal] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [showFloatingBtns, setShowFloatingBtns] = useState(false);
  const [stickyBarWidth, setStickyBarWidth] = useState(0);

  const [businesses, setBusinesses] = useState<LocalBusiness[]>([]);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState('Comida');
  const [newDesc, setNewDesc] = useState('');
  const [newPhones, setNewPhones] = useState<string[]>(['']);
  const [phoneWhatsapp, setPhoneWhatsapp] = useState<boolean[]>([false]);
  const [newAddress, setNewAddress] = useState('');
  const [socialNetworks, setSocialNetworks] = useState<Record<string, string>>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [deviceImages, setDeviceImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});
  const [selectedShifts, setSelectedShifts] = useState<Record<string, boolean>>({});
  const [shiftTimes, setShiftTimes] = useState<Record<string, { from: string; until: string }>>({});

  const shiftHourRanges: Record<string, string[]> = {
    Mañana: ['05','06','07','08','09','10','11','12'],
    Tarde: ['13','14','15','16','17','18'],
    Noche: ['19','20','21','22','23','00'],
    Madrugada: ['01','02','03','04'],
  };

  const defaultShiftTimes: Record<string, { from: string; until: string }> = {
    Mañana: { from: '05:00', until: '12:00' },
    Tarde: { from: '13:00', until: '18:00' },
    Noche: { from: '19:00', until: '00:00' },
    Madrugada: { from: '01:00', until: '04:00' },
  };

  const toggleDay = (day: string) => setSelectedDays(prev => ({ ...prev, [day]: !prev[day] }));
  const toggleShift = (shift: string) => {
    setSelectedShifts(prev => ({ ...prev, [shift]: !prev[shift] }));
    if (!selectedShifts[shift]) {
      setShiftTimes(prev => ({ ...prev, [shift]: defaultShiftTimes[shift] || { from: '', until: '' } }));
    }
  };
  const setShiftTime = (shift: string, field: 'from' | 'until', value: string) => {
    setShiftTimes(prev => ({ ...prev, [shift]: { ...prev[shift], [field]: value } }));
  };

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

  useEffect(() => {
    const stored = localStorage.getItem('barrio_negocios_extra');
    if (stored) {
      try {
        const extra: LocalBusiness[] = JSON.parse(stored);
        setBusinesses([...extra, ...negocios]);
      } catch (e) {
        setBusinesses(negocios);
      }
    } else {
      setBusinesses(negocios);
    }
  }, [negocios]);

  const saveBusinessesList = (list: LocalBusiness[]) => {
    const extraItems = list.filter(b => b.id.startsWith('custom_'));
    setBusinesses(list);
    localStorage.setItem('barrio_negocios_extra', JSON.stringify(extraItems));
  };

  const categories = ['Todos', 'Comida', 'Papa de comer', 'Ropa', 'Plantas'];

  const categoryIcons: Record<string, React.ReactNode> = {
    Todos: <LayoutGrid className="w-4 h-4" />,
    Comida: <Store className="w-4 h-4" />,
    'Papa de comer': <ShoppingCart className="w-4 h-4" />,
    Ropa: <HelpCircle className="w-4 h-4" />,
    Plantas: <HelpCircle className="w-4 h-4" />,
  };

  const viewOptions = [
    { id: 'eventos', label: 'Eventos', icon: <Calendar className="w-4 h-4" /> },
    { id: 'proyectos', label: 'Proyectos', icon: <PanelLeft className="w-4 h-4" /> },
    { id: 'farmacias', label: 'Farmacias', icon: <Pill className="w-4 h-4" /> },
    { id: 'mascotas', label: 'Mascotas', icon: <PawPrint className="w-4 h-4" /> },
    { id: 'negocios', label: 'Negocios', icon: <Store className="w-4 h-4" /> },
  ];

  const isOpen = (biz: LocalBusiness) => biz.openHours && biz.openHours.length > 0;

  const filteredBusinesses = businesses.filter((biz) => {
    const matchesSearch = biz.name.toLowerCase().includes(search.toLowerCase()) ||
                          biz.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || biz.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRegisterBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDesc) return;

    const defaultImages: Record<string, string> = {
      Comida: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
      Ropa: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
      Plantas: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
      'Papa de comer': 'https://images.unsplash.com/photo-1573244514399-7448d3ab85ae?w=600&auto=format&fit=crop&q=80',
    };

    const daysList = weekDays.filter(d => selectedDays[d]);
    let hoursStr = '';
    if (daysList.length > 0) {
      const dayStr = daysList.join(', ');
      const activeShifts = Object.entries(selectedShifts).filter(([, v]) => v).map(([k]) => k);
      if (activeShifts.length > 0) {
        const parts = activeShifts.map(shift => {
          const t = shiftTimes[shift];
          if (t?.from || t?.until) return `${shift}: ${t.from || '?'}-${t.until || '?'}`;
          return shift;
        });
        hoursStr = `${dayStr} (${parts.join(', ')})`;
      } else {
        hoursStr = dayStr;
      }
    }

    const actionTextMap: Record<string, string> = {
      Comida: 'Ver Menú',
      'Papa de comer': 'Pedir Ya',
      Ropa: 'Explorar',
      Plantas: 'Catálogo',
    };

    const allImages = [...imageUrls, ...deviceImages];
    const newBiz: LocalBusiness = {
      id: `custom_biz_${Date.now()}`,
      name: newName,
      description: newDesc,
      category: newCat,
      imageUrl: allImages[0] || defaultImages[newCat] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
      phone: newPhones[0] || undefined,
      phones: newPhones.filter(p => p.trim()).length > 0
        ? newPhones.map((p, i) => p.trim() ? `${p}${phoneWhatsapp[i] ? ' 📱WhatsApp' : ''}` : '').filter(Boolean)
        : undefined,
      address: newAddress || undefined,
      openHours: hoursStr || undefined,
      socialNetworks: Object.keys(socialNetworks).length > 0 ? socialNetworks : undefined,
      facebook: socialNetworks['Facebook'] || undefined,
      tiktok: socialNetworks['TikTok'] || undefined,
      instagram: socialNetworks['Instagram'] || undefined,
      youtube: socialNetworks['YouTube'] || undefined,
      actionText: actionTextMap[newCat] || 'Explorar',
      images: allImages.length > 0 ? allImages : undefined,
      videoUrl: videoUrls[0] || undefined,
    };

    const updated = [newBiz, ...businesses];
    saveBusinessesList(updated);
    setShowRegisterForm(false);
    onShowNotification('💼 Negocio Registrado', 'Tu emprendimiento local ha sido publicado con éxito y es visible para todos los vecinos.');

    setNewName('');
    setNewCat('Comida');
    setNewDesc('');
    setNewPhones(['']);
    setPhoneWhatsapp([false]);
    setNewAddress('');
    setSocialNetworks({});
    setImageUrls([]);
    setDeviceImages([]);
    setVideoUrls([]);
    setSelectedDays({});
    setSelectedShifts({});
    setShiftTimes({});
  };

  return (
    <div className="flex flex-col space-y-5 relative">
      <div ref={sentinelRef} className="absolute top-0 left-0 w-px h-px pointer-events-none" />
      {/* Header title */}
      <div className="-mt-[16px]">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-gray-400 text-sm font-bold tracking-tight">Negocios Locales:</h2>
            <p className="text-gray-400 text-xs mt-0">
              Descubre y apoya el comercio de nuestra comunidad.
            </p>
          </div>
          <div className={`transition-all duration-300 ease-out ${
            showFloatingBtns ? 'opacity-0 pointer-events-none -translate-y-2 h-0 overflow-hidden mb-0' : 'opacity-100 translate-y-0'
          }`}>
            <button
              onClick={() => setShowRegisterForm(true)}
              className="bg-[#FFD700]/10 border border-[#FFD700]/20 hover:border-[#FFD700] text-[#FFD700] font-extrabold px-3 py-2 rounded-lg text-[11px] flex items-center gap-1.5 transition cursor-pointer shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Registrar Negocio</span>
            </button>
          </div>
        </div>
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
                  <span>{selectedCategory === 'Todos' ? 'Todas' : selectedCategory === 'Papa de comer' ? 'Comida' : selectedCategory}</span>
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
                    const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar negocios..."]');
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
                  placeholder="Buscar negocios..."
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
                  placeholder="Buscar negocios..."
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
                <span>{selectedCategory === 'Todos' ? 'Todas' : selectedCategory === 'Papa de comer' ? 'Comida' : selectedCategory}</span>
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
                const displayName = cat === 'Todos' ? 'Todas las categorías' : cat;
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

      {/* Business Cards Section */}
      <div ref={cardsContainerRef} className="space-y-4 -mt-[4px]">
        {filteredBusinesses.map((biz) => {
          const open = isOpen(biz);

          // Vista tipo Proyectos (split horizontal)
          if (viewMode === 'proyectos') {
            return (
              <div
                key={biz.id}
                onClick={() => setActiveBiz(biz)}
                className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition cursor-pointer flex h-[145px] tall:h-[165px] group"
              >
                <div className="w-[55%] tall:w-[38%] h-full bg-gray-950 overflow-hidden shrink-0">
                  <img src={biz.imageUrl} alt={biz.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="w-[45%] tall:w-[62%] p-2 tall:p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1.5 mb-1.5">
                      <h3 className="text-white text-sm font-bold leading-tight group-hover:text-[#FFD700] transition line-clamp-2">{biz.name}</h3>
                    </div>
                    <p className="text-gray-300 text-[10px] tall:text-[11px] leading-[1.4] line-clamp-3 tall:line-clamp-4">{biz.description}</p>
                  </div>
                  <div className="flex items-center justify-end mt-2 w-full">
                    <span className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] tall:text-[11px] font-bold px-[5px] tall:px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 transition border border-[#FFD700]/40 cursor-pointer shrink-0 text-center inline-block">
                      {biz.actionText}
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
                key={biz.id}
                onClick={() => setActiveBiz(biz)}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition cursor-pointer"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <img src={biz.imageUrl} alt={biz.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#080a0f] to-transparent h-16 pointer-events-none" />
                </div>
                <div className="p-4 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{biz.name}</h3>
                    <span className="bg-[#22c55e]/40 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-[#22c55e]/40 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {biz.category === 'Papa de comer' ? 'Comida' : biz.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">{biz.description}</p>
                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                    {biz.phone && (
                      <div className="flex items-center space-x-2.5 text-gray-300">
                        <Phone className="h-4 w-4 text-[#FFD700] shrink-0" />
                        <span className="font-mono text-[11px]">{biz.phone}</span>
                      </div>
                    )}
                    {biz.address && (
                      <div className="flex items-center space-x-2.5 text-gray-400">
                        <MapPin className="h-4 w-4 text-[#22c55e] shrink-0" />
                        <span className="font-mono text-[11px]">{biz.address}</span>
                      </div>
                    )}
                    {biz.openHours && (
                      <div className="flex items-center space-x-2.5 text-gray-400">
                        <Clock className="h-4 w-4 text-gray-500 shrink-0" />
                        <span className="font-mono text-[11px]">{biz.openHours}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          // Vista tipo Mascotas (header image + contact)
          if (viewMode === 'mascotas') {
            return (
              <div
                key={biz.id}
                onClick={() => setActiveBiz(biz)}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition cursor-pointer"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <img src={biz.imageUrl} alt={biz.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-200" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white text-base font-bold tracking-tight">{biz.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{biz.description}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 text-[10px] font-extrabold px-2.5 py-1 rounded [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {biz.category === 'Papa de comer' ? 'Comida' : biz.category}
                    </span>
                    <span
                      onClick={(e) => { e.stopPropagation(); setActiveBiz(biz); }}
                      className="bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] font-extrabold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 border border-[#FFD700]/40 transition cursor-pointer"
                    >
                      <Store className="h-3.5 w-3.5" />
                      <span>{biz.actionText}</span>
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
                key={biz.id}
                onClick={() => setActiveBiz(biz)}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex flex-col group cursor-pointer"
              >
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img src={biz.imageUrl} alt={biz.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{biz.name}</h3>
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 font-extrabold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {biz.category === 'Papa de comer' ? 'Comida' : biz.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed max-h-16 line-clamp-2">{biz.description}</p>
                  <div className="pt-2 border-t border-white/5 mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 font-mono text-[#22c55e]">
                      {biz.rating && (
                        <>
                          <Star className="h-3.5 w-3.5 fill-[#22c55e] text-[#22c55e] shrink-0" />
                          <span>{biz.rating} ({biz.reviewsCount})</span>
                        </>
                      )}
                      {biz.isFreeDelivery && (
                        <div className="flex items-center space-x-1 font-mono text-[#22c55e]">
                          <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
                          <span>Envío gratis</span>
                        </div>
                      )}
                    </div>
                    <span
                      onClick={(e) => { e.stopPropagation(); setActiveBiz(biz); }}
                      className="bg-[#FFD700]/10 text-[#FFD700] font-bold px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer"
                    >
                      {biz.actionText}
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Default: Eventos view (compact card)
          return (
            <div
              key={biz.id}
              onClick={() => setActiveBiz(biz)}
              className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition cursor-pointer group"
            >
              <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                <img
                  src={biz.imageUrl}
                  alt={biz.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="px-[10px] pt-[10px] pb-[6px] flex space-x-3 items-start">
                <div className="text-teal-400 bg-teal-500/10 p-2.5 rounded-lg shrink-0">
                  <Store className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-bold tracking-tight mb-0.5 group-hover:text-[#FFD700] transition truncate">
                    {biz.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                    {biz.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center pb-[11px] px-3 gap-5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveBiz(biz);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer whitespace-nowrap border ${
                    open
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/40 hover:bg-blue-500/20'
                      : 'bg-gray-500/10 text-gray-400 border-gray-500/40 hover:bg-gray-500/20'
                  }`}
                >
                  <span>{open ? 'Abierto' : 'Cerrado'}</span>
                </button>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-500/40 whitespace-nowrap">
                  {biz.category === 'Papa de comer' ? 'Comida' : biz.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveBiz(biz);
                  }}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/40 hover:bg-[#FFD700]/20"
                >
                  <ShoppingCart className="h-3 w-3" />
                  <span>Ver Detalles</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No se encontraron negocios con este filtro.
          </div>
        )}
      </div>

      {/* Business Detail Modal */}
      {activeBiz && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="relative h-44 bg-gray-950">
              <img
                src={activeBiz.imageUrl}
                alt={activeBiz.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveBiz(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#FFD700]/10 text-[#FFD700] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide border border-[#FFD700]/40">
                  {activeBiz.category === 'Papa de comer' ? 'Comida' : activeBiz.category}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <h4 className="text-white text-xl font-bold tracking-tight">{activeBiz.name}</h4>
              <p className="text-gray-300 text-xs leading-relaxed">{activeBiz.description}</p>

              <div className="bg-white/[0.02] rounded-xl border border-white/10 p-3.5 space-y-2.5 text-xs">
                {activeBiz.phone && (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Phone className="h-4 w-4 text-[#FFD700] shrink-0" />
                    <span className="text-white">{activeBiz.phone}</span>
                  </div>
                )}
                {activeBiz.address && (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="h-4 w-4 text-[#22c55e] shrink-0" />
                    <span className="text-white">{activeBiz.address}</span>
                  </div>
                )}
                {activeBiz.openHours && (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="h-4 w-4 text-gray-500 shrink-0" />
                    <span className="text-white">{activeBiz.openHours}</span>
                  </div>
                )}
                {activeBiz.facebook && (
                  <a
                    href={activeBiz.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition"
                  >
                    <span className="text-[10px] font-bold">f</span>
                    <span className="text-xs">Ver en Facebook</span>
                  </a>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setActiveBiz(null)}
                  className="flex-1 bg-black text-gray-300 hover:text-white border border-white/10 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    onShowNotification('🛒 Pedido Directo', `Iniciando contacto para pedido en "${activeBiz.name}".`);
                    setActiveBiz(null);
                  }}
                  className="flex-1 bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20 border border-[#FFD700]/40 py-2.5 rounded-lg text-xs font-extrabold transition cursor-pointer"
                >
                  {activeBiz.actionText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Business Form Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleRegisterBusiness}
            className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-150"
          >
            <div className="p-4 bg-[#FFD700]/10 text-[#FFD700] border-b border-[#FFD700]/20 flex justify-between items-center">
              <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                <Store className="h-4 w-4" />
                <span>Registrar Emprendimiento</span>
              </h4>
              <button type="button" onClick={() => setShowRegisterForm(false)} className="hover:opacity-75 text-gray-400">
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Nombre del Negocio <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio/llenar</span></label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Panadería San Juan"
                  className="w-full bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="border-t border-white/5" />

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-emerald-400 text-[10px] uppercase font-bold">Categoría <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio</span></label>
                  <select
                    required
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="Comida">Comida / Alimentos</option>
                    <option value="Papa de comer">Papa de comer</option>
                    <option value="Ropa">Ropa / Moda</option>
                    <option value="Plantas">Plantas / Vivero</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-emerald-400 text-[10px] uppercase font-bold">Zona / Barrio <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio</span></label>
                    <select
                    required
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="El Trigal">El Trigal</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-white/5" />

              <div className="space-y-1">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Descripción del Negocio <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio/llenar</span></label>
                <textarea
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ej: Elaboramos pan caliente de horno a leña y repostería típica tarijeña. Contamos con servicio a domicilio y atención personalizada."
                  className="w-full bg-[#080a0f] text-white p-3 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700] focus:ring-0 resize-none"
                />
              </div>

              <div className="border-t border-white/5" />

              <div className="space-y-2">
                <div className="grid grid-cols-[1fr_auto] gap-1.5 items-end">
                  <label className="text-emerald-400 text-[10px] uppercase font-bold">Celular/Teléfono del negocio</label>
                  <label className="text-emerald-400 text-[10px] uppercase font-bold text-center">¿Tienes WhatsApp?</label>
                </div>
                {newPhones.map((phone, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-1.5 items-start">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        const next = [...newPhones];
                        next[i] = e.target.value;
                        setNewPhones(next);
                      }}
                      placeholder="Coloca tu número de celular aquí"
                      className="w-full bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                    <div className="flex gap-2 items-center h-full py-2">
                      {['Sí', 'No'].map(opt => {
                        const isSelected = opt === 'Sí' ? phoneWhatsapp[i] : !phoneWhatsapp[i];
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setPhoneWhatsapp(prev => { const next = [...prev]; next[i] = opt === 'Sí'; return next; })}
                            className={`flex items-center gap-1 text-[10px] font-semibold transition cursor-pointer ${
                              isSelected ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition ${
                              isSelected ? 'border-gray-400' : 'border-gray-500'
                            }`}>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-gray-400" />}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {newPhones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setNewPhones(prev => prev.filter((_, j) => j !== i));
                          setPhoneWhatsapp(prev => prev.filter((_, j) => j !== i));
                        }}
                        className="text-red-400 hover:text-red-300 p-1.5 transition cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {newPhones.length < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      setNewPhones(prev => [...prev, '']);
                      setPhoneWhatsapp(prev => [...prev, false]);
                    }}
                    className="bg-white/5 border border-dashed border-white/20 hover:border-[#FFD700]/40 text-gray-400 hover:text-[#FFD700] px-3 py-1.5 rounded-lg text-[10px] font-semibold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <PlusCircle className="h-3 w-3" />
                    <span>Agregar Celular/Teléfono</span>
                  </button>
                )}
              </div>

              <div className="border-t border-white/5" />

              <div className="space-y-2">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Marca las redes sociales de tu negocio o servicio</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Facebook', 'TikTok', 'Instagram', 'YouTube', 'WhatsApp', 'X (Twitter)'].map(net => {
                    const isActive = net in socialNetworks;
                    return (
                      <button
                        key={net}
                        type="button"
                        onClick={() => {
                          if (isActive) {
                            const next = { ...socialNetworks };
                            delete next[net];
                            setSocialNetworks(next);
                          } else {
                            setSocialNetworks(prev => ({ ...prev, [net]: '' }));
                          }
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer border ${
                          isActive
                            ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {net}
                      </button>
                    );
                  })}
                </div>
                {Object.entries(socialNetworks).map(([net, url]) => (
                  <div key={net} className="flex gap-1.5 items-start">
                    <span className="text-[#FFD700] text-[10px] font-bold w-20 shrink-0 mt-2.5">{net}</span>
                    <div className="flex-1 flex gap-1.5 items-start">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setSocialNetworks(prev => ({ ...prev, [net]: e.target.value }))}
                        placeholder={`https://${net.toLowerCase().replace(/\s+\(.*\)/, '').replace(' ', '')}.com/tunegocio`}
                        className="flex-1 bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const next = { ...socialNetworks };
                          delete next[net];
                          setSocialNetworks(next);
                        }}
                        className="text-red-400 hover:text-red-300 p-1.5 transition cursor-pointer mt-1"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5" />

              <div className="space-y-2">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Marca los días de la semana laborales</label>
                <div className="flex flex-wrap gap-1.5">
                  {weekDays.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer border ${
                        selectedDays[day]
                          ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5" />

              <div className="space-y-2">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Turnos de atención disponibles</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Mañana', 'Tarde', 'Noche', 'Madrugada'].map(shift => (
                    <button
                      key={shift}
                      type="button"
                      onClick={() => toggleShift(shift)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer border ${
                        selectedShifts[shift]
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/40'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {shift}
                    </button>
                  ))}
                </div>
              </div>

              {Object.entries(selectedShifts).filter(([, v]) => v).map(([shift]) => {
                const hours = shiftHourRanges[shift] || [];
                return (
                <div key={shift}>
                  <label className="text-gray-400 text-[10px] uppercase font-bold mb-1.5 block">{shift}</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <span className="text-[9px] text-gray-500">Desde</span>
                      <div className="flex gap-1.5 items-center">
                        <select
                          value={shiftTimes[shift]?.from?.split(':')[0] || ''}
                          onChange={(e) => setShiftTime(shift, 'from', `${e.target.value}:${shiftTimes[shift]?.from?.split(':')[1] || '00'}`)}
                          className="w-16 bg-[#080a0f] text-white px-1 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700] text-center"
                        >
                          <option value="">hh</option>
                          {hours.map(h => (
                            <option key={h} value={h}>{h} h</option>
                          ))}
                        </select>
                        <span className="text-gray-600 text-xs">:</span>
                        <select
                          value={shiftTimes[shift]?.from?.split(':')[1] || ''}
                          onChange={(e) => setShiftTime(shift, 'from', `${shiftTimes[shift]?.from?.split(':')[0] || hours[0] || '00'}:${e.target.value}`)}
                          className="w-16 bg-[#080a0f] text-white px-1 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700] text-center"
                        >
                          <option value="">mm</option>
                          {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                            <option key={m} value={m}>{m} min</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-gray-500">Hasta</span>
                      <div className="flex gap-1.5 items-center">
                        <select
                          value={shiftTimes[shift]?.until?.split(':')[0] || ''}
                          onChange={(e) => setShiftTime(shift, 'until', `${e.target.value}:${shiftTimes[shift]?.until?.split(':')[1] || '00'}`)}
                          className="w-16 bg-[#080a0f] text-white px-1 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700] text-center"
                        >
                          <option value="">hh</option>
                          {hours.map(h => (
                            <option key={h} value={h}>{h} h</option>
                          ))}
                        </select>
                        <span className="text-gray-600 text-xs">:</span>
                        <select
                          value={shiftTimes[shift]?.until?.split(':')[1] || ''}
                          onChange={(e) => setShiftTime(shift, 'until', `${shiftTimes[shift]?.until?.split(':')[0] || hours[0] || '00'}:${e.target.value}`)}
                          className="w-16 bg-[#080a0f] text-white px-1 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700] text-center"
                        >
                          <option value="">mm</option>
                          {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                            <option key={m} value={m}>{m} min</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}

              <div className="border-t border-white/5" />

              {/* Image URLs */}
              <div className="space-y-2">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Imágenes del negocio o servicio</label>
                {imageUrls.length + deviceImages.length >= 5 && (
                  <p className="text-[10px] text-red-400 font-medium">Máximo 5 imágenes en total entre URL y dispositivo.</p>
                )}
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files) return;
                      const remaining = 5 - (imageUrls.length + deviceImages.length);
                      if (remaining <= 0) {
                        onShowNotification('Límite alcanzado', 'Solo puedes agregar hasta 5 imágenes en total entre URL y dispositivo.');
                        return;
                      }
                      const toRead = Array.from(files).slice(0, remaining);
                      const readers = toRead.map(file => new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.readAsDataURL(file);
                      }));
                      Promise.all(readers).then(dataUrls => {
                        setDeviceImages(prev => [...prev, ...dataUrls]);
                      });
                      e.target.value = '';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (imageUrls.length + deviceImages.length >= 5) {
                        onShowNotification('Límite alcanzado', 'Solo puedes agregar hasta 5 imágenes en total entre URL y dispositivo.');
                        return;
                      }
                      fileInputRef.current?.click();
                    }}
                    className="w-full bg-white/5 border border-dashed border-white/20 hover:border-blue-500/40 text-gray-400 hover:text-blue-400 px-3 py-2.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Subir desde dispositivo</span>
                  </button>
                  {deviceImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {deviceImages.map((dataUrl, i) => (
                        <div key={i} className="relative w-14 h-14">
                          <div className="w-full h-full rounded-lg overflow-hidden border border-white/10">
                            <img src={dataUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setDeviceImages(prev => prev.filter((_, j) => j !== i))}
                            className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-2.5 h-2.5 flex items-center justify-center shadow transition"
                          >
                            <X className="h-2 w-2 stroke-[3]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (imageUrls.length + deviceImages.length >= 5) {
                        onShowNotification('Límite alcanzado', 'Solo puedes agregar hasta 5 imágenes en total entre URL y dispositivo.');
                        return;
                      }
                      setImageUrls(prev => [...prev, '']);
                    }}
                    className="w-full bg-white/5 border border-dashed border-white/20 hover:border-[#FFD700]/40 text-gray-400 hover:text-[#FFD700] px-3 py-2.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Agregar imagen a través de URL</span>
                  </button>
                  {imageUrls.map((url, i) => (
                    <div key={i} className="flex gap-1.5 items-start">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                          const next = [...imageUrls];
                          next[i] = e.target.value;
                          setImageUrls(next);
                        }}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="flex-1 bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                      <button
                        type="button"
                        onClick={() => setImageUrls(prev => prev.filter((_, j) => j !== i))}
                        className="text-red-400 hover:text-red-300 p-1.5 transition cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-gray-500">{imageUrls.length + deviceImages.length} / 5 imágenes</p>
              </div>

              <div className="border-t border-white/5" />

              {/* Video URLs - YouTube */}
              <div className="space-y-2">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Videos de YouTube con referencia al negocio</label>
                {videoUrls.length >= 5 && (
                  <p className="text-[10px] text-red-400 font-medium">Máximo 5 videos.</p>
                )}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (videoUrls.length >= 5) {
                        onShowNotification('Límite alcanzado', 'Solo puedes agregar hasta 5 videos de YouTube.');
                        return;
                      }
                      setVideoUrls(prev => [...prev, 'https://www.youtube.com/watch?v=']);
                    }}
                    className="w-full bg-white/5 border border-dashed border-white/20 hover:border-[#FFD700]/40 text-gray-400 hover:text-[#FFD700] px-3 py-2.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Agregar video de YouTube por URL</span>
                  </button>
                  {videoUrls.map((url, i) => (
                    <div key={i} className="flex gap-1.5 items-start">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                          const next = [...videoUrls];
                          next[i] = e.target.value;
                          setVideoUrls(next);
                        }}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1 bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                      <button
                        type="button"
                        onClick={() => setVideoUrls(prev => prev.filter((_, j) => j !== i))}
                        className="text-red-400 hover:text-red-300 p-1.5 transition cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-gray-500">{videoUrls.length} / 5 videos</p>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowRegisterForm(false)}
                  className="flex-1 bg-black text-gray-400 border border-white/10 py-2.5 rounded-lg text-xs font-bold hover:text-white transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#FFD700]/10 text-[#FFD700] py-2.5 rounded-lg text-xs font-extrabold hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer"
                >
                  Publicar Negocio
                </button>
              </div>
            </div>
          </form>
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
              const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar negocios..."]');
              el?.focus();
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="w-10 bg-gray-600/30 hover:bg-gray-600/40 text-gray-200 border border-gray-500/50 backdrop-blur-md rounded-l-xl flex flex-col items-center gap-0 py-1 text-[9px] font-semibold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            title="Buscar negocios"
          >
            <Search className="w-4 h-4" />
            <span className="text-[8px] font-semibold leading-none text-center">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
