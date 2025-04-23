/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../../../Components/Icons";
import Carousel from "../../../Components/CardsCommonComp/CommonCarousel";
import Calendar from "../../../Components/Calendar";
// import GuestsDropdown from "../../../Components/GuestsDropdown";
import { ArrowRightAlt } from "@mui/icons-material";

import {
  format,
  differenceInCalendarDays,
} from "date-fns";
import { usePricing } from "../../../Context/PricingContext";
import { useNavigate } from "react-router-dom";

function Banner({ businessPlatformFeatures, setOpenCalender, openCalender }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // Tracks the active tab index
  const [isItemFixed, setItemFixed] = useState(false);
  const [isTopSectionHidden, setIsTopSectionHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const { selectedRooms } = usePricing();
  const navigate = useNavigate()


  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    if (storedCheckIn && storedCheckOut) {
      setCheckIn(storedCheckIn);
      setCheckOut(storedCheckOut);
    }
  }, []);


  const handleBooking = () => {
    if (selectedRooms?.length > 0) {
      navigate("/room/details"); // Open calendar if dates are not selected
    } else {
      window.location.href = "#rooms"; // Navigate to "#rooms" if dates are selected
    }
  };

  const tabs = [
    { iconName: "roundedbed", label: "Rooms", link: "#rooms" },
    { iconName: "lamp", label: "Amenities", link: "#amenities" },
    { iconName: "message", label: "Reviews", link: "#reviews" },
    { iconName: "location", label: "Location", link: "#location" },
    { iconName: "faqs", label: "FAQs", link: "#faqs" },
  ];

  const tabs2 = [
    { iconName: "lamp", label: "Amenities", link: "#amenities" },
    { iconName: "message", label: "Reviews", link: "#reviews" },
    { iconName: "location", label: "Location", link: "#location" },
    { iconName: "faqs", label: "FAQs", link: "#faqs" },
  ];

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setItemFixed(currentScrollPos > 600);

      // Uncomment and modify this block if you want to hide/show based on scroll direction
      // if (isItemFixed) {
      //   if (prevScrollPos > currentScrollPos) {
      //     setIsTopSectionHidden(false);
      //   } else {
      //     setIsTopSectionHidden(true);
      //   }
      // }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isItemFixed]);

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

  return (
    <div>
      <Carousel
        features={businessPlatformFeatures}
        height="h-[600px]"
        buttonColor="#FDC114"
        iconSize="h-6 w-6"
        NavClass="md:left-1/2"
      />

      <div
        className={`bg-primary-white  rounded-md shadow-lg mx-auto -mt-6 
          z-10 flex flex-col items-center gap-6 border border-gray-200
          transition-all  duration-700 ease-in-out will-change-transform
          ${isItemFixed
            ? "fixed top-0  w-full pt-8 z-50 opacity-100 transform translate-y-0 scale-100"
            : "relative opacity-100 content md:py-8 transform translate-y-[-10px] scale-[0.98]"
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
        <div className="w-full flex py-3 content flex-col items-center">
          {/* Top Section: Dates and Guests */}
          <div className={` gap-2 justify-center md:px-4 md:space-x-6 ${isItemFixed ? 'hidden' : "flex"} lg:justify-between items-center w-full md:space-y-0 space-x-0`}>
            <div className="flex gap-4 md:gap-8 items-center justify-between w-full flex-row">
              <div className="flex gap-4">
                <div
                  onClick={() => setOpenCalender(true)}
                  className="flex flex-row cursor-pointer items-center justify-evenly border max-w-full w-full md:w-auto bg-white px-4 py-3 md:px-8 md:py-4 rounded-full gap-3 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon name="calendar" className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
                  <div className={`flex flex-col`}>
                    <span className="font-semibold text-[8px] text-gray-700 md:text-base">
                      {checkIn ? format(checkIn, "dd MMM, EEEE") : "Check in"}
                    </span>
                  </div>
                  <ArrowRightAlt className="text-yellow-500" />
                  <div className={`flex flex-col`}>
                    <span className="font-semibold text-[8px] text-gray-700 md:text-base">
                      {checkOut ? format(checkOut, "dd MMM, EEEE") : "Check-out"}
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
          <div className={`${isItemFixed ? 'flex' : "hidden"} gap-2 justify-center md:px-4 md:space-x-6 lg:justify-between items-center w-full md:space-y-0 space-x-0`}>
            <div className="flex gap-4 md:gap-8 items-center justify-between w-full flex-col  md:flex-row">
              <div className="md:block flex justify-evenly w-full md:w-auto">
                <div className="flex gap-4">
                  <div
                    onClick={() => setOpenCalender(true)}
                    className="flex cursor-pointer items-center md:w-[350px] justify-center p-3 bg-white border rounded-full shadow-sm     gap-3  transition-shadow duration-300"
                  >

                    <Icon name="calendar" className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
                    <div className={`flex flex-col`}>
                      <span className="font-semibold text-[12px] text-gray-700 md:text-base">
                        {checkIn ? format(checkIn, "dd MMM") : "Check in"}
                      </span>
                    </div>
                    <ArrowRightAlt className="text-yellow-500" />
                    <div className={`flex flex-col`}>
                      <span className="font-semibold text-[12px] text-gray-700 md:text-base">
                        {checkOut ? format(checkOut, "dd MMM") : "Check-out"}
                      </span>
                    </div>

                    {checkIn && checkOut && (
                      <span className="flex items-center text-gray-700 justify-center text-[13px] md:text-base rounded-full  px-3 md:py-1">
                        {calculateNights()}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="bg-primary-green block md:hidden text-primary-white text-mobile/button md:text-desktop/h5/medium rounded-2xl md:rounded-full py-[15px] text-[10px] tracking-wide md:text-xl shadow-md px-2 md:px-10 md:py-2 hover:bg-opacity-90 transition-colors duration-300"
                >
                  {selectedRooms?.length > 0 ? "Continue" : "Select"}
                </button>

              </div>


              <div
                className={`flex flex-wrap md:px-4 justify-between items-center  gap-2 w-full transition-opacity duration-300 ease-in-out `}
              >
                {tabs2.map((tab, index) => (
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
                ))}
              </div>

              <button
                onClick={handleBooking}
                className="bg-primary-green hidden md:block text-primary-white text-mobile/button md:text-desktop/h5/medium rounded-2xl md:rounded-full py-[15px] text-[10px] tracking-wide md:text-xl shadow-md px-2 md:px-10 md:py-2 hover:bg-opacity-90 transition-colors duration-300"
              >
                {selectedRooms?.length > 0 ? "Continue" : "Select"}
              </button>
            </div>
          </div>

          <div
            className={` flex-wrap md:px-4 justify-between items-center mt-6 gap-2 w-full transition-opacity duration-300 ease-in-out
              ${isItemFixed ? "opacity-0 h-0 overflow-hidden hidden" : "opacity-100 flex"}
            `}
          >
            {tabs.map((tab, index) => (
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
            ))}
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
    </div>
  );
}

export default Banner;