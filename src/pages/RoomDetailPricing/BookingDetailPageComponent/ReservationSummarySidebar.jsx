import { useNavigate } from "react-router-dom";
import { usePricing } from "../../../Context/PricingContext";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const ReservationSummarySidebar = ({
  hotelDetail,
  checkIn,
  checkOut,
  days,
  showButton,
  isPaymentVisible,
}) => {
  const navigate = useNavigate();
  const {
    setEditAddPricing,
    selectedRooms,
    totalOtherCharges,
    finalPrice,
    baseFinalPrice,
    setNights,
  } = usePricing();

  useEffect(() => {
    if (days) {
      setNights(days);
      localStorage.setItem("days", days);

    }
  }, [days, setNights]);

  const handelChangeClick = () => {
    setEditAddPricing(true);
    localStorage.setItem("editAddPricing", true);
    navigate(`/hotels/${hotelDetail?.hotelCode}`);
  };

  return (
    <div className="p-4 bg-primary-white sticky top-4 border-2 rounded-lg w-full md:w-[24rem] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reservation Summary</h2>
      <div className="flex flex-col gap-4 border-2 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Check-In</h3>
            <p className="md:text-lg font-semibold text-teal-600">
              {formatDate(checkIn)}
            </p>
            <p className="text-sm text-gray-500">
              From {hotelDetail?.checkIn || "10:00 AM"}
            </p>
          </div>
          <hr className="w-[2px] bg-gray-400 h-16" />
          <div>
            <h3 className="text-sm font-medium text-gray-700">Check-Out</h3>
            <p className="md:text-lg font-semibold text-teal-600">
              {formatDate(checkOut)}
            </p>
            <p className="text-sm text-gray-500">
              By {hotelDetail?.checkOut || "2:00 PM"}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-700 flex items-center">
            Total Length Of Stay:
            <span className="ml-2 font-semibold text-gray-800">{days} Days</span>
          </p>
          <p className="text-sm text-gray-700 mt-2">
       
            <div
              onClick={handelChangeClick}
              className="text-sm cursor-pointer text-orange-600 underline"
            >
              Change Your Selection
            </div>
          </p>
        </div>
      </div>
      <div className="pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Your Price Summary
        </h3>


        {selectedRooms && selectedRooms.length > 0 && selectedRooms.map((room, index) => {
          return <div key={index} className="flex justify-between text-sm text-gray-700">
            <p>
              {room.roomName} (
              {room.option === "roomOnly" ? "Room Only" : "Continental Plan"}) X {days} Night
            </p>
            <p className="font-medium text-gray-800">
              ₹ {room.price * days}
            </p>
          </div>
        })}
      </div>
      <div className="flex justify-between text-sm text-gray-700">
        <p>Other Charges</p>
        <p className="font-medium text-gray-800">₹ {totalOtherCharges}</p>
      </div>

      {/* Price Breakdown */}
      <div className="border-t mt-2 pt-2">
        <div className="flex justify-between text-sm text-gray-700">
          <p>Original Amount</p>
          <p className="font-medium text-gray-800">₹ {baseFinalPrice}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-700 mt-1">
          <p>Discount</p>
          <p className="font-medium text-gray-800">₹ {baseFinalPrice - finalPrice}</p>
        </div>
        <div className="flex justify-between text-base font-semibold mt-1">
          <p>Payable Amount</p>
          <p className="text-primary-green">₹ {finalPrice}</p>
        </div>
      </div>

      <a href="#payment-method" className="hidden lg:block">
        {showButton && (
          <button
            className={`mt-6 w-full bg-primary-dark-green text-primary-white font-semibold py-3 rounded transition-opacity duration-300 ${isPaymentVisible ? "opacity-0" : "opacity-100"
              }`}
          >
            See Payment Options
          </button>
        )}
      </a>
    </div>
  );
};
