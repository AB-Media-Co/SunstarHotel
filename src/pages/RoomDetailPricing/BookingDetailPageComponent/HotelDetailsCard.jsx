import { Add, Remove } from "@mui/icons-material";
import { usePricing } from "../../../Context/PricingContext";
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate } from "react-router-dom";

export const HotelDetailsCard = () => {
  const { details, setDetails, selectedRooms, setSelectedRooms, setEditAddPricing } = usePricing();
  const navigate = useNavigate()
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
      const maxGuests = details[index]?.roomData?.maxGuests || 2;

      let currentQty = updatedRooms[index]?.guestQty ?? 2;
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

  const handelChangeClick = () => {
    setEditAddPricing(true);
    localStorage.setItem("editAddPricing", true);
    navigate(`/hotels/${details[0]?.hotelCode}`);
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
            className="flex flex-col lg:flex-row lg:h-[200px] w-full  py-4 rounded-md border-gray-300 bg-white gap-4 font-sans"
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/3 relative">
              <img
                src={data?.roomData?.roomImage[0]}
                alt="Hotel Room"
                className="rounded-md w-full h-full object-cover"
              />
              <div className="absolute top-4 right-0 md:left-5 bg-white bg-opacity-75 px-3 py-1 rounded-l-full">
                <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">
                  Best Choice
                </p>
              </div>
            </div>

            {/* Hotel/Room Info */}
            <div className="flex flex-col justify-center w-full gap-2">

              <p className="text-2xl font-bold text-[#288592] mb-1">
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
            <div className="flex flex-col items-start w-full lg:w-[490px] gap-4 relative">
              {/* Guest Qty Counter */}
              <div className="flex items-center justify-between w-full lg:w-[180px] border border-primary-yellow p-2 gap-4 rounded-xl text-primary-yellow font-medium text-lg">
                <span
                  className="cursor-pointer text-primary-yellow  hover:text-yellow-500"
                  onClick={() => handleGuestQtyChange(index, "decrement")}
                >
                  <Remove />
                </span>
                <span>
                  {roomSelection.guestQty > 1 ? `${roomSelection.guestQty} Guests` : "1 Guest"}
                </span>
                <span
                  className="cursor-pointer text-primary-yellow  hover:text-yellow-500"
                  onClick={() => handleGuestQtyChange(index, "increment")}
                >
                  <Add />
                </span>
              </div>

              {/* Alert if exceeding maxGuests */}
              {roomSelection.showMaxGuestAlert && (
                <div className="absolute top-36 md:top-32 md:right-2 z-10 transform -translate-y-1/2 translate-x-4 bg-white border border-amber-200 px-4 py-3 rounded-lg md:w-[370px] shadow-lg w-72">
                  <div className="flex items-start">
                    <WarningIcon size={18} className="text-primary-yellow mt-0.5 mr-2 flex-shrink-0" />
                    <div className="flex-1">

                      <p className="text-md text-gray-500 mt-1">
                        Guest Limit Reached
                        This room allows a maximum of {data?.roomData?.maxGuests} guests per booking. Please adjust your selection.
                      </p>
                      <div className="flex items-center justify-between gap-2 mt-3">

                        <button
                          onClick={handelChangeClick}
                          className=" text-primary-yellow  hover:underline text-lg font-medium   transition-colors"
                        >
                          Modify Rooms
                        </button>
                        <button
                          onClick={() =>
                            setSelectedRooms((prev) => {
                              const updated = [...prev];
                              updated[index].showMaxGuestAlert = false;
                              return updated;
                            })
                          }
                          className=" text-gray-400 hover:underline font-medium  text-lg"
                        >
                          Dismiss
                        </button>

                      </div>
                    </div>

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
