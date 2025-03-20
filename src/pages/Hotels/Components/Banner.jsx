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

function Banner({ businessPlatformFeatures, setOpenCalender, openCalender }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // Tracks the active tab index
  const [isItemFixed, setItemFixed] = useState(false);
  const [isTopSectionHidden, setIsTopSectionHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    if (storedCheckIn && storedCheckOut) {
      setCheckIn(storedCheckIn);
      setCheckOut(storedCheckOut);
    }
  }, []);



  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      setOpenCalender(true); // Open calendar if dates are not selected
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
        className={`bg-primary-white py-8 px-4 transition-all duration-500 ease-in-out 
          ${isItemFixed
            ? "fixed md:left-[8%] top-0 z-50 translate-y-2"
            : "relative translate-y-[-10px]"
          }
          sm:px-8 lg:px-12 content rounded-md shadow-lg mx-auto -mt-6 
          z-10 flex flex-col items-center gap-6 border border-gray-200
           ${isTopSectionHidden ? "wipe-animation-hidden" : "wipe-animation"}
        ${isTopSectionHidden ? "hidden" : ""}
         `}
      >
        <div className="w-full flex flex-col items-center">
          {/* Top Section: Dates and Guests */}
          <div className="flex gap-2 justify-center md:px-4 md:space-x-6 lg:justify-between items-center w-full md:space-y-0 space-x-0">
            <div className="flex gap-4 md:gap-8 items-center justify-between w-full md:flex-row flex-col">
              <div className="flex gap-4">
                <div
                  onClick={() => setOpenCalender(true)}
                  className="flex flex-row cursor-pointer items-center justify-evenly border max-w-full w-full md:w-auto  bg-white px-4 py-3 md:px-8 md:py-4 rounded-full gap-3 shadow-md"
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
                    <span className="flex items-center text-gray-700 justify-center text-[8px] md:text-base  rounded-full border border-gray-300 px-3 md:py-1">
                      {calculateNights()}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleBooking}
                className="bg-primary-green text-primary-white text-mobile/button md:text-desktop/h5/medium  rounded-xl md:rounded-full py-2  text-xl shadow-md px-6 md:px-10 md:py-2"
              >
                Select
              </button>
            </div>
          </div>

          <div
            className={`flex flex-wrap px-4 justify-between items-center mt-6 gap-2 w-full  ${isItemFixed ? "hidden" : ""
              }`}
          >
            {tabs.map((tab, index) => (
              <a
                key={index}
                href={tab.link}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col sm:flex-row gap-2 items-center cursor-pointer ${activeTab === index ? "text-[#FDC114]" : "text-primary-green"
                  } `}
              >
                <Icon
                  name={tab.iconName}
                  className={`h-6 w-6 md:h-8 md:w-8 ${activeTab === index ? "text-[#FDC114]" : "text-primary-green"
                    } `}
                  styleCss={{
                    filter:
                      activeTab === index
                        ? "brightness(0) saturate(100%) invert(100%) brightness(50%) sepia(100%) saturate(800%) hue-rotate(20deg) contrast(110%)"
                        : "none",
                  }}
                />

                <span
                  className={`text-mobile/body/2 md:text-desktop/body/1 font-semibold ${activeTab === index ? "text-[#FDC114]" : "text-gray-500"
                    } `}
                >
                  {tab.label}
                </span>
              </a>
            ))}
          </div>
        </div>
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

export default Banner;