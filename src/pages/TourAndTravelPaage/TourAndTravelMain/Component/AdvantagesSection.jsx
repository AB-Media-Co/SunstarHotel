
const features = [
  {
    icon: '/images/TourAndTravel/clock.svg',
    title: "Save Time",
    desc: "No More Switching For Packages Or Plans.",
  },
  {
    icon: '/images/TourAndTravel/savemoney.svg',
    title: "Save Money",
    desc: "Compare, Negotiate, And Choose The Best.",
  },
  {
    icon: '/images/TourAndTravel/network.svg',
    title: "Trusted Network",
    desc: "A Trusted Network Of Travel Agents",
  },
  {
    icon: '/images/TourAndTravel/multipleoption.svg',
    title: "Multiple Options",
    desc: "Itineraries & Travel Tips From Trusted Agents",
  },
];

const AdvantagesSection = () => {
  return (
    <section className="bg-primary-green py-16 text-center text-white">
      <div className="content mx-auto ">
        <h2 className="text-mobile/h3 md:text-desktop/h3 text-white mb-2">
          Our Advantages
        </h2>
        <p className="text-sm md:text-base text-white mb-10 max-w-xl mx-auto">
          You can rely on our experience and the quality of services we provide. Here are other reasons to book tours at Treat Holidays.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className=" bg-white rounded-full p-8 flex items-center justify-center mb-4 shadow-md">
              <img src={feature?.icon} alt="" className="w-20 h-20" />
                
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-md text-white">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
