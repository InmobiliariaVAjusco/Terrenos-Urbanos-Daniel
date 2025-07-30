
import React from 'react';
import { User, View } from '../types';

// Icon Components
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v-5z" /></svg>;
const KeyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 016-6h4a6 6 0 016 6z" /></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.917l9-3.462 9 3.462a12.02 12.02 0 00-3.382-8.94" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

interface SideBarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SideBarLink: React.FC<{ text: string; icon: React.ReactNode; onClick: () => void; isActive: boolean; }> = ({ text, icon, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-green-700 text-white font-semibold'
        : 'text-green-100 hover:bg-green-800/60 hover:text-white'
    }`}
  >
    {icon}
    <span className="flex-1">{text}</span>
  </button>
);

export const SideBar: React.FC<SideBarProps> = ({ currentView, onViewChange, isOpen, onClose }) => {
  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Inicio', icon: <HomeIcon /> },
    { view: 'buy', label: 'Venta', icon: <TagIcon /> },
    { view: 'rent', label: 'Renta', icon: <KeyIcon /> },
    { view: 'investment', label: 'Inversión', icon: <ChartIcon /> },
    { view: 'privacy', label: 'Aviso de Privacidad', icon: <ShieldIcon /> },
    { view: 'contact', label: 'Contáctanos', icon: <MailIcon /> },
  ];

  return (
    <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between p-4 border-b border-green-800/50">
        <span className="text-xl font-bold">Navegación</span>
        <button onClick={onClose} className="p-2 text-green-200 hover:text-white rounded-full hover:bg-green-800/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>

      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map(item => (
          <SideBarLink
            key={item.label}
            text={item.label}
            icon={item.icon}
            onClick={() => onViewChange(item.view)}
            isActive={currentView === item.view}
          />
        ))}
      </nav>
    </aside>
  );
};