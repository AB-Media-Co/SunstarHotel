/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GuestRoomsDropdown from "./GuestRoomsDropdown";
import Icon from "../../../Components/Icons";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";
import Carousel from "../../../Components/CardsCommonComp/CommonCarousel";

function Banner({businessPlatformFeatures}) {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(2);
    const [rooms, setRooms] = useState(1);

    const handleBooking = () => {
        console.log("Check-In Date:", checkInDate);
        console.log("Check-Out Date:", checkOutDate);
        console.log("Guests:", guests);
        console.log("Rooms:", rooms);
        alert("Booking functionality not implemented yet!");
    };
    useTextRevealAnimation();
    useScrollAnimations('#Section1');

    return (
        <div>
            <Carousel
                features={businessPlatformFeatures}
                height="h-[600px]"
                buttonColor="#FDC114"
                iconSize="h-6 w-6"
            />

            <div className="bg-white py-10 animation-on-scroll-Section1 px-6 sm:px-10 lg:px-12 rounded-md shadow-lg content mx-auto -mt-6 relative z-10 flex flex-col sm:flex-row items-center gap-4 border border-gray-200">
                
                {/* Check-In Date Section */}
                <div className="flex flex-col  items-center md:items-start w-full sm:w-[305px]">
                    <label className="block font-bold text-gray-700 mb-1">Check-In</label>
                    <div className="relative">
                        <DatePicker
                            selected={checkInDate}
                            onChange={(date) => setCheckInDate(date)}
                            dateFormat="MMM dd, yyyy"
                            className="border border-[#006167] rounded-md p-2 pl-10 text-gray-700 w-full"
                            placeholderText="Select Date"
                        />
                        <Icon name="calendar" className="absolute top-2 left-2 h-6 w-6 text-gray-500" />
                    </div>
                </div>

                {/* Check-Out Date Section */}
                <div className="flex flex-col  items-center md:items-start w-full sm:w-[305px]">
                    <label className="block font-bold text-gray-700 mb-1">Check-Out</label>
                    <div className="relative">
                        <DatePicker
                            selected={checkOutDate}
                            onChange={(date) => setCheckOutDate(date)}
                            dateFormat="MMM dd, yyyy"
                            className="border border-[#006167] rounded-md p-2 pl-10 text-gray-700 w-full"
                            placeholderText="Select Date"
                        />
                        <Icon name="calendar" className="absolute top-2 left-2 h-6 w-6 text-gray-500" />
                    </div>
                </div>

                {/* Guest & Room Dropdown */}
                <GuestRoomsDropdown
                    guests={guests}
                    setGuests={setGuests}
                    rooms={rooms}
                    setRooms={setRooms}
                />
                
                {/* Book Now Button */}
                <button
                    onClick={handleBooking}
                    className="bg-yellow-500 text-[#058FA2] w-full sm:w-[300px] text-[22px] font-bold rounded-2xl py-2 px-6 mt-4 sm:mt-0"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}

export default Banner;
