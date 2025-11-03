/* eslint-disable react/prop-types */
import { useCreateRazorpayOrder, useVerifyRazorpayPayment } from "../../../ApiHooks/useRazorpayOrderHook";
import toast from "react-hot-toast";

const RazorpayPayment = ({ hotelDetail, amount, onSuccess }) => {
  // console.log("hi")
  const createOrder = useCreateRazorpayOrder();
  const verifyPayment = useVerifyRazorpayPayment();

  const razorpayKeys = {
    14496: "rzp_live_KZSDFi3qOgrIgC",
    14492: "rzp_live_IQdcqeX4foVUM3",
    14494: "rzp_live_SxbRIhkDqyGEOM",
    14493: "rzp_live_uUlevuP8MoleGg", 
  };
  const razorpayKeyId = razorpayKeys[hotelDetail?.hotelCode];


  const handlePayment = () => {
    const orderPayload = {
      amount: amount,
      currency: "INR",
      hotelCode: hotelDetail?.hotelCode,
    };

    createOrder.mutate(orderPayload, {
      onSuccess: (order) => {
        const options = {
          key: razorpayKeyId,  // Pass this key from your parent
          amount: order.amount,
          currency: order.currency,
          name: hotelDetail?.hotelName,
          description: "Hotel Booking Payment",
          order_id: order.id,
          handler: function (response) {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              hotelCode: hotelDetail?.hotelCode,
            };

            verifyPayment.mutate(verifyPayload, {
              onSuccess: () => {
                toast.success("Payment Verified ✅");
                // ✅ Pass paymenttypeunkid after verification
                onSuccess("PAID_TYPE_UNKID"); // Replace with your real ID
              }
            });
          },
          prefill: {
            name: "",
            email: "",
            contact: ""
          },
          theme: {
            color: "#38b2ac"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      },
      onError: () => {
        toast.error("Failed to create Razorpay order");
      }
    });
  };

  return (
    <button
              className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-green to-teal-600 text-white font-semibold rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
      onClick={handlePayment}
    >
      Confirm Booking
    </button>
  );
};

export default RazorpayPayment;
