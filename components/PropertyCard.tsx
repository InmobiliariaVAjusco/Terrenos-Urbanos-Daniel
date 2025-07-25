
import React, { memo } from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
}

// Helper to format date
const formatDateAgo = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return 'Publicado hoy';
    if (diffDays <= 30) return `Publicado hace ${diffDays} días`;
    if (diffDays <= 365) return `Publicado hace ${Math.floor(diffDays / 30)} meses`;
    return `Publicado hace ${Math.floor(diffDays / 365)} años`;
};

// Icon components for land plot features
const FrontageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4l-4 4 4 4m8 8l4-4-4-4" />
    </svg>
);
const DepthIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v16m8-16v16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l4-4 4 4m8 8l-4 4-4-4" />
    </svg>
);
const SqftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5h12a1 1 0 100-2H3z" clipRule="evenodd" />
    <path d="M7 7a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 11-2 0V8H8a1 1 0 01-1-1z" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-200 ${ filled ? 'text-red-500' : 'text-gray-300 hover:text-red-400' }`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);

export const PropertyCard: React.FC<PropertyCardProps> = memo(({ property, onSelect, onToggleFavorite, isFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    onToggleFavorite(property.id);
  };

  return (
    <div className="group w-full text-left bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 transition-all duration-300 flex flex-col">
      <div className="relative">
        <button onClick={() => onSelect(property)} className="w-full">
            <img src={property.images[0]} alt={`Vista del inmueble en ${property.address}`} className="w-full h-48 object-cover" />
        </button>
        <div className="absolute top-2 right-2">
            <button onClick={handleFavoriteClick} className="p-2 rounded-full bg-black/40 hover:bg-black/60" aria-label="Añadir a favoritos">
                <HeartIcon filled={isFavorite} />
            </button>
        </div>
         <div className="absolute top-0 left-0 bg-green-600 text-white font-bold text-lg p-2 m-2 rounded-md shadow-lg">
          ${property.price.toLocaleString('es-MX')}
        </div>
        {property.images && property.images.length > 1 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 text-white text-xs font-semibold py-1 px-2 rounded-full">
                <CameraIcon />
                <span>{property.images.length}</span>
            </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <button onClick={() => onSelect(property)} className="text-left flex-grow">
            <h3 className="font-semibold text-lg text-slate-800 truncate group-hover:text-green-600 transition-colors" title={property.address}>
            {property.address}
            </h3>
            <p className="text-sm text-slate-500 mb-3">{property.description.substring(0, 70)}...</p>
        </button>
        <div className="border-t border-slate-200 mt-auto pt-3">
          <div className="flex justify-between items-center text-slate-700">
            <span className="flex items-center text-sm" aria-label={`${property.frontage} metros de frente`}>
              <FrontageIcon />
              {property.frontage}m frente
            </span>
            <span className="flex items-center text-sm" aria-label={`${property.depth} metros de fondo`}>
              <DepthIcon />
              {property.depth}m fondo
            </span>
            <span className="flex items-center text-sm" aria-label={`${property.sqft.toLocaleString('es-MX')} metros cuadrados`}>
              <SqftIcon />
              {property.sqft.toLocaleString('es-MX')} m²
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-right">{formatDateAgo(property.publicationDate)}</p>
        </div>
      </div>
    </div>
  );
});
