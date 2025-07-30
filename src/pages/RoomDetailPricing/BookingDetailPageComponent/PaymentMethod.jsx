/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePricing } from "../../../Context/PricingContext";
import { useGetUserByEmail } from "../../../ApiHooks/useUser";
import { usePushBooking } from "../../../ApiHooks/pushBookingHook";
import Loader from "../../../Components/Loader";
import {
  CreditCard,
  Building2,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import RazorpayPayment from "./RazorpayPayment";
import { BookingSuccessPopup } from "./BookingSuccessPopup";

export const PaymentMethod = ({ hotelDetail, verified, checkIn, checkOut }) => {
  const email = localStorage.getItem("user_email");
  const { data: userData } = useGetUserByEmail(email);
  console.log(userData)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  console.log(selectedPaymentMethod)
  const { selectedRooms, setIsConfirmationModalOpen, someOneElse, guestData } = usePricing();
  const pushBooking = usePushBooking();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const ContinueBtnClick = (paymenttypeunkid = "") => {
    if (!(verified || userData?.data?.isVerified)) {
      document.getElementById("guestDetail")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const Room_Details = {};
    selectedRooms.forEach((room, index) => {
      const days = parseInt(localStorage.getItem("days"));
      const baserate = Array(days).fill(room.price).join(",");
      const extradultrate = Array(days).fill(0).join(",");
      const extrachildrate = Array(days).fill(0).join(",");

      Room_Details[`Room_${index + 1}`] = {
        Rateplan_Id: room?.roomrateunkid,
        Ratetype_Id: room.RateTypeID,
        Roomtype_Id: room.RoomTypeID,
        baserate: baserate,
        extradultrate: extradultrate,
        extrachildrate: extrachildrate,
        number_adults: room.guestQty?.toString() || '1',
        number_children: "0",
        ExtraChild_Age: "",
        Title: "",
        First_Name: someOneElse ? guestData.firstName || '' : userData?.data.firstName || '',
        Last_Name: someOneElse ? guestData.lastName || '' : userData?.data.lastName || '',
        Gender: userData?.data.gender || '',
        SpecialRequest: selectedPaymentMethod === "pay-at-hotel" ? "pay-at-hotel" : paymenttypeunkid
      };
    });

    const BookingData = {
      Room_Details,
      check_in_date: checkIn,
      check_out_date: checkOut,
      Booking_Payment_Mode: selectedPaymentMethod === "pay-at-hotel" ? "0" : "1",
      Email_Address: userData?.data.email,
      Source_Id: "",
      MobileNo: someOneElse ? guestData.phone : userData?.data.phone || '',
      Address: userData?.data.address || '',
      State: userData?.data.state || '',
      Country: userData?.data.country || '',
      City: userData?.data.city || '',
      Zipcode: "",
      Fax: "",
      Device: "Web",
      Languagekey: "",
      paymenttypeunkid: paymenttypeunkid
    };

    const payload = {
      BookingData: BookingData,
      HotelCode: hotelDetail?.hotelCode,
      APIKey: hotelDetail?.authKey,
      userEmail: userData?.data.email,
    };

    pushBooking.mutate(payload, {
      onSuccess: () => {
        setShowSuccessPopup(true);
      }
    });
  };

  if (pushBooking.isPending) {
    return (
      <div className="relative bg-white border-gray-100">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
          <div className="text-center">
            {/* Spinner Loader */}
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-teal-300 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">Processing Your Booking</h3>
              <p className="text-gray-600">Please wait while we confirm your reservation...</p>
              <div className="flex items-center justify-center mt-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blurred background content */}
        <div className="filter blur-sm pointer-events-none">
          <PaymentMethodContent
            hotelDetail={hotelDetail}
            selectedPaymentMethod={selectedPaymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
            ContinueBtnClick={ContinueBtnClick}
            isLoading={true}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <PaymentMethodContent
        hotelDetail={hotelDetail}
        selectedPaymentMethod={selectedPaymentMethod}
        handlePaymentMethodChange={handlePaymentMethodChange}
        ContinueBtnClick={ContinueBtnClick}
        isLoading={false}
      />

      <BookingSuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        onSeeBookings={() => {
          setShowSuccessPopup(false);
          window.location.href = "/user/profile";  // Your bookings page route
        }}
        onContinueBooking={() => {
          setShowSuccessPopup(false);
          setIsConfirmationModalOpen(false);
          window.location.href = "/";  // Your home page route
        }}
      />


    </>
  );
};

// Separate component for the main content
const PaymentMethodContent = ({ hotelDetail, selectedPaymentMethod, handlePaymentMethodChange, ContinueBtnClick, isLoading }) => {
  const { finalPrice } = usePricing();
  return (
    <div id="payment-method" className="bg-white border-gray-100">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="w-2 h-10 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full mr-4"></div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Payment Method</h2>
          <p className="text-gray-500">Choose your preferred payment option</p>
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-4 mb-8">
        {/* Pay and Book Now Option */}
        <div
          className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer group ${selectedPaymentMethod === "pay-now"
            ? "border-teal-500 bg-teal-50 shadow-lg transform scale-[1.02]"
            : "border-gray-200 hover:border-teal-300 hover:shadow-md"
            } ${isLoading ? 'pointer-events-none' : ''}`}
          onClick={() => !isLoading && handlePaymentMethodChange("pay-now")}
        >
          <label htmlFor="pay-now" className="flex items-start p-6 cursor-pointer">
            <input
              type="radio"
              id="pay-now"
              name="payment-method"
              className="w-5 h-5 mt-1 text-teal-600 border-2 border-gray-300 focus:ring-teal-500"
              onChange={() => !isLoading && handlePaymentMethodChange("pay-now")}
              checked={selectedPaymentMethod === "pay-now"}
              disabled={isLoading}
            />

            <div className="ml-4 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${selectedPaymentMethod === "pay-now" ? "bg-teal-500" : "bg-gray-100 group-hover:bg-teal-100"}`}>
                  <CreditCard className={`w-5 h-5 ${selectedPaymentMethod === "pay-now" ? "text-white" : "text-gray-600 group-hover:text-teal-600"}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Pay and Book Now</h3>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Secure
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-3">
                Complete your booking instantly with secure online payment
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-green-600">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <CreditCard className="w-4 h-4 mr-1" />
                  <span>All major cards accepted</span>
                </div>
              </div>
            </div>
          </label>

          {selectedPaymentMethod === "pay-now" && (
            <div className="absolute top-4 right-4">
              <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Pay at Hotel Option */}
        {hotelDetail?.payAtHotel === "yes" && (
          <div
            className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer group ${selectedPaymentMethod === "pay-at-hotel"
              ? "border-teal-500 bg-teal-50 shadow-lg transform scale-[1.02]"
              : "border-gray-200 hover:border-teal-300 hover:shadow-md"
              } ${isLoading ? 'pointer-events-none' : ''}`}
            onClick={() => !isLoading && handlePaymentMethodChange("pay-at-hotel")}
          >
            <label htmlFor="pay-at-hotel" className="flex items-start p-6 cursor-pointer">
              <input
                type="radio"
                id="pay-at-hotel"
                name="payment-method"
                className="w-5 h-5 mt-1 text-teal-600 border-2 border-gray-300 focus:ring-teal-500"
                onChange={() => !isLoading && handlePaymentMethodChange("pay-at-hotel")}
                checked={selectedPaymentMethod === "pay-at-hotel"}
                disabled={isLoading}
              />

              <div className="ml-4 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${selectedPaymentMethod === "pay-at-hotel" ? "bg-teal-500" : "bg-gray-100 group-hover:bg-teal-100"}`}>
                    <Building2 className={`w-5 h-5 ${selectedPaymentMethod === "pay-at-hotel" ? "text-white" : "text-gray-600 group-hover:text-teal-600"}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Pay at Hotel</h3>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      <Clock className="w-3 h-3 mr-1" />
                      Flexible
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-3">
                  Reserve now and pay directly at the hotel during check-in
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-orange-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>No advance payment</span>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span>Pay at reception</span>
                  </div>
                </div>
              </div>
            </label>

            {selectedPaymentMethod === "pay-at-hotel" && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Continue Button */}
      {selectedPaymentMethod && (
        <div className="flex justify-end">
          {selectedPaymentMethod === "pay-now" ? (
            <RazorpayPayment
              hotelDetail={hotelDetail}
              amount={finalPrice}
              onSuccess={(paymenttypeunkid) => ContinueBtnClick(paymenttypeunkid)}
            />
          ) : (
            <button
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl"
              onClick={() => ContinueBtnClick()}
            >
              Confirm Booking
            </button>
          )}
        </div>
      )}


      {/* Security Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-2 text-green-600" />
          <span>Your payment information is secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;