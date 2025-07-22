import React from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: 'buy' | 'sell';
  onViewChange: (view: 'buy' | 'sell') => void;
}

const getLinkClass = (view: 'buy' | 'sell', currentView: 'buy' | 'sell') => {
  return `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
    currentView === view
      ? 'bg-white text-teal-600 shadow-md'
      : 'text-white hover:bg-slate-700'
  }`;
};

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-slate-800 shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Logo />
                <div className="hidden sm:flex items-center gap-4">
                  <div className="w-px h-8 bg-slate-600"></div>
                  <span className="text-teal-400 font-semibold">
                    por Bienes Raíces Daniel
                  </span>
                </div>
            </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 p-1 rounded-lg">
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