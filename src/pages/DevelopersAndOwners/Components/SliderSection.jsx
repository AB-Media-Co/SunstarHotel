import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderSection = () => {
  const slides = [
    {
      url: "/images/Dev&Owwners/1.jpg",
      alt: "Image 1",
      title: "Sunstar @ Suncourt Hospitality",
      subtitle: "Secure a guaranteed base-level income with additional performance-based bonuses.",
      years: "Completed 20 Years",
    },
    {
      url: "/images/Dev&Owwners/2.jpg",
      alt: "Image 2",
      title: "Oceanview @ Blue Lagoon",
      subtitle: "Relax in luxury with waterfront views and top-tier amenities.",
      years: "Completed 10 Years",
    },
    {
      url: "/images/Dev&Owwners/3.jpg",
      alt: "Image 3",
      title: "Green Hills @ Eco Stay",
      subtitle: "An eco-friendly stay for nature lovers and adventure seekers.",
      years: "Completed 5 Years",
    },
    {
      url: "/images/Dev&Owwners/4.webp",
      alt: "Image 4",
      title: "MetroLife @ Urban Suites",
      subtitle: "Experience city life with high-end urban accommodations.",
      years: "Completed 15 Years",
    },
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;
  const sliderRef = useRef(null);
  
  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Touch event handlers for swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full  h-[600px] overflow-hidden rounded-lg shadow-lg"
      ref={sliderRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      aria-label="Image slider"
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img 
            src={slide.url} 
            alt={slide.alt} 
            className="w-full h-full object-cover"
          />
          
          {/* Content Overlay */}
          <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md w-5/6 md:w-3/5 p-4 md:p-6 z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-green-600">
                  {slide.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  {slide.subtitle}
                </p>
              </div>
              <span className="text-gray-500 text-sm mt-3 md:mt-0">
                {slide.years}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md z-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md z-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
      </button> */}

      {/* Dots/Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ease-in-out h-2 mx-1 cursor-pointer rounded-full ${
              index === currentIndex ? "bg-yellow-400 w-12 md:w-20" : "bg-gray-300 w-6 md:w-10"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderSection;