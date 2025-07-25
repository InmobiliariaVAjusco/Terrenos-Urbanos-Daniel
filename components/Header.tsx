
import React from 'react';
import { Logo } from './Logo';
import { User } from '../types';
import { UserMenu } from './UserMenu';

type View = 'buy' | 'sell' | 'favorites';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
  currentUser: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

const getLinkClass = (view: View, currentView: View) => {
  return `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
    currentView === view
      ? 'bg-white text-green-700 shadow-md'
      : 'text-green-100 hover:bg-green-700 hover:text-white'
  }`;
};

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, currentUser, onLogout, onLoginClick }) => {
  return (
    <header className="bg-green-800 shadow-lg sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Logo />
                <div className="hidden sm:flex items-center gap-4">
                  <div className="w-px h-8 bg-green-700"></div>
                  <span className="text-green-200 font-semibold">
                    Ajusco Tlalpan CDMX
                  </span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-1 bg-green-900/50 p-1 rounded-lg">
                    <button onClick={() => onViewChange('buy')} className={getLinkClass('buy', currentView)}>
                    Comprar
                    </button>
                    <button onClick={() => onViewChange('sell')} className={getLinkClass('sell', currentView)}>
                    Vender
                    </button>
                </div>
                <div className="w-px h-8 bg-green-700 mx-2 hidden sm:block"></div>
                {currentUser ? (
                    <UserMenu user={currentUser} onLogout={onLogout} onShowFavorites={() => onViewChange('favorites')} />
                ) : (
                    <button 
                        onClick={onLoginClick} 
                        className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-500 transition-colors duration-200 shadow"
                    >
                        Ingresar
                    </button>
                )}
          </div>
        </div>
      </nav>
    </header>
  );
};
