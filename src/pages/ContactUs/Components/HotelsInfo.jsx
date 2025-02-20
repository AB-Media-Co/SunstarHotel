/* eslint-disable react/prop-types */

const HotelsInfo = ({ hotels }) => {
 
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-gray-50 py-12">
      <div className="content mx-auto px-4">
        {/* Heading Section */}
        <div className="mb-10 text-center">
          <h2 className="text-mobile/h3 md:text-desktop/h2 font-bold text-gray-800 mb-2">
            Contact A Hotel
          </h2>
          <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-500 font-medium">
            Have A Specific Question? Contact The Reception & Ask Away
          </p>
        </div>
        {/* Hotel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div
              key={index}
               
      data-aos="fade-up"
      data-aos-delay={index * 100} 
              className="group relative cursor-pointer animation-on-scroll rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Hotel Image */}
              <div className="overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-4 py-2 bg-primary-green text-primary-white rounded-full text-sm font-semibold hover:bg-primary-green transition-colors">
                  Contact Now
                </button>
              </div>
              {/* Hotel Name */}
              <div className="p-4 bg-primary-white">
                <p className="text-center text-mobile/body/2 md:text-desktop/body/1 font-bold text-gray-800 group-hover:text-primary-green  transition-colors">
                  {hotel.name} <span className="text-gray-400">&gt;</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsInfo;
