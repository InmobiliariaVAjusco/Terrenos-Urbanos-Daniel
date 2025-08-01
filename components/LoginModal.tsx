import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { auth, GoogleAuthProvider } from '../firebase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const googleIconUrl = 'https://res.cloudinary.com/dcm5pug0v/image/upload/v1753904831/channels4_profile-removebg-preview_zpi5fp.png';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);

// A cleaner, more symmetrical icon for the "hidden" password state.
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        <path fillRule="evenodd" d="M2 10s3-5.5 8-5.5 8 5.5 8 5.5-3 5.5-8 5.5-8-5.5-8-5.5zM10 14a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" opacity="0.5"/>
        <path d="M17.707 3.707a1 1 0 00-1.414-1.414L2.293 16.293a1 1 0 101.414 1.414L17.707 3.707z"/>
    </svg>
);


export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setIsLoading(false);
      setActiveTab('login');
      setShowPassword(false);
      setShowConfirmPassword(false);
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
        case 'auth/account-exists-with-different-credential':
            setError('Ya existe una cuenta con este correo, pero con un método de inicio de sesión diferente. Intenta con otro proveedor.');
            break;
        case 'auth/popup-closed-by-user':
            setError('');
            break;
        case 'auth/unauthorized-domain':
            setError('El dominio de esta página no está autorizado. Agrégalo en tu configuración de Firebase Authentication.');
            console.error("Firebase auth error: Domain not authorized. Add the current URL to the Firebase Console > Authentication > Settings > Authorized domains.");
            break;
        case 'auth/operation-not-allowed':
             setError('El inicio de sesión con este método no está habilitado. Actívalo en tu consola de Firebase.');
             console.error("Firebase auth error: Sign-in method is not enabled in the Firebase Console.");
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
                  <div className="relative mt-1">
                    <input id="password-login" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
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
                   <div className="relative mt-1">
                    <input id="password-register" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10" placeholder="Mínimo 6 caracteres" />
                    <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                   </div>
                </div>
                 <div>
                  <label htmlFor="confirm-password-register" className="block text-sm font-medium text-slate-700"> Confirmar Contraseña </label>
                  <div className="relative mt-1">
                    <input id="confirm-password-register" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10" placeholder="Repite tu contraseña" />
                     <button type="button" onClick={() => setShowConfirmPassword(p => !p)} className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700" aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                        {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
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
                   <img src={googleIconUrl} alt="Google" className="w-auto h-full object-contain" />
                </button>
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