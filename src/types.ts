/**
 * Type declarations for Barrio El Trigal community application.
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
  imageUrl: string;
  description: string;
  lastSeen: string;
  contact: string;
  neighborhood: string;
  date: string;
  images?: string[];
  videoUrl?: string;
  phones?: string[];
}

export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  category: 'INFRAESTRUCTURA' | 'SERVICIOS' | 'SEGURIDAD';
  description: string;
  location: string;
  status: 'Completado' | 'En Progreso' | 'Planificado';
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
