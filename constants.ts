
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
    images: ['https://i.ibb.co/bFqY9xR/land1.jpg', 'https://i.ibb.co/n7ZJqgW/land1-2.jpg'],
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
    images: ['https://i.ibb.co/GcVf4sK/land2.jpg'],
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
    images: ['https://i.ibb.co/yY1hXyC/land3.jpg', 'https://i.ibb.co/2Z5hS0t/land3-2.jpg'],
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
    images: ['https://i.ibb.co/R4rT9gM/land4.jpg'],
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
    images: ['https://i.ibb.co/VMy4bFG/land5.jpg'],
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
    images: ['https://i.ibb.co/dKqS1P1/land6.jpg', 'https://i.ibb.co/gZk1Y9J/land6-2.jpg', 'https://i.ibb.co/yVsW6sW/land6-3.jpg'],
    description: 'Inmueble plano de uso comercial/industrial, estratégicamente ubicado con acceso directo a la carretera. Ideal para bodegas, talleres o centro de distribución.',
    services: ['Luz de alta tensión', 'Agua'],
    publicationDate: getPastDate(8),
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'demo-1',
    author: 'Carlos Mendoza',
    avatarUrl: 'https://i.pravatar.cc/150?u=carlos',
    rating: 5,
    text: '¡El servicio fue excepcional! Encontraron el terreno perfecto para mi familia en tiempo récord. Totalmente recomendados.',
    userId: 'demo-user-1',
    date: getPastDate(7),
  },
  {
    id: 'demo-2',
    author: 'Ana Sofía Rodríguez',
    avatarUrl: 'https://i.pravatar.cc/150?u=anasofia',
    rating: 5,
    text: 'Pusimos nuestro inmueble en venta y el proceso fue transparente y muy profesional. La plataforma es muy fácil de usar.',
    userId: 'demo-user-2',
    date: getPastDate(22),
  },
];