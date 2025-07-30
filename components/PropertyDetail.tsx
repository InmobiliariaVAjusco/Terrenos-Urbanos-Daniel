
import React, { useState, useEffect } from 'react';
import { Property } from '../types';

interface PropertyDetailProps {
  property: Property;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-all duration-200 ${ filled ? 'text-red-500' : 'text-gray-400 hover:text-red-500' }`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onToggleFavorite, isFavorite }) => {
  const contactEmail = 'contacto.inmueblesv.ajusco@example.com';
  const [mainImage, setMainImage] = useState(property.images?.[0] || '');

  useEffect(() => {
    if (property.images && property.images.length > 0) {
        setMainImage(property.images[0]);
    }
  }, [property.images]);


  return (
    <div className="p-2 sm:p-4">
      {mainImage && (
        <img src={mainImage} alt={property.address} className="w-full h-64 sm:h-80 object-cover rounded-lg mb-4" />
      )}
      {property.images && property.images.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
            {property.images.map((image, index) => (
                <button 
                    key={index} 
                    onClick={() => setMainImage(image)} 
                    className={`rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${mainImage === image ? 'ring-2 ring-green-500' : ''}`}
                >
                    <img 
                        src={image} 
                        alt={`Vista ${index+1} de ${property.address}`} 
                        className="w-16 h-16 object-cover" 
                    />
                </button>
            ))}
        </div>
      )}
      <div className="p-2 sm:p-4">
        <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-slate-800 pr-4">{property.address}</h2>
            <button onClick={() => onToggleFavorite(property.id)} className="p-2 -mt-1" aria-label="Añadir a favoritos">
                <HeartIcon filled={isFavorite} />
            </button>
        </div>
        <p className="text-3xl font-light text-green-600 mb-4">${property.price.toLocaleString('es-MX')}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600 mb-4 border-b pb-4">
          <span className="font-semibold">{property.frontage}m de frente</span>
          <span className="font-semibold">{property.depth}m de fondo</span>
          <span className="font-semibold">{property.sqft.toLocaleString('es-MX')} m²</span>
        </div>
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Tipo de Inmueble</h3>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1.5 rounded-full">{property.propertyType}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-slate-700">Descripción</h3>
        <p className="text-slate-700 mb-4">{property.description}</p>
        <h3 className="text-lg font-semibold mb-2 text-slate-700">Servicios Disponibles</h3>
        <div className="flex flex-wrap gap-2">
            {property.services.map(service => (
                <span key={service} className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-full">{service}</span>
            ))}
        </div>
        <a 
          href={`mailto:${contactEmail}?subject=Interesado en el inmueble (${encodeURIComponent(property.address)})`}
          className="w-full block text-center mt-6 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            Contactar al Vendedor
        </a>
      </div>
    </div>
  );
};