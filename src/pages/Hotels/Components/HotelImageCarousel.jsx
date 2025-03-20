/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Icon from '../../../Components/Icons';
import { CloseOutlined } from '@mui/icons-material';

const HotelIImageCarousel = ({ data }) => {
  const carouselImages = data?.carouselImages || [];
  // Sections array from response data.
  const sections = data?.sections || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const slideDuration = 500;

  const nextSlide = () => {
    setDirection('next');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  useEffect(() => {
    if (prevIndex !== null) {
      const timer = setTimeout(() => {
        setPrevIndex(null);
      }, slideDuration);
      return () => clearTimeout(timer);
    }
  }, [prevIndex]);

  const outgoingAnimationClass = `${direction === 'next' ? '-translate-x-full' : 'translate-x-full'} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`;

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const threshold = 50;
    const diff = touchStart - touchEnd;
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Prevent background scroll when modal is open.
  useEffect(() => {
    document.body.style.overflow = showGallery ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showGallery]);

  return (
    <>

      <div className="relative w-full mx-auto">
        {/* Carousel Section */}
        <div
          className="overflow-hidden relative h-[80vh]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {carouselImages.length > 0 ? (
            <>
              <div key={currentIndex} className="absolute inset-0">
                <img
                  src={carouselImages[currentIndex]}
                  alt={`Slide ${currentIndex}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {prevIndex !== null && (
                <div
                  key={prevIndex}
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out transform ${outgoingAnimationClass}`}
                  style={{ zIndex: 10 }}
                >
                  <img
                    src={carouselImages[prevIndex]}
                    alt={`Slide ${prevIndex}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </>
          ) : ('')}
        </div>

        <button
          className="hidden md:block absolute top-1/2 left-0 transform -translate-y-1/2 text-primary-white p-2 rounded-full"
          onClick={prevSlide}
        >
          <Icon name="leftIcon" />
        </button>
        <button
          className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 text-primary-white p-2 rounded-full"
          onClick={nextSlide}
        >
          <Icon name="rightIcon" />
        </button>

        <div className="absolute bottom-0 left-0 z-10 right-0 px-4 flex justify-center mb-8">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className={`w-28 rounded-full transition-all duration-500 ease-in-out h-[5px] mx-1 cursor-pointer ${index === currentIndex ? 'bg-[#FDC114] w-44' : 'bg-primary-white'
                }`}
              onClick={() => {
                if (index !== currentIndex) {
                  setDirection(index > currentIndex ? 'next' : 'prev');
                  setPrevIndex(currentIndex);
                  setCurrentIndex(index);
                }
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-0 right-4 md:right-[16%] text-center mb-10">
          <button
            className="text-primary-white p-2 rounded underline transition-all duration-500 ease-in-out hover:text-[#FDC114]"
            onClick={() => setShowGallery(true)}
          >
            View All Images
          </button>
        </div>

        {/* Modal for viewing all images (sections) */}
        <div
          className={`fixed inset-0 bg-[#6EC4C2] flex justify-center items-start z-50 hotelSelection overflow-y-auto transition-transform duration-500 transform ${showGallery ? 'translate-y-0' : 'translate-y-full pointer-events-none'
            }`}
        >
          <button
            className="absolute top-4 right-4 text-primary-white p-2 rounded"
            onClick={() => setShowGallery(false)}
          >
            <CloseOutlined style={{ height: "40px", width: "40px" }} />
          </button>
          <div className="bg-primary-white mt-16  py-10 md:rounded-t-2xl w-full md:w-[1300px]   ">
            {sections.length > 0 ? (
              sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-10  bg-primary-white px-4 md:px-8">
                  <h2 className="text-mobile/h3 md:text-desktop/h3  font-bold mb-10 text-primary-dark-green">{section.heading}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {section.images.map((src, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={src}
                        alt={`Section ${section.heading} - image ${imgIndex}`}
                        className="w-full max-h-[125px]  md:max-h-[162px]  object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 italic">No section images available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelIImageCarousel;
