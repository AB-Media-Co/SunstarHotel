import { Add, Remove } from "@mui/icons-material";
import Icon from "../../../Components/Icons";
import { useState } from "react";

const RoomPriceSection = () => {
    const [RoomQty, setRoomQty] = useState(1);

    const tabs = [
        { iconName: "roundedbed", label: "Rooms", link: "#rooms" },
        { iconName: "lamp", label: "Amenities", link: "#amenities" },
        { iconName: "message", label: "Reviews", link: "#reviews" },
        { iconName: "location", label: "Location", link: "#location" },
        { iconName: "faqs", label: "FAQs", link: "#faqs" },
    ];

    return (
        <div className="content py-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-5 w-full justify-between">
                <div className="flex w-full text-[#058FA2] flex-col gap-6">
                    <h1 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold">Superior King Room</h1>
                    <p className="text-sm sm:text-base">Book Direct for Lowest Prices!</p>
                    <p className="text-[20px] sm:text-[24px] md:text-[26px] font-bold">₹ 5,880 <span className="text-gray-400 text-xs sm:text-sm font-normal"> / night Incl. taxes</span></p>
                </div>
                <div className="text-[#058FA2] w-full justify-between gap-6 flex flex-col md:w-[700px]">
                    <div>
                        <p className="text-[18px] sm:text-[22px] md:text-[26px]">
                            Check-in <span className="text-[#006167] font-bold"> 2:00pm</span> Check-out <span className="text-[#006167] font-bold">11:00am</span>
                        </p>
                        <p className="text-[10px] sm:text-[12px]">
                            Book directly to request Early Check-in / Late Check-out, as per availability.
                        </p>
                    </div>
                    <div className="flex w-[180px]  md:w-[220px] border-2 p-1 md:p-2 justify-center gap-2 text-[20px] sm:text-[24px] md:text-[26px] rounded-xl items-center">
                        <span className="cursor-pointer text-yellow-500" onClick={() => RoomQty > 1 && setRoomQty(RoomQty - 1)}>
                            <Remove />
                        </span>
                        {RoomQty} {RoomQty>1 ?'Rooms':'Room'} 
                        <span className="cursor-pointer text-yellow-500" onClick={() => setRoomQty(RoomQty + 1)}>
                            <Add />
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-between md:justify-start items-center mt-6 gap-4 md:gap-12 w-full">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center cursor-pointer text-[#006167]"
                    >
                        <Icon
                            name={tab.iconName}
                            className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#006167]"
                        />
                        <span
                            className="font-semibold text-xs sm:text-sm md:text-base lg:text-[24px]"
                        >
                            {tab.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomPriceSection;
