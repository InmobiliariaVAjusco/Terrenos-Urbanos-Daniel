import React from 'react';

// Icon to represent a cookie
const CookieIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const CookiePolicyPage: React.FC = () => {
    const cookiePolicyUrl = "https://www.iubenda.com/privacy-policy/65065555/cookie-policy";

    return (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200 max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 12rem)' }}>
            <div className="flex flex-col items-center text-center mb-6 border-b pb-6 flex-shrink-0">
                <CookieIcon />
                <h1 className="text-4xl font-bold text-slate-900 mt-4">Política de Cookies</h1>
                 <p className="mt-2 text-slate-600">
                    Documento oficial proporcionado por Iubenda.
                    <a href={cookiePolicyUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-green-600 hover:underline font-semibold">
                        (Abrir en una nueva pestaña)
                    </a>
                </p>
            </div>

            <div className="flex-grow w-full h-full">
                <iframe
                    src={cookiePolicyUrl}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    title="Política de Cookies"
                />
            </div>
        </div>
    );
};