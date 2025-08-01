
import React from 'react';

interface PrivacyBannerProps {
  onAccept: () => void;
  onReject: () => void;
  onViewPolicy: () => void;
}

export const PrivacyBanner: React.FC<PrivacyBannerProps> = ({ onAccept, onReject, onViewPolicy }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm text-white p-4 shadow-lg z-50 animate-slide-up" role="alertdialog" aria-live="polite" aria-label="Aviso de Privacidad y Cookies">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="text-sm text-slate-200 text-center md:text-left flex-grow">
          <p>
            <strong className="font-semibold text-white">Aviso de Privacidad y Cookies:</strong> Usamos cookies y tecnologías similares para analizar el tráfico y mejorar tu experiencia. Al hacer clic en "Aceptar", aceptas nuestro uso de datos. Puedes ver los detalles en nuestro <button onClick={onViewPolicy} className="font-bold text-green-400 hover:text-green-300 underline">Aviso de Privacidad</button>.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onReject}
            className="bg-transparent hover:bg-slate-700/80 text-slate-200 font-bold py-2 px-6 rounded-md transition-colors duration-300 w-1/2 md:w-auto"
            aria-label="Rechazar políticas de privacidad"
          >
            Rechazar
          </button>
          <button
            onClick={onAccept}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 w-1/2 md:w-auto"
            aria-label="Aceptar políticas de privacidad"
          >
            Aceptar
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};