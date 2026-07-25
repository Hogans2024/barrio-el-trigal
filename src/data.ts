import { Pharmacy, NeighborhoodEvent, LocalBusiness, LostPet, Project } from './types';

export const PHARMACIES_DATA: Pharmacy[] = [
  {
    id: 'p1',
    name: 'Farmacia Kurmi',
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    address: 'Av. La Paz esq. O\'Connor',
    phone: '4 664 1234',
    neighborhood: 'Centro',
    description: 'Atenciï¿½n las 24 horas con una amplia variedad de medicamentos y productos de cuidado personal.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Lï¿½nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Lï¿½nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'Lï¿½nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Lï¿½nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Lï¿½nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Lï¿½nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Mï¿½vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p2',
    name: 'Farmacia San Roque',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    address: 'Calle Sucre Nï¿½ 745',
    phone: '4 665 5678',
    neighborhood: 'San Roque',
    description: 'Comprometidos con tu bienestar y tu economï¿½a. Servicio rï¿½pido y seguro para toda la vecindad.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Lï¿½nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Lï¿½nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'Lï¿½nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Lï¿½nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Lï¿½nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    address: 'Av. Potosï¿½ Nï¿½ 1230',
    phone: '4 611 2233',
    neighborhood: 'El Molino',
    description: 'Medicamentos originales, atenciï¿½n profesional y los mejores precios de la zona sur.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Lï¿½nea D', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea F', flagColor: 'Morado', proximity: 'A una cuadra' },
        { name: 'Lï¿½nea C', flagColor: 'Amarillo', proximity: 'A dos calles' },
        { name: 'Lï¿½nea E', flagColor: 'Verde', proximity: 'A tres cuadras' }
      ],
      taxitrufis: [
        { name: 'Lï¿½nea T', flagColor: 'Rojo con Blanco', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea S', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea R', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea Q', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Lï¿½nea 7', flagColor: 'Morado', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea 8', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea 9', flagColor: 'Roja', proximity: 'A una calle' },
        { name: 'Lï¿½nea 10', flagColor: 'Azul', proximity: 'A dos cuadras' }
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
    address: 'Av. Vï¿½ctor Paz Estenssoro Nï¿½ 450',
    phone: '4 622 3344',
    neighborhood: 'Lourdes',
    description: 'Cuidamos tu salud y la de tu familia con productos de calidad y asesoramiento farmacï¿½utico.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Lï¿½nea G', flagColor: 'Naranja', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea A', flagColor: 'Rojo', proximity: 'A una cuadra' },
        { name: 'Lï¿½nea H', flagColor: 'Gris', proximity: 'A dos calles' },
        { name: 'Lï¿½nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'Lï¿½nea M', flagColor: 'Morado', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea D', flagColor: 'Roja', proximity: 'A dos calles' },
        { name: 'Lï¿½nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Lï¿½nea 4', flagColor: 'Blanco', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea 2', flagColor: 'Azul', proximity: 'A dos calles' },
        { name: 'Lï¿½nea 3', flagColor: 'Verde', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Lourdes', flagColor: '', proximity: '4 699 9999' },
        { name: 'Radio Centro', flagColor: '', proximity: '4 600 0000' }
      ]
    }
  },
  {
    id: 'p5',
    name: 'Farmacia San Martï¿½n',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San Martï¿½n Nï¿½ 234',
    phone: '4 611 4455',
    neighborhood: 'San Martï¿½n',
    description: 'Tu farmacia de confianza con los mejores precios y atenciï¿½n personalizada.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Lï¿½nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Lï¿½nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'Lï¿½nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Lï¿½nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'Lï¿½nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Lï¿½nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio Mï¿½vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p6',
    name: 'Farmacia Bolï¿½var',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Bolï¿½var Nï¿½ 567',
    phone: '4 622 5566',
    neighborhood: 'Centro',
    description: 'Medicamentos originales y productos de cuidado personal con entrega a domicilio.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'Lï¿½nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'Lï¿½nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'Lï¿½nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'Lï¿½nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'Lï¿½nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'Lï¿½nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'Lï¿½nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    address: 'Plaza Principal NÂ° 100',
    phone: '4 633 6677',
    neighborhood: 'Centro',
    description: 'AtenciÃ³n farmacÃ©utica profesional con surtido completo en medicamentos genÃ©ricos y de marca.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p8',
    name: 'Farmacia Santa MarÃ­a',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop&q=80',
    address: 'Calle Santa MarÃ­a NÂ° 345',
    phone: '4 644 7788',
    neighborhood: 'Santa MarÃ­a',
    description: 'Cuidamos la salud de tu familia con productos de calidad y precios accesibles.',
    isOnDuty: false,
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p9',
    name: 'Farmacia Los Andes',
    imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Los Andes NÂ° 678',
    phone: '4 655 8899',
    neighborhood: 'Los Andes',
    description: 'Tu farmacia amiga con atenciÃ³n las 24 horas y los mejores precios del barrio.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    address: 'Av. La Paz NÂ° 890',
    phone: '4 666 9900',
    neighborhood: 'La Paz',
    description: 'Amplio stock de medicamentos, vitaminas y productos de cuidado personal.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p11',
    name: 'Farmacia San JosÃ©',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San JosÃ© NÂ° 123',
    phone: '4 677 0011',
    neighborhood: 'San JosÃ©',
    description: 'AtenciÃ³n farmacÃ©utica de calidad con precios justos para toda la comunidad.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p12',
    name: 'Farmacia Virgen de Chaguaya',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Virgen de Chaguaya NÂ° 456',
    phone: '4 688 1122',
    neighborhood: 'Chaguaya',
    description: 'Medicamentos y productos naturales al servicio de tu salud y bienestar.',
    isOnDuty: false,
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    address: 'Calle La Merced NÂ° 789',
    phone: '4 699 2233',
    neighborhood: 'La Merced',
    description: 'Tu salud es primero. AtenciÃ³n personalizada y los mejores productos farmacÃ©uticos.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p14',
    name: 'Farmacia San SimÃ³n',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San SimÃ³n NÂ° 321',
    phone: '4 600 3344',
    neighborhood: 'San SimÃ³n',
    description: 'Compromiso y calidad en cada medicamento que dispensamos.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p15',
    name: 'Farmacia San Miguel',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    address: 'Av. San Miguel NÂ° 654',
    phone: '4 611 4455',
    neighborhood: 'San Miguel',
    description: 'Tu farmacia de barrio con trato amable y productos de calidad.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    address: 'Calle El Carmen NÂ° 987',
    phone: '4 622 5566',
    neighborhood: 'El Carmen',
    description: 'Especialistas en salud familiar con amplia experiencia y vocaciÃ³n de servicio.',
    isOnDuty: false,
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p17',
    name: 'Farmacia San Pedro',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    address: 'Av. San Pedro NÂ° 159',
    phone: '4 633 6677',
    neighborhood: 'San Pedro',
    description: 'Cuidamos tu bienestar con productos farmacÃ©uticos de primera calidad.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p18',
    name: 'Farmacia La Colmena',
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=80',
    address: 'Calle La Colmena NÂ° 753',
    phone: '4 644 7788',
    neighborhood: 'La Colmena',
    description: 'AtenciÃ³n rÃ¡pida y eficiente con medicamentos para toda la familia.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    address: 'Av. San Juan NÂ° 246',
    phone: '4 655 8899',
    neighborhood: 'San Juan',
    description: 'Medicamentos de calidad con el mejor servicio farmacÃ©utico del barrio.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p20',
    name: 'Farmacia San Antonio',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San Antonio NÂ° 357',
    phone: '4 666 9900',
    neighborhood: 'San Antonio',
    description: 'Responsabilidad y calidad en cada producto que ofrecemos.',
    isOnDuty: false,
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p21',
    name: 'Farmacia Del Valle',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&auto=format&fit=crop&q=80',
    address: 'Av. Del Valle NÂ° 468',
    phone: '4 677 0011',
    neighborhood: 'El Valle',
    description: 'La salud de tu familia es nuestra prioridad. AtenciÃ³n personalizada y precios justos.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    address: 'Calle Santa Cruz NÂ° 579',
    phone: '4 688 1122',
    neighborhood: 'Santa Cruz',
    description: 'Comprometidos con tu salud y bienestar. Productos de calidad y servicio confiable.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p23',
    name: 'Farmacia San Pablo',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    address: 'Calle San Pablo NÂ° 680',
    phone: '4 699 2233',
    neighborhood: 'San Pablo',
    description: 'AtenciÃ³n farmacÃ©utica de excelencia con productos originales y asesorÃ­a profesional.',
    isOnDuty: false,
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'p24',
    name: 'Farmacia La Esperanza',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
    address: 'Av. La Esperanza NÂ° 791',
    phone: '4 600 3344',
    neighborhood: 'La Esperanza',
    description: 'MÃ¡s que una farmacia, tu aliado en salud. AtenciÃ³n las 24 horas.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    address: 'Calle San Jorge NÂ° 802',
    phone: '4 611 4455',
    neighborhood: 'San Jorge',
    description: 'Cuidamos tu salud con productos de calidad y el mejor servicio farmacÃ©utico.',
    isOnDuty: true,
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
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
    description: 'Jornada de limpieza en calles, parques y espacios pÃºblicos para mantener nuestro barrio limpio y agradable para todos.',
    icon: 'trash'
  },
  {
    id: 'e2',
    title: 'ReuniÃ³n Asamblea General del Barrio',
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
    description: 'Celebramos un aÃ±o mÃ¡s de historia, uniÃ³n y logros como comunidad. Â¡HabrÃ¡ mÃºsica, sorpresas y mucha alegrÃ­a!',
    icon: 'gift'
  },
  {
    id: 'e4',
    title: 'VacunaciÃ³n de Mascotas del Barrio',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=80',
    category: 'Salud',
    description: 'Jornada de vacunaciÃ³n gratuita para perros y gatos del barrio. Protege a tu mascota y cuida su salud vecinal.',
    icon: 'heart-pulse'
  },
  {
    id: 'e5',
    title: 'Festival de la Uva TarijeÃ±a',
    imageUrl: 'https://picsum.photos/seed/evento5/600/400',
    category: 'Cultura',
    description: 'CelebraciÃ³n del Festival de la Uva con degustaciÃ³n de vinos, singanis y muestras gastronÃ³micas tÃ­picas de la regiÃ³n.',
    icon: 'gift'
  },
  {
    id: 'e6',
    title: 'Feria de la Solidaridad Vecinal',
    imageUrl: 'https://picsum.photos/seed/evento6/600/400',
    category: 'Comunidad',
    description: 'Jornada de solidaridad con recolecciÃ³n de alimentos, ropa y medicamentos para las familias mÃ¡s necesitadas del barrio.',
    icon: 'users'
  },
  {
    id: 'e7',
    title: 'Curso de Primeros Auxilios',
    imageUrl: 'https://picsum.photos/seed/evento7/600/400',
    category: 'Salud',
    description: 'Taller gratuito de primeros auxilios y RCP bÃ¡sico impartido por personal mÃ©dico del hospital municipal.',
    icon: 'heart-pulse'
  },
  {
    id: 'e8',
    title: 'CampaÃ±a de Seguridad Vecinal',
    imageUrl: 'https://picsum.photos/seed/evento8/600/400',
    category: 'Seguridad',
    description: 'ReuniÃ³n con la policÃ­a comunitaria para coordinar estrategias de seguridad y prevenciÃ³n del delito en el barrio.',
    icon: 'users'
  },
  {
    id: 'e9',
    title: 'Festival de MÃºsica FolclÃ³rica',
    imageUrl: 'https://picsum.photos/seed/evento9/600/400',
    category: 'Cultura',
    description: 'Noche de mÃºsica folclÃ³rica tarijeÃ±a con bandas locales, bailes tradicionales y comidas tÃ­picas.',
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
    title: 'Jornada de DescacharrizaciÃ³n',
    imageUrl: 'https://picsum.photos/seed/evento11/600/400',
    category: 'Salud',
    description: 'CampaÃ±a de limpieza para eliminar criaderos de mosquitos y prevenir enfermedades como el dengue y la chikungunya.',
    icon: 'trash'
  },
  {
    id: 'e12',
    title: 'Concurso de Platos TÃ­picos',
    imageUrl: 'https://picsum.photos/seed/evento12/600/400',
    category: 'Cultura',
    description: 'Competencia gastronÃ³mica donde los vecinos preparan y exhiben sus mejores platos tÃ­picos tarijeÃ±os.',
    icon: 'gift'
  },
  {
    id: 'e13',
    title: 'Torneo de FÃºtbol Interbarrial',
    imageUrl: 'https://picsum.photos/seed/evento13/600/400',
    category: 'Deportes',
    description: 'Campeonato deportivo que reÃºne a equipos de diferentes barrios para fomentar el compaÃ±erismo y la actividad fÃ­sica.',
    icon: 'users'
  },
  {
    id: 'e14',
    title: 'Charla sobre Ciberseguridad',
    imageUrl: 'https://picsum.photos/seed/evento14/600/400',
    category: 'Tecnologia',
    description: 'CapacitaciÃ³n gratuita sobre seguridad digital, protecciÃ³n de datos personales y prevenciÃ³n de estafas en lÃ­nea.',
    icon: 'users'
  },
  {
    id: 'e15',
    title: 'Feria del Trueque Comunitario',
    imageUrl: 'https://picsum.photos/seed/evento15/600/400',
    category: 'Economia',
    description: 'Intercambio de libros, ropa, juguetes y artÃ­culos del hogar entre vecinos para promover la economÃ­a circular.',
    icon: 'gift'
  }
];

export const BUSINESSES_DATA: LocalBusiness[] = [
  {
    id: 'b1',
    name: 'La Parrilla del Trigal',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    category: 'Comida',
    description: 'Disfruta de una experiencia gastronÃ³mica Ãºnica con los mejores cortes de carne, parrilladas artesanales y una atmÃ³sfera familiar inigualable en pleno corazÃ³n del barrio.',
    phone: '+591 69835999',
    phones: ['+591 69835999', '4 663 2256', '4 601 2345'],
    address: 'Calle Comercio #456, entre BolÃ­var y Sucre, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Martes', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Jueves', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Viernes', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '11:00 AM - 11:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.9',
    reviewsCount: 120,
    actionText: 'Ver MenÃº',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b2',
    name: 'Boutique Estilo Real',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    category: 'Ropa',
    description: 'Descubre las Ãºltimas tendencias en moda para dama y caballero. Ropa de calidad con diseÃ±os exclusivos que resaltan tu estilo personal.',
    phone: '+591 69835999',
    address: 'Avenida Principal #789, Local 3, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 2:00 PM' }
    ],
    actionText: 'Explorar',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    description: 'Frutas frescas, verduras de temporada y vÃ­veres de primera necesidad los encuentras aquÃ­. Productos traÃ­dos directamente del campo a tu mesa.',
    phone: '+591 69835999',
    phones: ['+591 69835999', '4 665 7789'],
    address: 'Plaza Central #12, Puesto 5, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Martes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Jueves', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Viernes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Domingo', open: true, hours: '6:00 AM - 9:00 PM' }
    ],
    distanceInfo: 'A 200m de la Plaza Central',
    actionText: 'Pedir Ya',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b4',
    name: 'Vivero Oasis Verde',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    category: 'Plantas',
    description: 'Transforma tu hogar con nuestras plantas de interior y exterior. Macetas decorativas, sustratos y asesorÃ­a personalizada para tus espacios verdes.',
    phone: '4 666 9900',
    address: 'Calle Las Flores #234, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    isFreeDelivery: true,
    actionText: 'CatÃ¡logo',
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b5',
    name: 'PizzerÃ­a Don Remigio',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    category: 'Comida',
    description: 'Las mejores pizzas artesanales horneadas en horno de leÃ±a. Masa crujiente, ingredientes frescos y el autÃ©ntico sabor italiano en cada bocado.',
    phone: '4 667 1133',
    phones: ['4 667 1133', '4 667 1134'],
    address: 'Calle BolÃ­var #321, Esquina San MartÃ­n, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: false, hours: 'Cerrado' },
      { day: 'Martes', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'Jueves', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'Viernes', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'SÃ¡bado', open: true, hours: '6:00 PM - 11:30 PM' },
      { day: 'Domingo', open: true, hours: '6:00 PM - 11:30 PM' }
    ],
    rating: '4.7',
    reviewsCount: 85,
    actionText: 'Ver MenÃº',
    transport: {
      micros: [
        { name: 'LÃ­nea D', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea L', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b6',
    name: 'TechPro Servicios',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=80',
    category: 'TecnologÃ­a',
    description: 'ReparaciÃ³n y mantenimiento de computadoras, venta de accesorios tecnolÃ³gicos y asesorÃ­a informÃ¡tica para toda la comunidad del barrio.',
    phone: '4 668 5544',
    address: 'Avenida TecnolÃ³gica #567, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 1:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Equipos',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b7',
    name: 'SalÃ³n y Spa Divino',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80',
    category: 'Belleza',
    description: 'Cortes de cabello modernos, tratamientos capilares, manicura y pedicura profesional. RelÃ¡jate y renueva tu imagen con nosotros.',
    phone: '4 669 8877',
    phones: ['4 669 8877', '4 669 8878', '4 602 3456'],
    address: 'Calle Sucre #890, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.8',
    reviewsCount: 65,
    actionText: 'Agendar Cita',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Azul', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b8',
    name: 'FerreterÃ­a El Constructor',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80',
    category: 'FerreterÃ­a',
    description: 'Todo lo necesario para tus proyectos de construcciÃ³n y mejoras del hogar. Herramientas, materiales elÃ©ctricos, pintura y tuberÃ­as de calidad.',
    phone: '4 670 3322',
    address: 'Calle Libertad #123, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '7:30 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Productos',
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    description: 'Pan artesanal horneado diariamente, facturas rellenas, tortas caseras y masas finas. El aroma del pan reciÃ©n hecho te espera cada maÃ±ana.',
    phone: '4 671 4466',
    phones: ['4 671 4466', '4 671 4467'],
    address: 'Plaza Principal #45, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Martes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Jueves', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Viernes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Domingo', open: true, hours: '6:00 AM - 9:00 PM' }
    ],
    isFreeDelivery: true,
    actionText: 'Pedir Ahora',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b10',
    name: 'Taller MecÃ¡nico El RÃ¡pido',
    imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&auto=format&fit=crop&q=80',
    category: 'MecÃ¡nica',
    description: 'Servicio completo de mecÃ¡nica automotriz, cambio de aceite, frenos, suspensiÃ³n y diagnÃ³stico computarizado para tu vehÃ­culo.',
    phone: '4 672 9988',
    address: 'Carretera Panamericana Km 5, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '8:00 AM - 12:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.6',
    reviewsCount: 42,
    actionText: 'Agendar Cita',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    description: 'Amplio surtido en medicamentos genÃ©ricos y de marca, productos de cuidado personal, vitaminas y atenciÃ³n farmacÃ©utica personalizada.',
    phone: '4 673 2211',
    phones: ['4 673 2211', '4 673 2212', '4 603 4567'],
    address: 'Calle JunÃ­n #678, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '8:00 AM - 10:00 PM' },
      { day: 'Domingo', open: true, hours: '8:00 AM - 10:00 PM' }
    ],
    actionText: 'Ver CatÃ¡logo',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Azul', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b12',
    name: 'Gimnasio FitMax',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    category: 'Deportes',
    description: 'Equipamiento moderno, clases dirigidas de spinning, zumba y crossfit. Entrenadores certificados te ayudarÃ¡n a alcanzar tus metas fitness.',
    phone: '4 674 5566',
    address: 'Avenida Deportiva #234, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'Martes', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'Jueves', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'Viernes', open: true, hours: '6:00 AM - 10:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.5',
    reviewsCount: 98,
    actionText: 'Ver Planes',
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b13',
    name: 'LibrerÃ­a y PapelerÃ­a El Saber',
    imageUrl: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600&auto=format&fit=crop&q=80',
    category: 'EducaciÃ³n',
    description: 'Ãštiles escolares, libros de texto, material de oficina y artÃ­culos de arte. Todo lo que necesitas para estudiar y crear en un solo lugar.',
    phone: '4 675 7788',
    phones: ['4 675 7788', '4 675 7789'],
    address: 'Calle EducaciÃ³n #456, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '8:30 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 2:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Explorar',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b14',
    name: 'CarpinterÃ­a Don JosÃ©',
    imageUrl: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&auto=format&fit=crop&q=80',
    category: 'Hogar',
    description: 'Muebles de madera maciza a medida, reparaciones de carpinterÃ­a, restauraciÃ³n de muebles antiguos y trabajos personalizados para tu hogar.',
    phone: '4 676 3344',
    address: 'Calle Artesanal #789, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Trabajos',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea L', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b15',
    name: 'ElectroHogar Trigal',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
    category: 'ElectrodomÃ©sticos',
    description: 'Venta de electrodomÃ©sticos, refrigeradores, lavadoras, cocinas y televisores. Las mejores marcas al mejor precio con entrega a domicilio.',
    phone: '4 677 9900',
    phones: ['4 677 9900', '4 677 9901', '4 604 5678'],
    address: 'Avenida Comercial #1000, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 2:00 PM' }
    ],
    isFreeDelivery: true,
    rating: '4.7',
    reviewsCount: 150,
    actionText: 'Ver Ofertas',
    transport: {
      micros: [
        { name: 'LÃ­nea D', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b16',
    name: 'CarnicerÃ­a El Cortijo',
    imageUrl: 'https://picsum.photos/seed/negocio16/600/400',
    category: 'CarnicerÃ­a',
    description: 'Carnes de res, cerdo y pollo de la mejor calidad. Cortes especiales y atenciÃ³n personalizada para tu mesa.',
    phone: '4 678 1122',
    address: 'Calle Carne #123, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Domingo', open: true, hours: '7:00 AM - 1:00 PM' }
    ],
    actionText: 'Ver Cortes',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b17',
    name: 'LavanderÃ­a Burbuja',
    imageUrl: 'https://picsum.photos/seed/negocio17/600/400',
    category: 'Limpieza',
    description: 'LavanderÃ­a profesional con servicio de lavado, secado y planchado. Recogemos y entregamos a domicilio sin costo adicional.',
    phone: '4 679 2233',
    address: 'Calle Limpia #456, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '8:00 AM - 8:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    isFreeDelivery: true,
    actionText: 'Solicitar Servicio',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b18',
    name: 'JardinerÃ­a El JardÃ­n Secreto',
    imageUrl: 'https://picsum.photos/seed/negocio18/600/400',
    category: 'JardinerÃ­a',
    description: 'DiseÃ±o y mantenimiento de jardines, poda de Ã¡rboles, siembra de cÃ©sped y asesorÃ­a en paisajismo para hogares y empresas.',
    phone: '4 680 3344',
    address: 'Calle JardÃ­n #789, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '8:00 AM - 6:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    isFreeDelivery: true,
    actionText: 'Solicitar CotizaciÃ³n',
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b19',
    name: 'Estudio FotogrÃ¡fico Memorias',
    imageUrl: 'https://picsum.photos/seed/negocio19/600/400',
    category: 'FotografÃ­a',
    description: 'Sesiones fotogrÃ¡ficas profesionales para eventos, retratos, bodas, quince aÃ±os y sesiones familiares. Calidad y creatividad en cada toma.',
    phone: '4 681 4455',
    address: 'Calle Foto #321, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.9',
    reviewsCount: 55,
    actionText: 'Ver Portafolio',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b20',
    name: 'Veterinaria San Francisco',
    imageUrl: 'https://picsum.photos/seed/negocio20/600/400',
    category: 'Mascotas',
    description: 'AtenciÃ³n veterinaria general, consultas, vacunaciÃ³n, desparasitaciÃ³n y cirugÃ­as para mascotas. Todo para el bienestar de tu mejor amigo.',
    phone: '4 682 5566',
    address: 'Calle Mascota #654, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Agendar Cita',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b21',
    name: 'CerÃ¡mica Artesanal DoÃ±a Rosa',
    imageUrl: 'https://picsum.photos/seed/negocio21/600/400',
    category: 'CerÃ¡mica',
    description: 'CerÃ¡mica artesanal hecha a mano. Vajillas, macetas, adornos y piezas decorativas Ãºnicas inspiradas en la cultura tarijeÃ±a.',
    phone: '4 683 6677',
    address: 'Calle Artesanos #987, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 6:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    isFreeDelivery: true,
    actionText: 'Ver ColecciÃ³n',
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b22',
    name: 'JoyerÃ­a Luna de Plata',
    imageUrl: 'https://picsum.photos/seed/negocio22/600/400',
    category: 'JoyerÃ­a',
    description: 'Joyas de plata y oro con diseÃ±os exclusivos. Anillos, collares, pulseras y aretes artesanales con piedras naturales de la regiÃ³n.',
    phone: '4 684 7788',
    address: 'Calle Joya #159, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '10:00 AM - 8:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.8',
    reviewsCount: 43,
    actionText: 'Ver ColecciÃ³n',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b23',
    name: 'PanaderÃ­a El Trigal',
    imageUrl: 'https://picsum.photos/seed/negocio23/600/400',
    category: 'PanaderÃ­a',
    description: 'Pan artesanal, empanadas, salteÃ±as y masas finas horneadas diariamente. El autÃ©ntico sabor tarijeÃ±o en cada bocado.',
    phone: '4 685 8899',
    address: 'Calle Pan #357, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Martes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Jueves', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Viernes', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '6:00 AM - 9:00 PM' },
      { day: 'Domingo', open: true, hours: '6:00 AM - 9:00 PM' }
    ],
    isFreeDelivery: true,
    actionText: 'Pedir Ahora',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b24',
    name: 'HeladerÃ­a Copacabana',
    imageUrl: 'https://picsum.photos/seed/negocio24/600/400',
    category: 'Comida',
    description: 'Helados artesanales de sabores tradicionales e innovadores. Disfruta de nuestros batidos, malteadas y postres helados.',
    phone: '4 686 9900',
    address: 'Calle Helado #468, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Martes', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Jueves', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Viernes', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '10:00 AM - 10:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 10:00 PM' }
    ],
    actionText: 'Ver Sabores',
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b25',
    name: 'Tienda Deportiva El Gol',
    imageUrl: 'https://picsum.photos/seed/negocio25/600/400',
    category: 'Deportes',
    description: 'Ropa y calzado deportivo, implementos para fÃºtbol, bÃ¡squet, running y gym. Todo para tu rendimiento deportivo.',
    phone: '4 687 0011',
    address: 'Calle Deporte #579, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 2:00 PM' }
    ],
    actionText: 'Ver CatÃ¡logo',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b26',
    name: 'ClÃ­nica Dental Sonrisa Perfecta',
    imageUrl: 'https://picsum.photos/seed/negocio26/600/400',
    category: 'Salud',
    description: 'Servicios odontolÃ³gicos completos: limpiezas, blanqueamientos, ortodoncia, implantes y cirugÃ­a dental.',
    phone: '4 688 1122',
    address: 'Calle Dental #680, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '8:00 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '8:00 AM - 1:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    rating: '4.7',
    reviewsCount: 78,
    actionText: 'Agendar Cita',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
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
    category: 'MecÃ¡nica',
    description: 'ReparaciÃ³n y mantenimiento de bicicletas de montaÃ±a y ciudad. Venta de repuestos, accesorios y servicios de tuning.',
    phone: '4 689 2233',
    address: 'Calle Bici #791, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Servicios',
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b28',
    name: 'ElectrodomÃ©sticos El Hogar Feliz',
    imageUrl: 'https://picsum.photos/seed/negocio28/600/400',
    category: 'ElectrodomÃ©sticos',
    description: 'Venta de electrodomÃ©sticos para el hogar con las mejores marcas. Refrigeradores, lavadoras, cocinas y mucho mÃ¡s.',
    phone: '4 690 3344',
    address: 'Av. Comercial #802, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 8:00 PM' },
      { day: 'Domingo', open: true, hours: '10:00 AM - 2:00 PM' }
    ],
    isFreeDelivery: true,
    rating: '4.6',
    reviewsCount: 62,
    actionText: 'Ver Ofertas',
    transport: {
      micros: [
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea D', flagColor: 'Roja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 1', flagColor: 'Roja', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 3', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  },
  {
    id: 'b29',
    name: 'Ropa Infantil PequeÃ±Ã­n',
    imageUrl: 'https://picsum.photos/seed/negocio29/600/400',
    category: 'Ropa',
    description: 'Ropa y accesorios para bebÃ©s y niÃ±os. Conjuntos, pijamas, vestidos y todo para los mÃ¡s pequeÃ±os con calidad y estilo.',
    phone: '4 691 4455',
    address: 'Calle NiÃ±o #913, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '9:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver ColecciÃ³n',
    transport: {
      micros: [
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea A', flagColor: 'Rojo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Sur', flagColor: '', proximity: '4 644 4444' },
        { name: 'Radio Taxi Central', flagColor: '', proximity: '4 655 5555' }
      ]
    }
  },
  {
    id: 'b30',
    name: 'FerreterÃ­a El Tornillo Feliz',
    imageUrl: 'https://picsum.photos/seed/negocio30/600/400',
    category: 'FerreterÃ­a',
    description: 'Todo en ferreterÃ­a: herramientas, materiales de construcciÃ³n, pintura, electricidad, plomerÃ­a y artÃ­culos para el hogar.',
    phone: '4 692 5566',
    address: 'Calle Hierro #246, Barrio El Trigal',
    schedule: [
      { day: 'Lunes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Martes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'MiÃ©rcoles', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Jueves', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Viernes', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'SÃ¡bado', open: true, hours: '7:00 AM - 7:00 PM' },
      { day: 'Domingo', open: false, hours: 'Cerrado' }
    ],
    actionText: 'Ver Productos',
    transport: {
      micros: [
        { name: 'LÃ­nea C', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea B', flagColor: 'Verde', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea G', flagColor: 'Naranja', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea H', flagColor: 'Gris', proximity: 'Pasa por la puerta' }
      ],
      taxitrufis: [
        { name: 'LÃ­nea Z', flagColor: 'Blanco con Morado', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea H', flagColor: 'Verde', proximity: 'A dos calles' },
        { name: 'LÃ­nea M', flagColor: 'Morado', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea N', flagColor: 'Naranja', proximity: 'Pasa por la puerta' }
      ],
      trufis: [
        { name: 'LÃ­nea 5', flagColor: 'Amarillo', proximity: 'Pasa por la puerta' },
        { name: 'LÃ­nea 2', flagColor: 'Azul', proximity: 'A dos cuadras' },
        { name: 'LÃ­nea 4', flagColor: 'Blanco', proximity: 'A dos calles' },
        { name: 'LÃ­nea 6', flagColor: 'Naranja', proximity: 'A dos cuadras' }
      ],
      radioTaxis: [
        { name: 'Radio Taxi Tarija', flagColor: '', proximity: '4 622 2222' },
        { name: 'Radio MÃ³vil', flagColor: '', proximity: '4 633 3333' }
      ]
    }
  }
];

export const LOST_PETS_DATA: LostPet[] = [
  {
    id: 'lp1',
    status: 'lost',
    name: 'Max',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdiÃ³ en la tarde del 23 de mayo. Es un Golden Retriever, muy dÃ³cil, juguetÃ³n y amigable.',
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
    id: 'fp1',
    status: 'found',
    name: 'Chispita',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrada deambulando por la Av. PotosÃ­. Es una perrita pequeÃ±a color blanco con manchas negras, collar rojo, muy cariÃ±osa. Fue resguardada temporalmente.',
    lastSeen: 'Av. PotosÃ­ #450',
    contact: '4 611 2233',
    neighborhood: 'El Molino',
    date: '24 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap1',
    status: 'adoption',
    name: 'Luna',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n por familia que se muda. Es una perra Golden Retriever de 2 aÃ±os, vacunada, esterilizada, muy dÃ³cil y buena con niÃ±os. Busca hogar responsable.',
    lastSeen: 'Calle Las Palmeras #234',
    contact: '4 611 4455',
    neighborhood: 'Las Palmeras',
    date: '25 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp2',
    status: 'lost',
    name: 'Luna',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdiÃ³ el 22 de mayo en horas de la noche. Es gris con rayas oscuras y tiene un collar rosado con cascabel.',
    lastSeen: 'Av. PotosÃ­',
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
    id: 'fp2',
    status: 'found',
    name: 'Michi',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en el techo de una casa en la Calle Sucre. Es un gato gris con ojos verdes, collar azul con cascabel, se ve bien cuidado.',
    lastSeen: 'Calle Sucre #789',
    contact: '4 622 3344',
    neighborhood: 'San Roque',
    date: '23 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap2',
    status: 'adoption',
    name: 'Mimi',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. Gatita de 1 aÃ±o, color gris con rayas, vacunada, esterilizada, arenera, muy cariÃ±osa y juguetona. Se entrega con cama y juguetes.',
    lastSeen: 'Av. PotosÃ­ #567',
    contact: '4 622 5566',
    neighborhood: 'El Molino',
    date: '24 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp3',
    status: 'lost',
    name: 'Kiwi',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapÃ³ el 21 de mayo por la maÃ±ana. Es un loro hablador, verde brillante con plumas amarillas en la cabeza.',
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
    id: 'fp3',
    status: 'found',
    name: 'PiolÃ­n',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en un Ã¡rbol de la Plaza Central. Es un periquito azul celeste con blanco, muy manso, se posa en el dedo. Resguardado en una jaula.',
    lastSeen: 'Plaza Principal de Tarija',
    contact: '4 633 4455',
    neighborhood: 'Centro',
    date: '22 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap3',
    status: 'adoption',
    name: 'PiolÃ­n',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. Canario amarillo cantor, macho, 6 meses, jaula incluida, alimentaciÃ³n incluida por un mes. Canta muy bonito.',
    lastSeen: 'Calle Comercio #456',
    contact: '4 633 6677',
    neighborhood: 'Centro',
    date: '23 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp4',
    status: 'lost',
    name: 'Toby',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdiÃ³ en la plaza central. Es un perro mestizo color marrÃ³n claro, de tamaÃ±o mediano, muy cariÃ±oso.',
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
    id: 'fp4',
    status: 'found',
    name: 'Manchitas',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado cerca del mercado central. Es un perro mestizo blanco con manchas negras, tamaÃ±o mediano, collar verde, muy juguetÃ³n y tranquilo.',
    lastSeen: 'Mercado Central',
    contact: '4 644 5566',
    neighborhood: 'Centro',
    date: '21 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap4',
    status: 'adoption',
    name: 'Manchas',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. Perro mestizo de 3 aÃ±os, rescatado de la calle, desparasitado, vacunado, de tamaÃ±o mediano, muy agradecido y fiel. Busca hogar con patio.',
    lastSeen: 'Calle Sucre #890',
    contact: '4 644 7788',
    neighborhood: 'San Roque',
    date: '22 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp5',
    status: 'lost',
    name: 'Misi',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapÃ³ por la ventana. Es una gata blanca con manchas negras, ojos verdes y muy esquiva con extraÃ±os.',
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
    id: 'fp5',
    status: 'found',
    name: 'Pelusa',
    type: 'Otra mascota',
    imageUrl: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en el jardÃ­n de una casa en El Trigal. Es un conejo blanco de tamaÃ±o pequeÃ±o, ojos rojos, muy asustadizo. Se resguarda en un corral.',
    lastSeen: 'Pasaje El Trigal #123',
    contact: '4 655 6677',
    neighborhood: 'El Trigal',
    date: '20 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap5',
    status: 'adoption',
    name: 'Copito',
    type: 'Otra mascota',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. HÃ¡mster sirio dorado de 4 meses, muy manso, jaula con rueda incluida, alimento para 2 meses. Ideal para niÃ±os.',
    lastSeen: 'Pasaje El Trigal #456',
    contact: '4 655 8899',
    neighborhood: 'El Trigal',
    date: '21 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp6',
    status: 'lost',
    name: 'Paco',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapÃ³ de su jaula. Es un perico australiano azul y blanco, muy hablador, repite palabras.',
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
    id: 'fp6',
    status: 'found',
    name: 'Rocky',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en la Av. Las AmÃ©ricas. Es un Pitbull color marrÃ³n claro, collar negro, herida leve en la pata trasera. Fue atendido y estÃ¡ en recuperaciÃ³n.',
    lastSeen: 'Av. Las AmÃ©ricas #500',
    contact: '4 666 7788',
    neighborhood: 'Las AmÃ©ricas',
    date: '19 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap6',
    status: 'adoption',
    name: 'Canela',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. Gata naranja atigrada de 2 aÃ±os, vacunada, esterilizada, muy tranquila y limpia. Se entrega con arenero y rascador.',
    lastSeen: 'Av. La Paz #345',
    contact: '4 666 9900',
    neighborhood: 'Centro',
    date: '20 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp7',
    status: 'lost',
    name: 'Copito',
    type: 'Otra mascota',
    imageUrl: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapÃ³ del jardÃ­n. Es un conejo blanco de angora, ojos rosados, muy manso y dÃ³cil.',
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
    id: 'fp7',
    status: 'found',
    name: 'Nube',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrada maullando en la puerta de una casa. Es una gata blanca de pelo largo, ojos celestes, collar rosado, muy cariÃ±osa y desconfiada.',
    lastSeen: 'Calle BolÃ­var #234',
    contact: '4 677 8899',
    neighborhood: 'San Jorge',
    date: '18 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap7',
    status: 'adoption',
    name: 'Tortu',
    type: 'Otra mascota',
    imageUrl: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. Tortuga de tierra de 5 aÃ±os, caparazÃ³n saludable, alimentaciÃ³n incluida por 3 meses, terrario disponible. Ideal para hogar con jardÃ­n.',
    lastSeen: 'Calle Libertad #678',
    contact: '4 677 0011',
    neighborhood: 'La Merced',
    date: '19 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp8',
    status: 'lost',
    name: 'Rocky',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdiÃ³ durante un paseo. Es un Pitbull color marrÃ³n, de contextura fuerte, collar negro con placas.',
    lastSeen: 'Av. PotosÃ­ esq. Sucre',
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
    id: 'fp8',
    status: 'found',
    name: 'Tortuga',
    type: 'Otra mascota',
    imageUrl: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrada cruzando la calle lentamente. Es una tortuga de tierra mediana, caparazÃ³n cafÃ© oscuro con manchas amarillas, sin marcas visibles.',
    lastSeen: 'Calle Cochabamba #567',
    contact: '4 688 9900',
    neighborhood: 'San Roque',
    date: '17 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap8',
    status: 'adoption',
    name: 'Rex',
    type: 'Perro',
    imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. Pastor AlemÃ¡n de 1 aÃ±o, vacunado, desparasitado, muy inteligente y obediente. Ideal para casa con jardÃ­n y dueÃ±o con experiencia.',
    lastSeen: 'Av. San MartÃ­n #901',
    contact: '4 688 1122',
    neighborhood: 'San MartÃ­n',
    date: '18 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp9',
    status: 'lost',
    name: 'Canela',
    type: 'Gato',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&auto=format&fit=crop&q=80',
    description: 'Se perdiÃ³ en la noche del 10 de junio. Es una gata naranja con rayas atigradas, muy cariÃ±osa y maulladora.',
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
    id: 'fp9',
    status: 'found',
    name: 'Copito',
    type: 'Otra mascota',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado en una tienda de mascotas donde fue entregado. Es un hÃ¡mster dorado, pequeÃ±o, con una mancha blanca en la cabeza, muy inquieto.',
    lastSeen: 'Av. PotosÃ­ #123',
    contact: '4 699 0011',
    neighborhood: 'El Molino',
    date: '16 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap9',
    status: 'adoption',
    name: 'Kiwi',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. Loro cabeza amarilla de 8 meses, criado a mano, muy hablador, dice frases. Jaula grande incluida. Ideal para hogar con espacio.',
    lastSeen: 'Calle BolÃ­var #123',
    contact: '4 699 2233',
    neighborhood: 'San Jorge',
    date: '17 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'lp10',
    status: 'lost',
    name: 'Pelusa',
    type: 'Otra mascota',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&auto=format&fit=crop&q=80',
    description: 'Se escapÃ³ de su jaula. Es un hÃ¡mster sirio dorado, pequeÃ±o y muy rÃ¡pido, con una mancha blanca en la cabeza.',
    lastSeen: 'Calle JunÃ­n #567',
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
    id: 'fp10',
    status: 'found',
    name: 'Kiwi',
    type: 'Aves',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
    description: 'Encontrado posado en la ventana de una casa. Es un loro verde pequeÃ±o, con plumas amarillas en la cabeza, repite palabras como "hola" y "adiÃ³s".',
    lastSeen: 'Calle Del Valle #890',
    contact: '4 600 1122',
    neighborhood: 'Del Valle',
    date: '15 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1555169062-013468b47731?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&auto=format&fit=crop&q=60']
  },
  {
    id: 'ap10',
    status: 'adoption',
    name: 'Burbuja',
    type: 'Otra mascota',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
    description: 'En adopciÃ³n. Cobaya (conejillo de Indias) blanca con manchas marrones, 3 meses de edad, muy mansita. Jaula y alimento incluidos.',
    lastSeen: 'Calle PotosÃ­ #234',
    contact: '4 600 3344',
    neighborhood: 'El Molino',
    date: '16 de junio de 2026',
    images: ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&auto=format&fit=crop&q=60','https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=60']
  }
];

export const NEWS_DATA: NeighborhoodEvent[] = [
  {
    id: 'n1',
    title: 'Tarija serÃ¡ sede del Congreso Nacional de TecnologÃ­a 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnologia',
    description: 'La ciudad de Tarija fue elegida como sede del Congreso Nacional de TecnologÃ­a e InnovaciÃ³n 2026, evento que reunirÃ¡ a mÃ¡s de 200 expertos en desarrollo de software, inteligencia artificial y ciberseguridad. El encuentro se realizarÃ¡ del 15 al 18 de agosto en el Centro de Convenciones y contarÃ¡ con la participaciÃ³n de universidades y empresas tecnolÃ³gicas de todo el paÃ­s.',
    icon: 'users',
    date: 'Lunes, 30 de Junio de 2026',
    location: 'Centro de Convenciones, Tarija'
  },
  {
    id: 'n2',
    title: 'AlcaldÃ­a de Tarija presenta nuevo presupuesto municipal',
    imageUrl: 'https://picsum.photos/seed/noticia2/600/400',
    category: 'Politica',
    description: 'El Concejo Municipal de Tarija aprobÃ³ en primera instancia el presupuesto anual 2026 por un monto de 450 millones de bolivianos. Los recursos estarÃ¡n destinados principalmente a obras de infraestructura vial, mejoramiento de servicios bÃ¡sicos y programas sociales para las zonas periurbanas del municipio.',
    icon: 'users',
    date: 'Viernes, 27 de Junio de 2026',
    location: 'Concejo Municipal, Tarija'
  },
  {
    id: 'n3',
    title: 'Tarija se corona campeÃ³n del torneo nacional de fÃºtbol',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80',
    category: 'Deportes',
    description: 'El equipo de fÃºtbol de Tarija se consagrÃ³ campeÃ³n del torneo nacional de la COFA despuÃ©s de vencer 3-1 al equipo de Cochabamba en una final disputada en el Estadio IV Centenarios. Miles de tarijeÃ±os celebraron en las calles el tÃ­tulo obtenido tras 15 aÃ±os de sequÃ­a deportiva.',
    icon: 'users',
    date: 'Domingo, 29 de Junio de 2026',
    location: 'Estadio IV Centenarios, Tarija'
  },
  {
    id: 'n4',
    title: 'Crecen las exportaciones de uva tarijeÃ±a al mercado europeo',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80',
    category: 'Economia',
    description: 'Las exportaciones de uva de la regiÃ³n de Tarija al mercado europeo crecieron un 35% durante el primer semestre de 2026, segÃºn datos de la CÃ¡mara de Exportadores. Los vinos y singanis tarijeÃ±os continÃºan ganando reconocimiento internacional, generando divisas y empleo para cientos de familias productoras del Valle Central.',
    icon: 'gift',
    date: 'Jueves, 26 de Junio de 2026',
    location: 'Valle Central de Tarija'
  },
  {
    id: 'n5',
    title: 'CampaÃ±a de forestaciÃ³n en el cerro San Juan',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    category: 'Medio',
    description: 'Voluntarios de Tarija plantaron mÃ¡s de 5.000 Ã¡rboles nativos en el cerro San Juan como parte de la campaÃ±a "Tarija PulmÃ³n Verde". La iniciativa liderada por la GobernaciÃ³n busca reforestar 50 hectÃ¡reas hasta fin de aÃ±o para recuperar la cobertura vegetal de la zona y mitigar los efectos del cambio climÃ¡tico en la regiÃ³n.',
    icon: 'trash',
    date: 'SÃ¡bado, 28 de Junio de 2026',
    location: 'Cerro San Juan, Tarija'
  },
  {
    id: 'n6',
    title: 'Universitarios tarijeÃ±os crean app para denuncias ciudadanas',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnologia',
    description: 'Estudiantes de la Universidad Juan Misael Saracho desarrollaron una aplicaciÃ³n mÃ³vil que permite a los ciudadanos de Tarija realizar denuncias en tiempo real sobre baches, alumbrado pÃºblico daÃ±ado y recolecciÃ³n de basura. La app "Tarija Reporta" ya cuenta con mÃ¡s de 10.000 descargas en su primera semana de lanzamiento.',
    icon: 'heart-pulse',
    date: 'Martes, 24 de Junio de 2026',
    location: 'Universidad Juan Misael Saracho, Tarija'
  },
  {
    id: 'n7',
    title: 'Nueva lÃ­nea de transporte elÃ©ctrico conecta la zona sur',
    imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&auto=format&fit=crop&q=80',
    category: 'Transporte',
    description: 'La AlcaldÃ­a de Tarija inaugurÃ³ una nueva lÃ­nea de transporte pÃºblico elÃ©ctrico que conecta la zona sur con el centro de la ciudad. Los modernos minibuses con capacidad para 30 pasajeros realizarÃ¡n el recorrido cada 10 minutos en horario de 6:00 a 22:00, contribuyendo a la reducciÃ³n de la contaminaciÃ³n auditiva y atmosfÃ©rica.',
    icon: 'users',
    date: 'MiÃ©rcoles, 25 de Junio de 2026',
    location: 'Zona Sur - Centro, Tarija'
  },
  {
    id: 'n8',
    title: 'Tarija lanza ruta turÃ­stica de las bodegas histÃ³ricas',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=80',
    category: 'Turismo',
    description: 'El Ministerio de Turismo en coordinaciÃ³n con la GobernaciÃ³n de Tarija lanzÃ³ la "Ruta de las Bodegas HistÃ³ricas", un recorrido que incluye visitas a 12 bodegas tradicionales con mÃ¡s de 100 aÃ±os de antigÃ¼edad. Los turistas podrÃ¡n degustar vinos y singanis, conocer el proceso de elaboraciÃ³n y disfrutar de la gastronomÃ­a local.',
    icon: 'gift',
    date: 'SÃ¡bado, 28 de Junio de 2026',
    location: 'Valle de la ConcepciÃ³n, Tarija'
  },
  {
    id: 'n9',
    title: 'Gobierno anuncia construcciÃ³n de nuevo hospital municipal',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80',
    category: 'Salud',
    description: 'El Gobierno Nacional anunciÃ³ la construcciÃ³n del nuevo Hospital Municipal de Tarija con una inversiÃ³n de 120 millones de bolivianos. El centro de salud contarÃ¡ con 200 camas, equipos de Ãºltima generaciÃ³n y servicios de maternidad, pediatrÃ­a, traumatologÃ­a y cardiologÃ­a. Las obras comenzarÃ¡n en agosto y se estima su conclusiÃ³n en 2028.',
    icon: 'heart-pulse',
    date: 'Viernes, 27 de Junio de 2026',
    location: 'Av. VÃ­ctor Paz, Tarija'
  },
  {
    id: 'n10',
    title: 'Feria del Libro Tarija 2026 reÃºne a escritores nacionales',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80',
    category: 'Cultura',
    description: 'La Feria Internacional del Libro de Tarija 2026 abriÃ³ sus puertas con la participaciÃ³n de mÃ¡s de 50 escritores bolivianos y 30 editoriales internacionales. El evento cultural mÃ¡s importante del sur del paÃ­s se desarrolla en el recinto ferial de la ciudad y ofrece talleres, presentaciones de libros y conferencias sobre literatura contemporÃ¡nea.',
    icon: 'gift',
    date: 'Lunes, 23 de Junio de 2026',
    location: 'Recinto Ferial, Tarija'
  },
  {
    id: 'n11',
    title: 'MÃ¡s de 200 jÃ³venes participan en olimpiadas de robÃ³tica',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnologia',
    description: 'La carrera de IngenierÃ­a de Sistemas de la Universidad AutÃ³noma Juan Misael Saracho organizÃ³ las Olimpiadas de RobÃ³tica Tarija 2026 con la participaciÃ³n de mÃ¡s de 200 estudiantes de colegios secundarios. Los jÃ³venes compitieron en categorÃ­as de robots seguidores de lÃ­nea, sumo robÃ³tico y drones programables.',
    icon: 'users',
    date: 'Domingo, 22 de Junio de 2026',
    location: 'Universidad Juan Misael Saracho, Tarija'
  },
  {
    id: 'n12',
    title: 'Diputados debaten ley de desarrollo productivo para Tarija',
    imageUrl: 'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=600&auto=format&fit=crop&q=80',
    category: 'Politica',
    description: 'La CÃ¡mara de Diputados iniciÃ³ el debate del proyecto de Ley de Desarrollo Productivo para el departamento de Tarija, una normativa que busca impulsar los sectores vitivinÃ­cola, oleÃ­cola y turÃ­stico de la regiÃ³n. La ley contempla incentivos fiscales, crÃ©ditos blandos y asistencia tÃ©cnica para pequeÃ±os y medianos productores.',
    icon: 'users',
    date: 'Jueves, 19 de Junio de 2026',
    location: 'Asamblea Legislativa, Tarija'
  },
  {
    id: 'n13',
    title: 'SelecciÃ³n tarijeÃ±a de bÃ¡squet clasifica a liguilla final',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80',
    category: 'Deportes',
    description: 'La selecciÃ³n de bÃ¡squetbol de Tarija clasificÃ³ a la liguilla final del campeonato nacional despuÃ©s de vencer 87-72 al equipo de PotosÃ­. El equipo tarijeÃ±o, dirigido por el entrenador Carlos LÃ³pez, mostrÃ³ un juego sÃ³lido y promete dar pelea en la fase decisiva del torneo que se jugarÃ¡ en la ciudad de Santa Cruz.',
    icon: 'users',
    date: 'Martes, 17 de Junio de 2026',
    location: 'Coliseo Deportivo, Tarija'
  },
  {
    id: 'n14',
    title: 'Tarija sede del encuentro nacional de artesanos',
    imageUrl: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=600&auto=format&fit=crop&q=80',
    category: 'Cultura',
    description: 'La ciudad de Tarija fue elegida como sede del Encuentro Nacional de Artesanos 2026, evento que congrega a mÃ¡s de 300 artesanos de los nueve departamentos de Bolivia. La feria se realiza en la Plaza Principal de Tarija y exhibe tejidos, cerÃ¡mica, tallados en madera, joyerÃ­a tradicional y productos gastronÃ³micos tÃ­picos de cada regiÃ³n.',
    icon: 'gift',
    date: 'SÃ¡bado, 21 de Junio de 2026',
    location: 'Plaza Principal, Tarija'
  },
  {
    id: 'n15',
    title: 'ConstrucciÃ³n del nuevo puente sobre el rÃ­o Guadalquivir',
    imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&auto=format&fit=crop&q=80',
    category: 'Transporte',
    description: 'La GobernaciÃ³n de Tarija iniciÃ³ la construcciÃ³n de un nuevo puente vehicular sobre el rÃ­o Guadalquivir que conectarÃ¡ los distritos 6 y 7 de la ciudad. La obra, con una inversiÃ³n de 35 millones de bolivianos, beneficiarÃ¡ a mÃ¡s de 40.000 habitantes y permitirÃ¡ descongestionar el trÃ¡fico en el puente San MartÃ­n, actualmente colapsado en horas pico.',
    icon: 'users',
    date: 'Lunes, 16 de Junio de 2026',
    location: 'RÃ­o Guadalquivir, Tarija'
  },
  {
    id: 'n16',
    title: 'Festival del Singani TarijeÃ±o atrae a turistas nacionales',
    imageUrl: 'https://picsum.photos/seed/noticia16/600/400',
    category: 'Turismo',
    description: 'El Festival del Singani TarijeÃ±o 2026 rompiÃ³ rÃ©cord de asistencia con mÃ¡s de 15 mil visitantes durante el fin de semana. Productores locales ofrecieron degustaciones y recorridos por las bodegas mÃ¡s tradicionales del Valle Central.',
    icon: 'gift',
    date: 'Domingo, 13 de Julio de 2026',
    location: 'Valle Central, Tarija'
  },
  {
    id: 'n17',
    title: 'CampaÃ±a de alfabetizaciÃ³n digital para adultos mayores',
    imageUrl: 'https://picsum.photos/seed/noticia17/600/400',
    category: 'Tecnologia',
    description: 'La AlcaldÃ­a de Tarija lanzÃ³ un programa gratuito de alfabetizaciÃ³n digital dirigido a adultos mayores. Los cursos incluyen uso de smartphones, redes sociales, banca en lÃ­nea y trÃ¡mites digitales para reducir la brecha tecnolÃ³gica.',
    icon: 'users',
    date: 'Viernes, 11 de Julio de 2026',
    location: 'Casas de la Cultura, Tarija'
  },
  {
    id: 'n18',
    title: 'Inauguran nuevo parque ecolÃ³gico en la zona norte',
    imageUrl: 'https://picsum.photos/seed/noticia18/600/400',
    category: 'Medio',
    description: 'La GobernaciÃ³n inaugurÃ³ el Parque EcolÃ³gico Norte con 5 hectÃ¡reas de Ã¡reas verdes, juegos infantiles, ciclovÃ­a y laguna artificial. El espacio beneficiarÃ¡ a mÃ¡s de 20 mil vecinos de los distritos 1 y 2.',
    icon: 'trash',
    date: 'MiÃ©rcoles, 9 de Julio de 2026',
    location: 'Zona Norte, Tarija'
  },
  {
    id: 'n19',
    title: 'Productores tarijeÃ±os baten rÃ©cord de producciÃ³n de vino',
    imageUrl: 'https://picsum.photos/seed/noticia19/600/400',
    category: 'Economia',
    description: 'La cosecha de uva 2026 en Tarija alcanzÃ³ un rÃ©cord histÃ³rico de 850 mil toneladas, superando en un 20% la producciÃ³n del aÃ±o anterior. Los vitivinicultores atribuyen el incremento a las condiciones climÃ¡ticas favorables.',
    icon: 'gift',
    date: 'Lunes, 7 de Julio de 2026',
    location: 'Valle Central de Tarija'
  },
  {
    id: 'n20',
    title: 'Tarija acoge el torneo nacional de ajedrez juvenil',
    imageUrl: 'https://picsum.photos/seed/noticia20/600/400',
    category: 'Deportes',
    description: 'MÃ¡s de 120 jÃ³venes ajedrecistas de todo el paÃ­s participan en el Torneo Nacional de Ajedrez Juvenil que se realiza en el Centro de Convenciones de Tarija. El evento promueve el pensamiento estratÃ©gico y la sana competencia.',
    icon: 'users',
    date: 'SÃ¡bado, 5 de Julio de 2026',
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
    description: 'Proyecto para llevar el servicio de gas domiciliario a mÃ¡s familias del barrio, promoviendo bienestar, confort y ahorro en el hogar.',
    location: 'Sectores en desarrollo',
    status: 'En Progreso'
  },
  {
    id: 'pr3',
    title: 'Alarma Vecinal',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    category: 'SEGURIDAD',
    description: 'ImplementaciÃ³n de un sistema de alarma vecinal conectado para alertar y proteger a nuestra comunidad ante cualquier emergencia.',
    location: 'Todo el barrio',
    status: 'Completado'
  },
  {
    id: 'pr4',
    title: 'ConstrucciÃ³n de Plaza Principal',
    imageUrl: 'https://picsum.photos/seed/proyecto4/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'ConstrucciÃ³n de una nueva plaza con Ã¡reas verdes, juegos infantiles, bancas y espacios de recreaciÃ³n para la comunidad.',
    location: 'Centro del barrio',
    status: 'En Progreso'
  },
  {
    id: 'pr5',
    title: 'Red de Alcantarillado Sanitario',
    imageUrl: 'https://picsum.photos/seed/proyecto5/600/400',
    category: 'SERVICIOS',
    description: 'InstalaciÃ³n de red de alcantarillado sanitario para mejorar las condiciones de salubridad y saneamiento bÃ¡sico en el barrio.',
    location: 'Sectores noreste y este',
    status: 'Planificado'
  },
  {
    id: 'pr6',
    title: 'CÃ¡maras de Seguridad',
    imageUrl: 'https://picsum.photos/seed/proyecto6/600/400',
    category: 'SEGURIDAD',
    description: 'InstalaciÃ³n de cÃ¡maras de videovigilancia en puntos estratÃ©gicos para mejorar la seguridad y prevenciÃ³n del delito en el barrio.',
    location: 'Accesos principales y plazas',
    status: 'En Progreso'
  },
  {
    id: 'pr7',
    title: 'Parque Infantil Recreativo',
    imageUrl: 'https://picsum.photos/seed/proyecto7/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'ConstrucciÃ³n de un parque infantil con juegos modernos, Ã¡reas verdes y espacios seguros para la recreaciÃ³n de los niÃ±os del barrio.',
    location: 'Calle Los NiÃ±os',
    status: 'Planificado'
  },
  {
    id: 'pr8',
    title: 'Fibra Ã“ptica Vecinal',
    imageUrl: 'https://picsum.photos/seed/proyecto8/600/400',
    category: 'SERVICIOS',
    description: 'Llevar internet de alta velocidad mediante fibra Ã³ptica a todos los hogares del barrio para reducir la brecha digital.',
    location: 'Todo el barrio',
    status: 'En Progreso'
  },
  {
    id: 'pr9',
    title: 'Muros de ContenciÃ³n',
    imageUrl: 'https://picsum.photos/seed/proyecto9/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'ConstrucciÃ³n de muros de contenciÃ³n para prevenir deslizamientos y proteger las viviendas en zonas de ladera del barrio.',
    location: 'Zonas de ladera',
    status: 'En Progreso'
  },
  {
    id: 'pr10',
    title: 'Alumbrado PÃºblico LED',
    imageUrl: 'https://picsum.photos/seed/proyecto10/600/400',
    category: 'SERVICIOS',
    description: 'Reemplazo de luminarias tradicionales por tecnologÃ­a LED de bajo consumo para mejorar la iluminaciÃ³n y seguridad nocturna.',
    location: 'Calles y avenidas principales',
    status: 'Completado'
  },
  {
    id: 'pr11',
    title: 'Puesto de Salud Vecinal',
    imageUrl: 'https://picsum.photos/seed/proyecto11/600/400',
    category: 'SERVICIOS',
    description: 'ConstrucciÃ³n de un puesto de salud con atenciÃ³n primaria, farmacia bÃ¡sica y consultorio mÃ©dico para la comunidad.',
    location: 'Av. Principal esq. Sucre',
    status: 'Planificado'
  },
  {
    id: 'pr12',
    title: 'SeÃ±alizaciÃ³n Vial',
    imageUrl: 'https://picsum.photos/seed/proyecto12/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'ColocaciÃ³n de seÃ±ales de trÃ¡nsito, reductores de velocidad y pasos peatonales para mejorar la seguridad vial en el barrio.',
    location: 'Intersecciones y avenidas',
    status: 'Completado'
  },
  {
    id: 'pr13',
    title: 'BotÃ³n de PÃ¡nico Vecinal',
    imageUrl: 'https://picsum.photos/seed/proyecto13/600/400',
    category: 'SEGURIDAD',
    description: 'ImplementaciÃ³n de un sistema de botÃ³n de pÃ¡nico conectado a la central de monitoreo para emergencias vecinales.',
    location: 'Todo el barrio',
    status: 'Planificado'
  },
  {
    id: 'pr14',
    title: 'Cancha Polifuncional',
    imageUrl: 'https://picsum.photos/seed/proyecto14/600/400',
    category: 'INFRAESTRUCTURA',
    description: 'ConstrucciÃ³n de una cancha deportiva multiusos para fÃºtbol, bÃ¡squet y vÃ³ley, con graderÃ­as e iluminaciÃ³n LED.',
    location: 'Calle Deportiva',
    status: 'En Progreso'
  },
  {
    id: 'pr15',
    title: 'Puntos de Reciclaje',
    imageUrl: 'https://picsum.photos/seed/proyecto15/600/400',
    category: 'SERVICIOS',
    description: 'InstalaciÃ³n de puntos limpios de reciclaje con contenedores diferenciados para promover la separaciÃ³n de residuos.',
    location: 'Esquinas principales',
    status: 'Planificado'
  }
];


