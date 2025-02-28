/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../../../Components/Icons";
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
  const [isTopSectionHidden, setIsTopSectionHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Retrieve dates from localStorage on mount (without changing the UI)
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

      // Only apply the hidden logic if isItemFixed is true
      if (isItemFixed) {
        // Determine scroll direction
        if (prevScrollPos > currentScrollPos) {
          // Scrolling up
          setIsTopSectionHidden(false);
        } else {
          // Scrolling down
          setIsTopSectionHidden(true);
        }
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isItemFixed]);

  const calculateNights = () => {
    if (checkIn && checkOut) {
      return <div>{differenceInCalendarDays(new Date(checkOut), new Date(checkIn))} Nights</div>;
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
          ${isItemFixed ? "fixed md:left-[8%] top-0 z-50 translate-y-2" : "relative translate-y-[-10px]"}
          sm:px-8 lg:px-12 content rounded-md shadow-lg mx-auto -mt-6 
          z-10 flex flex-col items-center gap-6 border border-gray-200
           ${isTopSectionHidden ? "wipe-animation-hidden" : "wipe-animation"}
        ${isTopSectionHidden ? "hidden" : ""}
         `}

      >
        <div className="w-full flex flex-col items-center">
          {/* Top Section: Dates and Guests */}
          <div className="flex gap-2 justify-center md:px-4 md:space-x-6 lg:justify-between items-center w-full md:space-y-0 space-x-0">
            <div className="flex gap-8 justify-between w-full md:flex-row flex-col">
              <div className="flex gap-4">
                <div
                  onClick={() => setOpenCalender(true)}
                  className="flex px-[10px] py-[4px] items-center border  border-primary-dark-green text-primary-dark-green rounded-full hover:shadow-lg ease-in-out transition-all cursor-pointer space-x-2 shadow-sm"
                >
                  <Icon name="calendar" className="h-6 w-6 text-primary-dark-green" />
                  <span className="text-mobile/body/2 md:text-desktop/body/1 text-primary-dark-green font-semibold">
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
                <div className="">
                  <GuestsDropdown />
                </div>

              </div>
              <button
                onClick={handleBooking}
                className="bg-primary-green text-primary-white lg:w-[180px] text-mobile/button md:text-desktop/h4 rounded-full py-2 md:py-0 text-xl shadow-md px-6 md:px-6 md:py-3"
              >
                Select
              </button>
            </div>


          </div>

          {/* Bottom Section: Tabs */}
          <div className={`flex flex-wrap px-4 justify-between items-center mt-6 gap-2 w-full  ${isItemFixed ? "hidden" : ""}`}>
            {tabs.map((tab, index) => (
              <a
                key={index}
                href={tab.link}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col sm:flex-row gap-2 items-center cursor-pointer ${activeTab === index ? "text-[#FDC114]" : "text-primary-green"} `}
              >
                <Icon
                  name={tab.iconName}
                  className={`h-6 w-6 md:h-8 md:w-8 ${activeTab === index ? "text-[#FDC114]" : "text-primary-green"} `}
                />
                <span
                  className={`text-mobile/body/2 md:text-desktop/body/1 font-semibold ${activeTab === index ? "text-[#FDC114]" : "text-gray-500"} `}
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