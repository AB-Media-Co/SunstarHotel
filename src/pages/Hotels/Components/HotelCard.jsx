/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../../../Components/Icons";
import Calendar from "../../../Components/Calendar";
import { ArrowRightAlt } from "@mui/icons-material";
import {
  format, differenceInCalendarDays,
} from "date-fns";
import { usePricing } from "../../../Context/PricingContext";
import { useNavigate } from "react-router-dom";

const tabs = [
  { iconName: "roundedbed", label: "Rooms", link: "#rooms", id: "rooms" },
  { iconName: "lamp", label: "Amenities", link: "#amenities", id: "amenities" },
  { iconName: "message", label: "Reviews", link: "#reviews", id: "reviews" },
  { iconName: "location", label: "Location", link: "#location", id: "location" },
  { iconName: "faqs", label: "FAQs", link: "#faqs", id: "faqs" },
];

const tabs2 = [
  { iconName: "roundedbed", label: "Rooms", link: "#rooms", id: "rooms" },

  { iconName: "lamp", label: "Amenities", link: "#amenities", id: "amenities" },
  { iconName: "message", label: "Reviews", link: "#reviews", id: "reviews" },
  { iconName: "location", label: "Location", link: "#location", id: "location" },
  { iconName: "faqs", label: "FAQs", link: "#faqs", id: "faqs" },
];

function HotelCard({ hotelData, setOpenCalender, openCalender }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [isItemFixed, setItemFixed] = useState(false);
  const [isTopSectionHidden, setIsTopSectionHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const { selectedRooms } = usePricing();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    if (storedCheckIn && storedCheckOut) {
      setCheckIn(storedCheckIn);
      setCheckOut(storedCheckOut);
    }
  }, []);

  useEffect(() => {
    let rafId = null;

    const sectionIds = tabs.map(t => t.id);
    const getSections = () =>
      sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const computeActiveFromMiddle = () => {
      const sections = getSections();
      if (!sections.length) return;

      const viewportMiddle = window.scrollY + window.innerHeight / 2;

      // Find the section whose vertical range contains viewport middle
      let foundIndex = null;
      sections.forEach((section, idx) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (viewportMiddle >= top && viewportMiddle < bottom) {
          foundIndex = idx;
        }
      });

      // Fallback: choose the section whose center is closest to viewport middle
      if (foundIndex === null) {
        let closestIdx = 0;
        let closestDist = Infinity;
        sections.forEach((section, idx) => {
          const center = section.offsetTop + section.offsetHeight / 2;
          const dist = Math.abs(center - viewportMiddle);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = idx;
          }
        });
        foundIndex = closestIdx;
      }

      if (foundIndex !== null && foundIndex !== activeTab) {
        setActiveTab(foundIndex);
      }

      // Sticky header toggle
      setItemFixed(window.scrollY > 600);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeActiveFromMiddle);
    };

    // Initial compute (covers "from the start" not active issue)
    computeActiveFromMiddle();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [activeTab]);


  useEffect(() => {
    if (openCalender) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCalender]);

  const handleBooking = () => {
    if (selectedRooms?.length > 0) {
      navigate("/room/details");
    } else {
      window.location.href = "#rooms";
    }
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      return (
        <div>
          ({differenceInCalendarDays(new Date(checkOut), new Date(checkIn))}{" "}
          Nights)
        </div>
      );
    }
    return 0;
  };

  // console.log(hotelData)

  const renderTabItem = (tab, index, isMobile = false) => (
    <a
      key={index}
      href={tab.link}
      onClick={() => setActiveTab(index)}
      className={`flex flex-col items-center cursor-pointer transition-colors duration-300 text-center ${isMobile ? 'min-w-[80px] flex-shrink-0' : 'min-w-0'}
        ${activeTab === index ? "text-[#FDC114]" : "text-primary-green"}
      `}
    >
      <Icon
        name={tab.iconName}
        className={`h-7 w-7 md:h-6 md:w-6 transition-all duration-300 mb-1
          ${activeTab === index ? "text-[#FDC114]" : "text-primary-green"}
        `}
        styleCss={{
          filter:
            activeTab === index
              ? "brightness(0) saturate(100%) invert(100%) brightness(50%) sepia(100%) saturate(800%) hue-rotate(20deg) contrast(110%)"
              : "none",
          transition: "filter 300ms ease-in-out"
        }}
      />

      <span
        className={`text-xs md:text-sm font-medium transition-colors duration-300 leading-tight
          ${activeTab === index ? "text-[#FDC114]" : "text-gray-500"}
        `}
      >
        {tab.label}
      </span>
    </a>
  );

  return (
    <>
      <div
        className={`bg-primary-white rounded-md shadow-lg -mt-6 
          z-10 flex flex-col items-center gap-3 md:gap-6 border border-gray-200
          transition-all duration-700 w-full ease-in-out will-change-transform
          ${isItemFixed
            ? "fixed top-0 right-0 left-0 pt-2 md:pt-4 z-50 opacity-100 transform translate-y-0 scale-100"
            : "relative opacity-100 py-2 md:py-2 transform translate-y-[-10px]"
          }
          ${isTopSectionHidden
            ? "opacity-0 transform -translate-y-full scale-95"
            : "opacity-100 transform translate-y-0 scale-100"
          } 
        `}
        style={{
          visibility: isTopSectionHidden ? "hidden" : "visible",
          transitionProperty: "transform, opacity, scale",
          transitionDuration: "700ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "top",
          willChange: "transform, opacity, scale"
        }}
      >
        <div className="w-full flex py-2 md:py-3 max-w-6xl flex-col items-center px-2 md:px-4">
          {/* Top Section: Dates and Guests - Non-fixed state */}
          <div className={`gap-2 justify-center ${isItemFixed ? 'hidden' : "flex"} items-center w-full`}>
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center justify-between w-full">
              <div className="w-full md:w-auto">
                <div
                  onClick={() => setOpenCalender(true)}
                  className="flex flex-row cursor-pointer items-center justify-center border w-full md:w-auto bg-white px-3 py-2 md:px-8 md:py-4 rounded-full gap-2 md:gap-3 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon name="calendar" className="w-4 h-4 md:w-6 md:h-6 text-primary-green flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-xs md:text-base text-gray-700 truncate">
                      {checkIn ? format(new Date(checkIn), "dd MMM, EEE") : "Check in"}
                    </span>
                  </div>
                  <ArrowRightAlt className="text-yellow-500 flex-shrink-0" sx={{ fontSize: { xs: 16, md: 24 } }} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-xs md:text-base text-gray-700 truncate">
                      {checkOut ? format(new Date(checkOut), "dd MMM, EEE") : "Check-out"}
                    </span>
                  </div>
                  {checkIn && checkOut && (
                    <span className="flex items-center text-gray-700 justify-center text-xs md:text-base rounded-full border border-gray-300 px-2 py-1 whitespace-nowrap">
                      {calculateNights()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full">

                <button
                  onClick={handleBooking}
                  className="bg-primary-green text-primary-white text-sm md:text-xl font-medium rounded-xl md:rounded-full py-3 md:py-2 px-6 md:px-10 shadow-md hover:bg-opacity-90 transition-colors duration-300 w-full md:w-auto"
                >
                  {selectedRooms?.length > 0 ? "Continue" : "Select"}
                </button>
              </div>

            </div>
          </div>

          {/* Fixed header content */}
          <div className={`${isItemFixed ? 'flex' : "hidden"} flex-col md:flex-row gap-3 md:gap-8 items-center w-full`}>
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 mt-4 md:mt-0 items-center w-full">
              <div className="w-full md:w-auto">
                <div
                  onClick={() => setOpenCalender(true)}
                  className="flex cursor-pointer items-center justify-center w-full md:w-[350px] p-2 md:p-3 bg-white border rounded-full shadow-sm gap-2 md:gap-3 transition-shadow duration-300"
                >
                  <Icon name="calendar" className="w-4 h-4 md:w-6 md:h-6 text-primary-green flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-xs md:text-base text-gray-700 truncate">
                      {checkIn ? format(new Date(checkIn), "dd MMM") : "Check in"}
                    </span>
                  </div>
                  <ArrowRightAlt className="text-yellow-500 flex-shrink-0" sx={{ fontSize: { xs: 16, md: 24 } }} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-xs md:text-base text-gray-700 truncate">
                      {checkOut ? format(new Date(checkOut), "dd MMM") : "Check-out"}
                    </span>
                  </div>
                  {checkIn && checkOut && (
                    <span className="flex items-center text-gray-700 justify-center text-xs md:text-base px-2 py-1 whitespace-nowrap">
                      {calculateNights()}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="bg-primary-green md:hidden text-primary-white text-sm font-medium rounded-xl py-2 px-6 shadow-md hover:bg-opacity-90 transition-colors duration-300 w-full"
              >
                {selectedRooms?.length > 0 ? "Continue" : "Select"}
              </button>

              {/* Navigation tabs in fixed header - Mobile */}
              <div className="flex items-center gap-4 w-full md:hidden overflow-x-auto scrollbar-hide px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {tabs2.map((tab, index) => renderTabItem(tab, index, true))}
              </div>

              {/* Navigation tabs in fixed header - Desktop */}
              <div className="hidden md:flex justify-between items-center gap-4 w-full ">
                {tabs2.map((tab, index) => renderTabItem(tab, index))}
              </div>

              <button
                onClick={handleBooking}
                className="bg-primary-green hidden md:block text-primary-white text-xl font-medium rounded-full py-2 px-10 shadow-md hover:bg-opacity-90 transition-colors duration-300"
              >
                {selectedRooms?.length > 0 ? "Continue" : "Select"}
              </button>
            </div>
          </div>

          {/* Regular navigation tabs */}
          <div
            className={`items-center mt-4 md:mt-6 gap-2 md:gap-4 w-full transition-opacity duration-300 ease-in-out
              ${isItemFixed ? "opacity-0 h-0 overflow-hidden hidden" : "opacity-100 flex justify-between md:justify-between overflow-x-auto md:overflow-visible scrollbar-hide px-2 md:px-0"}
            `}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {tabs.map((tab, index) => renderTabItem(tab, index, true))}
          </div>
        </div>
      </div>

      {openCalender && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 p-4">
          <Calendar
            setCheckInDate={setCheckIn}
            setCheckOutDate={setCheckOut}
            setOpenCalender={setOpenCalender}
          />
        </div>
      )}

      <div className="bg-white content">
        {/* Optional Image Section */}
        {hotelData?.image && (
          <div className="relative">
            <img
              src={hotelData.image}
              alt={`${hotelData?.name} image`}
              className="w-full h-48 object-cover"
            />
            {hotelData?.price && hotelData?.discountedPrice && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {Math.round(
                  ((hotelData.price - hotelData.discountedPrice) / hotelData.price) * 100
                )}
                % OFF
              </div>
            )}
          </div>
        )}

        <div className="p-3 md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 items-start md:items-center gap-4">
            {/* Hotel Name + Price (span 2 on tablet/desktop) */}
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <div className="flex justify-between">
                <div className="min-w-0">
                  <h2 className="text-mobile/h5 md:text-desktop/h3 text-gray-800 leading-tight">
                    {hotelData?.name}
                  </h2>
                  <div className="text-sm font-medium text-teal-500 mt-1">
                    <a className="hover:underline">Book Direct for Lowest Prices!</a>
                  </div>
                </div>

                <div className="flex gap-2 md:hidden justify-end items-center">
                  <img src="/images/tripadvisor-logo.svg" alt="" className="h-4" />
                  <p className="text-teal-500 text-md md:text-2xl font-bold whitespace-nowrap leading-none">{hotelData?.rating}.0</p>

                </div>

              </div>

              <div className="flex flex-col items-start md:items-center">
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span className="text-teal-500 text-xl md:text-2xl font-bold whitespace-nowrap leading-none">
                    {/* Already using Indian format */}
                    ₹&nbsp;{Number(hotelData?.price ?? 0).toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm md:text-base font-normal text-gray-600 whitespace-nowrap">
                    / night
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Incl. taxes</p>
              </div>
            </div>

            {/* Check-In/Check-Out chip (right on tablet/desktop) */}
            <div className="col-span-1 md:justify-self-end">
              <div className="md:flex gap-2 hidden justify-end items-center">
                <img src="/images/tripadvisor-logo.svg" alt="" className="h-6" />
                <p className="text-teal-500 text-xl md:text-2xl font-bold whitespace-nowrap leading-none">{hotelData?.rating}.0</p>

              </div>
              <div className="text-xs md:text-sm bg-teal-100 text-[#058FA2] font-medium rounded-full py-2 px-3 md:px-4 flex flex-wrap gap-x-2 gap-y-1 items-center justify-center shadow-sm">
                <span className="whitespace-nowrap">
                  Check-In <span className="font-bold text-teal-800">{hotelData?.checkIn}</span>
                </span>
                <span className="hidden md:inline">|</span>
                <span className="whitespace-nowrap">
                  Check-Out <span className="font-bold text-teal-800">{hotelData?.checkOut}</span>
                </span>
              </div>
            </div>
          </div>

          <hr className="mt-4 border-gray-300" />
        </div>

      </div>
    </>
  );
}

export default HotelCard;