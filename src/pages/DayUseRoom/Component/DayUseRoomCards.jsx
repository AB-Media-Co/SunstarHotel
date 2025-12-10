/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../../Components/Icons";

const DayUseRoomCards = ({ room, disabled, setShowLoginModal, setShowPaymentModal, setDayUseRoomData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const verifiedUser = localStorage.getItem("user_email") !== null;

  const OnDayUseRoomBooking = (room) => {
    if (!verifiedUser) {
      setShowLoginModal(true);
      return;
    }
    setDayUseRoomData(room)
    setShowPaymentModal(true);
  };

  return (
    <div className="bg-primary-white  shadow-md rounded-lg overflow-hidden relative">
      <div
        className="relative h-64 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 bg-center bg-cover transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${room?.room?.RoomImage?.[0] || "/images/HotelsImages/1.webp"})`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div
          className={`absolute cursor-pointer inset-0 bg-black transition-opacity duration-200 ease-in-out ${isHovered ? 'opacity-20' : 'opacity-0'
            }`}
        />
        <span className="absolute top-6 right-0 bg-red-500 text-primary-white text-mobile/caption md:text-desktop/caption font-bold px-2 py-1 rounded-l-xl z-10">
          {room?.dayUse?.availability === 1 ? "1 Room Left" : `${room?.dayUse?.availability} Rooms Left`}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div>
          <h2
            className="cursor-pointer text-mobile/h5text-desktop/h5/medium md:text-desktop/h5/medium  text-gray-700 hover:text-primary-green transition-colors"
          >
            {room?.hotel?.name || "Unnamed"}
          </h2>

          <h2
            className="cursor-pointer text-mobile/h5 md:text-desktop/h5 font-bold text-gray-700 hover:text-primary-green transition-colors"
          >
            {room?.room?.RoomName || "Unnamed Room"}
          </h2>

        </div>


        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-mobile/body/2 md:text-desktop/body/1 font-semibold text-gray-600">
            <Icon name="guests" className="w-5 h-5" />
            <span>{room?.room?.maxGuests || 0} Guest Max</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="sqFt" className="w-5 h-5" />
            <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-600 font-semibold">
              {room?.room?.squareFeet || "N/A"} sq. ft. Area
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>

            <p className="text-mobile/h5 md:text-desktop/h5 font-bold text-[#058FA2]">
              ₹ {room.dayUse.rate || 0}
              <span className="text-mobile/body/2 md:text-desktop/caption text-gray-600 font-normal">
                /day <span className="text-gray-500 ml-2">incl. Taxes</span>
              </span>
            </p>
          </div>

          {room?.dayUse?.availability === 0 ? (
            <button className="flex items-center border bg-primary-gray text-white rounded-lg px-3 py-1 gap-2 cursor-not-allowed">
              Sold Out
            </button>
          ) : (
            <button disabled={disabled} className={`${disabled ? 'cursor-not-allowed bg-primary-gray' : 'cursor-pointer bg-primary-green'} flex items-center border text-white   rounded-2xl px-6 py-2 `}
              onClick={() => OnDayUseRoomBooking(room)}
            >
              Book
            </button>
          )}
        </div>
      </div>



    </div>
  );
};

DayUseRoomCards.propTypes = {
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

export default DayUseRoomCards;