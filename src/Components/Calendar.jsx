import { useEffect, useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { useRooms } from "../ApiHooks/useRoomsHook";
import { usePricing } from "../Context/PricingContext";

const Calendar = ({ setCheckInDate, setCheckOutDate, setOpenCalender, hotelCode }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const nextMonth = addMonths(currentMonth, 1);
  const { closeHotelModal, setNights } = usePricing();

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [hoverDate, setHoverDate] = useState(null);

  // Add new state for the long stay popup
  const [showLongStayPopup, setShowLongStayPopup] = useState(false);
  const popupRef = useRef(null);

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
      setShowLongStayPopup(false); // Reset popup when starting a new selection
    } else if (isBefore(day, checkIn)) {
      setCheckIn(day);
      setShowLongStayPopup(false);
    } else {
      // Check if the selected range is more than 30 days
      const daysDifference = differenceInCalendarDays(day, checkIn);
      if (daysDifference > 30) {
        setCheckOut(day); // Still set the checkout date
        setShowLongStayPopup(true); // Show the popup
      } else {
        setCheckOut(day);
        setShowLongStayPopup(false);
      }
    }
  };

  const handleDateHover = (day) => {
    if (checkIn && !checkOut) {
      setHoverDate(day);
    }
  };

  const navigate = useNavigate();

  const handleConfirmClick = async () => {
    setConfirmClicked(true);

    if (!checkIn || !checkOut) {
      return; // Simply return if dates aren't selected
    }

    const formattedStartDate = format(checkIn, "yyyy-MM-dd");
    const formattedEndDate = format(checkOut, "yyyy-MM-dd");
    setCheckInDate(formattedStartDate);
    setCheckOutDate(formattedEndDate);
    localStorage.setItem("checkInDate", formattedStartDate);
    localStorage.setItem("checkOutDate", formattedEndDate);
    if (hotelCode || hotelInfo?.hotelCode) {
      try {
        // Wait for the rooms data to be fetched
        new Promise(resolve => {
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


        navigate(`/hotels/${hotelCode || hotelInfo?.hotelCode}`);
        closeHotelModal();
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
      <div className="calendar-month w-full lg:w-[48%] flex flex-col gap-4 relative  p-4">
        <div className="flex items-center justify-between px-2">
          {showLeftArrow && (
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              className={`text-2xl hidden  rounded-full md:flex items-center justify-center w-10 h-10 transition-all transform hover:scale-105
                ${isSameMonth(currentMonth, new Date())
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "text-white bg-primary-green hover:bg-primary-green/90 cursor-pointer shadow-md"
                }`}
              disabled={isSameMonth(currentMonth, new Date())}
              aria-label="Previous month"
            >
              <ArrowBackIosNew style={{ width: "16px", height: "16px" }} />
            </button>
          )}
          <h2 className="font-bold text-xl text-center w-full md:text-2xl text-primary-green">
            {format(month, "MMMM yyyy")}
          </h2>
          {showRightArrow && (
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="text-2xl text-white bg-primary-green hover:bg-primary-green/90 rounded-full hidden md:flex items-center justify-center w-10 h-10 shadow-md cursor-pointer transition-all transform hover:scale-105"
              aria-label="Next month"
            >
              <ArrowForwardIos style={{ width: "16px", height: "16px" }} />
            </button>
          )}
        </div>

        {/* Calendar Grid */}
        <div className="px-1 md:px-4">
          <div className="calendar-header grid grid-cols-7 text-sm md:text-base text-center font-medium text-gray-500 pb-2 border-b border-gray-100">
            {daysInWeek.map((day, index) => (
              <div key={index} className="py-2">{day}</div>
            ))}
          </div>
          <div className="calendar-days grid grid-cols-7 gap-y-2 sm:gap-y-3 pt-2">
            {days.map((day, index) => {
              const isCurrent = format(day, "M") === format(month, "M");
              const isRangeStart = isCurrent && checkIn && isSameDay(day, checkIn);
              const isRangeEnd = isCurrent && checkOut && isSameDay(day, checkOut);
              const isHovered = hoverDate && checkIn && !checkOut &&
                isCurrent && isAfter(day, checkIn) && isBefore(day, hoverDate);
              const inRange =
                isCurrent && checkIn && checkOut && isAfter(day, checkIn) && isBefore(day, checkOut);
              const isPastDate = isBefore(day, startOfDay(new Date()));
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={index}
                  className={`day-cell flex items-center justify-center h-10 sm:h-12 relative
                    transition-all duration-200 
                    ${isCurrent ? "current-month" : "other-month opacity-0"} 
                    ${isRangeStart ? "range-start bg-primary-green rounded-l-full z-10" : ""} 
                    ${isRangeEnd ? "range-end bg-primary-green rounded-r-full z-10" : ""} 
                    ${inRange || isHovered ? "in-range bg-primary-green/20" : ""} 
                    ${isPastDate ? "text-gray-300 cursor-not-allowed" : isCurrent ? "hover:bg-primary-green/10 cursor-pointer" : ""} 
                    ${isToday && !isRangeStart ? "today ring-2 ring-primary-green/30 ring-inset" : ""}
                    `}
                  onClick={() => isCurrent && !isPastDate && handleDateClick(day)}
                  onMouseEnter={() => isCurrent && !isPastDate && handleDateHover(day)}
                >
                  {isCurrent && (
                    <div className={`
                      flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full
                      text-sm md:text-base font-medium
                      ${isRangeStart || isRangeEnd
                        ? "bg-primary-green text-white transform scale-110 shadow-md z-20"
                        : inRange || isHovered ? "text-primary-green" : ""}
                    `}>
                      {format(day, "d")}
                    </div>
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
      const nights = differenceInCalendarDays(checkOut, checkIn);
      setNights(nights)

      return nights === 1 ? "1 Night" : `${nights} Nights`;
    }
    return "";
  };



  // Add useEffect for popup animation
  useEffect(() => {
    if (showLongStayPopup && popupRef.current) {
      // Animate popup appearance
      gsap.fromTo(
        popupRef.current,
        {
          opacity: 0,
          y: -20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [showLongStayPopup]);

  useEffect(() => {
    gsap.fromTo(
      ".Calender",
      { x: 300, opacity: 0 },
      { duration: 0.8, x: 0, opacity: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".footer",
      { y: 50, opacity: 0 },
      { duration: 0.8, y: 0, opacity: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div className="calendar-container flex flex-col justify-end relative">
      {/* Main Calendar */}
      <div className="flex flex-col h-[75vh] overflow-y-auto md:rounded-t-xl md:h-auto Calender max-h-[85vh] bg-white lg:w-[95%] w-full md:p-6 lg:flex-row gap-6 shadow-lg">
        {/* Long Stay Popup */}
        {showLongStayPopup && (
          <div
            ref={popupRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 
              bg-white rounded-xl shadow-xl p-5 md:p-6 max-w-[90%] w-[320px] md:w-[360px]"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-green/10 rounded-full flex items-center justify-center mb-3">
                <Icon name="calendar" className="w-6 h-6 md:w-7 md:h-7 text-primary-green" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary-dark-green mb-2">Planning a long stay?</h3>
              <p className="text-gray-600 text-sm md:text-base mb-4">
                Currently, we don't support online bookings for more than 30 nights.
                However, you can tell us about your plans and we'll make it happen.
              </p>
              <button
                className="bg-primary-dark-green hover:bg-primary-green text-white font-bold px-6 py-3 rounded-lg 
                  transition-all duration-300 shadow-md w-full"
                onClick={() => window.location.href = "/booking-form"}
              >
                Get in touch
              </button>
              <button
                className="mt-3 text-gray-500 hover:text-gray-700 text-sm font-medium"
                onClick={() => setShowLongStayPopup(false)}
              >
                Continue with selection
              </button>
            </div>
          </div>
        )}

        {/* Overlay for popup */}
        {showLongStayPopup && (
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20"
            onClick={() => setShowLongStayPopup(false)}
          ></div>
        )}

        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between px-4 pt-4 md:hidden">
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              className={`rounded-full flex items-center justify-center w-8 h-8 
                ${isSameMonth(currentMonth, new Date())
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "text-white bg-primary-green hover:bg-primary-green/90 cursor-pointer"
                }`}
              disabled={isSameMonth(currentMonth, new Date())}
            >
              <ArrowBackIosNew style={{ width: "12px", height: "12px" }} />
            </button>
            <h2 className="font-bold text-lg text-primary-green">
              Select your stay dates
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="text-white bg-primary-green hover:bg-primary-green/90 rounded-full flex items-center justify-center w-8 h-8"
            >
              <ArrowForwardIos style={{ width: "12px", height: "12px" }} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-6">
            {renderCalendar(currentMonth, true, false)}
            {renderCalendar(nextMonth, false, true)}
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setOpenCalender(false)}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors bg-white/80 hover:bg-white rounded-full p-1 shadow-md z-20"
        aria-label="Close calendar"
      >
        <Close />
      </button>

      {/* Footer */}
      <div className="footer border-t border-gray-200 bg-white w-full py-4 md:py-6 sticky bottom-0 shadow-lg ">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center px-4 md:px-8">
          {/* Dates & Nights */}
          <div className="flex flex-row items-center justify-between w-full md:w-auto md:max-w-[60%] bg-gray-50 px-4 py-3 md:px-6 md:py-4 rounded-xl gap-3 shadow-md">
            <div className="flex items-center">
              <Icon name="calendar" className="w-5 h-5 md:w-6 md:h-6 text-primary-green mr-2" />
              <div className={`flex flex-col ${confirmClicked && !checkIn ? "text-red-500" : "text-gray-700"}`}>
                <span className="text-xs text-gray-500 font-medium">Check in</span>
                <span className="font-semibold text-[10px] md:text-base">
                  {checkIn ? format(checkIn, "EEE, MMM d") : "Select date"}
                </span>
              </div>
            </div>

            <ArrowRightAlt className="text-primary-green mx-1 md:mx-2" />

            <div className="flex items-center">
              <div className={`flex flex-col ${confirmClicked && !checkOut ? "text-red-500" : "text-gray-700"}`}>
                <span className="text-xs text-gray-500 font-medium">Check out</span>
                <span className="font-semibold text-[10px] md:text-base">
                  {checkOut ? format(checkOut, "EEE, MMM d") : "Select date"}
                </span>
              </div>
            </div>

            {checkIn && checkOut && (
              <div className="flex items-center justify-center text-xs md:text-sm font-medium text-primary-green bg-primary-green/10 rounded-full px-3 py-1 ml-2">
                {calculateNights()}
              </div>
            )}
          </div>

          <button
            onClick={handleConfirmClick}
            disabled={showLongStayPopup}
            className={`w-full md:w-auto font-bold text-white px-6 py-3 md:py-4 rounded-xl shadow-lg transition-all duration-300 
              ${(!checkIn || !checkOut|| showLongStayPopup)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary-dark-green hover:bg-primary-green transform hover:scale-105"}`}
          >

            Confirm Dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;