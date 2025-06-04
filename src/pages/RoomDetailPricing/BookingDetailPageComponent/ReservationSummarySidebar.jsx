/* eslint-disable react/prop-types */
import { usePricing } from "../../../Context/PricingContext";
import { useEffect } from "react";



export const ReservationSummarySidebar = ({

  days,
  showButton,
  isPaymentVisible,
}) => {
  const {
    selectedRooms,
    totalOtherCharges,
    finalPrice,
    baseFinalPrice,
    setNights,
  } = usePricing();

  useEffect(() => {
    if (days) {
      setNights(days);
      localStorage.setItem("days", days);
    }
  }, [days, setNights]);


  const discount = baseFinalPrice - finalPrice;
  const hasDiscount = discount > 0;

  return (
    <div className="p-6 bg-white sticky top-4 border border-gray-200 rounded-xl shadow-md w-full md:w-96 mx-auto font-sans">

      {/* Header */}
      <div className="flex items-center pb-4 justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Reservation Summary</h2>
      
      </div>


      {/* Price Summary */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
      
          Your Price Summary
        </h3>

        <div className="space-y-3 mb-4">
          {selectedRooms?.map((room, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-700 pb-2 border-b border-gray-100">
              <div>
                <p className="font-medium">{room.roomName}</p>
                <p className="text-xs text-gray-500">
                  {room.option === "roomOnly" ? "Room Only" : "With Meals"} × {days} {days === 1 ? "Night" : "Nights"}
                </p>
              </div>
              <p className="font-medium text-gray-800">₹ {room.price * days}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm text-gray-700 pb-2 border-b border-gray-200">
          <p>Other Charges</p>
          <p className="font-medium text-gray-800">₹ {totalOtherCharges}</p>
        </div>
      </div>

      {/* Final Pricing */}
      <div className="pt-3 bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm text-gray-700">
          <p>Original Amount</p>
          <p className="font-medium">₹ {baseFinalPrice}</p>
        </div>

        {hasDiscount && (
          <div className="flex justify-between text-sm text-gray-700">
            <p>Discount</p>
            <p className="font-medium text-green-600">- ₹ {discount}</p>
          </div>
        )}

        <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
          <p>Payable Amount</p>
          <p className="text-primary-green">₹ {finalPrice}</p>
        </div>
      </div>

      {/* CTA Button */}
      {showButton && (
        <a href="#payment-method" className="block w-full">
          <button
            disabled={isPaymentVisible}
            className={`mt-6 w-full py-3.5 font-bold text-white rounded-lg transition-all duration-300 ${isPaymentVisible
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary-green hover:bg-primary-dark-green"
              }`}
          >
            See Payment Options
          </button>
        </a>
      )}
    </div>

  );
};