import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import ConfirmationModal from "./ConfirmationModal";
import { format } from "date-fns";

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
      guestQty: 2, // Default to 2 guests
      showMaxGuestAlert: false,
    }))
  );


  const [selectedOtherCharges, setSelectedOtherCharges] = useState([]);
  const [totalOtherCharges, setTotalOtherCharges] = useState(0);
  const [totalAddOns, setTotalAddOns] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);

  const [hotelData, sethotelData] = useState(() => {
    const storedHotelData = localStorage.getItem("hotelData");
    return storedHotelData ? JSON.parse(storedHotelData) : null;
  });

  const [nights, setNights] = useState(() => {
    const saved = localStorage.getItem("days");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [baseFinalPrice, setBaseFinalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [appliedOffers, setAppliedOffers] = useState([]); // Track applied offer codes
  const [payNowDiscount, setPayNowDiscount] = useState(0); // Track Pay Now discount amount
  const [offerDiscount, setOfferDiscount] = useState(0); // Track offer code discount amount
  console.log(offerDiscount);
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

  const [availabilityData, setAvailabilityData] = useState({});

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const { data: { hotels } } = await axiosInstance.get('/api/ezee/allhotels');
        const activeHotels = hotels?.filter(h => h.active) || [];

        const todayStr = format(new Date(), 'yyyy-MM-dd');
        const tomorrowStr = format(new Date(Date.now() + 86400000), 'yyyy-MM-dd');
        const currentMonthStr = format(new Date(), 'yyyy-MM');

        const results = {};

        await Promise.all(activeHotels.map(async (hotel) => {
          if (!hotel.authKey) return;

          try {
            // Parallel fetch for speed
            const [roomsRes, ratesRes] = await Promise.all([
              axiosInstance.get('/api/ezee/syncedRooms', {
                params: {
                  hotelCode: hotel.hotelCode,
                  authCode: hotel.authKey,
                  fromDate: todayStr,
                  toDate: tomorrowStr
                }
              }).catch(() => ({ data: { data: [] } })), // Fallback empty

              axiosInstance.get('/api/ezee/monthly-rates', {
                params: {
                  hotelCode: hotel.hotelCode,
                  authCode: hotel.authKey,
                  month: currentMonthStr
                }
              }).catch(() => ({ data: { data: {} } }))
            ]);

            results[hotel.hotelCode] = {
              rooms: Array.isArray(roomsRes.data) ? roomsRes.data : (roomsRes.data?.data || []),
              rates: ratesRes.data?.data || ratesRes.data || {}
            };
            // console.log(`Fetched for ${hotel.hotelCode}:`, results[hotel.hotelCode]);
          } catch (err) {
            console.error(`Failed to fetch for hotel ${hotel.hotelCode}`, err);
          }
        }));

        console.log("Availability Data Final:", results);
        setAvailabilityData(results);
      } catch (error) {
        console.error("Global fetch failed:", error);
      }
    };

    fetchGlobalData();
  }, []);


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

    // Calculate add-ons total separately
    const sumAddOns = selectedOtherCharges.reduce((acc, charge) => {
      const amount = charge.rate?.amount || 0;
      const period = charge.rate?.period?.toLowerCase();

      if (period === "per day" || period === "per night") {
        return acc + amount * days;
      }
      return acc + amount;
    }, 0);
    setTotalAddOns(sumAddOns);

    // ✅ Calculate GST based on per-night room price (Per Room Per Night Slab)
    let calculatedGstAmount = 0;

    selectedRooms.forEach((room) => {
      const perNightPrice = room.price;
      let rate = 0;

      if (perNightPrice >= 1000 && perNightPrice <= 7500) {
        rate = 0.05; // 5% GST
      } else if (perNightPrice > 7500) {
        rate = 0.18; // 18% GST
      }

      calculatedGstAmount += perNightPrice * nights * rate;
    });

    setGstAmount(calculatedGstAmount);

    // ✅ Total other charges = only GST (add-ons are shown separately)
    setTotalOtherCharges(calculatedGstAmount);
  }, [selectedOtherCharges, selectedRooms, nights]);


  useEffect(() => {
    const roomTotal = selectedRooms.reduce(
      (acc, room) => acc + room.price * nights,
      0
    );
    // Base final price = room total + add-ons + GST
    const computedBaseFinal = roomTotal + totalAddOns + totalOtherCharges;
    setBaseFinalPrice(computedBaseFinal);

    // Calculate Pay Now discount (5%)
    const payNowDiscountAmount = paymentMethod === "pay-now" ? computedBaseFinal * 0.05 : 0;
    setPayNowDiscount(payNowDiscountAmount);


    // Always calculate final price based on base price, pay now discount, and offer discount
    setFinalPrice(computedBaseFinal - payNowDiscountAmount - offerDiscount);
  }, [selectedRooms, totalAddOns, totalOtherCharges, nights, paymentMethod, appliedOffers.length, offerDiscount]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, details.length]);

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
          baseAdultOccupancy: response.data.room.baseAdultOccupancy || 2,
          maxAdultOccupancy: response.data.room.maxAdultOccupancy || 3,
          extraAdultRate: response.data.room.extraAdultRate || 0,
          extraChildRate: response.data.room.extraChildRate || 0,
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
          guestQty: 2, // Default to 2 guests
          showMaxGuestAlert: false,
        },
      ]);

      return transformedData;
    } catch (error) {
      // Error fetching room and hotel details
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
        totalAddOns,
        gstAmount,
        finalPrice,
        setFinalPrice,
        baseFinalPrice,
        nights,
        setNights,
        paymentMethod,
        setPaymentMethod,
        appliedOffers, // Add appliedOffers to context
        setAppliedOffers, // Add setAppliedOffers to context
        payNowDiscount, // Add payNowDiscount to context
        setPayNowDiscount, // Add setPayNowDiscount to context
        offerDiscount, // Add offerDiscount to context
        setOfferDiscount, // Add setOfferDiscount to context
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
        dayUseRoom, setDayUseRoom,
        availabilityData
      }}
    >
      {children}
      < ConfirmationModal
        show={isConfirmationModalOpen}
        onHide={handleCancel}
        onConfirm={handleConfirmCancel}
      />
    </PricingContext.Provider >
  );
};

export const usePricing = () => useContext(PricingContext);