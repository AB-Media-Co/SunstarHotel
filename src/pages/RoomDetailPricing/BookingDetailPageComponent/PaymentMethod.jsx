/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePricing } from "../../../Context/PricingContext";
import toast from 'react-hot-toast';
import { useMakeBooking } from "../../../ApiHooks/useCreateBookingHook";

export const PaymentMethod = ({ hotelDetail, guestFormRef, checkIn, checkOut }) => {
  const { selectedRooms } = usePricing();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Call the useMakeBooking hook
  const { mutate: makeBooking, isLoading } = useMakeBooking(hotelDetail?.hotelCode, hotelDetail?.authKey, checkIn, checkOut, selectedRooms);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const ContinueBtnClick = async () => {
    // Validate guest form first
    if (guestFormRef.current && !guestFormRef.current.validateForm()) {
      return;
    }

    // Get guest details from the form
    const guestDetails = guestFormRef.current.getGuestDetails();
console.log(selectedRooms)
    const roomData = {
      Room_Details: selectedRooms.reduce((acc, room, index) => {
        acc[`Room_${index + 1}`] = {
          Rateplan_Id: room.rateplanId || "",
          Ratetype_Id: room.RateTypeID || "",
          Roomtype_Id: room.RoomTypeID || "",
          baserate: room.price || "",
          extradultrate: room.extraAdultRate || "",
          extrachildrate: room.extraChildRate || "",
          number_adults: room.guestQty || 1,
          number_children: room.childrenQty || 0,
          ExtraChild_Age: room.childAge || "",
          Title: room?.roomName,
          First_Name: guestDetails.firstName || "",
          Last_Name: guestDetails.lastName || "",
          Gender: guestDetails.gender || "",
          SpecialRequest: guestDetails.specialRequest || ""
        };
        return acc;
      }, {}),
      check_in_date: checkIn,
      check_out_date: checkOut,
      Booking_Payment_Mode: selectedPaymentMethod,
      Email_Address: guestDetails.email || "",
      Source_Id: "",
      MobileNo: guestDetails.phoneNumber || "",
      Address: "",
      State: "",
      Country: "",
      City: "",
      Zipcode: "",
      Fax: "",
      Device: "",
      Languagekey: "",
      paymenttypeunkid: ""
    };

   console.log(roomData)
    try {
      await makeBooking(roomData);
    } catch (error) {
      console.error("Error making booking:", error);
      toast.error("Failed to make booking. Please try again.");
    }
  };

  return (
    <div id="payment-method" className="flex flex-col bg-white mt-6">
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-teal-500 rounded-full mr-3" style={{ backgroundColor: "#058FA2" }}></div>
        <h2 className="text-3xl font-bold text-gray-800">Payment Method</h2>
      </div>
      <div className="flex flex-col gap-4">
        {hotelDetail?.payAtHotel === "yes" && (
          <label
            htmlFor="pay-at-hotel"
            className="flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:shadow-lg border-2 border-gray-200 hover:border-teal-200 hover:bg-gray-50"
          >
            <input
              type="radio"
              id="pay-at-hotel"
              name="payment-method"
              className="w-5 h-5"
              onChange={() => handlePaymentMethodChange("pay-at-hotel")}
              checked={selectedPaymentMethod === "pay-at-hotel"}
            />
            <div>
              <h3 className="text-lg font-medium">Pay at Hotel</h3>
              <p className="text-sm text-gray-500">Reserve now and pay directly at the hotel upon check-in.</p>
            </div>
          </label>
        )}
        <label
          htmlFor="upi-payment"
          className="flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:shadow-lg border-2 border-gray-200 hover:border-teal-200 hover:bg-gray-50"
        >
          <input
            type="radio"
            id="upi-payment"
            name="payment-method"
            className="w-5 h-5"
            onChange={() => handlePaymentMethodChange("upi")}
            checked={selectedPaymentMethod === "upi"}
          />
          <div>
            <h3 className="text-lg font-medium">UPI</h3>
            <p className="text-sm text-gray-500">Pay securely using UPI (Google Pay, PhonePe, etc.).</p>
          </div>
        </label>
      </div>
      {selectedPaymentMethod && (
        <div className="w-full flex justify-end">
          <button
            className="mt-6 w-[200px] bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded"
            style={{ backgroundColor: "#058FA2", color: "#ffffff" }}
            onClick={ContinueBtnClick}
            disabled={isLoading} // Disable the button while the request is in progress
          >
            {isLoading ? "Processing..." : "Continue to Pay"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
