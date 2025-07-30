
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
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return 'ahora';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    const diffMonths = Math.floor(diffDays / 30.44); // Average days in a month
    if (diffMonths < 12) return `hace ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    const diffYears = Math.floor(diffMonths / 12);
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
    <article className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 break-inside-avoid">
        {/* Centered Quote Icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 text-green-50 text-9xl opacity-70 z-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
            </svg>
        </div>
        <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <img
                        src={review.avatarUrl}
                        alt={`Avatar de ${review.author}`}
                        className="w-14 h-14 rounded-full shadow-md border-4 border-white object-cover"
                    />
                    <div>
                    <cite className="font-bold text-slate-800 not-italic text-lg">{review.author}</cite>
                    <p className="text-xs text-slate-500">{formatDateAgo(review.date)}</p>
                    </div>
                </div>
                {isOwner && (
                <button 
                    onClick={() => onDelete(review.id)}
                    className="p-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors duration-200 flex-shrink-0"
                    aria-label="Eliminar mi reseña"
                >
                    <TrashIcon />
                </button>
                )}
            </div>
            <StarRating rating={review.rating} className="mb-4 justify-start" />
            <blockquote className="text-slate-800 leading-relaxed text-base italic">
                <p>"{review.text}"</p>
            </blockquote>
      </div>
    </article>
  );
};