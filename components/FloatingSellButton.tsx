import React from 'react';

interface FloatingSellButtonProps {
  onClick: () => void;
}

const HouseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const FloatingSellButton: React.FC<FloatingSellButtonProps> = ({ onClick }) => {
  return (
    // Main container for the button and its "thought bubbles"
    <div className="fixed bottom-12 right-8 z-30 animate-float-thought-bubble">
      
      {/* The "thought bubbles" */}
      <div className="absolute -bottom-6 -left-8 flex items-end">
        <div className="w-2 h-2 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full animate-bubble-scale" style={{ animationDelay: '0.6s' }}></div>
        <div className="w-4 h-4 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full ml-1 animate-bubble-scale" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-6 h-6 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full ml-1 animate-bubble-scale" style={{ animationDelay: '0s' }}></div>
      </div>
      
      {/* Main circular button */}
      <button
        onClick={onClick}
        className="relative 
                   w-36 h-36 rounded-full
                   flex flex-col items-center justify-center
                   text-white text-center font-bold
                   bg-gradient-to-br from-blue-500 to-indigo-600 
                   shadow-2xl shadow-blue-500/30
                   transition-all duration-300 ease-in-out
                   hover:scale-105 hover:shadow-blue-400/50 hover:shadow-2xl
                   focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Vende tu propiedad"
      >
        <span className="text-base leading-tight max-w-[70px]">Vende tu Propiedad</span>
        <HouseIcon />
      </button>

      <style>{`
        @keyframes float-thought-bubble {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-float-thought-bubble {
          animation: float-thought-bubble 4s ease-in-out infinite;
        }

        @keyframes bubble-scale {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .animate-bubble-scale {
          animation: bubble-scale 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};