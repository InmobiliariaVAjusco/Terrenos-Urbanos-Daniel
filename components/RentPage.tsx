
import React from 'react';

export const RentPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-12 flex flex-col items-center justify-center text-center shadow-lg border border-emerald-200/80 min-h-[50vh]">
      <div className="absolute -top-16 -right-16 w-64 h-64 text-green-200/50 opacity-50 transform-gpu rotate-12">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/>
        </svg>
      </div>
      <div className="relative z-10">
        <div className="w-24 h-24 text-green-600 mb-6 mx-auto bg-white/70 backdrop-blur-sm p-4 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m-3-1l-3-1.636M15 12l-3 1m-3-1l3-1" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2" style={{textShadow: '0px 1px 2px rgba(255,255,255,0.5)'}}>Tu Próximo Hogar te Espera</h1>
        <p className="text-lg text-slate-600 max-w-xl">
          Estamos preparando el mejor catálogo de propiedades en renta. Vuelve pronto para descubrir espacios increíbles en la zona del Ajusco.
        </p>
        <button disabled className="mt-8 px-8 py-3 bg-slate-300 text-slate-500 font-bold rounded-lg cursor-not-allowed shadow-sm">
          Ver Listados (Próximamente)
        </button>
      </div>
    </div>
  );
};