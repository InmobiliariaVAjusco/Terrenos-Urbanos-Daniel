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
  <div className="w-6 h-6 mr-3 text-green-600 flex-shrink-0">{children}</div>
);

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onToggleFavorite, isFavorite }) => {
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

  const { category, listingType, address, price, mainFeatures, description, services, sqft, frontage, depth, rooms, bathrooms, status } = property;
  const bannerText = `${category} en ${listingType}`;
  const isAvailable = status === 'Disponible' || !status; // Treat missing status as available
  
  // Create a dynamic list of details, filtering out any that are missing or zero.
  const propertyDetails = [
    { value: sqft, label: "m² de superficie", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg> },
    { value: frontage, label: "m de frente", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" /></svg> },
    { value: depth, label: "m de fondo", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6.75-6.75M12 19.5l6.75-6.75" /></svg> },
    { value: rooms, label: rooms === 1 ? "recámara" : "recámaras", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg> },
    { value: bathrooms, label: bathrooms === 1 ? "baño" : "baños", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75v-2.625A3.375 3.375 0 015.625 6.75h12.75c1.865 0 3.375 1.51 3.375 3.375v2.625M16.5 6.75v3.75m-6-3.75v3.75m-6-3.75v3.75M3 13.5h18M3 17.25h18" /></svg> },
  ].filter(detail => detail.value);
  
  const whatsappNumber = "5215568982403"; // Número oficial sin "+" o espacios
  const whatsappMessage = encodeURIComponent(`Hola, me interesa el inmueble "${property.category}" ubicado en "${property.address}". ¿Podrían darme más información?`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


  return (
    <div>
      {/* Image Gallery */}
      <div className="relative overflow-hidden">
        <img src={mainImage} alt={address} className="w-full h-64 sm:h-80 object-cover" />
        
        {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 pointer-events-none">
                <div className="transform -rotate-12 border-4 border-white text-white font-extrabold text-5xl uppercase tracking-widest py-4 px-10 bg-black/60 backdrop-blur-sm shadow-2xl">
                    {status}
                </div>
            </div>
        )}

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
        {propertyDetails.length > 0 && (
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-slate-700">Detalles del Inmueble</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-slate-700">
                    {propertyDetails.map((detail, index) => (
                        <div key={index} className="flex items-center">
                            <DetailIcon>{detail.icon}</DetailIcon>
                            <span>
                                <span className="font-bold">{detail.value.toLocaleString('es-MX')}</span>
                                {` ${detail.label}`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )}

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
        
        {isAvailable && (
            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full block text-center mt-6 bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-lg"
            >
                Contactar al Vendedor
            </a>
        )}
      </div>
    </div>
  );
};