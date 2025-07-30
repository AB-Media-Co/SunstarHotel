import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePricing } from '../../../Context/PricingContext';

const InTheMediaPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const { setIsNavColor } = usePricing()

  useEffect(() => {
    setIsNavColor(true);
    return () => {
      setIsNavColor(false);
    };
  }, [setIsNavColor]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample media data
  const mediaItems = [
    {
      id: 1,
      title: "Winner of Hotel Of The Year",
      description: "Presented to Mr. Tom Welbury, Bloom's Chief Product Officer, at the Hospitality Leaders Awards 2019.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Hotel award ceremony"
    },
    {
      id: 2,
      title: "Best Innovation Award",
      description: "Recognized for outstanding technological advancement in hospitality management systems at Tech Summit 2020.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Innovation award ceremony"
    },
    {
      id: 3,
      title: "Industry Excellence Recognition",
      description: "Honored for exceptional service quality and customer satisfaction at the Annual Hospitality Excellence Awards 2021.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Excellence award ceremony"
    },
    {
      id: 4,
      title: "Customer Service Excellence",
      description: "Awarded for outstanding customer service and satisfaction rates achieving 98% positive feedback in 2022.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Customer service award"
    },
    {
      id: 5,
      title: "Digital Transformation Leader",
      description: "Recognized as a pioneer in digital transformation within the hospitality industry at the Global Tech Awards 2023.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Digital transformation award"
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse drag handlers for laptop trackpad
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    const distance = dragStart - e.clientX;
    const isLeftDrag = distance > 50;
    const isRightDrag = distance < -50;

    if (isLeftDrag) {
      nextSlide();
    } else if (isRightDrag) {
      prevSlide();
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Wheel event for trackpad scrolling
  const handleWheel = (e) => {
    e.preventDefault();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Horizontal scroll detected
      if (e.deltaX > 30) {
        nextSlide();
      } else if (e.deltaX < -30) {
        prevSlide();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="w-full  mt-24 content">
      {/* Header */}
      <div className="bg-white">

        <h1 className=" text-primary-green text-center lg:text-left text-mobile/h1 md:text-desktop/h2">
          In the Media
        </h1>
      </div>

      {/* Carousel Container */}
      <div className="py-12">
        <div
          className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className={`flex flex-col lg:flex-row transition-all duration-300 ${isTransitioning ? 'opacity-90' : 'opacity-100'}`}>
            {/* Left Content Section */}
            <div className="w-full lg:w-1/2 bg-primary-green p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
              {/* Previous Button - Hidden on small screens, shown on large */}
              <button
                onClick={prevSlide}
                className="hidden lg:block absolute left-4 xl:left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 xl:p-3 transition-all duration-200 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6 text-white" />
              </button>

              <div className="max-w-md mx-auto lg:mx-0 lg:max-w-lg xl:max-w-xl">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight text-center lg:text-left">
                  {mediaItems[currentSlide].title}
                </h2>
                <p className="text-white text-base sm:text-lg xl:text-xl leading-relaxed opacity-90 text-center lg:text-left">
                  {mediaItems[currentSlide].description}
                </p>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="w-full lg:w-1/2 relative overflow-hidden">
              <div className="h-64 sm:h-80 lg:h-full lg:min-h-[400px]">
                <img
                  src={mediaItems[currentSlide].image}
                  alt={mediaItems[currentSlide].alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Next Button - Hidden on small screens, shown on large */}
              <button
                onClick={nextSlide}
                className="hidden lg:block absolute right-4 xl:right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 xl:p-3 transition-all duration-200 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="lg:hidden">
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-90 rounded-full p-2 sm:p-3 transition-all duration-200 z-20 shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-90 rounded-full p-2 sm:p-3 transition-all duration-200 z-20 shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-primary-green scale-110 w-16 sm:w-20 lg:w-24'
                  : 'bg-gray-300 hover:bg-gray-400 w-12 sm:w-16 lg:w-20'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default InTheMediaPage;