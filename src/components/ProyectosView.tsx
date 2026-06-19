import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, Clock, FileText, X, ChevronRight, ThumbsUp, MessageSquare } from 'lucide-react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';

export default function ProyectosView() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    'pr1': 42,
    'pr2': 67,
    'pr3': 105,
  });
  const [comments, setComments] = useState<Record<string, string[]>>({
    'pr1': ['¡Excelente iniciativa! Hacía falta empedrar estas cuadras.', '¿Saben cuándo estiman terminar la obra?'],
    'pr2': ['Por fin llegará el gas a nuestro manzano!', 'Una gran mejora para la economía del hogar.'],
    'pr3': ['¡Muy seguro el sistema! Ya configuré mi número.'],
  });
  const [newComment, setNewComment] = useState('');

  const categories = ['Todos', 'Infraestructura', 'Servicios', 'Seguridad'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                          project.description.toLowerCase().includes(search.toLowerCase()) ||
                          project.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' ||
                            project.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleAddComment = (id: string) => {
    if (!newComment.trim()) return;
    setComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment.trim()]
    }));
    setNewComment('');
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Title & Introduction */}
      <div>
        <h2 className="text-white text-2xl font-bold tracking-tight">Proyectos del Barrio</h2>
        <p className="text-gray-400 text-xs mt-1">
          Conoce los proyectos realizados por la directiva y participa en los que vienen en camino.
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
          placeholder="Buscar proyectos..."
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
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List Matches Exact Images */}
      <div className="space-y-4">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setActiveProject(proj)}
            className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden hover:border-brand-yellow/50 transition cursor-pointer flex flex-col group"
          >
            {/* Image banner */}
            <div className="relative h-44 w-full bg-gray-950 overflow-hidden">
              <img
                src={proj.imageUrl}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-brand-green text-gray-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {proj.category}
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wide backdrop-blur-md ${
                  proj.status === 'Completado' 
                    ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' 
                    : 'bg-orange-500/20 border border-orange-500 text-orange-400'
                }`}>
                  {proj.status === 'Completado' ? (
                    <CheckCircle className="h-3 w-3 inline" />
                  ) : (
                    <Clock className="h-3 w-3 inline" />
                  )}
                  {proj.status}
                </span>
              </div>
            </div>

            {/* Project Specs */}
            <div className="p-4 flex flex-col space-y-2">
              <h3 className="text-white text-lg font-bold tracking-tight group-hover:text-brand-yellow transition">
                {proj.title}
              </h3>
              <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                {proj.description}
              </p>

              <div className="flex items-center space-x-2 text-brand-green font-mono text-[11px] pt-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{proj.location}</span>
              </div>

              {/* Action and feedback */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-900 mt-2">
                <div className="flex items-center space-x-3 text-xs text-gray-400">
                  <button 
                    onClick={(e) => handleLike(proj.id, e)} 
                    className="flex items-center space-x-1 hover:text-brand-yellow transition cursor-pointer"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{likes[proj.id] || 0}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{comments[proj.id]?.length || 0}</span>
                  </div>
                </div>

                <span className="bg-brand-yellow text-gray-950 text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-yellow-400 transition flex items-center space-x-1">
                  <span>Ver Detalles</span>
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No se encontraron proyectos para esta búsqueda.
          </div>
        )}
      </div>

      {/* Project Detail Modal Overlay */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="relative h-48 bg-gray-950">
              <img
                src={activeProject.imageUrl}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg border border-gray-800 max-w-[85%]">
                <span className="text-xs font-semibold text-brand-green block mb-0.5">{activeProject.category}</span>
                <h4 className="text-white font-bold text-sm tracking-tight">{activeProject.title}</h4>
              </div>
            </div>

            {/* Info contents scrolling */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Estado del Proyecto</span>
                <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                  activeProject.status === 'Completado' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' 
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500'
                }`}>
                  {activeProject.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Detalles de la Obra</span>
                <p className="text-gray-300 text-xs leading-relaxed font-sans">{activeProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#181818] p-3 rounded-xl border border-gray-800 text-xs">
                <div>
                  <span className="text-gray-500 block mb-0.5">Ubicación:</span>
                  <span className="text-white font-semibold font-mono">{activeProject.location}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">Dirección técnica:</span>
                  <span className="text-white font-semibold font-mono">El Trigal Directiva</span>
                </div>
              </div>

              {/* Interactive Comments Area */}
              <div className="border-t border-gray-800 pt-4">
                <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-brand-yellow" />
                  <span>Participación Ciudadana ({comments[activeProject.id]?.length || 0})</span>
                </h5>

                <div className="space-y-2.5 max-h-36 overflow-y-auto pr-1 mb-3">
                  {comments[activeProject.id]?.map((cmt, idx) => (
                    <div key={idx} className="bg-black/40 p-2.5 rounded-lg border border-gray-900 text-xs">
                      <p className="text-gray-300 line-clamp-3">{cmt}</p>
                      <div className="text-right mt-1">
                        <span className="text-[9px] text-gray-500 font-mono">Vecino Verificado</span>
                      </div>
                    </div>
                  ))}
                  {(!comments[activeProject.id] || comments[activeProject.id].length === 0) && (
                    <p className="text-gray-500 text-xs italic">Sé el primero en comentar este proyecto...</p>
                  )}
                </div>

                {/* Add Comment input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe tu opinión..."
                    className="flex-1 bg-black text-white px-3 py-1.5 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(activeProject.id)}
                  />
                  <button
                    onClick={() => handleAddComment(activeProject.id)}
                    className="bg-brand-yellow text-gray-950 px-3 py-1 rounded-lg text-xs font-bold hover:bg-yellow-400 cursor-pointer"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
