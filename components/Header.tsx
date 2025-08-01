
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { User, View, Property } from '../types';
import { UserMenu } from './UserMenu';
import { NotificationPanel } from './NotificationPanel';

interface HeaderProps {
    onMenuClick: () => void;
    currentUser: User | null;
    onLogout: () => void;
    onLoginClick: () => void;
    onViewChange: (view: View) => void;
    newProperties: Property[];
    isNotificationPanelOpen: boolean;
    onToggleNotifications: () => void;
    onSelectProperty: (property: Property) => void;
}

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const NotificationBell = ({ count, onClick }: { count: number, onClick: () => void }) => (
    <button onClick={onClick} className="relative p-2 text-green-200 hover:text-white transition-colors" aria-label={`Notificaciones (${count})`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {count > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-green-700"></span>
            </span>
        )}
    </button>
);


export const Header: React.FC<HeaderProps> = ({ 
    onMenuClick, 
    currentUser, 
    onLogout, 
    onLoginClick, 
    onViewChange,
    newProperties,
    isNotificationPanelOpen,
    onToggleNotifications,
    onSelectProperty
}) => {
    
    const getFriendlyName = (user: User): string => {
        let name: string;
        if (user.displayName) {
            name = user.displayName.split(' ')[0];
        } else if (user.email) {
            name = user.email.split('@')[0];
        } else {
            name = 'Usuario';
        }
        return `${name}.`;
    };

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
                    <button 
                        onClick={() => onViewChange('home')}
                        className="flex items-center gap-3 text-left"
                        aria-label="Página de inicio de Inmobiliaria V"
                    >
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
                    </button>
                </div>

                {/* Right Side: Login/User Menu */}
                <div className="flex items-center gap-2">
                    {currentUser ? (
                        <>
                          <div className="relative">
                            <NotificationBell count={newProperties.length} onClick={onToggleNotifications} />
                            {isNotificationPanelOpen && (
                                <NotificationPanel 
                                    properties={newProperties} 
                                    onSelectProperty={onSelectProperty} 
                                    onClose={onToggleNotifications}
                                />
                            )}
                          </div>
                          <span className="hidden md:block text-sm font-medium text-green-100">
                            Hola, <span className="font-semibold text-white">{getFriendlyName(currentUser)}</span>
                          </span>
                          <UserMenu user={currentUser} onLogout={onLogout} onViewChange={onViewChange} />
                        </>
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
