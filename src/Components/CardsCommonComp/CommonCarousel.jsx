/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import Icon from '../Icons';

function Carousel({
    features,
    height = 'h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]',
    buttonColor = '#FDC114',
    iconSize = 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6',
    className = '',
    NavClass = 'bottom-4 sm:bottom-8 md:bottom-16 lg:bottom-[10rem]',
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
            handleNext();
            setIsDragging(false);
        } else if (difference < -50) {
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                            
                            {/* View All button - responsive overlay */}
                            {viewAll && index === features.length - 1 && (
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8">
                                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center">
                                        Like what you see?
                                    </h2>
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-center max-w-md">
                                        Take a look at our entire gallery for<br className="hidden sm:block"/>
                                        more images of this Bloom
                                    </p>
                                    <button 
                                        onClick={() => setShowImageGallery(true)}
                                        className="bg-yellow-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-yellow-500 transition-colors"
                                    >
                                        View All Images
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Navigation buttons - responsive positioning and sizing */}
                {features.length > 1 && (
                    <>
                        <button
                            className={`absolute top-1/2 ${className} left-2 sm:left-4 md:left-8 lg:left-20 transform -translate-y-1/2 bg-white text-primary-white p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200`}
                            style={{ backgroundColor: buttonColor }}
                            onClick={handlePrevious}
                        >
                            <Icon name="leftIcon" className={iconSize} />
                        </button>
                        <button
                            className={`absolute top-1/2 ${className} right-2 sm:right-4 md:right-8 lg:right-20 transform -translate-y-1/2 bg-white text-primary-white p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200`}
                            style={{ backgroundColor: buttonColor }}
                            onClick={handleNext}
                        >
                            <Icon name="rightIcon" className={iconSize} />
                        </button>
                    </>
                )}
            </div>

            {/* Responsive navigation dots */}
            <div className={`absolute transform flex justify-center ${NavClass} px-4`}>
                {features.map((_, index) => (
                    <button
                        key={index}
                        className={`h-1 sm:h-1.5 mx-1 sm:mx-1 rounded-full transition-all duration-500 ease-in-out ${
                            currentIndex === index
                                ? `bg-white w-8 sm:w-12 md:w-16 lg:w-20`
                                : 'bg-primary-white w-8 sm:w-6 md:w-8 lg:w-10'
                        }`}
                        style={{ backgroundColor: currentIndex === index ? buttonColor : '' }}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Carousel;
