
import React from 'react';
import { logoUrl } from './assets';

export const Logo = () => (
    <img
        src={logoUrl}
        alt="Logo de Inmuebles V"
        className="h-12 w-12 object-contain"
    />
);