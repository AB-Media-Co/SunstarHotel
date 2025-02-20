/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import CommonButton from "../CommonButton";

const HotelCard = ({
  hotel,
  btnClass = "bg-primary-yellow hover:bg-secondary-yellow text-primary-gray w-full py-3 transition-colors duration-300 ease-in-out",
  autoSlideInterval = 3000, // Default auto-slide interval in milliseconds
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const timerRef = useRef(null);

  // States to control the transition
  const [nextImageIndex, setNextImageIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState('right'); // 'right' for next, 'left' for prev
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentImgClass, setCurrentImgClass] = useState("translate-x-0");
  const [nextImgClass, setNextImgClass] = useState("");

  const transitionDuration = 500; // milliseconds

  useEffect(() => {
    if (Array.isArray(hotel.images)) {
      setImages(hotel.images);
    } else if (typeof hotel.images === "string") {
      setImages([hotel.images]);
    } else {
      setImages([]);
    }
  }, [hotel.images]);

  // A helper function to start the slide transition
  const startTransition = (newIndex, direction) => {
    if (isTransitioning) return;
    setSlideDirection(direction);
    setNextImageIndex(newIndex);
    setIsTransitioning(true);

    // Set the initial positions
    if (direction === "right") {
      // For a "next" slide, incoming image starts offscreen to the right.
      setCurrentImgClass("translate-x-0");
      setNextImgClass("translate-x-full");
    } else {
      // For a "previous" slide, incoming image starts offscreen to the left.
      setCurrentImgClass("translate-x-0");
      setNextImgClass("-translate-x-full");
    }

    // On the next frame, trigger the transition
    requestAnimationFrame(() => {
      if (direction === "right") {
        setCurrentImgClass("-translate-x-full");
        setNextImgClass("translate-x-0");
      } else {
        setCurrentImgClass("translate-x-full");
        setNextImgClass("translate-x-0");
      }
    });

    // After the transition duration, finalize the change
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setIsTransitioning(false);
      setNextImageIndex(null);
      // Reset transform classes
      setCurrentImgClass("translate-x-0");
      setNextImgClass("");
    }, transitionDuration);
  };

  const nextImage = () => {
    if (isTransitioning || images.length <= 1) return;
    const newIndex = (currentImageIndex + 1) % images.length;
    startTransition(newIndex, "right");
  };

  const prevImage = () => {
    if (isTransitioning || images.length <= 1) return;
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    startTransition(newIndex, "left");
  };

  // Auto-slide effect
  useEffect(() => {
    if (images.length > 1 && autoSlideInterval > 0) {
      timerRef.current = setInterval(() => {
        nextImage();
      }, autoSlideInterval);
    }
    return () => clearInterval(timerRef.current);
  }, [images, autoSlideInterval, currentImageIndex]);

  // Reset timer on manual navigation via dots
  const handleDotClick = (index) => {
    clearInterval(timerRef.current);
    if (isTransitioning || index === currentImageIndex) return;
    const direction = index > currentImageIndex ? "right" : "left";
    startTransition(index, direction);
  };

  return (
    <div className="group relative rounded-xl shadow-md overflow-hidden bg-primary-white transition-shadow duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative w-full h-56 md:h-64">
        {images.length > 0 ? (
          <div className="relative w-full h-full overflow-hidden">
            {/* Current Image */}
            <img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-transform duration-${transitionDuration} ease-in-out ${currentImgClass}`}
            />
            {/* Incoming Image – only render during transition */}
            {isTransitioning && nextImageIndex !== null && (
              <img
                key={nextImageIndex}
                src={images[nextImageIndex]}
                alt={`${hotel.name} - Image ${nextImageIndex + 1}`}
                className={`w-full h-full object-cover absolute top-0 left-0 transition-transform duration-${transitionDuration} ease-in-out ${nextImgClass}`}
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-primary-white bg-opacity-75 rounded-full p-2 text-gray-700 hover:bg-opacity-90 focus:outline-none z-10"
                >
                  &lt;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-primary-white bg-opacity-75 rounded-full p-2 text-gray-700 hover:bg-opacity-90 focus:outline-none z-10"
                >
                  &gt;
                </button>
                <div className="absolute bottom-2 left-0 w-full flex justify-center items-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                        currentImageIndex === index
                          ? "bg-primary-yellow"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Images
          </div>
        )}
        <div className="absolute top-2 left-2 bg-primary-white bg-opacity-75 rounded-md px-2 py-1 text-xs font-medium text-gray-700">
          {hotel.location || "Location"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {hotel.name}
        </h3>
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <span className="text-yellow-500 mr-1">★</span>
          {hotel.rating} • {hotel.reviews} reviews
        </div>
        <p className="mt-2 text-gray-700 line-clamp-2">
          {hotel.description || "No description available."}
        </p>
      </div>
      <div className="px-4 pb-4">
        <CommonButton className={btnClass}>Book Now</CommonButton>
      </div>
    </div>
  );
};

export default HotelCard;
