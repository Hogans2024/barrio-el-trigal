import React, { useState, useEffect } from 'react';
import {
  User, Calendar, FileText, Smartphone, Mail, Settings, MapPin, Home,
  Clock, CheckSquare, Shield, Send, Users, Sparkles, Trash2, CheckCircle2, Award
} from 'lucide-react';
import { AffiliateForm } from '../types';

interface AfiliacionViewProps {
  onShowNotification: (title: string, message: string) => void;
}

export default function AfiliacionView({ onShowNotification }: AfiliacionViewProps) {
  const [form, setForm] = useState<Partial<AffiliateForm>>({
    fechaRegistro: new Date().toISOString().split('T')[0],
    nombres: '',
    apellidos: '',
    ci: '',
    fechaNacimiento: '',
    sexo: '',
    estadoCivil: '',
    profesion: '',
    telefono: '',
    correo: '',
    fechaAfiliacion: new Date().toISOString().split('T')[0],
    estadoAfiliacion: 'Activo',
    numeroAfiliado: '001',
    tipoAfiliado: '',
    numeroRecibo: 'REC-001',
    montoPagado: 'Bs. 50.00',
    direccion: '',
    numeroCasa: '',
    manzano: '',
    tiempoResidencia: '',
    zonaReferencia: '',
    participaReuniones: true,
    deseaComisiones: false,
    interesSeguridad: 'Medio',
    observaciones: ''
  });

  const [registeredList, setRegisteredList] = useState<AffiliateForm[]>([]);
  const [lastRegistered, setLastRegistered] = useState<AffiliateForm | null>(null);
  const [showListView, setShowListView] = useState(false);

  useEffect(() => {
    const list = localStorage.getItem('barrio_afiliados');
    if (list) {
      try {
        setRegisteredList(JSON.parse(list));
      } catch (e) {}
    }
  }, []);

  const handleChange = (field: keyof AffiliateForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombres || !form.apellidos || !form.ci) {
      onShowNotification('⚠️ Error de Validación', 'Los campos Nombres, Apellidos y C.I. son obligatorios.');
      return;
    }

    const newFormRecord = form as AffiliateForm;
    const updatedList = [newFormRecord, ...registeredList];
    setRegisteredList(updatedList);
    localStorage.setItem('barrio_afiliados', JSON.stringify(updatedList));

    setLastRegistered(newFormRecord);
    onShowNotification(
      '✅ Registro Exitoso',
      `¡Muchos éxitos! Vecino ${newFormRecord.nombres} registrado como afiliado en Barrio El Trigal.`
    );
  };

  const handleClearRecords = () => {
    setRegisteredList([]);
    localStorage.removeItem('barrio_afiliados');
    onShowNotification('🧹 Registros Borrados', 'Se vació el listado local de afiliados para fines de prueba.');
  };

  const handleAddNewTestUser = () => {
    const sampleRecord: AffiliateForm = {
      fechaRegistro: '2026-06-18',
      nombres: 'José Gabriel',
      apellidos: 'Condori',
      ci: '7412891',
      fechaNacimiento: '1988-11-20',
      sexo: 'Masculino',
      estadoCivil: 'Casado',
      profesion: 'Médico',
      telefono: '+591 7 42191024',
      correo: 'gabriel.condori@gmail.com',
      fechaAfiliacion: '2026-06-18',
      estadoAfiliacion: 'Activo',
      numeroAfiliado: '104',
      tipoAfiliado: 'Vecino Titular',
      numeroRecibo: 'REC-230',
      montoPagado: 'Bs. 50.00',
      direccion: 'Av. Las Gardenias esq. Sauce',
      numeroCasa: '94',
      manzano: 'MZ-12',
      tiempoResidencia: '8 años',
      zonaReferencia: 'Frente a panadería central',
      participaReuniones: true,
      deseaComisiones: true,
      interesSeguridad: 'Alto',
      observaciones: 'Listo para colaborar con brigadas vecinales.'
    };

    const next = [sampleRecord, ...registeredList];
    setRegisteredList(next);
    localStorage.setItem('barrio_afiliados', JSON.stringify(next));
    onShowNotification('⚡ Registro Demo Añadido', 'Añadido un afiliado de muestra para fines de demostración de reportes.');
  };

  if (lastRegistered) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 text-center space-y-6 flex flex-col items-center animate-in fade-in duration-200">
        <div className="bg-[#2ECC71]/10 text-brand-green p-4 rounded-full border-2 border-brand-green/30 animate-bounce">
          <Award className="h-10 w-10" />
        </div>

        <div>
          <h3 className="text-white text-xl font-bold tracking-tight">¡Afiliación Registrada con éxito!</h3>
          <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
            Te has incorporado de forma oficial al Barrio El Trigal. A continuación puedes visualizar tu credencial digital.
          </p>
        </div>

        {/* Digital ID Card */}
        <div className="bg-black/80 rounded-2xl border border-brand-yellow/30 p-5 w-full text-left font-sans max-w-sm relative overflow-hidden shadow-2xl">
          {/* Decorative watermarks */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-bl-full pointer-events-none" />

          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-800/60 mb-4">
            <div>
              <h4 className="text-brand-yellow text-xs font-black tracking-widest uppercase">CREDENCIAL DE AFILIADO</h4>
              <p className="text-gray-500 text-[9px] font-mono">ASOCIACIÓN VECINAL EL TRIGAL</p>
            </div>
            <div className="bg-[#1a1a1a] p-1.5 rounded-lg border border-gray-800 shrink-0">
              <Users className="h-4 w-4 text-brand-green" />
            </div>
          </div>

          {/* Body specs */}
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-500 text-[10px] uppercase font-mono block">Nombres</span>
                <span className="text-white font-bold">{lastRegistered.nombres}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10px] uppercase font-mono block">Apellidos</span>
                <span className="text-white font-bold">{lastRegistered.apellidos}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-500 text-[10px] uppercase font-mono block">C.I. Identidad</span>
                <span className="text-white font-mono font-bold">{lastRegistered.ci}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[10px] uppercase font-mono block">Rol del Afiliado</span>
                <span className="text-brand-green font-bold">{lastRegistered.tipoAfiliado || 'Vecino Regular'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-900">
              <div>
                <span className="text-gray-500 text-[9px] block">Nº Afiliado:</span>
                <span className="text-white font-mono font-bold text-xs">{lastRegistered.numeroAfiliado || '000'}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[9px] block">Estado:</span>
                <span className="text-brand-green font-extrabold text-[10px] uppercase">{lastRegistered.estadoAfiliacion}</span>
              </div>
            </div>
          </div>

          {/* CSS QR Code simulation */}
          <div className="mt-5 flex justify-between items-end">
            <div className="text-[10px] font-mono text-gray-500">
              <span>Habilitado • 2026/2027</span>
            </div>
            {/* Fake stylized QR code */}
            <div className="w-12 h-12 bg-white p-1 rounded-sm grid grid-cols-2 gap-0.5 shrink-0 opacity-90 select-none">
              <div className="bg-black rounded-sm border-[1.5px] border-white" />
              <div className="bg-black rounded-sm border-[1.5px] border-white" />
              <div className="bg-black rounded-sm" />
              <div className="bg-black rounded-sm border-[1.5px] border-white" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={() => setLastRegistered(null)}
            className="flex-1 bg-black text-gray-400 border border-gray-800 py-3 rounded-xl font-bold text-xs cursor-pointer hover:text-white"
          >
            Registrar Otro
          </button>
          <button
            onClick={() => {
              setLastRegistered(null);
              setShowListView(true);
            }}
            className="flex-1 bg-brand-yellow text-gray-950 hover:bg-yellow-400 py-3 rounded-xl font-bold text-xs cursor-pointer"
          >
            Ver Registrados ({registeredList.length})
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5">
      {/* Selector of table / form */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Registro de Afiliados</h2>
          <p className="text-gray-400 text-xs mt-1">
            Complete el formulario oficial para formar parte de nuestra comunidad organizada.
          </p>
        </div>
        <button
          onClick={() => setShowListView(!showListView)}
          className="bg-brand-green/10 text-brand-green border border-brand-green/30 px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-green hover:text-black transition cursor-pointer"
        >
          {showListView ? 'Ir a Formulario' : `Ver Afiliados (${registeredList.length})`}
        </button>
      </div>

      {showListView ? (
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-4 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-900">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider">Padrones Vecinales</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleAddNewTestUser}
                className="bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 hover:border-brand-yellow px-2.5 py-1 rounded-md text-[10px] font-bold"
              >
                + Cargar Demo
              </button>
              {registeredList.length > 0 && (
                <button
                  onClick={handleClearRecords}
                  className="bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Vaciar</span>
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-900 text-gray-500 uppercase font-mono">
                  <th className="py-2 pr-2">Nombre</th>
                  <th className="py-2 px-2">C.I.</th>
                  <th className="py-2 px-2">Dirección</th>
                  <th className="py-2 pl-2">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900">
                {registeredList.map((afiliado, idx) => (
                  <tr key={idx} className="hover:bg-black/20 text-gray-300">
                    <td className="py-2.5 pr-2 font-semibold">
                      {afiliado.nombres} {afiliado.apellidos}
                    </td>
                    <td className="py-2.5 px-2 font-mono">{afiliado.ci}</td>
                    <td className="py-2.5 px-2 text-gray-400 truncate max-w-[120px]">{afiliado.direccion || 'No registrada'} Safe</td>
                    <td className="py-2.5 pl-2 text-brand-green font-semibold whitespace-nowrap">{afiliado.tipoAfiliado || 'Vecino regular'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {registeredList.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <p>No se han registrado afiliados de momento.</p>
                <button
                  onClick={() => setShowListView(false)}
                  className="mt-3 text-xs bg-brand-yellow text-gray-950 font-bold px-4 py-1.5 rounded-lg"
                >
                  Afiliarse Ahora
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. DATOS PERSONALES */}
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-5 space-y-4">
            <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
              <User className="h-4 w-4 text-brand-green" />
              <span>DATOS PERSONALES</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fecha Registro */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Fecha de Registro</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="date"
                    required
                    value={form.fechaRegistro}
                    onChange={(e) => handleChange('fechaRegistro', e.target.value)}
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow font-mono"
                  />
                </div>
              </div>

              {/* Nombres */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Nombres</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={form.nombres}
                    onChange={(e) => handleChange('nombres', e.target.value)}
                    placeholder="Ej. Juan"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                  />
                </div>
              </div>

              {/* Apellidos */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Apellidos</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={form.apellidos}
                    onChange={(e) => handleChange('apellidos', e.target.value)}
                    placeholder="Ej. Pérez"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                  />
                </div>
              </div>

              {/* C.I. */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">C.I. (Documento)</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={form.ci}
                    onChange={(e) => handleChange('ci', e.target.value)}
                    placeholder="1234567"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow font-mono"
                  />
                </div>
              </div>

              {/* Fecha Nacimiento */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Fecha de Nacimiento</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="date"
                    required
                    value={form.fechaNacimiento}
                    onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow font-mono"
                  />
                </div>
              </div>

              {/* Sexo */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Sexo</label>
                <select
                  value={form.sexo}
                  onChange={(e) => handleChange('sexo', e.target.value)}
                  className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                >
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro / Prefiero no decir</option>
                </select>
              </div>

              {/* Estado civil */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Estado Civil</label>
                <select
                  value={form.estadoCivil}
                  onChange={(e) => handleChange('estadoCivil', e.target.value)}
                  className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                >
                  <option value="">Seleccionar</option>
                  <option value="Soltero">Soltero/a</option>
                  <option value="Casado">Casado/a</option>
                  <option value="Conviviente">Conviviente</option>
                  <option value="Divorciado">Divorciado/a</option>
                  <option value="Viudo">Viudo/a</option>
                </select>
              </div>

              {/* Profesión */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Profesión / Ocupación</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={form.profesion}
                    onChange={(e) => handleChange('profesion', e.target.value)}
                    placeholder="Ej. Arquitecto, Comerciante..."
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. CONTACTO Y AFILIACIÓN */}
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-5 space-y-4">
            <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
              <Smartphone className="h-4 w-4 text-brand-green" />
              <span>CONTACTO Y AFILIACIÓN</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teléfono */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Teléfono-Celular</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="tel"
                    required
                    value={form.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    placeholder="+591 7 12345678"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow font-mono"
                  />
                </div>
              </div>

              {/* Correo */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="email"
                    value={form.correo}
                    onChange={(e) => handleChange('correo', e.target.value)}
                    placeholder="ejemplo@mail.com"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                  />
                </div>
              </div>

              {/* Fecha Afiliacion */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Fecha de Afiliación</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="date"
                    required
                    value={form.fechaAfiliacion}
                    onChange={(e) => handleChange('fechaAfiliacion', e.target.value)}
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow font-mono"
                  />
                </div>
              </div>

              {/* Estado Afiliación */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Estado de Afiliación</label>
                <select
                  value={form.estadoAfiliacion}
                  onChange={(e) => handleChange('estadoAfiliacion', e.target.value as any)}
                  className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              {/* Número de Afiliado */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Número de Afiliado</label>
                <input
                  type="text"
                  value={form.numeroAfiliado}
                  onChange={(e) => handleChange('numeroAfiliado', e.target.value)}
                  placeholder="000"
                  className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                />
              </div>

              {/* Tipo de Afiliado */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Tipo de Afiliado</label>
                <select
                  value={form.tipoAdherente || form.tipoAfiliado}
                  onChange={(e) => handleChange('tipoAfiliado', e.target.value)}
                  className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none"
                >
                  <option value="">Seleccionar</option>
                  <option value="Vecino Titular">Vecino Titular</option>
                  <option value="Vecino Adherente">Vecino Adherente</option>
                  <option value="Familiar">Familiar directo</option>
                </select>
              </div>

              {/* Recibo */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Número de Recibo</label>
                <input
                  type="text"
                  value={form.numeroRecibo}
                  onChange={(e) => handleChange('numeroRecibo', e.target.value)}
                  placeholder="REC-000"
                  className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                />
              </div>

              {/* Monto pagado */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Monto Pagado</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={form.montoPagado}
                    onChange={(e) => handleChange('montoPagado', e.target.value)}
                    placeholder="Bs. 0.00"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. UBICACIÓN Y VIVIENDA */}
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-5 space-y-4">
            <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
              <MapPin className="h-4 w-4 text-brand-green" />
              <span>UBICACIÓN Y VIVIENDA</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Direccion */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-gray-400 text-xs">Dirección</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={form.direccion}
                    onChange={(e) => handleChange('direccion', e.target.value)}
                    placeholder="Calle, Avenida, Barrio, Referencia..."
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                  />
                </div>
              </div>

              {/* Número Casa */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Número de Casa</label>
                <div className="relative">
                  <Home className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={form.numeroCasa}
                    onChange={(e) => handleChange('numeroCasa', e.target.value)}
                    placeholder="Ej. N° 45"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Manzano */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Manzano</label>
                <div className="relative">
                  <Home className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={form.manzano}
                    onChange={(e) => handleChange('manzano', e.target.value)}
                    placeholder="M-4"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Tiempo residencia */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Tiempo de Residencia</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={form.tiempoResidencia}
                    onChange={(e) => handleChange('tiempoResidencia', e.target.value)}
                    placeholder="5 años"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Zona referencia */}
              <div className="space-y-1">
                <label className="text-gray-400 text-xs">Zona Referencia</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={form.zonaReferencia}
                    onChange={(e) => handleChange('zonaReferencia', e.target.value)}
                    placeholder="Ej. Cerca al parque central"
                    className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. PARTICIPACIÓN VECINAL */}
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-5 space-y-4">
            <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
              <Users className="h-4 w-4 text-brand-green" />
              <span>PARTICIPACIÓN VECINAL</span>
            </h3>

            <div className="space-y-4 text-xs select-none">
              {/* Toggle 1 */}
              <div className="flex justify-between items-center bg-black/30 p-3 rounded-xl border border-gray-900">
                <div className="space-y-0.5">
                  <p className="text-white font-semibold">¿Participa en Reuniones?</p>
                  <p className="text-gray-500 text-[11px]">Compromiso con asambleas ordinarias y zonales</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('participaReuniones', !form.participaReuniones)}
                  className={`w-12 h-6 rounded-full p-1 transition duration-200 focus:outline-none cursor-pointer ${
                    form.participaReuniones ? 'bg-[#2ECC71]' : 'bg-gray-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-gray-950 rounded-full shadow transition-all duration-200 ${
                      form.participaReuniones ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex justify-between items-center bg-black/30 p-3 rounded-xl border border-gray-900">
                <div className="space-y-0.5">
                  <p className="text-white font-semibold">¿Desea formar parte de Comisiones?</p>
                  <p className="text-gray-500 text-[11px]">Comisiones de seguridad, deportes u obras</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('deseaComisiones', !form.deseaComisiones)}
                  className={`w-12 h-6 rounded-full p-1 transition duration-200 focus:outline-none cursor-pointer ${
                    form.deseaComisiones ? 'bg-[#2ECC71]' : 'bg-gray-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-gray-950 rounded-full shadow transition-all duration-200 ${
                      form.deseaComisiones ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Interest in Security (Bajo, Medio, Alto) */}
              <div className="space-y-1.5 pt-1">
                <p className="text-gray-400 font-semibold mb-1">Interés en Seguridad Vecinal</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Bajo', 'Medio', 'Alto'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleChange('interesSeguridad', lvl)}
                      className={`py-2 rounded-lg font-bold text-xs border transition cursor-pointer text-center ${
                        form.interesSeguridad === lvl
                          ? 'bg-[#2ECC71]/15 text-brand-green border-[#2ECC71]'
                          : 'bg-transparent text-gray-400 border-gray-800 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Observaciones */}
              <div className="space-y-1 pt-1.5">
                <label className="text-gray-400 font-semibold">Observaciones</label>
                <textarea
                  rows={3}
                  value={form.observaciones}
                  onChange={(e) => handleChange('observaciones', e.target.value)}
                  placeholder="Información adicional relevante..."
                  className="w-full bg-black text-white p-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-brand-yellow hover:bg-yellow-400 text-gray-950 py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center space-x-2.5 transition shadow-lg shadow-brand-yellow/15 cursor-pointer"
          >
            <Send className="h-4.5 w-4.5" />
            <span>ENVIAR REGISTRO</span>
          </button>
        </form>
      )}
    </div>
  );
}
