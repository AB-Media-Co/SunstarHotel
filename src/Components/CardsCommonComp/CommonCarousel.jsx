/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Icon from '../Icons';

function Carousel({ features, height = 'h-[600px]', buttonColor = '#FDC114', iconSize = 'h-6 w-6', className = '', NavClass='', autoPlay = false, autoPlayInterval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

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
        if (autoPlay) {
            const intervalId = setInterval(() => {
                handleNext();
            }, autoPlayInterval);

            // Cleanup function to clear interval when component unmounts
            return () => clearInterval(intervalId);
        }
    }, [currentIndex, autoPlay, autoPlayInterval]);

    return (
        <div className="flex flex-col items-center bg-gray-100 w-full">
            <div className="relative w-full overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {features.map((feature, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <img src={feature.icon} alt={`Slide ${index + 1}`} className={`w-full ${height} object-cover`} />
                        </div>
                    ))}
                </div>

                <button
                    className={`absolute top-1/2 ${className} left-0 transform -translate-y-1/2 bg-[${buttonColor}] text-white p-2 rounded-full ${currentIndex === 0 ? 'hidden' : ''}`}
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

            <div className={`absolute bottom-[10rem]  left-1/2 transform -translate-x-1/2 flex justify-center ${NavClass}`}>
                {features.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full transition-all duration-500 ease-in-out ${currentIndex === index ? `bg-[${buttonColor}] w-[40px]` : 'bg-white'}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
