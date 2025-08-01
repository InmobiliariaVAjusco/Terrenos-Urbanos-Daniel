
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
import { CookiePolicyPage } from './components/CookiePolicyPage';
import { BudgetPage } from './components/InvestmentPage';
import { ContactPage } from './components/ContactPage';
import { FeaturedProperties } from './components/FeaturedProperties';
import { ServicesSection } from './components/ServicesSection';
import { AboutUsSection } from './components/AboutUsSection';
import { UserReviewsPage } from './components/UserReviewsPage';
import { FloatingSellButton } from './components/FloatingSellButton';
import { SellRequestModal } from './components/SellRequestModal';
import { SellSuccessPage } from './components/SellSuccessPage';
import { Property, User, Review, PrivacyState, View } from './types';
import { INITIAL_REVIEWS } from './constants';
import { auth, db, firebaseInitError } from './firebase';
import { Modal } from './components/Modal';
import { PropertyDetail } from './components/PropertyDetail';

// To inform TypeScript about the global gtag function
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

const PRIVACY_CONSENT_KEY = 'inmuebles-v-privacy-consent';
const LAST_VISIT_KEY = 'inmuebles-v-last-visit';

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
                <li>Ve a <code className="bg-red-200 px-2 py-1 rounded">{'Settings > Environment Variables'}</code>.</li>
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
        <p className="text-lg text-center max-w-2xl">
          No se pudo establecer la conexión con la base de datos. Esto puede deberse a una configuración incorrecta o a un problema de red.
        </p>
        <div className="mt-6 p-4 bg-yellow-100 rounded-lg text-left font-mono text-sm max-w-2xl w-full shadow-inner">
            <p><span className="font-bold">Mensaje de Error:</span> {error.message}</p>
            <p className="mt-2"><span className="font-bold">Recomendación:</span> Revisa la configuración de tu proyecto de Firebase, las reglas de seguridad y que tu clave de API (API_KEY) esté correctamente configurada.</p>
        </div>
    </div>
);


const App: React.FC = () => {
    // State
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSellModalOpen, setSellModalOpen] = useState(false);
    const [isSideBarOpen, setSideBarOpen] = useState(false);
    const [currentView, setCurrentView] = useState<View>('home');
    const [pageKey, setPageKey] = useState(Date.now());
    const [properties, setProperties] = useState<Property[]>([]);
    const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [privacyState, setPrivacyState] = useState<PrivacyState>('pending');
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
    const [appState, setAppState] = useState<AppState>('landing');
    const [isExitingLanding, setIsExitingLanding] = useState(false);

    // Centralized Modal State
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    
    // Notifications State
    const [newProperties, setNewProperties] = useState<Property[]>([]);
    const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
    
    // --- Google Consent Mode ---
    const initializeAnalytics = useCallback(() => {
        if (typeof window.gtag === 'function') {
            console.log("Analytics initialized.");
            window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
            window.gtag('config', 'G-GZTLWX96VR');
        }
    }, []);

    // Data Fetching and Auth Listeners
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('form-submitted') === 'true') {
            setCurrentView('sell-success');
            const newUrl = window.location.pathname;
            window.history.replaceState({ path: newUrl }, '', newUrl);
        }

        const consent = localStorage.getItem(PRIVACY_CONSENT_KEY);
        if (consent === 'accepted') {
            setPrivacyState('accepted');
            initializeAnalytics();
        } else if (consent === 'rejected') {
            setPrivacyState('rejected');
        }
        
        if (firebaseInitError) return;

        const unsubscribeAuth = auth.onAuthStateChanged((user: User | null) => setCurrentUser(user));

        const unsubscribeProperties = db.collection('properties').orderBy('publicationDate', 'desc').onSnapshot(
            (snapshot: any) => {
                const props = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
                setProperties(props);
                
                const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
                if (lastVisit) {
                    const newProps = props.filter((p: Property) => new Date(p.publicationDate) > new Date(lastVisit));
                    setNewProperties(newProps);
                } else {
                    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
                }
                
                setConnectionStatus('online');
            },
            (error: any) => {
                console.error("Error fetching properties:", error);
                setConnectionStatus('offline');
            }
        );

        const unsubscribeReviews = db.collection('reviews').orderBy('date', 'desc').onSnapshot(
            (snapshot: any) => {
                const fetchedReviews = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
                setReviews([...INITIAL_REVIEWS, ...fetchedReviews]);
                setConnectionStatus('online');
            },
            (error: any) => {
                console.error("Error fetching reviews:", error);
                setConnectionStatus('offline');
            }
        );

        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }

        return () => {
            unsubscribeAuth();
            unsubscribeProperties();
            unsubscribeReviews();
        };
    }, [initializeAnalytics]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleLoginClick = useCallback(() => setLoginModalOpen(true), []);
    const handleLogout = useCallback(() => auth.signOut(), []);

    const handleViewChange = useCallback((view: View) => {
        if (view === currentView) return;
        const pageContainer = document.getElementById('page-content');
        if (pageContainer) {
            pageContainer.classList.add('animate-page-exit');
            setTimeout(() => {
                setCurrentView(view);
                setPageKey(Date.now());
                window.scrollTo(0, 0);
            }, 300);
        } else {
            setCurrentView(view);
            window.scrollTo(0, 0);
        }
        setSideBarOpen(false);
    }, [currentView]);
    
    const handleSelectProperty = useCallback((property: Property) => {
        setSelectedProperty(property);
        setNotificationPanelOpen(false); // Close panel if open
    }, []);

    const handleCloseDetailModal = useCallback(() => {
        setSelectedProperty(null);
    }, []);

    const handleToggleFavorite = useCallback((id: string) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    }, []);
    
    const handleToggleNotifications = useCallback(() => {
        setNotificationPanelOpen(prev => {
            const willBeOpen = !prev;
            if (willBeOpen && newProperties.length > 0) {
                localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
                setTimeout(() => setNewProperties([]), 500);
            }
            return willBeOpen;
        });
    }, [newProperties.length]);


    const handleAddReview = useCallback(async (reviewData: Omit<Review, 'id' | 'author' | 'avatarUrl' | 'userId' | 'date'>) => {
        if (!currentUser || !db) return;
        try {
            const newReview = {
                ...reviewData,
                author: currentUser.displayName || 'Anónimo',
                avatarUrl: currentUser.photoURL || `https://i.pravatar.cc/150?u=${currentUser.uid}`,
                userId: currentUser.uid,
                date: new Date().toISOString(),
            };
            await db.collection('reviews').add(newReview);
        } catch (error) {
            console.error("Error al añadir reseña: ", error);
            alert("No se pudo enviar tu reseña. Inténtalo más tarde.");
        }
    }, [currentUser]);

    const handleDeleteReview = useCallback(async (reviewId: string) => {
        if (!db || !currentUser) return;
        if (reviewId.startsWith('demo-')) {
            alert("No se pueden eliminar las reseñas de demostración.");
            return;
        }
        if (window.confirm("¿Estás seguro de que quieres eliminar esta reseña?")) {
            try {
                await db.collection('reviews').doc(reviewId).delete();
            } catch (error) {
                console.error("Error al eliminar reseña: ", error);
                alert("No se pudo eliminar tu reseña. Inténtalo más tarde.");
            }
        }
    }, [currentUser]);

    const handlePrivacyAccept = useCallback(() => {
        localStorage.setItem(PRIVACY_CONSENT_KEY, 'accepted');
        setPrivacyState('accepted');
        initializeAnalytics();
    }, [initializeAnalytics]);

    const handlePrivacyReject = useCallback(() => {
        localStorage.setItem(PRIVACY_CONSENT_KEY, 'rejected');
        setPrivacyState('rejected');
    }, []);

    const handlePrivacyReset = useCallback(() => {
        localStorage.removeItem(PRIVACY_CONSENT_KEY);
        setPrivacyState('pending');
    }, []);

    const handleEnterSite = useCallback(() => {
        setIsExitingLanding(true);
        setTimeout(() => setAppState('main'), 1200);
    }, []);
    
    const featuredProperties = useMemo(() => properties.filter(p => p.isFeatured && (p.status === 'Disponible' || !p.status)), [properties]);
    const saleProperties = useMemo(() => properties.filter(p => p.listingType === 'Venta' && (p.status === 'Disponible' || !p.status)), [properties]);
    const rentProperties = useMemo(() => properties.filter(p => p.listingType === 'Renta' && (p.status === 'Disponible' || !p.status)), [properties]);
    const favoriteProperties = useMemo(() => properties.filter(p => favorites.includes(p.id)), [properties, favorites]);

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return (
                    <>
                        <FeaturedProperties properties={featuredProperties} onSelectProperty={handleSelectProperty} onToggleFavorite={handleToggleFavorite} favorites={favorites} />
                        <AboutUsSection />
                        <ServicesSection />
                        <ReviewsSection reviews={reviews} currentUser={currentUser} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} onLoginRequest={handleLoginClick} connectionStatus={connectionStatus} />
                    </>
                );
            case 'buy':
                return <PropertyList properties={saleProperties} onSelectProperty={handleSelectProperty} onToggleFavorite={handleToggleFavorite} favorites={favorites} title="Propiedades en Venta" />;
            case 'rent':
                return <PropertyList properties={rentProperties} onSelectProperty={handleSelectProperty} onToggleFavorite={handleToggleFavorite} favorites={favorites} title="Propiedades en Renta" />;
            case 'favorites':
                return <PropertyList properties={favoriteProperties} onSelectProperty={handleSelectProperty} onToggleFavorite={handleToggleFavorite} favorites={favorites} title="Mis Favoritos" />;
            case 'budget':
                return <BudgetPage allProperties={properties} onSelectProperty={handleSelectProperty} onToggleFavorite={handleToggleFavorite} favorites={favorites} />;
            case 'privacy':
                return <PrivacyPolicyPage />;
            case 'cookie-policy':
                return <CookiePolicyPage />;
            case 'contact':
                return <ContactPage />;
            case 'my-reviews':
                return <UserReviewsPage allReviews={reviews} currentUser={currentUser} onDeleteReview={handleDeleteReview} />;
             case 'sell-success':
                return <SellSuccessPage onGoHome={() => handleViewChange('home')} />;
            default:
                const _: never = currentView;
                return <p>Página no encontrada</p>;
        }
    };
    
    if (firebaseInitError?.message === 'API_KEY_MISSING') return <ApiKeyErrorScreen />;
    if (firebaseInitError) return <FirebaseInitErrorScreen error={firebaseInitError} />;
    if (privacyState === 'rejected') return <PrivacyRejectionPage onReset={handlePrivacyReset} />;
    if (appState === 'landing') return <LandingPage onEnter={handleEnterSite} isExiting={isExitingLanding} />;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header 
                onMenuClick={() => setSideBarOpen(true)} 
                currentUser={currentUser} 
                onLogout={handleLogout} 
                onLoginClick={handleLoginClick} 
                onViewChange={handleViewChange}
                newProperties={newProperties}
                isNotificationPanelOpen={isNotificationPanelOpen}
                onToggleNotifications={handleToggleNotifications}
                onSelectProperty={handleSelectProperty}
            />
            <SideBar currentView={currentView} onViewChange={handleViewChange} isOpen={isSideBarOpen} onClose={() => setSideBarOpen(false)} onOpen={() => setSideBarOpen(true)} />
            
            <main id="page-content" key={pageKey} className="flex-grow container mx-auto px-4 py-8 animate-page-enter">
                {renderView()}
            </main>
            
            <Footer onViewChange={handleViewChange} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
            <Modal isOpen={!!selectedProperty} onClose={handleCloseDetailModal}>
                {selectedProperty && <PropertyDetail property={selectedProperty} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.includes(selectedProperty.id)} />}
            </Modal>
            {privacyState === 'pending' && <PrivacyBanner onAccept={handlePrivacyAccept} onReject={handlePrivacyReject} onViewPolicy={() => handleViewChange('privacy')} />}
            {currentView === 'home' && <FloatingSellButton onClick={() => setSellModalOpen(true)} />}
            <SellRequestModal isOpen={isSellModalOpen} onClose={() => setSellModalOpen(false)} />
        </div>
    );
};

export default App;