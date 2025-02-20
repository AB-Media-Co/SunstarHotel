/* eslint-disable react/prop-types */

function HotelCard({ hotelData }) {
    console.log(hotelData);
    return (
      <div className=" mx-auto bg-white  content">
        {/* Optional Image Section */}
        {hotelData?.image && (
          <div className="relative">
            <img
              src={hotelData.image}
              alt={`${hotelData?.name} image`}
              className="w-full h-48 object-cover"
            />
            {hotelData?.price && hotelData?.discountedPrice && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {Math.round(
                  ((hotelData.price - hotelData.discountedPrice) / hotelData.price) *
                    100
                )}
                % OFF
              </div>
            )}
          </div>
        )}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-5">
            {/* Hotel Name and Price Section */}
            <div className="flex flex-col sm:flex-row items-center sm:space-x-5">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  {hotelData?.name}
                </h2>
                <div className="text-sm text-teal-500">
                  <a href="#" className="hover:underline">
                    Book Direct for Lowest Prices!
                  </a>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 flex flex-col items-center">
                <div className="flex gap-4 items-center">
                  {hotelData?.price && (
                    <span className="text-sm md:text-base text-red-500 font-bold line-through">
                      ₹ {hotelData?.price}
                    </span>
                  )}
                  <span className="text-teal-500 text-2xl font-bold">
                    ₹ {hotelData?.discountedPrice}{" "}
                    <span className="font-normal text-base text-gray-600">
                      / night
                    </span>
                  </span>
                </div>
                <p className="text-xs text-gray-500">Incl. taxes</p>
              </div>
            </div>
            {/* Check-In/Check-Out Section */}
            <div className="mt-4 sm:mt-0 bg-teal-100 text-[#058FA2] font-medium rounded-full py-2 px-4 flex items-center shadow-sm">
              <span>
                Check-In{" "}
                <span className="font-bold text-teal-800">{hotelData?.checkIn}</span>
              </span>
              <span className="mx-2">|</span>
              <span>
                Check-Out{" "}
                <span className="font-bold text-teal-800">
                  {hotelData?.checkOut}
                </span>
              </span>
            </div>
          </div>
  
          {/* Optional Hotel Description */}
          {hotelData?.description && (
            <div className="mt-4 text-gray-600 text-sm line-clamp-3">
              <p>{hotelData.description}</p>
            </div>
          )}
  
          {/* Divider */}
          <hr className="mt-4 border-gray-300" />
        </div>
      </div>
    );
  }
  
  export default HotelCard;
  