import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { getSingleHotelWithCode } from "../ApiHooks/useHotelHook2";
import { usePricing } from "../Context/PricingContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Icon from "./Icons";

const RoomsCard = ({ room }) => {
  const navigate = useNavigate();
  const { fetchRoomHotelDetails, selectedRooms, removeRoom, maxRoomSelection, setMaxRoomSelection } = usePricing();
  const [hotelData, setHotelData] = useState(null);
  const [showMaxAlert, setShowMaxAlert] = useState(false);

  const roomCount = selectedRooms.filter((r) => r.roomName === room.RoomName).length;

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        if (room?.HotelCode) {
          const data = await getSingleHotelWithCode(room.HotelCode);
          setHotelData(data?.hotel);
        }
      } catch (err) {
        console.error("Error fetching hotel data:", err);
      }
    };
    fetchHotel();
  }, [room?.HotelCode]);

  const handleAddRoom = useCallback(() => {
    const maxRooms = room?.Availability || 3; // Default to 3 if Availability is undefined
    setMaxRoomSelection(maxRooms); // Set max room limit

    if (roomCount >= maxRooms) {
      setShowMaxAlert(true);
      return;
    }

    fetchRoomHotelDetails(room?._id, hotelData?.hotelCode).catch((err) => {
      console.error("Error adding room:", err);
    });
  }, [room, roomCount, hotelData, fetchRoomHotelDetails, setMaxRoomSelection]);

  const handleRemoveRoom = useCallback(() => {
    if (roomCount > 0) {
      removeRoom(room.RoomName);
      setShowMaxAlert(false); // Hide alert if rooms are reduced
    }
  }, [roomCount, room.RoomName, removeRoom]);

  const handleDismissAlert = () => {
    setShowMaxAlert(false);
  };

  return (
    <div className="bg-primary-white shadow-md rounded-lg overflow-hidden relative">
      <div className="relative">
        <img
          src={room?.RoomImage[0] || "placeholder-image-url"}
          alt={room.RoomName || "Room"}
          className="w-full h-64 object-cover"
        />
        {room?.Availability > 0 && room?.Availability <= 3 && (
          <span className="absolute top-6 right-0 bg-red-500 text-primary-white text-mobile/caption md:text-desktop/caption font-bold px-2 py-1 rounded-l-xl">
            {room.Availability === 1 ? "1 Room Left" : `${room.Availability} Rooms Left`}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">
        <h2
          onClick={() => navigate(`/room/${room._id}`)}
          className="cursor-pointer text-mobile/h5 md:text-desktop/h5 font-bold text-gray-700 hover:text-primary-green transition-colors"
        >
          {room.RoomName || "Unnamed Room"}
        </h2>

        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-mobile/body/2 md:text-desktop/body/1 font-semibold text-gray-600">
            <Icon name="guests" className="w-5 h-5" />
            <span>{room.maxGuests || 0} Guest Max</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="sqFt" className="w-5 h-5" />
            <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-600 font-semibold">
              {room.squareFeet || "N/A"} sq. ft. Area
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
              ₹ {room.discountRate || 0}
              <span className="text-mobile/body/2 md:text-desktop/caption text-gray-600 font-normal">
                /night <span className="text-gray-500 ml-2">incl. Taxes</span>
              </span>
            </p>
          </div>

          {room?.Availability === 0 ? (
            <button className="flex items-center border bg-primary-gray text-white rounded-lg px-3 py-1 gap-2 cursor-not-allowed">
              Sold Out
            </button>
          ) : (
            <div className="flex items-center border border-primary-green rounded-lg px-3 py-1 gap-2">
              <button
                className={`text-mobile/button md:text-2xl font-bold rounded text-primary-green ${
                  roomCount === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-primary-dark-green"
                }`}
                onClick={handleRemoveRoom}
                disabled={roomCount === 0}
              >
                <RemoveIcon />
              </button>
              <span className="text-mobile/h5 md:text-lg font-semibold text-primary-dark-green">
                {roomCount} {roomCount === 1 ? "Room" : "Rooms"}
              </span>
              <button
                className="text-mobile/button md:text-2xl font-bold rounded text-primary-green hover:text-primary-dark-green"
                onClick={handleAddRoom}
              >
                <AddIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {showMaxAlert && (
        <div className="absolute top-[16rem] right-0 z-10 bg-white border border-gray-300 px-2 py-4 rounded-md shadow-md w-64">
          <p className="text-gray-800 text-sm font-medium">
            Maximum of {maxRoomSelection} {maxRoomSelection === 1 ? "room" : "rooms"} allowed.
          </p>
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              onClick={handleDismissAlert}
              className="px-2 py-1 bg-gray-200 text-sm rounded-md hover:bg-gray-300 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

RoomsCard.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    RoomName: PropTypes.string,
    RoomImage: PropTypes.arrayOf(PropTypes.string),
    HotelCode: PropTypes.string,
    maxGuests: PropTypes.number,
    squareFeet: PropTypes.number,
    defaultRate: PropTypes.number,
    discountRate: PropTypes.number,
    Availability: PropTypes.number,
  }).isRequired,
};

export default RoomsCard;