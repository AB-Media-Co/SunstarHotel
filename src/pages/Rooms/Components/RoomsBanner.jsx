/* eslint-disable react/prop-types */
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "../../../Components/CardsCommonComp/CommonCarousel";
import Calendar from "../../../Components/Calendar";
import Icon from "../../../Components/Icons";
import { differenceInCalendarDays } from "date-fns";
import GuestsDropdown from "../../../Components/GuestsDropdown";


function RoomsBanner({ businessPlatformFeatures }) {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [openCalender, setOpenCalender] = useState(false);



    const handleBooking = () => {
        console.log("Check-In Date:", checkIn);
        console.log("Check-Out Date:", checkOut);

        alert("Booking functionality not implemented yet!");
    };

    const calculateNights = () => {
        if (checkIn && checkOut) {
            return <div>{differenceInCalendarDays(checkOut, checkIn)} Nights</div>;
        }
        return 0;
    };

    return (
        <div className="lg:p-2">
            <Carousel
                features={businessPlatformFeatures}
                height="h-[600px] rounded-lg"
                buttonColor="#FDC114"
                iconSize="h-6 w-6"
            />


            <div
                className={`bg-white bg-opacity-50 backdrop-blur-sm py-8 px-4  mx-4 lg:left-[10%] transition-all duration-500 ease-in-out 
        content absolute top-[55%]
        md:px-8 lg:px-12 rounded-md shadow-lg lg:mx-auto  
        z-10 flex flex-col items-center gap-6 mx-2`}
            >
                <div className={`flex  justify-center flex-col md:flex-row items-center w-full  space-y-4 md:space-y-0 space-x-0 md:space-x-4`}>
                    
                    <div
                        onClick={() => setOpenCalender(true)}
                        className="flex flex-wrap w-full justify-center items-center border border-[#006167] rounded-full px-6 py-3 hover:shadow-lg ease-in-out transition-all cursor-pointer space-x-2 shadow-sm"
                    >
                        <Icon name="calendar" className="h-6 w-6 text-[#006167]" />
                        <span className="text-[#006167] font-semibold text-base sm:text-lg md:text-[24px]">
                            {checkIn ? checkIn : "Check In"}{" "}
                            <span className="text-yellow-500">→</span>{" "}
                            {checkOut ? checkOut : "Check Out"}
                        </span>
                        {checkIn && checkOut && (
                            <span className="text-[#006167] text-xs sm:text-sm flex">
                                ({calculateNights()})
                            </span>
                        )}
                    </div>

                    <div className="flex  items-center justify-between gap-4 w-full">
                        {/* Guests Selection */}
                        <GuestsDropdown classBg='bg-transparant' />

                        {/* Select Button */}
                        <button
                            onClick={handleBooking}
                            // className="bg-[#006167] text-white text-[19px] lg:w-[150px] rounded-full shadow-md px-6 md:px-6 md:py-3"
                            className="bg-[#006167] text-white text-sm sm:text-base lg:text-lg  sm:w-auto rounded-full shadow-md px-6 py-3"

                        >
                            Book Room
                        </button>
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

export default RoomsBanner;

