/* eslint-disable react/prop-types */
import { LocationOn } from "@mui/icons-material";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, memo, useCallback, lazy, Suspense, useMemo } from "react";
import { useGetHotels } from "../../ApiHooks/useHotelHook2";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRooms } from "../../ApiHooks/useRoomsHook";
import { format } from "date-fns";

const Calendar = lazy(() => import("../Calendar"));

const extractMainLocation = (fullAddress) => {
  if (!fullAddress) return '';
  const parts = fullAddress.split(',').map(part => part.trim());

  if (parts.length >= 3) {
    const mainArea = parts[parts.length - 2];
    const city = parts[parts.length - 1].split('-')[0]; // Remove postal code if present
    return `${mainArea}, ${city}`;
  } else if (parts.length === 2) {
    return parts.join(', ');
  }
  return fullAddress;
};

// Get today and tomorrow dates in YYYY-MM-DD format
const getTodayDate = () => format(new Date(), 'yyyy-MM-dd');
const getTomorrowDate = () => format(new Date(Date.now() + 86400000), 'yyyy-MM-dd');

const HotelImageCarousel = ({ hotel }) => {
  // console.log("Hotel:", hotel?.hotelCode, "Availability Data:", availabilityData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Get carousel images from API data
  const images = hotel?.imageSections?.carouselImages || hotel?.images || [];

  // --- Swipe handling (pointer events) ---
  const startXRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(null);
  const SWIPE_THRESHOLD = 50; // pixels

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handlePointerDown = (e) => {
    // only left button for mouse pointers (button === 0)
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    isDraggingRef.current = true;
    // capture pointer so we continue receiving move/up even if pointer leaves element
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    lastXRef.current = e.clientX;
    // we are not doing live translate/drag visuals here to keep it simple and robust,
    // but could add visual feedback by applying transform based on (clientX - startXRef.current)
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore if pointer was not captured
    }

    const startX = startXRef.current;
    const endX = lastXRef.current ?? e.clientX;
    if (startX == null) return;

    const delta = endX - startX;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      if (delta < 0) {
        // swiped left -> next
        goToNext();
      } else {
        // swiped right -> previous
        goToPrevious();
      }
    }
    // reset refs
    startXRef.current = null;
    lastXRef.current = null;
  };

  if (images.length === 0) {
    return <div className="w-full h-96 bg-gray-300 rounded-xl flex items-center justify-center">No images available</div>;
  }

  // Prevent click from triggering select when it was a short drag (optional)
  // If you want to avoid triggering other click handlers while swiping, you can add logic to track
  // very small moves vs click — left out here for simplicity.

  return (
    <div className="w-full relative">
      {/* Main Carousel Container */}
      <div
        className="relative w-full h-80 bg-gray-200 rounded-2xl overflow-hidden group touch-action-pan-y"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        // pointer event handlers for swipe
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Image with smooth transition */}
        <div className="absolute inset-0 overflow-hidden">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Hotel image ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              loading="lazy"
              decoding="async"
              draggable={false} // avoid default drag image behaviour
            />
          ))}
        </div>

        {/* Rooms Left Indicator - Unique Random 1-10 */}
        {/* {roomsLeft && (
          <span className="absolute top-4 right-4 bg-red-500 text-primary-white text-sm font-bold px-3 py-1 rounded-full z-20 shadow-lg">
            {roomsLeft === 1 ? "1 Room Left" : `${roomsLeft} Rooms Left`}
          </span>
        )} */}

        {/* Left Arrow - Appears on Hover */}
        <button
          onClick={goToPrevious}
          onPointerDown={(e) => e.stopPropagation()}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${isHovering ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>

        {/* Right Arrow - Appears on Hover */}
        <button
          onClick={goToNext}
          onPointerDown={(e) => e.stopPropagation()}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${isHovering ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ChevronRight size={24} strokeWidth={3} />
        </button>

      </div>

      {/* Dot Indicators */}
      <div className="bottom-2 absolute left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${currentIndex === index
              ? 'bg-primary-green w-8'
              : 'bg-gray-300 w-6 hover:bg-gray-400'
              }`}
          />
        ))}
      </div>
    </div>
  );
}


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


  const renderRatingBadge = (rating) => {
    if (!rating && rating !== 0) {
      return null;
    }

    const formattedRating = Number(rating).toFixed(1);

    return (
      <div className="flex items-center gap-2">
        <img
          src="/images/tripadvisor-logo.svg"
          alt="Tripadvisor rating"
          className="h-4 md:h-5"
          loading="lazy"
        />
        <span className="text-primary-green text-base font-semibold">
          {formattedRating}
        </span>
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

      <HotelImageCarousel hotel={hotel} />

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-xl  text-start font-bold text-black cursor-pointer hover:text-primary-green   transition-colors duration-300" onClick={handleClick}>{hotel?.name}</h1>
            {renderRatingBadge(hotel.rating)}
          </div>
          <div className="flex items-center mt-1 text-gray-600 text-sm font-semibold">
            <LocationOn className="text-primary-green mr-1" style={{ fontSize: "16px" }} />
            <span>{extractMainLocation(hotel?.location?.hotelAddress)}</span>
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

import { usePricing } from "../../Context/PricingContext";

const HotelSelectingCards = memo(({ data, close }) => {
  console.log(data)
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { data: hotelsFromHook, isLoading } = useGetHotels();
  console.log(hotelsFromHook)
  const { availabilityData } = usePricing();
  console.log(availabilityData)

  const hotels = hotelsFromHook || data;
  console.log(hotels)

  // Filter active hotels based on availability
  const activeHotels = useMemo(() => {
    if (!hotels?.hotels) return [];

    return hotels.hotels.filter(hotel => {
      if (!hotel?.active) return false;

      // If availability data is loaded, check if hotel has rooms
      if (availabilityData && Object.keys(availabilityData).length > 0) {
        const hotelData = availabilityData[hotel.hotelCode];

        // Log status for debugging
        // console.log(`Hotel ${hotel.name}:`, hotelData);

        // TEMPORARILY DISABLED: Show all hotels even if no availability data
        // if (!hotelData?.rooms?.length) return false;

        return true;
      }

      // If availability data not yet loaded, show active hotels by default
      return true;
    });
  }, [hotels, availabilityData]);

  console.log("activeHotels", activeHotels);

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
    // initial={{ opacity: 0 }}
    // animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    // transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {activeHotels.length === 0 && <p>No hotels found (activeHotels is empty)</p>}
      {activeHotels.map((hotel, index) => (
        <HotelCard
          key={hotel._id || hotel.hotelCode}
          hotel={hotel}
          close={close}
        />
      ))}
    </motion.div>
  );
});

HotelSelectingCards.displayName = 'HotelSelectingCards';

export default HotelSelectingCards;