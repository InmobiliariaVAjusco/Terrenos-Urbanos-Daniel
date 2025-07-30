
import React, { memo } from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

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

// Generic icon for main features
const FeatureIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


export const PropertyCard: React.FC<PropertyCardProps> = memo(({ property, onSelect, onToggleFavorite, isFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    onToggleFavorite(property.id);
  };

  const { category, listingType, price, images, address, mainFeatures } = property;
  const bannerText = `${category} en ${listingType}`;

  return (
    <div onClick={() => onSelect(property)} className="group w-full text-left bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 transition-all duration-300 flex flex-col cursor-pointer">
      <div className="relative">
        <img src={images[0]} alt={`Vista del inmueble en ${address}`} className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        
        <div className="absolute top-3 left-3">
            <div className="px-3 py-1.5 bg-slate-800/80 backdrop-blur-sm text-white font-bold text-sm rounded-full shadow-lg uppercase tracking-wider">
                {bannerText}
            </div>
        </div>

        <div className="absolute top-2 right-2">
            <button onClick={handleFavoriteClick} className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm" aria-label="Añadir a favoritos">
                <HeartIcon filled={isFavorite} />
            </button>
        </div>

        {images && images.length > 1 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 text-white text-xs font-semibold py-1 px-2.5 rounded-full backdrop-blur-sm">
                <CameraIcon />
                <span>{images.length}</span>
            </div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
          <h3 className="font-bold text-xl text-slate-800 truncate group-hover:text-green-700 transition-colors" title={address}>
            {address}
          </h3>
          
          <div className="my-4 space-y-2">
            {mainFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-slate-600">
                    <FeatureIcon/>
                    <span className="font-medium">{feature}</span>
                </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-200/80">
            <div className="bg-amber-50/80 p-3 rounded-lg text-center">
                <p className="text-sm font-semibold text-amber-800">PRECIO</p>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    ${price.toLocaleString('es-MX')}
                </p>
            </div>
          </div>
      </div>
    </div>
  );
});