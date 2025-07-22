import { LandPlot } from './types';

export const INITIAL_LAND_PLOTS: LandPlot[] = [
  {
    id: 1,
    address: 'Lote 12, Camino al Ajusco Km 21',
    price: 850000,
    sqft: 500,
    frontage: 20,
    depth: 25,
    landUse: 'Residencial',
    image: 'https://picsum.photos/seed/land1/600/400',
    description: 'Excelente terreno plano con uso de suelo residencial, ideal para construir la casa de tus sueños en un entorno boscoso y tranquilo. Vistas parciales a la montaña.',
    services: ['Agua', 'Luz']
  },
  {
    id: 2,
    address: 'Esquina Comercial, Av. de las Torres',
    price: 2300000,
    sqft: 800,
    frontage: 40,
    depth: 20,
    landUse: 'Comercial',
    image: 'https://picsum.photos/seed/land2/600/400',
    description: 'Oportunidad única para inversionistas. Terreno en esquina sobre avenida principal con alto flujo vehicular, perfecto para locales comerciales o una plaza pequeña.',
    services: ['Agua', 'Luz', 'Drenaje']
  },
  {
    id: 3,
    address: 'Fraccionamiento Vistas del Bosque, Lote 44',
    price: 1200000,
    sqft: 600,
    frontage: 15,
    depth: 40,
    landUse: 'Residencial',
    image: 'https://picsum.photos/seed/land3/600/400',
    description: 'Terreno descendente con espectaculares vistas panorámicas. Ubicado dentro de un fraccionamiento privado con seguridad las 24 horas.',
    services: ['Agua', 'Luz', 'Seguridad Privada']
  },
  {
    id: 4,
    address: 'Calle Cedros 55, Col. El Mirador',
    price: 1550000,
    sqft: 750,
    frontage: 25,
    depth: 30,
    landUse: 'Mixto',
    image: 'https://picsum.photos/seed/land4/600/400',
    description: 'Amplio terreno con uso de suelo mixto. Ideal para desarrollar un proyecto de departamentos con locales comerciales en la planta baja. Zona de alta plusvalía.',
    services: ['Agua', 'Luz', 'Drenaje', 'Pavimento']
  },
  {
    id: 5,
    address: 'Parcela 7, Ejido San Nicolás',
    price: 650000,
    sqft: 1000,
    frontage: 20,
    depth: 50,
    landUse: 'Residencial',
    image: 'https://picsum.photos/seed/land5/600/400',
    description: 'Terreno rústico de gran tamaño, perfecto para una casa de campo o para siembra. Entorno natural y pacífico, a solo minutos de la carretera principal.',
    services: ['Toma de agua cercana']
  },
  {
    id: 6,
    address: 'Lote Industrial junto a Carretera Picacho',
    price: 3100000,
    sqft: 2000,
    frontage: 40,
    depth: 50,
    landUse: 'Comercial',
    image: 'https://picsum.photos/seed/land6/600/400',
    description: 'Terreno plano de uso comercial/industrial, estratégicamente ubicado con acceso directo a la carretera. Ideal para bodegas, talleres o centro de distribución.',
    services: ['Luz de alta tensión', 'Agua']
  },
];