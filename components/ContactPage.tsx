
import React from 'react';
import { ADVISORS } from '../constants';
import { AdvisorCard } from './AdvisorCard';

// Icon Components
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const sharedEmail = 'h.g.inmobiliario@gmail.com';

export const ContactPage: React.FC = () => {
    const location = {
        address: "Carretera Picacho-Ajusco, Tlalpan, 14740, Ciudad de México, CDMX",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1882.8902506456748!2d-99.2422956220819!3d19.246002000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20084f7f2f117%3A0xb3558c7349511604!2s19%C2%B014'45.6%22N%2099%C2%B014'30.1%22W!5e0!3m2!1ses!2smx!4v1722380312386!5m2!1ses!2smx"
    };

    return (
        <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Contáctanos</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                    Nuestro equipo de expertos está listo para asesorarte. ¡Hablemos!
                </p>
            </div>

            {/* Advisor Cards Section */}
            <div>
                 <h2 className="text-3xl font-bold text-slate-800 text-center border-b pb-4 mb-24">Nuestros Asesores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 max-w-5xl mx-auto">
                    {ADVISORS.map(advisor => (
                        <AdvisorCard key={advisor.name} advisor={advisor} />
                    ))}
                </div>
            </div>

            {/* General Contact Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200/80">
                <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">Contacto General</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-slate-600 text-center">Para consultas generales, dudas o para iniciar tu proceso, escríbenos a nuestro correo principal:</p>
                    <a 
                        href={`mailto:${sharedEmail}`}
                        className="inline-flex items-center gap-3 bg-green-50 hover:bg-green-100 text-green-800 font-semibold text-lg px-6 py-3 rounded-lg transition-colors border border-green-200"
                    >
                        <MailIcon />
                        <span>{sharedEmail}</span>
                    </a>
                </div>
            </div>
            
            {/* Location Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200/80">
                <div className="flex items-center gap-4 mb-4">
                    <LocationIcon />
                    <h2 className="text-3xl font-bold text-slate-800">Nos Ubicamos en</h2>
                </div>
                <p className="text-slate-600 mb-6 text-lg">
                    {location.address}
                </p>
                <div className="rounded-lg overflow-hidden shadow-md border border-slate-200">
                     <iframe
                        src={location.mapUrl}
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de Inmobiliaria V"
                     ></iframe>
                </div>
            </div>
        </div>
    );
};