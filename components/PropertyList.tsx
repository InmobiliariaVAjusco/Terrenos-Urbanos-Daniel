import React, { useState, useMemo, useCallback } from 'react';
import { LandPlot } from '../types';
import { PropertyCard } from './PropertyCard';
import { Modal } from './Modal';
import { LandPlotDetail } from './LandPlotDetail';

interface PropertyListProps {
  landPlots: LandPlot[];
}

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg className="h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const PropertyList: React.FC<PropertyListProps> = ({ landPlots }) => {
  const [selectedLandPlot, setSelectedLandPlot] = useState<LandPlot | null>(null);
  const [filters, setFilters] = useState({
    maxPrice: '',
    minFrontage: '',
    minDepth: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredLandPlots = useMemo(() => {
    return landPlots.filter(land => {
      const { maxPrice, minFrontage, minDepth } = filters;
      if (maxPrice && land.price > parseInt(maxPrice)) return false;
      if (minFrontage && land.frontage < parseInt(minFrontage)) return false;
      if (minDepth && land.depth < parseInt(minDepth)) return false;
      return true;
    });
  }, [landPlots, filters]);

  const openModal = useCallback((land: LandPlot) => {
    setSelectedLandPlot(land);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedLandPlot(null);
  }, []);

  return (
    <div>
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center mb-4 sm:mb-0 flex-shrink-0"><FilterIcon /> Filtrar Terrenos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    <div className="relative">
                        <label htmlFor="maxPrice" className="sr-only">Precio Máximo</label>
                        <select id="maxPrice" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} className="w-full appearance-none bg-white font-semibold text-teal-700 p-2.5 pr-8 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition cursor-pointer">
                            <option value="">Precio Máximo</option>
                            <option value="800000">$800,000</option>
                            <option value="1500000">$1,500,000</option>
                            <option value="2500000">$2,500,000</option>
                            <option value="3500000">$3,500,000+</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                           <ChevronDownIcon />
                        </div>
                    </div>
                    <div className="relative">
                         <label htmlFor="minFrontage" className="sr-only">Frente Mínimo</label>
                        <select id="minFrontage" name="minFrontage" value={filters.minFrontage} onChange={handleFilterChange} className="w-full appearance-none bg-white font-semibold text-teal-700 p-2.5 pr-8 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition cursor-pointer">
                            <option value="">Frente Mínimo</option>
                            <option value="10">10m+</option>
                            <option value="20">20m+</option>
                            <option value="30">30m+</option>
                            <option value="40">40m+</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                           <ChevronDownIcon />
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="minDepth" className="sr-only">Fondo Mínimo</label>
                        <select id="minDepth" name="minDepth" value={filters.minDepth} onChange={handleFilterChange} className="w-full appearance-none bg-white font-semibold text-teal-700 p-2.5 pr-8 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition cursor-pointer">
                            <option value="">Fondo Mínimo</option>
                            <option value="20">20m+</option>
                            <option value="30">30m+</option>
                            <option value="40">40m+</option>
                            <option value="50">50m+</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                           <ChevronDownIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLandPlots.length > 0 ? (
            filteredLandPlots.map(landPlot => (
                <PropertyCard key={landPlot.id} property={landPlot} onSelect={openModal} />
            ))
        ) : (
            <div className="md:col-span-2 lg:col-span-3 text-center py-16">
                <h3 className="text-2xl font-semibold text-slate-600">No se encontraron terrenos</h3>
                <p className="text-slate-500 mt-2">Intente ajustar sus filtros o revise más tarde.</p>
            </div>
        )}
      </div>

      {selectedLandPlot && (
        <Modal isOpen={!!selectedLandPlot} onClose={closeModal}>
          <LandPlotDetail landPlot={selectedLandPlot} />
        </Modal>
      )}
    </div>
  );
};