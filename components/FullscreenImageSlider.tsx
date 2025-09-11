import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface FullscreenImageSliderProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  theme: 'dark' | 'light';
}

const FullscreenImageSlider: React.FC<FullscreenImageSliderProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goToPrevious, goToNext]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-20"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            <img 
                src={images[currentIndex]} 
                alt={`Image ${currentIndex + 1} of ${images.length}`} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
        </div>

        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 sm:p-3 hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white z-20"
              aria-label="Previous Image"
            >
              <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 sm:p-3 hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white z-20"
              aria-label="Next Image"
            >
              <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FullscreenImageSlider;
