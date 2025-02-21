// PaymentButton.jsx
import React from "react";
import axios from "axios";

const PaymentButton = ({ amount, hotelDetail, businessPlatformFeatures }) => {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/payments/create", { amount });
      const { order } = data;

      const options = {
        key: '', // Your Razorpay public key from env
        amount: order.amount,
        currency: order.currency,
        name: hotelDetail?.name || "Hotel Booking",
        description: businessPlatformFeatures?.RoomName || "Reservation Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            // Call backend API to verify the payment signature.
            const verifyResponse = await axios.post("/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verifyResponse.data.success) {
              alert("Payment Successful!");
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Verification error. Please try again.");
          }
        },
        prefill: {
          name: "John Doe", // Prefill details (can be dynamic)
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Hotel Booking Address",
        },
        theme: {
          color: "#FDC114",
        },
      };

      // Open Razorpay checkout modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Error initiating payment. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="mt-6 w-[200px] bg-teal-500 hover:bg-teal-600 text-primary-white font-semibold py-3 rounded"
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;
