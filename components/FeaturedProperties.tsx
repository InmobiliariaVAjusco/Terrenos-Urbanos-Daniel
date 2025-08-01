
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Property } from '../types';
import { FeaturedPropertyCard } from './FeaturedPropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
  onToggleFavorite: (id: string) => void;
  favorites: string[];
  onSelectProperty: (property: Property) => void;
}

// Arrow icons for navigation
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties, onToggleFavorite, favorites, onSelectProperty }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // For pausing auto-play on hover

  // Filtra solo las propiedades marcadas como destacadas.
  const featured = useMemo(() => properties.filter(p => p.isFeatured), [properties]);

  // Use useCallback to memoize these functions
  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? featured.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, featured.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === featured.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, featured.length]);
  
  // Effect for auto-playing the carousel
  useEffect(() => {
    // Don't auto-play if paused by user hover or if there's only one slide
    if (isPaused || featured.length <= 1) return;

    const slideInterval = setTimeout(goToNext, 3000); // Change slide every 3 seconds

    return () => clearTimeout(slideInterval); // Clear timeout on cleanup
  }, [currentIndex, isPaused, goToNext, featured.length]);

  if (!featured || featured.length === 0) {
    return (
        <div className="text-center py-16 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-700">No hay propiedades destacadas por el momento</h3>
            <p className="text-slate-500 mt-2">Explora nuestro catálogo completo en la sección de 'Venta'.</p>
        </div>
    );
  }

  return (
    <section 
      className="relative w-full h-[60vh] min-h-[500px] group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        {featured.map((property, index) => (
          <div
            key={property.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${ index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'}`}
          >
            <FeaturedPropertyCard
              property={property}
              onSelect={onSelectProperty}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(property.id)}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-20"
        aria-label="Propiedad anterior"
      >
        <ChevronLeftIcon />
      </button>
      <button 
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 z-20"
        aria-label="Siguiente propiedad"
      >
        <ChevronRightIcon />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {featured.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${ currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Ir a propiedad ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
