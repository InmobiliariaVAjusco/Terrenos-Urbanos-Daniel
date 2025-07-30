
import React from 'react';
import { logoBase64 } from './assets';

interface LandingPageProps {
  onEnter: () => void;
  isExiting: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter, isExiting }) => {
  return (
    <div className={`relative h-screen w-screen overflow-hidden ${isExiting ? 'pointer-events-none' : ''}`}>
      {/* GIF Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/9/99/V%C3%B5rtsj%C3%A4rv_-_50038578051.gif')`
        }}
      >
        {/* Dark Overlay that transitions to white to prevent flash */}
        <div className={`absolute top-0 left-0 w-full h-full bg-black/60 z-10 ${isExiting ? 'animate-fade-to-white' : ''}`}></div>
      </div>
      
      {/* Centered Content Container */}
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center text-center p-4">
        
        {/* Logo Container - This will get the flight animation */}
        <div className={`${isExiting ? 'animate-fly-to-corner' : 'animate-fade-in-down'}`}>
           <img
                src={logoBase64}
                alt="Logo de Inmuebles V"
                className="h-40 w-40 md:h-48 md:w-48 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
            />
        </div>
        
        {/* Text and Button Container */}
        <div className={`w-full max-w-3xl text-white ${isExiting ? 'animate-exit-text' : 'animate-fade-in-up'}`}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mt-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
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
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
          opacity: 0; /* Start hidden for staggered animation */
        }

        /* Exit Animations */

        /* The flying logo animation */
        @keyframes fly-to-corner {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            /* These values are an approximation to move the logo from the center
               towards the top-left corner, simulating it flying to the header. */
            transform: translate(calc(-50vw + 80px), calc(-45vh + 40px)) scale(0.25);
            opacity: 0;
          }
        }
        .animate-fly-to-corner {
          /* A nice curved timing function makes it feel more dynamic. Duration matches setTimeout in App.tsx */
          animation: fly-to-corner 1.2s cubic-bezier(0.5, 0, 0.75, 0) forwards;
        }

        @keyframes exit-text {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
        .animate-exit-text {
          /* Fade out text faster than the logo flight */
          animation: exit-text 0.5s ease-out forwards;
        }
        
        @keyframes fade-to-white {
          0% {
            background-color: rgba(0, 0, 0, 0.6);
          }
          100% {
            background-color: rgb(255, 255, 255);
          }
        }
        .animate-fade-to-white {
          /* Start after text fades, finish as logo animation ends */
          animation: fade-to-white 0.7s ease-in-out 0.5s forwards;
        }
      `}</style>
    </div>
  );
};