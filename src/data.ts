import { Pharmacy, NeighborhoodEvent, LocalBusiness, LostPet, Project } from './types';

export const PHARMACIES_DATA: Pharmacy[] = [
  {
    id: 'p1',
    name: 'Farmacia Kurmi',
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    address: 'Av. La Paz esq. O\'Connor',
    phone: '4 664 1234',
    neighborhood: 'Centro',
    description: 'Atenci�n las 24 horas con una amplia variedad de medicamentos y productos de cuidado personal.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'L�nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'L�nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'L�nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'L�nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'L�nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'L�nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'L�nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'L�nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'L�nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'L�nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'L�nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'L�nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio M�vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p2',
    name: 'Farmacia San Roque',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    address: 'Calle Sucre N� 745',
    phone: '4 665 5678',
    neighborhood: 'San Roque',
    description: 'Comprometidos con tu bienestar y tu econom�a. Servicio r�pido y seguro para toda la vecindad.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'L�nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'L�nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'L�nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'L�nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'L�nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'L�nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'L�nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'L�nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'L�nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'L�nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'L�nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'L�nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Potos� N� 1230',
    phone: '4 611 2233',
    neighborhood: 'El Molino',
    description: 'Medicamentos originales, atenci�n profesional y los mejores precios de la zona sur.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'L�nea D', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'L�nea F', flagColor: 'Morado', proximity: 'A una cuadra' },
        { name: 'L�nea C', flagColor: 'Amarillo', proximity: 'A dos calles' },
        { name: 'L�nea E', flagColor: 'Verde', proximity: 'A tres cuadras' }
      ],
      taxitrufis: [
        { name: 'L�nea T', flagColor: 'Rojo con Blanco', proximity: 'Pasa por la puerta' },
        { name: 'L�nea S', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'L�nea R', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'L�nea Q', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'L�nea 7', flagColor: 'Morado', proximity: 'Pasa por la puerta' },
        { name: 'L�nea 8', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'L�nea 9', flagColor: 'Roja', proximity: 'A una calle' },
        { name: 'L�nea 10', flagColor: 'Azul', proximity: 'A dos cuadras' }
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
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    address: 'Av. V�ctor Paz Estenssoro N� 450',
    phone: '4 622 3344',
    neighborhood: 'Lourdes',
    description: 'Cuidamos tu salud y la de tu familia con productos de calidad y asesoramiento farmac�utico.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'L�nea G', flagColor: 'Naranja', proximity: 'Pasa por la puerta' },
        { name: 'L�nea A', flagColor: 'Rojo', proximity: 'A una cuadra' },
        { name: 'L�nea H', flagColor: 'Gris', proximity: 'A dos calles' },
        { name: 'L�nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'L�nea M', flagColor: 'Morado', proximity: 'Pasa por la puerta' },
        { name: 'L�nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos cuadras' },
        { name: 'L�nea D', flagColor: 'Roja', proximity: 'A dos calles' },
        { name: 'L�nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'L�nea 4', flagColor: 'Blanco', proximity: 'Pasa por la puerta' },
        { name: 'L�nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'L�nea 2', flagColor: 'Azul', proximity: 'A dos calles' },
        { name: 'L�nea 3', flagColor: 'Verde', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Lourdes', flagColor: '', proximity: '4 699 9999' },
        { name: 'Radio Centro', flagColor: '', proximity: '4 600 0000' }
      ]
    }
  },
  {
    id: 'p5',
    name: 'Farmacia San Mart�n',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San Mart�n N� 234',
    phone: '4 611 4455',
    neighborhood: 'San Mart�n',
    description: 'Tu farmacia de confianza con los mejores precios y atenci�n personalizada.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'L�nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'L�nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'L�nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'L�nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'L�nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'L�nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'L�nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'L�nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'L�nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'L�nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'L�nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'L�nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio M�vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p6',
    name: 'Farmacia Bol�var',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Bol�var N� 567',
    phone: '4 622 5566',
    neighborhood: 'Centro',
    description: 'Medicamentos originales y productos de cuidado personal con entrega a domicilio.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'L�nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'L�nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'L�nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'L�nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'L�nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'L�nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'L�nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'L�nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'L�nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'L�nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'L�nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'L�nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'p7',
    name: 'Farmacia Central',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&auto=format&fit=crop&q=80',
    address: 'Plaza Principal N° 100',
    phone: '4 633 6677',
    neighborhood: 'Centro',
    description: 'Atención farmacéutica profesional con surtido completo en medicamentos genéricos y de marca.',
    isOnDuty: true,
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p8',
    name: 'Farmacia Santa María',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop&q=80',
    address: 'Calle Santa María N° 345',
    phone: '4 644 7788',
    neighborhood: 'Santa María',
    description: 'Cuidamos la salud de tu familia con productos de calidad y precios accesibles.',
    isOnDuty: false,
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
    id: 'p9',
    name: 'Farmacia Los Andes',
    imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Los Andes N° 678',
    phone: '4 655 8899',
    neighborhood: 'Los Andes',
    description: 'Tu farmacia amiga con atención las 24 horas y los mejores precios del barrio.',
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
    id: 'p10',
    name: 'Farmacia La Paz',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    address: 'Av. La Paz N° 890',
    phone: '4 666 9900',
    neighborhood: 'La Paz',
    description: 'Amplio stock de medicamentos, vitaminas y productos de cuidado personal.',
    isOnDuty: true,
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p11',
    name: 'Farmacia San José',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San José N° 123',
    phone: '4 677 0011',
    neighborhood: 'San José',
    description: 'Atención farmacéutica de calidad con precios justos para toda la comunidad.',
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
    id: 'p12',
    name: 'Farmacia Virgen de Chaguaya',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Virgen de Chaguaya N° 456',
    phone: '4 688 1122',
    neighborhood: 'Chaguaya',
    description: 'Medicamentos y productos naturales al servicio de tu salud y bienestar.',
    isOnDuty: false,
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
    id: 'p13',
    name: 'Farmacia La Merced',
    imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&auto=format&fit=crop&q=80',
    address: 'Calle La Merced N° 789',
    phone: '4 699 2233',
    neighborhood: 'La Merced',
    description: 'Tu salud es primero. Atención personalizada y los mejores productos farmacéuticos.',
    isOnDuty: true,
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p14',
    name: 'Farmacia San Simón',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San Simón N° 321',
    phone: '4 600 3344',
    neighborhood: 'San Simón',
    description: 'Compromiso y calidad en cada medicamento que dispensamos.',
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
    id: 'p15',
    name: 'Farmacia San Miguel',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    address: 'Av. San Miguel N° 654',
    phone: '4 611 4455',
    neighborhood: 'San Miguel',
    description: 'Tu farmacia de barrio con trato amable y productos de calidad.',
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
    id: 'p16',
    name: 'Farmacia El Carmen',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format&fit=crop&q=80',
    address: 'Calle El Carmen N° 987',
    phone: '4 622 5566',
    neighborhood: 'El Carmen',
    description: 'Especialistas en salud familiar con amplia experiencia y vocación de servicio.',
    isOnDuty: false,
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p17',
    name: 'Farmacia San Pedro',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    address: 'Av. San Pedro N° 159',
    phone: '4 633 6677',
    neighborhood: 'San Pedro',
    description: 'Cuidamos tu bienestar con productos farmacéuticos de primera calidad.',
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
    id: 'p18',
    name: 'Farmacia La Colmena',
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=80',
    address: 'Calle La Colmena N° 753',
    phone: '4 644 7788',
    neighborhood: 'La Colmena',
    description: 'Atención rápida y eficiente con medicamentos para toda la familia.',
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
    id: 'p19',
    name: 'Farmacia San Juan',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
    address: 'Av. San Juan N° 246',
    phone: '4 655 8899',
    neighborhood: 'San Juan',
    description: 'Medicamentos de calidad con el mejor servicio farmacéutico del barrio.',
    isOnDuty: true,
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p20',
    name: 'Farmacia San Antonio',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San Antonio N° 357',
    phone: '4 666 9900',
    neighborhood: 'San Antonio',
    description: 'Responsabilidad y calidad en cada producto que ofrecemos.',
    isOnDuty: false,
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
    id: 'p21',
    name: 'Farmacia Del Valle',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Del Valle N° 468',
    phone: '4 677 0011',
    neighborhood: 'El Valle',
    description: 'La salud de tu familia es nuestra prioridad. Atención personalizada y precios justos.',
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
    id: 'p22',
    name: 'Farmacia Santa Cruz',
    imageUrl: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&auto=format&fit=crop&q=80',
    address: 'Calle Santa Cruz N° 579',
    phone: '4 688 1122',
    neighborhood: 'Santa Cruz',
    description: 'Comprometidos con tu salud y bienestar. Productos de calidad y servicio confiable.',
    isOnDuty: true,
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p23',
    name: 'Farmacia San Pablo',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San Pablo N° 680',
    phone: '4 699 2233',
    neighborhood: 'San Pablo',
    description: 'Atención farmacéutica de excelencia con productos originales y asesoría profesional.',
    isOnDuty: false,
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
    id: 'p24',
    name: 'Farmacia La Esperanza',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
    address: 'Av. La Esperanza N° 791',
    phone: '4 600 3344',
    neighborhood: 'La Esperanza',
    description: 'Más que una farmacia, tu aliado en salud. Atención las 24 horas.',
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
    id: 'p25',
    name: 'Farmacia San Jorge',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San Jorge N° 802',
    phone: '4 611 4455',
    neighborhood: 'San Jorge',
    description: 'Cuidamos tu salud con productos de calidad y el mejor servicio farmacéutico.',
    isOnDuty: true,
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
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
  },
  {
    id: 'e5',
    title: 'Festival de la Uva Tarijeña',
    imageUrl: 'https://picsum.photos/seed/evento5/600/400',
    category: 'Cultura',
    description: 'Celebración del Festival de la Uva con degustación de vinos, singanis y muestras gastronómicas típicas de la región.',
    icon: 'gift'
  },
  {
    id: 'e6',
    title: 'Feria de la Solidaridad Vecinal',
    imageUrl: 'https://picsum.photos/seed/evento6/600/400',
    category: 'Comunidad',
    description: 'Jornada de solidaridad con recolección de alimentos, ropa y medicamentos para las familias más necesitadas del barrio.',
    icon: 'users'
  },
  {
    id: 'e7',
    title: 'Curso de Primeros Auxilios',
    imageUrl: 'https://picsum.photos/seed/evento7/600/400',
    category: 'Salud',
    description: 'Taller gratuito de primeros auxilios y RCP básico impartido por personal médico del hospital municipal.',
    icon: 'heart-pulse'
  },
  {
    id: 'e8',
    title: 'Campaña de Seguridad Vecinal',
    imageUrl: 'https://picsum.photos/seed/evento8/600/400',
    category: 'Seguridad',
    description: 'Reunión con la policía comunitaria para coordinar estrategias de seguridad y prevención del delito en el barrio.',
    icon: 'users'
  },
  {
    id: 'e9',
    title: 'Festival de Música Folclórica',
    imageUrl: 'https://picsum.photos/seed/evento9/600/400',
    category: 'Cultura',
    description: 'Noche de música folclórica tarijeña con bandas locales, bailes tradicionales y comidas típicas.',
    icon: 'gift'
  },
  {
    id: 'e10',
    title: 'Taller de Reciclaje y Compostaje',
    imageUrl: 'https://picsum.photos/seed/evento10/600/400',
    category: 'Medio',
    description: 'Aprende a reciclar y crear tu propio compost casero para contribuir al cuidado del medio ambiente.',
    icon: 'trash'
  },
  {
    id: 'e11',
    title: 'Jornada de Descacharrización',
    imageUrl: 'https://picsum.photos/seed/evento11/600/400',
    category: 'Salud',
    description: 'Campaña de limpieza para eliminar criaderos de mosquitos y prevenir enfermedades como el dengue y la chikungunya.',
    icon: 'trash'
  },
  {
    id: 'e12',
    title: 'Concurso de Platos Típicos',
    imageUrl: 'https://picsum.photos/seed/evento12/600/400',
    category: 'Cultura',
    description: 'Competencia gastronómica donde los vecinos preparan y exhiben sus mejores platos típicos tarijeños.',
    icon: 'gift'
  },
  {
    id: 'e13',
    title: 'Torneo de Fútbol Interbarrial',
    imageUrl: 'https://picsum.photos/seed/evento13/600/400',
    category: 'Deportes',
    description: 'Campeonato deportivo que reúne a equipos de diferentes barrios para fomentar el compañerismo y la actividad física.',
    icon: 'users'
  },
  {
    id: 'e14',
    title: 'Charla sobre Ciberseguridad',
    imageUrl: 'https://picsum.photos/seed/evento14/600/400',
    category: 'Tecnologia',
    description: 'Capacitación gratuita sobre seguridad digital, protección de datos personales y prevención de estafas en línea.',
    icon: 'users'
  },
  {
    id: 'e15',
    title: 'Feria del Trueque Comunitario',
    imageUrl: 'https://picsum.photos/seed/evento15/600/400',
    category: 'Economia',
    description: 'Intercambio de libros, ropa, juguetes y artículos del hogar entre vecinos para promover la economía circular.',
    icon: 'gift'
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
  },
  {
    id: 'b16',
    name: 'Carnicería El Cortijo',
    imageUrl: 'https://picsum.photos/seed/negocio16/600/400',
    category: 'Carnicería',
    description: 'Carnes de res, cerdo y pollo de la mejor calidad. Cortes especiales y atención personalizada para tu mesa.',
    phone: '4 678 1122',
    address: 'Calle Carne #123, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Domingo', open: true, hours: '7:00 AM - 1:00 PM' }
    ],
    actionText: 'Ver Cortes',
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
    id: 'b17',
    name: 'Lavandería Burbuja',
    imageUrl: 'https://picsum.photos/seed/negocio17/600/400',
    category: 'Limpieza',
    description: 'Lavandería profesional con servicio de lavado, secado y planchado. Recogemos y entregamos a domicilio sin costo adicional.',
    phone: '4 679 2233',
    address: 'Calle Limpia #456, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Miércoles', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Sábado', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    isFreeDelivery: true,
    actionText: 'Solicitar Servicio',
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
    id: 'b18',
    name: 'Jardinería El Jardín Secreto',
    imageUrl: 'https://picsum.photos/seed/negocio18/600/400',
    category: 'Jardinería',
    description: 'Diseño y mantenimiento de jardines, poda de árboles, siembra de césped y asesoría en paisajismo para hogares y empresas.',
    phone: '4 680 3344',
    address: 'Calle Jardín #789, Barrio El Trigal',
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
    actionText: 'Solicitar Cotización',
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b19',
    name: 'Estudio Fotográfico Memorias',
    imageUrl: 'https://picsum.photos/seed/negocio19/600/400',
    category: 'Fotografía',
    description: 'Sesiones fotográficas profesionales para eventos, retratos, bodas, quince años y sesiones familiares. Calidad y creatividad en cada toma.',
    phone: '4 681 4455',
    address: 'Calle Foto #321, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.9',
    reviewsCount: 55,
    actionText: 'Ver Portafolio',
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
    id: 'b20',
    name: 'Veterinaria San Francisco',
    imageUrl: 'https://picsum.photos/seed/negocio20/600/400',
    category: 'Mascotas',
    description: 'Atención veterinaria general, consultas, vacunación, desparasitación y cirugías para mascotas. Todo para el bienestar de tu mejor amigo.',
    phone: '4 682 5566',
    address: 'Calle Mascota #654, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Agendar Cita',
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
    id: 'b21',
    name: 'Cerámica Artesanal Doña Rosa',
    imageUrl: 'https://picsum.photos/seed/negocio21/600/400',
    category: 'Cerámica',
    description: 'Cerámica artesanal hecha a mano. Vajillas, macetas, adornos y piezas decorativas únicas inspiradas en la cultura tarijeña.',
    phone: '4 683 6677',
    address: 'Calle Artesanos #987, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    isFreeDelivery: true,
    actionText: 'Ver Colección',
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b22',
    name: 'Joyería Luna de Plata',
    imageUrl: 'https://picsum.photos/seed/negocio22/600/400',
    category: 'Joyería',
    description: 'Joyas de plata y oro con diseños exclusivos. Anillos, collares, pulseras y aretes artesanales con piedras naturales de la región.',
    phone: '4 684 7788',
    address: 'Calle Joya #159, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Miércoles', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Sábado', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.8',
    reviewsCount: 43,
    actionText: 'Ver Colección',
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
    id: 'b23',
    name: 'Panadería El Trigal',
    imageUrl: 'https://picsum.photos/seed/negocio23/600/400',
    category: 'Panadería',
    description: 'Pan artesanal, empanadas, salteñas y masas finas horneadas diariamente. El auténtico sabor tarijeño en cada bocado.',
    phone: '4 685 8899',
    address: 'Calle Pan #357, Barrio El Trigal',
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
    id: 'b24',
    name: 'Heladería Copacabana',
    imageUrl: 'https://picsum.photos/seed/negocio24/600/400',
    category: 'Comida',
    description: 'Helados artesanales de sabores tradicionales e innovadores. Disfruta de nuestros batidos, malteadas y postres helados.',
    phone: '4 686 9900',
    address: 'Calle Helado #468, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Martes', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Miércoles', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Jueves', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Viernes', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Sábado', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 10:00 PM' }
    ],
    actionText: 'Ver Sabores',
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b25',
    name: 'Tienda Deportiva El Gol',
    imageUrl: 'https://picsum.photos/seed/negocio25/600/400',
    category: 'Deportes',
    description: 'Ropa y calzado deportivo, implementos para fútbol, básquet, running y gym. Todo para tu rendimiento deportivo.',
    phone: '4 687 0011',
    address: 'Calle Deporte #579, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 2:00 PM' }
    ],
    actionText: 'Ver Catálogo',
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
    id: 'b26',
    name: 'Clínica Dental Sonrisa Perfecta',
    imageUrl: 'https://picsum.photos/seed/negocio26/600/400',
    category: 'Salud',
    description: 'Servicios odontológicos completos: limpiezas, blanqueamientos, ortodoncia, implantes y cirugía dental.',
    phone: '4 688 1122',
    address: 'Calle Dental #680, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '8:00 AM - 1:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.7',
    reviewsCount: 78,
    actionText: 'Agendar Cita',
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
    id: 'b27',
    name: 'Taller de Bicicletas Ruedas Libres',
    imageUrl: 'https://picsum.photos/seed/negocio27/600/400',
    category: 'Mecánica',
    description: 'Reparación y mantenimiento de bicicletas de montaña y ciudad. Venta de repuestos, accesorios y servicios de tuning.',
    phone: '4 689 2233',
    address: 'Calle Bici #791, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Servicios',
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
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Móvil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b28',
    name: 'Electrodomésticos El Hogar Feliz',
    imageUrl: 'https://picsum.photos/seed/negocio28/600/400',
    category: 'Electrodomésticos',
    description: 'Venta de electrodomésticos para el hogar con las mejores marcas. Refrigeradores, lavadoras, cocinas y mucho más.',
    phone: '4 690 3344',
    address: 'Av. Comercial #802, Barrio El Trigal',
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
    rating: '4.6',
    reviewsCount: 62,
    actionText: 'Ver Ofertas',
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
    id: 'b29',
    name: 'Ropa Infantil Pequeñín',
    imageUrl: 'https://picsum.photos/seed/negocio29/600/400',
    category: 'Ropa',
    description: 'Ropa y accesorios para bebés y niños. Conjuntos, pijamas, vestidos y todo para los más pequeños con calidad y estilo.',
    phone: '4 691 4455',
    address: 'Calle Niño #913, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Colección',
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
    id: 'b30',
    name: 'Ferretería El Tornillo Feliz',
    imageUrl: 'https://picsum.photos/seed/negocio30/600/400',
    category: 'Ferretería',
    description: 'Todo en ferretería: herramientas, materiales de construcción, pintura, electricidad, plomería y artículos para el hogar.',
    phone: '4 692 5566',
    address: 'Calle Hierro #246, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Miércoles', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Sábado', open: true, hours: '7:00 AM - 7:00 PM' },
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
    date: '23 de mayo de 2024',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=60',
    ],
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
    date: '22 de mayo de 2024',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp3',
    name: 'Kiwi',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó el 21 de mayo por la mañana. Es un loro hablador, verde brillante con plumas amarillas en la cabeza.',
    lastSeen: 'Pasaje El Trigal',
    contact: '4 673 2211',
    neighborhood: 'El Trigal',
    date: '21 de mayo de 2024',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp4',
    name: 'Toby',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdió en la plaza central. Es un perro mestizo color marrón claro, de tamaño mediano, muy cariñoso.',
    lastSeen: 'Plaza Principal de Tarija',
    contact: '4 693 6677',
    neighborhood: 'Centro',
    date: '15 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp5',
    name: 'Misi',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó por la ventana. Es una gata blanca con manchas negras, ojos verdes y muy esquiva con extraños.',
    lastSeen: 'Calle Sucre #456',
    contact: '4 694 7788',
    neighborhood: 'San Roque',
    date: '14 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp6',
    name: 'Paco',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó de su jaula. Es un perico australiano azul y blanco, muy hablador, repite palabras.',
    lastSeen: 'Av. La Paz #789',
    contact: '4 695 8899',
    neighborhood: 'Centro',
    date: '13 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp7',
    name: 'Copito',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó del jardín. Es un conejo blanco de angora, ojos rosados, muy manso y dócil.',
    lastSeen: 'Calle Las Flores',
    contact: '4 696 9900',
    neighborhood: 'El Trigal',
    date: '12 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp8',
    name: 'Rocky',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdió durante un paseo. Es un Pitbull color marrón, de contextura fuerte, collar negro con placas.',
    lastSeen: 'Av. Potosí esq. Sucre',
    contact: '4 697 0011',
    neighborhood: 'El Molino',
    date: '11 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp9',
    name: 'Canela',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdió en la noche del 10 de junio. Es una gata naranja con rayas atigradas, muy cariñosa y maulladora.',
    lastSeen: 'Calle Comercio #321',
    contact: '4 698 1122',
    neighborhood: 'El Trigal',
    date: '10 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp10',
    name: 'Pelusa',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó de su jaula. Es un hámster sirio dorado, pequeño y muy rápido, con una mancha blanca en la cabeza.',
    lastSeen: 'Calle Junín #567',
    contact: '4 699 2233',
    neighborhood: 'San Roque',
    date: '9 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp11',
    name: 'Coco',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=600&auto=format&fit=crop&q=80',
    description: 'Desapareció del patio trasero. Es un Schnauzer miniatura gris, con barba y cejas pobladas, muy juguetón.',
    lastSeen: 'Av. San Martín #234',
    contact: '4 600 3344',
    neighborhood: 'San Martín',
    date: '8 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp12',
    name: 'Mimí',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&auto=format&fit=crop&q=80',
    description: 'No volvió a casa después de salir al anochecer. Es una gata tricolor blanca, negra y naranja, con collar azul.',
    lastSeen: 'Calle Bolívar #890',
    contact: '4 611 4455',
    neighborhood: 'San Jorge',
    date: '7 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp13',
    name: 'Piolín',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó mientras limpiaban su jaula. Es un canario amarillo brillante, canta muy bonito y no tiene anillo.',
    lastSeen: 'Av. Las Américas #123',
    contact: '4 622 5566',
    neighborhood: 'Las Américas',
    date: '6 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp14',
    name: 'Tortu',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=600&auto=format&fit=crop&q=80',
    description: 'Desapareció del jardín. Es una tortuga de tierra mediana, caparazón marrón oscuro y muy lenta pero resistente.',
    lastSeen: 'Calle Libertad #456',
    contact: '4 633 6677',
    neighborhood: 'La Merced',
    date: '5 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp15',
    name: 'Bruno',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdió persiguiendo a otro perro. Es un Labrador retriever color chocolate, grande y muy amigable.',
    lastSeen: 'Av. Circunvalación',
    contact: '4 644 7788',
    neighborhood: 'Lourdes',
    date: '4 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp16',
    name: 'Nina',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=600&auto=format&fit=crop&q=80',
    description: 'No regresó a casa después del anochecer. Es una gata negra de pelo corto, ojos amarillos y collar rojo con cascabel.',
    lastSeen: 'Calle Cochabamba #789',
    contact: '4 655 8899',
    neighborhood: 'San Roque',
    date: '3 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp17',
    name: 'Loro',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&auto=format&fit=crop&q=80',
    description: 'Voló de su percha en el patio. Es un loro cabeza amarilla, verde con amarillo, dice frases completas.',
    lastSeen: 'Av. Víctor Paz #567',
    contact: '4 666 9900',
    neighborhood: 'Lourdes',
    date: '2 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp18',
    name: 'Cometa',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó de su terrario. Es un hurón color marrón claro con vientre blanco, muy travieso y juguetón.',
    lastSeen: 'Calle Santa Cruz #345',
    contact: '4 677 0011',
    neighborhood: 'Santa Cruz',
    date: '1 de junio de 2026',
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp19',
    name: 'Rex',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&auto=format&fit=crop&q=80',
    description: 'Saltó la cerca del jardín. Es un Pastor Alemán negro con marcas color canela, grande y protector.',
    lastSeen: 'Calle Del Valle #678',
    contact: '4 688 1122',
    neighborhood: 'Del Valle',
    date: '31 de mayo de 2026',
    images: [
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 'lp20',
    name: 'Burbuja',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapó de su jaula mientras la limpiaban. Es una cobaya (conejillo de Indias) blanca con manchas marrones.',
    lastSeen: 'Calle Potosí #901',
    contact: '4 699 2233',
    neighborhood: 'El Molino',
    date: '30 de mayo de 2026',
    images: [
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60',
    ],
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
    imageUrl: 'https://picsum.photos/seed/noticia2/600/400',
    category: 'Politica',
    description: 'El Concejo Municipal de Tarija aprobó en primera instancia el presupuesto anual 2026 por un monto de 450 millones de bolivianos. Los recursos estarán destinados principalmente a obras de infraestructura vial, mejoramiento de servicios básicos y programas sociales para las zonas periurbanas del municipio.',
    icon: 'users',
    date: 'Viernes, 27 de Junio de 2026',
    location: 'Concejo Municipal, Tarija'
  },
  {
    id: 'n3',
    title: 'Tarija se corona campeón del torneo nacional de fútbol',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80',
    category: 'Deportes',
    description: 'El equipo de fútbol de Tarija se consagró campeón del torneo nacional de la COFA después de vencer 3-1 al equipo de Cochabamba en una final disputada en el Estadio IV Centenarios. Miles de tarijeños celebraron en las calles el título obtenido tras 15 años de sequía deportiva.',
    icon: 'users',
    date: 'Domingo, 29 de Junio de 2026',
    location: 'Estadio IV Centenarios, Tarija'
  },
  {
    id: 'n4',
    title: 'Crecen las exportaciones de uva tarijeña al mercado europeo',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&auto=format&fit=crop&q=80',
    category: 'Transporte',
    description: 'La Gobernación de Tarija inició la construcción de un nuevo puente vehicular sobre el río Guadalquivir que conectará los distritos 6 y 7 de la ciudad. La obra, con una inversión de 35 millones de bolivianos, beneficiará a más de 40.000 habitantes y permitirá descongestionar el tráfico en el puente San Martín, actualmente colapsado en horas pico.',
    icon: 'users',
    date: 'Lunes, 16 de Junio de 2026',
    location: 'Río Guadalquivir, Tarija'
  },
  {
    id: 'n16',
    title: 'Festival del Singani Tarijeño atrae a turistas nacionales',
    imageUrl: 'https://picsum.photos/seed/noticia16/600/400',
    category: 'Turismo',
    description: 'El Festival del Singani Tarijeño 2026 rompió récord de asistencia con más de 15 mil visitantes durante el fin de semana. Productores locales ofrecieron degustaciones y recorridos por las bodegas más tradicionales del Valle Central.',
    icon: 'gift',
    date: 'Domingo, 13 de Julio de 2026',
    location: 'Valle Central, Tarija'
  },
  {
    id: 'n17',
    title: 'Campaña de alfabetización digital para adultos mayores',
    imageUrl: 'https://picsum.photos/seed/noticia17/600/400',
    category: 'Tecnologia',
    description: 'La Alcaldía de Tarija lanzó un programa gratuito de alfabetización digital dirigido a adultos mayores. Los cursos incluyen uso de smartphones, redes sociales, banca en línea y trámites digitales para reducir la brecha tecnológica.',
    icon: 'users',
    date: 'Viernes, 11 de Julio de 2026',
    location: 'Casas de la Cultura, Tarija'
  },
  {
    id: 'n18',
    title: 'Inauguran nuevo parque ecológico en la zona norte',
    imageUrl: 'https://picsum.photos/seed/noticia18/600/400',
    category: 'Medio',
    description: 'La Gobernación inauguró el Parque Ecológico Norte con 5 hectáreas de áreas verdes, juegos infantiles, ciclovía y laguna artificial. El espacio beneficiará a más de 20 mil vecinos de los distritos 1 y 2.',
    icon: 'trash',
    date: 'Miércoles, 9 de Julio de 2026',
    location: 'Zona Norte, Tarija'
  },
  {
    id: 'n19',
    title: 'Productores tarijeños baten récord de producción de vino',
    imageUrl: 'https://picsum.photos/seed/noticia19/600/400',
    category: 'Economia',
    description: 'La cosecha de uva 2026 en Tarija alcanzó un récord histórico de 850 mil toneladas, superando en un 20% la producción del año anterior. Los vitivinicultores atribuyen el incremento a las condiciones climáticas favorables.',
    icon: 'gift',
    date: 'Lunes, 7 de Julio de 2026',
    location: 'Valle Central de Tarija'
  },
  {
    id: 'n20',
    title: 'Tarija acoge el torneo nacional de ajedrez juvenil',
    imageUrl: 'https://picsum.photos/seed/noticia20/600/400',
    category: 'Deportes',
    description: 'Más de 120 jóvenes ajedrecistas de todo el país participan en el Torneo Nacional de Ajedrez Juvenil que se realiza en el Centro de Convenciones de Tarija. El evento promueve el pensamiento estratégico y la sana competencia.',
    icon: 'users',
    date: 'Sábado, 5 de Julio de 2026',
    location: 'Centro de Convenciones, Tarija'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'pr1',
    title: 'Empedrado de Calles',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80',
    category: 'INFRAESTRUCTURA',
    description: 'Mejoramiento de las calles del barrio para brindar mayor seguridad, durabilidad y una mejor calidad de vida para todos los vecinos.',
    location: 'Calles principales del barrio',
    status: 'En Progreso'
  },
  {
    id: 'pr2',
    title: 'Gas Domiciliario',
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80',
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
  },
  {
    id: 'pr4',
    title: 'Construcción de Plaza Principal',
    imageUrl: 'https://picsum.photos/seed/proyecto4/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'Construcción de una nueva plaza con áreas verdes, juegos infantiles, bancas y espacios de recreación para la comunidad.',
    location: 'Centro del barrio',
    status: 'En Progreso'
  },
  {
    id: 'pr5',
    title: 'Red de Alcantarillado Sanitario',
    imageUrl: 'https://picsum.photos/seed/proyecto5/600/400',
    category: 'SERVICIOS',
    description: 'Instalación de red de alcantarillado sanitario para mejorar las condiciones de salubridad y saneamiento básico en el barrio.',
    location: 'Sectores noreste y este',
    status: 'Planificado'
  },
  {
    id: 'pr6',
    title: 'Cámaras de Seguridad',
    imageUrl: 'https://picsum.photos/seed/proyecto6/600/400',
    category: 'SEGURIDAD',
    description: 'Instalación de cámaras de videovigilancia en puntos estratégicos para mejorar la seguridad y prevención del delito en el barrio.',
    location: 'Accesos principales y plazas',
    status: 'En Progreso'
  },
  {
    id: 'pr7',
    title: 'Parque Infantil Recreativo',
    imageUrl: 'https://picsum.photos/seed/proyecto7/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'Construcción de un parque infantil con juegos modernos, áreas verdes y espacios seguros para la recreación de los niños del barrio.',
    location: 'Calle Los Niños',
    status: 'Planificado'
  },
  {
    id: 'pr8',
    title: 'Fibra Óptica Vecinal',
    imageUrl: 'https://picsum.photos/seed/proyecto8/600/400',
    category: 'SERVICIOS',
    description: 'Llevar internet de alta velocidad mediante fibra óptica a todos los hogares del barrio para reducir la brecha digital.',
    location: 'Todo el barrio',
    status: 'En Progreso'
  },
  {
    id: 'pr9',
    title: 'Muros de Contención',
    imageUrl: 'https://picsum.photos/seed/proyecto9/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'Construcción de muros de contención para prevenir deslizamientos y proteger las viviendas en zonas de ladera del barrio.',
    location: 'Zonas de ladera',
    status: 'En Progreso'
  },
  {
    id: 'pr10',
    title: 'Alumbrado Público LED',
    imageUrl: 'https://picsum.photos/seed/proyecto10/600/400',
    category: 'SERVICIOS',
    description: 'Reemplazo de luminarias tradicionales por tecnología LED de bajo consumo para mejorar la iluminación y seguridad nocturna.',
    location: 'Calles y avenidas principales',
    status: 'Completado'
  },
  {
    id: 'pr11',
    title: 'Puesto de Salud Vecinal',
    imageUrl: 'https://picsum.photos/seed/proyecto11/600/400',
    category: 'SERVICIOS',
    description: 'Construcción de un puesto de salud con atención primaria, farmacia básica y consultorio médico para la comunidad.',
    location: 'Av. Principal esq. Sucre',
    status: 'Planificado'
  },
  {
    id: 'pr12',
    title: 'Señalización Vial',
    imageUrl: 'https://picsum.photos/seed/proyecto12/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'Colocación de señales de tránsito, reductores de velocidad y pasos peatonales para mejorar la seguridad vial en el barrio.',
    location: 'Intersecciones y avenidas',
    status: 'Completado'
  },
  {
    id: 'pr13',
    title: 'Botón de Pánico Vecinal',
    imageUrl: 'https://picsum.photos/seed/proyecto13/600/400',
    category: 'SEGURIDAD',
    description: 'Implementación de un sistema de botón de pánico conectado a la central de monitoreo para emergencias vecinales.',
    location: 'Todo el barrio',
    status: 'Planificado'
  },
  {
    id: 'pr14',
    title: 'Cancha Polifuncional',
    imageUrl: 'https://picsum.photos/seed/proyecto14/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'Construcción de una cancha deportiva multiusos para fútbol, básquet y vóley, con graderías e iluminación LED.',
    location: 'Calle Deportiva',
    status: 'En Progreso'
  },
  {
    id: 'pr15',
    title: 'Puntos de Reciclaje',
    imageUrl: 'https://picsum.photos/seed/proyecto15/600/400',
    category: 'SERVICIOS',
    description: 'Instalación de puntos limpios de reciclaje con contenedores diferenciados para promover la separación de residuos.',
    location: 'Esquinas principales',
    status: 'Planificado'
  }
];

export const FOUND_PETS_DATA: LostPet[] = [
  {
    id: 'fp1',
    name: 'Conejo Blanco',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la calle Potosí. Es una cobaya blanca con manchas marrones, muy dócil. Entregar a la dueña.',
    lastSeen: 'Calle Potosí #901',
    contact: '4 611 2233',
    neighborhood: 'El Molino',
    date: '28 de mayo de 2026'
  },
  {
    id: 'fp2',
    name: 'Pastor Alemán',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado deambulando en la Calle Del Valle. Es un Pastor Alemán negro con marcas canela, muy protector. Busca a su dueño.',
    lastSeen: 'Calle Del Valle #678',
    contact: '4 622 3344',
    neighborhood: 'Del Valle',
    date: '27 de mayo de 2026'
  },
  {
    id: 'fp3',
    name: 'Tortuga de Tierra',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrada en la Calle Santa Cruz. Tortuga de tierra de caparazón marrón, caminaba sola por la vereda.',
    lastSeen: 'Calle Santa Cruz #345',
    contact: '4 633 4455',
    neighborhood: 'Santa Cruz',
    date: '26 de mayo de 2026'
  },
  {
    id: 'fp4',
    name: 'Loro Hablador',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado posado en un árbol de la Av. Víctor Paz. Loro cabeza amarilla que dice frases completas. Está asustado.',
    lastSeen: 'Av. Víctor Paz #567',
    contact: '4 644 5566',
    neighborhood: 'Lourdes',
    date: '25 de mayo de 2026'
  },
  {
    id: 'fp5',
    name: 'Gata Negra',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrada en la Calle Cochabamba. Gata negra de pelo corto, ojos amarillos, collar rojo. Muy cariñosa.',
    lastSeen: 'Calle Cochabamba #789',
    contact: '4 655 6677',
    neighborhood: 'San Roque',
    date: '24 de mayo de 2026'
  },
  {
    id: 'fp6',
    name: 'Labrador Chocolate',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Av. Circunvalación. Labrador retriever color chocolate, grande y amigable. Tiene collar azul.',
    lastSeen: 'Av. Circunvalación',
    contact: '4 666 7788',
    neighborhood: 'Lourdes',
    date: '23 de mayo de 2026'
  },
  {
    id: 'fp7',
    name: 'Conejo de Angora',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Calle Libertad. Conejo blanco de angora, muy manso. Estaba en un jardín comiendo pasto.',
    lastSeen: 'Calle Libertad #456',
    contact: '4 677 8899',
    neighborhood: 'La Merced',
    date: '22 de mayo de 2026'
  },
  {
    id: 'fp8',
    name: 'Canario Amarillo',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Av. Las Américas. Canario amarillo brillante que canta muy bonito. Tiene un anillo en la pata.',
    lastSeen: 'Av. Las Américas #123',
    contact: '4 688 9900',
    neighborhood: 'Las Américas',
    date: '21 de mayo de 2026'
  },
  {
    id: 'fp9',
    name: 'Gata Tricolor',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrada en la Calle Bolívar. Gata tricolor blanca, negra y naranja. Muy maulladora, busca a sus dueños.',
    lastSeen: 'Calle Bolívar #890',
    contact: '4 699 0011',
    neighborhood: 'San Jorge',
    date: '20 de mayo de 2026'
  },
  {
    id: 'fp10',
    name: 'Schnauzer Gris',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Av. San Martín. Schnauzer miniatura gris con barba poblada. Tiene collar rojo con identificación.',
    lastSeen: 'Av. San Martín #234',
    contact: '4 600 1122',
    neighborhood: 'San Martín',
    date: '19 de mayo de 2026'
  },
  {
    id: 'fp11',
    name: 'Hámster Dorado',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Calle Junín. Hámster sirio dorado, pequeño y rápido. Corría por el pasillo de un edificio.',
    lastSeen: 'Calle Junín #567',
    contact: '4 611 2233',
    neighborhood: 'San Roque',
    date: '18 de mayo de 2026'
  },
  {
    id: 'fp12',
    name: 'Gata Naranja',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrada en la Calle Comercio. Gata naranja con rayas atigradas, muy cariñosa. Estaba maullando en la puerta de una tienda.',
    lastSeen: 'Calle Comercio #321',
    contact: '4 622 3344',
    neighborhood: 'El Trigal',
    date: '17 de mayo de 2026'
  },
  {
    id: 'fp13',
    name: 'Pitbull Marrón',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Av. Potosí. Pitbull color marrón, collar negro con placas. Estaba amarrado a un poste.',
    lastSeen: 'Av. Potosí esq. Sucre',
    contact: '4 633 4455',
    neighborhood: 'El Molino',
    date: '16 de mayo de 2026'
  },
  {
    id: 'fp14',
    name: 'Conejo Blanco',
    type: 'Otras mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Calle Las Flores. Conejo blanco de angora, ojos rosados. Estaba en un parque cercano.',
    lastSeen: 'Calle Las Flores',
    contact: '4 644 5566',
    neighborhood: 'El Trigal',
    date: '15 de mayo de 2026'
  },
  {
    id: 'fp15',
    name: 'Perico Australiano',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Av. La Paz. Perico australiano azul y blanco, muy hablador. Repite palabras y silba canciones.',
    lastSeen: 'Av. La Paz #789',
    contact: '4 655 6677',
    neighborhood: 'Centro',
    date: '14 de mayo de 2026'
  }
];
