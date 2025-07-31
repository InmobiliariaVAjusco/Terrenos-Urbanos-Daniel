import React, { useState, useEffect } from 'react';
import { Property } from '../types';

// To inform TypeScript about the global gtag function
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

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

const DetailIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-6 h-6 mr-2 text-green-600 flex-shrink-0">{children}</div>
);

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onToggleFavorite, isFavorite }) => {
  const contactEmail = 'h.g.inmobiliario@gmail.com';
  const [mainImage, setMainImage] = useState(property.images?.[0] || '');

  useEffect(() => {
    if (property.images && property.images.length > 0) {
        setMainImage(property.images[0]);
    }

    // Fire Google Analytics event for property view
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'view_item', {
            "items": [{
                "item_id": property.id,
                "item_name": property.address,
                "item_category": property.category
            }]
        });
    }
  }, [property]); // Re-run effect if the property object itself changes

  const { category, listingType, address, price, mainFeatures, description, services, sqft, frontage, depth, rooms, bathrooms } = property;
  const bannerText = `${category} en ${listingType}`;

  return (
    <div>
      {/* Image Gallery */}
      <div className="relative">
        <img src={mainImage} alt={address} className="w-full h-64 sm:h-80 object-cover" />
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-800/80 backdrop-blur-sm text-white font-bold text-sm rounded-full shadow-lg uppercase tracking-wider">
            {bannerText}
        </div>
      </div>
      
      {property.images && property.images.length > 1 && (
        <div className="p-4 bg-slate-100 flex flex-wrap gap-2">
            {property.images.map((image, index) => (
                <button 
                    key={index} 
                    onClick={() => setMainImage(image)} 
                    className={`rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${mainImage === image ? 'ring-2 ring-green-600 ring-offset-2' : ''}`}
                >
                    <img 
                        src={image} 
                        alt={`Vista ${index+1} de ${address}`} 
                        className="w-16 h-16 object-cover" 
                    />
                </button>
            ))}
        </div>
      )}
      
      {/* Main Content */}
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-slate-800 pr-4">{address}</h2>
            <button onClick={() => onToggleFavorite(property.id)} className="p-2 -mt-2 -mr-2 flex-shrink-0" aria-label="Añadir a favoritos">
                <HeartIcon filled={isFavorite} />
            </button>
        </div>

        {/* Price */}
        <div className="bg-amber-50 p-4 rounded-lg text-center mb-6">
            <p className="text-sm font-semibold text-amber-800">PRECIO</p>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tight">
                ${price.toLocaleString('es-MX')}
            </p>
        </div>

        {/* Main Features */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-700">Características Principales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mainFeatures.map((feature, index) => (
                    <div key={index} className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="font-bold text-green-800">{feature}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Description */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Descripción</h3>
            <p className="text-slate-700 whitespace-pre-wrap">{description}</p>
        </div>

        {/* Details Section */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-700">Detalles del Inmueble</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-slate-600">
                <div className="flex items-center"><DetailIcon><path d="M7 7a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 11-2 0V8H8a1 1 0 01-1-1z" /><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5h12a1 1 0 100-2H3z" clipRule="evenodd" /></DetailIcon> {sqft.toLocaleString('es-MX')} m² de superficie</div>
                <div className="flex items-center"><DetailIcon><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M8 4l-4 4 4 4m8 8l4-4-4-4" /></DetailIcon> {frontage}m de frente</div>
                {rooms && <div className="flex items-center"><DetailIcon><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></DetailIcon> {rooms} recámaras</div>}
                {bathrooms && <div className="flex items-center"><DetailIcon><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75v-2.625A3.375 3.375 0 015.625 6.75h12.75c1.865 0 3.375 1.51 3.375 3.375v2.625M16.5 6.75v3.75m-6-3.75v3.75m-6-3.75v3.75M3 13.5h18M3 17.25h18" /></DetailIcon> {bathrooms} baños</div>}
                <div className="flex items-center"><DetailIcon><path strokeLinecap="round" strokeLinejoin="round" d="M8 4v16m8-16v16M4 8l4-4 4 4m8 8l-4 4-4-4" /></DetailIcon> {depth}m de fondo</div>
            </div>
        </div>

        {/* Services */}
        {services && services.length > 0 && (
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2 text-slate-700">Servicios Disponibles</h3>
                <div className="flex flex-wrap gap-2">
                    {services.map(service => (
                        <span key={service} className="bg-slate-100 text-slate-800 text-sm font-medium px-3 py-1.5 rounded-full">{service}</span>
                    ))}
                </div>
            </div>
        )}
        
        <a 
          href={`mailto:${contactEmail}?subject=Interesado en ${category} en ${encodeURIComponent(address)}`}
          className="w-full block text-center mt-6 bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-lg"
        >
            Contactar al Vendedor
        </a>
      </div>
    </div>
  );
};