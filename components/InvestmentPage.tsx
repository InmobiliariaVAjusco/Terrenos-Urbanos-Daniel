
import React from 'react';

export const InvestmentPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 p-12 flex flex-col items-center justify-center text-center shadow-lg border border-blue-200/80 min-h-[50vh]">
      <div className="absolute -top-12 -left-12 w-56 h-56 text-blue-200/50 opacity-50 transform-gpu -rotate-12">
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
        </svg>
      </div>
       <div className="relative z-10">
        <div className="w-24 h-24 text-blue-600 mb-6 mx-auto bg-white/70 backdrop-blur-sm p-4 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2" style={{textShadow: '0px 1px 2px rgba(255,255,255,0.5)'}}>Invierte en tu Futuro</h1>
        <p className="text-lg text-slate-600 max-w-xl">
          Analizamos y seleccionamos las propiedades con el mayor potencial de plusvalía. Nuestra sección de oportunidades de inversión estará disponible próximamente.
        </p>
        <button disabled className="mt-8 px-8 py-3 bg-slate-300 text-slate-500 font-bold rounded-lg cursor-not-allowed shadow-sm">
          Ver Oportunidades (Próximamente)
        </button>
      </div>
    </div>
  );
};