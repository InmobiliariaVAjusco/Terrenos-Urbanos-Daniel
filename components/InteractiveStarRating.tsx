
import React, { useState } from 'react';

interface InteractiveStarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  className?: string;
}

const StarIcon = ({ fill, onMouseEnter, onClick }: { fill: string; onMouseEnter?: () => void; onClick?: () => void; }) => (
  <svg 
    className={`w-8 h-8 ${fill} cursor-pointer transition-transform duration-150 hover:scale-125`} 
    viewBox="0 0 20 20" 
    fill="currentColor"
    onMouseEnter={onMouseEnter}
    onClick={onClick}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const InteractiveStarRating: React.FC<InteractiveStarRatingProps> = ({ rating, onRate, className = '' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fillClass = i <= (hoverRating || rating) ? 'text-yellow-400' : 'text-slate-300';
    stars.push(
      <StarIcon
        key={i}
        fill={fillClass}
        onClick={() => onRate(i)}
        onMouseEnter={() => setHoverRating(i)}
      />
    );
  }

  return <div className={`flex items-center space-x-1 ${className}`} onMouseLeave={() => setHoverRating(0)}>{stars}</div>;
};