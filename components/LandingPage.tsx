
import React from 'react';
import { Logo } from './Logo';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* GIF Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/d/db/V%C3%B5rtsj%C3%A4rv_-_50038643306.gif?20201125023232')`
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center p-4">
        <div className="animate-fade-in-down">
          <Logo />
        </div>
        
        <div className="animate-fade-in-up mt-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Encuentra tu Espacio.
                <br />
                <span className="text-green-400">Construye tu Futuro.</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-green-100/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Los mejores terrenos y propiedades en la zona del Ajusco, Tlalpan.
            </p>
            <button
                onClick={onEnter}
                className="mt-10 px-10 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-2xl
                           transform transition-all duration-300 ease-in-out 
                           hover:bg-green-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]
                           focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50
                           active:scale-100"
            >
                Explorar Catálogo
            </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s forwards;
          opacity: 0; /* Start hidden for staggered animation */
        }
      `}</style>
    </div>
  );
};