import { Property, Review } from './types';

// Helper to get past dates for more realistic data
const getPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 1,
    address: 'Lote 12, Camino al Ajusco Km 21',
    price: 850000,
    sqft: 500,
    frontage: 20,
    depth: 25,
    propertyType: 'Residencial',
    images: ['https://picsum.photos/seed/land1/600/400'],
    description: 'Excelente inmueble plano con uso de suelo residencial, ideal para construir la casa de tus sueños en un entorno boscoso y tranquilo. Vistas parciales a la montaña.',
    services: ['Agua', 'Luz'],
    publicationDate: getPastDate(5),
  },
  {
    id: 2,
    address: 'Esquina Comercial, Av. de las Torres',
    price: 2300000,
    sqft: 800,
    frontage: 40,
    depth: 20,
    propertyType: 'Comercial',
    images: ['https://picsum.photos/seed/land2/600/400'],
    description: 'Oportunidad única para inversionistas. Inmueble en esquina sobre avenida principal con alto flujo vehicular, perfecto para locales comerciales o una plaza pequeña.',
    services: ['Agua', 'Luz', 'Drenaje'],
    publicationDate: getPastDate(12),
  },
  {
    id: 3,
    address: 'Fraccionamiento Vistas del Bosque, Lote 44',
    price: 1200000,
    sqft: 600,
    frontage: 15,
    depth: 40,
    propertyType: 'Residencial',
    images: ['https://picsum.photos/seed/land3/600/400'],
    description: 'Inmueble descendente con espectaculares vistas panorámicas. Ubicado dentro de un fraccionamiento privado con seguridad las 24 horas.',
    services: ['Agua', 'Luz', 'Seguridad Privada'],
    publicationDate: getPastDate(30),
  },
  {
    id: 4,
    address: 'Calle Cedros 55, Col. El Mirador',
    price: 1550000,
    sqft: 750,
    frontage: 25,
    depth: 30,
    propertyType: 'Mixto',
    images: ['https://picsum.photos/seed/land4/600/400'],
    description: 'Amplio inmueble con uso de suelo mixto. Ideal para desarrollar un proyecto de departamentos con locales comerciales en la planta baja. Zona de alta plusvalía.',
    services: ['Agua', 'Luz', 'Drenaje', 'Pavimento'],
    publicationDate: getPastDate(2),
  },
  {
    id: 5,
    address: 'Parcela 7, Ejido San Nicolás',
    price: 650000,
    sqft: 1000,
    frontage: 20,
    depth: 50,
    propertyType: 'Residencial',
    images: ['https://picsum.photos/seed/land5/600/400'],
    description: 'Inmueble rústico de gran tamaño, perfecto para una casa de campo o para siembra. Entorno natural y pacífico, a solo minutos de la carretera principal.',
    services: ['Toma de agua cercana'],
    publicationDate: getPastDate(45),
  },
  {
    id: 6,
    address: 'Lote Industrial junto a Carretera Picacho',
    price: 3100000,
    sqft: 2000,
    frontage: 40,
    depth: 50,
    propertyType: 'Comercial',
    images: ['https://picsum.photos/seed/land6/600/400'],
    description: 'Inmueble plano de uso comercial/industrial, estratégicamente ubicado con acceso directo a la carretera. Ideal para bodegas, talleres o centro de distribución.',
    services: ['Luz de alta tensión', 'Agua'],
    publicationDate: getPastDate(8),
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    author: 'Familia Hernández',
    avatarUrl: 'https://i.pravatar.cc/150?u=familia-hernandez',
    rating: 5,
    text: 'El proceso fue increíblemente fácil y transparente. Encontramos el inmueble perfecto para construir nuestra casa. ¡Totalmente recomendados!',
  },
  {
    id: 2,
    author: 'Carlos Gutiérrez',
    avatarUrl: 'https://i.pravatar.cc/150?u=carlos-gutierrez',
    rating: 5,
    text: 'Gran atención y profesionalismo. Me ayudaron a vender mi propiedad rápidamente y a un excelente precio. El equipo conoce muy bien la zona del Ajusco.',
  },
  {
    id: 3,
    author: 'Sofía Morales',
    avatarUrl: 'https://i.pravatar.cc/150?u=sofia-morales',
    rating: 5,
    text: 'Como inversionista, valoro la eficiencia. · Inmuebles V · me presentó las mejores oportunidades comerciales. Sin duda volveré a trabajar con ellos.',
  },
];
