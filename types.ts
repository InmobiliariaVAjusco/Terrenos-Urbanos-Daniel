
export type PropertyType = 'Residencial' | 'Comercial' | 'Mixto';

export interface Property {
  id: number;
  address: string;
  price: number;
  sqft: number;
  frontage: number; // Frente en metros
  depth: number; // Fondo en metros
  propertyType: PropertyType;
  images: string[];
  description: string;
  services: string[]; // e.g. ['Agua', 'Luz', 'Drenaje']
  publicationDate: string; // ISO 8601 date string
}

export interface Review {
  id: number;
  author: string;
  avatarUrl: string;
  rating: number; // e.g., 4 or 5
  text: string;
  userId: string; // ID del usuario que creó la reseña
  date: string; // ISO 8601 date string de la creación
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export type PrivacyState = 'pending' | 'accepted' | 'rejected';

export type View = 'home' | 'buy' | 'sell' | 'favorites' | 'rent' | 'investment' | 'privacy' | 'contact';
