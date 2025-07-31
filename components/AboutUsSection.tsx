
import React from 'react';
import { ADVISORS } from '../constants';
import { AdvisorCard } from './AdvisorCard';

export const AboutUsSection: React.FC = () => {
  return (
    <section className="mt-24 bg-white py-16 shadow-inner" style={{backgroundImage: 'radial-gradient(circle at top left, #f1f5f9, transparent 60%)'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">¿Quiénes Somos?</h2>
          <p className="mt-4 text-lg text-slate-600 text-justify">
            Somos una firma de consultoría inmobiliaria apasionada por conectar a las personas con su espacio ideal. Con un profundo conocimiento del mercado en la zona sur de la Ciudad de México, nos dedicamos a ofrecer un servicio integral, transparente y personalizado, ya sea que busques comprar, vender o invertir.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 max-w-5xl mx-auto">
            {ADVISORS.map(advisor => (
                <AdvisorCard key={advisor.name} advisor={advisor} />
            ))}
        </div>
      </div>
    </section>
  );
};