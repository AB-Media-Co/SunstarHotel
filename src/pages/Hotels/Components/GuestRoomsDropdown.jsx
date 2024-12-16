/* eslint-disable react/prop-types */
import { useState } from "react";

function GuestRoomsDropdown({ guests, setGuests, rooms, setRooms }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative w-full sm:w-[305px]">
            <label className="block font-bold text-gray-700 mb-1">Guest & Rooms</label>
            <div
                onClick={toggleDropdown}
                className="border border-[#006167] rounded-md p-3 text-gray-700 w-full cursor-pointer flex justify-between items-center hover:shadow-md transition-shadow duration-200"
            >
                <span>{guests} Adults, {rooms} Room</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            {isDropdownOpen && (
                <div className="absolute top-full left-0 bg-white border border-[#006167] rounded-lg shadow-lg mt-2 w-full sm:w-[305px] z-20 transform transition-all duration-300 opacity-100 scale-100">
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="p-2 w-full sm:w-[140px]">
                            <label className="block font-medium text-gray-700">Guests</label>
                            <input
                                type="number"
                                min="1"
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#006167]"
                            />
                        </div>
                        <div className="p-2 w-full sm:w-[140px]">
                            <label className="block font-medium text-gray-700">Rooms</label>
                            <input
                                type="number"
                                min="1"
                                value={rooms}
                                onChange={(e) => setRooms(Number(e.target.value))}
                                className="border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#006167]"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end p-2">
                        <button
                            onClick={toggleDropdown}
                            className="bg-[#006167] text-white font-bold rounded-md py-2 px-6 hover:bg-[#004d4d] transition-colors duration-200"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GuestRoomsDropdown;
