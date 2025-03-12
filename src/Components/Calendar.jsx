/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  format,
  addMonths,
  startOfMonth,
  startOfWeek,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
  isSameMonth,
  differenceInCalendarDays,
  startOfDay,
} from "date-fns";
import { ArrowBackIosNew, ArrowForwardIos, ArrowRightAlt, Close } from "@mui/icons-material";
import gsap from "gsap";
import Icon from "./Icons";
import GuestsDropdown from "./GuestsDropdown";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../ApiHooks/useRoomsHook";
import { usePricing } from "../Context/PricingContext";

const Calendar = ({ setCheckInDate, setCheckOutDate, setOpenCalender, hotelCode }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const nextMonth = addMonths(currentMonth, 1);
  const { closeHotelModal } = usePricing();  

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [confirmClicked, ] = useState(false);

  const hotelInfo = JSON.parse(localStorage.getItem("hotelInfo"));
  
  const shouldFetchRooms = checkIn && checkOut && hotelInfo?.hotelCode && hotelInfo?.authKey;
  
  const { data: rooms, isLoading } = useRooms(
    shouldFetchRooms ? hotelInfo.hotelCode : null,
    shouldFetchRooms ? hotelInfo.authKey : null,
    shouldFetchRooms ? format(checkIn, "yyyy-MM-dd") : null,
    shouldFetchRooms ? format(checkOut, "yyyy-MM-dd") : null
  );

  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    if (storedCheckIn && storedCheckOut) {
      setCheckIn(new Date(storedCheckIn));
      setCheckOut(new Date(storedCheckOut));
    }
  }, []);

  const handleDateClick = (day) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
    } else if (isBefore(day, checkIn)) {
      setCheckIn(day);
    } else {
      setCheckOut(day);
    }
  };
  const navigate = useNavigate()

  const handleConfirmClick = async () => {
    if (!checkIn || !checkOut) {
      return; // Simply return if dates aren't selected
    }

    const formattedStartDate = format(checkIn, "yyyy-MM-dd");
    const formattedEndDate = format(checkOut, "yyyy-MM-dd");
    setCheckInDate(formattedStartDate);
    setCheckOutDate(formattedEndDate);
    localStorage.setItem("checkInDate", formattedStartDate);
    localStorage.setItem("checkOutDate", formattedEndDate);

    if (hotelCode) {
      try {
        // Wait for the rooms data to be fetched
        await new Promise(resolve => {
          const checkData = () => {
            if (rooms) {
              resolve();
            } else if (!isLoading) {
              resolve(); // Resolve if loading is complete but no rooms found
            } else {
              setTimeout(checkData, 100); // Check again after 100ms
            }
          };
          checkData();
        });

        if (rooms) {
          localStorage.setItem("roomsData", JSON.stringify(rooms));
        }
        navigate(`/hotels/${hotelCode}`);
        closeHotelModal()
        setOpenCalender(false);
      } catch (error) {
        console.error("Error handling confirmation:", error);
      }
    }
  };
  
  const daysInWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const renderCalendar = (month, showLeftArrow, showRightArrow) => {
    const startDate = startOfWeek(startOfMonth(month));
    const totalDays = 42;
    const days = Array.from({ length: totalDays }, (_, i) => addDays(startDate, i));

    return (
      <div className="calendar-month w-full lg:w-[48%] flex flex-col gap-6 relative">
        <div className="md:flex hidden items-center px-4">
          {showLeftArrow && (
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              className={`font-bold text-2xl ${isSameMonth(currentMonth, new Date())
                ? "bg-[#E5E5E5] text-gray-300 cursor-not-allowed"
                : "text-primary-white bg-primary-green hover:bg-primary-green/90 cursor-pointer transition-colors"
                } rounded-full text-[8px] flex items-center py-2 px-2 md:py-3 md:px-3 shadow-sm`}
              disabled={isSameMonth(currentMonth, new Date())}
            >
              <ArrowBackIosNew style={{ width: "12px", height: "12px" }} />
            </button>
          )}
          <h2 className="text-center flex justify-center items-center w-full font-bold text-lg md:text-2xl lg:text-3xl text-primary-green">
            {format(month, "MMMM yyyy")}
          </h2>
          {showRightArrow && (
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="font-bold text-2xl text-primary-white bg-primary-green hover:bg-primary-green/90 rounded-full flex items-center py-2 px-2 md:py-3 md:px-3 shadow-sm cursor-pointer transition-colors"
            >
              <ArrowForwardIos style={{ width: "12px", height: "12px" }} />
            </button>
          )}
        </div>

        {/* Month Title on Mobile */}
        <h2 className="text-center md:hidden flex justify-center items-center w-full font-bold text-lg md:text-2xl lg:text-3xl text-primary-green">
          {format(month, "MMMM yyyy")}
        </h2>

        {/* Calendar Grid */}
        <div className="px-2 md:px-10">
          <div className="calendar-header hidden pb-8 lg:grid grid-cols-7 text-sm md:text-lg text-center font-bold text-gray-400">
            {daysInWeek.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="calendar-days grid grid-cols-7 gap-y-2 sm:gap-y-4 md:gap-y-6">
            {days.map((day, index) => {
              const isCurrent = format(day, "M") === format(month, "M");
              const isRangeStart = isCurrent && checkIn && isSameDay(day, checkIn);
              const isRangeEnd = isCurrent && checkOut && isSameDay(day, checkOut);
              const inRange =
                isCurrent && checkIn && checkOut && isAfter(day, checkIn) && isBefore(day, checkOut);
              const isPastDate = isBefore(day, startOfDay(new Date()));

              return (
                <div
                  key={index}
                  className={`
                    day-cell flex items-center justify-center h-8 sm:h-10 md:h-12 md:w-full 
                    transition-colors duration-200 
                    ${isCurrent ? "current-month" : "other-month"} 
                    ${isRangeStart ? "range-start bg-primary-green text-primary-green rounded-l-full" : ""} 
                    ${isRangeEnd ? "range-end bg-primary-green text-primary-green rounded-r-full" : ""} 
                    ${inRange ? "in-range bg-primary-green text-primary-white" : ""} 
                    ${isPastDate ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-primary-green/20 cursor-pointer"} 
                    rounded-md
                  `}
                  onClick={() => isCurrent && !isPastDate && handleDateClick(day)}
                >
                  {isCurrent && (
                    <p className="text-center text-xs md:text-[20px]">
                      {format(day, "d")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      return <>{differenceInCalendarDays(checkOut, checkIn)} Nights</>;
    }
    return 0;
  };

  useEffect(() => {
    gsap.fromTo(
      ".Calender",
      { x: 2000, opacity: 0 },
      { duration: 1.5, x: 0, opacity: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".footer",
      { y: 100, opacity: 0 },
      { duration: 1.5, y: 0, opacity: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div className="calendar-container items-center flex flex-col relative">
      <div className="flex Calender justify-between md:hidden rounded-t-xl bg-primary-white py-4 items-center px-2 w-full shadow-sm">
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          className={`font-bold p-[6px] text-[5px] rounded-full flex items-center shadow-sm transition-colors
            ${isSameMonth(currentMonth, new Date())
              ? "bg-[#E5E5E5] text-gray-300 cursor-not-allowed"
              : "text-primary-white bg-primary-green hover:bg-primary-green/90 cursor-pointer"
            }
          `}
          disabled={isSameMonth(currentMonth, new Date())}
        >
          <ArrowBackIosNew style={{ width: "10px", height: "10px" }} />
        </button>

        <div className="calendar-header w-full grid lg:hidden grid-cols-7 text-sm md:text-lg text-center font-bold text-gray-400">
          {daysInWeek.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>

        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="font-bold p-[6px] text-[5px] text-primary-white bg-primary-green hover:bg-primary-green/90 rounded-full flex items-center shadow-sm cursor-pointer transition-colors"
        >
          <ArrowForwardIos style={{ width: "10px", height: "10px" }} />
        </button>
      </div>

      {/* Main Calendar */}
      <div className="flex flex-col h-[70vh] overflow-y-auto md:h-[90vh] Calender hotelSelection bg-primary-white md:rounded-lg lg:w-[90%] w-full lg:rounded-t-[40px] md:pt-6 md:pb-20 lg:flex-row gap-6 shadow-md">
        {renderCalendar(currentMonth, true, false)}
        {renderCalendar(nextMonth, false, true)}
      </div>

      {/* Close Button */}
      <button
        onClick={() => setOpenCalender(false)}
        className="absolute right-5 top-0 text-[36px] text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Close />
      </button>

      {/* Footer */}
      <div className="footer md:-mt-10 border-t-2 border-gray-200 bg-primary-yellow w-full py-2 md:py-6 absolute bottom-0 shadow-md">
        <div className="content flex flex-col justify-between md:flex-row gap-4 items-center px-4">
          {/* Dates & Nights */}
          <div className="flex flex-row items-center justify-evenly max-w-full w-full md:w-auto md:max-w-[50%] bg-white px-4 py-3 md:px-8 md:py-4 rounded-full gap-3 shadow-lg">
            <Icon name="calendar" className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
            <div className={`flex flex-col ${confirmClicked && !checkIn ? "text-red-500" : "text-gray-700"}`}>
              <span className="font-semibold text-[8px]  md:text-base">
                {checkIn ? format(checkIn, "dd MMM, EEEE") : "Check in"}
              </span>
            </div>
            <ArrowRightAlt className="text-yellow-500" />
            <div className={`flex flex-col ${confirmClicked && !checkOut ? "text-red-500" : "text-gray-700"}`}>
              <span className="font-semibold text-[8px] md:text-base">
                {checkOut ? format(checkOut, "dd MMM, EEEE") : "Check-out"}
              </span>
            </div>
            {checkIn && checkOut && (
              <span className="flex items-center justify-center text-[8px] md:text-base text-black rounded-full border border-gray-300 px-3 md:py-1">
                {calculateNights()}
              </span>
            )}
          </div>
          <div className="flex justify-end w-full md:w-1/4">
            <button
              onClick={handleConfirmClick}
              disabled={shouldFetchRooms && isLoading}
              className="w-full md:w-auto font-bold bg-primary-dark-green text-white px-6 py-2 rounded-full hover:bg-primary-green transition duration-300 shadow-lg"
            >
              {shouldFetchRooms && isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Calendar;