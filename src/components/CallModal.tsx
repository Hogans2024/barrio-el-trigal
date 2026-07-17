import React from 'react';
import { Phone, User, Shield, Flame, Heart, X, Car, Cross } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data.alarma';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ═══════════════════════════════════════════════════════════════════════
//  MARCADOR DIRECTO — Contactos de emergencia
// ═══════════════════════════════════════════════════════════════════════
//  Al presionar un contacto abre el marcador nativo del dispositivo
//  vía `tel:` (igual que en NegociosView, FarmaciasView, etc.).
//  No hay simulación VoIP ni estados de llamada artificiales.
//
//  🔮  INTEGRACIÓN FUTURA CON GOOGLE SHEETS (FASE BACKEND):
//     Toda la información visual de esta modal se podrá editar,
//     agregar o eliminar desde la hoja "Contactos_Emergencia"
//     en Google Sheets, incluyendo:
//
//       - Título de la modal        (ej: "Central de Llamadas")
//       - Subtítulo de la modal     (ej: "Toque un contacto...")
//       - Tarjetas de contactos     (agregar, quitar, reordenar)
//         - name       (ej: "Policía Nacional (EPIC)")
//         - number     (ej: "110")
//         - label      (ej: "Número directo:")
//         - category   (determina el color del icono)
//         - icon       (qué icono de lucide-react mostrar)
//
//     Code.gs (Apps Script) leerá la hoja, sheetToObjects()
//     la convertirá a JSON, y exportDataToGitHub() la publicará
//     en GitHub Pages. El frontend consumirá:
//       json.emergencyContacts ?? EMERGENCY_CONTACTS
//
//  📌  ACTUALMENTE: Los datos son de ejemplo/mock. Los números
//     mostrados son placeholders, NO los reales de emergencia.
// ═══════════════════════════════════════════════════════════════════════
export default function CallModal({ isOpen, onClose }: CallModalProps) {
  if (!isOpen) return null;

  const handleCall = (number: string) => {
    const cleanNumber = number.replace(/[^0-9+]/g, '');
    window.location.href = `tel:${cleanNumber}`;
  };

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'policia':
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'serenazgo':
        return <Shield className="w-5 h-5 text-[#FFD700]" />;
      case 'transito':
        return <Car className="w-5 h-5 text-blue-400" />;
      case 'bomberos':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'salud':
        return <Heart className="w-5 h-5 text-emerald-400" />;
      case 'ambulancia':
        return <Cross className="w-5 h-5 text-red-400" />;
      default:
        return <User className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md font-sans pt-14 pb-14 md:pt-4 md:pb-4 px-4">
      <div className="relative w-full sm:w-[520px] max-h-full overflow-y-auto bg-[#0c101d] rounded-2xl border border-white/10 shadow-2xl custom-scrollbar">

        {/* Header */}
        <div className="sticky top-0 z-10 p-6 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">Central de Llamadas</h3>
              <p className="text-xs text-gray-400">Toque un contacto para llamar directamente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Emergency contact cards */}
        <div className="p-6 space-y-3">
          {EMERGENCY_CONTACTS.map((contact) => (
            <div
              key={contact.id}
              className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 shrink-0">
                  {getIcon(contact.category)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-white truncate">{contact.name}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{contact.label ?? 'Número directo:'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {contact.id !== '1' && (
                  <button
                    onClick={() => handleCall(contact.number)}
                    className="inline-flex items-center px-2 py-0.5 rounded-md border border-emerald-500 text-emerald-500 font-bold text-xs transition-all active:scale-95 cursor-pointer relative top-2"
                  >
                    {contact.number}
                  </button>
                )}
                <button
                  onClick={() => handleCall(contact.number)}
                  className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all active:scale-95 shrink-0 cursor-pointer"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
