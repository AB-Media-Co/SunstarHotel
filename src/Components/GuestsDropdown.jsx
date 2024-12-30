/* eslint-disable react/prop-types */
import { useState } from 'react';
import Icon from './Icons';

const GuestsDropdown = ({ dropdownDirection = "down" }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [guestDetails, setGuestDetails] = useState({
        adults: 2,
        kids: 0,
        rooms: 1,
    });

    const handleIncrement = (field) => {
        setGuestDetails((prev) => ({
            ...prev,
            [field]: prev[field] + 1,
        }));
    };

    const handleDecrement = (field) => {
        if ((field === "adults" || field === "rooms") && guestDetails[field] > 1) {
            setGuestDetails((prev) => ({
                ...prev,
                [field]: prev[field] - 1,
            }));
        } else if (field === "kids" && guestDetails[field] > 0) {
            setGuestDetails((prev) => ({
                ...prev,
                [field]: prev[field] - 1,
            }));
        }
    };

    return (
        <div>
            <div className="relative">
                <div
                    className="flex items-center bg-white border border-[#006167] rounded-full px-1 md:px-6 py-[15px] sm:py-3 space-x-2 cursor-pointer hover:shadow-md shadow-sm"
                    onClick={() => setShowDropdown((prev) => !prev)}
                >
                    <Icon name="guestHotel" className="h-5 w-5 sm:h-6 sm:w-6 text-[#006167]" />
                    <span className="text-[#006167]  text-[12px] md:text-[22px] font-semibold">
                        {guestDetails.adults + guestDetails.kids} Guests, {guestDetails.rooms} Room
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#006167]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {showDropdown && (
                    <div
                        className={`absolute z-20 bg-white border border-gray-200 rounded-md shadow-lg p-4 w-full sm:w-64 ${
                            dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
                        }`}
                    >
                        {/* Dropdown Items */}
                        {["Adults", "Kids", "Rooms"].map((label, index) => {
                            const field = label.toLowerCase();
                            return (
                                <div key={index} className="flex justify-between items-center mb-4">
                                    <span className="text-gray-700 text-sm sm:text-base">{label}</span>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleDecrement(field)}
                                            className="text-white bg-[#006167] px-2 sm:px-3 py-1 rounded-full"
                                        >
                                            -
                                        </button>
                                        <span className="text-gray-700">{guestDetails[field]}</span>
                                        <button
                                            onClick={() => handleIncrement(field)}
                                            className="text-white bg-[#006167] px-2 sm:px-3 py-1 rounded-full"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Done Button */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setShowDropdown(false)}
                                className="bg-[#006167] text-white px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-[#004c4c] transition-all"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuestsDropdown;
