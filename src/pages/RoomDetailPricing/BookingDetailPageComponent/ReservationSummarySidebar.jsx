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
      className={`md:p-6 bg-white md:border border-gray-200 rounded-xl md:shadow-md w-full ${isSticky ? 'md:w-[384px]' : {}}  md:w-96 mx-auto  font-sans transition-all duration-300 ${isSticky ? 'xl:fixed xl:top-4  ' : 'relative '
        }`}
   
    >
      {/* Header */}
        <h2 className="text-mobile/h4 md:text-desktop/h4 pb-4  text-gray-800">Reservation Summary</h2>
    


      {/* Price Summary */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">

          Your Price Summary
        </h3>

        <div className="space-y-3 mb-4">
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
              <div key={index} className="space-y-2 pb-3 border-b border-gray-200">
                {/* Room Base Price */}
                <div className="flex justify-between text-sm text-gray-700">
                  <div>
                    <p className="font-medium">{room.roomName}</p>
                    <p className="text-xs text-gray-500">
                      Room Only ({baseAdultOccupancy} {baseAdultOccupancy === 1 ? "Adult" : "Adults"}) × {days} {days === 1 ? "Night" : "Nights"}
                    </p>
                  </div>
                  <p className="font-medium text-gray-800">{formatINR(baseRoomPrice * days)}</p>
                </div>
                
                {/* Extra Adult Charges (if applicable) - eZee API */}
                {extraAdults > 0 && extraAdultRate > 0 && (
                  <div className="flex justify-between text-sm text-gray-600 pl-4">
                    <div>
                      <p className="font-medium text-orange-600">Extra Adult Charges</p>
                      <p className="text-xs text-gray-500">
                        {formatINR(extraAdultRate)} × {extraAdults} {extraAdults === 1 ? "Adult" : "Adults"} × {days} {days === 1 ? "Night" : "Nights"}
                      </p>
                    </div>
                    <p className="font-medium text-orange-600">{formatINR(totalExtraAdultCharge * days)}</p>
                  </div>
                )}
                
                {/* Continental Breakfast Charges (if selected) */}
                {room.option === "continental" && continentalPrice > 0 && (
                  <div className="flex justify-between text-sm text-gray-600 pl-4">
                    <div>
                      <p className="font-medium text-primary-green">Continental Breakfast</p>
                      <p className="text-xs text-gray-500">
                        {formatINR(continentalPrice)} × {guestQty} {guestQty === 1 ? "Guest" : "Guests"} × {days} {days === 1 ? "Night" : "Nights"}
                      </p>
                    </div>
                    <p className="font-medium text-primary-green">{formatINR(totalContinentalCharge * days)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-sm font-medium text-black/40 pb-2 border-b border-gray-200">
          <p>Taxes & Other Charges</p>
          <p className="font-medium ">{formatINR(totalOtherCharges)}</p>
        </div>
      </div>

      {/* Final Pricing */}
      <div className="pt-3  mt-5 rounded-lg space-y-2">
        <div className="flex justify-between text-sm text-gray-700">
          <p>Original Amount</p>
          <p className="font-medium">{formatINR(baseFinalPrice)}</p>
        </div>

        {hasDiscount && (
          <div className="flex justify-between text-sm text-gray-700">
            <p>Discount</p>
            <p className="font-medium text-green-600">- {formatINR(discount)}</p>
          </div>
        )}

        <div className="flex justify-between border-b-2 md:border-b-0  text-base font-bold py-2 border-t border-gray-200">
          <p>Payable Amount</p>
          <p className="text-primary-green">{formatINR(finalPrice)}</p>
        </div>
      </div>

      {/* <div className="flex items-center my-3 justify-center text-orange-400 font-semibold text-sm ">
        <BadgePercent className="mr-2 text-base" />
        <span>You are saving  by booking directly</span>
      </div> */}

      {/* CTA Button */}
      {showButton && (
        <a href="#payment-method" className="hidden md:block  w-full">
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