import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-green-700 mt-12 border-t">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Terrenos Urbanos Ajusco por Bienes Raíces Daniel. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};