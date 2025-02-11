import { useState, useEffect } from 'react';
import Icon from '../../../Components/Icons';
import { CloseOutlined } from '@mui/icons-material';

const HotelIImageCarousel = () => {
    const images = [
        "/images/HotelsSectionImg/1.jpg",
        "/images/HotelsSectionImg/2.jpg",
        "/images/HotelsSectionImg/1.jpg",
        "/images/HotelsSectionImg/1.jpg",
        "/images/HotelsSectionImg/1.jpg",
        "/images/HotelsSectionImg/1.jpg",
        "/images/HotelsSectionImg/1.jpg",
        "/images/HotelsSectionImg/1.jpg"
    ];

    // State for carousel
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState('next');
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // New state for gallery modal visibility
    const [showGallery, setShowGallery] = useState(false);

    const slideDuration = 500;

    const nextSlide = () => {
        setDirection('next');
        setPrevIndex(currentIndex);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setDirection('prev');
        setPrevIndex(currentIndex);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (prevIndex !== null) {
            const timer = setTimeout(() => {
                setPrevIndex(null);
            }, slideDuration);
            return () => clearTimeout(timer);
        }
    }, [prevIndex]);

    const outgoingAnimationClass =
        direction === 'next' ? '-translate-x-full' : 'translate-x-full';

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

    // Prevent background scroll when the gallery modal is open
    useEffect(() => {
        if (showGallery) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showGallery]);

    return (
        <div className="relative w-full mx-auto">
            {/* Carousel Section */}
            <div
                className="overflow-hidden relative h-[80vh]"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div key={currentIndex} className="absolute inset-0">
                    <img
                        src={images[currentIndex]}
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
                            src={images[prevIndex]}
                            alt={`Slide ${prevIndex}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Carousel Navigation Buttons */}
            <button
                className="hidden md:block absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 rounded-full"
                onClick={prevSlide}
            >
                <Icon name="leftIcon" />
            </button>
            <button
                className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 rounded-full"
                onClick={nextSlide}
            >
                <Icon name="rightIcon" />
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-0 left-0 z-50 right-0 px-4 flex justify-center mb-8">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-28 rounded-full transition-all duration-500 ease-in-out h-[5px] mx-1 cursor-pointer ${index === currentIndex ? 'bg-[#FDC114] w-44' : 'bg-white'
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

            {/* View All Images Button */}
            <div className="absolute bottom-0 right-4 md:right-[16%] text-center mb-10">
                <button
                    className="text-white p-2 rounded underline transition-all duration-500 ease-in-out hover:text-[#FDC114]"
                    onClick={() => setShowGallery(true)}
                >
                    View All Images
                </button>
            </div>

            {/* Gallery Modal (Sliding Up Section) */}
            <div
                className={`fixed inset-0 bg-[#6EC4C2] flex justify-center items-start z-50 transition-transform duration-500 transform ${showGallery ? 'translate-y-0' : 'translate-y-full pointer-events-none'
                    }`}
            >
                {/* Close button positioned outside the white container */}
                <button
                    className="absolute top-4 right-4 text-white p-2  rounded"
                    onClick={() => setShowGallery(false)}
                >
                    <CloseOutlined style={{ height: "40px", width: "40px" }} />

                </button>
                <div className="bg-white hotelSelection overflow-y-auto py-10 w-full md:w-[1300px] h-full mt-16 rounded-t-[40px] px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Gallery image ${index}`}
                                className="w-full h-auto object-cover rounded-xl"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelIImageCarousel;
