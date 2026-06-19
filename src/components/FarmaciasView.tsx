import React, { useState } from 'react';
import { PlusCircle, MapPin, Phone, Building2, Calendar, Clock, Sparkles } from 'lucide-react';
import { PHARMACIES_DATA } from '../data';
import { Pharmacy } from '../types';

interface FarmaciasViewProps {
  onShowNotification: (title: string, message: string) => void;
}

export default function FarmaciasView({ onShowNotification }: FarmaciasViewProps) {
  const [filterType, setFilterType] = useState<'all' | 'near'>('all');

  const filteredPharmacies = filterType === 'near' 
    ? PHARMACIES_DATA.filter(p => p.neighborhood === 'Centro' || p.neighborhood === 'El Trigal')
    : PHARMACIES_DATA;

  const handleCall = (pharmacyName: string, phoneNumber: string) => {
    onShowNotification(
      '📞 Marcando...',
      `Simulando llamada a: "${pharmacyName}" (${phoneNumber}).`
    );
  };

  const handleNavigate = (pharmacyName: string, address: string) => {
    onShowNotification(
      '📍 Navegación GPS',
      `Calculando ruta sugerida a: "${pharmacyName}" en ${address}.`
    );
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Title */}
      <div>
        <h2 className="text-white text-2xl font-bold tracking-tight">Farmacias de Turno</h2>
        <p className="text-gray-400 text-xs mt-1">
          Encuentra las farmacias que están de turno hoy en Tarija.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setFilterType('near')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer ${
            filterType === 'near' 
              ? 'bg-brand-yellow text-gray-950 shadow-md shadow-brand-yellow/15'
              : 'bg-[#1a1a1a] text-white border border-gray-800 hover:border-brand-yellow/30'
          }`}
        >
          <MapPin className="h-4 w-4" />
          <span>Farmacias cerca del barrio</span>
        </button>

        <button
          onClick={() => setFilterType('all')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer border ${
            filterType === 'all'
              ? 'bg-transparent text-[#2ECC71] border-[#2ECC71] shadow-md shadow-emerald-500/10'
              : 'bg-transparent text-gray-400 border-gray-850 hover:text-white'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Farmacias en Tarija</span>
        </button>
      </div>

      {/* Date Header Indicator */}
      <div className="flex items-center space-x-2 bg-brand-yellow/5 border border-brand-yellow/15 py-2 px-4 rounded-lg self-start">
        <Calendar className="h-4 w-4 text-brand-yellow" />
        <span className="text-brand-yellow font-bold text-xs font-mono">Hoy 24 de mayo 2026</span>
      </div>

      {/* Pharmacies List Grid */}
      <div className="space-y-4">
        {filteredPharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden flex flex-col group hover:border-[#2ECC71]/35 transition"
          >
            {/* Header image and label overlay */}
            <div className="relative h-44 w-full bg-slate-900">
              <img
                src={pharmacy.imageUrl}
                alt={pharmacy.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-101 transition duration-300"
              />
              <div className="absolute top-4 right-4 animate-pulse">
                <span className="bg-brand-yellow text-gray-950 text-[10px] font-extrabold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-lg">
                  DE TURNO
                </span>
              </div>
              {/* Bottom tag backdrop */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1a1a1a] to-transparent h-16 pointer-events-none" />
            </div>

            {/* Information container */}
            <div className="p-4 flex flex-col space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-white text-base font-bold tracking-tight">
                  {pharmacy.name}
                </h3>
              </div>

              <p className="text-gray-400 text-xs leading-normal">
                {pharmacy.description}
              </p>

              {/* Data specifications matches screenshot perfectly */}
              <div className="space-y-2 pt-2 border-t border-gray-900 text-xs">
                {/* Address */}
                <div
                  onClick={() => handleNavigate(pharmacy.name, pharmacy.address)}
                  className="flex items-start space-x-2.5 text-gray-300 hover:text-brand-green transition cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                  <span className="font-mono text-[11px] leading-tight">{pharmacy.address}</span>
                </div>

                {/* Contact phone */}
                <div
                  onClick={() => handleCall(pharmacy.name, pharmacy.phone)}
                  className="flex items-center space-x-2.5 text-gray-300 hover:text-brand-yellow transition cursor-pointer"
                >
                  <Phone className="h-4 w-4 text-brand-yellow shrink-0" />
                  <span className="font-mono text-[11px]">{pharmacy.phone}</span>
                </div>

                {/* Neighborhood Zone */}
                <div className="flex items-center space-x-2.5 text-gray-400">
                  <Building2 className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="font-mono text-[11px]">{pharmacy.neighborhood}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredPharmacies.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-xs font-mono">
            Ninguna farmacia encontrada con este filtro de urgencia.
          </div>
        )}
      </div>

      {/* Bottom informational marquee alerts */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center space-x-3">
        <div className="text-brand-green bg-brand-green/10 p-2 rounded-full shrink-0">
          <Clock className="h-4 w-4" />
        </div>
        <p className="text-brand-green text-xs font-medium leading-relaxed">
          Los turnos cambian diariamente a las <span className="font-bold font-mono text-[13px]">08:00 AM</span>. Favor de verificar credenciales antes de trasladarse.
        </p>
      </div>
    </div>
  );
}
