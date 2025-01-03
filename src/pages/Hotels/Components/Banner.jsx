/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../../../Components/Icons";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";
import Carousel from "../../../Components/CardsCommonComp/CommonCarousel";
import Calendar from "../../../Components/Calendar";
import { differenceInCalendarDays } from "date-fns";
import GuestsDropdown from "../../../Components/GuestsDropdown";

function Banner({ businessPlatformFeatures }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // Tracks the active tab index
  const [isItemFixed, setItemFixed] = useState(false);

  useTextRevealAnimation();
  useScrollAnimations("#Section1");

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
      setItemFixed(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateNights = () => {
    if (checkIn && checkOut) {
      return <div>{differenceInCalendarDays(checkOut, checkIn)} Nights</div>;
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
      />

      <div
        className={`bg-white py-8 px-4 transition-all duration-500 ease-in-out 
          ${isItemFixed ? "fixed md:left-[8%] top-0 z-50 translate-y-2" : "relative translate-y-[-10px]"}
          sm:px-8 lg:px-12 content rounded-md shadow-lg mx-auto -mt-6 
          z-10 flex flex-col items-center gap-6 border border-gray-200`}
      >
        <div className="w-full flex flex-col items-center">
          {/* Top Section: Dates and Guests */}
          <div className="flex flex-wrap justify-center items-center w-full max-w-5xl space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <div
              onClick={() => setOpenCalender(true)}
              className="flex flex-wrap items-center border border-[#006167] rounded-full px-6 py-3 hover:shadow-lg ease-in-out transition-all cursor-pointer space-x-2 shadow-sm"
            >
              <Icon name="calendar" className="h-6 w-6 text-[#006167]" />
              <span className="text-mobile/body/2 md:text-desktop/body/1 text-[#006167] font-semibold">
                {checkIn ? checkIn : "Check In"}{" "}
                <span className="text-yellow-500">→</span>{" "}
                {checkOut ? checkOut : "Check Out"}
              </span>
              {checkIn && checkOut && (
                <span className="text-gray-400 text-xs sm:text-sm flex">
                  ({calculateNights()})
                </span>
              )}
            </div>
            <div className="flex gap-6">
              <GuestsDropdown />
              <button
                onClick={handleBooking}
                className="bg-[#006167] text-white text-mobile/button md:text-desktop/button rounded-full shadow-md px-6 md:px-6 md:py-3"
              >
                Select
              </button>
            </div>
          </div>

          {/* Bottom Section: Tabs */}
          <div className="flex flex-wrap px-4 justify-between items-center mt-6 gap-2 md:space-y-4 sm:space-y-0 space-x-0 md:space-x-6 w-full">
            {tabs.map((tab, index) => (
              <a
                key={index}
                href={tab.link}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col sm:flex-row gap-2 items-center cursor-pointer ${
                  activeTab === index ? "text-[#FDC114]" : "text-[#006167]"
                }`}
              >
                <Icon
                  name={tab.iconName}
                  className={`h-6 w-6 md:h-8 md:w-8 ${
                    activeTab === index ? "text-[#FDC114]" : "text-[#006167]"
                  }`}
                />
                <span
                  className={`text-mobile/body/2 md:text-desktop/body/1 font-semibold ${
                    activeTab === index ? "text-[#FDC114]" : "text-gray-500"
                  }`}
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
