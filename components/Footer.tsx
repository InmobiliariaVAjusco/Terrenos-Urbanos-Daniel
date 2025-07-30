
import React from 'react';

// Icons for social media
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.457l-6.354 1.654zm6.487-3.163l.54.324c1.422.861 3.104 1.334 4.815 1.335 5.451.001 9.899-4.448 9.9-9.9.001-5.452-4.448-9.9-9.9-9.9-5.452 0-9.899 4.448-9.9 9.901-.001 2.025.56 3.958 1.598 5.617l.448.733-1.072 3.903 4.01-1.05z" />
  </svg>
);
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
);

// High-quality SVG for Instagram with a gradient definition for hover effects.
const InstagramIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-all duration-300 fill-current">
        <title>Instagram</title>
        <defs>
            <linearGradient id="instagram-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#833ab4" />
                <stop offset="25%" stopColor="#fd1d1d" />
                <stop offset="75%" stopColor="#fcb045" />
            </linearGradient>
        </defs>
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.381-.42.419-.819-.679-1.381-.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.381-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.074-4.85c.06-1.17.249-1.805.413 2.227.217-.562.477.96.896-1.381.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.175 8.797 2.16 12 2.16zm0 3.865c-2.401 0-4.364 1.963-4.364 4.364s1.963 4.364 4.364 4.364 4.364-1.963 4.364-4.364S14.401 6.025 12 6.025zm0 6.949c-1.425 0-2.585-1.16-2.585-2.585s1.16-2.585 2.585-2.585 2.585 1.16 2.585 2.585-1.16 2.585-2.585 2.585zm4.838-6.883c-.636 0-1.151.515-1.151 1.151s.515 1.151 1.151 1.151 1.151-.515 1.151-1.151-.515-1.151-1.151-1.151z"/>
    </svg>
);


export const Footer: React.FC = () => {
  // URLs will be added later when provided by the user.
  const socialLinks = {
    whatsapp: '#',
    facebook: '#',
    instagram: '#',
  };

  return (
    <footer className="bg-slate-50 text-slate-600 mt-12 border-t">
      <div className="container mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright Section */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-800">Inmobiliaria V</p>
            <p className="text-sm">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>

          {/* Social Media Section */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-slate-800 mb-3">Síguenos en nuestras redes</h3>
            <div className="flex justify-center md:justify-end items-center space-x-5">
              <a href={socialLinks.whatsapp} aria-label="Contactar por WhatsApp" className="text-slate-500 hover:text-green-600 transition-colors duration-300">
                <WhatsAppIcon />
              </a>
              <a href={socialLinks.facebook} aria-label="Visitar nuestra página de Facebook" className="text-slate-500 hover:text-blue-600 transition-colors duration-300">
                <FacebookIcon />
              </a>
              {/* Instagram link with SVG and gradient on hover */}
              <a 
                href={socialLinks.instagram} 
                aria-label="Visitar nuestro perfil de Instagram"
                // The `group` class enables child elements to be styled on parent hover
                className="group text-slate-500"
              >
                 <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
        
      </div>
      <style>{`
          /* This CSS is added to handle the SVG gradient fill on hover */
          .group:hover svg.fill-current path {
            fill: url(#instagram-gradient);
          }
       `}</style>
    </footer>
  );
};