// Import necessary components and hooks
/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import Icon from "../Icons";
import useScrollAnimations from "../../hooks/useScrollAnimations";

const HotelSelctingCards = ({ link, hotel, btnClass = 'bg-white hover:bg-yellow-400  m-2 hover:shadow-2xl hover:rounded-lg rounded-lg transition ease-in-out duration-300 mt-0' }) => {
    const navigate = useNavigate()
    const OnbuttonClick = () => {
        navigate(link)
    }
    useScrollAnimations();

    return (
        <div className="border border-gray-200 animation-on-scroll  rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
        >
            <div className="relative w-full h-64">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="px-4 py-2">
                    <h3 className="text-lg font-bold text-gray-900">{hotel.name}</h3>
                    <div className="flex justify-center text-sm text-gray-600 ">
                        <span className="text-yellow-500 mr-1">★</span>
                        {hotel.rating} • {hotel.reviews}
                    </div>
                </div>
                <div
                    onClick={OnbuttonClick}
                    className={`${btnClass} text-[#058FA2] flex gap-2 py-4 justify-center items-center cursor-pointer`}
                >
                    <div className="bg-[#058FA2] rounded-full p-[8px]">
                        <Icon name="upArrow" className=" w-2 h-2" />
                    </div>
                    <span className="font-bold text-xl">
                        Book Now
                    </span>
                </div>
            </div>
        </div>
    );
};
export default HotelSelctingCards