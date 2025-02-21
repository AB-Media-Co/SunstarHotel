/* eslint-disable react/prop-types */
import { Add, Remove } from "@mui/icons-material";
import Icon from "../../../Components/Icons";
import { useState } from "react";

const RoomPriceSection = ({ roomData }) => {
  const [roomQty, setRoomQty] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const tabs = [
    { id: "rooms", iconName: "roundedbed", label: "Rooms", link: "#rooms" },
    { id: "amenities", iconName: "lamp", label: "Amenities", link: "#amenities" },
    { id: "reviews", iconName: "message", label: "Reviews", link: "#reviews" },
    { id: "location", iconName: "location", label: "Location", link: "#location" },
    { id: "faqs", iconName: "faqs", label: "FAQs", link: "#faqs" },
  ];

  const increaseRoomQty = () => {
    if (roomQty >= 3) {
      setShowAlert(true);
    } else {
      setRoomQty(roomQty + 1);
    }
  };

  const decreaseRoomQty = () => {
    if (roomQty > 1) {
      setRoomQty(roomQty - 1);
    }
  };

  return (
    <div className="content mx-auto bg-primary-white p-6 relative">
      {showAlert && (
        <div className="absolute top-20 right-4 bg-white border border-gray-300 p-4 rounded-md shadow-md z-50 max-w-xs text-sm text-gray-700">
          <p className="font-bold">For a stay of 15 nights, only 2 rooms can be selected.</p>
          <p className="mt-2">
            Online bookings are limited to 30 units (rooms x nights) and a maximum of 3 rooms per booking.
          </p>
          <div className="flex items-center justify-end mt-4 gap-2">
            <button
              onClick={() => {
                // “Book More” logic here, or redirect to a different page
                alert("Book more clicked!");
              }}
              className="px-3 py-1 bg-primary-green text-white rounded-full hover:bg-primary-green/90"
            >
              Book More
            </button>
            <button
              onClick={() => setShowAlert(false)}
              className="px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Left Section: Room Title and Pricing */}
        <div className="flex flex-col gap-4 text-[#058FA2]">
          <h1 className="text-2xl md:text-4xl font-bold">{roomData?.RoomName}</h1>
          <p className="text-base md:text-lg">Book Direct for Lowest Prices!</p>
          <div className="flex items-center gap-4">
            {roomData?.defaultRate && (
              <span className="text-sm md:text-base text-red-500 font-bold line-through">
                ₹ {roomData?.defaultRate}
              </span>
            )}
            <p className="text-xl md:text-2xl font-bold">
              ₹ {roomData?.discountRate}{" "}
              <span className="text-sm md:text-base text-gray-500 font-normal">
                / night Incl. taxes
              </span>
            </p>
          </div>
        </div>

        {/* Right Section: Check-in/Check-out Info & Room Quantity */}
        <div className="flex flex-col gap-6 items-end text-[#058FA2]">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <button
              aria-label="Decrease Room Quantity"
              onClick={decreaseRoomQty}
              className="text-yellow-500 hover:bg-yellow-100 rounded-full p-1 transition duration-200"
            >
              <Remove fontSize="small" />
            </button>
            <span className="mx-3 text-lg">
              {roomQty} {roomQty > 1 ? "Rooms" : "Room"}
            </span>
            <button
              aria-label="Increase Room Quantity"
              onClick={increaseRoomQty}
              className="text-yellow-500 hover:bg-yellow-100 rounded-full p-1 transition duration-200"
            >
              <Add fontSize="small" />
            </button>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Tabs Section */}
      <div className="flex flex-wrap justify-center md:justify-between gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-lg transition duration-200 focus:outline-none"
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
