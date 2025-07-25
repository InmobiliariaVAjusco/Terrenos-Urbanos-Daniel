
import React from 'react';
import { Review, User } from '../types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
  currentUser: User | null;
  onDelete: (id: string) => void;
}

// Helper to format date
const formatDateAgo = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return 'hace 1 día';
    if (diffDays < 30) return `hace ${diffDays} días`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return 'hace 1 mes';
    if (diffMonths < 12) return `hace ${diffMonths} meses`;
    const diffYears = Math.floor(diffDays / 365);
    return `hace ${diffYears} año${diffYears > 1 ? 's' : ''}`;
};

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


export const ReviewCard: React.FC<ReviewCardProps> = ({ review, currentUser, onDelete }) => {
  const isOwner = currentUser && currentUser.uid === review.userId;

  return (
    <article className="bg-white p-6 rounded-lg shadow-lg border border-slate-200/80 flex space-x-6">
      <img
        src={review.avatarUrl}
        alt={`Avatar de ${review.author}`}
        className="w-14 h-14 rounded-full shadow-md border-2 border-green-200 object-cover flex-shrink-0 mt-1"
      />
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
            <div>
              <cite className="font-bold text-slate-800 not-italic text-lg">{review.author}</cite>
              <p className="text-xs text-slate-500">{formatDateAgo(review.date)}</p>
            </div>
             {isOwner && (
              <button 
                onClick={() => onDelete(review.id)}
                className="p-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                aria-label="Eliminar mi reseña"
              >
                <TrashIcon />
              </button>
            )}
        </div>
        <StarRating rating={review.rating} className="mb-3 justify-start" />
        <blockquote className="text-slate-900 leading-relaxed">
            <p>"{review.text}"</p>
        </blockquote>
      </div>
    </article>
  );
};