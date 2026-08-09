/**
 * Type declarations for Barrio El Trigal community application.
 */

/**
 * NOTA CMS (Farmacias): facebook, tiktok, instagram, youtube son opcionales
 * y de SOLO LECTURA desde la app — no hay formulario en FarmaciasView.tsx
 * para cargarlos. Su origen exclusivo, a futuro, será una columna por cada
 * red social en la hoja de Google Sheets, cargada manualmente por el
 * administrador. El doGet de Apps Script deberá incluir estos 4 campos en
 * el JSON de salida para que useSheetData los reciba.
 *
 * IMPORTANTE: resolver estos 4 campos NO deja lista toda la interfaz.
 * `transport` y `schedule` siguen sin una fuente de datos definida y son
 * la razón real por la que `useSheetData.ts` sigue forzando
 * FALLBACK.farmacias (ver comentario ahí). No revertir esa línea todavía.
 */
export interface Pharmacy {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
  phone: string;
  neighborhood: string;
  description: string;
  isOnDuty: boolean;
  phones?: string[];
  schedule?: DaySchedule[];
  transport?: TransportInfo;
  facebook?: string;
  tiktok?: string;
  instagram?: string;
  youtube?: string;
  actionText?: string;
}

export interface NeighborhoodEvent {
  id: string;
  title: string;
  imageUrl: string;
  category: 'Comunidad' | 'Salud' | 'Medio' | 'Seguridad' | 'Cultura' | 'Servicios' | 'Tecnologia' | 'Politica' | 'Deportes' | 'Economia' | 'Transporte' | 'Turismo' | 'Todos'; // Category tag
  description: string;
  icon: string;
  date?: string;
  location?: string;
  /* CMS_READY: contacto opcional para la sección Contactos del modal (pendiente de datos en Sheets) */
  contact?: string;
  /* CMS_PENDING: autor/editor que publicó la noticia (Administrador, Presidente del Barrio, Vecino, etc.) */
  publisher?: string;
  /* CMS_PENDING: galería de imágenes extra para la noticia (slideshow cuando hay más de 2). imageUrl es la primera. */
  images?: string[];
}

export interface DaySchedule {
  day: string;
  open: boolean;
  hours: string;
}

export interface TransportLine {
  name: string;
  flagColor: string;
  proximity: string;
  detail?: string;
}

export interface TransportInfo {
  micros?: TransportLine[];
  taxitrufis?: TransportLine[];
  trufis?: TransportLine[];
  radioTaxis?: TransportLine[];
}

export interface LocalBusiness {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  description: string;
  phone?: string;
  phones?: string[];
  address?: string;
  socialNetworks?: Record<string, string>;
  facebook?: string;
  tiktok?: string;
  instagram?: string;
  youtube?: string;
  rating?: string;
  reviewsCount?: number;
  openHours?: string;
  schedule?: DaySchedule[];
  distanceInfo?: string;
  isFreeDelivery?: boolean;
  actionText: string;
  images?: string[];
  videoUrl?: string;
  transport?: TransportInfo;
}

export interface LostPet {
  id: string;
  name: string;
  type: string;
  status?: 'lost' | 'found' | 'adoption';
  imageUrl: string;
  description: string;
  lastSeen: string;
  contact: string;
  neighborhood: string;
  date: string;
  images?: string[];
  videoUrl?: string;
  facebook?: string;
}

export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  category: 'INFRAESTRUCTURA' | 'SERVICIOS' | 'SEGURIDAD';
  description: string;
  location: string;
  status: 'Completado' | 'En Progreso' | 'Planificado';
  /* CMS_READY: contacto opcional para la sección Contactos del modal (pendiente de datos en Sheets) */
  contact?: string;
}

export interface AffiliateForm {
  fechaRegistro: string;
  nombres: string;
  apellidos: string;
  ci: string;
  fechaNacimiento: string;
  sexo: string;
  estadoCivil: string;
  profesion: string;
  // Contacto y Afiliación
  telefono: string;
  correo: string;
  fechaAfiliacion: string;
  estadoAfiliacion: 'Activo' | 'Inactivo';
  numeroAfiliado: string;
  tipoAfiliado: string;
  numeroRecibo: string;
  montoPagado: string;
  // Ubicación y Vivienda
  direccion: string;
  numeroCasa: string;
  manzano: string;
  tiempoResidencia: string;
  zona: string;
  referencia: string;
  // Participación Vecinal
  participaReuniones: boolean;
  deseaComisiones: boolean;
  interesSeguridad: 'Bajo' | 'Medio' | 'Alto';
  observaciones: string;
}
