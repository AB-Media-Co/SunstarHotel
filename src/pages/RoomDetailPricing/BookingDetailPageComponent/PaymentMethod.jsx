import { usePricing } from "../../../Context/PricingContext";

export const PaymentMethod = ({ hotelDetail }) => {
    // const {
    //   setEditAddPricing,
    //   setDetails,
    //   setSelectedRooms,
    //   setGuestDetails
    // } = usePricing();
  // const ContinueBtnClick=()=>{
  //   setDetails([]);
  //   localStorage.removeItem("roomHotelDetails");
  //   setEditAddPricing(false);
  //   localStorage.setItem("editAddPricing", false);
  //   setSelectedRooms([]);
  //   localStorage.removeItem("guestDetails");
  //   setGuestDetails({rooms:1})
  // }
  return<div id="payment-method" className="flex flex-col  bg-white ">
    <div className="flex items-center mb-6">
      <div className="w-1 h-8 bg-teal-500 rounded-full mr-3" style={{ backgroundColor: "#058FA2" }}></div>
      <h2 className="text-3xl font-bold text-gray-800">Payment Method</h2>
    </div>

    <div className="flex flex-col gap-4">
      {hotelDetail?.payAtHotel=='yes' &&
        <>
          <label
            htmlFor="pay-at-hotel"
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:shadow-lg ${"border-2 border-gray-200 hover:border-teal-200 hover:bg-gray-50"
              }`}
          >
            <input type="radio" id="pay-at-hotel" name="payment-method" className="w-5 h-5" />
            <div>
              <h3 className="text-lg font-medium">Pay at Hotel</h3>
              <p className="text-sm text-gray-500">
                Reserve now and pay directly at the hotel upon check-in.
              </p>
            </div>
          </label>

        </>
      }
      <label
        htmlFor="upi-payment"
        className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:shadow-lg ${"border-2 border-gray-200 hover:border-teal-200 hover:bg-gray-50"
          }`}
      >
        <input type="radio" id="upi-payment" name="payment-method" className="w-5 h-5" />
        <div>
          <h3 className="text-lg font-medium">UPI</h3>
          <p className="text-sm text-gray-500">
            Pay securely using UPI (Google Pay, PhonePe, etc.).
          </p>
        </div>
      </label>
    </div>

    <div className="w-full flex justify-end">
      <button
        className="mt-6 w-[200px] bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded"
        style={{ backgroundColor: "#058FA2", color: "#ffffff" }}
        // onClick={ContinueBtnClick}
      >
        Continue to Pay
      </button>
    </div>
  </div>
};
