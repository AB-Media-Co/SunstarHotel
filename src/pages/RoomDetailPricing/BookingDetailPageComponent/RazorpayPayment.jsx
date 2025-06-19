import React from "react";
import { useCreateRazorpayOrder, useVerifyRazorpayPayment } from "../../../ApiHooks/useRazorpayOrderHook";
import toast from "react-hot-toast";

const RazorpayPayment = ({ hotelDetail, amount, onSuccess }) => {
  const createOrder = useCreateRazorpayOrder();
  const verifyPayment = useVerifyRazorpayPayment();

  const razorpayKeys = {
    14496: "rzp_test_YAWILDo6yQ4sNw",
    14492: "rzp_test_xxxx2",
    14494: "rzp_test_xxxx3",
    14493: "rzp_test_xxxx4",
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
      className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg"
      onClick={handlePayment}
    >
      Confirm Booking
    </button>
  );
};

export default RazorpayPayment;
