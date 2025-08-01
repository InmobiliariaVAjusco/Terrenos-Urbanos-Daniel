
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View } from '../types';

// Main navigation icons
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v-5z" /></svg>;
const KeyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 016-6h4a6 6 0 016 6z" /></svg>;
const BudgetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 0h4m-4 0H8m4 0h.01M12 18V5m0 13a9 9 0 110-18 9 9 0 010 18z" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.917l9-3.462 9 3.462a12.02 12.02 0 00-3.382-8.94" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const CookieIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


// Icons for the draggable handle
const ChevronLeftIconHandle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ChevronRightIconHandle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;


interface SideBarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const SIDEBAR_WIDTH = 256; // Corresponds to w-64
const DRAG_THRESHOLD = SIDEBAR_WIDTH / 3;

const SideBarLink: React.FC<{ text: string; icon: React.ReactNode; onClick: () => void; isActive: boolean; }> = ({ text, icon, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-green-700 text-white font-semibold shadow-inner'
        : 'text-green-100 hover:bg-green-800/60 hover:text-white'
    }`}
  >
    {icon}
    <span className="flex-1">{text}</span>
  </button>
);

export const SideBar: React.FC<SideBarProps> = ({ currentView, onViewChange, isOpen, onClose, onOpen }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(-SIDEBAR_WIDTH);
  const dragStartX = useRef(0);
  
  // Update position based on isOpen prop, but not during a drag
  useEffect(() => {
    if (!isDragging) {
      setTranslateX(isOpen ? 0 : -SIDEBAR_WIDTH);
    }
  }, [isOpen, isDragging]);
  
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX - translateX;
    e.preventDefault();
  }, [translateX]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let newTranslateX = clientX - dragStartX.current;
    
    // Clamp the value between fully closed and fully open
    newTranslateX = Math.max(-SIDEBAR_WIDTH, Math.min(newTranslateX, 0));
    
    setTranslateX(newTranslateX);
  }, [isDragging]);
  
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (translateX > -DRAG_THRESHOLD) {
      onOpen();
    } else {
      onClose();
    }
  }, [isDragging, translateX, onOpen, onClose]);

  // Global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const mainNavItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Inicio', icon: <HomeIcon /> },
    { view: 'buy', label: 'Venta', icon: <TagIcon /> },
    { view: 'rent', label: 'Renta', icon: <KeyIcon /> },
    { view: 'budget', label: 'Presupuesto', icon: <BudgetIcon /> },
    { view: 'contact', label: 'Contáctanos', icon: <MailIcon /> },
  ];
  
  const legalNavItems: { view: View; label: string; icon: React.ReactNode }[] = [
      { view: 'privacy', label: 'Aviso de Privacidad', icon: <ShieldIcon /> },
      { view: 'cookie-policy', label: 'Política de Cookies', icon: <CookieIcon /> },
  ];


  const handleToggleClick = () => isOpen ? onClose() : onOpen();

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col shadow-2xl z-50 ${isDragging ? 'transition-none' : 'transition-transform duration-300 ease-in-out'}`}
        style={{ transform: `translateX(${translateX}px)` }}
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
          {mainNavItems.map(item => (
            <SideBarLink key={item.label} text={item.label} icon={item.icon} onClick={() => onViewChange(item.view)} isActive={currentView === item.view} />
          ))}
        </nav>

        <div className="p-4 border-t border-green-800/50 space-y-2">
           {legalNavItems.map(item => (
            <SideBarLink key={item.label} text={item.label} icon={item.icon} onClick={() => onViewChange(item.view)} isActive={currentView === item.view} />
          ))}
        </div>
        
        <div
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            onClick={handleToggleClick}
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full w-8 h-24 bg-white/90 backdrop-blur-sm shadow-lg cursor-ew-resize flex items-center justify-center rounded-r-2xl border-y border-r border-slate-200/80 group"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            role="button"
            tabIndex={0}
        >
          <div className="text-slate-500 group-hover:text-green-600 transition-colors">
            {isOpen ? <ChevronLeftIconHandle /> : <ChevronRightIconHandle />}
          </div>
        </div>
      </aside>
    </>
  );
};