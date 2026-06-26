import React from 'react';
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

/**
 * Bandeja de avisos del header global.
 *
 * Responsive (sección 5.1):
 *  - sin prefijo / `tall:` (mobile, < 640px de ancho): hoja inferior fija
 *    (bottom-sheet) a ancho completo, scroll vertical, botón cerrar visible.
 *  - `sm:` (≥ 640px, escritorio/tablet): dropdown absoluto centrado bajo el
 *    disparador, tal como en el proyecto origen.
 */
export default function NoticeDropdown({ isOpen, notices, onMarkRead, onClearAll, onClose }: NoticeDropdownProps) {
  if (!isOpen) return null;

  const handleItemClick = (id: string) => {
    playTone(500, 50);
    onMarkRead(id);
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
                  Limpiar todos
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
                  onClick={() => handleItemClick(notice.id)}
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

          <div className="p-3 bg-black/10 border-t border-white/5 text-center shrink-0">
            <span className="text-[9px] text-gray-500 font-mono">© Central El Trigal • Tarija</span>
          </div>
        </div>
      </div>

      {/* ====== DESKTOP / TABLET (≥ sm): dropdown absoluto estilo origen ====== */}
      <div className="hidden sm:block absolute right-0 mt-2 w-80 bg-[#0c101d] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden font-sans">
        <div className="p-4 bg-black/20 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Bandeja de Avisos</span>
          {notices.length > 0 && (
            <button
              onClick={() => { playTone(440, 100); onClearAll(); }}
              className="text-[10px] text-gray-400 hover:text-white underline font-mono transition-colors"
            >
              Limpiar todos
            </button>
          )}
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
                onClick={() => handleItemClick(notice.id)}
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

        <div className="p-3 bg-black/10 border-t border-white/5 text-center">
          <span className="text-[9px] text-gray-500 font-mono">© Central El Trigal • Tarija</span>
        </div>
      </div>
    </>
  );
}
