/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePricing } from "../../../Context/PricingContext";
import toast from "react-hot-toast";
import { useMakeBooking } from "../../../ApiHooks/useCreateBookingHook";
import { useHotelEnquiryForm } from "../../../ApiHooks/useEnquiryFormHook";
import { useNavigate } from "react-router-dom";

export const PaymentMethod = ({ hotelDetail, guestFormRef, checkIn, checkOut }) => {
  const { selectedRooms } = usePricing();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
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

  const { mutate } = useHotelEnquiryForm();


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

    guestDetails.paymentMethod = selectedPaymentMethod;

    const payload = {
      userEmail: guestDetails.email,
      userPhone: guestDetails.phoneNumber,
      checkIn,
      checkOut,
      hotelCode: hotelDetail?.hotelCode,
      Hoteldata: hotelDetail?.authKey,
      selectedRooms,
      submittedAt: new Date().toISOString(),
    };

    // Call the mutation
    mutate(payload, {
      onSuccess: () => {
        setShowSuccessModal(true);
      },
      onError: (error) => {
        console.error("Enquiry submission failed:", error);
        toast.error("Failed to submit enquiry. Please try again.");
      }
    });



    // for booking
    // try {
    //   // Call the makeBooking mutation with the guest details
    //   // const result = await makeBooking(guestDetails);

    //   // If the booking was successful and we have a reservation number
    //   if (result?.ReservationNo) {
    //     toast.success(`Booking confirmed! Reservation #${result.ReservationNo}`);
    //     // You can add navigation logic here if needed
    //     // For example: navigate(`/booking-confirmation/${result.ReservationNo}`);
    //   }
    // } catch (error) {
    //   // Error handling is already in the hook, but we can add specific UI feedback here
    //   console.error("Booking failed:", error);
    // }

  };

  return (
    <>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-6">Your booking has been successfully submitted. We will contact you shortly.</p>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded transition-all"
                style={{ backgroundColor: "#058FA2" }}
              >
                Continue to Home
              </button>
            </div>
          </div>
        </div>
      )}
      <div id="payment-method" className="flex flex-col bg-white mt-6">
      <div className="flex items-center mb-6">
        <div
          className="w-1 h-8 rounded-full mr-3"
          style={{ backgroundColor: "#058FA2" }}
        ></div>
        <h2 className="text-3xl font-bold text-gray-800">Payment Method</h2>
      </div>
      <div className="flex flex-col gap-4">
        {hotelDetail?.payAtHotel === "yes" && (
          <label
            htmlFor="pay-at-hotel"
            className="flex items-center gap-4 p-4 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-teal-200 hover:bg-gray-50 transition-all shadow-sm hover:shadow-lg"
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
              <h3 className="text-lg font-medium text-gray-800">Pay at Hotel</h3>
              <p className="text-sm text-gray-500">
                Reserve now and pay directly at the hotel upon check-in.
              </p>
            </div>
          </label>
        )}
        {/* <label
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
        </label> */}
      </div>

      {/* Conditional rendering of the Continue button */}
      {selectedPaymentMethod && (
        <div className="w-full flex justify-end">
          <button
            className="mt-6 w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-all"
            style={{ backgroundColor: "#058FA2" }}
            onClick={ContinueBtnClick}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue to Pay"}
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default PaymentMethod;