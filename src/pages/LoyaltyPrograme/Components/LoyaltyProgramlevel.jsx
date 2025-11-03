import React from 'react';
import { Lock } from 'lucide-react';
import { useGetLoyaltyProgram } from '../../../ApiHooks/useLoyaltyProgramHook'; // adjust path if needed

const LoyaltyProgramlevel = () => {
  const { data: program, isLoading, isError } = useGetLoyaltyProgram();

  // fallback defaults (in case API fails or no data)
  const fallbackGuest = {
    heading: 'Become a Loyal Sunstar Guest',
    description:
      'A rewarding loyalty program built for our most valued guests — like you, who choose comfort, consistency, and care with every stay.',
  };

  const fallbackTiers = [
    {
      level: 1,
      name: 'Smart Traveller',
      requirement_text: 'Complete 5 nights in 365 days',
      benefit_text: '5% discount on future bookings',
      unlock_after_nights: 5,
    },
    {
      level: 2,
      name: 'Frequent Explorer',
      requirement_text: 'Complete 10 nights in 365 days',
      benefit_text: '10% discount on all bookings',
      unlock_after_nights: 10,
    },
    {
      level: 3,
      name: 'Elite Guest',
      requirement_text: 'Complete 20 nights in 365 days',
      benefit_text: '15% discount on all bookings',
      unlock_after_nights: 20,
    },
  ];

  const loyalGuest = program?.loyal_guest ?? fallbackGuest;
  const tiers = Array.isArray(program?.tiers) && program.tiers.length > 0 ? program.tiers : fallbackTiers;

  if (isLoading) {
    return (
      <div className="content mx-auto p-6 flex flex-col gap-8">
        <div className="space-y-6 mt-10 text-center">
          <h1 className="text-2xl font-bold text-primary-green">Loading Loyalty Program...</h1>
          <p className="text-gray-500 text-sm">Please wait while we fetch program details.</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="content mx-auto p-6 flex flex-col gap-8">
        <div className="space-y-6 mt-10 text-center">
          <h1 className="text-2xl font-bold text-red-600">Failed to load Loyalty Program</h1>
          <p className="text-gray-500 text-sm">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content mx-auto p-6 flex flex-col gap-8">
      {/* Header Section */}
      <div className="space-y-6 mt-10">
        <h1 className="text-4xl font-bold text-primary-green leading-tight">
          {loyalGuest.heading}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {loyalGuest.description}
        </p>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((level, idx) => (
          <div
            key={level.level || idx}
            className={`border-2 border-gray-100 rounded-lg p-6 space-y-4 transition-all hover:shadow-lg bg-white`}
          >
            {/* Level Badge */}
            <div className="flex items-center w-[120px] gap-2 text-sm bg-gray-100 text-primary-gray px-4 py-2 rounded-full">
              <Lock className="w-4 h-4" />
              <span>Level {level.level}</span>
            </div>

            {/* Tier Title + Requirement */}
            <div className="flex flex-col gap-2">
              <h3 className="text-mobile/h3 font-bold text-gray-800">
                {level.name}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {level.requirement_text}
              </p>
            </div>

            {/* Tier Benefits */}
            <div className="space-y-3 bg-gray-50 py-8 rounded-lg pt-4 text-center w-full">
              <p className="text-desktop/h5 text-primary-gray text-center">
                {level.benefit_text}
              </p>
              <p className="text-center text-sm text-primary-gray italic">
                Offers unlock after completing {level.unlock_after_nights} nights.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoyaltyProgramlevel;
