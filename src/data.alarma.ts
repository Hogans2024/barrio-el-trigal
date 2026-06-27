import {
  CarouselSlide,
  QuickAccessItem,
  Notice,
  EmergencyContact,
  AlarmLog,
  MockLostPet,
  MockPharmacy,
  MockLocalBusiness,
  MockNeighborhoodEvent,
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
    id: 3,
    title: 'Números de Emergencia',
    subtitle: 'Siempre a la mano',
    description: 'Comunícate directamente con la Policía, Serenazgo o Bomberos de Tarija a través de nuestro botón directo de llamadas.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLLi0wMnjixDes2z-aGzTDRo5Y_zlUtP8Tv96OYHOpDW16MxU4Xmd6SePoNM9wjAf34ZOWrtd0I2rw_IR8lD9xx6zdBCuwoGccYhexSkqhEWHWPXosYZnyKZNbh-kpJcGrDKmH_xTr20jIwah0onFlDA2SpWk2_FvDRf2F5AWl3G4lH2XDLiQM0n8pR536Aov7vGjas0c4LkMhro3yEpkLxHzfN4oge031Hp0JG9EchWM4otYgCoM4mM7yYQ3BlljhUhxMc9GopdIZ',
  },
];

export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: 'eventos',
    title: 'Eventos',
    subtitle: 'Actividades y reuniones',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4XugJ9BIYQQZSg5uxfx5pzjvcDkgddseLUGZn3B9ZCi-tE8P8xDMB209MVF_syGebJdC7ga453TGJAhLFOD2G0vKv8CGEPGD8qQDLI34h4MMGJV6EWbT9OgO2r989XTOIxMD4ytoaKnjAL2F2WyXjq08PvMDHyFFkdwbDm-4ICI8sCqDIzlDXT_GAiGUiCSaI72mNtde2EmKOo33RBNN9QmUjOcgNs2bXa-muBjFKcWkeXjMn5K89SpwuHy6eMDQ586AKn5i0p9XS',
  },
  {
    id: 'farmacias',
    title: 'Farmacias',
    subtitle: 'Farmacias abiertas hoy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLLi0wMnjixDes2z-aGzTDRo5Y_zlUtP8Tv96OYHOpDW16MxU4Xmd6SePoNM9wjAf34ZOWrtd0I2rw_IR8lD9xx6zdBCuwoGccYhexSkqhEWHWPXosYZnyKZNbh-kpJcGrDKmH_xTr20jIwah0onFlDA2SpWk2_FvDRf2F5AWl3G4lH2XDLiQM0n8pR536Aov7vGjas0c4LkMhro3yEpkLxHzfN4oge031Hp0JG9EchWM4otYgCoM4mM7yYQ3BlljhUhxMc9GopdIZ',
  },
  {
    id: 'mascotas',
    title: 'Mascotas',
    subtitle: 'Encuentra tu mascota',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWlRFvOVbyE46T_PxhfmeaTMbsGIVIrs5e09wMO6SmdL3ez06-QxSKpfLQKNuKKWl7jljqUYcKxNQuWfYfc7JtwDlwfN56SpiKM5wjKsgz3L9dULSoAxjVOlPQD3A-LFBUGmI24jzjoG6CjElEoQyUJGcAQy4b4SU1XM6FJ82ntuf6HjwLZ2KeTCRWWr_f2Yootk7MbHr-aQb-HPH17dg5yJIipnPs8HItt1H_puu1S4IEYyqkiMp9mTVGd1iCvLHrxdXScGIuLsMd',
  },
  {
    id: 'negocios',
    title: 'Negocios',
    subtitle: 'Guía comercial local',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsXQdNB42VoD1ozLGWcvwvdSPVux24IdKofkveCTXV7CyzP2h8KMazQ7eOJFvzlf0NjjXBZowTGS_duAkSXG12Y5UFu25f2WRXcCRA2Yr9kG7MrtYvwsG8GcvI5npQl5PjHRa3it-ld9YEBAFwmzkZ0uWxYgKgA6N6fZ9XBnStgefxyyVtz09MeE4Y-22ZDjDAzW4cwMZZ7-l5Xdd3wU5h5Ndzd0SgJ3wB1al5QArnJiO9j9PDB15W_4J9jWDA6crhM3sMH3LHCQVr',
  },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    name: 'Serenazgo de Tarija',
    number: '110',
    category: 'serenazgo',
    icon: 'Shield',
  },
  {
    id: '2',
    name: 'Policía Nacional (EPIC)',
    number: '911',
    category: 'policia',
    icon: 'PhoneCall',
  },
  {
    id: '3',
    name: 'Bomberos Voluntarios Brasschaat',
    number: '119',
    category: 'bomberos',
    icon: 'Flame',
  },
  {
    id: '4',
    name: 'Ambulancias Hospital San Juan de Dios',
    number: '168',
    category: 'salud',
    icon: 'Heart',
  },
  {
    id: '5',
    name: 'Coordinadora de Seguridad El Trigal',
    number: '+591 729 44810',
    category: 'vecinal',
    icon: 'User',
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

// --- Datos MOCK renombrados (Mock*) para el DetailModal ---

export const LOST_PETS: MockLostPet[] = [
  {
    id: 'pet-1',
    name: 'Toby',
    breed: 'Golden Retriever',
    description: 'Perrito juguetón color dorado, llevaba collar rojo con placa de El Trigal. Perdido cerca del parque central.',
    contact: '729 12345',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
    status: 'lost',
  },
  {
    id: 'pet-2',
    name: 'Michi',
    breed: 'Gato Siamés',
    description: 'Gato siamés con ojos azules muy llamativos, asustadizo. Responde al nombre de Michi.',
    contact: '715 98765',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    status: 'lost',
  },
];

export const PHARMACIES: MockPharmacy[] = [
  {
    id: 'ph-1',
    name: 'Farmacia El Sol',
    address: 'Av. Las Américas esq. Calle Los Pinos',
    phone: '66 41100',
    schedule: 'Abierto 24 Horas',
    open: true,
  },
  {
    id: 'ph-2',
    name: 'Farmacia Tarija',
    address: 'Calle Bolívar #420',
    phone: '66 32200',
    schedule: 'Abierto hasta las 23:00',
    open: true,
  },
];

export const LOCAL_BUSINESSES: MockLocalBusiness[] = [
  {
    id: 'biz-1',
    name: 'Panadería Don Bosco',
    category: 'Alimentos',
    phone: '729 88311',
    address: 'Av. Integración #120',
    rating: 4.8,
    featuredProduct: 'Pan casero y empanadas tarijeñas',
  },
  {
    id: 'biz-2',
    name: 'Ferretería El Trigal',
    category: 'Construcción / Hogar',
    phone: '730 45221',
    address: 'Calle Los Tilos #15',
    rating: 4.6,
    featuredProduct: 'Herramientas y duplicado de llaves',
  },
];

export const NEIGHBORHOOD_EVENTS: MockNeighborhoodEvent[] = [
  {
    id: 'ev-1',
    title: 'Asamblea General del Barrio',
    date: 'Sábado 27 de Junio',
    time: '10:00 AM',
    location: 'Cancha Polifuncional de El Trigal',
    description: 'Reunión para coordinar la instalación de 3 nuevas cámaras de vigilancia y cobro de cuota de mantenimiento.',
  },
  {
    id: 'ev-2',
    title: 'Simulacro de Sismo y Evacuación',
    date: 'Domingo 28 de Junio',
    time: '04:00 PM',
    location: 'Todo el Barrio',
    description: 'Ejercicio preventivo en conjunto con Bomberos Brasschaat para poner a prueba los tiempos de respuesta comunitaria.',
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
