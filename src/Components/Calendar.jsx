/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import { useRooms, useMonthlyRates } from "../ApiHooks/useRoomsHook";
import { usePricing } from "../Context/PricingContext";
import { getSingleHotelWithCode } from "../ApiHooks/useHotelHook2";
import { generateHotelUrl, extractHotelCode } from "../utils/urlHelper";

/** -------------------- Memoized Month -------------------- */
const CalendarMonth = React.memo(function CalendarMonth({
  month,
  allowPrev,
  allowNext,
  onPrev,
  onNext,
  daysInWeek,
  checkIn,
  checkOut,
  hoverDate,
  onDayClick,
  onDayHover,
  monthlyRates,
  isLoading,
}) {
  const startDate = useMemo(() => startOfWeek(startOfMonth(month)), [month]);
  const totalDays = 42;
  const days = useMemo(() => Array.from({ length: totalDays }, (_, i) => addDays(startDate, i)), [startDate]);
  const today = useMemo(() => startOfDay(new Date()), []);

  return (
    <div className="w-full lg:w-[48%] flex flex-col gap-4 relative p-4">
      <div className="flex items-center justify-between px-2">
        {allowPrev ? (
          <button
            onClick={onPrev}
            className={`hidden md:flex w-10 h-10 items-center justify-center rounded-full text-white shadow-md transition hover:scale-105 ${isSameMonth(month, new Date()) ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-primary-green"
              }`}
            disabled={isSameMonth(month, new Date())}
            aria-label="Previous month"
          >
            <ArrowBackIosNew style={{ width: 16, height: 16 }} />
          </button>
        ) : (
          <span className="w-10" />
        )}

        <h2 className="font-bold text-xl md:text-2xl text-primary-green text-center w-full">
          {format(month, "MMMM yyyy")}
        </h2>

        {allowNext ? (
          <button
            onClick={onNext}
            className="hidden md:flex w-10 h-10 items-center justify-center rounded-full text-white bg-primary-green shadow-md transition hover:scale-105"
            aria-label="Next month"
          >
            <ArrowForwardIos style={{ width: 16, height: 16 }} />
          </button>
        ) : (
          <span className="w-10" />
        )}
      </div>

      <div className="px-1 md:px-4">
        <div className="grid grid-cols-7 text-sm md:text-base text-center font-medium text-gray-500 pb-2 border-b border-gray-100">
          {daysInWeek.map((d, i) => (
            <div key={i} className="py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-2 sm:gap-y-3 pt-2">
          {days.map((day, i) => {
            const inCurrent = format(day, "M") === format(month, "M");
            const isRangeStart = inCurrent && checkIn && isSameDay(day, checkIn);
            const isRangeEnd = inCurrent && checkOut && isSameDay(day, checkOut);
            const isHovered = hoverDate && checkIn && !checkOut && inCurrent && isAfter(day, checkIn) && isBefore(day, hoverDate);
            const inRange = inCurrent && checkIn && checkOut && isAfter(day, checkIn) && isBefore(day, checkOut);
            const isPastDate = isBefore(day, today);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={i}
                className={`flex items-center justify-center h-10 sm:h-12 relative transition ${inCurrent ? "" : "opacity-0"
                  } ${isRangeStart ? "bg-primary-green rounded-l-full z-10" : ""} ${isRangeEnd ? "bg-primary-green rounded-r-full z-10" : ""
                  } ${inRange || isHovered ? "bg-primary-green/20" : ""} ${isPastDate ? "text-gray-300 cursor-not-allowed" : inCurrent ? "hover:bg-primary-green/10 cursor-pointer" : ""
                  } ${isToday && !isRangeStart ? "ring-2 ring-primary-green/30 ring-inset" : ""}`}
                onClick={() => inCurrent && !isPastDate && onDayClick(day)}
                onMouseEnter={() => inCurrent && !isPastDate && onDayHover(day)}
              >
                {inCurrent && (
                  <div
                    className={`flex flex-col items-center justify-center w-full h-full rounded-md text-sm md:text-base font-medium ${isRangeStart || isRangeEnd ? "bg-primary-green text-white scale-110 shadow-md z-20" : inRange || isHovered ? "text-primary-green" : ""
                      }`}
                  >
                    <span>{format(day, "d")}</span>
                    {isLoading ? (
                      <div className="flex gap-0.5 mt-1">
                        <div className="w-1 h-1 bg-primary-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1 h-1 bg-primary-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1 h-1 bg-primary-green rounded-full animate-bounce"></div>
                      </div>
                    ) : monthlyRates && monthlyRates[format(day, "yyyy-MM-dd")] && !isPastDate && (
                      <div className="flex flex-col items-center leading-none mt-0.5">
                        <span className={`text-[9px] md:text-[10px] items-center flex font-bold ${isRangeStart || isRangeEnd ? "text-white" : "text-black"}`}>
                          ₹{Math.round(monthlyRates[format(day, "yyyy-MM-dd")].price)}
                        </span>
                        {monthlyRates[format(day, "yyyy-MM-dd")].available > 0 && (
                          <span className={`text-[8px] mt-[1px] ${isRangeStart || isRangeEnd ? "text-green-100" : "text-green-600"} font-medium`}>
                            {monthlyRates[format(day, "yyyy-MM-dd")].available} Rooms
                          </span>
                        )}
                        {monthlyRates[format(day, "yyyy-MM-dd")].soldOut && (
                          <span className={`text-[8px] mt-[1px] ${isRangeStart || isRangeEnd ? "text-red-200" : "text-red-500"}`}>
                            Sold Out
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

/** -------------------- Main Calendar -------------------- */
const Calendar = ({ setCheckInDate, setCheckOutDate, setOpenCalender, hotelCode }) => {
  // console.log(hotelCode ? `Calendar mounted for hotelCode: ${hotelCode}` : "Calendar mounted without specific hotelCode");
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const nextMonth = useMemo(() => addMonths(currentMonth, 1), [currentMonth]);
  const { closeHotelModal, setNights } = usePricing();

  const [authkey, setAuthkey] = useState(null);

  const location = useLocation();
  // console.log(location);
  // Get from query params (like ?hotelCode=14494)
  const params = new URLSearchParams(location.search);
  let hotelCode2 = params.get("hotelCode");

  // If not present in query, try extracting from pathname (/hotels/14494-hotel-name or /hotels/14494)
  if (!hotelCode2 && location.pathname.startsWith("/hotels/")) {
    // split by "/", take the 2nd segment after "hotels"
    const parts = location.pathname.split("/");
    if (parts.length > 2) {
      hotelCode2 = extractHotelCode(parts[2]);
    }
  }


  useEffect(() => {
    const existing = localStorage.getItem("hotelInfo");
    if (existing || !hotelCode2) return;

    // console.log("Fetching hotel info for code:", hotelCode2);
    (async () => {
      try {
        const data = await getSingleHotelWithCode(hotelCode2);
        localStorage.setItem("hotelInfo", JSON.stringify(data?.hotel));
        setAuthkey(data?.hotel?.authKey)
        // console.log("✅ Hotel info saved to localStorage:", data);
      } catch (err) {
        console.error("❌ Failed to fetch hotel info:", err);
      }
    })();
  }, [hotelCode2]);



  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [hoverDate, setHoverDate] = useState(null);

  const [showLongStayPopup, setShowLongStayPopup] = useState(false);
  const popupRef = useRef(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const daysInWeek = useMemo(() => ["S", "M", "T", "W", "T", "F", "S"], []);
  const today = useMemo(() => startOfDay(new Date()), []);

  // Read hotel info once
  const hotelInfo = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("hotelInfo") || "null");
    } catch {
      return null;
    }
  }, []);

  // console.log("Using hotelCode:", hotelCode ?? hotelInfo?.hotelCode ?? hotelCode2 ?? "none");
  // console.log("Using authKey:", hotelInfo )


  // Restore dates: INVALID past selections are cleared (no auto-clamp to today/tomorrow)
  useEffect(() => {
    const storedIn = localStorage.getItem("checkInDate");
    const storedOut = localStorage.getItem("checkOutDate");

    const parseYmd = (s) => (s ? startOfDay(new Date(s)) : null);
    const inDate = parseYmd(storedIn);
    const outDate = parseYmd(storedOut);
    const today = startOfDay(new Date());

    // invalid if: missing either, in the past, checkout not after checkin, or checkout in/past today
    const invalid =
      !inDate ||
      !outDate ||
      isBefore(inDate, today) ||
      !isAfter(outDate, inDate) ||
      !isAfter(outDate, today); // prevents "today/tomorrow" from sticking when user returns days later

    if (invalid) {
      // clear everything — no preselects
      setCheckIn(null);
      setCheckOut(null);
      try {
        localStorage.removeItem("checkInDate");
        localStorage.removeItem("checkOutDate");
      } catch { }
      setCurrentMonth(startOfMonth(today));
      return;
    }

    // valid saved range — keep it
    setCheckIn(inDate);
    setCheckOut(outDate);
    setCurrentMonth(startOfMonth(inDate));
  }, []);


  // Popup + container animations
  useEffect(() => {
    if (showLongStayPopup && popupRef.current) {
      gsap.fromTo(popupRef.current, { opacity: 0, y: -20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
    }
  }, [showLongStayPopup]);

  useEffect(() => {
    gsap.fromTo(".Calender", { x: 300, opacity: 0 }, { duration: 0.8, x: 0, opacity: 1, ease: "power3.out" });
    gsap.fromTo(".footer", { y: 50, opacity: 0 }, { duration: 0.8, y: 0, opacity: 1, ease: "power3.out", delay: 0.3 });
  }, []);

  // Derived params
  const effectiveHotelCode = hotelCode ?? hotelInfo?.hotelCode ?? hotelCode2 ?? null;
  const authKey = hotelInfo?.authKey ?? authkey ?? null;
  const start = useMemo(() => (checkIn ? format(checkIn, "yyyy-MM-dd") : null), [checkIn]);
  const end = useMemo(() => (checkOut ? format(checkOut, "yyyy-MM-dd") : null), [checkOut]);
  const shouldFetch = Boolean(effectiveHotelCode && authKey && start && end);

  // --- Use YOUR hook, with `enabled` guard + caching tuned ---
  const roomsQuery = useRooms(effectiveHotelCode, authKey, start, end, {
    enabled: shouldFetch,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: 1,
  });

  // Fetch monthly rates for 3 months
  const currentMonthStr = format(currentMonth, "yyyy-MM");
  const nextMonthStr = format(nextMonth, "yyyy-MM");
  const nextNextMonth = useMemo(() => addMonths(currentMonth, 2), [currentMonth]);
  const nextNextMonthStr = format(nextNextMonth, "yyyy-MM");

  const { data: currentMonthRates, isLoading: isLoadingCurrent } = useMonthlyRates(effectiveHotelCode, authKey, currentMonthStr, {
    enabled: Boolean(effectiveHotelCode && authKey),
  });

  const { data: nextMonthRates, isLoading: isLoadingNext } = useMonthlyRates(effectiveHotelCode, authKey, nextMonthStr, {
    enabled: Boolean(effectiveHotelCode && authKey),
  });

  const { data: nextNextMonthRates } = useMonthlyRates(effectiveHotelCode, authKey, nextNextMonthStr, {
    enabled: Boolean(effectiveHotelCode && authKey),
  });

  // Combine rates into one object for easier lookup
  const combinedRates = useMemo(() => ({
    ...(currentMonthRates?.data || {}),
    ...(nextMonthRates?.data || {}),
    ...(nextNextMonthRates?.data || {})
  }), [currentMonthRates, nextMonthRates, nextNextMonthRates]);

  const onDayClick = useCallback(
    (day) => {
      if (!checkIn || (checkIn && checkOut)) {
        setCheckIn(day);
        setCheckOut(null);
        setShowLongStayPopup(false);
      } else if (isBefore(day, checkIn)) {
        setCheckIn(day);
        setShowLongStayPopup(false);
      } else {
        const daysDiff = differenceInCalendarDays(day, checkIn);
        setCheckOut(day);
        setShowLongStayPopup(daysDiff > 30);
      }
    },
    [checkIn, checkOut]
  );

  const onDayHover = useCallback((day) => {
    if (checkIn && !checkOut) setHoverDate(day);
  }, [checkIn, checkOut]);

  const handlePrev = useCallback(() => setCurrentMonth((m) => addMonths(m, -1)), []);
  const handleNext = useCallback(() => setCurrentMonth((m) => addMonths(m, 1)), []);

  const calculateNights = useCallback(() => {
    if (checkIn && checkOut) {
      const n = differenceInCalendarDays(checkOut, checkIn);
      return n === 1 ? "1 Night" : `${n} Nights`;
    }
    return "";
  }, [checkIn, checkOut]);

  const handleConfirmClick = useCallback(async () => {
    if (confirmClicked) {
      console.log("Confirm already clicked — ignoring duplicate click");
      return;
    }

    // console.log("Confirm button clicked");
    setConfirmClicked(true);

    try {
      if (!checkIn || !checkOut) {
        console.warn("Missing check-in or check-out date");
        return;
      }

      if (isAfter(checkIn, checkOut)) {
        console.warn("Invalid date range: check-in is after check-out");
        return;
      }

      const startStr = format(checkIn, "yyyy-MM-dd");
      const endStr = format(checkOut, "yyyy-MM-dd");

      // console.log("Selected Dates:", { checkIn: startStr, checkOut: endStr });

      setCheckInDate(startStr);
      setCheckOutDate(endStr);

      try {
        localStorage.setItem("checkInDate", startStr);
        localStorage.setItem("checkOutDate", endStr);

        const daysDiff = differenceInCalendarDays(checkOut, checkIn);
        localStorage.setItem("days", daysDiff);
        if (setNights) setNights(daysDiff);

        // console.log("Dates saved to localStorage");
      } catch (storageErr) {
        console.warn("Failed to save dates to localStorage:", storageErr);
      }

      const code = effectiveHotelCode;
      if (!code) {
        console.warn("No hotel code found — cannot proceed");
        return;
      }

      console.log("Fetching rooms for hotel:", code);

      // Ensure cache for target route (uses same key + same axios call)
      await queryClient.ensureQueryData({
        queryKey: ["rooms", code, authKey, startStr, endStr],
        queryFn: async ({ signal }) => {
          // console.log("→ API Request: /api/ezee/syncedRooms", {
          //   hotelCode: code,
          //   authCode: authKey,
          //   fromDate: startStr,
          //   toDate: endStr,
          // });
          const res = await axiosInstance.get("/api/ezee/syncedRooms", {
            params: {
              hotelCode: code,
              authCode: authKey,
              fromDate: startStr,
              toDate: endStr,
            },
            signal,
          });
          console.log("← API Response:", res.data);
          return res.data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
      });

      // console.log("Data pre-fetched and cached — navigating to:", generateHotelUrl(code, hotelInfo?.name));

      // Navigate first for immediate transition
      navigate(generateHotelUrl(code, hotelInfo?.name));

      // Then close modals (happens after navigation starts)
      setOpenCalender(false);
      closeHotelModal();
    } catch (err) {
      console.error("Confirm error:", err);
    } finally {
      setConfirmClicked(false);
    }
  }, [
    closeHotelModal,
    confirmClicked,
    checkIn,
    checkOut,
    setCheckInDate,
    setCheckOutDate,
    effectiveHotelCode,
    authKey,
    queryClient,
    navigate,
    setOpenCalender,
  ]);


  return (
    <div className="calendar-container flex flex-col justify-start md:justify-end relative">
      {/* Main Calendar */}
      <div className="Calender flex flex-col bg-white lg:w-[95%] w-full md:p-6 lg:flex-row gap-6 shadow-lg md:rounded-t-xl overflow-y-auto max-h-[85vh]">
        {/* Long Stay Popup */}
        {showLongStayPopup && (
          <div
            ref={popupRef}
            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-5 md:p-6 w-[320px] md:w-[360px] max-w-[90%]"
          >
            <div className="flex flex-col items-center text-start">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-green/10 rounded-full flex items-center justify-center mb-3">
                <Icon name="calendar" className="w-6 h-6 md:w-7 md:h-7 text-primary-green" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary-dark-green mb-2">Planning a long stay?</h3>
              <p className="text-gray-600 text-sm md:text-base mb-4">
                Currently, we don't support online bookings for more than 30 nights. However, you can tell us about your plans and we'll make it happen.
              </p>
              <div className="flex justify-between w-full items-center">
                <button
                  type="button"
                  className="text-primary-yellow w-full font-bold text-left"
                  onClick={() => (window.location.href = "/booking-form")}
                >
                  Get in touch
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 w-full text-right text-sm font-medium"
                  onClick={() => {
                    localStorage.removeItem("checkInDate");
                    localStorage.removeItem("checkOutDate");
                    setCheckIn(null);
                    setCheckOut(null);
                    setShowLongStayPopup(false);
                  }}
                >
                  Continue selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Overlay */}
        {showLongStayPopup && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setShowLongStayPopup(false)} />
        )}

        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between px-4 pt-4 md:hidden">
            <button
              onClick={handlePrev}
              className={`flex w-8 h-8 items-center justify-center rounded-full ${isSameMonth(currentMonth, new Date()) ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "text-white bg-primary-green"
                }`}
              disabled={isSameMonth(currentMonth, new Date())}
              aria-label="Previous month"
            >
              <ArrowBackIosNew style={{ width: 12, height: 12 }} />
            </button>
            <h2 className="font-bold text-lg text-primary-green">Select your stay dates</h2>
            <button
              onClick={handleNext}
              className="flex w-8 h-8 items-center justify-center rounded-full text-white bg-primary-green"
              aria-label="Next month"
            >
              <ArrowForwardIos style={{ width: 12, height: 12 }} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-6">
            <CalendarMonth
              month={currentMonth}
              allowPrev
              allowNext={false}
              onPrev={handlePrev}
              onNext={handleNext}
              daysInWeek={daysInWeek}
              checkIn={checkIn}
              checkOut={checkOut}
              hoverDate={hoverDate}
              onDayClick={onDayClick}
              onDayHover={onDayHover}
              monthlyRates={combinedRates}
              isLoading={isLoadingCurrent}
            />
            <CalendarMonth
              month={nextMonth}
              allowPrev={false}
              allowNext
              onPrev={handlePrev}
              onNext={handleNext}
              daysInWeek={daysInWeek}
              checkIn={checkIn}
              checkOut={checkOut}
              hoverDate={hoverDate}
              onDayClick={onDayClick}
              onDayHover={onDayHover}
              monthlyRates={combinedRates}
              isLoading={isLoadingNext}
            />
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
      <div className="footer fixed md:sticky bottom-0 left-0 z-40 bg-white w-full px-4 md:px-8 py-4 md:py-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="flex items-center w-full md:w-auto md:max-w-[60%] bg-gray-50 px-4 py-3 md:px-6 md:py-4 rounded-xl gap-3 shadow-md">
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
              <div className="ml-2 flex items-center justify-center text-xs md:text-sm font-medium text-primary-green bg-primary-green/10 rounded-full px-3 py-1">
                {calculateNights()}
              </div>
            )}
          </div>

          <button
            onClick={handleConfirmClick}
            disabled={!checkIn || !checkOut || showLongStayPopup || confirmClicked}
            className={`w-full md:w-auto font-bold text-white px-6 py-3 md:py-4 rounded-xl shadow-lg transition ${!checkIn || !checkOut || showLongStayPopup || confirmClicked
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary-dark-green hover:bg-primary-green"
              }`}
          >
            {confirmClicked ? "Loading…" : "Confirm Dates"}
          </button>
        </div>

        {/* Optional tiny status line */}
        {roomsQuery.isError && shouldFetch && (
          <p className="text-red-600 text-xs mt-2">Could not load availability. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
