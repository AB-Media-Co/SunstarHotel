/* eslint-disable react/prop-types */
import { useState } from 'react';

export const Rating = ({ disabled = false, setInitialRating, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [tempRating, setTempRating] = useState(initialRating);

  const rate = (newRating) => {
    if (!disabled) {
      setRating(newRating);
      setTempRating(newRating);
      if (setInitialRating) setInitialRating(newRating);
    }
  };

  const starOver = (newRating) => {
    if (!disabled) {
      setTempRating(rating);
      setRating(newRating);
    }
  };

  const starOut = () => {
    if (!disabled) {
      setRating(tempRating);
    }
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((index) => {
        const isSelected = rating >= index;
        const starClass = `
          text-2xl 
          cursor-pointer 
          transition-colors duration-200 ease-out 
          ${isSelected ? 'text-yellow-500' : 'text-gray-400'}
          ${disabled ? 'cursor-default' : 'hover:text-yellow-500'}
        `;

        return (
          <label 
            key={index} 
            className={starClass} 
            onClick={() => rate(index)} 
            onMouseOver={() => starOver(index)} 
            onMouseOut={starOut}>
            &#9733;
          </label>
        );
      })}
    </div>
  );
};