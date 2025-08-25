import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePricing } from "../Context/PricingContext";
import { FlashOnRounded } from "@mui/icons-material";

const BottomRoomSticky = () => {
  const navigate = useNavigate();
  const { details, selectedRooms, setEditAddPricing, finalPrice, nights } = usePricing();
  const [isVisible, setIsVisible] = useState(false);

  const isRooomHidden = location.pathname.startsWith("/room");
  useEffect(() => {
    if (selectedRooms.length && details.length || isRooomHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedRooms, details, isRooomHidden]);

  const onContinueClick = () => {
    setEditAddPricing(false);
    navigate("/room/details");
  };

  const days = parseInt(localStorage.getItem("days"), 10) || nights; // Fallback to context nights
  const totalPrice = finalPrice * days;

  if ((!selectedRooms.length || !details.length) && !isRooomHidden) return null;

  return (
    <div
      className={`w-full  z-10 bottom-0 left-0 right-0 bg-white shadow-lg border py-3 fixed ${isVisible ? "wipe-up" : "wipe-down"
        }`}
    >

      <div className="flex w-full">

        <div className="flex content md:items-center flex-col md:flex-row justify-between gap-2 ">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              {selectedRooms.length === 1 &&
                <span className="text-primary-dark-green text-lg  md:text-xl font-bold">
                  ₹ {totalPrice}
                </span>
              }
              <h1 className="font-bold text-primary-gray text-xs sm:text-sm md:text-xl">
                {selectedRooms.length} {selectedRooms.length === 1 ? "Room" : "Rooms"}
              </h1>
            </div>
            {
              details.length > 1 &&

              <p className="text-primary-gray text-xs sm:text-sm md:text-base">
                {details[0]?.name || "Hotel"} - {details[0]?.cityLocation?.name || "Location"}
              </p>
            }
          </div>

          <div className="flex gap-4 items-center">
            <p className="text-primary-yellow text-sm font-medium italic">
              <FlashOnRounded className=" rotate-[20deg] font-extralight" />
              Lowest Price, Guaranteed!
            </p>

            <div
              onClick={onContinueClick}
              className="bg-primary-green md:block hidden text-xs sm:text-sm md:text-lg py-2 px-4 rounded-lg text-white font-medium cursor-pointer hover:bg-primary-dark-green transition-colors"
            >
              Continue
            </div>
          </div>


        </div>
        <div
          onClick={onContinueClick}
          className="bg-primary-green flex items-center md:hidden  text-md md:text-lg py-2 px-4 rounded-lg text-white font-medium cursor-pointer hover:bg-primary-dark-green transition-colors"
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default BottomRoomSticky;
