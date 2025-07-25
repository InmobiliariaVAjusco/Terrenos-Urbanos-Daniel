

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Footer } from './components/Footer';
import { PropertyList } from './components/PropertyList';
import { SellForm } from './components/SellForm';
import { PrivacyBanner } from './components/PrivacyBanner';
import { ReviewsSection } from './components/ReviewsSection';
import { LoginModal } from './components/LoginModal';
import { LandingPage } from './components/LandingPage';
import { PrivacyRejectionPage } from './components/PrivacyRejectionPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { RentPage } from './components/RentPage';
import { InvestmentPage } from './components/InvestmentPage';
import { ContactPage } from './components/ContactPage';
import { FeaturedProperties } from './components/FeaturedProperties';
import { UserMenu } from './components/UserMenu';
import { Property, User, Review, PrivacyState, View } from './types';
import { INITIAL_PROPERTIES, INITIAL_REVIEWS } from './constants';
import { auth, firebaseInitError } from './firebase';

const PRIVACY_CONSENT_KEY = 'inmuebles-v-privacy-consent';

const ApiKeyErrorScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-4">
        <div className="w-16 h-16 text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Configuración Requerida</h1>
        <p className="text-lg text-center max-w-2xl">
            Para que la aplicación funcione, es necesario que configures tu clave de API de Firebase.
        </p>
        <div className="mt-6 p-4 bg-red-100 rounded-lg text-left font-mono text-sm max-w-2xl w-full shadow-inner">
            <p className="font-bold">Acción requerida:</p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
                <li>Abre el archivo <code className="bg-red-200 px-2 py-1 rounded">firebase.ts</code> en tu editor de código.</li>
                <li>Busca la línea que dice <code className="bg-red-200 px-2 py-1 rounded">apiKey: "TU_API_KEY_AQUI"</code>.</li>
                <li>Reemplaza <code className="bg-red-200 px-2 py-1 rounded">"TU_API_KEY_AQUI"</code> con la clave de API real de tu proyecto de Firebase.</li>
                <li>Guarda el archivo. La aplicación debería funcionar correctamente.</li>
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
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [privacyState, setPrivacyState] = useState<PrivacyState>('pending');
  const [view, setView] = useState<View>('home');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (firebaseInitError) {
    if (firebaseInitError.message === "API_KEY_MISSING") {
      return <ApiKeyErrorScreen />;
    }
    return <FirebaseInitErrorScreen error={firebaseInitError} />;
  }
  
  useEffect(() => {
    const savedState = localStorage.getItem(PRIVACY_CONSENT_KEY);
    if (savedState === 'accepted') {
        setPrivacyState('accepted');
    }
  }, []);

  useEffect(() => {
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

  const handleAcceptPrivacy = useCallback(() => {
    localStorage.setItem(PRIVACY_CONSENT_KEY, 'accepted');
    setPrivacyState('accepted');
  }, []);

  const handleRejectPrivacy = useCallback(() => {
    setPrivacyState('rejected');
  }, []);

  const handleResetToLanding = useCallback(() => {
    setPrivacyState('pending');
    setShowLandingPage(true);
  }, []);

  const handleLogout = useCallback(() => {
    auth.signOut();
    setView('buy');
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
    setView('buy');
  }, []);
  
  const handleAddReview = useCallback((newReview: Omit<Review, 'id' | 'author' | 'avatarUrl' | 'userId' | 'date'>) => {
    if(!currentUser) return;
    const reviewToAdd: Review = {
        ...newReview,
        id: Date.now(),
        author: currentUser.displayName || 'Anónimo',
        avatarUrl: currentUser.photoURL || `https://i.pravatar.cc/150?u=${currentUser.uid}`,
        userId: currentUser.uid,
        date: new Date().toISOString()
    }
    setReviews(prev => [reviewToAdd, ...prev]);
  }, [currentUser]);

  const handleDeleteReview = useCallback((reviewId: number) => {
      if (!currentUser) return;
      
      const reviewToDelete = reviews.find(r => r.id === reviewId);
      if (reviewToDelete?.userId !== currentUser.uid) {
          console.error("Acción no permitida: No puedes borrar la reseña de otro usuario.");
          return;
      }
      
      if (window.confirm('¿Estás seguro de que quieres eliminar tu opinión? Esta acción no se puede deshacer.')) {
          setReviews(prev => prev.filter(review => review.id !== reviewId));
      }
  }, [currentUser, reviews]);

  const handleViewChange = useCallback((newView: View) => {
    if (newView === 'favorites' && !currentUser) {
        setLoginModalOpen(true);
    } else {
        setView(newView);
    }
    setSidebarOpen(false); // Close sidebar on navigation
  }, [currentUser]);
  
  const handleEnterApp = () => {
    setShowLandingPage(false);
  };
  
  const toggleSidebar = () => {
      setSidebarOpen(prev => !prev);
  }

  const favoriteProperties = useMemo(() => {
    return properties.filter(p => favorites.includes(p.id));
  }, [properties, favorites]);
  
  const renderContent = () => {
    switch (view) {
        case 'home':
             return <FeaturedProperties properties={properties} onToggleFavorite={handleToggleFavorite} favorites={favorites} />;
        case 'buy':
            return <PropertyList properties={properties} onToggleFavorite={handleToggleFavorite} favorites={favorites} />;
        case 'sell':
            return <SellForm onAddProperty={handleAddProperty} />;
        case 'favorites':
            return <PropertyList title="Mis Favoritos" properties={favoriteProperties} onToggleFavorite={handleToggleFavorite} favorites={favorites} />;
        case 'rent':
            return <RentPage />;
        case 'investment':
            return <InvestmentPage />;
        case 'contact':
            return <ContactPage />;
        case 'privacy':
            return <PrivacyPolicyPage />;
        default:
            return <PropertyList properties={properties} onToggleFavorite={handleToggleFavorite} favorites={favorites} />;
    }
  };

  if (showLandingPage) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  if (privacyState === 'rejected') {
    return <PrivacyRejectionPage onReset={handleResetToLanding} />;
  }

  if (isLoadingAuth) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="bg-white font-sans text-slate-800 relative min-h-screen">
      <SideBar
        currentView={view}
        onViewChange={handleViewChange}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      
      {/* Overlay for when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      <div className="flex flex-col min-h-screen">
        <Header 
            onMenuClick={toggleSidebar}
            currentUser={currentUser}
            onLogout={handleLogout}
            onLoginClick={() => setLoginModalOpen(true)}
            onShowFavorites={() => handleViewChange('favorites')}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
            {renderContent()}
        </main>
        <div className="mt-auto">
            <ReviewsSection 
                reviews={reviews}
                currentUser={currentUser}
                onAddReview={handleAddReview}
                onDeleteReview={handleDeleteReview}
                onLoginRequest={() => setLoginModalOpen(true)}
            />
            <Footer />
        </div>
      </div>
      
      {privacyState === 'pending' && (
        <PrivacyBanner onAccept={handleAcceptPrivacy} onReject={handleRejectPrivacy} />
      )}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}

export default App;