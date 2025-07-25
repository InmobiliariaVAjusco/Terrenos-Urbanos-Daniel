
import React from 'react';

interface PrivacyRejectionPageProps {
  onReset: () => void;
}

export const PrivacyRejectionPage: React.FC<PrivacyRejectionPageProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-slate-800 p-4 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full">
        <div className="w-20 h-20 text-green-500 mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Acceso Limitado</h1>
        <p className="text-md text-slate-600 mb-8">
          Para utilizar todas las funcionalidades de nuestro portal, es necesario que aceptes nuestra política de privacidad.
        </p>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg
                     transform transition-all duration-300 ease-in-out 
                     hover:bg-green-500 hover:scale-105
                     focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};