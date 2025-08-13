/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../../../Components/Icons";
import Calendar from "../../../Components/Calendar";
import { ArrowRightAlt } from "@mui/icons-material";
import {
  format,differenceInCalendarDays,
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
    let timeout;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      clearTimeout(timeout);
  
      timeout = setTimeout(() => {
        setItemFixed(currentScrollPos > 600);
      }, 50);
      setItemFixed(currentScrollPos > 600);

      const sections = tabs.map(tab => document.getElementById(tab.id));
      let activeIndex = null;
      
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 || (index === sections.length - 1 && rect.bottom <= window.innerHeight)) {
            activeIndex = index;
          }
        }
      });
      
      if (activeIndex !== null && activeIndex !== activeTab) {
        setActiveTab(activeIndex);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, tabs]);

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

  const renderTabItem = (tab, index, isMobile = false) => (
    <a
      key={index}
      href={tab.link}
      onClick={() => setActiveTab(index)}
      className={`flex flex-col items-center cursor-pointer transition-colors duration-300 text-center min-w-0
        ${activeTab === index ? "text-[#FDC114]" : "text-primary-green"}
      `}
    >
      <Icon
        name={tab.iconName}
        className={`h-5 w-5 md:h-6 md:w-6 transition-all duration-300 mb-1
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
              
              <button
                onClick={handleBooking}
                className="bg-primary-green text-primary-white text-sm md:text-xl font-medium rounded-xl md:rounded-full py-3 md:py-2 px-6 md:px-10 shadow-md hover:bg-opacity-90 transition-colors duration-300 w-full md:w-auto"
              >
                {selectedRooms?.length > 0 ? "Continue" : "Select"}
              </button>
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
              <div className="flex justify-between items-center gap-1 w-full md:hidden overflow-x-auto">
                {tabs2.map((tab, index) => renderTabItem(tab, index + 1, true))}
              </div>

              {/* Navigation tabs in fixed header - Desktop */}
              <div className="hidden md:flex justify-between items-center gap-4 w-full">
                {tabs2.map((tab, index) => renderTabItem(tab, index + 1))}
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
            className={`justify-between items-center mt-4 md:mt-6 gap-2 md:gap-4 w-full transition-opacity duration-300 ease-in-out
              ${isItemFixed ? "opacity-0 h-0 overflow-hidden hidden" : "opacity-100 flex"}
            `}
          >
            {tabs.map((tab, index) => renderTabItem(tab, index))}
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
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
            {/* Hotel Name and Price Section */}
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-5">
              <div className="min-w-0">
                <h2 className="text-lg md:text-2xl font-bold text-gray-800 leading-tight">
                  {hotelData?.name}
                </h2>
                <div className="text-sm font-medium text-teal-500 mt-1">
                  <a className="hover:underline">
                    Book Direct for Lowest Prices!
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col items-start md:items-center">
                <div className="flex gap-2 md:gap-4 items-baseline">
                  <span className="text-teal-500 text-xl md:text-2xl font-bold">
                    ₹ {hotelData?.price}
                  </span>
                  <span className="text-sm md:text-base font-normal text-gray-600">
                    / night
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Incl. taxes</p>
              </div>
            </div>
            
            {/* Check-In/Check-Out Section */}
            <div className="text-xs md:text-sm bg-teal-100 text-[#058FA2] font-medium rounded-full py-2 px-3 md:px-4 flex items-center justify-center shadow-sm">
              <span className="whitespace-nowrap">
                Check-In{" "}
                <span className="font-bold text-teal-800">{hotelData?.checkIn}</span>
              </span>
              <span className="mx-2">|</span>
              <span className="whitespace-nowrap">
                Check-Out{" "}
                <span className="font-bold text-teal-800">
                  {hotelData?.checkOut}
                </span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <hr className="mt-4 border-gray-300" />
        </div>
      </div>
    </>
  );
}

export default HotelCard;
