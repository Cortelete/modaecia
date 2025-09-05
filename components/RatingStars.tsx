
import React, { useState } from 'react';
import { StarIcon as StarSolid } from './Icons';

interface RatingStarsProps {
  onRate: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);

  const handleClick = (rating: number) => {
    setCurrentRating(rating);
    onRate(rating);
  };

  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleClick(star)}
          className="focus:outline-none"
        >
          <StarSolid
            className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-all duration-200 transform hover:scale-125 ${
              (hoverRating || currentRating) >= star ? 'text-yellow-400' : 'text-neutral-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;