import {
  CarouselSlide,
  QuickAccessItem,
  Notice,
  EmergencyContact,
  AlarmLog,
  Vecino,
} from './types.alarma';

// ============================================================
// DATOS DE PRUEBA (MOCK) DE LA SECCIÓN "CENTRAL ALARMA VECINAL"
// ------------------------------------------------------------
// Datos de prueba locales, SIN conexión a Google Sheets (decisión
// 4.2 del prompt). No tocan `src/data.ts` ni `useSheetData()` del
// CMS. Renombrados Mock* según sección 2.2.1.
// ============================================================

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    title: 'Juntos cuidamos',
    subtitle: 'lo que más importa',
    description: 'Un barrio unido es un barrio más seguro. Con participación y alerta, prevenimos y actuamos a tiempo.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt3YKuldu13r7oTR4w5mijbRIcP3NuUTXFcn40TMkUzGCKGtiKYoc0_bqNId9o0Ym3zMCVS5uKMfcQ4qO8l9xzO0jwI0uxnaz7Mp40QiS93dpDrWJTU86SflgDj6TyprfgjX3-rwlTCG0jo6m3l-YEnmfmNINtoUqKCeRD0Y9ObMPSXjr58Ds4EljiawOvCB80wekK8fhWAG4F1eDjgfg_mM7UFVp0hAZl2wJMlyYltjfJ0uSlckggKwZN124pStNpwbYGEtXXtMQd',
  },
  {
    id: 2,
    title: 'Botón de Alarma',
    subtitle: 'Úsalo con responsabilidad',
    description: 'Al activarse, emite un sonido disuasivo de alta potencia y notifica en tiempo real a toda la comunidad y serenazgo.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4XugJ9BIYQQZSg5uxfx5pzjvcDkgddseLUGZn3B9ZCi-tE8P8xDMB209MVF_syGebJdC7ga453TGJAhLFOD2G0vKv8CGEPGD8qQDLI34h4MMGJV6EWbT9OgO2r989XTOIxMD4ytoaKnjAL2F2WyXjq08PvMDHyFFkdwbDm-4ICI8sCqDIzlDXT_GAiGUiCSaI72mNtde2EmKOo33RBNN9QmUjOcgNs2bXa-muBjFKcWkeXjMn5K89SpwuHy6eMDQ586AKn5i0p9XS',
  },
  {
    // v0.2.24k: líneas intercambiadas solo en este slide (pedido del dueño):
    // arriba-blanco "Siempre a la mano", abajo-amarillo "Números de emergencia"
    // ("emergencia" en minúscula; el overlay lo normaliza a tipo oración).
    // Los slides 1 y 2 no se tocan. Afecta también al caption de desktop.
    id: 3,
    title: 'Siempre a la mano',
    subtitle: 'Números de Emergencia',
    description: 'Comunícate directamente con la Policía, Serenazgo o Bomberos de Tarija a través de nuestro botón directo de llamadas.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLLi0wMnjixDes2z-aGzTDRo5Y_zlUtP8Tv96OYHOpDW16MxU4Xmd6SePoNM9wjAf34ZOWrtd0I2rw_IR8lD9xx6zdBCuwoGccYhexSkqhEWHWPXosYZnyKZNbh-kpJcGrDKmH_xTr20jIwah0onFlDA2SpWk2_FvDRf2F5AWl3G4lH2XDLiQM0n8pR536Aov7vGjas0c4LkMhro3yEpkLxHzfN4oge031Hp0JG9EchWM4otYgCoM4mM7yYQ3BlljhUhxMc9GopdIZ',
  },
];

// ─── CMS_PENDING (mock permanente Alarma — NUNCA conectar al CMS) ───────────────
// Accesos rápidos con iconos SVG locales (public/iconos_accesos_rapidos/).
// Eventos/Mascotas/Negocios: de la carpeta local "Iconos cortados/" (NO
// versionada). Cada archivo trae la tira completa del diseño; su viewBox
// original ya encuadra 1 icono. Saneado al copiar: fill #000000 → #FFD700
// (los <img> NO heredan currentColor de la página, por eso va hardcodeado).
// Farmacias: geometría exacta del componente IconFarmacias del dueño
// (cápsula rotada -40° + línea media + cruz), convertida 1:1 de
// react-native-svg a SVG web. viewBox 0 0 78 78 (la cápsula rotada con
// esquinas rx=10 sobresale del 64 original). stroke-width 3 para igualar
// el grosor visual de los otros 3 iconos a 28px de alto.
// ─────────────────────────────────────────────────────────────────────────────
export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: 'eventos',
    title: 'Eventos',
    subtitle: 'Actividades y reuniones',
    imageUrl: `${import.meta.env.BASE_URL}iconos_accesos_rapidos/eventos.svg`,
  },
  {
    id: 'farmacias',
    title: 'Farmacias',
    subtitle: 'Farmacias abiertas hoy',
    imageUrl: `${import.meta.env.BASE_URL}iconos_accesos_rapidos/farmacias.svg`,
  },
  {
    id: 'mascotas',
    title: 'Mascotas',
    subtitle: 'Encuentra tu mascota',
    imageUrl: `${import.meta.env.BASE_URL}iconos_accesos_rapidos/mascotas.svg`,
  },
  {
    id: 'negocios',
    title: 'Negocios',
    subtitle: 'Guía comercial local',
    imageUrl: `${import.meta.env.BASE_URL}iconos_accesos_rapidos/negocios.svg`,
  },
];

// ═══════════════════════════════════════════════════════════════════════
//  CONTACTOS DE EMERGENCIA — DATOS DE EJEMPLO (MUESTRA)
// ═══════════════════════════════════════════════════════════════════════
//  ⚠  IMPORTANTE: Estos números son SOLO DATOS DE EJEMPLO (mock).
//     NO son los números reales de emergencia. Son placeholders
//     para mostrar la funcionalidad de la Central de Llamadas.
//
//  🔮  INTEGRACIÓN FUTURA CON GOOGLE SHEETS (FASE BACKEND):
//     Toda esta información se editará, agregará o eliminará
//     directamente desde la hoja "Contactos_Emergencia" en
//     Google Sheets, sin necesidad de modificar el código fuente.
//
//     Lo que se podrá controlar desde Sheets:
//       - name       → nombre del contacto
//       - number     → número telefónico
//       - category   → determina color del icono
//       - icon       → qué icono de lucide-react mostrar
//       - label      → texto junto al número (opcional)
//
//     También se podrán agregar o quitar filas para mostrar
//     más o menos tarjetas de contacto en la modal.
//
//     Proceso técnico:
//       1. Code.gs lee la hoja "Contactos_Emergencia" en Sheets
//       2. sheetToObjects() convierte filas a objetos JSON
//       3. exportDataToGitHub() publica el JSON en GitHub Pages
//       4. Frontend usa: json.emergencyContacts ?? EMERGENCY_CONTACTS
//
//  📌  MIENTRAS TANTO: Los datos siguientes son estáticos y sirven
//     únicamente para desarrollo y pruebas visuales. El programador
//     debe crear la hoja "Contactos_Emergencia" en Google Sheets
//     con las columnas: id, name, number, category, icon, label
//     y añadirla al array HOJAS_PARA_LA_WEB (hojas que se publican en la web) en Code.gs.
// ═══════════════════════════════════════════════════════════════════════
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    name: 'Activar alarma llamando',
    number: '72944411',
    category: 'serenazgo',
    icon: 'Phone',
    label: 'Número directo:',
  },
  {
    id: '2',
    name: 'Policía Nacional (EPIC)',
    number: '110',
    category: 'policia',
    icon: 'Shield',
    label: 'Número directo:',
  },
  {
    id: '3',
    name: 'Tránsito Emergencias',
    number: '111',
    category: 'transito',
    icon: 'Car',
    label: 'Número directo:',
  },
  {
    id: '4',
    name: 'Bomberos Voluntarios',
    number: '119',
    category: 'bomberos',
    icon: 'Flame',
    label: 'Número directo:',
  },
  {
    id: '5',
    name: 'Ambulancias Emergencias',
    number: '118',
    category: 'ambulancia',
    icon: 'Cross',
    label: 'Número directo:',
  },
  {
    id: '6',
    name: 'Hospital San Juan de Dios',
    number: '4 664-5555',
    category: 'salud',
    icon: 'Heart',
    label: 'Número directo:',
  },
  {
    id: '7',
    name: 'Hospital San Juan de Dios',
    number: '4 664-2883',
    category: 'salud',
    icon: 'Heart',
    label: 'Número directo:',
  },
  {
    id: '8',
    name: 'Coordinador de Seguridad',
    number: '72944810',
    category: 'vecinal',
    icon: 'User',
    label: 'Número directo:',
  },
];

export const ALARM_LOGS: AlarmLog[] = [
  {
    id: 'log-1',
    timestamp: 'Hoy, 15:42',
    type: 'panic',
    user: 'Carlos Alvarado (Tú)',
    status: 'resolved',
    resolvedBy: 'Central Serenazgo',
    resolutionTime: '3 min',
  },
  {
    id: 'log-2',
    timestamp: 'Ayer, 21:15',
    type: 'suspicious',
    user: 'María Gutiérrez (Calle 3)',
    status: 'resolved',
    resolvedBy: 'Vecinos de Calle 3',
    resolutionTime: '5 min',
  },
  {
    id: 'log-3',
    timestamp: '22 Jun, 03:30',
    type: 'medical',
    user: 'Jorge Valdez (Calle Los Olivos)',
    status: 'resolved',
    resolvedBy: 'Ambulancia 168',
    resolutionTime: '8 min',
  },
];

// ============================================================
// DATOS DE PRUEBA (MOCK) DE LA SECCIÓN "REGISTRO DE AFILIADOS"
// ============================================================

export const AFILIADOS_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    title: 'Registro de Vecinos',
    subtitle: 'El Trigal • Zona Sur',
    description: 'Mantener el padrón actualizado nos permite coordinar las alarmas, patrullajes preventivos y la respuesta comunitaria ante emergencias.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    title: 'Ventajas de estar afiliado',
    subtitle: 'Protección y Beneficios',
    description: 'Los afiliados cuentan con acceso prioritario al botón táctil, soporte en asambleas del barrio, y habilitación de servicios de luz, agua y gas.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    title: 'Requisitos de Afiliación',
    subtitle: 'Consulta de Padrón',
    description: 'Revisa de manera ágil los requisitos indispensables para formalizar tu registro de vivienda y estar plenamente activo en la central vecinal.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 4,
    title: 'Consulta tu Estado',
    subtitle: 'Tranquilidad Comunitaria',
    description: 'Accede a la verificación inmediata de tu número celular en la base de datos para garantizar la activación rápida y segura de las alertas.',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
  },
];

export const DEFAULT_VECINOS: Vecino[] = [
  { nombre: 'Daniel Mendez', ci: '12345678', celular: '12345678', calle: 'Calle Las Acacias #44', estado: 'Activo' },
  { nombre: 'Carlos Alvarado', ci: '5049382', celular: '12345678', calle: 'Los Nogales esq. Los Tilos', estado: 'Activo' },
  { nombre: 'Armando Tolaba', ci: '7294703', celular: '72947032', calle: 'Calle Principal Nro. 12', estado: 'Activo' },
  { nombre: 'Roxana Vaca', ci: '6027281', celular: '60272812', calle: 'Av. Circunvalación #204', estado: 'Activo' },
  { nombre: 'Julio Mendoza', ci: '7454545', celular: '74545456', calle: 'Calle Los Tilos #45', estado: 'Activo' },
  { nombre: 'Silvia Delgado', ci: '7297298', celular: '72972988', calle: 'Pasaje El Trigal #10', estado: 'Activo' },
  { nombre: 'Fernando Cabrera', ci: '6983599', celular: '69835999', calle: 'Calle Las Orquídeas #150', estado: 'Activo' },
];

// ============================================================
// AVISOS COMPARTIDOS (Notificaciones del barrio El Trigal)
// Reemplazan a `mockAlerts` del App.tsx original en el header.
// ============================================================

export const NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Nueva campaña de vacunación para mascotas este sábado en la plaza principal',
    time: 'Hace 10 min',
    unread: true,
    type: 'info',
  },
  {
    id: '2',
    title: 'Corte de agua programado para el día martes de 08:00 a 14:00 por mantenimiento',
    time: 'Ayer',
    unread: true,
    type: 'warning',
  },
];
