import { usePricing } from "../../../Context/PricingContext";
import { useNavigate } from "react-router-dom";
import Icon from "../../../Components/Icons";
// import GuestsDropdown from "../../../Components/GuestsDropdown";
import { ArrowRightAlt } from "@mui/icons-material";

import {
    differenceInCalendarDays,
    format,
} from "date-fns";




export const HeaderHotel = () => {
    const { details,  setEditAddPricing } = usePricing();
    const getHotelDataLocal = localStorage.getItem("hotelInfo");
    const getHotelData = JSON.parse(getHotelDataLocal);

    const checkIn = localStorage.getItem("checkInDate");
    const checkOut = localStorage.getItem("checkOutDate");
    console.log(getHotelData)
    const navigate = useNavigate()


    const calculateNights = () => {
        if (checkIn && checkOut) {
            return (
                <div>
                    ({differenceInCalendarDays(new Date(checkOut), new Date(checkIn))}{" "}
                    Nights)
                </div>
            );
        }
        return 0;
    };

    const handelChangeClick = () => {
        setEditAddPricing(true);
        localStorage.setItem("editAddPricing", true);
        navigate(`/hotels/${details[0]?.hotelCode}`);
    };

    return (
        <div className="flex flex-col gap-4 py-6 border-b-2">
            <div className="text-mobile/h3 text-gray-500 md:text-desktop/h3">{getHotelData?.name}</div>
            <div className="text-mobile/small/body font-medium md:font-medium text-gray-500 md:text-desktop/body/1">{getHotelData?.location?.hotelAddress}</div>

            <div className="flex gap-4 flex-col">
                <div
                    className="flex flex-row items-center gap-4  md:gap-10 "
                >
                    <div className={`flex flex-col`}>
                        <span className="font-semibold text-[14px] text-gray-500 md:text-xl">
                            {checkIn ? format(checkIn, "dd MMM, EEEE") : "Check in"}
                        </span>
                        <p className="text-[9px] md:text-sm  font-medium text-gray-500">Check-in {details[0]?.checkIn || "1:00 PM"}</p>

                    </div>
                    <ArrowRightAlt className="text-yellow-500" />
                    <div className={`flex flex-col`}>
                        <span className="font-semibold text-[14px] text-gray-500 md:text-xl">
                            {checkOut ? format(checkOut, "dd MMM, EEEE") : "Check-out"}
                        </span>
                        <p className="text-[9px] md:text-sm  font-medium text-gray-500">Check-out {details[0]?.checkOut || "11:00 AM"}</p>

                    </div>
                    {checkIn && checkOut && (
                        <span className="flex items-center text-gray-500 justify-center font-semibold text-[10px] md:text-base rounded-full md:border border-gray-300 px-3 py-2 md:py-1">
                            {calculateNights()}
                        </span>
                    )}
                </div>
            </div>

            <div className=" border-gray-200 flex items-center justify-between">

                <button
                    onClick={handelChangeClick}
                    className="py-1 text-lg font-medium underline text-primary-yellow rounded-full transition"
                >
                    Change Date /Room Selection
                </button>
            </div>
        </div>

        // </div >
    );
};

