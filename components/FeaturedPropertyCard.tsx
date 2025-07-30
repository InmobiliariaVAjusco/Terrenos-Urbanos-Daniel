
import React from 'react';
import { Property } from '../types';

interface FeaturedPropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-all duration-200 ${ filled ? 'text-red-500' : 'text-white' }`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

export const FeaturedPropertyCard: React.FC<FeaturedPropertyCardProps> = ({ property, onSelect, onToggleFavorite, isFavorite }) => {

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    onToggleFavorite(property.id);
  };
  
  const bannerText = `${property.category} en ${property.listingType}`;

  return (
    <div className="w-full h-full relative cursor-pointer" onClick={() => onSelect(property)}>
      <img
        src={property.images[0]}
        alt={`Vista del inmueble en ${property.address}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      
      <div className="absolute top-0 left-0 p-8 w-full">
         <div className="px-3 py-1.5 bg-slate-800/80 backdrop-blur-sm text-white font-bold text-sm rounded-full shadow-lg uppercase tracking-wider inline-block">
            {bannerText}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 p-8 text-white w-full">
         <div className="flex justify-between items-end">
             <div>
                <h3 className="text-4xl font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
                    ${property.price.toLocaleString('es-MX')}
                </h3>
                <p className="text-lg text-slate-200 mt-1" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>
                    {property.address}
                </p>
             </div>
              <button onClick={handleFavoriteClick} className="p-3 rounded-full bg-black/30 hover:bg-black/50 transition-colors" aria-label="Añadir a favoritos">
                <HeartIcon filled={isFavorite} />
              </button>
         </div>
      </div>
    </div>
  );
};