
import React from 'react';
import { Logo } from './Logo';
import { User } from '../types';
import { UserMenu } from './UserMenu';

interface HeaderProps {
    onMenuClick: () => void;
    currentUser: User | null;
    onLogout: () => void;
    onLoginClick: () => void;
    onShowFavorites: () => void;
}

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ onMenuClick, currentUser, onLogout, onLoginClick, onShowFavorites }) => {
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
                    <Logo />
                    <div className="hidden sm:flex items-center">
                       <div className="w-px h-8 bg-green-600/70 mx-4"></div>
                       <span className="font-semibold text-green-200 tracking-wide">Ajusco Tlalpan CDMX</span>
                    </div>
                </div>

                {/* Right Side: Login/User Menu */}
                <div className="flex items-center">
                    {currentUser ? (
                        <UserMenu user={currentUser} onLogout={onLogout} onShowFavorites={onShowFavorites} />
                    ) : (
                         <button
                            onClick={onLoginClick}
                            className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-500 transition-all duration-200 shadow-sm"
                        >
                            Ingresar
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
