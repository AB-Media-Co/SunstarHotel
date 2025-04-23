import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePricing } from "../Context/PricingContext";

const BottomRoomSticky = () => {
  const navigate = useNavigate();
  const { details, selectedRooms, setEditAddPricing, finalPrice, nights } = usePricing();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedRooms.length && details.length) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedRooms, details]);

  const onContinueClick = () => {
    setEditAddPricing(false);
    navigate("/room/details");
  };

  const days = parseInt(localStorage.getItem("days"), 10) || nights; // Fallback to context nights
  const totalPrice = finalPrice * days;

  if (!selectedRooms.length || !details.length) return null;

  return (
    <div
      className={`w-full z-10 bottom-0 left-0 right-0 bg-white shadow-lg border py-6 fixed ${
        isVisible ? "wipe-up" : "wipe-down"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <span className="text-primary-dark-green text-sm sm:text-base md:text-xl font-bold">
              ₹ {totalPrice} x <span className="text-primary-gray font-medium text-xs sm:text-sm">{days} Night</span>
            </span>
            <h1 className="font-bold text-primary-gray text-xs sm:text-sm md:text-base">
              {selectedRooms.length} {selectedRooms.length === 1 ? "Room" : "Rooms"}
            </h1>
          </div>
          <p className="text-primary-gray text-xs sm:text-sm md:text-base">
            {details[0]?.name || "Hotel"} - {details[0]?.cityLocation?.name || "Location"}
          </p>
        </div>

        <div
          onClick={onContinueClick}
          className="bg-primary-green text-xs sm:text-sm md:text-lg py-2 px-4 rounded-lg text-white font-medium cursor-pointer hover:bg-primary-dark-green transition-colors"
        >
          Continue Booking
        </div>
      </div>
    </div>
  );
};

export default BottomRoomSticky;
