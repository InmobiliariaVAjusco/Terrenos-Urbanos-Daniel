import React from 'react';
import { LandPlot } from '../types';

interface LandPlotDetailProps {
  landPlot: LandPlot;
  onToggleFavorite: (id: number) => void;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-all duration-200 ${ filled ? 'text-red-500' : 'text-gray-400 hover:text-red-500' }`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

export const LandPlotDetail: React.FC<LandPlotDetailProps> = ({ landPlot, onToggleFavorite }) => {
  const contactEmail = 'daniel.bienesraices@example.com';

  return (
    <div className="p-2 sm:p-4">
      <img src={landPlot.image} alt={landPlot.address} className="w-full h-64 object-cover rounded-lg mb-4" />
      <div className="p-2 sm:p-4">
        <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-slate-800 pr-4">{landPlot.address}</h2>
            <button onClick={() => onToggleFavorite(landPlot.id)} className="p-2 -mt-1" aria-label="Añadir a favoritos">
                <HeartIcon filled={landPlot.isFavorite} />
            </button>
        </div>
        <p className="text-3xl font-light text-indigo-600 mb-4">${landPlot.price.toLocaleString('es-MX')}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600 mb-4 border-b pb-4">
          <span className="font-semibold">{landPlot.frontage}m de frente</span>
          <span className="font-semibold">{landPlot.depth}m de fondo</span>
          <span className="font-semibold">{landPlot.sqft.toLocaleString('es-MX')} m²</span>
        </div>
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Uso de Suelo</h3>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1.5 rounded-full">{landPlot.landUse}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-slate-700">Descripción</h3>
        <p className="text-slate-700 mb-4">{landPlot.description}</p>
        <h3 className="text-lg font-semibold mb-2 text-slate-700">Servicios Disponibles</h3>
        <div className="flex flex-wrap gap-2">
            {landPlot.services.map(service => (
                <span key={service} className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-full">{service}</span>
            ))}
        </div>
        <a 
          href={`mailto:${contactEmail}?subject=Interesado en el terreno: ${encodeURIComponent(landPlot.address)}`}
          className="w-full block text-center mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Contactar al Vendedor
        </a>
      </div>
    </div>
  );
};