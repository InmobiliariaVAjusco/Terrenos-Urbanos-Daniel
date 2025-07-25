import React from 'react';

export const Logo = () => (
    <div className="flex items-center gap-3">
        {/* New Image Logo */}
        <img
            src="https://i.pinimg.com/736x/47/02/63/470263ed329d5dda16ab72e5a1b88fae.jpg"
            alt="Logo de Inmuebles V"
            className="h-14 w-14 rounded-lg shadow-md object-cover"
        />
        {/* Brand Name */}
        <span className="text-3xl font-bold tracking-tight text-white">
            · Inmuebles V ·
        </span>
    </div>
);