/* eslint-disable react/prop-types */
import { Star } from "@mui/icons-material";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, memo, useCallback, lazy, Suspense } from "react";
import { useGetHotels } from "../../ApiHooks/useHotelHook2";

const Calendar = lazy(() => import("../Calendar"));

// Memoized HotelCard for better performance
const HotelCard = memo(({ hotel, close: closeParentModal }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };
  const [openCalender, setOpenCalender] = useState(false);
  const [, setCheckIn] = useState(null);
  const [, setCheckOut] = useState(null);
  
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    if (storedCheckIn && storedCheckOut) {
      setCheckIn(storedCheckIn);
      setCheckOut(storedCheckOut);
    }
  }, []);

  const visibleAmenities = hotel?.amenities?.slice(0, 3) || [];
  const remainingAmenitiesCount = (hotel?.amenities?.length || 0) - visibleAmenities.length;

  const handleClick = useCallback(() => {
    localStorage.setItem("hotelInfo", JSON.stringify(hotel));
    setOpenCalender(true);
  }, [hotel]);

  const handleCalendarClose = useCallback(() => {
    setOpenCalender(false);
    closeParentModal(); // Close the hotel selection modal too
  }, [closeParentModal]);


  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${i < fullStars
              ? 'text-yellow-400'
              : (i === fullStars && hasHalfStar)
                ? 'text-yellow-400 opacity-60'
                : 'text-gray-300'}`}
            style={{ fontSize: "16px" }}
          />
        ))}
        {/* <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span> */}
      </div>
    );
  };

  return (
    <motion.div
      className="bg-primary-white rounded-2xl shadow-lg overflow-hidden w-full h-full transition-transform duration-300 hover:scale-105 flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <img 
        src={hotel?.images[0]} 
        alt={hotel.name} 
        onClick={handleClick} 
        className="w-full h-48 object-cover cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110" 
        loading="lazy"
        decoding="async"
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-xl  text-start font-bold text-black cursor-pointer hover:text-primary-green   transition-colors duration-300"  onClick={handleClick}>{hotel?.name}</h1>
            {/* <span className="bg-primary-green text-primary-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
              <Star className="text-primary-yellow text-sm mr-1" />
              {hotel.rating}
            </span> */}

            {renderRatingStars(hotel.rating)}

            
          </div>
          <ul className="flex items-center mt-2 flex-wrap">
            {visibleAmenities.length > 0 ? (
              visibleAmenities.map((amenity, index) => {
                const label = typeof amenity === "object" ? amenity.value : amenity;
                return (
                  <li key={index} className="bg-gradient-to-r from-primary-green to-primary-green text-primary-white text-xs px-3 py-1 rounded-full m-1">
                    <span>{label}</span>
                  </li>
                );
              })
            ) : (
              <li>No amenities listed</li>
            )}
            {remainingAmenitiesCount > 0 && (
              <li className="text-gray-600 text-xs m-1">+{remainingAmenitiesCount} more</li>
            )}
          </ul>
        </div>
        <div className="mt-4 w-full">
          <div className="text-start">
            <span className="text-2xl leading-none font-bold text-primary-green">
              ₹ {hotel?.price}
              <span className="text-gray-400 text-sm font-medium"> / night onwards</span>
              <br />
              <span className="text-gray-400 text-sm font-medium">Incl. taxes</span>
            </span>
            <p className="text-primary-green text-[12px] font-semibold">Lowest Price, Guaranteed!</p>
          </div>
          <button
            onClick={handleClick}
            className="bg-primary-green cursor-pointer w-full text-primary-white px-4 py-2 rounded-lg shadow-md flex justify-center items-center transition duration-300 hover:bg-primary-dark-green mt-4"
          >
            Select Hotel
          </button>
        </div>
      </div>

      {openCalender && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Suspense fallback={
            <div className="bg-white p-8 rounded-lg animate-pulse">
              <div className="h-64 w-96 bg-gray-200 rounded"></div>
            </div>
          }>
            <Calendar
              setCheckInDate={setCheckIn}
              setCheckOutDate={setCheckOut}
              setOpenCalender={handleCalendarClose}
              hotelCode={hotel.hotelCode}
            />
          </Suspense>
        </div>
      )}
    </motion.div>
  );
});

HotelCard.displayName = 'HotelCard';

const HotelSelectingCards = memo(({ data, close }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { data: hotelsFromHook, isLoading } = useGetHotels();
  const hotels = data || hotelsFromHook;

  // Filter active hotels once
  const activeHotels = hotels?.hotels?.filter(hotel => hotel?.active) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 items-stretch bg-primary-white sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {activeHotels.map((hotel) => (
        <HotelCard key={hotel._id || hotel.hotelCode} hotel={hotel} close={close} />
      ))}
    </motion.div>
  );
});

HotelSelectingCards.displayName = 'HotelSelectingCards';

export default HotelSelectingCards;
