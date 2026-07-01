import { Pharmacy, NeighborhoodEvent, LocalBusiness, LostPet, Project } from './types';

export const PHARMACIES_DATA: Pharmacy[] = [
  {
    id: 'p1',
    name: 'Farmacia Kurmi',
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    address: 'Av. La Paz esq. O\'Connor',
    phone: '4 664 1234',
    neighborhood: 'Centro',
    description: 'Atención las 24 horas con una amplia variedad de medicamentos y productos de cuidado personal.',
    isOnDuty: true
  },
  {
    id: 'p2',
    name: 'Farmacia San Roque',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    address: 'Calle Sucre N° 745',
    phone: '4 665 5678',
    neighborhood: 'San Roque',
    description: 'Comprometidos con tu bienestar y tu economía. Servicio rápido y seguro para toda la vecindad.',
    isOnDuty: true
  },
  {
    id: 'p3',
    name: 'Farmacia del Sur',
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Potosí N° 1230',
    phone: '4 611 2233',
    neighborhood: 'El Molino',
    description: 'Medicamentos originales, atención profesional y los mejores precios de la zona sur.',
    isOnDuty: true
  },
  {
    id: 'p4',
    name: 'Farmacia Lourdes',
    imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Víctor Paz Estenssoro N° 450',
    phone: '4 622 3344',
    neighborhood: 'Lourdes',
    description: 'Cuidamos tu salud y la de tu familia con productos de calidad y asesoramiento farmacéutico.',
    isOnDuty: true
  }
];

export const EVENTS_DATA: NeighborhoodEvent[] = [
  {
    id: 'e1',
    title: 'Limpieza General del Barrio',
    imageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80',
    category: 'Medio',
    description: 'Jornada de limpieza en calles, parques y espacios públicos para mantener nuestro barrio limpio y agradable para todos.',
    icon: 'trash'
  },
  {
    id: 'e2',
    title: 'Reunión Asamblea General del Barrio',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
    category: 'Comunidad',
    description: 'Encuentro para informar, escuchar propuestas y tomar decisiones importantes para el desarrollo de nuestra comunidad.',
    icon: 'users'
  },
  {
    id: 'e3',
    title: 'Aniversario del Barrio',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    category: 'Comunidad',
    description: 'Celebramos un año más de historia, unión y logros como comunidad. ¡Habrá música, sorpresas y mucha alegría!',
    icon: 'gift'
  },
  {
    id: 'e4',
    title: 'Vacunación de Mascotas del Barrio',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=80',
    category: 'Salud',
    description: 'Jornada de vacunación gratuita para perros y gatos del barrio. Protege a tu mascota y cuida su salud vecinal.',
    icon: 'heart-pulse'
  }
];

export const BUSINESSES_DATA: LocalBusiness[] = [
  {
    id: 'b1',
    name: 'La Parrilla del Trigal',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    category: 'Comida',
    description: 'Los mejores cortes de carne y asados tradicionales con el sabor auténtico del valle tarijeño.',
    rating: '4.9',
    reviewsCount: 120,
    actionText: 'Ver Menú'
  },
  {
    id: 'b2',
    name: 'Boutique Estilo Real',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    category: 'Ropa',
    description: 'Moda contemporánea para dama y caballero. Encuentra las últimas tendencias internacionales.',
    openHours: 'Abierto hoy hasta 8:00 PM',
    actionText: 'Explorar'
  },
  {
    id: 'b3',
    name: 'Mercado El Campo',
    imageUrl: 'https://images.unsplash.com/photo-1573244514399-7448d3ab85ae?w=600&auto=format&fit=crop&q=80',
    category: 'Papa de comer',
    description: 'Frutas, verduras y víveres frescos traídos directamente del campo a tu mesa todos los días.',
    distanceInfo: 'A 200m de la Plaza Central',
    actionText: 'Pedir Ya'
  },
  {
    id: 'b4',
    name: 'Vivero Oasis Verde',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    category: 'Plantas',
    description: 'Dale vida a tu hogar con nuestra selección de plantas de interior, macetas decorativas y abono.',
    isFreeDelivery: true,
    actionText: 'Catálogo'
  }
];

export const LOST_PETS_DATA: LostPet[] = [
  {
    id: 'lp1',
    name: 'Max',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdió en la tarde del 23 de mayo. Es un Golden Retriever, muy dócil, juguetón y amigable.',
    lastSeen: 'Calle Las Palmeras',
    contact: '4 664 7890',
    neighborhood: 'Las Palmeras',
    date: '23 de mayo de 2024'
  },
  {
    id: 'lp2',
    name: 'Luna',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdió el 22 de mayo en horas de la noche. Es gris con rayas oscuras y tiene un collar rosado con cascabel.',
    lastSeen: 'Av. Potosí',
    contact: '4 611 3344',
    neighborhood: 'El Molino',
    date: '22 de mayo de 2024'
  },
  {
    id: 'lp3',
    name: 'Kiwi',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1522850400371-33188d2d6342?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó el 21 de mayo por la mañana. Es un loro hablador, verde brillante con plumas amarillas en la cabeza.',
    lastSeen: 'Pasaje El Trigal',
    contact: '4 673 2211',
    neighborhood: 'El Trigal',
    date: '21 de mayo de 2024'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'pr1',
    title: 'Empedrado de Calles',
    imageUrl: 'https://images.unsplash.com/photo-1584947897103-68ea23f03b22?w=600&auto=format&fit=crop&q=80',
    category: 'INFRAESTRUCTURA',
    description: 'Mejoramiento de las calles del barrio para brindar mayor seguridad, durabilidad y una mejor calidad de vida para todos los vecinos.',
    location: 'Calles principales del barrio',
    status: 'En Progreso'
  },
  {
    id: 'pr2',
    title: 'Gas Domiciliario',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?w=600&auto=format&fit=crop&q=80',
    category: 'SERVICIOS',
    description: 'Proyecto para llevar el servicio de gas domiciliario a más familias del barrio, promoviendo bienestar, confort y ahorro en el hogar.',
    location: 'Sectores en desarrollo',
    status: 'En Progreso'
  },
  {
    id: 'pr3',
    title: 'Alarma Vecinal',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    category: 'SEGURIDAD',
    description: 'Implementación de un sistema de alarma vecinal conectado para alertar y proteger a nuestra comunidad ante cualquier emergencia.',
    location: 'Todo el barrio',
    status: 'Completado'
  }
];
