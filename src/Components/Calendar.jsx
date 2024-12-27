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
} from "date-fns";
import { ArrowBackIosNew, ArrowForwardIos, ArrowRightAlt, Close } from "@mui/icons-material";
import gsap from "gsap";
import Icon from "./Icons";
import GuestsDropdown from "./GuestsDropdown";

const Calendar = ({ setCheckInDate, setCheckOutDate, setOpenCalender }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const nextMonth = addMonths(currentMonth, 1);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [confirmClicked, setConfirmClicked] = useState(false); // Track if the confirm button is clicked

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

  const handleConfirmClick = () => {
    setConfirmClicked(true); // Set confirm clicked flag to true
    if (!checkIn || !checkOut) {
      gsap.fromTo(".dates", { x: 0 }, { duration: 0.1, x: 10, repeat: 3, yoyo: true });
    } else {
      const formattedStartDate = format(checkIn, "yyyy-MM-dd");
      const formattedEndDate = format(checkOut, "yyyy-MM-dd");
      setCheckInDate(formattedStartDate);
      setCheckOutDate(formattedEndDate);
      setOpenCalender(false)
    }
  };

  const renderCalendar = (month, showLeftArrow, showRightArrow) => {
    const daysInWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const startDate = startOfWeek(startOfMonth(month));
    const totalDays = 42;

    const days = Array.from({ length: totalDays }, (_, i) => addDays(startDate, i));

    return (
      <div className="calendar-month md:w-[48%] flex flex-col gap-6 relative">
        <div className="flex items-center px-4">
          {showLeftArrow && (
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              className={`font-bold text-2xl ${isSameMonth(currentMonth, new Date()) ? 'bg-[#E5E5E5] text-gray-300' : 'text-white bg-[#006167]'} rounded-full text-[8px] flex items-center py-3 px-3`}
              disabled={isSameMonth(currentMonth, new Date())}
            >
              <ArrowBackIosNew />
            </button>
          )}
          <h2 className="text-center flex justify-center items-center w-full font-bold text-lg md:text-[38px] lg:text-2xl text-[#006167]">
            {format(month, "MMMM yyyy")}
          </h2>
          {showRightArrow && (
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="font-bold text-2xl text-white bg-[#006167] rounded-full flex items-center py-3 px-3"
            >
              <ArrowForwardIos />
            </button>
          )}
        </div>
        <div className="md:px-10">
          <div className="calendar-header grid grid-cols-7 text-xl text-center font-bold text-gray-400">
            {daysInWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="calendar-days grid grid-cols-7 gap-y-2 sm:gap-y-4 md:gap-y-6">
            {days.map((day, index) => {
              const isCurrentMonth = format(day, "M") === format(month, "M");
              const isRangeStart = isCurrentMonth && checkIn && isSameDay(day, checkIn);
              const isRangeEnd = isCurrentMonth && checkOut && isSameDay(day, checkOut);
              const inRange = isCurrentMonth && checkIn && checkOut && isAfter(day, checkIn) && isBefore(day, checkOut);
              const isPastDate = isBefore(day, new Date());

              return (
                <div
                  key={index}
                  className={`day-cell md:w-[48px] flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 
                  ${isCurrentMonth ? "current-month" : "other-month"} 
                  ${isRangeStart ? "range-start md:w-[90px] rounded-l-full" : ""} 
                  ${isRangeEnd ? "range-end rounded-r-full" : ""} 
                  ${inRange ? "in-range md:w-[90px]" : ""} 
                  ${isPastDate ? "text-gray-400 cursor-not-allowed" : "text-gray-700"} 
                `}
                  onClick={() => isCurrentMonth && !isPastDate && handleDateClick(day)}
                >
                  {isCurrentMonth && <p className="text-center text-xs sm:text-sm md:text-base">{format(day, "d")}</p>}
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
      return <div>{differenceInCalendarDays(checkOut, checkIn)} Nights</div>;
    }
    return 0;
  };

  useEffect(() => {
    gsap.fromTo(".Calender", { x: 2000, opacity: 0 }, { duration: 1.5, x: 0, opacity: 1, ease: "power3.out" });

    gsap.fromTo(".footer", { y: 100, opacity: 0 }, { duration: 1.5, y: 0, opacity: 1, ease: "power3.out", delay: 0.5 });
  }, []);

  return (
    <div className="calendar-container  items-center flex flex-col">
      <div className="flex flex-col Calender overflow-hidden bg-white lg:w-[1300px] md:rounded-[40px] lg:flex-row gap-6">
        {renderCalendar(currentMonth, true, false)}
        {renderCalendar(nextMonth, false, true)}
      </div>

      <button onClick={() => setOpenCalender(false)} className="absolute right-5 top-4 text-[36px]">
       <Close/>
      </button>

      <div className="footer -mt-10 border-2 border-gray-200 bg-[#ffcc00] w-full py-10">
        <div className="content flex flex-wrap gap-10 justify-between items-center">
          <div className="flex dates bg-white px-10 py-4 rounded-full flex-wrap  gap-8">
            {/* Check-In Date */}
            <Icon name="calendar" className="h-6 w-6 text-[#006167]" />

            <div className={`flex flex-col ${confirmClicked && !checkIn ? 'text-red-500' : 'text-gray-700'}`}>
              <span className="font-semibold text-[18px]">
                {checkIn ? ` ${format(checkIn, "dd MMM , EEEE")}` : "Check in"}
              </span>
            </div>
            <ArrowRightAlt className="text-yellow-400" />

            {/* Check-Out Date */}
            <div className={`flex flex-col ${confirmClicked && !checkOut ? 'text-red-500' : 'text-gray-700'}`}>
              <span className="font-semibold text-[18px]">
                {checkOut ? `${format(checkOut, "dd MMM , EEEE")}` : "Check-out"}
              </span>
            </div>

            {/* Nights Display */}
            {checkIn && checkOut && (
              <span className="flex justify-center items-center rounded-full border-2 px-4">
                {calculateNights()}
              </span>
            )}
          </div>
          <GuestsDropdown dropdownDirection="up" />


          {/* Confirm Button */}
          <div className="flex items-center  flex-wrap gap-6 md:gap-10">

            <button onClick={handleConfirmClick} className="confirm-btn font-bold bg-[#006167] text-white px-4 py-2 rounded-full">
              Confirm
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Calendar;
