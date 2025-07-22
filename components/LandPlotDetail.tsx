import React from 'react';
import { LandPlot } from '../types';

interface LandPlotDetailProps {
  landPlot: LandPlot;
}

export const LandPlotDetail: React.FC<LandPlotDetailProps> = ({ landPlot }) => {
  return (
    <div className="p-2 sm:p-4">
      <img src={landPlot.image} alt={landPlot.address} className="w-full h-64 object-cover rounded-lg mb-4" />
      <div className="p-2 sm:p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{landPlot.address}</h2>
        <p className="text-3xl font-light text-teal-600 mb-4">${landPlot.price.toLocaleString('es-ES')}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600 mb-4 border-b pb-4">
          <span className="font-semibold">{landPlot.frontage}m de frente</span>
          <span className="font-semibold">{landPlot.depth}m de fondo</span>
          <span className="font-semibold">{landPlot.sqft.toLocaleString('es-ES')} m²</span>
        </div>
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Uso de Suelo</h3>
            <span className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1.5 rounded-full">{landPlot.landUse}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-slate-700">Descripción</h3>
        <p className="text-slate-700 mb-4">{landPlot.description}</p>
        <h3 className="text-lg font-semibold mb-2 text-slate-700">Servicios Disponibles</h3>
        <div className="flex flex-wrap gap-2">
            {landPlot.services.map(service => (
                <span key={service} className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">{service}</span>
            ))}
        </div>
        <button className="w-full mt-6 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
            Contactar al Vendedor
        </button>
      </div>
    </div>
  );
};
