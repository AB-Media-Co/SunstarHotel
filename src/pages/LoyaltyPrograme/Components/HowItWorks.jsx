import { useGetLoyaltyProgram } from '../../../ApiHooks/useLoyaltyProgramHook'; // adjust path if needed

const HowItWorksSimple = () => {
  const { data: program, isLoading, isError } = useGetLoyaltyProgram();

  // Local fallback (icons fixed)
  const fallbackSteps = [
    {
      title: 'Stay with Us',
      description:
        'Book your stay directly through our official website or contact numbers. Every night you stay counts towards your rewards.',
      icon: '/images/staywithus.svg',
    },
    {
      title: 'Track Your Nights',
      description:
        "We automatically track your completed nights within a 365-day period. You don't need to sign up again or carry a membership card.",
      icon: '/images/track.svg',
    },
    {
      title: 'Unlock Rewards',
      description:
        'Your loyalty starts paying off after just 5 nights. Unlock bigger benefits as you stay more.',
      icon: '/images/reward.svg',
    },
  ];

  // Use backend data if available; fallback otherwise
  const apiSteps =
    Array.isArray(program?.how_it_works) && program.how_it_works.length > 0
      ? program.how_it_works.map((item, index) => ({
          ...item,
          // force same local icons by index
          icon:
            index === 0
              ? '/images/staywithus.svg'
              : index === 1
              ? '/images/track.svg'
              : '/images/reward.svg',
        }))
      : fallbackSteps;

  if (isLoading) {
    return (
      <div className="bg-[#38B6B4] py-16 px-6 text-white content mx-auto text-center">
        <h2 className="text-mobile/h4 md:text-desktop/h3 font-bold mb-4">
          Loading How It Works...
        </h2>
        <p className="opacity-80 text-sm">Please wait while we fetch steps.</p>
      </div>
    );
  }

  if (isError) {
    // fallback silently with default steps
    console.warn('Failed to load how_it_works from API — using defaults.');
  }

  return (
    <div className="bg-[#38B6B4]">
      <div className="py-16 px-6 text-white content mx-auto">
        <h2 className="text-mobile/h4 md:text-desktop/h3 font-bold mb-12 text-start">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {apiSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-start md:items-center text-start bg-white/10 p-6 rounded-2xl"
            >
              <img
                src={step.icon}
                alt={step.title}
                className="w-20 h-20 mb-4"
                onError={(e) => {
                  e.currentTarget.src =
                    index === 0
                      ? '/images/staywithus.svg'
                      : index === 1
                      ? '/images/track.svg'
                      : '/images/reward.svg';
                }}
              />
              <h3 className="font-semibold text-2xl">{step.title}</h3>
              <p className="text-sm opacity-90 mt-2 md:text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSimple;
