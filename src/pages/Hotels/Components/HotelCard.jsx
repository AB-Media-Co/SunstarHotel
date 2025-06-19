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
function HotelCard({ hotelData,setOpenCalender, openCalender }) {

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // Tracks the active tab index
  const [isItemFixed, setItemFixed] = useState(false);
  const [isTopSectionHidden, setIsTopSectionHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const { selectedRooms } = usePricing();
  const navigate = useNavigate();

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

  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    if (storedCheckIn && storedCheckOut) {
      setCheckIn(storedCheckIn);
      setCheckOut(storedCheckOut);
    }
  }, []);

  // Handle scroll and update active section
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      clearTimeout(timeout);
  
      timeout = setTimeout(() => {
        setItemFixed(currentScrollPos > 600);
      }, 50);
      setItemFixed(currentScrollPos > 600);

      // Update active tab based on scroll position
      const sections = tabs.map(tab => document.getElementById(tab.id));
      let activeIndex = null;
      
      // Check which section is currently in view
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Consider a section in view if its top is less than 200px from the top of viewport
          // or if we're seeing the bottom of the section (for the last section)
          if (rect.top <= 200 || (index === sections.length - 1 && rect.bottom <= window.innerHeight)) {
            activeIndex = index;
          }
        }
      });
      
      // Only update if we have a new active section
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
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Ensure overflow is reset on cleanup
    };
  }, [openCalender]);

  const handleBooking = () => {
    if (selectedRooms?.length > 0) {
      navigate("/room/details"); // Open calendar if dates are not selected
    } else {
      window.location.href = "#rooms"; // Navigate to "#rooms" if dates are selected
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

  // Function to render tab items with proper highlighting
  const renderTabItem = (tab, index, isMobile = false) => (
    <a
      key={index}
      href={tab.link}
      onClick={() => setActiveTab(index)}
      className={`flex flex-col sm:flex-row gap-2 items-center cursor-pointer transition-colors duration-300
        ${activeTab === index ? "text-[#FDC114]" : "text-primary-green"}
      `}
    >
      <Icon
        name={tab.iconName}
        className={`h-6 w-6 md:h-8 md:w-8 transition-all duration-300
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
        className={`text-mobile/body/2 md:text-desktop/body/1 font-semibold transition-colors duration-300
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
        className={`bg-primary-white rounded-md shadow-lg  -mt-6 
          z-10 flex flex-col items-center gap-6 border border-gray-200
          transition-all duration-700 w-full  ease-in-out will-change-transform
          ${isItemFixed
            ? "fixed top-0 right-0 left-0 content pt-8 z-50 opacity-100 transform translate-y-0 scale-100"
            : "relative opacity-100 md:py-2 transform translate-y-[-10px] "
          }
          ${isTopSectionHidden
            ? "opacity-0 transform -translate-y-full scale-95"
            : "opacity-100  transform translate-y-0 scale-100"
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
        <div className="w-full flex py-3 max-w-6xl flex-col items-center">
          {/* Top Section: Dates and Guests */}
          <div className={`gap-2 justify-center md:px-4 md:space-x-6 ${isItemFixed ? 'hidden' : "flex"} lg:justify-between items-center w-full md:space-y-0 space-x-0`}>
            <div className="flex gap-4 md:gap-8 items-center justify-between w-full flex-row">
              <div className="flex gap-4">
                <div
                  onClick={() => setOpenCalender(true)}
                  className="flex flex-row cursor-pointer items-center justify-evenly border max-w-full w-full md:w-auto bg-white px-4 py-3 md:px-8 md:py-4 rounded-full gap-3 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon name="calendar" className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
                  <div className={`flex flex-col`}>
                    <span className="font-semibold text-[8px] text-gray-700 md:text-base">
                      {checkIn ? format(new Date(checkIn), "dd MMM, EEEE") : "Check in"}
                    </span>
                  </div>
                  <ArrowRightAlt className="text-yellow-500" />
                  <div className={`flex flex-col`}>
                    <span className="font-semibold text-[8px] text-gray-700 md:text-base">
                      {checkOut ? format(new Date(checkOut), "dd MMM, EEEE") : "Check-out"}
                    </span>
                  </div>
                  {checkIn && checkOut && (
                    <span className="flex items-center text-gray-700 justify-center text-[8px] md:text-base rounded-full border border-gray-300 px-3 md:py-1">
                      {calculateNights()}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleBooking}
                className="bg-primary-green text-primary-white text-mobile/button md:text-desktop/h5/medium rounded-2xl md:rounded-full py-[15px] text-[10px] tracking-wide md:text-xl shadow-md px-2 md:px-10 md:py-2 hover:bg-opacity-90 transition-colors duration-300"
              >
                {selectedRooms?.length > 0 ? "Continue" : "Select"}
              </button>
            </div>
          </div>

          {/* Fixed header content */}
          <div className={`${isItemFixed ? 'flex' : "hidden"} gap-2 justify-center lg:justify-between items-center w-full md:space-y-0 space-x-0`}>
            <div className="flex gap-4 md:gap-8 items-center justify-between w-full flex-col md:flex-row">
              <div className="md:block flex justify-between px-2 md:justify-evenly w-full md:w-auto">
                <div className="flex gap-4">
                  <div
                    onClick={() => setOpenCalender(true)}
                    className="flex cursor-pointer items-center w-full md:w-[350px] justify-center p-3 bg-white border rounded-full shadow-sm gap-3 transition-shadow duration-300"
                  >
                    <Icon name="calendar" className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
                    <div className={`flex flex-col`}>
                      <span className="font-semibold text-[12px] text-gray-700 md:text-base">
                        {checkIn ? format(new Date(checkIn), "dd MMM") : "Check in"}
                      </span>
                    </div>
                    <ArrowRightAlt className="text-yellow-500" />
                    <div className={`flex flex-col`}>
                      <span className="font-semibold text-[12px] text-gray-700 md:text-base">
                        {checkOut ? format(new Date(checkOut), "dd MMM") : "Check-out"}
                      </span>
                    </div>
                    {checkIn && checkOut && (
                      <span className="flex items-center text-gray-700 justify-center text-[13px] md:text-base rounded-full px-3 md:py-1">
                        {calculateNights()}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="bg-primary-green w-[100px] block md:hidden text-primary-white text-mobile/title md:text-desktop/h5/medium rounded-2xl md:rounded-full py-[15px] text-[10px] tracking-wide md:text-xl shadow-md px-2 md:px-10 md:py-2 hover:bg-opacity-90 transition-colors duration-300"
                >
                  {selectedRooms?.length > 0 ? "Continue" : "Select"}
                </button>
              </div>

              {/* Navigation tabs in fixed header */}
              <div
                className={`flex flex-wrap px-2 md:px-4 justify-between items-center gap-2 w-full transition-opacity duration-300 ease-in-out`}
              >
                {tabs2.map((tab, index) => renderTabItem(tab, index + 1))}
              </div>

              <button
                onClick={handleBooking}
                className="bg-primary-green hidden md:block text-primary-white text-mobile/button md:text-desktop/h5/medium rounded-2xl md:rounded-full py-[15px] text-[10px] tracking-wide md:text-xl shadow-md px-2 md:px-10 md:py-2 hover:bg-opacity-90 transition-colors duration-300"
              >
                {selectedRooms?.length > 0 ? "Continue" : "Select"}
              </button>
            </div>
          </div>

          {/* Regular navigation tabs */}
          <div
            className={`flex-wrap md:px-4 justify-between items-center mt-6 gap-2 w-full transition-opacity duration-300 ease-in-out
              ${isItemFixed ? "opacity-0 h-0 overflow-hidden hidden" : "opacity-100 flex"}
            `}
          >
            {tabs.map((tab, index) => renderTabItem(tab, index))}
          </div>
        </div>
      </div>

      {openCalender && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <Calendar
            setCheckInDate={setCheckIn}
            setCheckOutDate={setCheckOut}
            setOpenCalender={setOpenCalender}
          />
        </div>
      )}

      <div className=" bg-white  content">
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
                  ((hotelData.price - hotelData.discountedPrice) / hotelData.price) *
                  100
                )}
                % OFF
              </div>
            )}
          </div>
        )}
        <div className="p-1">
          <div className="flex flex-col sm:flex-row justify-between items-start md:items-center ">
            {/* Hotel Name and Price Section */}
            <div className="flex flex-col sm:flex-row items-start md:items-center sm:space-x-5">
              <div>
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-gray-800">
                  {hotelData?.name}
                </h2>
                <div className="text-sm font-medium text-teal-500">
                  <a className="hover:underline">
                    Book Direct for Lowest Prices!
                  </a>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 flex flex-col items-center">
                <div className="flex gap-4 items-center">

                  <span className="text-teal-500 text-2xl font-bold">
                    ₹ {hotelData?.price}{" "}
                    <span className="text-xs md:hidden text-gray-500">Incl. taxes</span>

                    <span className="font-normal text-base text-gray-600">
                      / night
                    </span>
                  </span>
                </div>
                <p className="text-xs hidden md:block text-gray-500">Incl. taxes</p>
              </div>
            </div>
            {/* Check-In/Check-Out Section */}
            <div className="mt-4 sm:mt-0 text-[14px]  bg-teal-100 text-[#058FA2] font-medium rounded-full py-2 px-4 flex items-center shadow-sm">
              <span>
                Check-In{" "}
                <span className="font-bold text-teal-800">{hotelData?.checkIn}</span>
              </span>
              <span className="mx-2">|</span>
              <span>
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
