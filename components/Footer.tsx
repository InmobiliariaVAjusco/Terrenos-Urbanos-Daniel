import React from 'react';

export const Footer: React.FC = () => {
  // URLs will be added later when provided by the user.
  const socialLinks = {
    whatsapp: 'https://wa.me/c/5215568982403',
    facebook: 'https://www.facebook.com/humberto.g.inmobiliario',
    instagram: 'https://www.instagram.com/inmueblesv_cdmx/',
  };

  const socialIcons = {
      whatsapp: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753906918/7415d00f6b719e40a4b1f9a75fc7eea5_xenqaj.jpg',
      facebook: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753905521/facebook-removebg-preview_gaxbkm.png',
      instagram: 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753906200/ccdd7c16a26eb9c326f359c0f418004c-removebg-preview_urjhfw.png',
  }

  return (
    <footer className="bg-slate-50 text-slate-600 mt-12 border-t">
      <div className="container mx-auto px-4 py-8">
        
        {/* Using a grid for a balanced layout. 2 cols on desktop, 1 on mobile. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Copyright Section (aligns left on desktop) */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-800">Inmobiliaria V</p>
            <p className="text-sm">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>

          {/* Social Media Section (aligns right on desktop) */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold text-slate-800 mb-3">Síguenos en nuestras redes</h3>
            <div className="flex justify-center items-center space-x-4">
              <a 
                href={socialLinks.whatsapp} 
                aria-label="Contactar por WhatsApp" 
                className="transition-transform hover:scale-110 block w-9 h-9 rounded-full overflow-hidden bg-white shadow-sm border border-slate-200"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={socialIcons.whatsapp} alt="WhatsApp" className="w-full h-full object-cover" />
              </a>
              <a 
                href={socialLinks.facebook} 
                aria-label="Visitar nuestra página de Facebook" 
                className="transition-transform hover:scale-110 block w-9 h-9 rounded-full overflow-hidden bg-white shadow-sm border border-slate-200"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={socialIcons.facebook} alt="Facebook" className="w-full h-full object-cover" />
              </a>
              <a 
                href={socialLinks.instagram} 
                aria-label="Visitar nuestro perfil de Instagram"
                className="transition-transform hover:scale-110 block w-9 h-9 rounded-full overflow-hidden bg-white shadow-sm border border-slate-200"
                target="_blank" 
                rel="noopener noreferrer"
              >
                 <img src={socialIcons.instagram} alt="Instagram" className="w-full h-full object-cover" />
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};