import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Plus, Check, Star, Search, PlusCircle, AlertCircle, Phone } from 'lucide-react';
import { LOST_PETS, LOCAL_BUSINESSES, PHARMACIES, NEIGHBORHOOD_EVENTS } from '../data.alarma';
import { MockLostPet, MockLocalBusiness, MockPharmacy, MockNeighborhoodEvent } from '../types.alarma';
import { playTone } from './AudioSiren';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'eventos' | 'farmacias' | 'mascotas' | 'negocios';
}

/**
 * Modal de detalle para accesos rápidos de la Central Alarma.
 * Usa datos MOCK (decisión 4.2): NO se conecta a Google Sheets.
 *
 * Responsive (sección 5.1):
 *  - sin prefijo / `tall:` (mobile): hoja completa `fixed inset-0`.
 *  - `sm:` (≥ 640px): modal centrado estilo origen (w-[850px]).
 */
export default function DetailModal({ isOpen, onClose, type }: DetailModalProps) {
  // State for Eventos
  const [eventsList, setEventsList] = useState<MockNeighborhoodEvent[]>(NEIGHBORHOOD_EVENTS);
  const [attendedEvents, setAttendedEvents] = useState<string[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', description: '' });

  // State for Farmacias
  const [pharmaciesList] = useState<MockPharmacy[]>(PHARMACIES);

  // State for Mascotas
  const [petsList, setPetsList] = useState<MockLostPet[]>(LOST_PETS);
  const [showPetForm, setShowPetForm] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', breed: '', description: '', contact: '', imageUrl: '' });

  // State for Negocios
  const [businessesList] = useState<MockLocalBusiness[]>(LOCAL_BUSINESSES);
  const [businessSearch, setBusinessSearch] = useState('');
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  // Handles RSVP
  const handleToggleAttend = (id: string) => {
    playTone(600, 100);
    if (attendedEvents.includes(id)) {
      setAttendedEvents((prev) => prev.filter((item) => item !== id));
    } else {
      setAttendedEvents((prev) => [...prev, id]);
    }
  };

  // Handles adding new event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;

    playTone(880, 150);
    const createdEvent: MockNeighborhoodEvent = {
      id: `ev-${Date.now()}`,
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location || 'Calle Central de El Trigal',
      description: newEvent.description || 'Sin descripción adicional.',
    };

    setEventsList((prev) => [...prev, createdEvent]);
    setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
    setShowEventForm(false);
  };

  // Handles adding a lost pet
  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPet.name || !newPet.breed || !newPet.contact) return;

    playTone(880, 150);
    const createdPet: MockLostPet = {
      id: `pet-${Date.now()}`,
      name: newPet.name,
      breed: newPet.breed,
      description: newPet.description || 'Se extravió recientemente en la vecindad.',
      contact: newPet.contact,
      imageUrl: newPet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400',
      status: 'lost',
    };

    setPetsList((prev) => [createdPet, ...prev]);
    setNewPet({ name: '', breed: '', description: '', contact: '', imageUrl: '' });
    setShowPetForm(false);
  };

  // Handle local business search
  const filteredBusinesses = businessesList.filter((biz) => {
    const term = businessSearch.toLowerCase();
    return (
      biz.name.toLowerCase().includes(term) ||
      biz.category.toLowerCase().includes(term) ||
      biz.featuredProduct.toLowerCase().includes(term)
    );
  });

  // Handle business rating
  const handleRateBusiness = (id: string, stars: number) => {
    playTone(750, 80);
    setUserRatings((prev) => ({ ...prev, [id]: stars }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md font-sans p-0 sm:p-4">
      <div className="relative w-full sm:w-[850px] max-h-[100dvh] sm:max-h-[680px] bg-[#0c101d] rounded-none sm:rounded-3xl border-y sm:border border-white/10 overflow-hidden shadow-2xl flex flex-col sm:h-[680px]">

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/5 bg-black/20 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/15 flex items-center justify-center text-[#FFD700] shrink-0">
              {type === 'eventos' && <Calendar className="w-5 h-5" />}
              {type === 'farmacias' && <AlertCircle className="w-5 h-5" />}
              {type === 'mascotas' && <AlertCircle className="w-5 h-5" />}
              {type === 'negocios' && <Star className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-white capitalize truncate">
                {type === 'farmacias' ? 'Farmacias de Turno' : type}
              </h3>
              <p className="text-xs text-gray-400 hidden sm:block">
                {type === 'eventos' && 'Entérate de asambleas, simulacros y actividades del barrio'}
                {type === 'farmacias' && 'Farmacias locales habilitadas para atención nocturna'}
                {type === 'mascotas' && 'Ayuda a las familias de El Trigal a encontrar sus mascotas perdidas'}
                {type === 'negocios' && 'Encuentra servicios locales de confianza y productos destacados'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Pane */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gradient-to-br from-black/20 to-transparent custom-scrollbar">

          {/* 1. EVENTOS SECTION */}
          {type === 'eventos' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono">Calendario de Actividades</h4>
                <button
                  onClick={() => { playTone(500, 50); setShowEventForm(!showEventForm); }}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#FFD700] hover:bg-[#ffe16d] text-black font-semibold text-xs transition-all active:scale-95 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Proponer Evento</span>
                </button>
              </div>

              {showEventForm && (
                <form onSubmit={handleAddEvent} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <h5 className="text-xs font-bold text-[#FFD700] uppercase font-mono">Nueva Propuesta Vecinal</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      placeholder="Título del evento (ej: Simulacro de Incendio)"
                      className="col-span-1 sm:col-span-2 bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <input
                      required
                      placeholder="Fecha (ej: Domingo 28 de Junio)"
                      className="bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                    <input
                      required
                      placeholder="Hora (ej: 04:00 PM)"
                      className="bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                    <input
                      placeholder="Ubicación (ej: Parque central)"
                      className="col-span-1 sm:col-span-2 bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                    <textarea
                      placeholder="Breve descripción de la agenda..."
                      rows={2}
                      className="col-span-1 sm:col-span-2 bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowEventForm(false)}
                      className="px-3 py-1 text-xs text-gray-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 rounded bg-[#FFD700] text-black font-bold text-xs"
                    >
                      Publicar Propuesta
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {eventsList.map((ev) => {
                  const isAttending = attendedEvents.includes(ev.id);
                  return (
                    <div key={ev.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-all flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="space-y-3 flex-1">
                        <h4 className="text-md font-bold text-white">{ev.title}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">{ev.description}</p>

                        <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400 pt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-[#FFD700]" />
                            <span>{ev.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
                            <span>{ev.time}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-[#FFD700]" />
                            <span>{ev.location}</span>
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleAttend(ev.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 ${
                          isAttending
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                            : 'bg-white/5 hover:bg-white/10 border border-white/5 text-white'
                        }`}
                      >
                        {isAttending ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Inscrito</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Asistir</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. FARMACIAS SECTION */}
          {type === 'farmacias' && (
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono">Farmacias Disponibles</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pharmaciesList.map((pharmacy) => (
                  <div key={pharmacy.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-md truncate">{pharmacy.name}</h4>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                          En Turno 24h
                        </span>
                      </div>
                      <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-mono text-gray-400">
                      <p className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                        <span>{pharmacy.address}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#FFD700]" />
                        <span>{pharmacy.schedule}</span>
                      </p>
                    </div>

                    <a
                      href={`tel:${pharmacy.phone}`}
                      onClick={() => playTone(500, 100)}
                      className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl text-xs transition-all active:scale-95 block text-center"
                    >
                      Llamar Directo ({pharmacy.phone})
                    </a>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start space-x-3 text-xs text-gray-400 leading-relaxed">
                <AlertCircle className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
                <p>
                  <strong>Atención Vecinos:</strong> El rol de farmacias de turno está validado por el SEDES de Tarija. En caso de requerir delivery de emergencia, comuníquese con el coordinador vecinal para acompañamiento de patrullaje.
                </p>
              </div>
            </div>
          )}

          {/* 3. MASCOTAS SECTION */}
          {type === 'mascotas' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono">Reportes Recientes</h4>
                <button
                  onClick={() => { playTone(500, 50); setShowPetForm(!showPetForm); }}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#FFD700] hover:bg-[#ffe16d] text-black font-semibold text-xs transition-all active:scale-95"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Reportar Extravío</span>
                </button>
              </div>

              {showPetForm && (
                <form onSubmit={handleAddPet} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <h5 className="text-xs font-bold text-[#FFD700] uppercase font-mono">Registrar Mascota Perdida</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      placeholder="Nombre de la mascota (ej: Toby)"
                      className="bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newPet.name}
                      onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    />
                    <input
                      required
                      placeholder="Raza o características (ej: Golden Retriever)"
                      className="bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newPet.breed}
                      onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                    />
                    <input
                      required
                      placeholder="Teléfono de contacto (ej: 729 12345)"
                      className="bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newPet.contact}
                      onChange={(e) => setNewPet({ ...newPet, contact: e.target.value })}
                    />
                    <input
                      placeholder="URL de foto (opcional)"
                      className="bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newPet.imageUrl}
                      onChange={(e) => setNewPet({ ...newPet, imageUrl: e.target.value })}
                    />
                    <textarea
                      placeholder="Seña particular o collar. ¿Dónde y cuándo se vio por última vez?..."
                      rows={2}
                      className="col-span-1 sm:col-span-2 bg-[#0c101d] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      value={newPet.description}
                      onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowPetForm(false)}
                      className="px-3 py-1 text-xs text-gray-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 rounded bg-[#FFD700] text-black font-bold text-xs"
                    >
                      Publicar Alerta
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-4">
                {petsList.map((pet) => (
                  <div key={pet.id} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-white/10 transition-all sm:h-[150px] relative">
                    <div className="w-full sm:w-1/3 h-32 sm:h-full relative">
                      <img
                        alt={pet.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        src={pet.imageUrl}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-white text-md">{pet.name}</h4>
                          <span className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest">
                            Buscado
                          </span>
                        </div>
                        <p className="text-[10px] text-[#FFD700] font-mono uppercase tracking-wider">{pet.breed}</p>
                        <p className="text-xs text-gray-400 line-clamp-2 mt-1.5">{pet.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-xs">
                        <span className="text-gray-500">Cel:</span>
                        <span className="font-bold text-white text-[11px]">{pet.contact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. NEGOCIOS SECTION */}
          {type === 'negocios' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono">Directorio de Tiendas</h4>
                <div className="w-full sm:w-64 relative">
                  <input
                    placeholder="Filtrar por nombre o categoría..."
                    className="w-full bg-[#0c101d] border border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                    value={businessSearch}
                    onChange={(e) => setBusinessSearch(e.target.value)}
                  />
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-4">
                {filteredBusinesses.map((biz) => {
                  const rating = userRatings[biz.id] || Math.floor(biz.rating);
                  return (
                    <div key={biz.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-all flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h4 className="font-bold text-md text-white">{biz.name}</h4>
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400 font-bold uppercase">
                            {biz.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          <strong className="text-[#FFD700]">Especialidad:</strong> {biz.featuredProduct}
                        </p>
                        <p className="text-xs text-gray-500 font-mono flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-gray-600" />
                          <span>{biz.address}</span>
                        </p>
                      </div>

                      <div className="text-left sm:text-right space-y-2 shrink-0">
                        <div className="flex items-center space-x-1 sm:justify-end">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRateBusiness(biz.id, star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-4 h-4 transition-all ${
                                  star <= rating ? 'text-[#FFD700] fill-[#FFD700]' : 'text-gray-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <p className="text-xs font-mono text-gray-400">Contacto: {biz.phone}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-black/10 text-center text-[10px] text-gray-500 font-mono shrink-0">
          Comunidad Unida El Trigal • Tarija, Bolivia
        </div>

      </div>
    </div>
  );
}
