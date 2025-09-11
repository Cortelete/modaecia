import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ImageSliderProps {
  images: string[];
  theme: 'dark' | 'light';
  onImageClick?: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, theme, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(currentIndex);
    }
  };

  const dotBaseClasses = 'w-2 h-2 rounded-full transition-all duration-300';
  const activeDotClasses = theme === 'dark' ? 'bg-white scale-125' : 'bg-black scale-125';
  const inactiveDotClasses = theme === 'dark' ? 'bg-white/50' : 'bg-black/40';

  return (
    <div
      className="relative w-full h-64 rounded-lg overflow-hidden"
      onClick={handleImageClick}
    >
      <div
        className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out ${onImageClick ? 'cursor-pointer' : ''}`}
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1.5 hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous Image"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1.5 hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next Image"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`${dotBaseClasses} ${
              currentIndex === index ? activeDotClasses : inactiveDotClasses
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;