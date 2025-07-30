
import React from 'react';

// Icons
const IconConsulting = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /> </svg> );
const IconSale = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /> </svg> );
const IconRent = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m-3-1l-3-1.636M15 12l-3 1m-3-1l3-1" /> </svg> );
const IconHelpSell = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );

const services = [
  { icon: <IconConsulting />, title: "Asesoramiento Inmobiliario" },
  { icon: <IconSale />, title: "Venta de Inmuebles en CDMX y sus Alrededores" },
  { icon: <IconRent />, title: "Renta de Inmuebles, Locales y Bodegas" },
  { icon: <IconHelpSell />, title: "Ayudamos a Vender tu Propiedad" },
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="mt-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Nuestros Servicios</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          Brindamos un servicio personalizado y profesional a nuestros clientes para vender o adquirir una propiedad.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/60 text-center flex flex-col items-center animate-fade-in-staggered transition-transform duration-300 hover:-translate-y-2 group"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors duration-300 group-hover:bg-green-200">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 flex-grow flex items-center h-20">{service.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};