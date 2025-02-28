import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const PricingContext = createContext();

export const PricingProvider = ({ children }) => {
  const location = useLocation();

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

  useEffect(() => {
    const routesToCheck = ["/", "/why-sunstar", "/corporate-booking", "/contact"];
    if (details.length > 0 && routesToCheck.includes(location.pathname)) {
      const confirmCancel = window.confirm("Are you sure want to cancel booking?");
      if (confirmCancel) {
        setDetails([]);
        localStorage.removeItem("roomHotelDetails");
        setEditAddPricing(false);
        localStorage.setItem("editAddPricing", false);
        setSelectedRooms([]);
      }
    }
  }, [location, details]);



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
        finalPrice, // final price including discount or not
        setFinalPrice,
        baseFinalPrice, // original calculated final price
        nights,
        setNights,
        maxRoomSelection,
        setMaxRoomSelection,
        guestDetails,
        setGuestDetails,
        sethotelData,
        hotelData
      }}
    >
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => useContext(PricingContext);
