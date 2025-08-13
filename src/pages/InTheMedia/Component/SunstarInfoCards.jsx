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
      illustration: "/images/forthepress.svg"

    },
    {
      id: 2,
      title: "Why Sunstar?",
      description: "Hear all about our story & see what makes us so special.",
      buttonText: "Check us out",
      icon: <Star className="w-8 h-8 text-primary-green" />,
      illustration: "/images/whysunsar.svg"

    },
    {
      id: 3,
      title: "Developers & Owners",
      description: "We're growing rapidly across the country, don't miss out.",
      buttonText: "Partner with us",
      icon: <Building className="w-8 h-8 text-primary-green" />,
      illustration: "/images/dev.svg"

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
                <img src={card.illustration} alt={card.title} className="w-full h-24 sm:h-64 object-contain" />

              </div>


            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SunstarInfoCards;