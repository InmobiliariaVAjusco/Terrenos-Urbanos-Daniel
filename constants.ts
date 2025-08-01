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
        photoUrl: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1754084486/Captura_de_pantalla_2025-08-01_154051_dppugu.png',
        description: 'Especialista en terrenos comerciales e inversiones. Comprometido con encontrar la mejor oportunidad para hacer crecer tu patrimonio.',
        phone: '+525613823028',
        whatsapp: '+525613823028'
    },
    {
        name: 'Humberto Gonzalez.',
        photoUrl: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753999653/WhatsApp_Image_2025-07-31_at_3.02.51_PM_epizn1.jpg',
        description: 'Asesor experto con más de 10 años de experiencia, especializado en créditos hipotecarios y propiedades residenciales en la zona sur de CDMX.',
        phone: '+525568982403',
        whatsapp: '+525568982403'
    }
];

// Configuration for Sell Request Feature
export const FORM_SUBMIT_EMAIL = 'inmuebles135@gmail.com';