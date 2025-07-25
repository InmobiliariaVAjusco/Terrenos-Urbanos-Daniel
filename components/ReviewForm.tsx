
import React, { useState } from 'react';
import { Review, User } from '../types';
import { InteractiveStarRating } from './InteractiveStarRating';

interface ReviewFormProps {
  currentUser: User;
  onAddReview: (review: Omit<Review, 'id' | 'author' | 'avatarUrl'>) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ currentUser, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (rating === 0) {
      setError('Por favor, selecciona una calificación de estrellas.');
      return;
    }
    if (!text.trim()) {
      setError('Por favor, escribe tu opinión.');
      return;
    }

    onAddReview({ rating, text });
    // Reset form
    setRating(0);
    setText('');
  };
  
  const displayName = currentUser.displayName?.split(' ')[0] || 'Tú';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">Deja tu opinión, {displayName}</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tu calificación</label>
          <InteractiveStarRating rating={rating} onRate={setRating} />
        </div>
        <div>
          <label htmlFor="reviewText" className="block text-sm font-medium text-slate-700">Tu reseña</label>
          <textarea
            id="reviewText"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Comparte tu experiencia con nosotros..."
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform hover:scale-105"
          >
            Enviar Opinión
          </button>
        </div>
      </form>
    </div>
  );
};