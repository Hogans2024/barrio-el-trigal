import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, ShoppingCart, Sparkles, Store, X, PlusCircle, Bookmark, Check } from 'lucide-react';
import { LocalBusiness } from '../types';

interface NegociosViewProps {
  negocios: LocalBusiness[];
  onShowNotification: (title: string, message: string) => void;
}

export default function NegociosView({ negocios, onShowNotification }: NegociosViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [businesses, setBusinesses] = useState<LocalBusiness[]>([]);
  const [activeCatalog, setActiveCatalog] = useState<LocalBusiness | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [savedBusinesses, setSavedBusinesses] = useState<Record<string, boolean>>({});

  // Form states for new business
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<'Comida' | 'Ropa' | 'Plantas' | 'Papa de comer'>('Comida');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    // Merge cloud data with local additions stored in localStorage
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
    // Only save the "extra" items added locally
    const extraItems = list.filter(b => b.id.startsWith('custom_'));
    setBusinesses(list);
    localStorage.setItem('barrio_negocios_extra', JSON.stringify(extraItems));
  };

  const categories = ['Todos', 'Comida', 'Papa de comer', 'Ropa', 'Plantas'];

  const filteredBusinesses = businesses.filter((biz) => {
    // Coincide por nombre/descripción; las categorías respetan el tipo LocalBusiness
    const textMatches = biz.name.toLowerCase().includes(search.toLowerCase()) ||
                        biz.description.toLowerCase().includes(search.toLowerCase());

    const categoryMatches = selectedCategory === 'Todos' || biz.category === selectedCategory;

    return textMatches && categoryMatches;
  });

  const handleRegisterBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDesc) return;

    const defaultImages: Record<string, string> = {
      Comida: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
      Ropa: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
      Plantas: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    };

    const newBiz: LocalBusiness = {
      id: `custom_biz_${Date.now()}`,
      name: newName,
      description: newDesc,
      category: newCat,
      imageUrl: newImageUrl || defaultImages[newCat] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
      actionText: newCat === 'Comida' ? 'Ver Menú' : 'Explorar'
    };

    const updated = [newBiz, ...businesses];
    saveBusinessesList(updated);
    setShowRegisterForm(false);
    onShowNotification('💼 Negocio Registrado', 'Tu emprendimiento local ha sido publicado con éxito y es visible para todos los vecinos.');
    
    // Reset Form
    setNewName('');
    setNewDesc('');
    setNewImageUrl('');
  };

  const handleToggleSave = (biz: LocalBusiness) => {
    const nextSavedStatus = !savedBusinesses[biz.id];
    setSavedBusinesses(prev => ({
      ...prev,
      [biz.id]: nextSavedStatus
    }));

    if (nextSavedStatus) {
      onShowNotification('⭐ Favorito Añadido', `Guardaste "${biz.name}" en tu lista de comercios preferidos.`);
    }
  };

  const renderCatalogMenu = () => {
    if (!activeCatalog) return null;

    let items: { name: string; price: string }[] = [];
    if (activeCatalog.id === 'b1') {
      items = [
        { name: 'Ojo de Bife Premium (400g)', price: 'Bs. 85' },
        { name: 'Costillar de Cerdo a la Parrilla', price: 'Bs. 75' },
        { name: 'Tira de Asado Tradicional tucumano', price: 'Bs. 65' },
        { name: 'Guarniciones de Chorizo & Ensalada', price: 'Bs. 25' },
      ];
    } else if (activeCatalog.id === 'b2') {
      items = [
        { name: 'Camisa Lino Premium Unisex', price: 'Bs. 120' },
        { name: 'Vestido de Temporada Otoño', price: 'Bs. 185' },
        { name: 'Chaqueta Denim Clásica', price: 'Bs. 250' },
        { name: 'Accesorios Cuero Ecológico', price: 'Bs. 90' },
      ];
    } else if (activeCatalog.id === 'b3') {
      items = [
        { name: 'Canasta Familiar de Verduras Surtidas', price: 'Bs. 45' },
        { name: 'Papa Harinosa del Altiplano (Arroba)', price: 'Bs. 35' },
        { name: 'Caja de Tomates Campo Orgánicos', price: 'Bs. 28' },
        { name: 'Docena Huevos de Campo selectos', price: 'Bs. 12' },
      ];
    } else {
      items = [
        { name: 'Helecho Gigante Decorativo', price: 'Bs. 40' },
        { name: 'Orquídea Real en Maceta Cerámica', price: 'Bs. 95' },
        { name: 'Suculenta Ornamental Miniatura', price: 'Bs. 15' },
        { name: 'Sustrato Orgánico Especial (5Kg)', price: 'Bs. 30' },
      ];
    }

    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#121212] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-150">
          <div className="p-4 bg-brand-yellow text-gray-950 flex justify-between items-center">
            <h4 className="font-extrabold text-base tracking-tight flex items-center gap-2">
              <Store className="h-5 w-5" />
              <span>{activeCatalog.name}</span>
            </h4>
            <button onClick={() => setActiveCatalog(null)} className="hover:opacity-70 p-1">
              <X className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>

          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            <div className="flex gap-4 items-center border-b border-gray-900 pb-4">
              <img
                src={activeCatalog.imageUrl}
                alt={activeCatalog.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <span className="text-brand-green font-bold text-xs uppercase tracking-wide bg-brand-green/10 px-2 py-0.5 rounded">
                  {activeCatalog.category}
                </span>
                <p className="text-gray-400 text-xs mt-1 leading-normal">{activeCatalog.description}</p>
              </div>
            </div>

            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Catálogo Recomendado</h5>
            <div className="space-y-2.5">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-[#181818] border border-gray-800 p-3 rounded-xl hover:border-gray-700 transition">
                  <span className="text-white font-semibold text-xs">{item.name}</span>
                  <span className="text-brand-yellow font-bold font-mono text-sm">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#2ECC71]/5 border border-[#2ECC71]/20 p-3 rounded-lg text-[11px] text-gray-400 flex items-center space-x-2">
              <Clock className="h-4 w-4 text-brand-green shrink-0" />
              <span>Apoya tus emprendedores locales. Las transferencias se efectúan directo con el vendedor.</span>
            </div>
          </div>

          <div className="p-4 bg-black/40 border-t border-gray-900 flex justify-end">
            <button
              onClick={() => {
                onShowNotification('🛒 Pedido Directo', `Iniciando contacto para pedido en "${activeCatalog.name}".`);
                setActiveCatalog(null);
              }}
              className="bg-[#2ECC71] text-gray-950 font-bold px-5 py-2 rounded-xl text-xs hover:bg-[#27ae60] transition flex items-center space-x-2 cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Hacer Pedido por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Header and post action */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Negocios Locales</h2>
          <p className="text-gray-400 text-xs mt-1">
            Descubre y apoya el comercio de nuestra comunidad.
          </p>
        </div>
        <button
          onClick={() => setShowRegisterForm(true)}
          className="bg-brand-yellow/10 border border-brand-yellow/30 hover:border-brand-yellow text-brand-yellow font-extrabold px-3 py-2 rounded-lg text-[11px] flex items-center space-x-1.5 transition cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Registrar Local</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar negocios..."
          className="w-full bg-[#1c1b1b] text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-800 text-sm focus:outline-none focus:border-brand-yellow transition"
        />
      </div>

      {/* Category Selection Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-brand-green text-gray-950 border-brand-green'
                : 'bg-transparent text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Business Cards - matching exact mockup */}
      <div className="space-y-4">
        {filteredBusinesses.map((biz) => (
          <div
            key={biz.id}
            className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden hover:border-brand-yellow/40 transition flex flex-col group"
          >
            {/* Header image category tag */}
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <img
                src={biz.imageUrl}
                alt={biz.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-3 right-3 flex space-x-1.5">
                <button
                  onClick={() => handleToggleSave(biz)}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-lg p-1.5 transition border border-gray-800"
                >
                  <Bookmark className={`h-3.5 w-3.5 ${savedBusinesses[biz.id] ? 'fill-brand-yellow text-brand-yellow' : ''}`} />
                </button>
              </div>

              <div className="absolute top-3 left-3">
                <span className="bg-brand-green text-[#003919] font-extrabold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase">
                  {biz.category === 'Papa de comer' ? 'Comida' : biz.category}
                </span>
              </div>
            </div>

            {/* Core Info details block */}
            <div className="p-4 space-y-2">
              <h3 className="text-white text-lg font-bold tracking-tight">
                {biz.name}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed max-h-16 line-clamp-2">
                {biz.description}
              </p>

              {/* Specific features conditional layouts shown in design screenshots */}
              <div className="pt-2 border-t border-gray-900 mt-2 flex items-center justify-between text-xs text-gray-400">
                {/* 1. Rating display */}
                {biz.rating && (
                  <div className="flex items-center space-x-1 font-mono text-brand-green">
                    <Star className="h-3.5 w-3.5 fill-brand-green text-brand-green shrink-0" />
                    <span>{biz.rating} ({biz.reviewsCount} reviews)</span>
                  </div>
                )}

                {/* 2. Open hours */}
                {biz.openHours && (
                  <div className="flex items-center space-x-1 font-mono text-brand-green">
                    <Clock className="h-3.5 w-3.5 text-brand-green shrink-0 animate-pulse" />
                    <span>{biz.openHours}</span>
                  </div>
                )}

                {/* 3. Distance info */}
                {biz.distanceInfo && (
                  <div className="flex items-center space-x-1 font-mono text-brand-green">
                    <MapPin className="h-3.5 w-3.5 text-brand-green shrink-0" />
                    <span>{biz.distanceInfo}</span>
                  </div>
                )}

                {/* 4. Free delivery flag */}
                {biz.isFreeDelivery && (
                  <div className="flex items-center space-x-1 font-mono text-brand-green">
                    <ShoppingCart className="h-3.5 w-3.5 text-brand-green shrink-0" />
                    <span>Envío gratis en el sector</span>
                  </div>
                )}

                {/* Primary Button */}
                <button
                  onClick={() => setActiveCatalog(biz)}
                  className="bg-brand-yellow text-gray-950 font-bold px-4 py-1.5 rounded-lg hover:bg-yellow-400 transition"
                >
                  {biz.actionText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            Ningún comercio coincide con esta categoría de búsqueda.
          </div>
        )}
      </div>

      {/* Catalog menus modal rendering */}
      {renderCatalogMenu()}

      {/* Register Business Form Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleRegisterBusiness}
            className="bg-[#121212] border border-gray-800 rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-150"
          >
            <div className="p-4 bg-brand-yellow text-gray-950 flex justify-between items-center">
              <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                <Store className="h-4 w-4" />
                <span>Registrar Emprendimiento</span>
              </h4>
              <button type="button" onClick={() => setShowRegisterForm(false)} className="hover:opacity-75">
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-gray-400 text-xs font-semibold">Nombre del Negocio</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Panadería San Juan"
                  className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-xs font-semibold">Categoría</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value as any)}
                  className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                >
                  <option value="Comida">Comida / Alimentos</option>
                  <option value="Ropa">Ropa / Moda</option>
                  <option value="Plantas">Plantas / Vivero</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-xs font-semibold">Breve Descripción</label>
                <textarea
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ej: Elaboramos pan caliente de horno a leña y repostería típica tarijeña..."
                  className="w-full bg-[#181818] text-white p-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow focus:ring-0 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-xs font-semibold">Enlace de Imagen (Opcional)</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#181818] text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterForm(false)}
                  className="flex-1 bg-black text-gray-400 border border-gray-800 py-2 rounded-lg text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-yellow text-gray-950 py-2 rounded-lg text-xs font-extrabold hover:bg-yellow-400 transition cursor-pointer"
                >
                  Publicar Local
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
