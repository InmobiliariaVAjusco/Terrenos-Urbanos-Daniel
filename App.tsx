import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PropertyList } from './components/PropertyList';
import { SellForm } from './components/SellForm';
import { PrivacyBanner } from './components/PrivacyBanner';
import { ReviewsSection } from './components/ReviewsSection';
import { LoginModal } from './components/LoginModal';
import { Property, User, Review } from './types';
import { INITIAL_PROPERTIES, INITIAL_REVIEWS } from './constants';
import { auth, firebaseInitError } from './firebase';

type View = 'buy' | 'sell' | 'favorites';

const ApiKeyErrorScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-4">
        <div className="w-16 h-16 text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Configuración Requerida</h1>
        <p className="text-lg text-center max-w-2xl">
            Para que la aplicación funcione, es necesario configurar tu clave de API de Firebase.
        </p>
        <div className="mt-6 p-4 bg-red-100 rounded-lg text-left font-mono text-sm max-w-2xl w-full shadow-inner">
            <p className="font-bold">Acción requerida:</p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
                <li>Abre el archivo: <code className="bg-red-200 px-2 py-1 rounded">firebase.ts</code></li>
                <li>Encuentra la línea que contiene el texto: <code className="bg-red-200 px-2 py-1 rounded">'DEBES_PEGAR_TU_API_KEY_DE_FIREBASE_AQUI'</code></li>
                <li>Reemplaza ese texto con tu clave de API real desde la Consola de Firebase.</li>
            </ol>
        </div>
    </div>
);

const FirebaseInitErrorScreen = ({ error }: { error: Error }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-orange-800 p-4">
        <div className="w-16 h-16 text-orange-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Error de Inicialización</h1>
        <p className="text-lg text-center max-w-2xl">
            No se pudo conectar con los servicios de la aplicación.
        </p>
        <div className="mt-6 p-4 bg-orange-100 rounded-lg text-left font-mono text-sm max-w-2xl w-full shadow-inner">
            <p className="font-bold">Detalle del error:</p>
            <p className="mt-2">{error.message}</p>
            <p className="mt-4 text-xs">
                Esto puede deberse a un problema de red, un error de configuración del script de Firebase, o un bloqueador de scripts en tu navegador. Revisa la consola para más detalles.
            </p>
        </div>
    </div>
);

function App() {
  const [view, setView] = useState<View>('buy');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Sistema de verificación robusto para la inicialización de Firebase.
  if (firebaseInitError) {
    if (firebaseInitError.message === "API_KEY_MISSING") {
      return <ApiKeyErrorScreen />;
    }
    return <FirebaseInitErrorScreen error={firebaseInitError} />;
  }

  useEffect(() => {
    // Como firebaseInitError es nulo, podemos asumir que 'auth' está disponible.
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        setFavorites([]);
      } else {
        setCurrentUser(null);
        setFavorites([]);
      }
      setIsLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = useCallback(() => {
    auth.signOut();
    setView('buy'); // Go back to the main view on logout
  }, []);
  
  const handleToggleFavorite = useCallback((id: number) => {
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    }
    setFavorites(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    );
  }, [currentUser]);

  const handleAddProperty = useCallback((newProperty: Omit<Property, 'publicationDate'>) => {
    const propertyToAdd: Property = {
      ...newProperty,
      publicationDate: new Date().toISOString(),
    };
    setProperties(prevProperties => [propertyToAdd, ...prevProperties]);
    setView('buy'); // Switch back to buy view after adding
  }, []);
  
  const handleAddReview = useCallback((newReview: Omit<Review, 'id' | 'author' | 'avatarUrl'>) => {
    if(!currentUser) return;
    const reviewToAdd: Review = {
        ...newReview,
        id: Date.now(),
        author: currentUser.displayName || 'Anónimo',
        avatarUrl: currentUser.photoURL || `https://i.pravatar.cc/150?u=${currentUser.uid}`
    }
    setReviews(prev => [reviewToAdd, ...prev]);
  }, [currentUser]);

  const handleViewChange = useCallback((newView: View) => {
    if (newView === 'favorites' && !currentUser) {
        setLoginModalOpen(true);
    } else {
        setView(newView);
    }
  }, [currentUser]);

  const favoriteProperties = useMemo(() => {
    return properties.filter(p => favorites.includes(p.id));
  }, [properties, favorites]);

  if (isLoadingAuth) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-800">
      <Header 
        currentView={view} 
        onViewChange={handleViewChange}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => setLoginModalOpen(true)}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'buy' && <PropertyList properties={properties} onToggleFavorite={handleToggleFavorite} favorites={favorites} />}
        {view === 'sell' && <SellForm onAddProperty={handleAddProperty} />}
        {view === 'favorites' && <PropertyList title="Mis Favoritos" properties={favoriteProperties} onToggleFavorite={handleToggleFavorite} favorites={favorites} />}
      </main>
      <ReviewsSection 
        reviews={reviews}
        currentUser={currentUser}
        onAddReview={handleAddReview}
        onLoginRequest={() => setLoginModalOpen(true)}
      />
      <Footer />
      <PrivacyBanner />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}

export default App;
