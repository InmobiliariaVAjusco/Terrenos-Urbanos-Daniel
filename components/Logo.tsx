
import React from 'react';
import { logoBase64 } from './assets';

export const Logo = () => (
    <img
        src={logoBase64}
        alt="Logo de Inmuebles V"
        className="h-12 w-12 object-contain"
    />
);