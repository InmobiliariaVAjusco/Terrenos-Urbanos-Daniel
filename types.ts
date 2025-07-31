
export type ListingType = 'Venta' | 'Renta';

export type PropertyCategory = 
  | 'Casa' 
  | 'Departamento' 
  | 'Terreno' 
  | 'Rancho' 
  | 'Casa en condominio' 
  | 'Casa con terreno' 
  | 'Comercial' 
  | 'Mixto';

export type PropertyStatus = 'Disponible' | 'Vendida' | 'Rentada';

export interface Property {
  id: string;
  address: string;
  price: number;
  sqft: number;
  frontage: number; // Frente en metros
  depth: number; // Fondo en metros
  category: PropertyCategory;
  listingType: ListingType;
  images: string[];
  description: string;
  services: string[]; // e.g. ['Agua', 'Luz', 'Drenaje']
  publicationDate: string; // ISO 8601 date string
  status: PropertyStatus; // <-- Nuevo campo para el estado
  isFeatured?: boolean; // <-- Campo para destacar en el carrusel
  rooms?: number;
  bathrooms?: number;
  mainFeatures: [string, string, string];
}

export interface Review {
  id: string;
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

export interface Advisor {
    name: string;
    photoUrl: string;
    description: string;
    phone: string;
    whatsapp: string;
}

export type PrivacyState = 'pending' | 'accepted' | 'rejected';

export type View = 'home' | 'buy' | 'favorites' | 'rent' | 'investment' | 'privacy' | 'contact' | 'my-reviews';

export type SellRequestData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  description: string;
  imageUrls: string[];
  price: string;
};
