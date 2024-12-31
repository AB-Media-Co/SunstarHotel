/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import useScrollAnimations from "../hooks/useScrollAnimations";
import useTextRevealAnimation from "../hooks/useTextRevealAnimation";
import Icon from "./Icons";

const RoomsCard = ({ room }) => {
    const navigate = useNavigate();

    // Initialize animations
    useTextRevealAnimation();
    useScrollAnimations();

    /**
     * Handle navigation to room details page.
     */
    const handleBooking = () => {
        if (room.available) {
            navigate(`/room/${room.id}`);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden animation-on-scroll">
            {/* Room Image Section */}
            <div className="relative">
                <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-64 object-cover"
                />
                {room.tag && (
                    <span className="absolute top-6 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-r-xl">
                        {room.tag}
                    </span>
                )}
            </div>

            {/* Room Details Section */}
            <div className="p-4 flex flex-col gap-4">
                {/* Room Title */}
                <h2 className="text-lg font-bold text-gray-700">{room.title}</h2>

                {/* Room Features */}
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <Icon name="guests" className="w-7 h-7" />
                        <span className="font-semibold">{room.guests}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <Icon name="beds" className="w-7 h-7" />
                        <span className="font-semibold">{room.beds}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Icon name="sqFt" className="w-7 h-7" />
                    <p className="text-sm text-gray-600 font-semibold">{room.area}</p>
                </div>

                {/* Room Pricing and Booking */}
                <div className="flex justify-between items-center">
                    {/* Pricing Section */}
                    <div>
                        {room.originalPrice && (
                            <p className="text-sm text-gray-500 font-bold line-through">
                                {room.originalPrice}
                            </p>
                        )}
                        <p className="text-lg font-bold text-[#009368]">
                            {room.price}
                            <span className="text-sm text-gray-600 font-normal">
                                /night
                                <br />
                                <span className="text-gray-500">incl. Taxes</span>
                            </span>
                        </p>
                    </div>

                    {/* Booking Button */}
                    <button
                        className={`mt-4 h-[40px] px-4 py-2 font-bold rounded ${
                            room.available
                                ? "bg-yellow-400 hover:bg-yellow-500 text-[#058FA2]"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                        onClick={handleBooking}
                        disabled={!room.available}
                    >
                        {room.available ? "Book Now" : "Sold Out"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomsCard;
