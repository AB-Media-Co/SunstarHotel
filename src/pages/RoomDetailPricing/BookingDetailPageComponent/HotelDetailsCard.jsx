import { Add, Remove } from "@mui/icons-material";
import { usePricing } from "../../../Context/PricingContext";
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate } from "react-router-dom";
import { formatINR } from "../../../utils/formatCurrency";
import { generateHotelUrl } from "../../../utils/urlHelper";

export const HotelDetailsCard = () => {
  const { details, setDetails, selectedRooms, setSelectedRooms, setEditAddPricing } = usePricing();
  const navigate = useNavigate()
  const handleOptionChange = (index, newOption) => {
    setSelectedRooms((prevSelectedRooms) => {
      const updated = [...prevSelectedRooms];
      const discountRate = details[index]?.roomData?.discountRate || 0;
      const continentalPrice = details[index]?.continentalPlan?.rate?.amount || 0;
      const guestQty = updated[index]?.guestQty || 2;
      const baseAdultOccupancy = details[index]?.roomData?.baseAdultOccupancy || 2;
      const extraAdultRate = details[index]?.roomData?.extraAdultRate || 0;

      let updatedPrice = discountRate;

      // ✅ Add extra adult charges if guests exceed base occupancy (eZee API)
      if (guestQty > baseAdultOccupancy) {
        const extraAdults = guestQty - baseAdultOccupancy;
        updatedPrice += (extraAdultRate * extraAdults);
      }

      // Add continental breakfast charges
      if (newOption === "continental") {
        updatedPrice += (continentalPrice * guestQty);
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

      // Recalculate price with extra adult charges and Continental Plan (eZee API)
      const discountRate = details[index]?.roomData?.discountRate || 0;
      const continentalPrice = details[index]?.continentalPlan?.rate?.amount || 0;
      const currentOption = updatedRooms[index]?.option || "roomOnly";
      const baseAdultOccupancy = details[index]?.roomData?.baseAdultOccupancy || 2;
      const extraAdultRate = details[index]?.roomData?.extraAdultRate || 0;

      let updatedPrice = discountRate;

      // ✅ Add extra adult charges if current quantity exceeds base occupancy
      if (currentQty > baseAdultOccupancy) {
        const extraAdults = currentQty - baseAdultOccupancy;
        updatedPrice += (extraAdultRate * extraAdults);
      }

      // Add continental breakfast charges
      if (currentOption === "continental") {
        updatedPrice += (continentalPrice * currentQty);
      }

      updatedRooms[index] = {
        ...updatedRooms[index],
        guestQty: currentQty,
        showMaxGuestAlert,
        price: updatedPrice, // Update price with new guest count
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
    const hotelName = details[0]?.name || details[0]?.roomData?.hotelName;
    navigate(generateHotelUrl(details[0]?.hotelCode, hotelName));
  };

  return (
    <>
      {details?.map((data, index) => {
        const roomSelection = selectedRooms[index] || {
          roomName: data?.roomData?.RoomName || "",
          option: "roomOnly",
          price: data?.roomData?.discountRate || 0,
          guestQty: 2, // Default to 2 guests
          showMaxGuestAlert: false,
        };

        if (roomSelection.guestQty === 0) {
          return null;
        }


        return (
          <div   key={index} className="flex flex-col gap-2 md:gap-4">
            <div
            
              className="flex flex-row lg:h-[120px] w-full  py-4 rounded-md border-gray-300 bg-white gap-4 font-sans"
            >
              {/* Image Section */}
              <div className="w-1/2 md:w-1/3 relative">
                <img
                  src={data?.roomData?.roomImage[0]}
                  alt="Hotel Room"
                  className="rounded-md w-full h-full object-cover"
                />
                {/* <div className="absolute top-4 right-0 md:left-5 bg-white bg-opacity-75 px-3 py-1 rounded-l-full">
                <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">
                  Best Choice
                </p>
              </div> */}
              </div>


              {/* desktop */}
              {/* Hotel/Room Info */}
              <div className="hidden md:flex flex-col justify-center w-full gap-3 ">
                <p className="text-2xl font-bold text- ">
                  {data?.roomData?.RoomName}
                </p>

                <div className=" text-gray-800">
                  <div className="text-primary-green font-bold text-xl ">{formatINR(roomSelection.price)}</div>
                  <div className="text-xs font-semibold">Incl. taxes</div>
                </div>
              </div>

              {/* Guest Qty and Options */}
              <div className="hidden md:flex flex-col items-end  justify-end w-full lg:w-[490px] gap-4 relative">
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
                  <div className="absolute top-36 md:top-40 right-0 md:right-2 z-10 transform -translate-y-1/2 translate-x-4 bg-white border border-amber-200 px-4 py-3 rounded-lg md:w-[370px] shadow-lg w-72">
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



              </div>


              {/* mob */}


              <div className="w-full md:hidden ">
                <p className="text-lg md:text-2xl font-bold text- ">
                  {data?.roomData?.RoomName}
                </p>

                <div className="flex justify-between mt-4 gap-2 w-full">
                  <div className=" text-gray-800">
                    <div className="text-primary-green font-bold text-md md:text-xl ">{formatINR(roomSelection.price)}</div>
                    <div className="text-xs font-semibold">Incl. taxes</div>
                  </div>
                  {/* Guest Qty and Options */}
                  <div className="md:hidden flex flex-col justify-end  gap-4 relative">
                    {/* Guest Qty Counter */}
                    <div className="flex items-center justify-between w-full text-xs  border border-primary-yellow p-1 gap-1 rounded-md text-primary-yellow font-medium md:text-lg">
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
                      <div className="absolute top-36 md:top-40 right-2 md:right-2 z-10 transform -translate-y-1/2 translate-x-4 bg-white border border-amber-200 px-4 py-3 rounded-lg md:w-[370px] shadow-lg w-72">
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



                  </div>
                </div>

              </div>
            </div>

            {/* Room Options */}
            <div className="w-full flex flex-col md:flex-row md:items-center md:gap-4">
              <h3 className="text-xl font-medium text-gray-600 mb-2">Room Options:</h3>
              <div className="flex flex-col gap-2 pl-4 md:pl-0">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`roomOption-${index}`}
                    value="roomOnly"
                    checked={roomSelection.option === "roomOnly"}
                    onChange={() => handleOptionChange(index, "roomOnly")}
                    className="w-4 h-4 text-primary-green cursor-pointer border-2 border-primary-green focus:ring-primary-green"
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
                    className="w-4 h-4 text-primary-green cursor-pointer border-2 border-primary-green focus:ring-primary-green"
                  />
                  <span className="text-base text-gray-700 font-medium">
                    Continental Plan (Breakfast)
                  </span>
                </label>
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
