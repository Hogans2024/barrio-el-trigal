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
      {/* ====== MOBILE (< sm): hoja inferior fija a ancho completo ====== */}
      <div className="sm:hidden fixed inset-0 z-50 flex items-end">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => { playTone(400, 50); onClose?.(); }}
        />
        <div className="relative w-full bg-[#0c101d] border-t border-white/10 rounded-t-3xl shadow-2xl flex flex-col max-h-[80vh] animate-fade-in">
          <div className="p-4 bg-black/20 border-b border-white/5 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Bandeja de Avisos {unreadCount > 0 && <span className="text-[#FFD700]">({unreadCount})</span>}
            </span>
            <div className="flex items-center gap-3">
              {notices.length > 0 && (
                <button
                  onClick={() => { playTone(440, 100); onClearAll(); }}
                  className="text-[10px] text-gray-400 hover:text-white underline font-mono transition-colors"
                >
                  Limpiar
                </button>
              )}
              <button
                onClick={() => { playTone(400, 50); onClose?.(); }}
                className="w-7 h-7 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
            {notices.length === 0 ? (
              <div className="p-8 text-center text-gray-500 space-y-2">
                <BellOff className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-xs">No hay avisos pendientes.</p>
              </div>
            ) : (
              notices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => handleItemClick(notice)}
                  className={`p-4 flex items-start space-x-3 cursor-pointer transition-all ${
                    notice.unread ? 'bg-[#FFD700]/5 hover:bg-[#FFD700]/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{getNoticeIcon(notice.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className={`text-xs leading-snug ${notice.unread ? 'text-white font-semibold' : 'text-gray-400'}`}>
                      {notice.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 font-mono">{notice.time}</span>
                      {notice.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ====== DESKTOP / TABLET (≥ sm): dropdown absoluto estilo origen ====== */}
      <div className="hidden sm:block absolute right-0 mt-2 w-80 bg-[#0c101d] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden font-sans">
        <div className="p-4 bg-black/20 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Avisos {unreadCount > 0 && `(${unreadCount})`}</span>
          <div className="flex items-center gap-3">
            {notices.length > 0 && (
              <button
                onClick={() => { playTone(440, 100); onClearAll(); }}
                className="text-[10px] text-gray-400 hover:text-white underline font-mono transition-colors"
              >
                Limpiar
              </button>
            )}
            <button
              onClick={() => { playTone(400, 50); onClose?.(); }}
              className="w-7 h-7 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
          {notices.length === 0 ? (
            <div className="p-8 text-center text-gray-500 space-y-2">
              <BellOff className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-xs">No hay avisos pendientes.</p>
            </div>
          ) : (
            notices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => handleItemClick(notice)}
                className={`p-4 flex items-start space-x-3 cursor-pointer transition-all ${
                  notice.unread ? 'bg-[#FFD700]/5 hover:bg-[#FFD700]/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="mt-0.5 shrink-0">{getNoticeIcon(notice.type)}</div>
                <div className="flex-1 space-y-1">
                  <p className={`text-xs leading-snug ${notice.unread ? 'text-white font-semibold' : 'text-gray-400'}`}>
                    {notice.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-mono">{notice.time}</span>
                    {notice.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />}
                  </div>
                </div>
              </div>
            ))
          )}
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
