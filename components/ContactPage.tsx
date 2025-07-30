import React from 'react';

// Icon Components
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 005.467 5.467l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);

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

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

interface Advisor {
    name: string;
    photoUrl: string;
    description: string;
    phone: string;
    whatsapp: string;
}

const advisors: Advisor[] = [
    {
        name: 'Humberto G.',
        photoUrl: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753908865/H_G_INMOBILIARIO_l7d3t3.jpg',
        description: 'Asesor experto con más de 10 años de experiencia, especializado en créditos hipotecarios y propiedades residenciales en la zona sur de CDMX.',
        phone: '5568982403',
        whatsapp: '5215568982403'
    },
    {
        name: 'Victor Manuel Garcia',
        photoUrl: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753909062/VICTOR_MANUEL_GARCIA_baxc24.jpg',
        description: 'Especialista en terrenos comerciales e inversiones. Comprometido con encontrar la mejor oportunidad para hacer crecer tu patrimonio.',
        phone: '5545313262',
        whatsapp: '5215545313262'
    }
];

const sharedEmail = 'h.g.inmobiliario@gmail.com';

const AdvisorCard: React.FC<{ advisor: Advisor }> = ({ advisor }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <img 
            src={advisor.photoUrl} 
            alt={`Foto de ${advisor.name}`}
            className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white flex-shrink-0"
        />
        <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-slate-800">{advisor.name}</h3>
            <p className="text-slate-600 mt-2 mb-4">{advisor.description}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm font-medium">
                <a href={`tel:${advisor.phone}`} className="flex items-center gap-2 text-slate-700 hover:text-green-600 transition-colors">
                    <PhoneIcon />
                    <span>Llamar</span>
                </a>
                 <a href={`https://wa.me/${advisor.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-green-600 transition-colors">
                    <WhatsAppIcon />
                    <span>WhatsApp</span>
                </a>
            </div>
        </div>
    </div>
);

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
            <div className="space-y-8">
                 <h2 className="text-3xl font-bold text-slate-800 text-center border-b pb-4">Nuestros Asesores</h2>
                {advisors.map(advisor => (
                    <AdvisorCard key={advisor.name} advisor={advisor} />
                ))}
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