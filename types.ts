export type LandUse = 'Residencial' | 'Comercial' | 'Mixto';

export interface LandPlot {
  id: number;
  address: string;
  price: number;
  sqft: number;
  frontage: number; // Frente en metros
  depth: number; // Fondo en metros
  landUse: LandUse;
  image: string;
  description: string;
  services: string[]; // e.g. ['Agua', 'Luz', 'Drenaje']
  publicationDate: string; // ISO 8601 date string
  isFavorite: boolean;
}