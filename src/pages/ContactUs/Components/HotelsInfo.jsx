/* eslint-disable react/prop-types */
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

const HotelsInfo = ({hotels}) => {
  useTextRevealAnimation();
  useScrollAnimations();
    return (
      <div className="bg-gray-50 py-10">
        <div className="content mx-auto px-4">
          {/* Heading Section */}
          <h2 className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Contact A Hotel
          </h2>
          <p className="text-center md:text-left text-gray-500 font-medium mb-8">
            Have A Specific Question? Contact The Reception & Ask Away
          </p>
          {/* Hotel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {hotels.map((hotel, index) => (
              <div key={index} className="group cursor-pointer animation-on-scroll">
                {/* Hotel Image */}
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Hotel Name */}
                <p className="text-center  text-lg underline font-bold text-gray-600 mt-3 group-hover:text-blue-500 transition-colors">
                  {hotel.name} <span className="text-gray-400">&gt;</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default HotelsInfo;
  