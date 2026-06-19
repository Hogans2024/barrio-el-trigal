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
  category: 'Comunidad' | 'Salud' | 'Medio' | 'Todos'; // Category tag
  description: string;
  icon: string;
}

export interface LocalBusiness {
  id: string;
  name: string;
  imageUrl: string;
  category: 'Comunidad' | 'Comida' | 'Ropa' | 'Plantas' | 'Papa de comer' | 'Todos';
  description: string;
  rating?: string;
  reviewsCount?: number;
  openHours?: string;
  distanceInfo?: string;
  isFreeDelivery?: boolean;
  actionText: string;
}

export interface LostPet {
  id: string;
  name: string;
  type: 'Perro' | 'Gato' | 'Loro' | 'Todos';
  imageUrl: string;
  description: string;
  lastSeen: string;
  contact: string;
  neighborhood: string;
  date: string;
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
  zonaReferencia: string;
  // Participación Vecinal
  participaReuniones: boolean;
  deseaComisiones: boolean;
  interesSeguridad: 'Bajo' | 'Medio' | 'Alto';
  observaciones: string;
}
