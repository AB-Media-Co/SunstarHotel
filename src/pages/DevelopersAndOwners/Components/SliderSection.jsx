import { useState, useEffect } from "react";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Fixed size container */}
      <div className="absolute w-full h-full">
        {/* Only show current slide */}
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
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md w-5/6 md:w-3/5 p-6 z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-primary-green">
              {slides[currentIndex].title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              {slides[currentIndex].subtitle}
            </p>
          </div>
          <span className="text-gray-500 text-sm mt-3 md:mt-0">
            {slides[currentIndex].years}
          </span>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center mt-4 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 ease-in-out h-2 mx-1 cursor-pointer rounded-full ${
                index === currentIndex ? "bg-yellow-400 w-20" : "bg-gray-300 w-10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;