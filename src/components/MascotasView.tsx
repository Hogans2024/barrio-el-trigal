import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Building, Calendar, HelpCircle, X, PlusCircle, AlertCircle, Heart } from 'lucide-react';
import { LOST_PETS_DATA } from '../data';
import { LostPet } from '../types';

interface MascotasViewProps {
  onShowNotification: (title: string, message: string) => void;
}

export default function MascotasView({ onShowNotification }: MascotasViewProps) {
  const [filterType, setFilterType] = useState<string>('Todos');
  const [pets, setPets] = useState<LostPet[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form states for report
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'Perro' | 'Gato' | 'Loro'>('Perro');
  const [newDesc, setNewDesc] = useState('');
  const [newSeen, setNewSeen] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newNeigh, setNewNeigh] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('barrio_mascotas');
    if (stored) {
      try {
        setPets(JSON.parse(stored));
      } catch (e) {
        setPets(LOST_PETS_DATA);
      }
    } else {
      setPets(LOST_PETS_DATA);
    }
  }, []);

  const savePets = (list: LostPet[]) => {
    setPets(list);
    localStorage.setItem('barrio_mascotas', JSON.stringify(list));
  };

  const categories = ['Todos', 'Perros', 'Gatos'];

  const filteredPets = pets.filter(p => {
    if (filterType === 'Todos') return true;
    if (filterType === 'Perros') return p.type === 'Perro';
    if (filterType === 'Gatos') return p.type === 'Gato';
    return p.type === filterType;
  });

  const handlePostReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newContact || !newSeen) return;

    const defaultImages: Record<string, string> = {
      Perro: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
      Gato: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
      Loro: 'https://images.unsplash.com/photo-1522850400371-33188d2d6342?w=600&auto=format&fit=crop&q=80'
    };

    const newReport: LostPet = {
      id: `custom_pet_${Date.now()}`,
      name: newName,
      type: newType,
      imageUrl: newImageUrl || defaultImages[newType],
      description: newDesc,
      lastSeen: newSeen,
      contact: newContact,
      neighborhood: newNeigh || 'El Trigal',
      date: 'Hoy mismo'
    };

    const updated = [newReport, ...pets];
    savePets(updated);
    setShowForm(false);
    onShowNotification(
      '🐾 Alerta de Mascota Publicada',
      `La alerta de búsqueda para "${newName}" ha sido publicada exitosamente.`
    );

    // Reset fields
    setNewName('');
    setNewDesc('');
    setNewSeen('');
    setNewContact('');
    setNewNeigh('');
    setNewImageUrl('');
  };

  const handleContact = (pet: LostPet) => {
    onShowNotification(
      '📞 Contactar Dueño',
      `Llamando al contacto de ${pet.name}: ${pet.contact}.`
    );
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Title */}
      <div>
        <h2 className="text-white text-2xl font-bold tracking-tight">Animales Extraviados</h2>
        <p className="text-gray-400 text-xs mt-1">
          Ayuda a que nuestros amigos vuelvan a casa.
        </p>
      </div>

      {/* Categories chips filter */}
      <div className="flex space-x-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterType(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
              filterType === cat
                ? 'bg-brand-green text-gray-950 border-brand-green'
                : 'bg-transparent text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pet lists matching design mockup style */}
      <div className="space-y-4">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden flex flex-col group hover:border-brand-yellow/30 transition"
          >
            {/* Header photo and tag */}
            <div className="relative h-44 w-full bg-slate-900">
              <img
                src={pet.imageUrl}
                alt={pet.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-101 transition duration-200"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-[#e9c400]/20 text-[#ffe16d] border border-[#e9c400]/40 text-[10px] font-extrabold px-3 py-1 roundeduppercase tracking-wider">
                  {pet.type}
                </span>
              </div>
            </div>

            {/* Form details specs body */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-white text-lg font-bold tracking-tight">
                  Se busca a "{pet.name}"
                </h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  {pet.description}
                </p>
              </div>

              {/* Precise specs list with aligned icons */}
              <div className="space-y-2 pt-2.5 border-t border-gray-900 text-xs font-mono">
                <div className="flex items-start space-x-2 text-gray-300">
                  <MapPin className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                  <span>Última vez visto: {pet.lastSeen}</span>
                </div>

                <div
                  onClick={() => handleContact(pet)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-brand-yellow transition cursor-pointer"
                >
                  <Phone className="h-4 w-4 text-brand-yellow shrink-0" />
                  <span>Contacto: {pet.contact}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                  <Building className="h-4 w-4 text-gray-500 shrink-0" />
                  <span>Barrio: {pet.neighborhood}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
                  <span>Fecha: {pet.date}</span>
                </div>
              </div>

              {/* Call-to-action button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleContact(pet)}
                  className="bg-brand-yellow hover:bg-yellow-400 text-gray-950 font-extrabold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 transition"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Llamar Ahora</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredPets.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm font-mono">
            No hay reportes para esta sección.
          </div>
        )}
      </div>

      {/* Found footer alert banner */}
      <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-5 flex flex-col items-center text-center space-y-3">
        <div className="bg-brand-green/10 text-brand-green p-2.5 rounded-full">
          <Heart className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">¿Encontraste un animal perdido?</h4>
          <p className="text-gray-400 text-[11px] leading-relaxed mt-1">
            Comunícate con el contacto o publica un aviso comunitario para guiarlo de vuelta.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-brand-yellow text-gray-950 px-5 py-2.5 rounded-xl text-xs font-extrabold hover:bg-yellow-400 transition"
        >
          Publicar Aviso
        </button>
      </div>

      {/* Report Form Dialog modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handlePostReport}
            className="bg-[#121212] border border-gray-800 rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-150"
          >
            <div className="p-4 bg-brand-yellow text-gray-950 flex justify-between items-center">
              <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                <span>📢 Publicar Aviso de Mascota</span>
              </h4>
              <button type="button" onClick={() => setShowForm(false)} className="hover:opacity-75">
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-gray-400 text-[10px] uppercase font-bold">Nombre</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ej: Max"
                    className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 text-[10px] uppercase font-bold">Tipo Mascota</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none"
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Loro">Loro / Ave</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase font-bold">Breve Descripción</label>
                <textarea
                  required
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ej: Golden retriever con collar azul, es tímido pero no muerde..."
                  className="w-full bg-[#181818] text-white p-3 rounded-lg border border-gray-800 text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase font-bold">Última vez visto (Ubicación)</label>
                <input
                  type="text"
                  required
                  value={newSeen}
                  onChange={(e) => setNewSeen(e.target.value)}
                  placeholder="Ej: Cerca de la Plaza de los Olivos"
                  className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-gray-400 text-[10px] uppercase font-bold">Teléfono Contacto</label>
                  <input
                    type="text"
                    required
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder="4 664..."
                    className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 text-[10px] uppercase font-bold">Zona/Barrio</label>
                  <input
                    type="text"
                    value={newNeigh}
                    onChange={(e) => setNewNeigh(e.target.value)}
                    placeholder="El Trigal"
                    className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase font-bold">URL Imagen (Opcional)</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-black text-gray-400 border border-gray-800 py-2 rounded-lg text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-yellow text-gray-950 py-2 rounded-lg text-xs font-extrabold hover:bg-yellow-400 transition cursor-pointer"
                >
                  Crear Alerta
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
