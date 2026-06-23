import React, { useState, useEffect } from 'react';
import {
  User, Calendar, FileText, Smartphone, Mail, MapPin, Home,
  Clock, Users, Send, Award, LogOut
} from 'lucide-react';
import { AffiliateForm } from '../types';

interface AfiliacionViewProps {
  onShowNotification: (title: string, message: string) => void;
}

const CLIENT_ID = "778103287737-no8f38pn830lrrqodr5qdlrfulmqk4iq.apps.googleusercontent.com";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWMU9bKHzy5SQoUP5p5rxSsH2KCx4ujVZ2Beh-M_LyY3UN1pYOFt8xKVHjOxsxz0mG/exec";

function decodificarJWT(token: string) {
  try {
    const partes = token.split(".");
    if (partes.length !== 3) return null;
    const base64Url = partes[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error al decodificar el token JWT:", e);
    return null;
  }
}

export default function AfiliacionView({ onShowNotification }: AfiliacionViewProps) {
  const [tokenUsuario, setTokenUsuario] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{name: string, email: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    zona: '',
    referencia: '',
    tiempoResidencia: '',
    participaReuniones: true,
    deseaComisiones: false,
    interesSeguridad: 'Medio',
    observaciones: ''
  });

  const [lastRegistered, setLastRegistered] = useState<AffiliateForm | null>(null);

  useEffect(() => {
    // Configurar callback global para Google Auth
    (window as any).manejarRespuestaGoogle = (response: any) => {
      const token = response.credential;
      setTokenUsuario(token);
      const payload = decodificarJWT(token);
      if (payload) {
        setUserProfile({ name: payload.name || "Usuario", email: payload.email || "" });
      } else {
        onShowNotification('⚠️ Error de Sesión', 'No se pudo leer la información del usuario.');
        setTokenUsuario(null);
      }
    };

    if (!tokenUsuario) {
      if ((window as any).google && (window as any).google.accounts) {
        (window as any).google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (window as any).manejarRespuestaGoogle,
          auto_select: false
        });

        const btnContainer = document.getElementById("g_id_signin");
        if (btnContainer) {
          (window as any).google.accounts.id.renderButton(btnContainer, {
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            width: 280
          });
        }
      }
    }
  }, [tokenUsuario, onShowNotification]);

  const handleLogout = () => {
    setTokenUsuario(null);
    setUserProfile(null);
    if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
      (window as any).google.accounts.id.disableAutoSelect();
    }
    setLastRegistered(null);
  };

  const handleChange = (field: keyof AffiliateForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenUsuario) {
      onShowNotification('⚠️ Acceso Denegado', 'Por favor, inicie sesión con Google antes de enviar.');
      return;
    }

    if (!form.nombres || !form.apellidos || !form.ci) {
      onShowNotification('⚠️ Error de Validación', 'Los campos Nombres, Apellidos y C.I. son obligatorios.');
      return;
    }

    setIsSubmitting(true);

    const datos = {
      nombres: form.nombres,
      apellidos: form.apellidos,
      ci: form.ci,
      fechaNacimiento: form.fechaNacimiento,
      sexo: form.sexo,
      estadoCivil: form.estadoCivil,
      profesion: form.profesion,
      telefono: form.telefono,
      correo: form.correo,
      fechaAfiliacion: form.fechaAfiliacion,
      numeroAfiliado: form.numeroAfiliado,
      estadoAfiliacion: form.estadoAfiliacion,
      tipoAfiliado: form.tipoAfiliado || '',
      montoPagado: form.montoPagado,
      numeroRecibo: form.numeroRecibo,
      observaciones: form.observaciones || "Ninguna",
      direccion: form.direccion,
      numeroCasa: form.numeroCasa,
      manzano: form.manzano,
      zona: form.zona,
      referencia: form.referencia,
      tiempoResidencia: form.tiempoResidencia,
      participaReuniones: form.participaReuniones ? "Sí" : "No",
      deseaComisiones: form.deseaComisiones ? "Sí" : "No",
      interesSeguridad: form.interesSeguridad
    };

    const cuerpoRequest = JSON.stringify({
      token: tokenUsuario,
      datos: datos
    });

    try {
      const respuesta = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: cuerpoRequest
      });

      const json = await respuesta.json();

      if (json.exito === true) {
        onShowNotification('✅ Registro Exitoso', json.mensaje || `Vecino ${form.nombres} registrado correctamente en la base de datos.`);
        setLastRegistered(form as AffiliateForm);
        setForm(prev => ({
          ...prev,
          nombres: '',
          apellidos: '',
          ci: '',
          telefono: '',
          correo: '',
          numeroCasa: '',
          observaciones: ''
        }));
      } else {
        onShowNotification('⚠️ Error del Servidor', json.mensaje || 'El servidor rechazó la solicitud.');
      }
    } catch (errorRed) {
      console.error("Error de red al enviar el formulario:", errorRed);
      onShowNotification('⚠️ Error de Conexión', 'Verifique su acceso a internet e intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tokenUsuario) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 px-4 animate-in fade-in duration-200">
        <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-8 text-center max-w-md w-full shadow-2xl space-y-6">
          <div className="mx-auto bg-blue-500/10 text-blue-400 p-4 rounded-full border-2 border-blue-500/30 w-16 h-16 flex items-center justify-center">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold tracking-tight">Formulario de Afiliación</h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Acceso exclusivo para personal administrativo autorizado.<br/>Inicie sesión con su cuenta de Google institucional.
            </p>
          </div>
          <div className="flex justify-center pt-4 pb-2">
            <div id="g_id_signin"></div>
          </div>
          <p className="text-gray-500 text-xs">
            Solo las cuentas habilitadas por el administrador pueden acceder a este sistema.
          </p>
        </div>
      </div>
    );
  }

  if (lastRegistered) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 text-center space-y-6 flex flex-col items-center animate-in fade-in duration-200">
        <div className="bg-[#2ECC71]/10 text-brand-green p-4 rounded-full border-2 border-brand-green/30 animate-bounce">
          <Award className="h-10 w-10" />
        </div>

        <div>
          <h3 className="text-white text-xl font-bold tracking-tight">¡Afiliación Registrada con éxito!</h3>
          <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
            Los datos de {lastRegistered.nombres} han sido enviados correctamente a la base de datos central.
          </p>
        </div>

        {/* Digital ID Card */}
        <div className="bg-black/80 rounded-2xl border border-brand-yellow/30 p-5 w-full text-left font-sans max-w-sm relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-bl-full pointer-events-none" />

          <div className="flex justify-between items-center pb-3 border-b border-gray-800/60 mb-4">
            <div>
              <h4 className="text-brand-yellow text-xs font-black tracking-widest uppercase">CREDENCIAL DE AFILIADO</h4>
              <p className="text-gray-500 text-[9px] font-mono">ASOCIACIÓN VECINAL EL TRIGAL</p>
            </div>
            <div className="bg-[#1a1a1a] p-1.5 rounded-lg border border-gray-800 shrink-0">
              <Users className="h-4 w-4 text-brand-green" />
            </div>
          </div>

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

          <div className="mt-5 flex justify-between items-end">
            <div className="text-[10px] font-mono text-gray-500">
              <span>Habilitado • 2026/2027</span>
            </div>
            <div className="w-12 h-12 bg-white p-1 rounded-sm grid grid-cols-2 gap-0.5 shrink-0 opacity-90 select-none">
              <div className="bg-black rounded-sm border-[1.5px] border-white" />
              <div className="bg-black rounded-sm border-[1.5px] border-white" />
              <div className="bg-black rounded-sm" />
              <div className="bg-black rounded-sm border-[1.5px] border-white" />
            </div>
          </div>
        </div>

        <button
          onClick={() => setLastRegistered(null)}
          className="w-full bg-black text-gray-400 border border-gray-800 hover:border-gray-600 py-3 rounded-xl font-bold text-xs cursor-pointer hover:text-white transition"
        >
          Registrar Otro Afiliado
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center bg-[#1a1a1a] rounded-xl border border-gray-800 px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/10 p-2 rounded-full border border-blue-500/20">
              <User className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Sesión activa</p>
              <p className="text-white text-sm font-bold truncate max-w-[150px] sm:max-w-xs">{userProfile?.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 p-2 rounded-lg transition-colors flex items-center space-x-2"
            title="Cerrar Sesión"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-xs font-bold hidden sm:block">Salir</span>
          </button>
        </div>

        <div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Registro de Afiliados</h2>
          <p className="text-gray-400 text-xs mt-1">
            Complete el formulario oficial. La información se enviará directamente a la base de datos central.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. DATOS PERSONALES */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-5 space-y-4">
          <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
            <User className="h-4 w-4 text-brand-green" />
            <span>DATOS PERSONALES</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Nombres *</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.nombres}
                  onChange={(e) => handleChange('nombres', e.target.value)}
                  placeholder="Ej. Juan Carlos"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Apellidos *</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.apellidos}
                  onChange={(e) => handleChange('apellidos', e.target.value)}
                  placeholder="Ej. Pérez García"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">C.I. Identidad *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.ci}
                  onChange={(e) => handleChange('ci', e.target.value)}
                  placeholder="Ej. 12345678"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Fecha de Nacimiento *</label>
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

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Sexo *</label>
              <select
                required
                value={form.sexo}
                onChange={(e) => handleChange('sexo', e.target.value)}
                className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
              >
                <option value="">-- Seleccionar --</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Estado Civil *</label>
              <select
                required
                value={form.estadoCivil}
                onChange={(e) => handleChange('estadoCivil', e.target.value)}
                className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
              >
                <option value="">-- Seleccionar --</option>
                <option value="Soltero/a">Soltero/a</option>
                <option value="Casado/a">Casado/a</option>
                <option value="Divorciado/a">Divorciado/a</option>
                <option value="Viudo/a">Viudo/a</option>
                <option value="Unión Libre">Unión Libre</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Profesión / Ocupación *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.profesion}
                  onChange={(e) => handleChange('profesion', e.target.value)}
                  placeholder="Ej. Ingeniero Civil"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Fecha de Registro</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="date"
                  required
                  value={form.fechaRegistro}
                  onChange={(e) => handleChange('fechaRegistro', e.target.value)}
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow font-mono opacity-60"
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
            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Teléfono-Celular *</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  placeholder="Ej. 70012345"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Correo Electrónico *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={form.correo}
                  onChange={(e) => handleChange('correo', e.target.value)}
                  placeholder="ejemplo@mail.com"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Fecha de Afiliación *</label>
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

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Número de Afiliado *</label>
              <input
                type="text"
                required
                value={form.numeroAfiliado}
                onChange={(e) => handleChange('numeroAfiliado', e.target.value)}
                placeholder="Ej. AF-001"
                className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Estado de Afiliación *</label>
              <select
                required
                value={form.estadoAfiliacion}
                onChange={(e) => handleChange('estadoAfiliacion', e.target.value as any)}
                className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
              >
                <option value="">-- Seleccionar --</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Suspendido">Suspendido</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Tipo de Afiliado *</label>
              <input
                type="text"
                required
                value={form.tipoAfiliado}
                onChange={(e) => handleChange('tipoAfiliado', e.target.value)}
                placeholder="Ej. Titular, Dependiente"
                className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Monto Pagado (Bs.) *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.montoPagado}
                  onChange={(e) => handleChange('montoPagado', e.target.value)}
                  placeholder="Ej. 100"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Número de Recibo *</label>
              <input
                type="text"
                required
                value={form.numeroRecibo}
                onChange={(e) => handleChange('numeroRecibo', e.target.value)}
                placeholder="Ej. REC-2024-001"
                className="w-full bg-black text-white px-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-gray-400 text-xs">Observaciones</label>
              <textarea
                rows={3}
                value={form.observaciones}
                onChange={(e) => handleChange('observaciones', e.target.value)}
                placeholder="Ninguna"
                className="w-full bg-black text-white p-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow resize-none"
              />
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
            <div className="space-y-1 md:col-span-2">
              <label className="text-gray-400 text-xs">Dirección *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.direccion}
                  onChange={(e) => handleChange('direccion', e.target.value)}
                  placeholder="Ej. Av. Heroínas N° 456..."
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Número de Casa *</label>
              <div className="relative">
                <Home className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.numeroCasa}
                  onChange={(e) => handleChange('numeroCasa', e.target.value)}
                  placeholder="Ej. 14-A"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Manzano *</label>
              <div className="relative">
                <Home className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.manzano}
                  onChange={(e) => handleChange('manzano', e.target.value)}
                  placeholder="Ej. B-3"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Zona *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.zona}
                  onChange={(e) => handleChange('zona', e.target.value)}
                  placeholder="Ej. Zona Norte"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-xs">Referencia *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.referencia}
                  onChange={(e) => handleChange('referencia', e.target.value)}
                  placeholder="Ej. Frente al parque central"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-gray-400 text-xs">Tiempo de Residencia *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={form.tiempoResidencia}
                  onChange={(e) => handleChange('tiempoResidencia', e.target.value)}
                  placeholder="Ej. 5 años, 8 meses"
                  className="w-full bg-black text-white pl-10 pr-3 py-3 rounded-lg border border-gray-800 text-xs focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. PARTICIPACIÓN VECINAL */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-5 space-y-4">
          <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
            <Users className="h-4 w-4 text-brand-green" />
            <span>PARTICIPACIÓN COMUNITARIA</span>
          </h3>

          <div className="space-y-4 text-xs select-none">
            <div className="flex justify-between items-center bg-black/30 p-3 rounded-xl border border-gray-900">
              <div className="space-y-0.5">
                <p className="text-white font-semibold">¿Participa en Reuniones? *</p>
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

            <div className="flex justify-between items-center bg-black/30 p-3 rounded-xl border border-gray-900">
              <div className="space-y-0.5">
                <p className="text-white font-semibold">¿Desea formar parte de Comisiones? *</p>
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

            <div className="space-y-1.5 pt-1">
              <p className="text-gray-400 font-semibold mb-1">Interés en Comisión de Seguridad *</p>
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
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center space-x-2.5 transition shadow-lg cursor-pointer ${
            isSubmitting
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-brand-yellow hover:bg-yellow-400 text-gray-950 shadow-brand-yellow/15'
          }`}
        >
          {isSubmitting ? (
            <span>ENVIANDO REGISTRO...</span>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>ENVIAR REGISTRO</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
