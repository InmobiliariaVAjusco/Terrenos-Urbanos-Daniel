import React, { useState, useEffect } from 'react';

const PRIVACY_STORAGE_KEY = 'inmuebles-v-privacy-accepted';

export const PrivacyBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem(PRIVACY_STORAGE_KEY);
    if (!hasAccepted) {
      // Use a small delay to ensure the banner doesn't feel too abrupt on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(PRIVACY_STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm text-white p-4 shadow-lg z-50 animate-slide-up" role="alert" aria-live="polite">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="text-sm text-slate-200 text-center md:text-left">
          <p>
            <strong className="font-semibold text-white">Aviso de Privacidad:</strong> Al registrar sus datos o navegar en nuestro sitio, usted acepta que · Inmuebles V · puede utilizar su información de contacto (correo electrónico, WhatsApp) para enviarle comunicaciones sobre oportunidades de inversión y nuevos listados. Respetamos su privacidad.
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 flex-shrink-0 w-full md:w-auto"
          aria-label="Aceptar y cerrar el aviso de privacidad"
        >
          Entendido
        </button>
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