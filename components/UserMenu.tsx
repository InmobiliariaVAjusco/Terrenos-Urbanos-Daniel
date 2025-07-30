
import React, { useState, useRef, useEffect } from 'react';
import { User, View } from '../types';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  onViewChange: (view: View) => void;
}

const Avatar = ({ name, email, photoURL }: { name: string | null, email: string | null, photoURL: string | null }) => {
    if (photoURL) {
        return (
            <img 
                src={photoURL} 
                alt={name || 'Avatar de usuario'}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
        );
    }
    
    const initial = name ? name.charAt(0).toUpperCase() : (email ? email.charAt(0).toUpperCase() : '?');
    
    return (
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl border-2 border-white shadow-sm">
            {initial}
        </div>
    );
};

// Icons
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
const CommentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.02-3.06A8.001 8.001 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.832 15.023L5 15.178a6.936 6.936 0 002.555.935 7.003 7.003 0 003.613 0 6.936 6.936 0 002.555-.935L15.168 15.023 14 13.5l.383-1.147a6.002 6.002 0 00.043-.49L15 11.5V10c0-2.206-2.686-4-6-4S3 7.794 3 10v1.5l.574.363a6.003 6.003 0 00.043.49L4 13.5l.832 1.523z" clipRule="evenodd" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigationClick = (view: View) => {
    onViewChange(view);
    setIsOpen(false);
  };
  
  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
        <Avatar name={user.displayName} email={user.email} photoURL={user.photoURL} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in-fast">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
            <div className="px-4 py-3 border-b">
                <p className="text-sm text-slate-800 font-semibold truncate" role="none">{user.displayName || 'Usuario'}</p>
                <p className="text-sm text-slate-500 truncate" role="none">{user.email}</p>
            </div>
            <button
              onClick={() => handleNavigationClick('favorites')}
              className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              role="menuitem"
            >
             <HeartIcon />
              <span>Mis Favoritos</span>
            </button>
            <button
              onClick={() => handleNavigationClick('my-reviews')}
              className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              role="menuitem"
            >
             <CommentIcon />
              <span>Mis Opiniones</span>
            </button>
            <button
              onClick={handleLogoutClick}
              className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              role="menuitem"
            >
              <LogoutIcon />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
       <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};