import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Search, Calendar, MapPin, Phone, Building2, X, LayoutGrid, CheckCircle, PanelLeft, Pill, PawPrint, Store, HelpCircle, ChevronDown, Heart, PlusCircle, Upload, Home, MessageCircle } from 'lucide-react';
import { LostPet, DaySchedule } from '../types';

function CustomSelect({ value, onChange, placeholder, options, className }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className || ''}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-[#080a0f] text-white px-1 py-2 rounded-lg border border-white/10 text-[10px] focus:outline-none focus:border-[#FFD700] flex items-center justify-center gap-0.5"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`h-2.5 w-2.5 text-gray-500 shrink-0 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-0.5 bg-[#080a0f] border border-white/10 rounded-lg max-h-[120px] overflow-y-auto z-50 shadow-xl"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#555 transparent' }}
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-2 py-1 text-[10px] transition hover:bg-white/10 ${
                value === opt.value ? 'text-[#FFD700] bg-[#FFD700]/10' : 'text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DayPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-[#080a0f] text-white px-1 py-2 rounded-lg border border-white/10 text-[10px] focus:outline-none focus:border-[#FFD700] flex items-center justify-center gap-0.5"
      >
        <span>{value || 'Día'}</span>
        <ChevronDown className={`h-2.5 w-2.5 text-gray-500 shrink-0 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 bg-[#080a0f] border border-white/10 rounded-lg p-1.5 z-50 shadow-xl w-[160px]">
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: 31 }, (_, i) => {
              const d = String(i + 1);
              const selected = value === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => { onChange(d); setOpen(false); }}
                  className={`w-5 h-5 rounded text-[10px] font-semibold transition flex items-center justify-center ${
                    selected
                      ? 'bg-[#FFD700] text-black'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function YearPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const years = Array.from({ length: 12 }, (_, i) => String(2026 - i));

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-[#080a0f] text-white px-1 py-2 rounded-lg border border-white/10 text-[10px] focus:outline-none focus:border-[#FFD700] flex items-center justify-center gap-0.5"
      >
        <span>{value || 'Año'}</span>
        <ChevronDown className={`h-2.5 w-2.5 text-gray-500 shrink-0 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 bg-[#080a0f] border border-white/10 rounded-lg p-1.5 z-50 shadow-xl w-[160px]">
          <div className="grid grid-cols-3 gap-1.5">
            {years.map(y => {
              const selected = value === y;
              return (
                <button
                  key={y}
                  type="button"
                  onClick={() => { onChange(y); setOpen(false); }}
                  className={`w-full px-1 py-1.5 rounded text-[10px] font-semibold transition flex items-center justify-center ${
                    selected
                      ? 'bg-blue-600 text-white'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface MascotasViewProps {
  mascotas: LostPet[];
  onShowNotification: (title: string, message: string) => void;
}

const DEFAULT_IMAGES: Record<string, string> = {
  Perro: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
  Gato: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
  Aves: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
  Otras: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
};

export default function MascotasView({ mascotas, onShowNotification }: MascotasViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activePet, setActivePet] = useState<LostPet | null>(null);
  const [contactPet, setContactPet] = useState<LostPet | null>(null);
  const [schedulePet, setSchedulePet] = useState<LostPet | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [viewMode, setViewMode] = useState<string>('mascotas');
  const [showViewModal, setShowViewModal] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [stickyBarWidth, setStickyBarWidth] = useState(0);

  const [pets, setPets] = useState<LostPet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<string>('Perro');
  const [newDesc, setNewDesc] = useState('');
  const [newSeen, setNewSeen] = useState('');
  const [newPhones, setNewPhones] = useState<string[]>(['']);
  const [phoneWhatsapp, setPhoneWhatsapp] = useState<boolean[]>([false]);
  const [newNeigh, setNewNeigh] = useState('');
  const [newDateDay, setNewDateDay] = useState('');
  const [newDateMonth, setNewDateMonth] = useState('');
  const [newDateYear, setNewDateYear] = useState('2026');
  const [petImageUrls, setPetImageUrls] = useState<string[]>([]);
  const [petDeviceImages, setPetDeviceImages] = useState<string[]>([]);
  const [petVideoUrls, setPetVideoUrls] = useState<string[]>([]);
  const petFileRef = useRef<HTMLInputElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [showFloatingBtns, setShowFloatingBtns] = useState(false);

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
    const stored = localStorage.getItem('barrio_mascotas_extra');
    if (stored) {
      try {
        const extra: LostPet[] = JSON.parse(stored);
        setPets([...extra, ...mascotas]);
      } catch (e) {
        setPets(mascotas);
      }
    } else {
      setPets(mascotas);
    }
  }, [mascotas]);

  const savePets = (list: LostPet[]) => {
    const extraItems = list.filter(p => p.id.startsWith('custom_'));
    setPets(list);
    localStorage.setItem('barrio_mascotas_extra', JSON.stringify(extraItems));
  };

  const categories = ['Todos', 'Perros', 'Gatos', 'Aves', 'Otras'];

  const categoryIcons: Record<string, React.ReactNode> = {
    Todos: <LayoutGrid className="w-4 h-4" />,
    Perros: <HelpCircle className="w-4 h-4" />,
    Gatos: <HelpCircle className="w-4 h-4" />,
    Aves: <HelpCircle className="w-4 h-4" />,
    Otras: <HelpCircle className="w-4 h-4" />,
  };

  const viewOptions = [
    { id: 'eventos', label: 'Eventos', icon: <Calendar className="w-4 h-4" /> },
    { id: 'proyectos', label: 'Proyectos', icon: <PanelLeft className="w-4 h-4" /> },
    { id: 'farmacias', label: 'Farmacias', icon: <Pill className="w-4 h-4" /> },
    { id: 'mascotas', label: 'Mascotas', icon: <PawPrint className="w-4 h-4" /> },
    { id: 'negocios', label: 'Negocios', icon: <Store className="w-4 h-4" /> },
  ];

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) ||
                          pet.description.toLowerCase().includes(search.toLowerCase());
    let matchesCategory = false;
    if (selectedCategory === 'Todos') {
      matchesCategory = true;
    } else if (selectedCategory === 'Perros') {
      matchesCategory = pet.type === 'Perro';
    } else if (selectedCategory === 'Gatos') {
      matchesCategory = pet.type === 'Gato';
    } else if (selectedCategory === 'Aves') {
      matchesCategory = pet.type === 'Aves';
    } else if (selectedCategory === 'Otras') {
      matchesCategory = pet.type !== 'Perro' && pet.type !== 'Gato' && pet.type !== 'Aves';
    }
    return matchesSearch && matchesCategory;
  });

  const getPhoneNumbers = (pet: LostPet): string[] => {
    if (pet.phones && pet.phones.length > 0) return pet.phones;
    return pet.contact ? [pet.contact] : [];
  };

  const handlePostReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhones[0] || !newSeen) return;

    const allImages = [...petImageUrls, ...petDeviceImages];

    const newReport: LostPet = {
      id: `custom_pet_${Date.now()}`,
      name: newName,
      type: newType,
      imageUrl: allImages[0] || DEFAULT_IMAGES[newType] || DEFAULT_IMAGES.Otras,
      description: newDesc,
      lastSeen: newSeen,
      contact: newPhones[0],
      phones: newPhones.filter(p => p.trim()).length > 0
        ? newPhones.map((p, i) => p.trim() ? `${p}${phoneWhatsapp[i] ? ' 📱WhatsApp' : ''}` : '').filter(Boolean)
        : undefined,
      neighborhood: newNeigh || 'El Trigal',
      date: newDateDay && newDateMonth && newDateYear ? `${newDateDay} de ${newDateMonth} de ${newDateYear}` : 'Hoy mismo',
      images: allImages.length > 0 ? allImages : undefined,
      videoUrl: petVideoUrls[0] || undefined,
    };

    const updated = [newReport, ...pets];
    savePets(updated);
    setShowForm(false);
    onShowNotification(
      '🐾 Alerta de Mascota Publicada',
      `La alerta de búsqueda para "${newName}" ha sido publicada exitosamente.`
    );

    setNewName('');
    setNewDesc('');
    setNewSeen('');
    setNewPhones(['']);
    setPhoneWhatsapp([false]);
    setNewNeigh('');
    setNewDateDay('');
    setNewDateMonth('');
    setNewDateYear('2026');
    setPetImageUrls([]);
    setPetDeviceImages([]);
    setPetVideoUrls([]);
  };

  return (
    <div className="flex flex-col space-y-5 relative">
      <div ref={sentinelRef} className="absolute top-0 left-0 w-px h-px pointer-events-none" />
      {/* Header title */}
      <div className="-mt-[16px]">
        <h2 className="text-gray-400 text-sm font-bold tracking-tight">Mascotas Perdidas:</h2>
        <p className="text-gray-400 text-xs mt-0">
          Ayuda a encontrar mascotas perdidas.
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
                    const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar mascotas..."]');
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
                  placeholder="Buscar mascotas..."
                  className="w-full bg-[#080a0f] text-white pl-10 pr-4 py-1.5 rounded-xl border border-white/10 text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#FFD700] transition"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ── Normal layout: search bar + category bar ── */
          <div className="relative">
            <div className="relative transition-all duration-300 ease-out">
              <div className="flex gap-2 -mt-[7px]">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-300" />
                  </span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar mascotas..."
                    className="w-full bg-[#080a0f] text-white pl-10 pr-4 py-1.5 rounded-xl border border-white/10 text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#FFD700] transition"
                  />
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#FFD700]/10 border border-[#FFD700]/20 hover:border-[#FFD700] text-[#FFD700] font-extrabold px-3 py-1.5 rounded-xl text-[11px] flex items-center gap-1.5 transition cursor-pointer shrink-0"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Añadir Mascota</span>
                </button>
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
                const displayName = cat === 'Todos' ? 'Todas las mascotas' : cat;
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

      {/* Pet Cards Section */}
      <div ref={cardsContainerRef} className="space-y-4 -mt-[4px]">
        {filteredPets.map((pet) => {
          // Vista tipo Proyectos (split horizontal)
          if (viewMode === 'proyectos') {
            return (
              <div
                key={pet.id}
                className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex h-[145px] tall:h-[165px] group"
              >
                <div className="w-[55%] tall:w-[38%] h-full bg-gray-950 overflow-hidden shrink-0">
                  <img src={pet.imageUrl} alt={pet.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="w-[45%] tall:w-[62%] p-2 tall:p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1.5 mb-1.5">
                      <h3 className="text-white text-sm font-bold leading-tight group-hover:text-[#FFD700] transition line-clamp-2">{pet.name}</h3>
                    </div>
                    <p className="text-gray-300 text-[10px] tall:text-[11px] leading-[1.4] line-clamp-3 tall:line-clamp-4">{pet.description}</p>
                  </div>
                  <div className="flex items-center justify-end mt-2 w-full">
                    <span onClick={() => setActivePet(pet)} className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] tall:text-[11px] font-bold px-[5px] tall:px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 transition border border-[#FFD700]/40 cursor-pointer shrink-0 text-center inline-block">
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
                key={pet.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <img src={pet.imageUrl} alt={pet.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#080a0f] to-transparent h-16 pointer-events-none" />
                </div>
                <div className="p-4 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{pet.name}</h3>
                    <span className="bg-[#22c55e]/40 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-[#22c55e]/40 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {pet.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-normal">{pet.description}</p>
                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                    <div className="flex items-center space-x-2.5 text-gray-300">
                      <MapPin className="h-4 w-4 text-[#22c55e] shrink-0" />
                      <span className="font-mono text-[11px]">Visto en: {pet.lastSeen}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-gray-400">
                      <Phone className="h-4 w-4 text-[#FFD700] shrink-0" />
                      <span className="font-mono text-[11px]">{getPhoneNumbers(pet)[0] || pet.contact}</span>
                      {getPhoneNumbers(pet).length > 1 && (
                        <span className="text-[9px] text-gray-500">+{getPhoneNumbers(pet).length - 1}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2.5 text-gray-400">
                      <Building2 className="h-4 w-4 text-gray-500 shrink-0" />
                      <span className="font-mono text-[11px]">{pet.neighborhood}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Vista tipo Eventos (header image + category + contact)
          if (viewMode === 'eventos') {
            return (
              <div
                key={pet.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD700]/30 transition"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <img src={pet.imageUrl} alt={pet.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-200" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white text-base font-bold tracking-tight">Se busca a "{pet.name}"</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{pet.description}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 text-[10px] font-extrabold px-2.5 py-1 rounded [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">{pet.type}</span>
                    <span className="bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] font-extrabold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 border border-[#FFD700]/40 transition cursor-pointer">
                      <Phone className="h-3.5 w-3.5" />
                      <span>Contactar</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Vista tipo Negocios (header image + type + action)
          if (viewMode === 'negocios') {
            return (
              <div
                key={pet.id}
                className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition flex flex-col group"
              >
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img src={pet.imageUrl} alt={pet.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-base font-bold tracking-tight">{pet.name}</h3>
                    <span className="bg-[#22c55e]/40 text-white border border-[#22c55e]/40 font-extrabold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {pet.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed max-h-16 line-clamp-2">{pet.description}</p>
                  <div className="pt-2 border-t border-white/5 mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 font-mono text-[#22c55e]">
                      <MapPin className="h-3.5 w-3.5 text-[#22c55e] shrink-0" />
                      <span>{pet.lastSeen}</span>
                    </div>
                    <span onClick={() => setActivePet(pet)} className="bg-[#FFD700]/10 text-[#FFD700] font-bold px-4 py-1.5 rounded-lg hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer">
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Default: Mascotas view (compact card)
          return (
            <div
              key={pet.id}
              className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition group"
            >
              <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 animate-pulse">
                  <span className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#FFD700]/40">
                    {pet.type}
                  </span>
                </div>
              </div>

              <div className="px-[10px] pt-[10px] pb-[6px] flex space-x-3 items-start">
                <div className="text-teal-400 bg-teal-500/10 p-2.5 rounded-lg shrink-0">
                  <PawPrint className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-bold tracking-tight mb-0.5 group-hover:text-[#FFD700] transition truncate">
                    {pet.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                    {pet.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center pb-[11px] px-3 gap-5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setContactPet(pet);
                  }}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap bg-white/5 text-gray-300 border border-white/10 hover:text-white"
                >
                  <Phone className="h-3 w-3" />
                  <span>Contactar</span>
                </button>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-500/40 whitespace-nowrap">
                  {pet.type}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePet(pet);
                  }}
                  className="bg-[#FFD700]/10 text-[#FFD700] text-[11px] font-extrabold px-3.5 py-1.5 rounded-lg group-hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer whitespace-nowrap"
                >
                  Ver Detalles
                </span>
              </div>
            </div>
          );
        })}

        {filteredPets.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No se encontraron mascotas con este filtro.
          </div>
        )}
      </div>

      {/* Pet Details Expanded Modal */}
      {activePet && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4">
          <div className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-md overflow-y-auto max-h-full animate-in fade-in zoom-in duration-200">
            <div className="relative h-44 bg-gray-950">
              <img
                src={activePet.imageUrl}
                alt={activePet.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePet(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#FFD700]/10 text-[#FFD700] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide border border-[#FFD700]/40">
                  {activePet.type}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-3 pb-16 sm:pb-5">
              <h4 className="text-white text-xl font-bold tracking-tight">Se busca a "{activePet.name}"</h4>

              <div className="flex gap-4">
                <div className="flex-1">
                  <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Nombre</h5>
                  <p className="text-white text-sm font-semibold">{activePet.name}</p>
                </div>
                <div className="flex-1">
                  <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Especie</h5>
                  <div className="relative">
                    <select
                      value={activePet.type}
                      className="w-full bg-[#080a0f] text-white text-sm font-semibold border border-white/10 rounded-lg px-2 py-1 appearance-none cursor-pointer focus:outline-none focus:border-[#FFD700]"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#555 transparent' }}
                    >
                      <option value="Perro">Perro</option>
                      <option value="Gato">Gato</option>
                      <option value="Ave">Ave</option>
                      <option value="Otros">Otros</option>
                    </select>
                    <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Última vez visto</h5>
                <div className="bg-white/[0.02] rounded-xl border border-white/10 p-3.5 text-xs">
                  <div className="flex items-start space-x-2 text-gray-400">
                    <MapPin className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                    <span className="text-white leading-relaxed">{activePet.lastSeen}</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Descripción</h5>
                <p className="text-gray-300 text-xs leading-relaxed">{activePet.description}</p>
              </div>

              <div>
                <h5 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">Contactos</h5>
                <div className="bg-white/[0.02] rounded-xl border border-white/10 p-3.5 space-y-2.5 text-xs">
                  {(() => {
                    const phones = getPhoneNumbers(activePet);
                    return phones.map((p, i) => {
                      const cleanPhone = p.replace(/[^0-9]/g, '');
                      return (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <Phone className="h-4 w-4 text-[#FFD700] shrink-0" />
                            <span className="text-white">{p}</span>
                          </div>
                          <button
                            onClick={() => {
                              const isMobile = window.innerWidth < 1024;
                              if (isMobile) {
                                window.location.href = `tel:${cleanPhone}`;
                              } else {
                                setContactPet(activePet);
                              }
                            }}
                            className="bg-blue-500/10 text-blue-400 border border-blue-500/40 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition cursor-pointer min-w-[66px] text-center"
                          >
                            {window.innerWidth < 1024 ? 'Llamar' : 'Enviar Mensaje'}
                          </button>
                        </div>
                      );
                    });
                  })()}
                  {activePet.facebook && (
                    <a
                      href={activePet.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition"
                    >
                      <span className="text-[10px] font-bold">f</span>
                      <span className="text-xs">Ver en Facebook</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex pt-2">
                <button
                  onClick={() => setActivePet(null)}
                  className="flex-1 bg-black text-gray-300 hover:text-white border border-white/10 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Options Modal */}
      {contactPet && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4">
          <div className="bg-[#0c101d] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 space-y-4">
              <div className="text-center">
                <h4 className="text-white text-lg font-bold">Contactar</h4>
                <p className="text-gray-400 text-xs mt-1">{contactPet.name}</p>
              </div>
              {(() => {
                const phones = getPhoneNumbers(contactPet);
                const phone = phones[0] || contactPet.contact;
                if (!phone) return null;
                return (
                  <>
                    <button
                      onClick={() => {
                        const clean = phone.replace(/[^0-9]/g, '');
                        window.location.href = `https://wa.me/${clean}`;
                        setContactPet(null);
                      }}
                      className="w-full flex items-center justify-center space-x-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-white border border-[#25D366]/40 py-3 rounded-xl text-sm font-bold transition cursor-pointer"
                    >
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        window.location.href = `tel:${phone}`;
                        setContactPet(null);
                      }}
                      className="w-full flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 rounded-xl text-sm font-bold transition cursor-pointer"
                    >
                      <Phone className="h-5 w-5 text-[#FFD700]" />
                      <span>Llamar</span>
                    </button>
                  </>
                );
              })()}
              <button
                onClick={() => setContactPet(null)}
                className="w-full text-gray-500 hover:text-gray-300 py-2 text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {schedulePet && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4">
          <div className="bg-[#0c101d] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 space-y-4">
              <div className="text-center">
                <h4 className="text-white text-lg font-bold">Horarios de Atención</h4>
                <p className="text-gray-400 text-xs mt-1">{schedulePet.name}</p>
              </div>
              <div className="space-y-1.5">
                {(schedulePet.schedule || []).length > 0 ? (
                  schedulePet.schedule!.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs ${
                        item.open
                          ? 'bg-[#22c55e]/10 border border-[#22c55e]/20'
                          : 'bg-white/5 border border-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            item.open ? 'bg-[#22c55e]' : 'bg-gray-500'
                          }`}
                        />
                        <span className={`font-bold ${item.open ? 'text-white' : 'text-gray-500'}`}>
                          {item.day}
                        </span>
                      </div>
                      <span className={`font-mono text-[11px] ${item.open ? 'text-gray-300' : 'text-gray-500'}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs text-center py-4">No hay horarios disponibles</p>
                )}
              </div>
              <button
                onClick={() => setSchedulePet(null)}
                className="w-full bg-black text-gray-300 hover:text-white border border-white/10 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Found footer + Publish button */}
      <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-5 flex flex-col items-center text-center space-y-3">
        <div className="bg-[#22c55e]/10 text-[#22c55e] p-2.5 rounded-full">
          <Heart className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">¿Encontraste un animal perdido?</h4>
          <p className="text-gray-400 text-xs leading-relaxed mt-1">
            Comunícate con el contacto o publica un aviso comunitario para guiarlo de vuelta.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#FFD700]/10 text-[#FFD700] px-5 py-2.5 rounded-xl text-xs font-extrabold hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer"
        >
          Publicar Aviso
        </button>
      </div>

      {/* Add Pet Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center pt-14 pb-14 md:pt-4 md:pb-4 px-4">
          <form
            onSubmit={handlePostReport}
            className="bg-[#080a0f] border border-white/10 rounded-2xl w-full max-w-sm overflow-y-auto max-h-full animate-in fade-in zoom-in duration-150"
          >
            <div className="p-4 bg-[#FFD700]/10 text-[#FFD700] border-b border-[#FFD700]/20 flex justify-between items-center">
              <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                <PawPrint className="h-4 w-4" />
                <span>Añadir Mascota Extraviada</span>
              </h4>
              <button type="button" onClick={() => setShowForm(false)} className="hover:opacity-75 text-gray-400">
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-emerald-400 text-[10px] uppercase font-bold">Nombre <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio/llenar</span></label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ej: Rocky"
                    className="w-full bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-emerald-400 text-[10px] uppercase font-bold">Tipo Mascota</label>
                  <select
                    required
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Aves">Aves</option>
                    <option value="Otras">Otras</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-white/5" />

              <div className="space-y-1">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Descripción <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio/llenar</span></label>
                <textarea
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ej: Golden retriever con collar azul, es tímido pero no muerde..."
                  className="w-full bg-[#080a0f] text-white p-3 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700] focus:ring-0 resize-none"
                />
              </div>

              <div className="border-t border-white/5" />

              <div className="space-y-1">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Última vez visto <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio/llenar</span></label>
                <textarea
                  required
                  rows={3}
                  value={newSeen}
                  onChange={(e) => setNewSeen(e.target.value)}
                  placeholder="Ej: Cerca de la Plaza, detrás del kiosco de Don José, cuando me di vuelta ya no lo vi más..."
                  className="w-full bg-[#080a0f] text-white p-3 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700] focus:ring-0 resize-none"
                />
              </div>

              <div className="border-t border-white/5" />

              <div className="space-y-2">
                <div className="grid grid-cols-[1fr_auto] gap-1.5 items-end">
                  <label className="text-emerald-400 text-[10px] uppercase font-bold">Celular/Teléfono <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio/llenar</span></label>
                  <label className="text-emerald-400 text-[10px] uppercase font-bold text-center">¿WhatsApp?</label>
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
                            onClick={() =>
                              setPhoneWhatsapp(prev => {
                                const next = [...prev];
                                next[i] = opt === 'Sí';
                                return next;
                              })
                            }
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

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-emerald-400 text-[10px] uppercase font-bold">Zona / Barrio <span className="text-red-400">*</span> <span className="text-[8px] text-gray-500 font-normal lowercase">obligatorio</span></label>
                  <select
                    required
                    value={newNeigh}
                    onChange={(e) => setNewNeigh(e.target.value)}
                    className="w-full bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="El Trigal">El Trigal</option>
                    <option value="Centro">Centro</option>
                    <option value="El Molino">El Molino</option>
                    <option value="San Roque">San Roque</option>
                    <option value="Lourdes">Lourdes</option>
                    <option value="Las Palmeras">Las Palmeras</option>
                    <option value="Otro">Otra zona</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-emerald-400 text-[10px] uppercase font-bold">Fecha</label>
                  <div className="flex gap-1.5">
                    <DayPicker
                      value={newDateDay}
                      onChange={setNewDateDay}
                    />
                    <CustomSelect
                      value={newDateMonth}
                      onChange={setNewDateMonth}
                      placeholder="Mes"
                      options={['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'].map(m => ({ value: m, label: m.charAt(0).toUpperCase() + m.slice(1) }))}
                      className="flex-[2] min-w-0"
                    />
                    <YearPicker
                      value={newDateYear}
                      onChange={setNewDateYear}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5" />

              {/* Images */}
              <div className="space-y-2">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Imágenes de la mascota</label>
                {petImageUrls.length + petDeviceImages.length >= 5 && (
                  <p className="text-[10px] text-red-400 font-medium">Máximo 5 imágenes en total entre URL y dispositivo.</p>
                )}
                <div className="flex flex-col gap-2">
                  <input
                    ref={petFileRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files) return;
                      const remaining = 5 - (petImageUrls.length + petDeviceImages.length);
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
                        setPetDeviceImages(prev => [...prev, ...dataUrls]);
                      });
                      e.target.value = '';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (petImageUrls.length + petDeviceImages.length >= 5) {
                        onShowNotification('Límite alcanzado', 'Solo puedes agregar hasta 5 imágenes en total entre URL y dispositivo.');
                        return;
                      }
                      petFileRef.current?.click();
                    }}
                    className="w-full bg-white/5 border border-dashed border-white/20 hover:border-blue-500/40 text-gray-400 hover:text-blue-400 px-3 py-2.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Subir desde dispositivo</span>
                  </button>
                  {petDeviceImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {petDeviceImages.map((dataUrl, i) => (
                        <div key={i} className="relative w-14 h-14">
                          <div className="w-full h-full rounded-lg overflow-hidden border border-white/10">
                            <img src={dataUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setPetDeviceImages(prev => prev.filter((_, j) => j !== i))}
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
                      if (petImageUrls.length + petDeviceImages.length >= 5) {
                        onShowNotification('Límite alcanzado', 'Solo puedes agregar hasta 5 imágenes en total entre URL y dispositivo.');
                        return;
                      }
                      setPetImageUrls(prev => [...prev, '']);
                    }}
                    className="w-full bg-white/5 border border-dashed border-white/20 hover:border-[#FFD700]/40 text-gray-400 hover:text-[#FFD700] px-3 py-2.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Agregar imagen a través de URL</span>
                  </button>
                  {petImageUrls.map((url, i) => (
                    <div key={i} className="flex gap-1.5 items-start">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                          const next = [...petImageUrls];
                          next[i] = e.target.value;
                          setPetImageUrls(next);
                        }}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="flex-1 bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                      <button
                        type="button"
                        onClick={() => setPetImageUrls(prev => prev.filter((_, j) => j !== i))}
                        className="text-red-400 hover:text-red-300 p-1.5 transition cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-gray-500">{petImageUrls.length + petDeviceImages.length} / 5 imágenes</p>
              </div>

              <div className="border-t border-white/5" />

              {/* Video URLs - YouTube */}
              <div className="space-y-2">
                <label className="text-emerald-400 text-[10px] uppercase font-bold">Videos de YouTube con referencia a la mascota</label>
                {petVideoUrls.length >= 5 && (
                  <p className="text-[10px] text-red-400 font-medium">Máximo 5 videos.</p>
                )}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (petVideoUrls.length >= 5) {
                        onShowNotification('Límite alcanzado', 'Solo puedes agregar hasta 5 videos de YouTube.');
                        return;
                      }
                      setPetVideoUrls(prev => [...prev, 'https://www.youtube.com/watch?v=']);
                    }}
                    className="w-full bg-white/5 border border-dashed border-white/20 hover:border-[#FFD700]/40 text-gray-400 hover:text-[#FFD700] px-3 py-2.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Agregar video de YouTube por URL</span>
                  </button>
                  {petVideoUrls.map((url, i) => (
                    <div key={i} className="flex gap-1.5 items-start">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                          const next = [...petVideoUrls];
                          next[i] = e.target.value;
                          setPetVideoUrls(next);
                        }}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1 bg-[#080a0f] text-white px-3 py-2 rounded-lg border border-white/10 text-xs focus:outline-none focus:border-[#FFD700]"
                      />
                      <button
                        type="button"
                        onClick={() => setPetVideoUrls(prev => prev.filter((_, j) => j !== i))}
                        className="text-red-400 hover:text-red-300 p-1.5 transition cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-gray-500">{petVideoUrls.length} / 5 videos</p>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-black text-gray-400 border border-white/10 py-2.5 rounded-lg text-xs font-bold hover:text-white transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#FFD700]/10 text-[#FFD700] py-2.5 rounded-lg text-xs font-extrabold hover:bg-[#FFD700]/20 border border-[#FFD700]/40 transition cursor-pointer"
                >
                  Publicar Alerta
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Floating quick-action buttons (slide in from left on scroll) */}
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
              const el = document.querySelector<HTMLInputElement>('input[placeholder="Buscar mascotas..."]');
              el?.focus();
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="w-10 bg-gray-600/30 hover:bg-gray-600/40 text-gray-200 border border-gray-500/50 backdrop-blur-md rounded-l-xl flex flex-col items-center gap-0 py-1 text-[9px] font-semibold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            title="Buscar mascotas"
          >
            <Search className="w-4 h-4" />
            <span className="text-[8px] font-semibold leading-none text-center">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
