/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Icon from "./Icons";
import { useEffect, useState } from "react";
import { getSingleHotelWithCode } from "../ApiHooks/useHotelHook2";
import { usePricing } from "../Context/PricingContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const RoomsCard = ({ room }) => {
    const navigate = useNavigate();
    const { fetchRoomHotelDetails, selectedRooms, removeRoom, maxRoomSelection } = usePricing();
    const [hotelData, setHotelData] = useState(null);

    const roomCount = selectedRooms.filter((r) => r.roomName === room.RoomName).length;

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

    const handleAddRoom = () => {
        if (roomCount >= maxRoomSelection) return; // Optional: Prevent exceeding max rooms
        fetchRoomHotelDetails(room?._id, hotelData?.hotelCode)
            .catch((err) => {
                console.error("Error adding room:", err);
            });
    };

    const handleRemoveRoom = () => {
        if (roomCount > 0) {
            removeRoom(room.RoomName);
        }
    };

    return (
        <div className="bg-primary-white shadow-md rounded-lg overflow-hidden">
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

            <div className="p-4 flex flex-col gap-4">
                <h2
                    onClick={() => navigate(`/room/${room._id}`)}
                    className="cursor-pointer text-mobile/h5 md:text-desktop/h5 font-bold text-gray-700"
                >
                    {room.RoomName}
                </h2>

                <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-mobile/body/2 md:text-desktop/body/1 font-semibold text-gray-600">
                        <Icon name="guests" className="w-5 h-5" />
                        <span className="font-semibold">{room.maxGuests} Guest Max</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="sqFt" className="w-5 h-5" />
                        <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-600 font-semibold">
                            {room.squareFeet} sq. ft. Area
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center">
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

                    <div className="flex items-center border border-primary-green rounded-lg px-3 py-1 gap-2">
                        <button
                            className={`text-mobile/button md:text-desktop/button md:text-2xl font-bold rounded text-primary-green ${roomCount === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={handleRemoveRoom}
                            disabled={roomCount === 0}
                        >
                            <RemoveIcon />
                        </button>
                        <span className="text-mobile/h5 md:text-lg font-semibold text-primary-dark-green">
                            {roomCount} Rooms
                        </span>
                        <button
                            className="text-mobile/button md:text-desktop/button md:text-2xl font-bold rounded text-primary-green"
                            onClick={handleAddRoom}
                        >
                            <AddIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomsCard;