
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { User, View } from '../types';
import { UserMenu } from './UserMenu';

interface HeaderProps {
    onMenuClick: () => void;
    currentUser: User | null;
    onLogout: () => void;
    onLoginClick: () => void;
    onViewChange: (view: View) => void; // <-- Prop unificada
}

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ onMenuClick, currentUser, onLogout, onLoginClick, onViewChange }) => {
    return (
        <header className="bg-green-700 text-white shadow-md sticky top-0 z-30">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left Side: Menu Toggle & Brand */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onMenuClick} 
                        className="p-2 -ml-2 text-green-200 hover:text-white transition-colors"
                        aria-label="Abrir menú de navegación"
                    >
                        <MenuIcon />
                    </button>
                    <div className="flex-shrink-0">
                      <Logo />
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                        <h1 className="font-bold text-white text-xl tracking-wide flex-shrink-0">Inmobiliaria V</h1>
                        <div className="w-px h-6 bg-green-500/50 hidden lg:block"></div>
                        <div className="hidden lg:flex items-baseline text-base text-green-100 font-medium space-x-2">
                            <span className="animate-fade-in-staggered" style={{ animationDelay: '200ms' }}>Bienes raíces</span>
                            <span className="animate-fade-in-staggered text-green-400 font-bold" style={{ animationDelay: '300ms' }}>·</span>
                            <span className="animate-fade-in-staggered" style={{ animationDelay: '400ms' }}>Agente de bienes raíces</span>
                            <span className="animate-fade-in-staggered text-green-400 font-bold" style={{ animationDelay: '500ms' }}>·</span>
                            <span className="animate-fade-in-staggered" style={{ animationDelay: '600ms' }}>Agentes hipotecarios</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login/User Menu */}
                <div className="flex items-center">
                    {currentUser ? (
                        <UserMenu user={currentUser} onLogout={onLogout} onViewChange={onViewChange} />
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-500 transition-all duration-200 shadow-sm"
                        >
                            Ingresar
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};