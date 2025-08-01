
import React, { useRef, useEffect } from 'react';
import { Property } from '../types';

interface NotificationPanelProps {
    properties: Property[];
    onSelectProperty: (property: Property) => void;
    onClose: () => void;
}

const formatDateShort = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return 'Ahora';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `hace ${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `hace ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `hace ${diffDays}d`;
};


export const NotificationPanel: React.FC<NotificationPanelProps> = ({ properties, onSelectProperty, onClose }) => {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                // Check if the click was on the bell icon itself
                const bellButton = (event.target as HTMLElement).closest('button[aria-label^="Notificaciones"]');
                if (!bellButton) {
                    onClose();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);
    
    const handleSelect = (property: Property) => {
        onSelectProperty(property);
        onClose();
    };

    return (
        <div 
            ref={panelRef} 
            className="absolute right-0 mt-2 w-80 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in-fast"
        >
            <div className="py-2">
                <div className="px-4 py-2 border-b">
                    <h3 className="text-sm font-semibold text-slate-800">Nuevas Propiedades</h3>
                </div>
                
                {properties.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                        {properties.map(property => (
                            <button
                                key={property.id}
                                onClick={() => handleSelect(property)}
                                className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                <img 
                                    src={property.images[0]} 
                                    alt={property.address} 
                                    className="w-12 h-12 rounded-md object-cover flex-shrink-0" 
                                />
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold text-slate-800 truncate">{property.address}</p>
                                    <p className="text-slate-500">
                                        ${property.price.toLocaleString('es-MX')}
                                    </p>
                                </div>
                                <span className="text-xs text-slate-400 flex-shrink-0">{formatDateShort(property.publicationDate)}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="px-4 py-8 text-center">
                        <p className="text-sm text-slate-500">No hay nuevas notificaciones.</p>
                        <p className="text-xs text-slate-400 mt-1">Estás al día.</p>
                    </div>
                )}
            </div>
             <style>{`
                @keyframes fade-in-fast {
                    from { opacity: 0; transform: translateY(-10px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-fast {
                    animation: fade-in-fast 0.15s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
