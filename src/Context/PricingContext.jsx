import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import ConfirmationModal from "./ConfirmationModal";

const PricingContext = createContext();

export const PricingProvider = ({ children }) => {
  const location = useLocation();

  const [editAddPricing, setEditAddPricing] = useState(() => {
    const saved = localStorage.getItem("editAddPricing");
    return saved === "true";
  });

  const [maxRoomSelection, setMaxRoomSelection] = useState(3); // Default to 3

  const [details, setDetails] = useState(() => {
    const storedDetails = localStorage.getItem("roomHotelDetails");
    return storedDetails ? JSON.parse(storedDetails) : [];
  });


  const [selectedRooms, setSelectedRooms] = useState(() =>
    details.map((item) => ({
      roomName: item?.roomData?.RoomName || "",
      option: "roomOnly",
      price: item?.roomData?.discountRate || 0,
      RoomTypeID: item?.roomData?.RoomTypeID,
      RateTypeID: item?.roomData?.RateTypeID,
      roomrateunkid: item?.roomData?.roomrateunkid,
    }))
  );

  const [selectedOtherCharges, setSelectedOtherCharges] = useState([]);
  const [totalOtherCharges, setTotalOtherCharges] = useState(0);

  const [hotelData, sethotelData] = useState(() => {
    const storedHotelData = localStorage.getItem("hotelData");
    return storedHotelData ? JSON.parse(storedHotelData) : null;
  });

  const [nights, setNights] = useState(1);
  const [baseFinalPrice, setBaseFinalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [someOneElse, setSomeoneElse] = useState(false);
  const [guestData, setGuestData] = useState([])

  const [guestDetails, setGuestDetails] = useState(() => {
    const storedGuestDetails = localStorage.getItem("guestDetails");
    return storedGuestDetails ? JSON.parse(storedGuestDetails) : { rooms: 1 };
  });

  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [navColor, setIsNavColor] = useState(false);
  const [dayUseRoom, setDayUseRoom] = useState(false);


  // Functions to control the Hotel Modal
  const openHotelModal = () => setIsHotelModalOpen(true);
  const closeHotelModal = () => setIsHotelModalOpen(false);

  // Confirmation Modal state
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Functions to control the Confirmation Modal
  const openConfirmationModal = () => setIsConfirmationModalOpen(true);
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  const resetMaxRoomSelection = () => setMaxRoomSelection(3);

  useEffect(() => {
    const daysFromStorage = localStorage.getItem("days");
    const days = daysFromStorage ? parseInt(daysFromStorage, 10) : 1;

    // Base sum of other charges
    const sumOtherCharges = selectedOtherCharges.reduce((acc, charge) => {
      const amount = charge.rate?.amount || 0;
      const period = charge.rate?.period?.toLowerCase();

      if (period === "per day" || period === "per night") {
        return acc + amount * days;
      }
      return acc + amount;
    }, 0);

    // ✅ Room total (base tariff)
    const roomTotal = selectedRooms.reduce(
      (acc, room) => acc + room.price * nights,
      0
    );

    // ✅ GST Slab logic
    let gstRate = 0;
    if (roomTotal >= 1000 && roomTotal <= 7500) {
      gstRate = 0.05;
    } else if (roomTotal > 7500) {
      gstRate = 0.18;
    }

    // ✅ Apply GST on roomTotal only (not on other charges, unless needed)
    const gstAmount = roomTotal * gstRate;

    // ✅ Final total other charges = existing charges + GST
    setTotalOtherCharges(sumOtherCharges + gstAmount);
  }, [selectedOtherCharges, selectedRooms, nights]);


  useEffect(() => {
    const roomTotal = selectedRooms.reduce(
      (acc, room) => acc + room.price * nights,
      0
    );
    const computedBaseFinal = roomTotal + totalOtherCharges;
    setBaseFinalPrice(computedBaseFinal);
    setFinalPrice(computedBaseFinal);
  }, [selectedRooms, totalOtherCharges, nights]);

  useEffect(() => {
    localStorage.setItem("roomHotelDetails", JSON.stringify(details));
  }, [details]);

  useEffect(() => {
    localStorage.setItem("editAddPricing", editAddPricing);
  }, [editAddPricing]);

  useEffect(() => {
    localStorage.setItem("guestDetails", JSON.stringify(guestDetails));
  }, [guestDetails]);

  useEffect(() => {
    const routesToCheck = ["/", "/why-sunstar", "/corporate-booking", "/contact"];
    if (details.length > 0 && routesToCheck.includes(location.pathname)) {
      openConfirmationModal();
    }
  }, [location, details]);

  const handleConfirmCancel = () => {
    setDetails([]);
    localStorage.removeItem("roomHotelDetails");
    setEditAddPricing(false);
    localStorage.setItem("editAddPricing", false);
    setSelectedRooms([]);
    closeConfirmationModal();
  };

  const handleCancel = () => {
    closeConfirmationModal();
  };

  const fetchRoomHotelDetails = async (roomId, hotelCode) => {
    try {
      const response = await axiosInstance.get("/api/ezee/details", {
        params: { roomId, hotelCode },
      });
      const transformedData = {
        ...response.data.hotel,
        roomData: {
          RoomName: response.data.room.RoomName,
          RoomTypeID: response.data.room.RoomTypeID,
          RateTypeID: response.data.room.RateTypeID,
          discountRate: response.data.room.discountRate,
          maxGuests: response.data.room.maxGuests,
          roomrateunkid: response?.data?.room?.roomrateunkid,
          roomImage: response?.data?.room?.RoomImage
        },
      };

      setDetails((prevDetails) => [...prevDetails, transformedData]);

      setSelectedRooms((prev) => [
        ...prev,
        {
          roomName: transformedData.roomData?.RoomName || "",
          option: "roomOnly",
          price: transformedData.roomData?.discountRate || 0,
          RoomTypeID: response.data.room.RoomTypeID,
          RateTypeID: response.data.room.RateTypeID,
          maxGuests: response.data.room.maxGuests,
          roomrateunkid: response?.data?.room?.roomrateunkid,
        },
      ]);

      return transformedData;
    } catch (error) {
      console.error("Error fetching room and hotel details:", error);
      throw error;
    }
  };

  const removeRoom = (roomName) => {
    setSelectedRooms((prev) => {
      const index = prev?.findIndex((r) => r.roomName === roomName);
      if (index === -1) return prev;
      const newRooms = [...prev];
      newRooms.splice(index, 1);
      return newRooms;
    });

    setDetails((prev) => {
      const index = prev?.findIndex((d) => d.roomData?.RoomName === roomName);
      if (index === -1) return prev;
      const newDetails = [...prev];
      newDetails.splice(index, 1);
      localStorage.setItem("roomHotelDetails", JSON.stringify(newDetails));
      return newDetails;
    });
  };

  return (
    <PricingContext.Provider
      value={{
        editAddPricing,
        setEditAddPricing,
        details,
        setDetails,
        fetchRoomHotelDetails,
        selectedRooms,
        setSelectedRooms,
        selectedOtherCharges,
        setSelectedOtherCharges,
        totalOtherCharges,
        finalPrice,
        setFinalPrice,
        baseFinalPrice,
        nights,
        setNights,
        maxRoomSelection,
        setMaxRoomSelection,
        resetMaxRoomSelection, // Added reset function
        guestDetails,
        setGuestDetails,
        sethotelData,
        hotelData,
        removeRoom,
        openConfirmationModal,
        closeConfirmationModal,
        isConfirmationModalOpen,
        isHotelModalOpen,
        openHotelModal,
        closeHotelModal,
        setIsConfirmationModalOpen,
        phoneVerified, // Add phoneVerified here
        setPhoneVerified, // Add setPhoneVerified here
        navColor, setIsNavColor,
        someOneElse,
        setSomeoneElse,
        guestData, setGuestData,
        dayUseRoom, setDayUseRoom
      }}
    >
      {children}
      <ConfirmationModal
        show={isConfirmationModalOpen}
        onHide={handleCancel}
        onConfirm={handleConfirmCancel}
      />
    </PricingContext.Provider>
  );
};

export const usePricing = () => useContext(PricingContext);