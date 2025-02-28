/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Icon from "./Icons";
import { useEffect, useState } from "react";
import { getSingleHotelWithCode } from "../ApiHooks/useHotelHook2";
import { usePricing } from "../Context/PricingContext";

const RoomsCard = ({ room }) => {
    const navigate = useNavigate();
    const { editAddPricing,fetchRoomHotelDetails,details } = usePricing();

    const [hotelData, setHotelData] = useState(null);

    useEffect(() => {
        if (room?.HotelCode) {
            const fetchHotel = async () => {
                try {
                    const data = await getSingleHotelWithCode(room?.HotelCode);
                    setHotelData(data?.hotel);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchHotel();
        }
    }, [room?.HotelCode]);


    const handleBooking = () => {
        if (room.available) {
            navigate(`/room/${room._id}`);
        }
    };

    const handeEditBooking = () => {
        fetchRoomHotelDetails(room?._id, hotelData?.hotelCode);
    };

    return (
        <div className="bg-primary-white shadow-md rounded-lg overflow-hidden ">
            {/* Room Image Section */}
            <div className="relative">
                <img
                    src={room?.RoomImage[0]}
                    alt={room.title}
                    className="w-full h-64 object-cover"
                />
                {room.tag && (
                    <span className="absolute top-6 left-0 bg-red-500 text-primary-white text-mobile/caption md:text-desktop/caption font-bold px-2 py-1 rounded-r-xl">
                        {room.tag}
                    </span>
                )}
            </div>

            {/* Room Details Section */}
            <div className="p-4 flex flex-col gap-4">
                {/* Room Title */}
                <h2 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-700">
                    {room.RoomName}
                </h2>

                {/* Room Features */}
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-mobile/body/2 md:text-desktop/body/1 font-semibold text-gray-600 ">
                        <Icon name="guests" className="w-5 h-5" />
                        <span className="font-semibold">{room.maxGuests} Guest Max</span>
                    </div>
                    {/* <div className="flex items-center gap-2 text-mobile/body/2 md:text-desktop/body/1 text-gray-600 mt-2">
                        <Icon name="beds" className="w-7 h-7" />
                        <span className="font-semibold">{room.beds}</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                        <Icon name="sqFt" className="w-5 h-5" />
                        <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-600 font-semibold">
                            {room.squareFeet} sq. ft. Area
                        </p>
                    </div>

                </div>

                {/* Room Pricing and Booking */}
                <div className="flex justify-between items-center">
                    {/* Pricing Section */}
                    <div>
                        {room.defaultRate && (
                            <p className="text-mobile/body/1 md:text-desktop/h6/medium text-red-500 font-bold line-through">
                                ₹ {room.defaultRate}
                            </p>
                        )}
                        <p className="text-mobile/h5 md:text-desktop/h5 font-bold text-[#058FA2]">
                            ₹ {room.discountRate}
                            <span className="text-mobile/body/2 md:text-desktop/caption text-gray-600 font-normal">
                                /night

                                <span className="text-gray-500 ml-2">incl. Taxes</span>
                            </span>
                        </p>
                    </div>

                    {/* Booking Button */}
                    {editAddPricing  == true ?
                        <>
                            <button
                                className={`mt-4 h-[40px] px-4 py-2 text-mobile/button md:text-desktop/button font-bold rounded bg-primary-dark-green text-primary-white 
                                    `}
                                onClick={handeEditBooking}
                            >
                                Add Room
                            </button>
                        </> : (
                            <button
                                className={`mt-4 h-[40px] px-4 py-2 text-mobile/button md:text-desktop/button font-bold rounded ${room.available
                                    ? "bg-primary-dark-green text-primary-white"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    }`}
                                onClick={handleBooking}
                                disabled={!room.available}
                            >
                                {room.available ? "Book Now" : "Sold Out"}
                            </button>

                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default RoomsCard;
