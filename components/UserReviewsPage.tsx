
import React from 'react';
import { Review, User } from '../types';
import { ReviewCard } from './ReviewCard';

interface UserReviewsPageProps {
  allReviews: Review[];
  currentUser: User | null;
  onDeleteReview: (reviewId: string) => void;
}

const EmptyState = () => (
    <div className="text-center py-16 bg-white rounded-lg shadow-md border border-slate-200">
        <div className="w-16 h-16 text-green-500 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-700">Aún no has escrito ninguna opinión</h3>
        <p className="text-slate-500 mt-2">Tus reseñas aparecerán aquí una vez que las hayas publicado.</p>
    </div>
);

export const UserReviewsPage: React.FC<UserReviewsPageProps> = ({ allReviews, currentUser, onDeleteReview }) => {
  if (!currentUser) {
    return <p className="text-center text-lg text-slate-600">Debes iniciar sesión para ver tus opiniones.</p>;
  }

  const myReviews = allReviews.filter(review => review.userId === currentUser.uid);

  return (
    <section>
      <div className="mb-10 p-6 bg-white rounded-lg shadow-md border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Mis Opiniones</h2>
        <p className="text-slate-600">Aquí puedes ver y gestionar todas las reseñas que has publicado.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {myReviews.length > 0 ? (
          myReviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUser={currentUser}
              onDelete={onDeleteReview}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};