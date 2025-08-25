import { usePricing } from "../../../Context/PricingContext";
import { useNavigate } from "react-router-dom";
import { ArrowRightAlt } from "@mui/icons-material";
import { differenceInCalendarDays, format } from "date-fns";

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
      <div className="text-sm md:text-base font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </div>
      <div className="text-lg md:text-xl font-semibold text-gray-900">
        {date ? (
          <>
            <div className="md:hidden">
              {format(date, "dd MMM")}
            </div>
            <div className="hidden md:block">
              {format(date, "dd MMM, EEEE")}
            </div>
          </>
        ) : (
          <span className="text-gray-400">Select {label.toLowerCase()}</span>
        )}
      </div>
      <div className="text-xs md:text-sm text-gray-500">
        {time || (isCheckOut ? "11:00 AM" : "1:00 PM")}
      </div>
    </div>
  );

  const nights = calculateNights();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-10 shadow-sm">
      {/* Hotel Information */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {getHotelData?.name}
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {getHotelData?.location?.hotelAddress}
        </p>
      </div>

      {/* Check-in/Check-out Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
          <DateDisplay
            date={checkInDate}
            label="Check-in"
            time={details[0]?.checkIn}
          />

          <div className="flex flex-col items-center mx-4">
            <ArrowRightAlt className="text-yellow-500 text-2xl mb-1" />
            {nights > 0 && (
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                {nights} {nights === 1 ? 'Night' : 'Nights'}
              </div>
            )}
          </div>

          <DateDisplay
            date={checkOutDate}
            label="Check-out"
            time={details[0]?.checkOut}
            isCheckOut={true}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-start">
        <button
          onClick={handleChangeClick}
          className="inline-flex items-center px-6 py-3 bg-primary-yellow hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <span>Change Dates & Rooms</span>
          <ArrowRightAlt className="ml-2 text-lg" />
        </button>
      </div>
    </div>
  );
};
