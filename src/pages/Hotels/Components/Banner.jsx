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


    const handleBooking = () => {
        console.log("Check-In Date:", checkIn);
        console.log("Check-Out Date:", checkOut);

        alert("Booking functionality not implemented yet!");
    };
    useTextRevealAnimation();
    useScrollAnimations('#Section1');

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
    const calculateNights = () => {
        if (checkIn && checkOut) {
            return <div>{differenceInCalendarDays(checkOut, checkIn)} Nights</div>;
        }
        return 0;
    };


    const [isItemFixed, setItemFixed] = useState(false);
    console.log(isItemFixed)
    const handleScroll = () => {
        if (window.scrollY > 600) {
            setItemFixed(true);
        } else {
            setItemFixed(false);
        }
    };
    console.log(window.addEventListener('scroll', handleScroll))


    return (
        <div>
            <Carousel
                features={businessPlatformFeatures}
                height="h-[600px]"
                buttonColor="#FDC114"
                iconSize="h-6 w-6"
            />


            <div className="bg-white py-6 px-4 sm:px-8 lg:px-12 rounded-md shadow-lg content mx-auto -mt-6 relative z-10 flex flex-col items-center gap-6 border border-gray-200">
                <div className="w-full flex flex-col items-center">
                    {/* Top Section: Dates and Guests */}
                    <div className="flex flex-wrap justify-center sm:justify-between items-center w-full max-w-5xl space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
                        {/* Dates Selection */}
                        <div
                            onClick={() => setOpenCalender(true)}
                            className="flex flex-wrap items-center border border-[#006167] rounded-full px-6 py-3 hover:shadow-lg ease-in-out transition-all cursor-pointer space-x-2 shadow-sm"
                        >
                            <Icon name="calendar" className="h-6 w-6 text-[#006167]" />
                            <span className="text-[#006167] font-semibold text-base sm:text-lg md:text-[24px]">
                                {checkIn ? checkIn : "Check In"}{" "}
                                <span className="text-yellow-500">→</span>{" "}
                                {checkOut ? checkOut : "Check Out"}
                            </span>
                            {checkIn && checkOut && (
                                <span className="text-gray-400 text-xs sm:text-sm flex">({calculateNights()})</span>
                            )}
                        </div>

                        {/* Guests Selection */}
                        <GuestsDropdown />

                        {/* Select Button */}
                        <button
                            onClick={handleBooking}
                            className="bg-[#006167] text-white w-full sm:w-auto rounded-full shadow-md px-6 py-3"
                        >
                            Select
                        </button>
                    </div>

                    {/* Bottom Section: Tabs */}
                    <div className="flex flex-wrap justify-center items-center mt-6 space-y-4 sm:space-y-0 space-x-0 sm:space-x-6 w-full">
                        {tabs.map((tab, index) => (
                            <a
                                key={index}
                                href={tab.link} // Scrolls to the corresponding section
                                onClick={() => setActiveTab(index)} // Sets the active tab
                                className={`flex flex-col sm:flex-row gap-2 items-center cursor-pointer ${activeTab === index ? "text-[#FDC114]" : "text-[#006167]"
                                    }`}
                            >
                                <Icon
                                    name={tab.iconName}
                                    className={`h-6 w-6 md:h-8 md:w-8 ${activeTab === index ? "text-[#FDC114]" : "text-[#006167]"
                                        }`}
                                />
                                <span
                                    className={`font-semibold text-sm sm:text-base md:text-[26px] ${activeTab === index ? "text-[#FDC114]" : "text-gray-500"
                                        }`}
                                >
                                    {tab.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>



            {openCalender &&
                <div className="fixed  inset-0  flex justify-center items-center z-50">

                    <Calendar setCheckInDate={setCheckIn} setCheckOutDate={setCheckOut} setOpenCalender={setOpenCalender} />
                    {/* <Test/> */}
                </div>
            }
        </div>
    );
}

export default Banner;
