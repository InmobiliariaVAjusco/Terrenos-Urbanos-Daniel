
import React from 'react';
import { Advisor } from '../types';

// Iconos locales para mantener el componente autónomo
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 005.467 5.467l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export const AdvisorCard: React.FC<{ advisor: Advisor }> = ({ advisor }) => (
    <div className="relative flex flex-col items-center bg-white rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 pt-16">
        <div className="absolute -top-16">
            <img 
                src={advisor.photoUrl} 
                alt={`Foto de ${advisor.name}`}
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
            />
        </div>
        <div className="p-6 pt-4 text-center flex-grow flex flex-col w-full">
            <h3 className="text-2xl font-bold text-slate-800">{advisor.name}</h3>
            <p className="text-slate-600 mt-2 mb-4 flex-grow text-justify">{advisor.description}</p>
            <div className="mt-auto pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row justify-center gap-4 text-sm font-semibold">
                <a href={`tel:${advisor.phone}`} className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-md">
                    <PhoneIcon />
                    <span>Llamar</span>
                </a>
                <a href={`https://wa.me/${advisor.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 text-slate-700 bg-white hover:bg-slate-100 rounded-lg transition-colors border border-slate-300 shadow-md">
                    <WhatsAppIcon />
                    <span>WhatsApp</span>
                </a>
            </div>
        </div>
    </div>
);