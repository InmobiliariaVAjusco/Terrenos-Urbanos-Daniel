
import React, { useState, useMemo, useCallback } from 'react';
import { Property, PropertyCategory } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  onToggleFavorite: (id: string) => void;
  favorites: string[];
  title?: string;
  onSelectProperty: (property: Property) => void;
}

const ITEMS_PER_PAGE = 6;

// Icon Components
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);

const propertyCategories: PropertyCategory[] = ['Casa', 'Departamento', 'Terreno', 'Rancho', 'Casa en condominio', 'Casa con terreno', 'Comercial', 'Mixto'];

export const PropertyList: React.FC<PropertyListProps> = ({ properties, onToggleFavorite, favorites, title = "Encuentra tu Inmueble Ideal", onSelectProperty }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProperties = useMemo(() => {
    return properties
      .filter(property => filter === 'all' || property.category === filter)
      .filter(property =>
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [properties, filter, searchTerm]);

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  return (
    <section>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-600 mb-6">Explora las mejores oportunidades en la zona del Ajusco.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar por dirección o palabra clave..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              aria-label="Buscar inmueble"
            />
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterIcon />
            </div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as any)}
              className="w-full appearance-none bg-white pl-10 pr-10 py-3 border border-slate-300 rounded-lg shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              aria-label="Filtrar por tipo de inmueble"
            >
              <option value="all">Todos los Tipos</option>
              {propertyCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>
      </div>

      {paginatedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onSelect={onSelectProperty} 
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(property.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-slate-700">No se encontraron inmuebles</h3>
            <p className="text-slate-500 mt-2">Intenta ajustar tu búsqueda o filtros. Actualmente no hay propiedades que coincidan con tus criterios.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Paginación">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-green-50 border-green-500 text-green-600'
                    : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                } ${page === 1 ? 'rounded-l-md' : ''} ${page === totalPages ? 'rounded-r-md' : '-ml-px'}`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}
    </section>
  );
};
