import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, HeartHandshake, HelpCircle, X, Bell, Eye } from 'lucide-react';
import { NeighborhoodEvent } from '../types';

interface EventosViewProps {
  eventos: NeighborhoodEvent[];
  onShowNotification: (title: string, message: string) => void;
}

export default function EventosView({ eventos, onShowNotification }: EventosViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeEvent, setActiveEvent] = useState<NeighborhoodEvent | null>(null);
  const [subscribedEvents, setSubscribedEvents] = useState<Record<string, boolean>>({});

  const categories = ['Todos', 'Comunidad', 'Salud', 'Medio'];

  const filteredEvents = eventos.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
                          event.description.toLowerCase().includes(search.toLowerCase());
    
    let matchesCategory = false;
    if (selectedCategory === 'Todos') {
      matchesCategory = true;
    } else if (selectedCategory === 'Medio') {
      matchesCategory = event.category === 'Medio';
    } else {
      matchesCategory = event.category.toLowerCase() === selectedCategory.toLowerCase();
    }

    return matchesSearch && matchesCategory;
  });

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
      case 'users': return <div className="text-brand-green bg-[#2ECC71]/10 p-2.5 rounded-lg shrink-0"><Users className="h-5 w-5" /></div>;
      case 'gift': return <div className="text-amber-400 bg-amber-500/10 p-2.5 rounded-lg shrink-0"><HeartHandshake className="h-5 w-5" /></div>;
      case 'heart-pulse': return <div className="text-blue-400 bg-blue-500/10 p-2.5 rounded-lg shrink-0"><Eye className="h-5 w-5" /></div>;
      default: return <div className="text-brand-yellow bg-brand-yellow/10 p-2.5 rounded-lg shrink-0"><HelpCircle className="h-5 w-5" /></div>;
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Header title */}
      <div>
        <h2 className="text-white text-2xl font-bold tracking-tight font-sans">Eventos del Barrio</h2>
        <p className="text-gray-400 text-xs mt-1">
          Participa y disfruta de los eventos que fortalecen la unión y el bienestar de nuestra comunidad.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar eventos..."
          className="w-full bg-[#1c1b1b] text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-800 text-sm focus:outline-none focus:border-brand-yellow transition"
        />
      </div>

      {/* Category Chips */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#2ECC71] text-gray-950 border-[#2ECC71]'
                : 'bg-transparent text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            {cat === 'Medio' ? 'Medio Ambiente' : cat}
          </button>
        ))}
      </div>

      {/* Event Cards Section */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            onClick={() => setActiveEvent(evt)}
            className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden hover:border-brand-yellow/40 transition cursor-pointer group"
          >
            {/* Aspect Ratio 16/9 for beautiful photos matching designs */}
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              <img
                src={evt.imageUrl}
                alt={evt.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-[#2ECC71] text-gray-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {evt.category === 'Medio' ? 'Medio Ambiente' : evt.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex space-x-3.5 items-start">
              {/* Dynamic Icon */}
              {getIcon(evt.icon)}

              {/* Title & brief */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-base font-bold tracking-tight mb-1 group-hover:text-brand-yellow transition truncate">
                  {evt.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-900 mt-3">
                  <span className="text-[10px] uppercase font-mono text-gray-500">Barrio El Trigal</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubscribe(evt.id, evt.title);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                        subscribedEvents[evt.id]
                          ? 'bg-brand-green/20 text-brand-green border border-brand-green/30'
                          : 'bg-black/30 text-gray-300 border border-gray-800 hover:text-white'
                      }`}
                    >
                      <Bell className={`h-3 w-3 ${subscribedEvents[evt.id] ? 'fill-current' : ''}`} />
                      <span>{subscribedEvents[evt.id] ? 'Inscrito' : 'Asistiré'}</span>
                    </button>
                    <span className="bg-brand-yellow text-gray-950 text-[11px] font-extrabold px-3.5 py-1.5 rounded-lg group-hover:bg-yellow-400 transition cursor-pointer">
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No se encontraron eventos programados para esta búsqueda.
          </div>
        )}
      </div>

      {/* Event Details Expanded Modal */}
      {activeEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="relative h-44 bg-gray-950">
              <img
                src={activeEvent.imageUrl}
                alt={activeEvent.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#2ECC71] text-gray-950 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {activeEvent.category === 'Medio' ? 'Medio Ambiente' : activeEvent.category}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <h4 className="text-white text-xl font-bold tracking-tight">{activeEvent.title}</h4>
              <p className="text-gray-300 text-xs leading-relaxed">{activeEvent.description}</p>

              <div className="bg-[#181818] rounded-xl border border-gray-800 p-3.5 space-y-2.5 text-xs">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="h-4 w-4 text-brand-yellow shrink-0" />
                  <span className="text-white">Sábado, 24 de Mayo de 2026</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="h-4 w-4 text-brand-green shrink-0" />
                  <span className="text-white">Sede Vecinal - Plaza Principal El Trigal</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setActiveEvent(null)}
                  className="flex-1 bg-black text-gray-300 hover:text-white border border-gray-800 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    handleSubscribe(activeEvent.id, activeEvent.title);
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    subscribedEvents[activeEvent.id]
                      ? 'bg-brand-green/20 text-brand-green border border-brand-green/30'
                      : 'bg-brand-yellow text-gray-950 hover:bg-yellow-400'
                  }`}
                >
                  {subscribedEvents[activeEvent.id] ? 'Inscripto ✓' : 'Anotarse al Evento'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
