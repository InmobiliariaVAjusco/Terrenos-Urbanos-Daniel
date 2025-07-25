
import React from 'react';

export const ContactPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 p-12 flex flex-col items-center justify-center text-center shadow-lg border border-violet-200/80 min-h-[50vh]">
       <div className="absolute -bottom-12 -right-12 w-56 h-56 text-violet-200/50 opacity-50 transform-gpu rotate-12">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </div>
       <div className="relative z-10">
        <div className="w-24 h-24 text-violet-600 mb-6 mx-auto bg-white/70 backdrop-blur-sm p-4 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2" style={{textShadow: '0px 1px 2px rgba(255,255,255,0.5)'}}>Hablemos</h1>
        <p className="text-lg text-slate-600 max-w-xl">
          Nuestro equipo de expertos está listo para asesorarte. La sección de contacto con mapa interactivo y formulario directo estará activa muy pronto.
        </p>
        <button disabled className="mt-8 px-8 py-3 bg-slate-300 text-slate-500 font-bold rounded-lg cursor-not-allowed shadow-sm">
          Enviar Mensaje (Próximamente)
        </button>
      </div>
    </div>
  );
};