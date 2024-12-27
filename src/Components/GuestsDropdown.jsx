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

    // Handlers for incrementing and decrementing values
    const handleIncrement = (field) => {
        setGuestDetails((prev) => ({
            ...prev,
            [field]: prev[field] + 1,
        }));
    };

    const handleDecrement = (field) => {
        // Ensure "adults" and "rooms" do not go below 1, and "kids" does not go below 0
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
                    className="flex items-center bg-white border border-[#006167] rounded-full px-6 py-3 space-x-2 cursor-pointer hover:shadow-md shadow-sm"
                    onClick={() => setShowDropdown((prev) => !prev)} // Toggle dropdown visibility
                >
                    <Icon name="guestHotel" className="h-6 w-6 text-[#006167]" />
                    <span className="text-[#006167] text-[22px] font-semibold">
                        {guestDetails.adults + guestDetails.kids} Guests, {guestDetails.rooms} Room
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#006167] font-bold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Dropdown */}
                {showDropdown && (
                    <div
                        className={`absolute z-20 bg-white border border-gray-200 rounded-md shadow-lg mt-2 p-4 w-64 ${dropdownDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
                    >
                        {/* Adults */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Adults</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDecrement("adults")}
                                    className="text-white bg-[#006167] px-3 py-1 rounded-full"
                                >
                                    -
                                </button>
                                <span className="text-gray-700">{guestDetails.adults}</span>
                                <button
                                    onClick={() => handleIncrement("adults")}
                                    className="text-white bg-[#006167] px-3 py-1 rounded-full"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Kids */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Kids</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDecrement("kids")}
                                    className="text-white bg-[#006167] px-3 py-1 rounded-full"
                                >
                                    -
                                </button>
                                <span className="text-gray-700">{guestDetails.kids}</span>
                                <button
                                    onClick={() => handleIncrement("kids")}
                                    className="text-white bg-[#006167] px-3 py-1 rounded-full"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Rooms */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Rooms</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDecrement("rooms")}
                                    className="text-white bg-[#006167] px-3 py-1 rounded-full"
                                >
                                    -
                                </button>
                                <span className="text-gray-700">{guestDetails.rooms}</span>
                                <button
                                    onClick={() => handleIncrement("rooms")}
                                    className="text-white bg-[#006167] px-3 py-1 rounded-full"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Done Button */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setShowDropdown(false)} // Close dropdown on click
                                className="bg-[#006167] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#004c4c] transition-all"
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
