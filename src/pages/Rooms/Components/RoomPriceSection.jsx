/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePricing } from "../../../Context/PricingContext";
import { useNavigate } from "react-router-dom";
import { FlashOnRounded } from "@mui/icons-material";

const RoomPriceSection = ({ roomData, hotelDetail }) => {
  const { guestDetails, selectedRooms, fetchRoomHotelDetails, sethotelData } = usePricing();
  const roomQty = guestDetails?.rooms || 1;
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (selectedRooms?.length > 0) {
      navigate("/room/details");
    } else {
      await fetchRoomHotelDetails(roomData?._id, hotelDetail?.hotelCode);
      navigate("/room/details");
      localStorage.setItem("hotelData", JSON.stringify(hotelDetail));
      sethotelData(hotelDetail);
    }
  };

  return (
    <div className="content mx-auto bg-white pt-6 md:pt-8 relative">
      {showAlert && (
        <div className="absolute top-16 right-4 bg-white border border-yellow-400 p-4 rounded-lg shadow-lg z-50 max-w-xs text-sm text-gray-700 animate-fadeIn">
          <p className="font-semibold text-yellow-600">Booking Limit Reached</p>
          <p className="mt-1">
            You cannot select more than <strong>{roomQty}</strong> rooms in a single booking.
          </p>
          <div className="flex items-center justify-end mt-4 gap-2">
            <button
              onClick={() => alert("Book more clicked!")}
              className="px-3 py-1.5 text-sm bg-primary-green text-white rounded-full hover:bg-primary-green/90 transition"
            >
              Book More
            </button>
            <button
              onClick={() => setShowAlert(false)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Top row */}
      <div className="flex flex-col md:flex-row justify-between md:items-end items-start gap-4 md:gap-6">
        {/* Left — name & specs */}
        <div className="flex flex-col gap-2 md:gap-3 max-w-full md:max-w-[68%]">
          <div className="flex flex-wrap items-end gap-2 md:gap-3">
            <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-gray-600 leading-tight">
              {roomData?.RoomName}
            </h1>

            <div className="flex flex-wrap gap-2 text-sm md:text-base font-medium text-gray-500">
              {roomData?.squareFeet && <span className="whitespace-nowrap">{roomData.squareFeet} sq.ft area</span>}
              {roomData?.maxGuests && <span className="whitespace-nowrap">{roomData.maxGuests} Guests Max</span>}
            </div>
          </div>

          {/* Price line (tablet friendly) */}
          <div className="mt-1">
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="text-primary-green text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap leading-none">
                ₹&nbsp;{Number(roomData?.discountRate ?? 0).toLocaleString("en-IN")}
              </span>
              <span className="text-sm md:text-base font-medium text-gray-500 whitespace-nowrap">
                / night
              </span>
            </div>
            <span className="block text-xs text-gray-500 mt-1">Incl. taxes</span>
          </div>
        </div>

        {/* Right — CTA / status */}
        <div className="flex flex-col md:items-end mt-2 md:mt-0 w-full md:w-auto">
          {roomData?.Availability === 0 ? (
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full">
              <p className="text-primary-green text-sm md:text-base font-medium italic">
                <FlashOnRounded className="rotate-[20deg] mr-1 align-[-2px]" />
                Book directly for the lowest price
              </p>
              <div className="flex justify-end">
                <button className="bg-gray-500 px-4 py-2 rounded-md text-white font-semibold text-base md:text-lg w-full md:w-auto">
                  Sold Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={handleBooking}
                className="bg-primary-green px-5 md:px-6 py-2 rounded-md text-white font-semibold text-base md:text-lg w-full md:w-auto"
              >
                Book Room
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPriceSection;
