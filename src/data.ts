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
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Línea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'Línea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p2',
    name: 'Farmacia San Roque',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    address: 'Calle Sucre N° 745',
    phone: '4 665 5678',
    neighborhood: 'San Roque',
    description: 'Comprometidos con tu bienestar y tu economía. Servicio rápido y seguro para toda la vecindad.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Línea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'p3',
    name: 'Farmacia del Sur',
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Potosí N° 1230',
    phone: '4 611 2233',
    neighborhood: 'El Molino',
    description: 'Medicamentos originales, atención profesional y los mejores precios de la zona sur.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Línea D', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea F', flagColor: 'Morado', proximity: 'A una cuadra' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos calles' },
        { name: 'Línea E', flagColor: 'Verde', proximity: 'A tres cuadras' }
      ],
      taxitrufis: [
        { name: 'Línea T', flagColor: 'Rojo con Blanco', proximity: 'Pasa por la puerta' },
        { name: 'Línea S', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea R', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'Línea Q', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 7', flagColor: 'Morado', proximity: 'Pasa por la puerta' },
        { name: 'Línea 8', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea 9', flagColor: 'Roja', proximity: 'A una calle' },
        { name: 'Línea 10', flagColor: 'Azul', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Norte', flagColor: '', proximity: '4 677 7777' },
        { name: 'Radio Express', flagColor: '', proximity: '4 688 8888' }
      ]
    }
  },
  {
    id: 'p4',
    name: 'Farmacia Lourdes',
    imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Víctor Paz Estenssoro N° 450',
    phone: '4 622 3344',
    neighborhood: 'Lourdes',
    description: 'Cuidamos tu salud y la de tu familia con productos de calidad y asesoramiento farmacéutico.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'Pasa por la puerta' },
        { name: 'Línea A', flagColor: 'Rojo', proximity: 'A una cuadra' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'A dos calles' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'Línea M', flagColor: 'Morado', proximity: 'Pasa por la puerta' },
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'A dos cuadras' },
        { name: 'Línea D', flagColor: 'Roja', proximity: 'A dos calles' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'Pasa por la puerta' },
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'A dos calles' },
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Lourdes', flagColor: '', proximity: '4 699 9999' },
        { name: 'Radio Centro', flagColor: '', proximity: '4 600 0000' }
      ]
    }
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
    description: 'Disfruta de una experiencia gastronómica única con los mejores cortes de carne, parrilladas artesanales y una atmósfera familiar inigualable en pleno corazón del barrio.',
    phone: '+591 69835999',
    phones: ['+591 69835999', '4 663 2256', '4 601 2345'],
    address: 'Calle Comercio #456, entre Bolívar y Sucre, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Martes', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Miércoles', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Jueves', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Viernes', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Sábado', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.9',
    reviewsCount: 120,
    actionText: 'Ver Menú',
    transport: {
      micros: [
        { name: 'Línea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'Línea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b2',
    name: 'Boutique Estilo Real',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    category: 'Ropa',
    description: 'Descubre las últimas tendencias en moda para dama y caballero. Ropa de calidad con diseños exclusivos que resaltan tu estilo personal.',
    phone: '+591 69835999',
    address: 'Avenida Principal #789, Local 3, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 2:00 PM' }
    ],
    actionText: 'Explorar',
    transport: {
      micros: [
        { name: 'Línea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b3',
    name: 'Mercado El Campo',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&auto=format&fit=crop&q=80',
    category: 'Papa de comer',
    description: 'Frutas frescas, verduras de temporada y víveres de primera necesidad los encuentras aquí. Productos traídos directamente del campo a tu mesa.',
    phone: '+591 69835999',
    phones: ['+591 69835999', '4 665 7789'],
    address: 'Plaza Central #12, Puesto 5, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Martes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Miércoles', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Jueves', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Viernes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Sábado', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Domingo', open: true, hours: '6:00 AM - 9:00 PM' }
    ],
    distanceInfo: 'A 200m de la Plaza Central',
    actionText: 'Pedir Ya',
    transport: {
      micros: [
        { name: 'Línea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea D', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos calles' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'Línea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b4',
    name: 'Vivero Oasis Verde',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    category: 'Plantas',
    description: 'Transforma tu hogar con nuestras plantas de interior y exterior. Macetas decorativas, sustratos y asesoría personalizada para tus espacios verdes.',
    phone: '4 666 9900',
    address: 'Calle Las Flores #234, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Miércoles', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Sábado', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    isFreeDelivery: true,
    actionText: 'Catálogo',
    transport: {
      micros: [
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'Línea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'Línea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b5',
    name: 'Pizzería Don Remigio',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    category: 'Comida',
    description: 'Las mejores pizzas artesanales horneadas en horno de leña. Masa crujiente, ingredientes frescos y el auténtico sabor italiano en cada bocado.',
    phone: '4 667 1133',
    phones: ['4 667 1133', '4 667 1134'],
    address: 'Calle Bolívar #321, Esquina San Martín, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: false, hours: 'Cerrado' },
      { day: 'Martes', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'Miércoles', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'Jueves', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'Viernes', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'Sábado', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'Domingo', open: true, hours: '6:00 PM - 11:30 PM' }
    ],
    rating: '4.7',
    reviewsCount: 85,
    actionText: 'Ver Menú',
    transport: {
      micros: [
        { name: 'Línea D', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea L', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea 1', flagColor: 'Roja', proximity: 'A dos calles' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b6',
    name: 'TechPro Servicios',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnología',
    description: 'Reparación y mantenimiento de computadoras, venta de accesorios tecnológicos y asesoría informática para toda la comunidad del barrio.',
    phone: '4 668 5544',
    address: 'Avenida Tecnológica #567, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 1:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Equipos',
    transport: {
      micros: [
        { name: 'Línea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b7',
    name: 'Salón y Spa Divino',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80',
    category: 'Belleza',
    description: 'Cortes de cabello modernos, tratamientos capilares, manicura y pedicura profesional. Relájate y renueva tu imagen con nosotros.',
    phone: '4 669 8877',
    phones: ['4 669 8877', '4 669 8878', '4 602 3456'],
    address: 'Calle Sucre #890, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.8',
    reviewsCount: 65,
    actionText: 'Agendar Cita',
    transport: {
      micros: [
        { name: 'Línea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea D', flagColor: 'Azul', proximity: 'A dos calles' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b8',
    name: 'Ferretería El Constructor',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80',
    category: 'Ferretería',
    description: 'Todo lo necesario para tus proyectos de construcción y mejoras del hogar. Herramientas, materiales eléctricos, pintura y tuberías de calidad.',
    phone: '4 670 3322',
    address: 'Calle Libertad #123, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Productos',
    transport: {
      micros: [
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'Línea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'Línea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b9',
    name: 'Panificadora La Espiga',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&auto=format&fit=crop&q=80',
    category: 'Comida',
    description: 'Pan artesanal horneado diariamente, facturas rellenas, tortas caseras y masas finas. El aroma del pan recién hecho te espera cada mañana.',
    phone: '4 671 4466',
    phones: ['4 671 4466', '4 671 4467'],
    address: 'Plaza Principal #45, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Martes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Miércoles', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Jueves', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Viernes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Sábado', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Domingo', open: true, hours: '6:00 AM - 9:00 PM' }
    ],
    isFreeDelivery: true,
    actionText: 'Pedir Ahora',
    transport: {
      micros: [
        { name: 'Línea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea D', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b10',
    name: 'Taller Mecánico El Rápido',
    imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&auto=format&fit=crop&q=80',
    category: 'Mecánica',
    description: 'Servicio completo de mecánica automotriz, cambio de aceite, frenos, suspensión y diagnóstico computarizado para tu vehículo.',
    phone: '4 672 9988',
    address: 'Carretera Panamericana Km 5, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Miércoles', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Sábado', open: true, hours: '8:00 AM - 12:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.6',
    reviewsCount: 42,
    actionText: 'Agendar Cita',
    transport: {
      micros: [
        { name: 'Línea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b11',
    name: 'Farmacia San Rafael',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    category: 'Salud',
    description: 'Amplio surtido en medicamentos genéricos y de marca, productos de cuidado personal, vitaminas y atención farmacéutica personalizada.',
    phone: '4 673 2211',
    phones: ['4 673 2211', '4 673 2212', '4 603 4567'],
    address: 'Calle Junín #678, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Miércoles', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Sábado', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Domingo', open: true, hours: '8:00 AM - 10:00 PM' }
    ],
    actionText: 'Ver Catálogo',
    transport: {
      micros: [
        { name: 'Línea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea D', flagColor: 'Azul', proximity: 'A dos calles' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b12',
    name: 'Gimnasio FitMax',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    category: 'Deportes',
    description: 'Equipamiento moderno, clases dirigidas de spinning, zumba y crossfit. Entrenadores certificados te ayudarán a alcanzar tus metas fitness.',
    phone: '4 674 5566',
    address: 'Avenida Deportiva #234, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'Martes', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'Miércoles', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'Jueves', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'Viernes', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'Sábado', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.5',
    reviewsCount: 98,
    actionText: 'Ver Planes',
    transport: {
      micros: [
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'Línea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'Línea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b13',
    name: 'Librería y Papelería El Saber',
    imageUrl: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600&auto=format&fit=crop&q=80',
    category: 'Educación',
    description: 'Útiles escolares, libros de texto, material de oficina y artículos de arte. Todo lo que necesitas para estudiar y crear en un solo lugar.',
    phone: '4 675 7788',
    phones: ['4 675 7788', '4 675 7789'],
    address: 'Calle Educación #456, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 2:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Explorar',
    transport: {
      micros: [
        { name: 'Línea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b14',
    name: 'Carpintería Don José',
    imageUrl: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&auto=format&fit=crop&q=80',
    category: 'Hogar',
    description: 'Muebles de madera maciza a medida, reparaciones de carpintería, restauración de muebles antiguos y trabajos personalizados para tu hogar.',
    phone: '4 676 3344',
    address: 'Calle Artesanal #789, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Miércoles', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Sábado', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Trabajos',
    transport: {
      micros: [
        { name: 'Línea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Línea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Línea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Línea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b15',
    name: 'ElectroHogar Trigal',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
    category: 'Electrodomésticos',
    description: 'Venta de electrodomésticos, refrigeradores, lavadoras, cocinas y televisores. Las mejores marcas al mejor precio con entrega a domicilio.',
    phone: '4 677 9900',
    phones: ['4 677 9900', '4 677 9901', '4 604 5678'],
    address: 'Avenida Comercial #1000, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 2:00 PM' }
    ],
    isFreeDelivery: true,
    rating: '4.7',
    reviewsCount: 150,
    actionText: 'Ver Ofertas',
    transport: {
      micros: [
        { name: 'Línea D', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Línea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'Línea C', flagColor: 'Amarillo', proximity: 'A dos calles' },
        { name: 'Línea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'Línea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'Línea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Línea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Línea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Línea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'Línea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Línea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Línea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
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

export const NEWS_DATA: NeighborhoodEvent[] = [
  {
    id: 'n1',
    title: 'Tarija será sede del Congreso Nacional de Tecnología 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnologia',
    description: 'La ciudad de Tarija fue elegida como sede del Congreso Nacional de Tecnología e Innovación 2026, evento que reunirá a más de 200 expertos en desarrollo de software, inteligencia artificial y ciberseguridad. El encuentro se realizará del 15 al 18 de agosto en el Centro de Convenciones y contará con la participación de universidades y empresas tecnológicas de todo el país.',
    icon: 'users',
    date: 'Lunes, 30 de Junio de 2026',
    location: 'Centro de Convenciones, Tarija'
  },
  {
    id: 'n2',
    title: 'Alcaldía de Tarija presenta nuevo presupuesto municipal',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635b8374d7a?w=600&auto=format&fit=crop&q=80',
    category: 'Politica',
    description: 'El Concejo Municipal de Tarija aprobó en primera instancia el presupuesto anual 2026 por un monto de 450 millones de bolivianos. Los recursos estarán destinados principalmente a obras de infraestructura vial, mejoramiento de servicios básicos y programas sociales para las zonas periurbanas del municipio.',
    icon: 'users',
    date: 'Viernes, 27 de Junio de 2026',
    location: 'Concejo Municipal, Tarija'
  },
  {
    id: 'n3',
    title: 'Tarija se corona campeón del torneo nacional de fútbol',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-3ef1e54e03c6?w=600&auto=format&fit=crop&q=80',
    category: 'Deportes',
    description: 'El equipo de fútbol de Tarija se consagró campeón del torneo nacional de la COFA después de vencer 3-1 al equipo de Cochabamba en una final disputada en el Estadio IV Centenarios. Miles de tarijeños celebraron en las calles el título obtenido tras 15 años de sequía deportiva.',
    icon: 'users',
    date: 'Domingo, 29 de Junio de 2026',
    location: 'Estadio IV Centenarios, Tarija'
  },
  {
    id: 'n4',
    title: 'Crecen las exportaciones de uva tarijeña al mercado europeo',
    imageUrl: 'https://images.unsplash.com/photo-1569913484892-739348b21fbd?w=600&auto=format&fit=crop&q=80',
    category: 'Economia',
    description: 'Las exportaciones de uva de la región de Tarija al mercado europeo crecieron un 35% durante el primer semestre de 2026, según datos de la Cámara de Exportadores. Los vinos y singanis tarijeños continúan ganando reconocimiento internacional, generando divisas y empleo para cientos de familias productoras del Valle Central.',
    icon: 'gift',
    date: 'Jueves, 26 de Junio de 2026',
    location: 'Valle Central de Tarija'
  },
  {
    id: 'n5',
    title: 'Campaña de forestación en el cerro San Juan',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    category: 'Medio',
    description: 'Voluntarios de Tarija plantaron más de 5.000 árboles nativos en el cerro San Juan como parte de la campaña "Tarija Pulmón Verde". La iniciativa liderada por la Gobernación busca reforestar 50 hectáreas hasta fin de año para recuperar la cobertura vegetal de la zona y mitigar los efectos del cambio climático en la región.',
    icon: 'trash',
    date: 'Sábado, 28 de Junio de 2026',
    location: 'Cerro San Juan, Tarija'
  },
  {
    id: 'n6',
    title: 'Universitarios tarijeños crean app para denuncias ciudadanas',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnologia',
    description: 'Estudiantes de la Universidad Juan Misael Saracho desarrollaron una aplicación móvil que permite a los ciudadanos de Tarija realizar denuncias en tiempo real sobre baches, alumbrado público dañado y recolección de basura. La app "Tarija Reporta" ya cuenta con más de 10.000 descargas en su primera semana de lanzamiento.',
    icon: 'heart-pulse',
    date: 'Martes, 24 de Junio de 2026',
    location: 'Universidad Juan Misael Saracho, Tarija'
  },
  {
    id: 'n7',
    title: 'Nueva línea de transporte eléctrico conecta la zona sur',
    imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&auto=format&fit=crop&q=80',
    category: 'Transporte',
    description: 'La Alcaldía de Tarija inauguró una nueva línea de transporte público eléctrico que conecta la zona sur con el centro de la ciudad. Los modernos minibuses con capacidad para 30 pasajeros realizarán el recorrido cada 10 minutos en horario de 6:00 a 22:00, contribuyendo a la reducción de la contaminación auditiva y atmosférica.',
    icon: 'users',
    date: 'Miércoles, 25 de Junio de 2026',
    location: 'Zona Sur - Centro, Tarija'
  },
  {
    id: 'n8',
    title: 'Tarija lanza ruta turística de las bodegas históricas',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=80',
    category: 'Turismo',
    description: 'El Ministerio de Turismo en coordinación con la Gobernación de Tarija lanzó la "Ruta de las Bodegas Históricas", un recorrido que incluye visitas a 12 bodegas tradicionales con más de 100 años de antigüedad. Los turistas podrán degustar vinos y singanis, conocer el proceso de elaboración y disfrutar de la gastronomía local.',
    icon: 'gift',
    date: 'Sábado, 28 de Junio de 2026',
    location: 'Valle de la Concepción, Tarija'
  },
  {
    id: 'n9',
    title: 'Gobierno anuncia construcción de nuevo hospital municipal',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80',
    category: 'Salud',
    description: 'El Gobierno Nacional anunció la construcción del nuevo Hospital Municipal de Tarija con una inversión de 120 millones de bolivianos. El centro de salud contará con 200 camas, equipos de última generación y servicios de maternidad, pediatría, traumatología y cardiología. Las obras comenzarán en agosto y se estima su conclusión en 2028.',
    icon: 'heart-pulse',
    date: 'Viernes, 27 de Junio de 2026',
    location: 'Av. Víctor Paz, Tarija'
  },
  {
    id: 'n10',
    title: 'Feria del Libro Tarija 2026 reúne a escritores nacionales',
    imageUrl: 'https://images.unsplash.com/photo-1478146059778-2f8f1e5b9b3a?w=600&auto=format&fit=crop&q=80',
    category: 'Cultura',
    description: 'La Feria Internacional del Libro de Tarija 2026 abrió sus puertas con la participación de más de 50 escritores bolivianos y 30 editoriales internacionales. El evento cultural más importante del sur del país se desarrolla en el recinto ferial de la ciudad y ofrece talleres, presentaciones de libros y conferencias sobre literatura contemporánea.',
    icon: 'gift',
    date: 'Lunes, 23 de Junio de 2026',
    location: 'Recinto Ferial, Tarija'
  },
  {
    id: 'n11',
    title: 'Más de 200 jóvenes participan en olimpiadas de robótica',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnologia',
    description: 'La carrera de Ingeniería de Sistemas de la Universidad Autónoma Juan Misael Saracho organizó las Olimpiadas de Robótica Tarija 2026 con la participación de más de 200 estudiantes de colegios secundarios. Los jóvenes compitieron en categorías de robots seguidores de línea, sumo robótico y drones programables.',
    icon: 'users',
    date: 'Domingo, 22 de Junio de 2026',
    location: 'Universidad Juan Misael Saracho, Tarija'
  },
  {
    id: 'n12',
    title: 'Diputados debaten ley de desarrollo productivo para Tarija',
    imageUrl: 'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=600&auto=format&fit=crop&q=80',
    category: 'Politica',
    description: 'La Cámara de Diputados inició el debate del proyecto de Ley de Desarrollo Productivo para el departamento de Tarija, una normativa que busca impulsar los sectores vitivinícola, oleícola y turístico de la región. La ley contempla incentivos fiscales, créditos blandos y asistencia técnica para pequeños y medianos productores.',
    icon: 'users',
    date: 'Jueves, 19 de Junio de 2026',
    location: 'Asamblea Legislativa, Tarija'
  },
  {
    id: 'n13',
    title: 'Selección tarijeña de básquet clasifica a liguilla final',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80',
    category: 'Deportes',
    description: 'La selección de básquetbol de Tarija clasificó a la liguilla final del campeonato nacional después de vencer 87-72 al equipo de Potosí. El equipo tarijeño, dirigido por el entrenador Carlos López, mostró un juego sólido y promete dar pelea en la fase decisiva del torneo que se jugará en la ciudad de Santa Cruz.',
    icon: 'users',
    date: 'Martes, 17 de Junio de 2026',
    location: 'Coliseo Deportivo, Tarija'
  },
  {
    id: 'n14',
    title: 'Tarija sede del encuentro nacional de artesanos',
    imageUrl: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=600&auto=format&fit=crop&q=80',
    category: 'Cultura',
    description: 'La ciudad de Tarija fue elegida como sede del Encuentro Nacional de Artesanos 2026, evento que congrega a más de 300 artesanos de los nueve departamentos de Bolivia. La feria se realiza en la Plaza Principal de Tarija y exhibe tejidos, cerámica, tallados en madera, joyería tradicional y productos gastronómicos típicos de cada región.',
    icon: 'gift',
    date: 'Sábado, 21 de Junio de 2026',
    location: 'Plaza Principal, Tarija'
  },
  {
    id: 'n15',
    title: 'Construcción del nuevo puente sobre el río Guadalquivir',
    imageUrl: 'https://images.unsplash.com/photo-1534719152881-ce389ebada1e?w=600&auto=format&fit=crop&q=80',
    category: 'Transporte',
    description: 'La Gobernación de Tarija inició la construcción de un nuevo puente vehicular sobre el río Guadalquivir que conectará los distritos 6 y 7 de la ciudad. La obra, con una inversión de 35 millones de bolivianos, beneficiará a más de 40.000 habitantes y permitirá descongestionar el tráfico en el puente San Martín, actualmente colapsado en horas pico.',
    icon: 'users',
    date: 'Lunes, 16 de Junio de 2026',
    location: 'Río Guadalquivir, Tarija'
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
