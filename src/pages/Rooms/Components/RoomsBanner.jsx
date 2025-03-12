/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "../../../Components/CardsCommonComp/CommonCarousel";
import Calendar from "../../../Components/Calendar";
import Icon from "../../../Components/Icons";
import { differenceInCalendarDays } from "date-fns";
import GuestsDropdown from "../../../Components/GuestsDropdown";
import { useNavigate } from "react-router-dom";
import { usePricing } from "../../../Context/PricingContext";
import { ArrowRightAlt } from "@mui/icons-material";

function RoomsBanner({ businessPlatformFeatures, hotelDetail }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);
  const [bookingError, setBookingError] = useState(false);

  const navigate = useNavigate();

  const { fetchRoomHotelDetails, sethotelData } = usePricing();
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    if (storedCheckIn && storedCheckOut) {
      setCheckIn(storedCheckIn);
      setCheckOut(storedCheckOut);
    }
  }, []);

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setBookingError(true);
      return;
    } else {
      setBookingError(false);
      console.log(hotelDetail)
      await fetchRoomHotelDetails(businessPlatformFeatures?._id, hotelDetail?.hotelCode);

      navigate("/room/details");

      localStorage.setItem("hotelData", JSON.stringify(hotelDetail));

      sethotelData(hotelDetail)
    }
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const nights = differenceInCalendarDays(
        new Date(checkOut),
        new Date(checkIn)
      );
      return <div>{nights} Nights</div>;
    }
    return 0;
  };

  return (
    <div className="lg:p-2">
      <Carousel
        features={businessPlatformFeatures?.RoomImage}
        height="h-[600px] rounded-lg"
        buttonColor="#FDC114"
        iconSize="h-6 w-6"
        NavClass="bottom-[16rem] md:bottom-[10rem]"
      />

      <div
        className={`bg-primary-white bg-opacity-50 backdrop-blur-sm py-8 px-4 lg:left-[10%] transition-all duration-500 ease-in-out 
          content absolute top-[64%] md:top-[55%]
          md:px-8 lg:px-12 rounded-md shadow-lg lg:mx-auto  
          z-10 flex flex-col items-center gap-6 mx-2
        `}
      >
        <div
          className={`flex justify-center flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-4`}
        >
          {/* <div
            onClick={() => setOpenCalender(true)}
            className={`flex flex-wrap w-full justify-center items-center border rounded-full px-6 py-3 hover:shadow-lg ease-in-out transition-all cursor-pointer space-x-2 shadow-sm ${bookingError ? "border-red-500" : "border-[#006167]"
              }`}
          >
            <Icon name="calendar" className="h-6 w-6 text-[#006167]" />
            <span className="text-[#006167] font-semibold text-base sm:text-lg md:text-[24px]">
              {checkIn ? checkIn : "Check In"}{" "}
              <span className="text-yellow-500">→</span>{" "}
              {checkOut ? checkOut : "Check Out"}
            </span>
            {checkIn && checkOut && (
              <span className="text-[#006167] text-xs sm:text-sm flex">
                ({calculateNights()})
              </span>
            )}
          </div> */}


          <div onClick={() => setOpenCalender(true)} className="flex flex-row cursor-pointer items-center justify-evenly border max-w-full w-full   px-4 py-3 md:px-8 md:py-4 rounded-full gap-3 shadow-md">
            <Icon name="calendar" className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
            <div className={`flex flex-col text-gray-700`}>
              <span className="font-semibold text-[12px]  md:text-base">
                {checkIn ? checkIn : "Check In"}{" "}
              </span>
            </div>
            <ArrowRightAlt className="text-yellow-500" />
            <div className={`flex flex-col  text-gray-700`}>
              <span className="font-semibold text-[12px] md:text-base">
                {checkOut ? checkOut : "Check Out"}
              </span>
            </div>
            {checkIn && checkOut && (
              <span className="flex items-center justify-center text-[8px] md:text-base text-black rounded-full border border-gray-300 px-3 md:py-1">
                {calculateNights()}
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 w-full">
            {/* <GuestsDropdown classBg="bg-transparant" /> */}
            <button
              onClick={handleBooking}
              className="bg-[#006167] w-full md:w-auto text-primary-white text-sm sm:text-base lg:text-lg sm:w-auto rounded-full shadow-md px-6 py-3"
            >
              Book Room
            </button>
          </div>
        </div>

        {bookingError && (
          <p className="text-red-500 text-sm">
            Please select Check-In and Check-Out dates.
          </p>
        )}
      </div>

      {openCalender && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Calendar
            setCheckInDate={setCheckIn}
            setCheckOutDate={setCheckOut}
            setOpenCalender={setOpenCalender}
          />
        </div>
      )}
    </div>
  );
}

export default RoomsBanner;
