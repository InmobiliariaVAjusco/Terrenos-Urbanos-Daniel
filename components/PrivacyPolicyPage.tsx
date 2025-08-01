import React from 'react';

// Icon to represent an official document
const PolicyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.917l9-3.462 9 3.462a12.02 12.02 0 00-3.382-8.94z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


export const PrivacyPolicyPage: React.FC = () => {
  const policyUrl = "https://www.iubenda.com/privacy-policy/65065555";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200 max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 12rem)' }}>
      <div className="flex flex-col items-center text-center mb-6 border-b pb-6 flex-shrink-0">
        <PolicyIcon />
        <h1 className="text-4xl font-bold text-slate-900 mt-4">Aviso de Privacidad</h1>
        <p className="mt-2 text-slate-600">
            Documento oficial proporcionado por Iubenda.
            <a href={policyUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-green-600 hover:underline font-semibold">
                (Abrir en una nueva pestaña)
            </a>
        </p>
      </div>
      <div className="flex-grow w-full h-full">
        <iframe
            src={policyUrl}
            className="w-full h-full"
            style={{ border: 'none' }}
            title="Aviso de Privacidad"
        />
      </div>
    </div>
  );
};