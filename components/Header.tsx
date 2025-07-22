import React from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: 'buy' | 'sell';
  onViewChange: (view: 'buy' | 'sell') => void;
}

const getLinkClass = (view: 'buy' | 'sell', currentView: 'buy' | 'sell') => {
  return `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
    currentView === view
      ? 'bg-white text-indigo-700 shadow-md'
      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
  }`;
};

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-indigo-900">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Logo />
                <div className="hidden sm:flex items-center gap-4">
                  <div className="w-px h-8 bg-indigo-700"></div>
                  <span className="text-indigo-300 font-semibold">
                    por Bienes Raíces Daniel
                  </span>
                </div>
            </div>
          <div className="flex items-center space-x-2 bg-indigo-800 p-1 rounded-lg">
            <button onClick={() => onViewChange('buy')} className={getLinkClass('buy', currentView)}>
              Comprar
            </button>
            <button onClick={() => onViewChange('sell')} className={getLinkClass('sell', currentView)}>
              Vender
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};