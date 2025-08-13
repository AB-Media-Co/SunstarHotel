const steps = [
  {
    id: 1,
    icon: "/images/othericons/handshake.svg",
    title: "Apply for Partnership",
    description: "Fill out a quick form, & our team will evaluate your property.",
  },
  {
    id: 2,
    icon: "/images/othericons/aggrement.svg",
    title: "Sign Agreement",
    description: "We finalize terms and onboarding.",
  },
  {
    id: 3,
    icon: "/images/othericons/setup.svg",
    title: "Rebranding & Setup",
    description: "Rapid property transformation for optimal revenue.",
  },
  {
    id: 4,
    icon: "/images/othericons/launchearn.svg",
    title: "Launch & Earn",
    description: "We take full control while you start earning.",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-[#38B6B4]">
      <div className="py-16 px-6 text-white max-w-screen-xl mx-auto">
        <h2 className="text-mobile/h4 md:text-desktop/h3 font-bold mb-12 text-center">
          How It Works <span className="font-normal">(Simplified Process For Owners)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center bg-white/10 p-6 rounded-2xl"
            >
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold mb-4">
                {step.id}
              </div>
              <img src={step.icon} alt={step.title} className="w-20 h-20 mb-4" />
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-sm opacity-90 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
