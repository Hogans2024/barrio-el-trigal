import React, { useState } from 'react';
import { Info, AlertTriangle, ShieldAlert, CheckCircle, BellOff, X } from 'lucide-react';
import { Notice } from '../types.alarma';
import { playTone } from './AudioSiren';

interface NoticeDropdownProps {
  isOpen: boolean;
  notices: Notice[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
  onClose?: () => void;
}

export default function NoticeDropdown({ isOpen, notices, onMarkRead, onClearAll, onClose }: NoticeDropdownProps) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  if (!isOpen) {
    if (selectedNotice) setSelectedNotice(null);
    return null;
  }

  const handleItemClick = (notice: Notice) => {
    playTone(500, 50);
    onMarkRead(notice.id);
    setSelectedNotice(notice);
  };

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'alert':
        return <ShieldAlert className="w-4 h-4 text-red-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const unreadCount = notices.filter((n) => n.unread).length;

  return (
    <>
      <div className="fixed inset-0 z-[55] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => { playTone(400, 50); onClose?.(); }}
        />
        {/* Modal Container */}
        <div className="relative w-full max-h-[100dvh] sm:max-h-[620px] sm:w-[1000px] bg-[#0c101d] rounded-2xl border border-white/10 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
          {/* HEADER */}
          <div className="p-4 sm:p-5 bg-black/40 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center">
                <Info className="w-5 h-5 text-brand-yellow" />
              </div>
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider font-mono text-sm sm:text-base">Bandeja de Avisos</h3>
                {unreadCount > 0 && <p className="text-[#FFD700] text-xs font-mono">{unreadCount} sin leer</p>}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {notices.length > 0 && (
                <button
                  onClick={() => { playTone(440, 100); onClearAll(); }}
                  className="text-xs text-gray-400 hover:text-white underline font-mono transition-colors hidden sm:block"
                >
                  Limpiar todos
                </button>
              )}
              <button
                onClick={() => { playTone(400, 50); onClose?.(); }}
                className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 bg-black/20">
            {notices.length > 0 && (
              <div className="sm:hidden mb-4 text-right">
                <button
                  onClick={() => { playTone(440, 100); onClearAll(); }}
                  className="text-xs text-gray-400 hover:text-white underline font-mono transition-colors"
                >
                  Limpiar todos
                </button>
              </div>
            )}
            
            {notices.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                <BellOff className="w-16 h-16 text-gray-600" />
                <p className="text-sm">No hay avisos pendientes.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => handleItemClick(notice)}
                    className={`p-4 sm:p-5 rounded-2xl flex items-start space-x-4 cursor-pointer transition-all border ${
                      notice.unread 
                        ? 'bg-[#FFD700]/5 hover:bg-[#FFD700]/10 border-[#FFD700]/20 shadow-lg' 
                        : 'bg-white/[0.02] hover:bg-white/5 border-white/5 shadow-sm'
                    }`}
                  >
                    <div className="mt-1 shrink-0 p-3 bg-black/40 rounded-full border border-white/5 shadow-inner">
                      {getNoticeIcon(notice.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className={`text-sm sm:text-base leading-relaxed ${notice.unread ? 'text-white font-bold' : 'text-gray-300'}`}>
                        {notice.title}
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-500 font-mono">{notice.time}</span>
                        {notice.unread && <span className="text-[#FFD700] text-[10px] font-mono uppercase font-bold border border-[#FFD700]/30 px-2 py-0.5 rounded-full bg-[#FFD700]/10">Nuevo</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 bg-black/40 border-t border-white/5 text-center shrink-0">
            <span className="text-xs text-gray-500 font-mono">© Central El Trigal • Tarija</span>
          </div>
        </div>
      </div>

      {/* ====== MODAL DE DETALLE DE NOTIFICACIÓN ====== */}
      {selectedNotice && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedNotice(null)}
          />
          <div className="relative w-full max-w-sm bg-[#0c101d] border border-white/10 rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-black/40 hover:bg-black/80 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all border border-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-white/5 rounded-full border border-white/10 shrink-0">
                {getNoticeIcon(selectedNotice.type)}
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-snug">Detalle del Aviso</h3>
                <p className="text-gray-400 text-xs font-mono mt-1">{selectedNotice.time}</p>
              </div>
              <p className="text-gray-300 text-sm bg-black/40 p-4 rounded-xl border border-white/5 w-full text-left leading-relaxed">
                {selectedNotice.title}
              </p>
              <button
                onClick={() => setSelectedNotice(null)}
                className="mt-2 w-full py-2.5 bg-brand-yellow hover:bg-yellow-400 text-black font-bold rounded-xl text-xs transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
