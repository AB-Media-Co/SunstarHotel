/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useMemo } from 'react';
import Icon from '../../../Components/Icons';
import { ArrowBackIosNew, CloseOutlined } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, View } from 'lucide-react';

const HotelImageCarousel = ({ data }) => {
  const carouselImages = data?.carouselImages;
  const sections = data?.sections || [];
  console.log(sections)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const slideDuration = 500;

  // Check if current image is the last one
  const isLastImage = currentIndex === carouselImages.length - 1;

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      carouselImages.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded(prev => ({ ...prev, [index]: true }));
        };
      });
    };

    if (carouselImages.length > 0) {
      preloadImages();
    }
  }, [carouselImages]);

  const nextSlide = useCallback(() => {
    setDirection('next');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  }, [currentIndex, carouselImages.length]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, [currentIndex, carouselImages.length]);

  useEffect(() => {
    if (prevIndex !== null) {
      const timer = setTimeout(() => {
        setPrevIndex(null);
      }, slideDuration);
      return () => clearTimeout(timer);
    }
  }, [prevIndex, slideDuration]);

  const outgoingAnimationClass = useMemo(() =>
    `${direction === 'next' ? '-translate-x-full' : 'translate-x-full'} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`,
    [direction]
  );

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
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
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showGallery ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showGallery]);

  // Load indicator placeholder
  const LoadingPlaceholder = () => (
    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
      <span className="text-gray-500">Loading...</span>
    </div>
  );

  // Lazy load section images
  const SectionImage = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className="relative w-full h-full cursor-pointer" onClick={() => setFullScreenImage(src)}>
        {!loaded && <LoadingPlaceholder />}
        <img
          src={src}
          alt={alt}
          className={`w-full max-h-[125px] md:max-h-[162px] object-cover rounded-xl ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <>
      <div className="relative w-full mx-auto">
        {/* Carousel Section */}
        <div
          className="overflow-hidden relative h-[40vh] md:h-[80vh]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {carouselImages.length > 0 ? (
            <>
              <div key={currentIndex} className="absolute inset-0">
                {!imagesLoaded[currentIndex] && <LoadingPlaceholder />}
                <img
                  src={carouselImages[currentIndex]}
                  alt={`Slide ${currentIndex}`}
                  className={`w-full h-full object-cover ${imagesLoaded[currentIndex] ? 'opacity-100' : 'opacity-0'}`}
                />
                
                {/* View All Button Overlay on Last Image */}
                {isLastImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                  >
                    <motion.button
                      className="bg-primary-yellow hover:bg-yellow-500 flex items-center gap-3 shadow-2xl rounded-full px-6 py-3 md:px-8 md:py-4 text-white font-bold text-lg md:text-xl transition-all duration-300"
                      onClick={() => setShowGallery(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-5 h-5 md:w-6 md:h-6" />
                      <span>View All Photos</span>
                    </motion.button>
                    
                    {/* Optional: Show total count */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                      +{sections.reduce((total, section) => total + section.images.length, 0)} more photos
                    </div>
                  </motion.div>
                )}
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
          ) : (
            <LoadingPlaceholder />
          )}
        </div>

        {/* Navigation buttons */}
        <button
          className="hidden md:block absolute top-1/2 left-0 md:left-20 transform bg-primary-yellow -translate-y-1/2 text-primary-white p-2 rounded-full hover:bg-yellow-500 transition-colors"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <Icon name="leftIcon" />
        </button>
        <button
          className="hidden md:block absolute top-1/2 right-0 md:right-20 transform bg-primary-yellow -translate-y-1/2 text-primary-white p-2 rounded-full hover:bg-yellow-500 transition-colors"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <Icon name="rightIcon" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-0 left-0 z-10 right-0 px-4 flex justify-center mb-4 md:mb-8">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className={`w-28 rounded-full transition-all duration-500 ease-in-out h-[5px] mx-1 cursor-pointer ${
                index === currentIndex ? 'bg-[#FDC114] w-44' : 'bg-primary-white'
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

        {/* Original View All Button (Bottom Right) */}
        <div className="absolute bottom-7 md:bottom-10 right-0 md:right-20 text-center mb-0 md:mb-6">
          <button
            className="bg-primary-yellow hover:bg-yellow-500 flex gap-2 shadow-2xl rounded-full px-4 py-2 text-white font-bold transition-colors"
            onClick={() => setShowGallery(true)}
          >
            <Eye />
            View All
          </button>
        </div>

        {/* Modal for viewing all images (sections) */}
        <div
          className={`fixed inset-0 bg-[#6EC4C2] flex justify-center items-start z-50 hotelSelection overflow-y-auto transition-transform duration-500 transform ${
            showGallery ? 'translate-y-0' : 'translate-y-full pointer-events-none'
          }`}
        >
          <div className='flex flex-col'>
            <div
              className=" my-6 md:my-10  flex  items-center cursor-pointer text-primary-white   rounded"
              onClick={() => setShowGallery(false)}
              aria-label="Close gallery"
            >
              <ArrowBackIosNew style={{ height: "30px", width: "30px", marginTop: "5px" }} /> 
              <span className='text-4xl font-bold'>Sunstar Hotels</span>
            </div>
            <div className="bg-primary-white  py-10 md:rounded-t-2xl w-full md:w-[1300px]">
              {sections.length > 0 ? (
                sections.map((section, sectionIndex) => (
                  section.images.length > 0 && (
                    <div key={sectionIndex} className="mb-10 bg-primary-white px-4 md:px-8">
                      <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold mb-10 text-primary-dark-green">
                        {section.heading}
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {section.images.map((src, imgIndex) => (
                          <SectionImage
                            key={imgIndex}
                            src={src}
                            alt={`Section ${section.heading} - image ${imgIndex}`}
                          />
                        ))}
                      </div>
                    </div>
                  )
                ))
              ) : (
                <p className="text-gray-600 italic">No section images available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {fullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[60] flex items-center justify-center"
          >
            <motion.button
              className="absolute top-4 right-4 text-white p-2 rounded hover:text-[#FDC114] transition-colors"
              onClick={() => setFullScreenImage(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <CloseOutlined style={{ height: "40px", width: "40px" }} />
            </motion.button>
            <motion.img
              src={fullScreenImage}
              alt="Full screen view"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HotelImageCarousel;
