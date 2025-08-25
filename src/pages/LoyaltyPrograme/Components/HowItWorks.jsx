import React from 'react';
import { Home, BarChart3, Gift } from 'lucide-react';

const HowItWorksSimple = () => {
  const steps = [
    {
      title: "Stay with Us",
      description: "Book your stay directly through our official website or contact numbers. Every night you stay counts towards your rewards.",
      icon: '/images/staywithus.svg',
      color: "text-green-600"
    },
    {
      title: "Track Your Nights",
      description: "We automatically track your completed nights within a 365-day period. You don't need to sign up again or carry a membership card.",
      icon: '/images/track.svg',
      color: "text-blue-600"
    },
    { 
      title: "Unlock Rewards",
      description: "Your loyalty starts paying off after just 5 nights. Unlock bigger benefits as you stay more.",
      icon: '/images/reward.svg',
      color: "text-purple-600"
    }
  ];

  return (
  <div className="bg-[#38B6B4]">
      <div className="py-16 px-6 text-white content mx-auto">
        <h2 className="text-mobile/h4 md:text-desktop/h3 font-bold mb-12 text-start">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-start md:items-center text-start bg-white/10 p-6 rounded-2xl"
            >
             
              <img src={step.icon} alt={step.title} className="w-20 h-20 mb-4" />
              <h3 className="font-semibold text-2xl">{step.title}</h3>
              <p className="text-sm opacity-90 mt-2 md:text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSimple;
