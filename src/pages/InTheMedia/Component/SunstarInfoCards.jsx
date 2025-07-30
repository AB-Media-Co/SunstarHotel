import React from 'react';
import { FileText, Star, Building, User, Monitor, Sun, Phone } from 'lucide-react';

const SunstarInfoCards = () => {
  const infoCards = [
    {
      id: 1,
      title: "For the Press",
      description: "Access everything you need to pen down an amazing article.",
      buttonText: "Get the scoop",
      icon: <FileText className="w-8 h-8 text-primary-green" />,
      illustration: (
        <div className="relative w-full h-32 flex items-center justify-center">
          {/* Press badge/card illustration */}
          <div className="relative">
            <div className="w-20 h-12 bg-white border-2 border-gray-300 rounded transform rotate-12 shadow-sm">
              <div className="p-1">
                <div className="w-3 h-3 bg-primary-green rounded-full mb-1"></div>
                <div className="w-12 h-1 bg-gray-300 rounded mb-1"></div>
                <div className="w-8 h-1 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="absolute -top-2 -left-2 w-16 h-10 bg-white border-2 border-gray-300 rounded transform -rotate-6 shadow-sm">
              <div className="p-1">
                <div className="text-xs font-bold text-primary-green transform rotate-6">PRESS</div>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Why Sunstar?",
      description: "Hear all about our story & see what makes us so special.",
      buttonText: "Check us out",
      icon: <Star className="w-8 h-8 text-primary-green" />,
      illustration: (
        <div className="relative w-full h-32 flex items-center justify-center">
          {/* Monitor with star illustration */}
          <div className="relative">
            <div className="w-24 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-sm">
              <div className="p-2">
                <div className="w-4 h-4 bg-primary-green rounded-full mb-2 mx-auto"></div>
                <div className="w-16 h-1 bg-gray-300 rounded mb-1"></div>
                <div className="w-12 h-1 bg-gray-300 rounded mx-auto"></div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-primary-green rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-primary-green fill-current" />
            </div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-3 bg-primary-green rounded-full"></div>
              <div className="w-1 h-1 bg-primary-green rounded-full mx-auto mt-1"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Developers & Owners",
      description: "We're growing rapidly across the country, don't miss out.",
      buttonText: "Partner with us",
      icon: <Building className="w-8 h-8 text-primary-green" />,
      illustration: (
        <div className="relative w-full h-32 flex items-center justify-center">
          {/* Building/development illustration */}
          <div className="relative">
            <div className="w-20 h-20 bg-white border-2 border-gray-300 rounded-lg shadow-sm">
              <div className="p-2">
                <div className="w-8 h-8 bg-primary-green rounded mx-auto mb-1 flex items-center justify-center">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1">
              <Sun className="w-6 h-6 text-primary-green" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-4 h-6 bg-white border-2 border-gray-300 rounded shadow-sm"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="content">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {infoCards.map((card) => (
            <div key={card.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-primary-green mb-3 sm:mb-4">
                {card.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-grow">
                {card.description}
              </p>
              
              {/* Illustration */}
              <div className="mb-6 sm:mb-8">
                {card.illustration}
              </div>
              
              {/* Button */}
              <button className="text-gray-400 text-sm hover:text-primary-green transition-colors duration-200 text-left font-medium">
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SunstarInfoCards;