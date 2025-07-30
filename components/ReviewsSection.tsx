
import React, { useState } from 'react';
import { Review, User } from '../types';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';

type ConnectionStatus = 'connecting' | 'online' | 'offline';

interface ReviewsSectionProps {
  reviews: Review[];
  currentUser: User | null;
  onAddReview: (review: Omit<Review, 'id' | 'author' | 'avatarUrl' | 'userId' | 'date'>) => void;
  onDeleteReview: (reviewId: string) => void;
  onLoginRequest: () => void;
  connectionStatus: ConnectionStatus;
}

const REVIEWS_PER_PAGE = 6;

const OfflineWarningBanner = () => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded-md" role="alert">
        <div className="flex">
            <div className="py-1">
                <svg className="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v-4h2v4H9zm0 3h2v-2H9v2z"/>
                </svg>
            </div>
            <div>
                <p className="font-bold">Modo sin conexión</p>
                <p className="text-sm">No se pudo conectar a la base de datos. Las nuevas opiniones no se guardarán permanentemente.</p>
            </div>
        </div>
    </div>
);


export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, currentUser, onAddReview, onDeleteReview, onLoginRequest, connectionStatus }) => {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);
  
  const handleShowMore = () => {
      setVisibleCount(prevCount => prevCount + REVIEWS_PER_PAGE);
  };

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <section className="bg-slate-50 py-16 mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Lo que dicen nuestros clientes</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">La confianza y satisfacción de quienes nos eligen es nuestro mayor orgullo.</p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {connectionStatus === 'offline' && <OfflineWarningBanner />}

          <div className="mb-12">
            {currentUser ? (
              <ReviewForm onAddReview={onAddReview} currentUser={currentUser} />
            ) : (
              <div className="text-center bg-white p-6 rounded-lg shadow-md border border-slate-200">
                <p className="text-slate-700">¿Quieres dejar tu opinión sobre nuestro servicio?</p>
                <button
                  onClick={onLoginRequest}
                  className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ingresa para comentar
                </button>
              </div>
            )}
          </div>
          
          {visibleReviews.length > 0 && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {visibleReviews.map(review => (
                  <ReviewCard 
                      key={review.id} 
                      review={review}
                      currentUser={currentUser}
                      onDelete={onDeleteReview}
                  />
              ))}
            </div>
          )}

          {connectionStatus === 'connecting' && (
              <div className="text-center py-8 text-slate-500">
                  <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin mx-auto mb-4"></div>
                  Cargando opiniones...
              </div>
          )}
          
          {reviews.length === 0 && connectionStatus !== 'connecting' && (
               <div className="text-center py-12 bg-white rounded-lg shadow border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-700">¡Sé el primero en opinar!</h3>
                  <p className="text-slate-500 mt-2">Aún no hay reseñas. Nos encantaría conocer tu experiencia.</p>
              </div>
          )}

          {visibleCount < reviews.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleShowMore}
                className="px-8 py-3 bg-white text-green-700 font-bold rounded-lg border-2 border-green-600 hover:bg-green-50 transition-transform hover:scale-105"
              >
                Ver más comentarios
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};