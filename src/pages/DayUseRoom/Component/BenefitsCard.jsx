/* eslint-disable react/prop-types */
const BenefitsCard = ({ benefits}) => {
  // fixed custom icons (order matters)
  const icons = [
    "/images/DayUseRoom/Couple.svg",
    "/images/DayUseRoom/Id.svg",
    "/images/DayUseRoom/CleanL.svg",
    "/images/DayUseRoom/staff.svg",
    "/images/DayUseRoom/6hrsStay.svg",
    "/images/DayUseRoom/PayAtHotel.svg",
  ];

  return (
    <section className="py-12">
      <h2 className="content text-mobile/h3 md:text-desktop/h3 font-bold text-start">Benefits</h2>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 content">
        {benefits.map((b, idx) => {
          const icon = icons[idx % icons.length]; // index-based, cycles if more
          return (
            <div
              key={b._id || idx}
              className="bg-primary-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300"
            >
              <img src={icon} alt="" className="w-[80px] h-[80px] mb-4" />
              <p className="text-lg text-center font-semibold text-[#058FA2]">
                {b.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BenefitsCard;
