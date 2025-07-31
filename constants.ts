import { Review, Advisor } from './types';

// Helper to get past dates for more realistic data
const getPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Se han eliminado las reseñas de demostración según la solicitud del usuario.
export const INITIAL_REVIEWS: Review[] = [];

export const ADVISORS: Advisor[] = [
    {
        name: 'Daniel Valencia',
        photoUrl: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753909062/VICTOR_MANUEL_GARCIA_baxc24.jpg',
        description: 'Especialista en terrenos comerciales e inversiones. Comprometido con encontrar la mejor oportunidad para hacer crecer tu patrimonio.',
        phone: '5545313262',
        whatsapp: '5215545313262'
    },
    {
        name: 'Humberto G.',
        photoUrl: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753908865/H_G_INMOBILIARIO_l7d3t3.jpg',
        description: 'Asesor experto con más de 10 años de experiencia, especializado en créditos hipotecarios y propiedades residenciales en la zona sur de CDMX.',
        phone: '5568982403',
        whatsapp: '5215545313262'
    }
];

// Configuration for Sell Request Feature
export const FORM_SUBMIT_EMAIL = 'inmuebles135@gmail.com';