import React, { useState, useMemo, useCallback } from 'react';
import { Property, ListingType, PropertyCategory } from '../types';
import { PropertyCard } from './PropertyCard';
import { Modal } from './Modal';
import { PropertyDetail } from './PropertyDetail';

interface BudgetPageProps {
  allProperties: Property[];
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

const propertyCategories: PropertyCategory[] = ['Casa', 'Departamento', 'Terreno', 'Rancho', 'Casa en condominio', 'Casa con terreno', 'Comercial', 'Mixto'];

const BudgetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m-1.5-1.5H5.625c-.621 0-1.125-.504-1.125-1.125V18.75m12.75-12.75h-2.55M11.25 6H9" />
    </svg>
);


const NoResultsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
    </svg>
);

export const BudgetPage: React.FC<BudgetPageProps> = ({ allProperties, onToggleFavorite, favorites }) => {
    const [listingType, setListingType] = useState<ListingType>('Venta');
    const [category, setCategory] = useState<PropertyCategory | 'all'>('all');
    const [budget, setBudget] = useState('');
    const [results, setResults] = useState<Property[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const numericBudget = Number(budget.replace(/[,.]/g, ''));
        if (!numericBudget || numericBudget <= 0) {
            alert("Por favor, introduce un presupuesto válido.");
            return;
        }

        const filtered = allProperties.filter(p => {
            const isListingTypeMatch = p.listingType === listingType;
            const isCategoryMatch = category === 'all' || p.category === category;
            const isWithinBudget = p.price <= numericBudget;
            const isAvailable = p.status === 'Disponible' || !p.status;
            return isListingTypeMatch && isCategoryMatch && isWithinBudget && isAvailable;
        });

        setResults(filtered.sort((a, b) => b.price - a.price));
        setHasSearched(true);
    };

    const handleClear = () => {
        setListingType('Venta');
        setCategory('all');
        setBudget('');
        setResults([]);
        setHasSearched(false);
    };

    const handleSelectProperty = useCallback((property: Property) => setSelectedProperty(property), []);
    const handleCloseModal = useCallback(() => setSelectedProperty(null), []);

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        const numberValue = Number(rawValue);
        if (!isNaN(numberValue) && rawValue) {
            setBudget(numberValue.toLocaleString('es-MX'));
        } else {
            setBudget('');
        }
    };

    return (
        <div className="space-y-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                <div className="text-center mb-8">
                    <BudgetIcon />
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-4">Encuentra tu Propiedad Ideal</h1>
                    <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">Ajusta los filtros y descubre las mejores opciones que se adaptan a tu presupuesto.</p>
                </div>
                <form onSubmit={handleSearch} className="space-y-6 max-w-3xl mx-auto">
                    <fieldset>
                        <legend className="text-lg font-semibold text-slate-800 text-center mb-3">1. ¿Qué buscas?</legend>
                        <div className="flex justify-center bg-slate-100 p-1.5 rounded-lg">
                            <button type="button" onClick={() => setListingType('Venta')} className={`w-1/2 py-2.5 rounded-md font-bold text-center transition-all ${listingType === 'Venta' ? 'bg-green-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>Comprar</button>
                            <button type="button" onClick={() => setListingType('Renta')} className={`w-1/2 py-2.5 rounded-md font-bold text-center transition-all ${listingType === 'Renta' ? 'bg-green-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>Rentar</button>
                        </div>
                    </fieldset>

                    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">2. Tipo de Inmueble</label>
                            <select id="category" value={category} onChange={e => setCategory(e.target.value as any)} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option value="all">Todos los tipos</option>
                                {propertyCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1">3. Presupuesto Máximo (MXN)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-bold">$</div>
                                <input id="budget" type="text" value={budget} onChange={handleBudgetChange} placeholder="Ej: 1,500,000" required className="w-full pl-7 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            </div>
                        </div>
                    </fieldset>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 border-t border-slate-200">
                        <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700 transition-transform hover:scale-105">Buscar Propiedades</button>
                        {hasSearched && <button type="button" onClick={handleClear} className="w-full sm:w-auto px-6 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg">Limpiar Búsqueda</button>}
                    </div>
                </form>
            </div>

            {hasSearched && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">{results.length} {results.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}</h2>
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {results.map(property => (
                                <PropertyCard key={property.id} property={property} onSelect={handleSelectProperty} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(property.id)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-md border border-slate-200">
                            <NoResultsIcon />
                            <h3 className="text-xl font-semibold text-slate-700 mt-4">No se encontraron resultados</h3>
                            <p className="text-slate-500 mt-2">Intenta ampliar tu presupuesto o cambiar los filtros de búsqueda.</p>
                        </div>
                    )}
                </div>
            )}
            <Modal isOpen={!!selectedProperty} onClose={handleCloseModal}>
                {selectedProperty && <PropertyDetail property={selectedProperty} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(selectedProperty.id)} />}
            </Modal>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};