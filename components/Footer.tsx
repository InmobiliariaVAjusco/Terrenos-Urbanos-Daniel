
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-slate-600 mt-12 border-t">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} · Inmuebles V · | Ajusco Tlalpan CDMX. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};