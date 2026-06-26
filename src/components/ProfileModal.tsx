import React from 'react';
import { X, ShieldCheck, User, MapPin, Hash, Award, CheckCircle } from 'lucide-react';
import { playTone } from './AudioSiren';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Credencial digital de perfil.
 *
 * Responsive (sección 5.1):
 *  - sin prefijo / `tall:` (mobile, < 640px de ancho): hoja completa
 *    `fixed inset-0` con scroll vertical y botón de cerrar siempre visible.
 *  - `sm:` (≥ 640px, escritorio/tablet): modal centrado estilo origen.
 */
export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm font-sans animate-fade-in p-0 sm:p-4">
      {/* En mobile ocupamos todo; en sm: limitamos el ancho y centramos */}
      <div className="relative w-full sm:w-[450px] max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto bg-[#0c101d] rounded-none sm:rounded-3xl border-y sm:border border-white/10 shadow-2xl custom-scrollbar">

        {/* Header */}
        <div className="sticky top-0 z-10 p-6 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
            <h3 className="font-bold text-white">Credencial Digital</h3>
          </div>
          <button
            onClick={() => { playTone(500, 50); onClose(); }}
            className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Credentials body */}
        <div className="p-6 space-y-6">

          <div className="text-center space-y-3 relative pb-6 border-b border-white/5">
            <div className="w-20 h-20 bg-[#FFD700] text-black rounded-3xl mx-auto flex items-center justify-center text-2xl font-black shadow-lg shadow-[#FFD700]/10">
              CA
            </div>
            <div>
              <h4 className="text-lg font-bold text-white flex items-center justify-center space-x-1">
                <span>Carlos Alvarado</span>
                <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/25" />
              </h4>
              <p className="text-xs text-gray-400">Vecino Acreditado • El Trigal</p>
            </div>
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded px-2.5 py-0.5 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Miembro Activo 2026
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-4 text-xs font-mono">
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>Dirección:</span>
              </span>
              <span className="font-bold text-white text-right">Calle Los Nogales #142</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 flex items-center space-x-2">
                <Hash className="w-4 h-4 text-gray-600" />
                <span>ID de Afiliado:</span>
              </span>
              <span className="font-bold text-white">#ET-2026-948</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 flex items-center space-x-2">
                <Award className="w-4 h-4 text-gray-600" />
                <span>Seccional:</span>
              </span>
              <span className="font-bold text-white">Seccional Sur</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gray-600" />
                <span>Nivel de Acceso:</span>
              </span>
              <span className="font-bold text-emerald-400 uppercase tracking-widest text-[10px]">Supervisor</span>
            </div>
          </div>

          {/* Simulated barcode */}
          <div className="bg-white rounded-xl p-4 flex flex-col items-center space-y-2 border border-white/10 shadow-inner">
            <div className="h-10 w-full flex items-center justify-between px-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px,transparent_4px,transparent_6px,#000_6px,#000_10px)] opacity-90" />
            <span className="text-[9px] text-gray-600 font-mono tracking-[0.2em] font-bold">
              *ET-94827110-CA*
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-black/20 text-center text-[10px] text-gray-500 font-mono border-t border-white/5">
          Padrón de Seguridad de Tarija • Bolivia
        </div>

      </div>
    </div>
  );
}
