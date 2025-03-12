/* eslint-disable react/prop-types */
import HotelCard from "../../../Components/CardsCommonComp/HotelCardLayout";

const SunstarBrandsSection = ({ hotels }) => {
  // Determine the number of columns for large screens
  const getLargeGridColsClass = () => {
    if (hotels && hotels.length === 4) return "lg:grid-cols-4";
    if (hotels && hotels.length === 3) return "lg:grid-cols-3";
    if (hotels && hotels.length === 2) return "lg:grid-cols-2";
    return "lg:grid-cols-1";
  };

  return (
    <section className="py-12 content">
      <div className="mb-10">
        <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-gray-900 mb-2 text-reveal-animation">
          Sunstar Brands
        </h2>
        <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-700 font-semibold animation-on-scroll">
          Revolutionizing the mid-market hotel space, one hotel at a time.
        </p>
      </div>

      <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${getLargeGridColsClass()}`}>
        {hotels?.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </section>
  );
};

export default SunstarBrandsSection;
