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
  ArrowRight,
  Tag,
  Sparkles
} from "lucide-react";
import RazorpayPayment from "./RazorpayPayment";
import { useNavigate } from "react-router-dom";
import { formatINR } from "../../../utils/formatCurrency";

export const PaymentMethod = ({ hotelDetail, verified, checkIn, checkOut }) => {
  const email = localStorage.getItem("user_email");
  const { data: userData } = useGetUserByEmail(email);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { selectedRooms, setIsConfirmationModalOpen, someOneElse, guestData, setPaymentMethod, selectedOtherCharges } = usePricing();
  const pushBooking = usePushBooking();
  const navigate = useNavigate();

  console.log(selectedOtherCharges)

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethod(method);
  };

  const ContinueBtnClick = (paymenttypeunkid = "") => {
    if (!(verified || userData?.data?.isVerified)) {
      document.getElementById("guestDetail")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // --- Build add-ons text once ---
    const addOns =
      Array.isArray(selectedOtherCharges) && selectedOtherCharges.length > 0
        ? selectedOtherCharges
          .map((item) => {
            const qty = item?.qty ? ` x${item.qty}` : "";
            const note = item?.note ? ` (${item.note})` : "";
            return `${item.heading || ""}${qty}${note}`.trim();
          })
          .filter(Boolean)
          .join(", ")
        : "";

    const specialRequestBase =
      selectedPaymentMethod === "pay-at-hotel" ? "pay-at-hotel" : paymenttypeunkid;

    // Final SpecialRequest string (payment info + add-ons)
    const specialRequest =
      addOns ? `${specialRequestBase} | Add-ons: ${addOns}` : specialRequestBase;

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
        baserate,
        extradultrate,
        extrachildrate,
        number_adults: room.guestQty?.toString() || "1",
        number_children: "0",
        ExtraChild_Age: "",
        Title: "",
        First_Name: someOneElse ? guestData.firstName || "" : userData?.data.firstName || "",
        Last_Name: someOneElse ? guestData.lastName || "" : userData?.data.lastName || "",
        Gender: userData?.data.gender || "",
        // ✅ add-ons included here
        SpecialRequest: specialRequest,
      };
    });

    // Keep remark too (optional but helpful)
    const remarkText = addOns ? `Add To Your Stay: ${addOns}` : "";

    const BookingData = {
      Room_Details,
      check_in_date: checkIn,
      check_out_date: checkOut,
      Booking_Payment_Mode: selectedPaymentMethod === "pay-at-hotel" ? "0" : "1",
      Email_Address: userData?.data.email,
      Source_Id: "",
      MobileNo: someOneElse ? guestData.phone : userData?.data.phone || "",
      Address: userData?.data.address || "",
      State: userData?.data.state || "",
      Country: userData?.data.country || "",
      City: userData?.data.city || "",
      Zipcode: "",
      Fax: "",
      Device: "Web",
      Languagekey: "",
      paymenttypeunkid,
      remark: remarkText, // ✅ mirrors add-ons
    };

    const payload = {
      BookingData,
      HotelCode: hotelDetail?.hotelCode,
      APIKey: hotelDetail?.authKey,
      userEmail: userData?.data.email,
    };

    pushBooking.mutate(payload, {
      onSuccess: (res) => {
        navigate("/thankyou", {
          state: {
            bookingResponse: res,
            payload,
            paymentMethod: selectedPaymentMethod,
            checkIn,
            checkOut,
            hotelDetail,
            hotel: {
              hotelCode: hotelDetail?.hotelCode,
              name: hotelDetail?.hotelName,
              payAtHotel: hotelDetail?.payAtHotel,
            },
            user: {
              email: userData?.data?.email,
              firstName: userData?.data?.firstName,
              lastName: userData?.data?.lastName,
              phone: userData?.data?.phone,
            },
            rooms: selectedRooms,
          },
          replace: true,
        });
      },
    });
  };


  if (pushBooking.isPending) {
    return (
      <div className="relative bg-white border-gray-100">
        <div className="absolute inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-green rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-teal-300 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">Processing Your Booking</h3>
              <p className="text-gray-600">Please wait while we confirm your reservation...</p>
              <div className="flex items-center justify-center mt-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    <PaymentMethodContent
      hotelDetail={hotelDetail}
      selectedPaymentMethod={selectedPaymentMethod}
      handlePaymentMethodChange={handlePaymentMethodChange}
      ContinueBtnClick={ContinueBtnClick}
      isLoading={false}
    />
  );
};

const PaymentMethodContent = ({ hotelDetail, selectedPaymentMethod, handlePaymentMethodChange, ContinueBtnClick, isLoading }) => {
  const { finalPrice } = usePricing();

  return (
    <div id="payment-method" className="bg-white">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-mobile/h4 md:text-desktop/h4 text-gray-900 mb-1">Payment Method</h2>
        <p className="text-sm md:text-base text-gray-500">Choose your preferred payment option</p>
      </div>

      {/* Payment Options */}
      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        {/* Pay and Book Now Option */}
        <PaymentCard
          id="pay-now"
          icon={<CreditCard className="w-5 h-5 md:w-6 md:h-6" />}
          title="Pay and Book Now"
          description="Complete your booking instantly with secure online payment"
          features={[
            { icon: <CheckCircle2 className="w-4 h-4" />, text: "Instant confirmation" },
            { icon: <Shield className="w-4 h-4" />, text: "All major cards" },
            { icon: <Sparkles className="w-4 h-4" />, text: "5% discount" }
          ]}
          badge={{ text: "Secure", color: "green" }}
          discountBadge={{ text: "Save 5%", color: "red" }}
          isSelected={selectedPaymentMethod === "pay-now"}
          onClick={() => !isLoading && handlePaymentMethodChange("pay-now")}
          isLoading={isLoading}
          isRecommended={true}
        />

        {/* Pay at Hotel Option */}
        {hotelDetail?.payAtHotel === "yes" && (
          <PaymentCard
            id="pay-at-hotel"
            icon={<Building2 className="w-5 h-5 md:w-6 md:h-6" />}
            title="Pay at Hotel"
            description="Reserve now and pay at check-in"
            features={[
              { icon: <Clock className="w-4 h-4" />, text: "No advance payment" },
              { icon: <Building2 className="w-4 h-4" />, text: "Pay at reception" }
            ]}
            badge={{ text: "Flexible", color: "orange" }}
            isSelected={selectedPaymentMethod === "pay-at-hotel"}
            onClick={() => !isLoading && handlePaymentMethodChange("pay-at-hotel")}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Continue Button */}
      {selectedPaymentMethod && (
        <div className="flex justify-end mb-6 md:mb-8">
          {selectedPaymentMethod === "pay-now" ? (
            <RazorpayPayment
              hotelDetail={hotelDetail}
              amount={finalPrice}
              onSuccess={(paymenttypeunkid) => ContinueBtnClick(paymenttypeunkid)}
            />
          ) : (
            <button
              className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-green to-teal-600 text-white font-semibold rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              onClick={() => ContinueBtnClick()}
            >
              <span>Confirm Booking</span>
            </button>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="p-3 md:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-700">
          <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <span>Your payment information is secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

// Reusable Payment Card Component
const PaymentCard = ({
  id,
  icon,
  title,
  description,
  features,
  badge,
  discountBadge,
  isSelected,
  onClick,
  isLoading,
  isRecommended = false
}) => {
  const badgeColors = {
    green: "bg-green-100 text-green-800",
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800"
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg md:rounded-xl border-2 transition-all duration-300 cursor-pointer group ${isSelected
          ? "border-primary-green bg-gradient-to-br from-teal-50 to-emerald-50 shadow-lg"
          : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-md"
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
      onClick={onClick}
    >
      {/* Recommendation Badge */}
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          <div className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            RECOMMENDED
          </div>
        </div>
      )}

      <label htmlFor={id} className="flex items-start gap-3 md:gap-4 p-3 md:p-5 cursor-pointer">
        {/* Radio Input */}
        <input
          type="radio"
          id={id}
          name="payment-method"
          className="w-4 h-4 md:w-5 md:h-5 mt-1 md:mt-0.5 text-teal-600 border-2 border-gray-300 focus:ring-primary-green flex-shrink-0"
          onChange={onClick}
          checked={isSelected}
          disabled={isLoading}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title with Badges */}
          <div className="flex items-start justify-between gap-2 mb-1 md:mb-2">
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <div
                className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${isSelected
                    ? "bg-primary-green"
                    : "bg-gray-100 group-hover:bg-teal-50"
                  }`}
              >
                <div
                  className={`${isSelected ? "text-white" : "text-gray-600 group-hover:text-teal-600"
                    }`}
                >
                  {icon}
                </div>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                {title}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              {badge && (
                <span
                  className={`inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 whitespace-nowrap ${badgeColors[badge.color]
                    }`}
                >
                  {badge.text}
                </span>
              )}
              {discountBadge && (
                <span
                  className={`inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 whitespace-nowrap animate-pulse ${badgeColors[discountBadge.color]
                    }`}
                >
                  <Tag className="w-3 h-3" />
                  {discountBadge.text}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2">
            {description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1 ${isSelected ? "text-teal-700" : "text-gray-600"
                  }`}
              >
                <div className={isSelected ? "text-teal-600" : "text-gray-400"}>
                  {feature.icon}
                </div>
                <span className="whitespace-nowrap">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
};

export default PaymentMethod;