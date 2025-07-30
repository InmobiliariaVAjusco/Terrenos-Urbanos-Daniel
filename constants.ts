
import { Review } from './types';

// Helper to get past dates for more realistic data
const getPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

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