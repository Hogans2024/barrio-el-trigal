import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Shield,
  UserPlus,
  CheckCircle,
  Check,
  X,
  ArrowLeft,
  Coins,
  FileCheck,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Zap,
  Droplet,
  Flame,
  // Iconos del formulario real de Google (NO tocar):
  User,
  Calendar,
  FileText,
  Smartphone,
  Mail,
  MapPin,
  Home,
  Clock,
  Users,
  Send,
  Award,
  LogOut,
} from 'lucide-react';

// Tipos reales del CMS (el AffiliateForm se usa en el flujo REAL de Google):
import { AffiliateForm } from '../types';
// Tipos/datos MOCK de la sección Afiliados (Vecino, carrusel, etc.):
import { AFILIADOS_SLIDES, DEFAULT_VECINOS } from '../data.alarma';
import { Vecino } from '../types.alarma';
import { playTone } from './AudioSiren';

interface AfiliacionViewProps {
  onShowNotification: (title: string, message: string) => void;
  onAfiliadoActionChange?: (isActive: boolean) => void;
}

// ============================================================
// LÓGICA REAL DE GOOGLE AUTH + APPS SCRIPT (NO MODIFICAR).
// Esta es la ÚNICA fuente de verdad del login (sección 4.1).
// Se reubica dentro de activeAfiliadoAction === 1.
// ============================================================
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

export default function AfiliacionView({ onShowNotification, onAfiliadoActionChange }: AfiliacionViewProps) {
  const currentSlides = AFILIADOS_SLIDES;

  const [carouselIndex, setCarouselIndex] = useState(0);

  // Neighbors list initialized from localStorage or DEFAULT_VECINOS (botones 2,3,4)
  const [vecinos, setVecinos] = useState<Vecino[]>(() => {
    const saved = localStorage.getItem('barrio_vecinos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_VECINOS;
  });

  useEffect(() => {
    localStorage.setItem('barrio_vecinos', JSON.stringify(vecinos));
  }, [vecinos]);

  // Selected action / interactive sub-view in affiliates section (1-8 correspond to buttons)
  const [activeAfiliadoAction, setActiveAfiliadoAction] = useState<number | null>(null);

  // --- Estados del login REAL con Google + formulario real (botón 1) ---
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

  // useEffect que inicializa Google Identity Services y renderiza el botón de login.
  // Se ejecuta cuando estamos en la acción 1 y aún no hay token.
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

    if (!tokenUsuario && activeAfiliadoAction === 1) {
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
  }, [tokenUsuario, onShowNotification, activeAfiliadoAction]);

  // Notificar a App.tsx cuando se activa/desactiva una sub-acción
  useEffect(() => {
    onAfiliadoActionChange?.(activeAfiliadoAction !== null);
  }, [activeAfiliadoAction, onAfiliadoActionChange]);

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

  // handleSubmit REAL: envía el formulario a Apps Script → hoja "Datos_Afiliacion" → "Datos".
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

  // --- Estados de los botones mock 2, 3 y 4 (datos de prueba / localStorage) ---

  // Search state for neighbor search action (botón 2)
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchCI, setSearchCI] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchFoundResult, setSearchFoundResult] = useState<any | null>(null);

  // Status check phone state (botón 3)
  const [statusCheckPhone, setStatusCheckPhone] = useState('');
  const [statusCheckResult, setStatusCheckResult] = useState<{ found: boolean; name?: string; phone?: string; ci?: string; address?: string } | null>(null);

  // Manual attendance list state for action 4 (botón 4)
  const [manualAttendanceList, setManualAttendanceList] = useState<any[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      num: i + 1,
      nombre: '',
      fecha: '',
      hora: ''
    }))
  );

  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchModalCount, setBatchModalCount] = useState('');
  const [addedRowsHidden, setAddedRowsHidden] = useState(false);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [deleteRowData, setDeleteRowData] = useState<any | null>(null);
  const [editRowData, setEditRowData] = useState<any | null>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [hideInstruction, setHideInstruction] = useState(false);

  useEffect(() => {
    if (activeAfiliadoAction === 4) setHideInstruction(false);
  }, [activeAfiliadoAction]);

  useEffect(() => {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;
    nav.style.display = isKeyboardOpen ? 'none' : '';
    return () => { if (nav) nav.style.display = ''; };
  }, [isKeyboardOpen]);
  const fullListRef = useRef<any[] | null>(null);
  const INITIAL_ROW_COUNT = 5;

  useEffect(() => {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;
    const measure = () => setNavHeight(nav.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  const getNextRowNum = (list: any[]) => list.reduce((max, r) => Math.max(max, r.num || 0), 0) + 1;

  // Helper to get affiliation date
  const getAffiliationDate = (v: any) => {
    if (!v) return '';
    if (v.fechaAfiliacion) return v.fechaAfiliacion;
    switch (v.celular) {
      case '12345678': return '10 de Enero, 2018';
      case '72947032': return '15 de Marzo, 2020';
      case '60272812': return '22 de Julio, 2021';
      case '74545456': return '05 de Septiembre, 2022';
      case '72972988': return '12 de Noviembre, 2023';
      case '69835999': return '28 de Febrero, 2024';
      default: return '14 de Mayo, 2024';
    }
  };

  // Helper to get neighbor activity ranking & progress bar stats
  const getNeighborActivity = (richData: any) => {
    if (!richData) return { pct: 15, label: 'Poco Activo', color: 'text-red-400', barColor: '#ef4444', total: 0 };

    const total = richData.participacionesReuniones + richData.participacionesActos + (richData.participacionesSolidaridad || 0);
    const pct = Math.min(100, Math.max(5, (total / 18) * 100));

    let label = 'Poco Activo';
    let color = 'text-red-400';
    let barColor = '#ef4444';

    if (total >= 10) {
      label = 'Muy Activo en el Barrio';
      color = 'text-emerald-400';
      barColor = '#10b981';
    } else if (total >= 4) {
      label = 'Medio Activo';
      color = 'text-yellow-400';
      barColor = '#eab308';
    }

    return { pct, label, color, barColor, total };
  };

  // Helper to extract rich data for neighbors
  const getNeighborRichData = (v: any) => {
    if (!v) return null;

    const isDefault = (celular: string) => {
      switch (celular) {
        case '12345678': return { reqMinuta: true, reqCI: true, reqCroquis: true, reqCuota: true, reqDirectiva: true, cuotasPagadas: 4, multasInasistencia: 0, participacionesReuniones: 12, participacionesActos: 5, participacionesSolidaridad: 4 };
        case '72947032': return { reqMinuta: true, reqCI: true, reqCroquis: true, reqCuota: true, reqDirectiva: true, cuotasPagadas: 4, multasInasistencia: 1, participacionesReuniones: 10, participacionesActos: 4, participacionesSolidaridad: 3 };
        case '60272812': return { reqMinuta: true, reqCI: true, reqCroquis: false, reqCuota: true, reqDirectiva: true, cuotasPagadas: 3, multasInasistencia: 2, participacionesReuniones: 8, participacionesActos: 3, participacionesSolidaridad: 2 };
        case '74545456': return { reqMinuta: true, reqCI: true, reqCroquis: true, reqCuota: false, reqDirectiva: false, cuotasPagadas: 2, multasInasistencia: 4, participacionesReuniones: 5, participacionesActos: 1, participacionesSolidaridad: 1 };
        case '72972988': return { reqMinuta: false, reqCI: true, reqCroquis: false, reqCuota: true, reqDirectiva: false, cuotasPagadas: 1, multasInasistencia: 5, participacionesReuniones: 3, participacionesActos: 1, participacionesSolidaridad: 0 };
        case '69835999': return { reqMinuta: false, reqCI: false, reqCroquis: false, reqCuota: false, reqDirectiva: false, cuotasPagadas: 0, multasInasistencia: 6, participacionesReuniones: 1, participacionesActos: 0, participacionesSolidaridad: 0 };
        default: return null;
      }
    };

    const defVal = isDefault(v.celular);

    return {
      nombre: v.nombre || '',
      ci: v.ci || '',
      celular: v.celular || '',
      calle: v.calle || '',
      estado: v.estado || 'Activo',
      reqMinuta: v.reqMinuta !== undefined ? v.reqMinuta : (defVal ? defVal.reqMinuta : false),
      reqCI: v.reqCI !== undefined ? v.reqCI : (defVal ? defVal.reqCI : false),
      reqCroquis: v.reqCroquis !== undefined ? v.reqCroquis : (defVal ? defVal.reqCroquis : false),
      reqCuota: v.reqCuota !== undefined ? v.reqCuota : (defVal ? defVal.reqCuota : false),
      reqDirectiva: v.reqDirectiva !== undefined ? v.reqDirectiva : (defVal ? defVal.reqDirectiva : false),
      cuotasPagadas: v.cuotasPagadas !== undefined ? v.cuotasPagadas : (defVal ? defVal.cuotasPagadas : 0),
      cuotasTotales: 4,
      multasInasistencia: v.multasInasistencia !== undefined ? v.multasInasistencia : (defVal ? defVal.multasInasistencia : 0),
      participacionesReuniones: v.participacionesReuniones !== undefined ? v.participacionesReuniones : (defVal ? defVal.participacionesReuniones : 0),
      participacionesActos: v.participacionesActos !== undefined ? v.participacionesActos : (defVal ? defVal.participacionesActos : 0),
      participacionesSolidaridad: v.participacionesSolidaridad !== undefined ? v.participacionesSolidaridad : (defVal ? defVal.participacionesSolidaridad : 0),
    };
  };

  // Carousel timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % currentSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [currentSlides.length]);

  const handlePrevSlide = () => {
    playTone(400, 50);
    setCarouselIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
  };

  const handleNextSlide = () => {
    playTone(400, 50);
    setCarouselIndex((prev) => (prev + 1) % currentSlides.length);
  };

  return (
    <div className={`flex flex-col ${activeAfiliadoAction !== null ? 'space-y-0' : 'space-y-2.5 tall:space-y-4 sm:space-y-4'}`}>

      {/* ============ 1. CARRUSEL HERO ============ */}
      {activeAfiliadoAction !== null ? null : (
        <section className="relative rounded-t-none rounded-b-[16px] sm:rounded-b-[20px] overflow-hidden border-b border-x border-white/10 h-32 tall:h-44 sm:h-64 shrink-0 select-none bg-[#080a0f]">
          <img
            alt="Barrio El Trigal"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            src={currentSlides[carouselIndex % currentSlides.length].imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex flex-col justify-center px-4 tall:px-6 sm:px-10">
            <h2 className="text-sm tall:text-lg sm:text-2xl font-light text-white leading-tight">
              {currentSlides[carouselIndex % currentSlides.length].title}
            </h2>
            <h3 className="text-sm tall:text-lg sm:text-2xl font-bold text-[#FFD700] mb-0.5 sm:mb-1 font-sans uppercase tracking-tight">
              {currentSlides[carouselIndex % currentSlides.length].subtitle}
            </h3>
            <p className="hidden sm:block text-gray-300 max-w-xl text-[11px] leading-relaxed font-sans">
              {currentSlides[carouselIndex % currentSlides.length].description}
            </p>
          </div>

          <button
            onClick={handlePrevSlide}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/5 flex items-center justify-center text-white transition-all active:scale-90"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/5 flex items-center justify-center text-white transition-all active:scale-90"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 flex space-x-1.5">
            {currentSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => { playTone(400, 50); setCarouselIndex(index); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  (carouselIndex % currentSlides.length) === index ? 'w-3 bg-[#FFD700]' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ============ SECCIÓN AFILIADOS ============ */}
      <div className="flex flex-col space-y-3 sm:space-y-4 shrink-0">
        {activeAfiliadoAction === null && (
          <>
            {/* WELCOME HEADER */}
            <section className="flex items-center justify-between gap-4 select-none shrink-0 py-1">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/20 flex items-center justify-center shrink-0">
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm tall:text-base sm:text-base font-bold font-sans truncate">Registro de Afiliados • El Trigal</h2>
                  <p className="text-gray-400 text-[10px] sm:text-[11px] hidden sm:block">Gestione el padrón, registre nuevos vecinos o verifique requisitos de servicios básicos.</p>
                </div>
              </div>
            </section>

            {/* GRID DE 8 BOTONES (responsive: 2 cols mobile, 4 cols sm:) */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 select-none shrink-0">
              {[
                {
                  id: 1,
                  title: 'Registrar nuevo Afiliado',
                  subtitle: 'Alta de nuevo vecino',
                  imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
                },
                {
                  id: 2,
                  title: 'Buscar vecino Afiliado',
                  subtitle: 'Búsqueda en padrón',
                  imageUrl: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=400',
                },
                {
                  id: 3,
                  title: 'Estado de Afiliación',
                  subtitle: 'Consulta de vigencia',
                  imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400',
                },
                {
                  id: 4,
                  title: 'Tomar Lista de Reunión barrial',
                  subtitle: 'Asistencia y quórum',
                  imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400',
                },
                {
                  id: 5,
                  title: 'Requisitos para la afiliación',
                  subtitle: 'Documentación requerida',
                  imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
                },
                {
                  id: 6,
                  title: 'Requisitos Luz',
                  subtitle: 'Instalación eléctrica SETAR',
                  imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400',
                },
                {
                  id: 7,
                  title: 'Requisitos Agua potable',
                  subtitle: 'Trámite COSAALT',
                  imageUrl: 'https://images.unsplash.com/photo-1548839140-29a88648f135?auto=format&fit=crop&q=80&w=400',
                },
                {
                  id: 8,
                  title: 'Requisitos Gas Domiciliario',
                  subtitle: 'Instalación EMTAGAS',
                  imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400',
                },
              ].map((btn) => {
                const isSelected = activeAfiliadoAction === btn.id;
                return (
                  <div
                    key={btn.id}
                    onClick={() => { playTone(600, 80); setActiveAfiliadoAction(btn.id); }}
                    className={`group relative rounded-xl overflow-hidden border cursor-pointer h-20 sm:h-24 transition-all duration-300 hover:shadow-lg flex flex-col justify-end p-2 sm:p-3 animate-fade-in ${
                      isSelected
                        ? 'border-[#FFD700] bg-white/[0.04] shadow-[0_0_15px_rgba(255,215,0,0.15)] ring-1 ring-[#FFD700]'
                        : 'border-white/5 hover:border-[#FFD700]/30'
                    }`}
                  >
                    <img
                      alt={btn.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
                      src={btn.imageUrl}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10" />

                    <div className="relative z-10 flex flex-col h-full justify-between items-start">
                      <div className="flex justify-between w-full items-center">
                        <div className="w-5 h-5 rounded-full border border-[#FFD700] bg-transparent flex items-center justify-center text-[#FFD700] text-[10px] font-bold font-mono">
                          {btn.id}
                        </div>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-[10px] sm:text-[10.5px] leading-tight text-white group-hover:text-[#FFD700] transition-colors">{btn.title}</h4>
                        <p className="text-[8px] sm:text-[8.5px] text-gray-400 mt-0.5 leading-none">{btn.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        )}

          {/* ============ PANEL DINÁMICO DE DETALLE POR BOTÓN ============ */}
          <section className="pb-8 sm:pb-10">
            {activeAfiliadoAction !== null && (
            <div style={{ position: 'sticky', top: 0, zIndex: 20, backgroundColor: '#070707' }}>
              <div className="flex items-center justify-between border-b border-white/10 py-[12.2px] mb-[12.2px] select-none animate-fade-in">
                <button
                  onClick={() => {
                    playTone(500, 80);
                    setActiveAfiliadoAction(null);
                    setSearchFirstName('');
                    setSearchLastName('');
                    setSearchCI('');
                    setSearchPhone('');
                    setSearchPerformed(false);
                    setSearchFoundResult(null);
                  }}
                  className="flex items-center space-x-2 text-xs font-semibold text-[#FFD700] hover:text-[#ffe16d] bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors font-sans"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver Atrás</span>
                </button>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">
                  Operación {activeAfiliadoAction} activa
                </div>
              </div>

              <div className="mb-[12.2px] text-gray-300 text-xs leading-relaxed font-sans animate-fade-in select-none">
                <div className="flex items-center space-x-2 text-[#FFD700] font-bold text-xs uppercase tracking-wide mb-1">
                  <span>
                    {activeAfiliadoAction === 1 && '① Registro de Nuevos Afiliados'}
                    {activeAfiliadoAction === 2 && '② Búsqueda de Vecinos'}
                    {activeAfiliadoAction === 3 && '③ Estado de Afiliación'}
                    {activeAfiliadoAction === 4 && '④ Tomar Lista de Reunión barrial'}
                    {activeAfiliadoAction === 5 && '⑤ Requisitos para la afiliación'}
                    {activeAfiliadoAction === 6 && '⑥ Requisitos de Solicitud de Luz (SETAR Tarija)'}
                    {activeAfiliadoAction === 7 && '⑦ Requisitos Agua Potable (COSAALT Tarija)'}
                    {activeAfiliadoAction === 8 && '⑧ Requisitos Gas Domiciliario (EMTAGAS Tarija)'}
                  </span>
                </div>
                <p className={`text-gray-400 text-[11.5px] leading-relaxed max-w-4xl ${activeAfiliadoAction === 4 && hideInstruction ? 'hidden' : ''}`}>
                  {activeAfiliadoAction === 1 && 'Este botón permite registrar de forma oficial a un nuevo vecino de la urbanización El Trigal. Requiere autenticación con Google y envía los datos directamente a la base de datos central (hoja "Datos_Afiliacion").'}

                  {activeAfiliadoAction === 3 && 'Este botón permite consultar la vigencia de la afiliación de un vecino introduciendo su número de teléfono celular de 8 dígitos. Muestra de forma interactiva si el vecino está plenamente habilitado en la central de alarmas.'}

                  {activeAfiliadoAction === 4 && !hideInstruction && 'Ingrese nombres y apellidos de los vecinos de forma manual en las celdas de abajo. El sistema registrará la fecha y la hora exacta de ingreso en el mismo instante en que comience a escribir.'}
                  {activeAfiliadoAction === 5 && 'Consulte aquí los requisitos generales y documentación requerida para afiliarse formalmente a la junta de vecinos de El Trigal.'}
                  {activeAfiliadoAction === 6 && 'Guía de requisitos y trámites necesarios para la instalación del servicio de energía eléctrica ante Servicios Eléctricos de Tarija (SETAR).'}
                  {activeAfiliadoAction === 7 && 'Información de documentación indispensable para tramitar la conexión de agua potable ante la cooperativa COSAALT.'}
                  {activeAfiliadoAction === 8 && 'Requisitos y pasos obligatorios para iniciar el trámite de gas natural domiciliario ante la Empresa Tarijeña del Gas (EMTAGAS).'}
                </p>


              </div>
            </div>
          )}

          {/* ====================================================== */}
          {/* === ACCIÓN 1: Registrar nuevo Afiliado ============== */}
          {/* === LÓGICA REAL DE GOOGLE + FORMULARIO REAL ========= */}
          {/* Reubicada dentro de activeAfiliadoAction === 1,       */}
          {/* SIN duplicar ni reescribir su lógica (sección 4.1).   */}
          {/* ====================================================== */}
          {activeAfiliadoAction === 1 && (
            <>
              {/* --- Pantalla de LOGIN con Google (si no hay token) --- */}
              {!tokenUsuario && (
                <div className="flex flex-col items-center justify-center space-y-6 py-6 sm:py-12 px-4 animate-fade-in">
                  <div className="bg-white/[0.02] rounded-2xl border border-white/10 p-6 sm:p-8 text-center max-w-md w-full shadow-2xl space-y-6">
                    <div className="mx-auto bg-blue-500/10 text-blue-400 p-4 rounded-full border-2 border-blue-500/30 w-16 h-16 flex items-center justify-center">
                      <User className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">Formulario de Afiliación</h2>
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
              )}

              {/* --- Credencial digital final (tras registro exitoso) --- */}
              {tokenUsuario && lastRegistered && (
                <div className="bg-[#0c101d] rounded-2xl border border-white/10 p-6 text-center space-y-6 flex flex-col items-center animate-fade-in">
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
                  <div className="bg-black/80 rounded-2xl border border-[#FFD700]/30 p-5 w-full text-left font-sans max-w-sm relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD700]/5 rounded-bl-full pointer-events-none" />

                    <div className="flex justify-between items-center pb-3 border-b border-gray-800/60 mb-4">
                      <div>
                        <h4 className="text-[#FFD700] text-xs font-black tracking-widest uppercase">CREDENCIAL DE AFILIADO</h4>
                        <p className="text-gray-500 text-[9px] font-mono">ASOCIACIÓN VECINAL EL TRIGAL</p>
                      </div>
                      <div className="bg-[#0c101d] p-1.5 rounded-lg border border-gray-800 shrink-0">
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

                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <button
                      onClick={() => setLastRegistered(null)}
                      className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-bold text-xs cursor-pointer hover:text-white transition"
                    >
                      Registrar Otro Afiliado
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-black text-gray-400 border border-gray-800 hover:border-gray-600 py-3 rounded-xl font-bold text-xs cursor-pointer hover:text-white transition flex items-center justify-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}

              {/* --- FORMULARIO REAL (si hay token y no hay registro reciente) --- */}
              {tokenUsuario && !lastRegistered && (
                <div className="flex flex-col gap-[12.2px] animate-fade-in">
                  {/* Barra de sesión activa */}
                  <div className="flex justify-between items-center bg-white/[0.02] rounded-xl border border-white/10 px-4 py-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="bg-blue-500/10 p-2 rounded-full border border-blue-500/20 shrink-0">
                        <User className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Sesión activa</p>
                        <p className="text-white text-sm font-bold truncate max-w-[150px] sm:max-w-xs">{userProfile?.name}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 p-2 rounded-lg transition-colors flex items-center space-x-2 shrink-0"
                      title="Cerrar Sesión"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-xs font-bold hidden sm:block">Salir</span>
                    </button>
                  </div>

                  <div>
                    <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">Registro de Afiliados</h2>
                    <p className="text-gray-400 text-xs mt-1">
                      Complete el formulario oficial. La información se enviará directamente a la base de datos central.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-[7.2px]">
                    {/* 1. DATOS PERSONALES */}
                    <div className="bg-white/[0.02] rounded-xl border border-white/10 pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px]">
                      <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
                        <User className="h-4 w-4 text-brand-green" />
                        <span>DATOS PERSONALES</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[7.2px]">
                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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
                    <div className="bg-white/[0.02] rounded-xl border border-white/10 pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px]">
                      <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
                        <Smartphone className="h-4 w-4 text-brand-green" />
                        <span>CONTACTO Y AFILIACIÓN</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[7.2px]">
                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px] md:col-span-2">
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
                    <div className="bg-white/[0.02] rounded-xl border border-white/10 pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px]">
                      <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
                        <MapPin className="h-4 w-4 text-brand-green" />
                        <span>UBICACIÓN Y VIVIENDA</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[7.2px]">
                        <div className="flex flex-col gap-[7.2px] md:col-span-2">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px] md:col-span-2">
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
                    <div className="bg-white/[0.02] rounded-xl border border-white/10 pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px]">
                      <h3 className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center space-x-2 pb-2.5 border-b border-gray-900">
                        <Users className="h-4 w-4 text-brand-green" />
                        <span>PARTICIPACIÓN COMUNITARIA</span>
                      </h3>

                      <div className="flex flex-col gap-[7.2px] text-xs select-none">
                        <div className="flex justify-between items-center bg-black/30 p-3 rounded-xl border border-gray-900">
                          <div className="flex flex-col gap-[7.2px]">
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
                          <div className="flex flex-col gap-[7.2px]">
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

                        <div className="flex flex-col gap-[7.2px]">
                          <p className="text-gray-400 font-semibold">Interés en Comisión de Seguridad *</p>
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
              )}
            </>
          )}

          {/* ====================================================== */}
          {/* === ACCIÓN 2: Buscar vecino Afiliado (MOCK) ========= */}
          {/* ====================================================== */}
          {activeAfiliadoAction === 2 && (
            <div className="space-y-[12.2px]">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[24px] pt-[12.2px] pb-[60px] px-[7.2px] flex flex-col gap-[7.2px] animate-fade-in shadow-xl">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono leading-none">NOMBRE</label>
                <input
                  type="text"
                  placeholder="Ej. Daniel"
                  className="w-full bg-black/40 border border-white/10 focus:border-[#FFD700] rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all placeholder-gray-600 font-sans"
                />
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono leading-none">APELLIDO</label>
                <input
                  type="text"
                  placeholder="Ej. Mendez"
                  className="w-full bg-black/40 border border-white/10 focus:border-[#FFD700] rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all placeholder-gray-600 font-sans"
                />
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono leading-none">DOCUMENTO DE IDENTIDAD C.I.</label>
                <input
                  type="text"
                  placeholder="Ej. 12345678"
                  className="w-full bg-black/40 border border-white/10 focus:border-[#FFD700] rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all placeholder-gray-600 font-mono"
                />
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono leading-none">CELULAR (OPCIONAL)</label>
                <input
                  type="text"
                  placeholder="Ej. 12345678"
                  className="w-full bg-black/40 border border-white/10 focus:border-[#FFD700] rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all placeholder-gray-600 font-mono"
                />
              </div>
              <p className="text-gray-400 text-[11.5px] leading-relaxed max-w-4xl">
                Este botón exige ingresar de forma obligatoria el Nombre, Apellido y la Cédula de Identidad (C.I.) del vecino, con la opción de ingresar el Celular, para realizar una consulta segura en el padrón. [DATOS DE EJEMPLO PARA PROBAR EL SISTEMA: Nombre: Daniel, Apellido: Mendez, C.I.: 12345678, Celular (opcional): 12345678]
              </p>
            </div>
          )}

          {/* ====================================================== */}
          {/* === ACCIÓN 3: Estado de Afiliación (MOCK) =========== */}
          {/* ====================================================== */}
          {activeAfiliadoAction === 3 && (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[24px] pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px] animate-fade-in shadow-xl">
              <p className="text-xs text-gray-300 leading-relaxed">
                Ingrese su número celular de 8 dígitos para corroborar si está registrado en el padrón del barrio y habilitado para activar/desactivar la sirena disuasiva de Tarija.
              </p>
              <div className="flex flex-col sm:flex-row gap-[7.2px]">
                  <input
                    type="text"
                    maxLength={8}
                    placeholder="Ej. 12345678"
                    value={statusCheckPhone}
                    onChange={(e) => setStatusCheckPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#FFD700] focus:outline-none transition-all placeholder-gray-600 font-mono text-center tracking-widest text-base"
                  />
                  <button
                    onClick={() => {
                      if (statusCheckPhone.length !== 8) {
                        playTone(220, 200);
                        onShowNotification('⚠️ Error', 'Por favor introduzca un número de celular de exactamente 8 dígitos.');
                        return;
                      }
                      const found = vecinos.find((v: Vecino) => v.celular === statusCheckPhone);
                      if (found) {
                        playTone(880, 250);
                        setStatusCheckResult({
                          found: true,
                          name: found.nombre,
                          phone: found.celular,
                          ci: found.ci,
                          address: found.calle
                        });
                      } else {
                        playTone(220, 400);
                        setStatusCheckResult({
                          found: false
                        });
                      }
                    }}
                    className="bg-[#FFD700] hover:bg-[#ffe16d] text-black font-bold px-5 py-2 rounded-lg text-xs flex items-center justify-center transition-all active:scale-95 shadow-md shadow-[#FFD700]/10 font-sans cursor-pointer"
                  >
                    Verificar Estado
                  </button>
                </div>

                {statusCheckResult && (
                  <div className="animate-fade-in">
                    {statusCheckResult.found ? (
                      // DASHBOARD PREMIUM DE AFILIACIÓN CON FRAMER MOTION
                      (() => {
                        const containerVariants = {
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                          }
                        };
                        const itemVariants = {
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1, y: 0,
                            transition: { type: "spring", stiffness: 300, damping: 24 }
                          }
                        };

                        const isFullPaid = statusCheckResult.phone?.endsWith('0') || statusCheckResult.phone?.endsWith('5');
                        const cuotas = isFullPaid ? [
                          { mes: "Febrero", fecha: "15/02/2024", monto: "Bs. 500", detalle: "Pago Único Completo" }
                        ] : [
                          { mes: "Enero", fecha: "10/01/2024", monto: "Bs. 100", detalle: "Cuota 1/5" },
                          { mes: "Febrero", fecha: "12/02/2024", monto: "Bs. 100", detalle: "Cuota 2/5" },
                          { mes: "Marzo", fecha: "15/03/2024", monto: "Bs. 100", detalle: "Cuota 3/5" }
                        ];

                        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        const asistencias = meses.map((mes, i) => {
                          const total = (i % 3 === 0) ? 4 : (i % 2 === 0 ? 2 : 3);
                          const asiste = Math.max(0, total - (i % 2));
                          return { mes, total, asiste, faltas: total - asiste };
                        });

                        const aportes = [
                          { mes: "Marzo", semana: "Semana 2", monto: "Bs. 20", mesesAportando: 1 },
                          { mes: "Mayo", semana: "Semana 1", monto: "Bs. 15", mesesAportando: 2 },
                          { mes: "Agosto", semana: "Semana 4", monto: "Bs. 25", mesesAportando: 3 }
                        ];

                        return (
                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-[#0b101c] rounded-2xl sm:rounded-[32px] p-5 sm:p-8 flex flex-col gap-6 sm:gap-8 shadow-2xl border border-white/[0.03] mt-6"
                          >
                            {/* HEADER BENTO */}
                            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
                              <div className="flex gap-4 sm:gap-6 items-center">
                                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                                </div>
                                <div className="space-y-1 min-w-0">
                                  <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight truncate">{statusCheckResult.name}</h3>
                                  <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                                      Afiliado Activo
                                    </span>
                                    <span className="text-gray-400 text-xs font-mono">C.I. {statusCheckResult.ci}</span>
                                    <span className="text-[#FFD700] text-xs font-mono font-bold">📱 {statusCheckResult.phone}</span>
                                  </div>
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  playTone(500, 80);
                                  setStatusCheckPhone('');
                                  setStatusCheckResult(null);
                                }}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl px-5 py-3 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                Nueva Consulta
                              </motion.button>
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* CUOTAS DE AFILIACIÓN */}
                              <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col group hover:bg-white/[0.04] transition-colors">
                                <div className="flex justify-between items-center mb-6">
                                  <h4 className="text-gray-400 text-xs font-mono uppercase tracking-wider font-bold">Cuotas de Afiliación</h4>
                                  <Coins className="w-5 h-5 text-[#FFD700]" />
                                </div>

                                {isFullPaid ? (
                                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 bg-emerald-500/5 rounded-2xl p-6 border border-emerald-500/10">
                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                      <h5 className="text-emerald-400 font-bold text-lg">Afiliación Cancelada</h5>
                                      <p className="text-gray-400 text-xs mt-1">El vecino canceló su cuota de afiliación en un solo pago.</p>
                                    </div>
                                    <div className="inline-flex mt-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                                      <span className="text-[10px] font-mono text-gray-300">Fecha de pago: <span className="text-white font-bold">{cuotas[0].fecha}</span></span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-3 flex-1">
                                    {cuotas.map((c, idx) => (
                                      <div key={idx} className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                            <span className="text-blue-400 font-bold text-xs">{idx + 1}</span>
                                          </div>
                                          <div>
                                            <div className="text-white text-xs font-bold">{c.detalle}</div>
                                            <div className="text-[10px] font-mono text-gray-500">{c.mes} • {c.fecha}</div>
                                          </div>
                                        </div>
                                        <span className="text-emerald-400 font-mono font-bold text-sm">{c.monto}</span>
                                      </div>
                                    ))}
                                    <div className="text-center pt-2">
                                      <span className="text-[10px] text-yellow-500/80 font-mono font-bold uppercase tracking-wider">Saldo Pendiente: 2 Cuotas</span>
                                    </div>
                                  </div>
                                )}
                              </motion.div>

                              {/* APORTES MESA DIRECTIVA */}
                              <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col group hover:bg-white/[0.04] transition-colors">
                                <div className="flex justify-between items-center mb-6">
                                  <h4 className="text-gray-400 text-xs font-mono uppercase tracking-wider font-bold">Aportes Presidencia</h4>
                                  <Shield className="w-5 h-5 text-blue-400" />
                                </div>
                                <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
                                  Aportes realizados en reuniones específicas para apoyar la movilización y gestión de la mesa directiva.
                                </p>
                                <div className="space-y-3 flex-1">
                                  {aportes.map((a, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                                      <div>
                                        <div className="text-white text-xs font-bold">{a.mes}</div>
                                        <div className="text-[10px] font-mono text-gray-500">{a.semana} • Meses apoyando: {a.mesesAportando}</div>
                                      </div>
                                      <span className="text-[#FFD700] font-mono font-bold text-sm">{a.monto}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            </div>

                            {/* ASISTENCIAS POR MES - CHART COMPLETO */}
                            <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                              <div className="flex justify-between items-center mb-8 z-10">
                                <h4 className="text-gray-400 text-xs font-mono uppercase tracking-wider font-bold">Control de Asistencia a Reuniones</h4>
                                <div className="flex gap-4">
                                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div><span className="text-[10px] text-gray-400 font-mono">Asistencias</span></div>
                                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400"></div><span className="text-[10px] text-gray-400 font-mono">Faltas</span></div>
                                </div>
                              </div>

                              <div className="w-full flex-1 flex items-end justify-between gap-1 sm:gap-2 z-10 h-40">
                                {asistencias.map((data, idx) => {
                                  const asisteHeight = (data.asiste / 4) * 100;
                                  const faltasHeight = (data.faltas / 4) * 100;

                                  return (
                                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group/bar">
                                      <div className="w-full h-full relative flex flex-col justify-end bg-black/20 rounded-lg overflow-hidden">

                                        {data.faltas > 0 && (
                                          <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${faltasHeight}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (idx * 0.05) }}
                                            className="w-full bg-red-500/50 hover:bg-red-400 transition-colors relative"
                                          >
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold text-white">
                                              {data.faltas}
                                            </div>
                                          </motion.div>
                                        )}

                                        {data.asiste > 0 && (
                                          <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${asisteHeight}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (idx * 0.05) }}
                                            className="w-full bg-emerald-500/50 hover:bg-emerald-400 transition-colors relative"
                                          >
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold text-white">
                                              {data.asiste}
                                            </div>
                                          </motion.div>
                                        )}

                                      </div>
                                      <div className="text-center">
                                        <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider block">
                                          {data.mes}
                                        </span>
                                        <span className="text-[8px] text-gray-600 block mt-0.5">{data.total} reun.</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>

                          </motion.div>
                        );
                      })()
                    ) : (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 space-y-3 shadow-lg shadow-red-500/5">
                        <div className="flex items-start space-x-3">
                          <span className="text-red-400 text-xl shrink-0 mt-0.5 animate-pulse">⚠️</span>
                          <div className="space-y-1 text-xs">
                            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">❌ NÚMERO NO REGISTRADO</h4>
                            <p className="text-gray-300">
                              El número de celular <span className="font-mono text-red-400 font-bold">{statusCheckPhone}</span> no se encuentra en el padrón del barrio El Trigal.
                            </p>
                            <p className="text-red-300/95 leading-relaxed pt-1">
                              vecino si desea desactivar la alarma vecinal o afiliarse, contacte a los coordinadores autorizados del barrio para dar de alta su número en la base de datos de la Alarma Vecinal:
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-300 bg-black/30 p-2.5 rounded-xl border border-white/5">
                          <div>• Armando Tolaba: <span className="text-[#FFD700]">72947032</span></div>
                          <div>• Roxana Vaca: <span className="text-[#FFD700]">60272812</span></div>
                          <div>• Julio Mendoza: <span className="text-[#FFD700]">74545456</span></div>
                          <div>• Silvia Delgado: <span className="text-[#FFD700]">72972988</span></div>
                          <div className="col-span-2 text-center pt-1.5 text-gray-400 border-t border-white/5 mt-1">• Fernando Cabrera: <span className="text-[#FFD700]">69835999</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}

          {/* ====================================================== */}
          {/* === ACCIÓN 4: Tomar Lista de Reunión barrial (MOCK) == */}
          {/* ====================================================== */}
          {activeAfiliadoAction === 4 && (
            <>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[24px] pb-[12.2px] px-0 flex flex-col animate-fade-in shadow-xl">
              <div className={`overflow-auto border border-white/5 rounded-xl bg-black/20 custom-scrollbar ${
                isKeyboardOpen
                  ? 'max-h-[calc(100vh-180px)] min-h-[120px]'
                  : 'max-h-[calc(100vh-320px)]'
              }`}>
                <table className="w-full text-left text-xs min-w-[520px]">
                  <thead>
                    <tr className="bg-[#070707] text-gray-400 font-mono text-[9px] uppercase border-b border-white/5 sticky top-0 z-10">
                      <th className="px-1 py-2 w-8 text-center">Nro</th>
                      <th className="px-1 py-2">Nombres y Apellidos</th>
                      <th className="px-0.5 py-2 text-center">Acción</th>
                      <th className="px-1 py-2">Fecha de Ingreso</th>
                      <th className="px-1 py-2">Hora de Ingreso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {manualAttendanceList.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-1 py-2 text-center font-mono text-gray-500 text-[11px]">
                          {row.num}
                        </td>
                        <td className="px-0" colSpan={editingRowId === row.id ? 2 : undefined}>
                          <input
                            type="text"
                            placeholder="Escriba nombres y apellidos del vecino..."
                            value={row.nombre}
                            onChange={(e) => {
                              const val = e.target.value;
                              setManualAttendanceList(prev => prev.map(item => {
                                if (item.id === row.id) {
                                  const now = new Date();
                                  const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                                  const dateStr = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
                                  return {
                                    ...item,
                                    nombre: val,
                                    fecha: item.fecha || dateStr,
                                    hora: item.hora || timeStr
                                  };
                                }
                                return item;
                              }));
                            }}
                            onFocus={(e) => {
                              setHideInstruction(true);
                              setEditingRowId(row.id);
                              setIsKeyboardOpen(true);
                              const container = e.currentTarget.closest('.overflow-auto');
                              if (container) container.scrollTo({ left: 0, behavior: 'smooth' });
                            }}
                            onBlur={() => { setEditingRowId(null); setIsKeyboardOpen(false); }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const inputs = e.currentTarget.closest('tbody')?.querySelectorAll('input[type="text"]');
                                if (!inputs) return;
                                const currentIdx = Array.from(inputs).indexOf(e.currentTarget);
                                const nextInput = inputs[currentIdx + 1];
                                if (nextInput) {
                                  nextInput.focus();
                                  nextInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }
                            }}
                            className="w-full bg-black/30 border border-white/5 hover:border-white/10 focus:border-[#FFD700] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none transition-all placeholder-gray-700 font-sans font-medium"
                          />
                        </td>
                        {!(editingRowId === row.id) && (
                        <td className="pr-1 py-2 text-center">
                          <div className="flex items-center justify-center gap-0">
                            <button
                              onClick={() => {
                                playTone(400, 80);
                                setEditRowData({ ...row });
                                setIsKeyboardOpen(true);
                              }}
                              className="p-1 rounded-lg transition-colors cursor-pointer text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              title="Editar datos"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                playTone(300, 80);
                                setDeleteRowData(row);
                                setIsKeyboardOpen(true);
                              }}
                              className="p-1 rounded-lg transition-colors cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              title="Eliminar fila"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        )}
                        <td className="px-1 py-2 font-mono text-gray-400 text-xs">
                          {row.nombre ? (
                            <span className="bg-white/5 px-2.5 py-1 rounded border border-white/5 text-gray-300 font-semibold">
                              {row.fecha}
                            </span>
                          ) : (
                            <span className="text-gray-600 italic">Automática</span>
                          )}
                        </td>
                        <td className="px-1 py-2 font-mono text-gray-400 text-xs">
                          {row.nombre ? (
                            <span className="bg-white/5 px-2.5 py-1 rounded border border-white/5 text-gray-300 font-semibold">
                              {row.hora}
                            </span>
                          ) : (
                            <span className="text-gray-600 italic">Automática</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

              {/* Fixed bottom bar */}
              <div className={`fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border-t border-[#FFD700]/20 px-4 pt-[7.2px] pb-[77px] md:pb-[7.2px] transition-transform duration-200 ${isKeyboardOpen ? 'translate-y-full' : 'translate-y-0'}`} style={navHeight ? { paddingBottom: `calc(${navHeight}px + env(safe-area-inset-bottom, 0px))` } : {}}>
                <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      playTone(500, 80);
                      setBatchModalCount('');
                      setShowBatchModal(true);
                    }}
                    className="inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40 hover:bg-[#FFD700]/20 transition"
                  >
                    Crear Filas
                  </button>
                  <button
                    onClick={() => {
                      playTone(700, 80);
                      setManualAttendanceList(prev => [
                        ...prev,
                        { id: String(Date.now()), num: getNextRowNum(prev), nombre: '', fecha: '', hora: '' }
                      ]);
                    }}
                    className="inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Fila</span>
                  </button>
                  <button
                    onClick={() => {
                      playTone(500, 80);
                      if (addedRowsHidden) {
                        setManualAttendanceList(fullListRef.current || []);
                        fullListRef.current = null;
                        setAddedRowsHidden(false);
                      } else {
                        fullListRef.current = manualAttendanceList;
                        setManualAttendanceList(prev => prev.filter(row => !row.nombre.trim()));
                        setAddedRowsHidden(true);
                      }
                    }}
                    className={`inline-flex items-center space-x-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition ${
                      addedRowsHidden
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/40 hover:bg-blue-500/20'
                    }`}
                  >
                    {addedRowsHidden ? 'Ver Añadidos' : 'Ocultar Añadidos'}
                  </button>
                </div>
              </div>

              {/* Modal para crear filas */}
              {showBatchModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="bg-[#121212] border border-[#FFD700]/20 rounded-2xl p-6 w-[280px] shadow-2xl animate-fade-in flex flex-col gap-4">
                    <h3 className="text-white text-sm font-bold text-center">¿Cuántas filas crear?</h3>
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={batchModalCount}
                      onChange={(e) => setBatchModalCount(e.target.value.replace(/\D/g, ''))}
                      placeholder="Ej. 10"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-center font-mono focus:outline-none focus:border-[#FFD700] placeholder-gray-600"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          playTone(400, 80);
                          setShowBatchModal(false);
                        }}
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          const count = parseInt(batchModalCount, 10);
                          if (!count || count < 1) {
                            onShowNotification('⚠️ Cantidad inválida', 'Ingrese un número válido de filas a crear.');
                            return;
                          }
                          playTone(700, 80);
                          setManualAttendanceList(prev => {
                            let nextNum = getNextRowNum(prev);
                            const newRows = Array.from({ length: count }, () => ({
                              id: String(Date.now() + nextNum),
                              num: nextNum++,
                              nombre: '',
                              fecha: '',
                              hora: ''
                            }));
                            return [...prev, ...newRows];
                          });
                          setShowBatchModal(false);
                        }}
                        className="flex-1 bg-[#FFD700] hover:bg-[#ffe16d] text-black font-bold rounded-xl py-2.5 text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        Crear
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {deleteRowData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="bg-[#121212] border border-red-500/20 rounded-2xl p-6 w-[340px] shadow-2xl animate-fade-in flex flex-col gap-4">
                    <h3 className="text-white text-sm font-bold text-center">¿Eliminar esta fila?</h3>
                    <div className="bg-black/40 rounded-xl p-3 flex flex-col gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono w-24 shrink-0">Nro</span>
                        <span className="text-white font-semibold">{deleteRowData.num}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono w-24 shrink-0">Nombres y Apellidos</span>
                        <span className="text-white">{deleteRowData.nombre || <span className="text-gray-600 italic">Vacío</span>}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono w-24 shrink-0">Fecha de Ingreso</span>
                        <span className="text-white">{deleteRowData.fecha || <span className="text-gray-600 italic">Automática</span>}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono w-24 shrink-0">Hora de Ingreso</span>
                        <span className="text-white">{deleteRowData.hora || <span className="text-gray-600 italic">Automática</span>}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          playTone(400, 80);
                          setDeleteRowData(null);
                          setIsKeyboardOpen(false);
                        }}
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          playTone(300, 80);
                          if (manualAttendanceList.length <= 1) {
                            setManualAttendanceList([{ id: String(Date.now()), num: 1, nombre: '', fecha: '', hora: '' }]);
                          } else {
                            setManualAttendanceList(prev => prev.filter(item => item.id !== deleteRowData.id));
                          }
                          setDeleteRowData(null);
                          setIsKeyboardOpen(false);
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {editRowData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="bg-[#121212] border border-blue-500/20 rounded-2xl p-6 w-[400px] shadow-2xl animate-fade-in flex flex-col gap-4">
                    <h3 className="text-white text-sm font-bold text-center">Editar datos</h3>
                    <div className="bg-black/40 rounded-xl p-3 flex flex-col gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono w-20 shrink-0">Nro</span>
                        <span className="text-white font-semibold">{editRowData.num}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500 font-mono">Nombres y Apellidos</span>
                        <input
                          type="text"
                          value={editRowData.nombre}
                          onChange={(e) => setEditRowData(prev => ({ ...prev, nombre: e.target.value }))}
                          onFocus={() => setIsKeyboardOpen(true)}
                          onBlur={() => setIsKeyboardOpen(false)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-gray-700 font-sans"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono w-20 shrink-0">Fecha</span>
                        <span className="text-white font-mono text-xs bg-black/60 px-3 py-2 rounded-lg flex-1">{editRowData.fecha || <span className="text-gray-600 italic">Automática</span>}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono w-20 shrink-0">Hora</span>
                        <span className="text-white font-mono text-xs bg-black/60 px-3 py-2 rounded-lg flex-1">{editRowData.hora || <span className="text-gray-600 italic">Automática</span>}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          playTone(400, 80);
                          setEditRowData(null);
                          setIsKeyboardOpen(false);
                        }}
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          playTone(700, 80);
                          setManualAttendanceList(prev => prev.map(item => item.id === editRowData.id ? { ...editRowData } : item));
                          setEditRowData(null);
                          setIsKeyboardOpen(false);
                        }}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2.5 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ====================================================== */}
          {/* === ACCIÓN 5: Requisitos para la afiliación ========== */}
          {/* ====================================================== */}
          {activeAfiliadoAction === 5 && (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[24px] pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px] animate-fade-in shadow-xl">
              <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#FFD700]" />
                Requisitos para Afiliación a la Junta de Vecinos
              </h3>
              <ul className="flex flex-col gap-[7.2px] text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Fotocopia de Cédula de Identidad del propietario.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Fotocopia de los documentos de propiedad (Minuta, Testimonio o Folio Real).</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Croquis de ubicación del lote o vivienda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Pago de la cuota de afiliación (Bs. 500).</span>
                </li>
              </ul>
            </div>
          )}

          {/* ====================================================== */}
          {/* === ACCIÓN 6: Requisitos Luz (SETAR) ================= */}
          {/* ====================================================== */}
          {activeAfiliadoAction === 6 && (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[24px] pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px] animate-fade-in shadow-xl">
              <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFD700]" />
                Requisitos Solicitud de Luz (SETAR)
              </h3>
              <ul className="flex flex-col gap-[7.2px] text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Fotocopia de Cédula de Identidad del titular.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Certificado de afiliación emitido por la Junta Vecinal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Fotocopia de Título de Propiedad o Folio Real.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Aviso de cobranza de un vecino colindante o más cercano.</span>
                </li>
              </ul>
            </div>
          )}

          {/* ====================================================== */}
          {/* === ACCIÓN 7: Requisitos Agua Potable (COSAALT) ====== */}
          {/* ====================================================== */}
          {activeAfiliadoAction === 7 && (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[24px] pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px] animate-fade-in shadow-xl">
              <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <Droplet className="w-5 h-5 text-[#FFD700]" />
                Requisitos Agua Potable (COSAALT)
              </h3>
              <ul className="flex flex-col gap-[7.2px] text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Fotocopia de Cédula de Identidad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Fotocopia de documento de propiedad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Certificado de no adeudo al sindicato/junta.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Aprobación de la Junta Vecinal.</span>
                </li>
              </ul>
            </div>
          )}

          {/* ====================================================== */}
          {/* === ACCIÓN 8: Requisitos Gas Domiciliario (EMTAGAS) == */}
          {/* ====================================================== */}
          {activeAfiliadoAction === 8 && (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[24px] pt-[12.2px] pb-[12.2px] px-[7.2px] flex flex-col gap-[7.2px] animate-fade-in shadow-xl">
              <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#FFD700]" />
                Requisitos Gas Domiciliario (EMTAGAS)
              </h3>
              <ul className="flex flex-col gap-[7.2px] text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Fotocopia de C.I. vigente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Fotocopia de Folio Real y testimonio de propiedad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Factura de Luz o Agua del inmueble.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 shrink-0" />
                  <span>Plano aprobado de la vivienda.</span>
                </li>
              </ul>
            </div>
          )}
        </section>
      </div>

    </div>
  );
}
