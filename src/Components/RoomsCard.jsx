import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { getSingleHotelWithCode } from "../ApiHooks/useHotelHook2";
import { usePricing } from "../Context/PricingContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Icon from "./Icons";
import WarningIcon from '@mui/icons-material/Warning';
import { formatINR } from "../utils/formatCurrency";
const RoomsCard = ({ room }) => {
  const navigate = useNavigate();
  const { fetchRoomHotelDetails, selectedRooms, removeRoom, maxRoomSelection, setMaxRoomSelection } = usePricing();
  const [hotelData, setHotelData] = useState(null);
  const [showMaxAlert, setShowMaxAlert] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

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
    const maxRooms = room?.Availability > 3 ? 3 : room?.Availability;

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
      <div
        className="relative h-64 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 bg-center bg-cover transition-all duration-700 ease-in-out"
          onClick={() => navigate(`/room/${room._id}`)}
          style={{
            backgroundImage: `url(${room?.RoomImage[0] || "placeholder-image-url"})`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div
          onClick={() => navigate(`/room/${room._id}`)}
          className={`absolute cursor-pointer inset-0 bg-black transition-opacity duration-200 ease-in-out ${isHovered ? 'opacity-20' : 'opacity-0'
            }`}
        />

        {room?.Availability > 0 && room?.Availability <= 3 && (
          <span className="absolute top-6 right-0 bg-red-500 text-primary-white text-mobile/caption md:text-desktop/caption font-bold px-2 py-1 rounded-l-xl z-10">
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
            <Icon name="User" className="w-5 h-5" />
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
                {formatINR(room.defaultRate)}
              </p>
            )}
            <p className="text-mobile/h5 md:text-desktop/h5 font-bold text-[#058FA2]">
              {formatINR(room.discountRate || 0)}
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
            <div className="flex items-center border border-primary-yellow rounded-lg px-2 py-2 gap-4">
              <button
                className={`font-bold  text-primary-yellow cursor-pointer ${roomCount === 0 ? "opacity-50 cursor-not-allowed hidden" : ""
                  }`}
                onClick={handleRemoveRoom}
              // disabled={roomCount === 0}
              >
                <RemoveIcon />
              </button>
              {roomCount === 0 ? (
                <>
                  <span className="font-semibold  text-primary-yellow cursor-pointer" onClick={handleAddRoom} >
                    Add Room
                  </span>
                </>
              ) : (
                <>
                  <span className="font-semibold w-[65px] text-primary-yellow" >

                    {roomCount} {roomCount === 1 ? "Room" : "Rooms"}
                  </span></>
              )
              }

              <button
                className={`font-bold  text-primary-yellow cursor-pointer ${roomCount === 0 ? "hidden" : ""} `}
                onClick={handleAddRoom}
              >
                <AddIcon />
              </button>
            </div>
          )}
        </div>
      </div >

      {showMaxAlert && (
        <div className="absolute top-[11rem] right-1 z-10 bg-white border border-gray-300 px-4 py-5 rounded-md shadow-md w-72">
          <div className="flex items-start mb-3 gap-2">
            <WarningIcon className="text-primary-yellow" />
            <p className="text-gray-500 text-xs">
              {/* Booking limit reached. Maximum of {maxRoomSelection} {maxRoomSelection === 1 ? "room" : "rooms"} per reservation.
              Please complete your current booking or adjust your selection to proceed. */}

              For a stay of 1 night, only 3 rooms can be selected. Online bookings are limited to 30 units
              (rooms x nights) and a maximum of 3 rooms per booking.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 mt-1 border-t pt-3">
            <button
              onClick={() => window.location.href = "/booking-form"}
              className="py-1.5 px-3 text-sm font-medium text-primary-yellow rounded-md hover:bg-blue-50 transition-colors"
            >
              Book More
            </button>
            <button
              onClick={handleDismissAlert}
              className="py-1.5 px-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div >
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