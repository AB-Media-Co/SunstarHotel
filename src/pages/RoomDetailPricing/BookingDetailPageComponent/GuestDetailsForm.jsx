import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import toast from "react-hot-toast";
import { useSendOtp, useVerifyOtp } from "../../../ApiHooks/useOffersAndDealsHook";
import { usePricing } from "../../../Context/PricingContext";

const GuestDetailsForm = forwardRef((props, ref) => {
  const { phoneVerified, setPhoneVerified } = usePricing();

  // New state variables for the additional required fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Ref for scrolling into view when validation fails
  const formRef = useRef(null);

  const { mutate: sendOtp } = useSendOtp();
  const { mutate: verifyOtp } = useVerifyOtp();

  const handleVerifyClick = () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }
    sendOtp(`+91${phoneNumber}`, {
      onSuccess: () => {
        setShowModal(true);
        toast.success("OTP sent to your phone");
      },
      onError: () => {
        toast.error("Error sending OTP");
      }
    });
  };

  const handleVerifyOTP = () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }
  
    let formattedPhone = phoneNumber.trim();
    if (!formattedPhone.startsWith("+91")) {
      formattedPhone = "+91" + formattedPhone;
    }
  
    verifyOtp({ phone: formattedPhone, code: otp }, {
      onSuccess: (data) => {
        console.log("Verification Check Response:", data);
        if (data && (data.status === "approved" || data.valid === true)) {
          setPhoneVerified(true);
          setShowModal(false);
          setOtp('');
          toast.success("Phone number verified");
        } else {
          toast.error("Invalid OTP");
        }
      },
      onError: (error) => {
        console.log("OTP Verification Error:", error);
        if (error?.response?.data?.message) {
          toast.error(`OTP verification failed: ${error.response.data.message}`);
        } else {
          toast.error("OTP verification failed. Please try again.");
        }
      }
    });
  };

  // Extended validation function that checks for all required fields
  const validateForm = () => {
    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Please enter your last name");
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    if (!email.trim()) {
      toast.error("Please enter your email address");
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    if (!phoneNumber.trim()) {
      toast.error("Please enter your mobile number");
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    if (!phoneVerified) {
      toast.error("Please verify your phone number");
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    return true;
  };

  // Expose the validateForm method to the parent component via ref
  useImperativeHandle(ref, () => ({
    validateForm,
    getGuestDetails: () => ({
      firstName,
      lastName,
      email,
      phoneNumber
    })
  }));

  return (
    <div ref={formRef} className="flex flex-col gap-6 bg-white">
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-primary-green rounded-full mr-3" style={{ backgroundColor: "#058FA2" }}></div>
        <h2 className="text-3xl font-bold text-gray-800">Enter Your Details</h2>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { id: "firstName", label: "First Name *", placeholder: "John", type: "text" },
          { id: "lastName", label: "Last Name *", placeholder: "Smith", type: "text" },
          { id: "email", label: "Email Address *", placeholder: "abc@example.com", type: "email" },
          { id: "mobile", label: "Mobile Number", placeholder: "1234567896", type: "tel" }
        ].map(({ id, label, placeholder, type }) => (
          <div key={id} className="flex flex-col gap-2">
            <label htmlFor={id} className="block text-lg font-medium text-gray-700">{label}</label>
            <div className="flex">
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="w-full h-[50px] shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-primary-green focus:border-primary-green"
                value={
                  id === "mobile"
                    ? phoneNumber
                    : id === "firstName"
                      ? firstName
                      : id === "lastName"
                        ? lastName
                        : id === "email"
                          ? email
                          : undefined
                }
                onChange={(e) => {
                  if (id === "mobile") {
                    setPhoneNumber(e.target.value);
                  } else if (id === "firstName") {
                    setFirstName(e.target.value);
                  } else if (id === "lastName") {
                    setLastName(e.target.value);
                  } else if (id === "email") {
                    setEmail(e.target.value);
                  }
                }}
              />
              {id === "mobile" && !phoneVerified && (
                <button
                  type="button"
                  onClick={handleVerifyClick}
                  className="ml-2 px-4 py-2 bg-cyan-600 text-white rounded-md"
                >
                  Verify
                </button>
              )}
            </div>
          </div>
        ))}
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Enter Verification Code</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="mb-6 text-center">
              <div className="inline-block p-3 rounded-full bg-cyan-100 mb-4">
                {/* Optional SVG icon */}
              </div>
              <p className="text-gray-600 mb-4">We've sent a 6-digit code to +91 {phoneNumber}</p>
            </div>
            <div className="mb-6">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg tracking-widest focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                maxLength="6"
              />
            </div>
            <button
              onClick={handleVerifyOTP}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all"
            >
              Verify & Continue
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Didn't receive the code?{" "}
                <button onClick={handleVerifyClick} className="text-cyan-600 font-medium hover:underline">
                  Resend
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {phoneVerified && (
        <div className="mt-6 text-green-600 font-semibold">
          Phone number verified! Offer codes are now active.
        </div>
      )}
    </div>
  );
});

GuestDetailsForm.displayName = "GuestDetailsForm";

export default GuestDetailsForm;
