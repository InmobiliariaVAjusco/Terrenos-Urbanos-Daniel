
import React from 'react';
import { Review } from '../types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <article className="bg-white p-6 rounded-lg shadow-md border border-slate-200 flex items-start space-x-6">
      <img
        src={review.avatarUrl}
        alt={`Avatar de ${review.author}`}
        className="w-16 h-16 rounded-full shadow-lg border-2 border-green-200 object-cover flex-shrink-0"
      />
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
            <cite className="font-bold text-slate-800 not-italic text-lg">{review.author}</cite>
            <StarRating rating={review.rating} />
        </div>
        <blockquote className="text-slate-600 italic">
            <p>"{review.text}"</p>
        </blockquote>
      </div>
    </article>
  );
};
