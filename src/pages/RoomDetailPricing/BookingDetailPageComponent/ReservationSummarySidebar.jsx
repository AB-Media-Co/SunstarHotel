/* eslint-disable react/prop-types */
import { usePricing } from "../../../Context/PricingContext";
import { useEffect, useState } from "react";
import { BadgePercent } from "lucide-react";
import { formatINR } from "../../../utils/formatCurrency";



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
    details, // Added to get continental plan details
  } = usePricing();

  const [isSticky, setIsSticky] = useState(false);


  useEffect(() => {
    if (days) {
      setNights(days);
      localStorage.setItem("days", days);
    }
  }, [days, setNights]);


  const discount = baseFinalPrice - finalPrice;
  const hasDiscount = discount > 0;

  useEffect(() => {
    const handleScroll = () => {
      // Jab 100px se zyada scroll ho tab sticky activate ho
      if (window.scrollY > 220) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:p-6 p-4 bg-white md:border-2 border border-gray-200 rounded-2xl md:shadow-lg shadow-md w-full ${isSticky ? 'md:w-[384px]' : {}}  md:w-96 mx-auto  font-sans transition-all duration-300 ${isSticky ? 'xl:fixed xl:top-4  ' : 'relative '
        }`}
   
    >
      {/* Header */}
      <div className="bg-primary-green  p-4 -mx-4 md:-mx-6 -mt-4 md:-mt-6 rounded-t-2xl mb-6">
        <h2 className="text-lg md:text-xl font-bold text-white">Reservation Summary</h2>
      </div>
    


      {/* Price Summary */}
      <div>
        <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b-2 border-primary-green/20">
          Your Price Summary
        </h3>

        <div className="space-y-4 mb-5">
          {selectedRooms?.map((room, index) => {
            const hotelDetail = details[index];
            const baseRoomPrice = hotelDetail?.roomData?.discountRate || 0;
            const continentalPrice = hotelDetail?.continentalPlan?.rate?.amount || 0;
            const guestQty = room?.guestQty || 2;
            const baseAdultOccupancy = hotelDetail?.roomData?.baseAdultOccupancy || 2;
            const extraAdultRate = hotelDetail?.roomData?.extraAdultRate || 0;
            
            // Calculate extra adult charges (eZee API)
            const extraAdults = guestQty > baseAdultOccupancy ? guestQty - baseAdultOccupancy : 0;
            const totalExtraAdultCharge = extraAdults * extraAdultRate;
            const totalContinentalCharge = continentalPrice * guestQty;
            
            return (
              <div key={index} className="space-y-3 pb-4 mb-4 border-b-2 border-dashed border-gray-200 last:border-0">
                {/* Room Base Price */}
                <div className="flex justify-between items-start text-sm bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-base">{room.roomName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Room Only ({baseAdultOccupancy} {baseAdultOccupancy === 1 ? "Adult" : "Adults"}) × {days} {days === 1 ? "Night" : "Nights"}
                    </p>
                  </div>
                  <p className="font-bold text-gray-900 text-base">{formatINR(baseRoomPrice * days)}</p>
                </div>
                
                {/* Extra Adult Charges (if applicable) - eZee API */}
                {extraAdults > 0 && extraAdultRate > 0 && (
                  <div className="flex justify-between items-start text-sm bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-orange-700">Extra Adult Charges</p>
                      <p className="text-xs text-orange-600 mt-1">
                        {formatINR(extraAdultRate)} × {extraAdults} {extraAdults === 1 ? "Adult" : "Adults"} × {days} {days === 1 ? "Night" : "Nights"}
                      </p>
                    </div>
                    <p className="font-bold text-orange-700">{formatINR(totalExtraAdultCharge * days)}</p>
                  </div>
                )}
                
                {/* Continental Breakfast Charges (if selected) */}
                {room.option === "continental" && continentalPrice > 0 && (
                  <div className="flex justify-between items-start text-sm bg-green-50 border-l-4 border-primary-green p-3 rounded-r-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-primary-green">Continental Breakfast</p>
                      <p className="text-xs text-green-700 mt-1">
                        {formatINR(continentalPrice)} × {guestQty} {guestQty === 1 ? "Guest" : "Guests"} × {days} {days === 1 ? "Night" : "Nights"}
                      </p>
                    </div>
                    <p className="font-bold text-primary-green">{formatINR(totalContinentalCharge * days)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center text-sm font-semibold text-gray-700 py-3 px-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="flex items-center gap-2">
            Taxes & Other Charges
          </p>
          <p className="font-bold text-gray-900">{formatINR(totalOtherCharges)}</p>
        </div>
      </div>

      {/* Final Pricing */}
      <div className="pt-4 mt-5 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl space-y-3 border border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span className="font-medium">Base Price</span>
          <span className="font-semibold text-gray-900">{formatINR(baseFinalPrice)}</span>
        </div>
        {hasDiscount && (
          <div className="flex justify-between items-center text-sm bg-green-50 -mx-4 px-4 py-2">
               <span className="font-medium">Pay Now Discount</span>
            <span className="font-bold text-green-600">-{formatINR(discount)}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span className="font-medium">Taxes & Fees</span>
          <span className="font-semibold text-gray-900">{formatINR(totalOtherCharges)}</span>
        </div>
        <div className="flex justify-between items-center border-t-2 border-gray-300 pt-3 mt-3">
          <p className="text-base md:text-lg font-bold text-gray-800">Payable Amount</p>
          <p className="text-lg md:text-xl font-bold text-primary-green">{formatINR(finalPrice)}</p>
        </div>
      </div>

      {/* <div className="flex items-center my-3 justify-center text-orange-400 font-semibold text-sm ">
        <BadgePercent className="mr-2 text-base" />
        <span>You are saving  by booking directly</span>
      </div> */}

      {/* CTA Button */}
      {showButton && (
        <a href="#payment-method" className="hidden md:block w-full">
          <button
            disabled={isPaymentVisible}
            className={`mt-6 w-full py-4 font-bold text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${isPaymentVisible
              ? "bg-gray-300 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-primary-green to-primary-dark-green hover:shadow-xl"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span>See Payment Options</span>
              <span className="text-xl">→</span>
            </span>
          </button>
        </a>
      )}
    </div>

  );
};