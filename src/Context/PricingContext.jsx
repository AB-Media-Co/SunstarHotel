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

  const [details, setDetails] = useState(() => {
    const storedDetails = localStorage.getItem("roomHotelDetails");
    return storedDetails ? JSON.parse(storedDetails) : [];
  });


  const [selectedRooms, setSelectedRooms] = useState(() =>
    details.map((item) => ({
      roomName: item?.roomData?.RoomName || "",
      option: "roomOnly", // default selection
      price: item?.roomData?.discountRate || 0, // base discount price
    }))
  );


  const [selectedOtherCharges, setSelectedOtherCharges] = useState([]);
  const [totalOtherCharges, setTotalOtherCharges] = useState(0);

  useEffect(() => {
    const sum = selectedOtherCharges.reduce(
      (acc, charge) => acc + (charge.rate?.amount || 0),
      0
    );
    setTotalOtherCharges(sum);
  }, [selectedOtherCharges]);




  useEffect(() => {
    localStorage.setItem("roomHotelDetails", JSON.stringify(details));
  }, [details]);

  useEffect(() => {
    localStorage.setItem("editAddPricing", editAddPricing);
  }, [editAddPricing]);

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
      fetchRoomHotelDetails,
      selectedRooms,
      setSelectedRooms,
      selectedOtherCharges,
      setSelectedOtherCharges,
      totalOtherCharges,
    }}
    >
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => useContext(PricingContext);
