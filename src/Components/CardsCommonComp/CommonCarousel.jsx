/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import Icon from '../Icons';

function Carousel({
    features,
    height = 'h-[600px]',
    buttonColor = '#FDC114',
    iconSize = 'h-6 w-6',
    className = '',
    NavClass = '',
    autoPlay = false,
    autoPlayInterval = 3000,
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false); // Track hover status
    const [startX, setStartX] = useState(0); // Track the starting point of drag/swipe
    const [isDragging, setIsDragging] = useState(false); // Whether dragging is in progress
    const carouselRef = useRef(null); // Reference for the carousel container

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
                        <div key={index} className="w-full flex-shrink-0">
                            <img
                                src={feature.icon}
                                alt={`Slide ${index + 1}`}
                                className={`w-full ${height} object-cover`}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className={`absolute top-1/2 ${className} left-0 transform -translate-y-1/2 bg-[${buttonColor}] text-white p-2 rounded-full`}
                    onClick={handlePrevious}
                >
                    <Icon name="leftIcon" className={iconSize} />
                </button>
                <button
                    className={`absolute top-1/2 ${className} right-0 transform -translate-y-1/2 bg-[${buttonColor}] text-white p-2 rounded-full`}
                    onClick={handleNext}
                >
                    <Icon name="rightIcon" className={iconSize} />
                </button>
            </div>

            <div
                className={`absolute bottom-[10rem] left-1/2 transform md:-translate-x-1/2 flex justify-center ${NavClass}`}
            >
                {features.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full transition-all duration-500 ease-in-out ${
                            currentIndex === index
                                ? `bg-[${buttonColor}] w-[40px]`
                                : 'bg-white'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
