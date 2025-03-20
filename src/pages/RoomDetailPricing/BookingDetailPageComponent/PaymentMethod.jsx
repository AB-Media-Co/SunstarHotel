/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePricing } from "../../../Context/PricingContext";
import toast from "react-hot-toast";
import { useMakeBooking } from "../../../ApiHooks/useCreateBookingHook";

export const PaymentMethod = ({ hotelDetail, guestFormRef, checkIn, checkOut }) => {
  const { selectedRooms } = usePricing();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { mutate: makeBooking, isLoading } = useMakeBooking(
    hotelDetail?.hotelCode,
    hotelDetail?.authKey,
    checkIn,
    checkOut,
    selectedRooms
  );

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const ContinueBtnClick = async () => {
    // Validate guest form first
    if (guestFormRef.current && !guestFormRef.current.validateForm()) {
      toast.error("Please fill all required guest information");
      return;
    }
  
    const guestDetails = guestFormRef.current.getGuestDetails();
    
    // Validate essential information
    if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email) {
      toast.error("Please provide name and email information");
      return;
    }
    
    // Add payment method to guest details
    guestDetails.paymentMethod = selectedPaymentMethod;
  
    try {
      // Call the makeBooking mutation with the guest details
      const result = await makeBooking(guestDetails);
      
      // If the booking was successful and we have a reservation number
      if (result?.ReservationNo) {
        toast.success(`Booking confirmed! Reservation #${result.ReservationNo}`);
        // You can add navigation logic here if needed
        // For example: navigate(`/booking-confirmation/${result.ReservationNo}`);
      }
    } catch (error) {
      // Error handling is already in the hook, but we can add specific UI feedback here
      console.error("Booking failed:", error);
    }
  };

  return (
    <div id="payment-method" className="flex flex-col bg-white mt-6">
      <div className="flex items-center mb-6">
        <div
          className="w-1 h-8 bg-teal-500 rounded-full mr-3"
          style={{ backgroundColor: "#058FA2" }}
        ></div>
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
              <p className="text-sm text-gray-500">
                Reserve now and pay directly at the hotel upon check-in.
              </p>
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
            <p className="text-sm text-gray-500">
              Pay securely using UPI (Google Pay, PhonePe, etc.).
            </p>
          </div>
        </label>
      </div>

      {/* Conditional rendering of the Continue button */}
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