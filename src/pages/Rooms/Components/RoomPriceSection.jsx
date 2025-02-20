import { Add, Remove } from "@mui/icons-material";
import Icon from "../../../Components/Icons";
import { useState } from "react";

const RoomPriceSection = () => {
  const [roomQty, setRoomQty] = useState(1);

  const tabs = [
    { id: "rooms", iconName: "roundedbed", label: "Rooms", link: "#rooms" },
    { id: "amenities", iconName: "lamp", label: "Amenities", link: "#amenities" },
    { id: "reviews", iconName: "message", label: "Reviews", link: "#reviews" },
    { id: "location", iconName: "location", label: "Location", link: "#location" },
    { id: "faqs", iconName: "faqs", label: "FAQs", link: "#faqs" },
  ];

  return (
    <div className="content mx-auto bg-primary-white  p-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Left Section: Room Title and Pricing */}
        <div className="flex flex-col gap-4 text-[#058FA2]">
          <h1 className="text-2xl md:text-4xl font-bold">Superior King Room</h1>
          <p className="text-base md:text-lg">Book Direct for Lowest Prices!</p>
          <p className="text-xl md:text-2xl font-bold">
            ₹ 5,880{" "}
            <span className="text-sm md:text-base text-gray-500 font-normal">
              / night Incl. taxes
            </span>
          </p>
        </div>

        {/* Right Section: Check-in/Check-out Info & Room Quantity */}
        <div className="flex flex-col gap-6 items-end text-[#058FA2]">
          <div className="text-right">
            <p className="text-base md:text-lg">
              <span>Check-in </span>
              <span className="font-bold text-[#006167]">2:00pm</span>
            </p>
            <p className="text-base md:text-lg">
              <span>Check-out </span>
              <span className="font-bold text-[#006167]">11:00am</span>
            </p>
           
          </div>
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <button
              aria-label="Decrease Room Quantity"
              onClick={() => roomQty > 1 && setRoomQty(roomQty - 1)}
              className="text-yellow-500 hover:bg-yellow-100 rounded-full p-1 transition duration-200"
            >
              <Remove fontSize="small" />
            </button>
            <span className="mx-3 text-lg">
              {roomQty} {roomQty > 1 ? "Rooms" : "Room"}
            </span>
            <button
              aria-label="Increase Room Quantity"
              onClick={() => setRoomQty(roomQty + 1)}
              className="text-yellow-500 hover:bg-yellow-100 rounded-full p-1 transition duration-200"
            >
              <Add fontSize="small" />
            </button>
          </div>
          {/* <p className="text-xs md:text-sm text-gray-500 mt-2">
              Book directly to request Early Check-in / Late Check-out, as per availability.
            </p> */}
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Tabs Section */}
      <div className="flex flex-wrap justify-center md:justify-between gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}            className={`flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-lg transition duration-200 focus:outline-none `}
          >
            <Icon name={tab.iconName} className="h-6 w-6 md:h-8 md:w-8" />
            <span className="font-semibold text-sm md:text-base">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomPriceSection;
