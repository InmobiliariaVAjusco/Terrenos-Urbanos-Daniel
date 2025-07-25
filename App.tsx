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
import { auth } from './firebase';

type View = 'buy' | 'sell' | 'favorites';

function App() {
  const [view, setView] = useState<View>('buy');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        // In a real app, you would load user-specific data like favorites from a database here.
        // For now, we reset favorites on login.
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