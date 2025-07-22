import React from 'react';

export const Logo = () => (
    <div className="flex items-center gap-3">
        {/* Icon with gradient background */}
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
        </div>
        {/* Brand Name */}
        <span className="text-2xl font-bold tracking-tight text-white">
            Terrenos Urbanos Ajusco
        </span>
    </div>
);