/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import Icon from '../Icons';

function Carousel({
    features,
    height = 'h-[600px]',
    buttonColor = '#FDC114',
    iconSize = 'h-6 w-6',
    className = '',
    NavClass = 'bottom-[10rem]',
    autoPlay = false,
    autoPlayInterval = 3000,
    viewAll = false,
    setShowImageGallery = () => {},
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const carouselRef = useRef(null);

    const handlePrevious = () => {
        const newIndex = currentIndex === 0 ? features.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = currentIndex === features.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Auto-play functionality
    useEffect(() => {
        if (autoPlay && !isHovered) {
            const intervalId = setInterval(() => {
                handleNext();
            }, autoPlayInterval);

            // Cleanup interval on unmount or hover
            return () => clearInterval(intervalId);
        }
    }, [currentIndex, autoPlay, autoPlayInterval, isHovered]);

    // Handle drag/swipe start
    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    };

    // Handle drag/swipe move
    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const difference = startX - currentX;

        if (difference > 50) {
            // Swiped left
            handleNext();
            setIsDragging(false);
        } else if (difference < -50) {
            // Swiped right
            handlePrevious();
            setIsDragging(false);
        }
    };

    // Handle drag/swipe end
    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="flex flex-col items-center bg-gray-100 w-full"
            onMouseEnter={() => setIsHovered(true)} // Stop auto-scroll on hover
            onMouseLeave={() => setIsHovered(false)} // Resume auto-scroll when hover ends
        >
            <div
                className="relative w-full overflow-hidden"
                ref={carouselRef}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {features.map((feature, index) => (
                        <div key={index} className="w-full flex-shrink-0 relative">
                            <img
                                src={feature}
                                alt={`Slide ${index + 1}`}
                                className={`w-full ${height} object-cover`}
                            />
                            
                            {/* View All button - only show on the last image when viewAll prop is true */}
                            {viewAll && index === features.length - 1 && (
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
                                    <h2 className="text-4xl font-bold mb-2">Like what you see?</h2>
                                    <p className="text-xl mb-6">Take a look at our entire gallery for<br/>more images of this Bloom</p>
                                    <button 
                                        onClick={() => setShowImageGallery(true)}
                                        className="bg-yellow-400 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-yellow-500 transition-colors"
                                    >
                                        View All Images
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {features.length > 1 && (
                    <>
                        <button
                            className={`absolute top-1/2 ${className} left-0 md:left-20 transform -translate-y-1/2 bg-white text-primary-white p-2 rounded-full`}
                            style={{ backgroundColor: buttonColor }}
                            onClick={handlePrevious}
                        >
                            <Icon name="leftIcon" className={iconSize} />
                        </button>
                        <button
                            className={`absolute top-1/2 ${className} right-0 md:right-20 transform -translate-y-1/2 bg-white text-primary-white p-2 rounded-full`}
                            style={{ backgroundColor: buttonColor }}
                            onClick={handleNext}
                        >
                            <Icon name="rightIcon" className={iconSize} />
                        </button>
                    </>
                )}

            </div>

            <div
                className={`absolute transform flex justify-center ${NavClass}`}
            >
                {features.map((_, index) => (
                    <button
                        key={index}
                        className={`w-10 h-1.5 mx-1 rounded-full transition-all duration-500 ease-in-out ${
                            currentIndex === index
                                ? `bg-white w-20`
                                : 'bg-primary-white'
                        }`}
                        style={{ backgroundColor: currentIndex === index ? buttonColor : '' }}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;