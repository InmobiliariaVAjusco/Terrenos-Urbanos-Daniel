
import React from 'react';

interface SellSuccessPageProps {
  onGoHome: () => void;
}

export const SellSuccessPage: React.FC<SellSuccessPageProps> = ({ onGoHome }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200 max-w-3xl mx-auto my-16">
      <div className="flex flex-col items-center justify-center text-center py-10">
        <div className="w-24 h-24 mx-auto mb-6 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-800">¡Solicitud Enviada con Éxito!</h1>
        <p className="text-slate-600 mt-4 max-w-2xl">
          Gracias por confiar en nosotros. Hemos recibido tu información. Un asesor la revisará y se pondrá en contacto contigo a la brevedad.
        </p>
        <button
          onClick={onGoHome}
          className="mt-8 px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};