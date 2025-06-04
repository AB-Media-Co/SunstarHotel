/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePricing } from "../../../Context/PricingContext";
import { useNavigate } from "react-router-dom";
import { FlashOnRounded } from "@mui/icons-material";

const RoomPriceSection = ({ roomData, hotelDetail }) => {
  const { guestDetails, selectedRooms, fetchRoomHotelDetails, sethotelData } = usePricing();
  console.log(roomData);
  const roomQty = guestDetails?.rooms || 1;
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();


  const handleBooking = async () => {
    if (selectedRooms?.length > 0) {
      navigate("/room/details")
    } else {
      await fetchRoomHotelDetails(roomData?._id, hotelDetail?.hotelCode);

      navigate("/room/details");

      localStorage.setItem("hotelData", JSON.stringify(hotelDetail));

      sethotelData(hotelDetail)
    }
  };


  return (
    <div className="content mx-auto bg-white pt-6 md:pt-8    relative ">

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

      {/* Room info */}
      <div className="flex flex-col md:flex-row justify-between md:items-end items-start gap-4">

        {/* Left - Room Name and Specs */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-end">
            <h1 className="text-lg md:text-4xl font-bold text-gray-600">
              {roomData?.RoomName}
            </h1>
            <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-500">
              {roomData?.squareFeet && (
                <span>{roomData.squareFeet} sq.ft area</span>
              )}
              {roomData?.maxGuests && (
                <span>{roomData.maxGuests} Guests Max</span>
              )}
            </div>

          </div>

          <p className="text-xl md:text-3xl flex gap-2 items-end font-bold text-primary-green">
            ₹ {roomData?.discountRate}
            <span className="text-sm font-medium text-gray-500"> / night</span>
            <span className="text-sm text-gray-500">Incl. taxes</span>
          </p>

        </div>

        {/* Right - Pricing */}
        <div className="flex flex-col md:items-end mt-2 md:mt-0">

          {roomData?.Availability === 0 ? (<div className="flex gap-4 w-full items-center">



            <p className="text-primary-green md:w-[280px] w-full text-sm  font-medium italic">
              <FlashOnRounded className=" rotate-[20deg] font-extralight" />
              Book directly for the lowest price
            </p>
            <div className="flex items-center w-[250px] md:w-auto justify-end gap-4 ">
              <button
                className="bg-gray-500  px-4 py-2 rounded-md text-white font-semibold text-lg"
              >
                Sold Out
              </button>
            </div>
          </div>) : (<>

            <div className="flex items-center justify-end gap-4 ">
              <button
                onClick={handleBooking}
                className="bg-primary-green px-4 py-2 rounded-md text-white font-semibold text-lg"
              >
                Book Room
              </button>
            </div>
          </>)}



        </div>
      </div>

    </div>
  );
};

export default RoomPriceSection;
