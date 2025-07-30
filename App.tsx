
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Footer } from './components/Footer';
import { PropertyList } from './components/PropertyList';
import { PrivacyBanner } from './components/PrivacyBanner';
import { ReviewsSection } from './components/ReviewsSection';
import { LoginModal } from './components/LoginModal';
import { LandingPage } from './components/LandingPage';
import { PrivacyRejectionPage } from './components/PrivacyRejectionPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { InvestmentPage } from './components/InvestmentPage';
import { ContactPage } from './components/ContactPage';
import { FeaturedProperties } from './components/FeaturedProperties';
import { ServicesSection } from './components/ServicesSection';
import { UserReviewsPage } from './components/UserReviewsPage';
import { Property, User, Review, PrivacyState, View } from './types';
import { INITIAL_REVIEWS } from './constants';
import { auth, db, firebaseInitError } from './firebase';

const PRIVACY_CONSENT_KEY = 'inmuebles-v-privacy-consent';

type SimpleError = { message: string; name: string; code?: string; };
type ConnectionStatus = 'connecting' | 'online' | 'offline';
type AppState = 'landing' | 'entering' | 'main';


const ApiKeyErrorScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-4">
        <div className="w-16 h-16 text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Configuración Requerida</h1>
        <p className="text-lg text-center max-w-2xl">
            Para que la aplicación funcione, es necesario configurar la clave de API de Firebase como una variable de entorno.
        </p>
        <div className="mt-6 p-4 bg-red-100 rounded-lg text-left font-mono text-sm max-w-2xl w-full shadow-inner">
            <p className="font-bold">Acción requerida:</p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
                <li>Si estás desplegando en Vercel, ve a la configuración de tu proyecto.</li>
                <li>Ve a <code className="bg-red-200 px-2 py-1 rounded">Settings &gt; Environment Variables</code>.</li>
                <li>Añade una nueva variable llamada <code className="bg-red-200 px-2 py-1 rounded">API_KEY</code>.</li>
                <li>Pega tu clave de API de Firebase como el valor de esa variable.</li>
                <li>Vuelve a desplegar tu aplicación. Consulta el archivo <code className="bg-red-200 px-2 py-1 rounded">README.md</code> para más detalles.</li>
            </ol>
        </div>
    </div>
);

const FirebaseInitErrorScreen = ({ error }: { error: SimpleError }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-yellow-800 p-4">
         <div className="w-16 h-16 text-yellow-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Error de Conexión con Firebase</h1>
        <p className="text-lg text-center max-w-2xl mb-6">
            No se pudo establecer la conexión con los servicios de Firebase. Revisa los pasos de la guía de configuración.
        </p>
        <details className="p-4 bg-yellow-100 rounded-lg text-left font-mono text-sm max-w-2xl w-full shadow-inner cursor-pointer">
            <summary className="font-bold text-yellow-900">Detalles del error técnico</summary>
            <pre className="mt-2 p-3 bg-white rounded text-yellow-800 overflow-auto text-xs">
                {`Nombre: ${error.name}\nMensaje: ${error.message}${error.code ? `\nCódigo: ${error.code}`: ''}`}
            </pre>
        </details>
    </div>
);

// Main Application Component
const App = () => {
    // State for app navigation and data
    const [currentView, setCurrentView] = useState<View>('home');
    const [properties, setProperties] = useState<Property[]>([]);
    const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [animationClass, setAnimationClass] = useState('');
    
    // State for UI controls
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    // User and Authentication state
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    // *** REVISED PRIVACY AND LANDING STATE LOGIC ***
    const [appState, setAppState] = useState<AppState>('landing');
    const [privacyState, setPrivacyState] = useState<PrivacyState>('pending');

    // Database connection status
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');

    // --- Effects ---

    // Effect for checking privacy consent on mount.
    useEffect(() => {
        try {
            const consent = localStorage.getItem(PRIVACY_CONSENT_KEY) as PrivacyState | null;
            if (consent === 'accepted' || consent === 'rejected') {
                setPrivacyState(consent);
            } else {
                 setPrivacyState('pending');
            }
        } catch (error) {
            console.error("No se pudo acceder a localStorage:", error);
            setPrivacyState('pending');
        }
    }, []);

    // Effect for Firebase authentication state
    useEffect(() => {
        if (!auth) {
            setAuthLoading(false);
            return;
        }
        const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
            setCurrentUser(user);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Effect for loading properties from Firestore
    useEffect(() => {
        if (!db) return;
        setConnectionStatus('connecting');

        const unsubscribe = db.collection('properties').onSnapshot(
            (snapshot: any) => {
                const fetchedProperties = snapshot.docs.map((doc: any) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProperties(fetchedProperties);
                setConnectionStatus('online');
            },
            (error: any) => {
                console.error("Error al obtener propiedades de Firestore: ", error);
                setConnectionStatus('offline');
            }
        );

        return () => unsubscribe();
    }, []);

    // Effect for loading reviews from Firestore
    useEffect(() => {
        if (!db) return;
        setConnectionStatus('connecting');

        const unsubscribe = db.collection('reviews')
            .orderBy('date', 'desc')
            .onSnapshot(
            (snapshot: any) => {
                const fetchedReviews: Review[] = snapshot.docs.map((doc: any) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReviews(fetchedReviews);
                setConnectionStatus('online');
            },
            (error: any) => {
                console.error("Error al obtener reseñas de Firestore: ", error);
                setConnectionStatus('offline');
            }
        );
        return () => unsubscribe();
    }, []);
    

    // Effect for loading favorites from localStorage
    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error("No se pudieron cargar los favoritos:", error);
        }
    }, []);

    // --- Handlers ---
    
    const handleEnterApp = useCallback(() => {
        setAppState('entering');
        setTimeout(() => {
            setAppState('main');
        }, 1200); // This duration should match the exit animation
    }, []);
    
    const handleAcceptPrivacy = useCallback(() => {
        try {
            localStorage.setItem(PRIVACY_CONSENT_KEY, 'accepted');
        } catch (error) { console.error("No se pudo guardar la preferencia de privacidad:", error); }
        setPrivacyState('accepted');
    }, []);

    const handleRejectPrivacy = useCallback(() => {
        try {
            localStorage.setItem(PRIVACY_CONSENT_KEY, 'rejected');
        } catch (error) { console.error("No se pudo guardar la preferencia de privacidad:", error); }
        setPrivacyState('rejected');
    }, []);

    const resetPrivacyAndRestart = () => {
        try {
            localStorage.removeItem(PRIVACY_CONSENT_KEY);
        } catch (error) { console.error("No se pudo reiniciar la preferencia de privacidad:", error); }
        setPrivacyState('pending');
        setAppState('landing');
        setCurrentView('home');
    };
    
    const handleViewChange = useCallback((view: View) => {
        if (view === currentView) {
            setSidebarOpen(false);
            return;
        }

        setAnimationClass('animate-page-exit');
        setSidebarOpen(false);

        setTimeout(() => {
            setCurrentView(view);
            window.scrollTo(0, 0);
            setAnimationClass('animate-page-enter');
        }, 300); // Duration must match the CSS exit animation
    }, [currentView]);

    const handleLogout = useCallback(async () => {
        if (!auth) return;
        try {
            await auth.signOut();
            setCurrentUser(null);
            handleViewChange('home');
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    }, [handleViewChange]);

    const handleToggleFavorite = useCallback((id: string) => {
        const newFavorites = favorites.includes(id)
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];
        setFavorites(newFavorites);
        try {
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error("No se pudieron guardar los favoritos:", error);
        }
    }, [favorites]);
    
    const handleAddReview = useCallback(async (reviewData: Omit<Review, 'id' | 'author' | 'avatarUrl' | 'userId' | 'date'>) => {
        if (!currentUser || !db) return;
        const newReview = {
            ...reviewData,
            author: currentUser.displayName || 'Anónimo',
            avatarUrl: currentUser.photoURL || `https://i.pravatar.cc/150?u=${currentUser.uid}`,
            userId: currentUser.uid,
            date: new Date().toISOString()
        };
        try {
            await db.collection('reviews').add(newReview);
        } catch (error) {
            console.error("Error al añadir reseña: ", error);
        }
    }, [currentUser]);

    const handleDeleteReview = useCallback(async (reviewId: string) => {
        if (!db) return;
        const reviewToDelete = reviews.find(r => r.id === reviewId);
        if (reviewToDelete && reviewToDelete.userId === currentUser?.uid) {
            try {
                await db.collection('reviews').doc(reviewId).delete();
            } catch (error) {
                console.error("Error al eliminar reseña: ", error);
            }
        }
    }, [reviews, currentUser]);
    
    // --- Memos for derived data ---
    const featuredProperties = useMemo(() => properties.filter(p => p.isFeatured), [properties]);
    const favoriteProperties = useMemo(() => properties.filter(p => favorites.includes(p.id)), [properties, favorites]);
    const saleProperties = useMemo(() => properties.filter(p => p.listingType === 'Venta'), [properties]);
    const rentProperties = useMemo(() => properties.filter(p => p.listingType === 'Renta'), [properties]);


    // --- Render Logic ---
    // Check for critical errors first.
    if (!process.env.API_KEY) return <ApiKeyErrorScreen />;
    if (firebaseInitError) return <FirebaseInitErrorScreen error={firebaseInitError} />;
    
    // Render landing page sequence. The app always starts here.
    if (appState === 'landing' || appState === 'entering') {
        return <LandingPage onEnter={handleEnterApp} isExiting={appState === 'entering'} />;
    }
    
    // If we are in 'main' state and user rejected privacy, show the rejection page.
    if (appState === 'main' && privacyState === 'rejected') {
        return <PrivacyRejectionPage onReset={resetPrivacyAndRestart} />;
    }

    // --- Main App Render ---
    // This will only render if appState is 'main' and privacy is not rejected.
    
    let content;
    switch (currentView) {
        case 'home':
            content = (
                <>
                    <FeaturedProperties properties={featuredProperties} onToggleFavorite={handleToggleFavorite} favorites={favorites} />
                    <ServicesSection />
                    <ReviewsSection reviews={reviews} currentUser={currentUser} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} onLoginRequest={() => setLoginModalOpen(true)} connectionStatus={connectionStatus}/>
                </>
            );
            break;
        case 'buy':
            content = <PropertyList properties={saleProperties} onToggleFavorite={handleToggleFavorite} favorites={favorites} title="Propiedades en Venta" />;
            break;
        case 'rent':
            content = <PropertyList properties={rentProperties} onToggleFavorite={handleToggleFavorite} favorites={favorites} title="Propiedades en Renta" />;
            break;
        case 'favorites':
            content = <PropertyList properties={favoriteProperties} onToggleFavorite={handleToggleFavorite} favorites={favorites} title="Mis Favoritos" />;
            break;
        case 'my-reviews':
             content = <UserReviewsPage allReviews={reviews} currentUser={currentUser} onDeleteReview={handleDeleteReview} />;
             break;
        case 'privacy':
            content = <PrivacyPolicyPage />;
            break;
        case 'investment':
            content = <InvestmentPage />;
            break;
        case 'contact':
            content = <ContactPage />;
            break;
        default:
            content = <h1 className="text-2xl">Página no encontrada</h1>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 relative">
            <Header onMenuClick={() => setSidebarOpen(true)} currentUser={currentUser} onLogout={handleLogout} onLoginClick={() => setLoginModalOpen(true)} onViewChange={handleViewChange} />
            <SideBar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} currentView={currentView} onViewChange={handleViewChange} />

            <main className={`container mx-auto px-4 py-8 flex-grow ${animationClass}`}>
                {content}
            </main>

            <Footer />

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
            
            {/* The privacy banner now appears here, over the main app content, only if needed */}
            {appState === 'main' && privacyState === 'pending' && <PrivacyBanner onAccept={handleAcceptPrivacy} onReject={handleRejectPrivacy} />}
        </div>
    );
};

export default App;