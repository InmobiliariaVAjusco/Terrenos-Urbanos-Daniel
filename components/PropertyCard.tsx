import React, { memo } from 'react';
import { LandPlot } from '../types';

interface PropertyCardProps {
  property: LandPlot;
  onSelect: (property: LandPlot) => void;
}

// Icon components for land plot features
const FrontageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

const DepthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
);

const SqftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 8V4h4L3 8zm14-4v4h-4l4-4zM8 17v-4H4l4 4zm8-4h-4v4l4-4z" clipRule="evenodd" />
  </svg>
);

export const PropertyCard: React.FC<PropertyCardProps> = memo(({ property, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(property)}
      className="group w-full text-left bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300"
      aria-label={`Ver detalles de ${property.address}`}
    >
      <div className="relative">
        <img src={property.image} alt={`Vista del terreno en ${property.address}`} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-teal-600 text-white font-bold text-lg p-2 m-2 rounded-md shadow-lg">
          ${property.price.toLocaleString('es-ES')}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-slate-800 truncate group-hover:text-teal-600 transition-colors" title={property.address}>
          {property.address}
        </h3>
        <p className="text-sm text-slate-500 mb-3 truncate">{property.description.substring(0, 70)}...</p>
        <div className="border-t border-slate-200 my-3"></div>
        <div className="flex justify-between items-center text-slate-700">
          <span className="flex items-center text-sm" aria-label={`${property.frontage} metros de frente`}>
            <FrontageIcon />
            {property.frontage}m frente
          </span>
          <span className="flex items-center text-sm" aria-label={`${property.depth} metros de fondo`}>
            <DepthIcon />
            {property.depth}m fondo
          </span>
          <span className="flex items-center text-sm" aria-label={`${property.sqft.toLocaleString('es-ES')} metros cuadrados`}>
            <SqftIcon />
            {property.sqft.toLocaleString('es-ES')} m²
          </span>
        </div>
      </div>
    </button>
  );
});