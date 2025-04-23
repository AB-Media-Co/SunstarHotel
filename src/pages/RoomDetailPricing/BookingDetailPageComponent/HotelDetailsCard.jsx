import { Add, Remove } from "@mui/icons-material";
import { usePricing } from "../../../Context/PricingContext";

export const HotelDetailsCard = () => {
  const { details, setDetails, selectedRooms, setSelectedRooms } = usePricing();

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

  const handleGuestQtyChange = (index, type) => {
    setSelectedRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      const maxGuests = details[index]?.roomData?.maxGuests || 1;

      let currentQty = updatedRooms[index]?.guestQty ?? 1;
      let showMaxGuestAlert = updatedRooms[index]?.showMaxGuestAlert ?? false;

      if (type === "increment") {
        if (currentQty < maxGuests) {
          currentQty += 1;
          showMaxGuestAlert = false;
        } else {
          showMaxGuestAlert = true;
        }
      } else if (type === "decrement") {
        if (currentQty > 0) {
          currentQty -= 1;
        }
        showMaxGuestAlert = false;
      }

      updatedRooms[index] = {
        ...updatedRooms[index],
        guestQty: currentQty,
        showMaxGuestAlert,
      };

      if (currentQty === 0) {
        updatedRooms.splice(index, 1);
        setDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
      }

      return updatedRooms;
    });
  };

  return (
    <>
      {details?.map((data, index) => {
        const roomSelection = selectedRooms[index] || {
          roomName: data?.roomData?.RoomName || "",
          option: "roomOnly",
          price: data?.roomData?.discountRate || 0,
          guestQty: 1,
          showMaxGuestAlert: false,
        }; 

        if (roomSelection.guestQty === 0) {
          return null;
        }

        return (
          <div
            key={index}
            className="flex flex-col lg:flex-row lg:h-[200px] w-full border p-4 rounded-md border-gray-300 bg-white gap-4 font-sans"
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/3 relative">
              <img
                src={data?.aboutUs?.img}
                alt="Hotel Room"
                className="rounded-md w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white bg-opacity-75 px-3 py-1 rounded-full">
                <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider">
                  Best Choice
                </p>
              </div>
            </div>

            {/* Hotel/Room Info */}
            <div className="flex flex-col justify-center w-full gap-2">
              <h2 className="text-2xl font-bold text-[#288592] mb-1">
                {data?.name}
              </h2>
              <p className="text-lg font-semibold text-black mb-1">
                {data?.roomData?.RoomName}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                {data?.name}, {data?.cityLocation?.name}
              </p>
              <p className="text-md font-semibold text-gray-800">
                Price: <span className="text-[#288592]">₹{roomSelection.price}</span>
              </p>
            </div>

            {/* Guest Qty and Options */}
            <div className="flex flex-col items-start w-full lg:w-[400px] gap-4 relative">
              {/* Guest Qty Counter */}
              <div className="flex items-center justify-between w-full lg:w-[180px] border-2 p-2 gap-4 rounded-xl text-[#288592] font-medium text-lg">
                <span
                  className="cursor-pointer hover:text-yellow-500"
                  onClick={() => handleGuestQtyChange(index, "decrement")}
                >
                  <Remove />
                </span>
                <span>
                  {roomSelection.guestQty > 1 ? `${roomSelection.guestQty} Guests` : "1 Guest"}
                </span>
                <span
                  className="cursor-pointer hover:text-yellow-500"
                  onClick={() => handleGuestQtyChange(index, "increment")}
                >
                  <Add />
                </span>
              </div>

              {/* Alert if exceeding maxGuests */}
              {roomSelection.showMaxGuestAlert && (
                <div className="absolute top-[3rem] right-0 z-10 bg-white border border-gray-300 px-4 py-3 rounded-md shadow-md w-64">
                  <p className="text-sm font-medium text-gray-800">
                    Maximum of {data?.roomData?.maxGuests} guests allowed.
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button
                      onClick={() =>
                        setSelectedRooms((prev) => {
                          const updated = [...prev];
                          updated[index].showMaxGuestAlert = false;
                          return updated;
                        })
                      }
                      className="px-2 py-1 bg-gray-200 text-sm rounded-md"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* Room Options */}
              <div className="w-full">
                <h3 className="text-xl font-bold text-gray-600 mb-2">Room Options:</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`roomOption-${index}`}
                      value="roomOnly"
                      checked={roomSelection.option === "roomOnly"}
                      onChange={() => handleOptionChange(index, "roomOnly")}
                      className="w-4 h-4 text-[#288592] cursor-pointer border-2 border-[#288592] focus:ring-[#288592]"
                    />
                    <span className="text-base text-gray-700 font-medium">
                      Room Only
                    </span>
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
                    <span className="text-base text-gray-700 font-medium">
                      Continental Plan (Breakfast)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {details.length <= 0 && (
        <p className="text-center text-gray-500 text-lg font-medium">
          No data available.
        </p>
      )}
    </>
  );
};
