import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { usePricing } from "../../../Context/PricingContext";

export const HotelDetailsCard = ({ RoomQty, setRoomQty }) => {
  const { details, selectedRooms, setSelectedRooms } = usePricing();

  const handleOptionChange = (index, newOption) => {
    setSelectedRooms((prevSelectedRooms) => {
      const updated = [...prevSelectedRooms];
      const discountRate = details[index]?.roomData?.discountRate || 0;
      const continentalPrice = details[index]?.continentalPlan?.rate?.amount || 0;
      let updatedPrice = discountRate;

      if (newOption === "continental") {
        updatedPrice += continentalPrice;
      }

      updated[index] = {
        ...updated[index],
        option: newOption,
        price: updatedPrice,
      };

      return updated;
    });
  };

  return (
    <>
      {details?.map((data, index) => {
        const roomSelection = selectedRooms[index] || {
          roomName: data?.roomData?.RoomName || "",
          option: "roomOnly",
          price: data?.roomData?.discountRate || 0,
        };

        return (
          <div
            key={index}
            className="flex flex-col lg:flex-row lg:h-[200px] w-full border p-4 rounded-md border-gray-300 bg-primary-white gap-4"
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/3 relative">
              <img
                src={data?.aboutUs?.img}
                alt="Hotel Room"
                className="rounded-md w-full h-full object-cover"
              />
              <p className="text-[#FDC114] px-4 py-1 top-[116px] rounded-e-full font-semibold absolute bg-primary-white overflow-hidden animate-wipe">
                <span className="inline-block primary-whitespace-nowrap">Best Choice</span>
              </p>
            </div>

            {/* Hotel/Room Info */}
            <div className="flex flex-col justify-center w-full gap-2">
              <h2 className="text-2xl font-bold text-[#288592]">{data?.name}</h2>
              <p className="text-lg text-black font-semibold">{data?.roomData?.RoomName}</p>
              <p className="text-sm md:max-w-xs text-primary-gray font-normal">
                {data?.name + ", " + data?.location?.hotelAddress}
              </p>
              <p className="text-md font-semibold">Price: ₹{roomSelection.price}</p>
            </div>

            {/* Guest Qty and Options */}
            <div className="flex flex-col items-start w-full lg:w-[400px] gap-4">
              <div className="flex items-center justify-between w-full lg:w-[180px] text-[#288592] font-medium border-2 p-2 gap-4 text-lg rounded-xl">
                <span
                  className="cursor-pointer text-yellow-500"
                  onClick={() => RoomQty > 1 && setRoomQty(RoomQty - 1)}
                >
                  <Remove />
                </span>
                {RoomQty} {RoomQty > 1 ? "Guests" : "Guest"}
                <span
                  className="cursor-pointer text-yellow-500"
                  onClick={() => setRoomQty(RoomQty + 1)}
                >
                  <Add />
                </span>
              </div>
              <div className="w-full">
                <h3 className="text-gray-500 text-xl font-bold">Room Options:</h3>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`roomOption-${index}`}
                      value="roomOnly"
                      checked={roomSelection.option === "roomOnly"}
                      onChange={() => handleOptionChange(index, "roomOnly")}
                      className="w-4 h-4 text-[#288592] cursor-pointer border-2 border-[#288592] focus:ring-[#288592]"
                    />
                    <span className="text-base text-gray-500 font-semibold">Room only</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`roomOption-${index}`}
                      value="continental"
                      checked={roomSelection.option === "continental"}
                      onChange={() => handleOptionChange(index, "continental")}
                      className="w-4 h-4 text-[#288592] cursor-pointer border-2 border-[#288592] focus:ring-[#288592]"
                    />
                    <span className="text-base text-gray-500 font-semibold">
                      Continental Plan (breakfast)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* <button
        onClick={() => console.log("Selected Rooms:", selectedRooms)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Log Current Selections
      </button> */}
    </>
  );
};
