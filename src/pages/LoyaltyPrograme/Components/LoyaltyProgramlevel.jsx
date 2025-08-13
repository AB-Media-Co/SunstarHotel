import React from 'react';
import { Shield, Gift, Lock } from 'lucide-react';

const LoyaltyProgramlevel = () => {
  const levels = [
    {
      id: 1,
      title: "Smart Traveller",
      requirement: "Complete 5 nights in 365 days",
      discount: "5% discount on future bookings",
      unlockText: "Offers unlock after completing 5 nights.",
      bgColor: "bg-white",
    },
    {
      id: 2,
      title: "Frequent Explorer",
      requirement: "Complete 10 nights in 365 days",
      discount: "10% discount on all bookings",
      unlockText: "Offers unlock after completing 10 nights.",
      bgColor: "bg-white",
    },
    {
      id: 3,
      title: "Elite Guest",
      requirement: "Complete 20 nights in 365 days",
      discount: "15% discount on all bookings",
      unlockText: "Offers unlock after completing 20 nights.",
      bgColor: "bg-white",
    }
  ];

  return (
    <div className="content mx-auto p-6 flex flex-col gap-8">

      <div className="space-y-6 mt-10">
        <h1 className="text-4xl font-bold text-primary-green leading-tight">
          Become a Loyal Sunstar Guest

        </h1>

        <p className="text-gray-600 text-lg leading-relaxed ">
          A rewarding loyalty program built for our most valued guests — like you, who choose comfort, consistency, and care with every stay.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`$ border-2 border-gray-100 rounded-lg p-6 space-y-4 transition-all hover:shadow-lg`}
          >
            {/* Level Badge */}
            <div className="flex items-center w-[100px] gap-2 text-sm bg-gray-100 text-primary-gray px-4  py-2 rounded-full">
              <Lock className="w-4 h-4" />
              <span>Level {level.id}</span>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className="text-mobile/h3  font-bold text-gray-800">
                {level.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{level.requirement}</p>
            </div>

            <div className="space-y-3 bg-gray-50 py-8 rounded-lg  pt-4 text-center w-full">
              <p className="text-desktop/h5 text-primary-gray text-center">
                {level.discount}
              </p>
              <p className=" text-center text-sm text-primary-gray italic">
                {level.unlockText}
              </p>
            </div>



          </div>
        ))}
      </div>
    </div>
  );
};

export default LoyaltyProgramlevel;
