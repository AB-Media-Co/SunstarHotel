/* eslint-disable react/prop-types */
import { usePricing } from "../../../Context/PricingContext";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";
import { ArrowRight } from "lucide-react";

export const HeaderHotel = () => {
  const { details, setEditAddPricing } = usePricing();
  const getHotelDataLocal = localStorage.getItem("hotelInfo");
  const getHotelData = getHotelDataLocal ? JSON.parse(getHotelDataLocal) : null;

  const checkInStr = localStorage.getItem("checkInDate");
  const checkOutStr = localStorage.getItem("checkOutDate");

  const checkInDate = checkInStr ? new Date(checkInStr) : null;
  const checkOutDate = checkOutStr ? new Date(checkOutStr) : null;

  const navigate = useNavigate();

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      return differenceInCalendarDays(checkOutDate, checkInDate);
    }
    return 0;
  };

  const handleChangeClick = () => {
    setEditAddPricing(true);
    localStorage.setItem("editAddPricing", "true");
    navigate(`/hotels/${details[0]?.hotelCode}`);
  };

  const DateDisplay = ({ date, label, time, isCheckOut = false }) => (
    <div className="flex flex-col space-y-1">
      <div className="text-mobile/title md:text-desktop/h5/medium font-medium capitalize text-gray-900">
        {date ? (
          <>
            {/* Mobile view */}
            <div className="md:hidden">
              <span className="font-bold">{format(date, "dd MMM, ")}</span>{" "}
              {format(date, "EEE")}
            </div>

            {/* Desktop view */}
            <div className="hidden md:block">
              <span className="font-bold">{format(date, "dd MMM, ")}</span>{" "}
              {format(date, "EEEE")}
            </div>
          </>
        ) : (
          <span className="text-gray-400">
            Select {label.toLowerCase()}
          </span>
        )}
      </div>


      <div className="flex items-center gap-1">

        <div className="text-sm capitalize hidden md:block  font-medium text-gray-600  tracking-wide">
          {label}
        </div>
        <div className="text-xs md:text-sm font-semibold text-gray-500">
          {time || (isCheckOut ? "11:00 am" : "1:00 pm")}
        </div>
      </div>
    </div>
  );

  const nights = calculateNights();

  return (
    <div className=" border-b-2">
      {/* Hotel Information */}
      <div className="md:mb-4 mb-2">
        <h2 className="text-mobile/h4 md:text-desktop/h4 font-bold md:font-bold text-gray-900 md:mb-2">
          {getHotelData?.name}
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {getHotelData?.location?.hotelAddress}
        </p>
      </div>

      {/* Check-in/Check-out Section */}
      <div className="mb-4">
        <div className="flex items-center gap-4 ">
          <DateDisplay
            date={checkInDate}
            label="Check-in"
            time={details[0]?.checkIn}
          />

          <ArrowRight className="text-primary-yellow text-2xl mb-1" />


          <DateDisplay
            date={checkOutDate}
            label="Check-out"
            time={details[0]?.checkOut}
            isCheckOut={true}
          />

          {nights > 0 && (
            <div className="border-primary-yellow border text-primary-yellow px-3 py-1 rounded-full text-xs md:text-sm font-medium">
              {nights} {nights === 1 ? 'Night' : 'Nights'}
            </div>
          )}
        </div>
      </div>

        <button
          onClick={handleChangeClick}
          className="inline-flex items-center  mb-2 text-primary-yellow underline font-medium transition-colors duration-200 "
        >
          <span>Modify Date/Room Selection  </span>
          {/* <ArrowRight className="ml-2 text-lg" /> */}
        </button>
     
    </div>
  );
};
