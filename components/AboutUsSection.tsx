
import React from 'react';
import { ADVISORS } from '../constants';
import { AdvisorCard } from './AdvisorCard';

export const AboutUsSection: React.FC = () => {
  return (
    <section className="mt-24 bg-white py-16 shadow-inner" style={{backgroundImage: 'radial-gradient(circle at top left, #f1f5f9, transparent 60%)'}}>
      <div className="container mx-auto px-4">
        
        {/* Intro Section with Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 max-w-6xl mx-auto">
            <div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">¿Quiénes Somos?</h2>
                <p className="mt-6 text-lg text-slate-600 text-justify">
                    Somos una firma de consultoría inmobiliaria apasionada por conectar a las personas con su espacio ideal. Con un profundo conocimiento del mercado en la zona sur de la Ciudad de México, nos dedicamos a ofrecer un servicio integral, transparente y personalizado, ya sea que busques comprar, vender o invertir.
                </p>
            </div>
            <div className="flex justify-center items-center p-4 bg-slate-50 rounded-2xl order-first lg:order-last">
                 <img 
                    src="https://res.cloudinary.com/dcm5pug0v/image/upload/v1753987097/Inmobiliaria_V_logo_2-removebg-preview_vfth4r.png" 
                    alt="Logo Inmobiliaria V"
                    className="w-56 h-56 object-contain"
                />
            </div>
        </div>

        {/* Advisors Section */}
        <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Conoce a Nuestro Equipo</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                Profesionales dedicados a encontrar la mejor solución para ti.
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
