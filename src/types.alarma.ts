// ============================================================
// TIPOS DE LA SECCIÓN "CENTRAL ALARMA VECINAL" Y "REGISTRO AFILIADOS"
// ------------------------------------------------------------
// Estos tipos provienen del proyecto "Central Alarma y Registro
// Afiliados" (proyecto origen). Conviven en este archivo APARTE
// para NO colisionar con los tipos reales de `src/types.ts` del
// CMS (que define Pharmacy, LocalBusiness, LostPet y
// NeighborhoodEvent con campos distintos y conectados a Sheets).
//
// REGLA (sección 2.2.1 del prompt): los tipos que chocan de nombre
// con los reales se renombran con prefijo `Mock*`. Los que no
// chocan (NavItem, CarouselSlide, Notice, QuickAccessItem,
// EmergencyContact, AlarmLog, Vecino) se mantienen con su nombre
// original.
// ============================================================

// --- Tipos compartidos por ambas secciones ---

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export interface Notice {
  id: string;
  title: string;
  time: string;
  unread: boolean;
  type: 'info' | 'warning' | 'alert';
}

// --- Tipos propios de la sección "Central Alarma Vecinal" ---

export interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  category: 'policia' | 'serenazgo' | 'bomberos' | 'salud' | 'vecinal';
  icon: string;
}

export interface AlarmLog {
  id: string;
  timestamp: string;
  type: 'panic' | 'suspicious' | 'test' | 'medical';
  user: string;
  status: 'active' | 'resolved';
  resolvedBy?: string;
  resolutionTime?: string;
}

// --- Tipos propios de la sección "Registro de Afiliados" ---

export interface Vecino {
  nombre: string;
  ci: string;
  celular: string;
  calle: string;
  estado: string;
  fechaAfiliacion?: string;
}
