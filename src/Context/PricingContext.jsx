import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import ConfirmationModal from "./ConfirmationModal";

const PricingContext = createContext();

export const PricingProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [editAddPricing, setEditAddPricing] = useState(() => {
    const saved = localStorage.getItem("editAddPricing");
    return saved === "true";
  });

  const [maxRoomSelection, setMaxRoomSelection] = useState();

  const [details, setDetails] = useState(() => {
    const storedDetails = localStorage.getItem("roomHotelDetails");
    return storedDetails ? JSON.parse(storedDetails) : [];
  });

  const [selectedRooms, setSelectedRooms] = useState(() =>
    details.map((item) => ({
      roomName: item?.roomData?.RoomName || "",
      option: "roomOnly",
      price: item?.roomData?.discountRate || 0,
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

  const [guestDetails, setGuestDetails] = useState(() => {
    const storedGuestDetails = localStorage.getItem("guestDetails");
    return storedGuestDetails ? JSON.parse(storedGuestDetails) : { rooms: 1 };
  });

  // Confirmation Modal state
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Functions to control the Confirmation Modal
  const openConfirmationModal = () => setIsConfirmationModalOpen(true);
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  // NEW: Hotel Modal state and functions
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const openHotelModal = () => setIsHotelModalOpen(true);
  const closeHotelModal = () => setIsHotelModalOpen(false);

  useEffect(() => {
    const daysFromStorage = localStorage.getItem("days");
    const days = daysFromStorage ? parseInt(daysFromStorage, 10) : 1;

    const sumOtherCharges = selectedOtherCharges.reduce((acc, charge) => {
      const amount = charge.rate?.amount || 0;
      const period = charge.rate?.period?.toLowerCase();

      if (period === "per day" || period === "per night") {
        return acc + amount * days;
      }
      return acc + amount;
    }, 0);

    setTotalOtherCharges(sumOtherCharges);
  }, [selectedOtherCharges]);

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

  // Agar user kisi aise route pe jaye jahan details hon, to modal show kar de
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
    // Yahan navigation rok sakte hain agar zarurat ho
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
          discountRate: response.data.room.discountRate,
          maxGuests: response.data.room.maxGuests,
        },
      };

      setDetails((prevDetails) => [...prevDetails, transformedData]);

      setSelectedRooms((prev) => [
        ...prev,
        {
          roomName: transformedData.roomData?.RoomName || "",
          option: "roomOnly",
          price: transformedData.roomData?.discountRate || 0,
        },
      ]);

      return transformedData;
    } catch (error) {
      console.error("Error fetching room and hotel details:", error);
      throw error;
    }
  };

  const removeRoom = (roomName) => {
    // selectedRooms update karna
    setSelectedRooms((prev) => {
      const index = prev.findIndex((r) => r.roomName === roomName);
      if (index === -1) return prev;
      const newRooms = [...prev];
      newRooms.splice(index, 1);
      return newRooms;
    });

    // details update karna
    setDetails((prev) => {
      const index = prev.findIndex((d) => d.roomData?.RoomName === roomName);
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
        finalPrice, // Final price including discount or not
        setFinalPrice,
        baseFinalPrice, // Original calculated final price
        nights,
        setNights,
        maxRoomSelection,
        setMaxRoomSelection,
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
