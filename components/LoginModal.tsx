import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { auth, GoogleAuthProvider } from '../firebase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FacebookIcon = () => ( <svg className="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg> );

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setIsLoading(false);
      setActiveTab('login');
    }
  }, [isOpen]);
  
  const handleAuthError = (err: any) => {
    switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            setError('Correo electrónico o contraseña incorrectos.');
            break;
        case 'auth/invalid-email':
            setError('El formato del correo electrónico no es válido.');
            break;
        case 'auth/email-already-in-use':
            setError('Este correo ya está registrado. Intenta iniciar sesión.');
            break;
        case 'auth/weak-password':
            setError('La contraseña debe tener al menos 6 caracteres.');
            break;
        case 'auth/popup-closed-by-user':
            setError('');
            break;
        default:
            setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
            console.error("Firebase auth error:", err);
            break;
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
        await auth.signInWithEmailAndPassword(email, password);
        onClose();
    } catch (err) {
        handleAuthError(err);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        if (userCredential.user) {
            await userCredential.user.updateProfile({
                displayName: name
            });
        }
        onClose();
    } catch (err) {
        handleAuthError(err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
        onClose();
    } catch (err) {
        handleAuthError(err);
    } finally {
        setIsLoading(false);
    }
  };
  
  const TabButton = ({ isActive, onClick, children }: { isActive: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`w-1/2 pb-3 text-center text-sm font-bold border-b-2 transition-all duration-300 ${
        isActive
          ? 'border-green-500 text-green-600'
          : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
      }`}
    >
      {children}
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-slate-50/50" style={{backgroundImage: 'radial-gradient(#d1fae5 1px, transparent 1px)', backgroundSize: '1.5rem 1.5rem'}}>
        <div className="p-8 sm:p-10 backdrop-blur-[2px]">
            <div className="w-full mb-8">
              <div className="flex border-b border-slate-200">
                <TabButton isActive={activeTab === 'login'} onClick={() => setActiveTab('login')}>
                  Ingresar
                </TabButton>
                <TabButton isActive={activeTab === 'register'} onClick={() => setActiveTab('register')}>
                  Crear Cuenta
                </TabButton>
              </div>
            </div>

            {activeTab === 'login' ? (
              // Login Form
              <form onSubmit={handleLoginSubmit} className="space-y-6 animate-fade-in">
                 <div>
                  <label htmlFor="email-login" className="block text-sm font-medium text-slate-700"> Correo Electrónico </label>
                  <input id="email-login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="tu@email.com" />
                </div>
                <div>
                  <label htmlFor="password-login" className="block text-sm font-medium text-slate-700"> Contraseña </label>
                  <input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="••••••••" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:from-slate-400 disabled:to-slate-500 disabled:scale-100">
                  {isLoading ? 'Cargando...' : 'Continuar'}
                </button>
              </form>
            ) : (
              // Register Form
              <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fade-in">
                <div>
                  <label htmlFor="name-register" className="block text-sm font-medium text-slate-700"> Nombre Completo </label>
                  <input id="name-register" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Juan Pérez" />
                </div>
                <div>
                  <label htmlFor="email-register" className="block text-sm font-medium text-slate-700"> Correo Electrónico </label>
                  <input id="email-register" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="tu@email.com" />
                </div>
                <div>
                  <label htmlFor="password-register" className="block text-sm font-medium text-slate-700"> Contraseña </label>
                  <input id="password-register" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Mínimo 6 caracteres" />
                </div>
                 <div>
                  <label htmlFor="confirm-password-register" className="block text-sm font-medium text-slate-700"> Confirmar Contraseña </label>
                  <input id="confirm-password-register" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Repite tu contraseña" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:from-slate-400 disabled:to-slate-500 disabled:scale-100">
                  {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>
              </form>
            )}

            {error && <p className="text-sm text-red-600 text-center pt-4">{error}</p>}
            
            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-slate-300"></div>
                <span className="flex-shrink mx-4 text-sm text-slate-500">o</span>
                <div className="flex-grow border-t border-slate-300"></div>
            </div>

            <div className="flex justify-center gap-4">
                <button onClick={handleGoogleSignIn} disabled={isLoading} className="w-12 h-12 flex items-center justify-center border border-slate-300 bg-white rounded-full hover:bg-slate-100 transition-colors p-2" aria-label="Ingresar con Google">
                   <img src="https://i.pinimg.com/1200x/60/41/99/604199df880fb029291ddd7c382e828b.jpg" alt="Google" className="w-full h-full object-contain" />
                </button>
                <button disabled className="w-12 h-12 flex items-center justify-center border border-slate-300 text-slate-400 bg-white rounded-full cursor-not-allowed" aria-label="Ingresar con Facebook (Próximamente)"><FacebookIcon /></button>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
      </div>
    </Modal>
  );
};