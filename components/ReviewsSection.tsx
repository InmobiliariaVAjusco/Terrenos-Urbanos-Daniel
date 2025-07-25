
import React from 'react';
import { Review, User } from '../types';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';

interface ReviewsSectionProps {
  reviews: Review[];
  currentUser: User | null;
  onAddReview: (review: Omit<Review, 'id' | 'author' | 'avatarUrl' | 'userId' | 'date'>) => void;
  onDeleteReview: (reviewId: number) => void;
  onLoginRequest: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, currentUser, onAddReview, onDeleteReview, onLoginRequest }) => {
  return (
    <section className="bg-slate-50 py-16 mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Lo que dicen nuestros clientes</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">La confianza y satisfacción de quienes nos eligen es nuestro mayor orgullo.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
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

          <div className="space-y-8">
            {reviews.map(review => (
              <ReviewCard 
                key={review.id} 
                review={review}
                currentUser={currentUser}
                onDelete={onDeleteReview}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};