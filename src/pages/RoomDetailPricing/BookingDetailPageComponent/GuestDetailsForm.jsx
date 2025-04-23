import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useSendOtp, useVerifyOtp } from "../../../ApiHooks/useOffersAndDealsHook";
import { usePricing } from "../../../Context/PricingContext";
import {  useCreateBooking } from "../../../ApiHooks/useCreateBookingHook";
import { useUserBookings } from "../../../ApiHooks/useEnquiryFormHook";

const GuestDetailsForm = forwardRef((props, ref) => {
  const { phoneVerified, setPhoneVerified } = usePricing();

  // State variables for user details and OTP flow
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Get hotel info from localStorage (if needed for booking)
  const localdata = localStorage.getItem("hotelInfo");
  const hotelData = localdata ? JSON.parse(localdata) : null;


  const SavedEmail = Cookies.get("userEmail");
  let SavedPhone = Cookies.get("userPhone");
  
  // Normalize phone number for consistency (remove +91, spaces, dashes)
  if (SavedPhone) {
    SavedPhone = SavedPhone.replace(/[^0-9]/g, "").replace(/^91/, "");
  }
  
  const { data: userBookings } = useUserBookings(SavedEmail?.toLowerCase(), SavedPhone);
  


  useEffect(() => {
    if (userBookings?.length > 0) {
      console.log("User booking history:", userBookings);
    }
  }, [userBookings]);

  // Ref for scrolling into view on validation errors
  const formRef = useRef(null);

  const { mutate: sendOtp } = useSendOtp();
  const { mutate: verifyOtp } = useVerifyOtp();
  const { mutate: createBooking } = useCreateBooking();

  // On mount, check if the user has already verified (via cookie) and load stored info.
  useEffect(() => {
    const verified = Cookies.get("phoneVerified");
    const storedPhone = Cookies.get("userPhone");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (verified === "true" && storedPhone) {
      setPhoneVerified(true);
      setPhoneNumber(storedPhone);
      if (storedUserInfo) {
        const { firstName, lastName, email } = JSON.parse(storedUserInfo);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      }
      toast.success("Welcome back! Your information is loaded.");
    }
  }, [setPhoneVerified]);

  const validateFields = () => {
    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Please enter your last name");
      return false;
    }
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    return true;
  };

  const handleVerifyClick = () => {
    if (!validateFields()) {
      return;
    }
    sendOtp(`+91${phoneNumber}`, {
      onSuccess: (data) => {
        // Store the session ID returned from the API
        if (data && data.sessionId) {
          localStorage.setItem('otpSessionId', data.sessionId);
        }
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

    const sessionId = localStorage.getItem('otpSessionId');
    if (!sessionId) {
      toast.error("Session expired. Please request a new OTP");
      return;
    }

    verifyOtp({
      phone: formattedPhone,
      code: otp,
      sessionId: sessionId,
      firstName,
      lastName,
      email
    }, {
      onSuccess: (data) => {
        if (data && (data.status === "OTP Matched" || data.valid === true)) {
          setPhoneVerified(true);
          setShowModal(false);
          setOtp("");
          Cookies.set("phoneVerified", "true", { expires: 30 });
          Cookies.set("userPhone", formattedPhone, { expires: 30 });
          Cookies.set("userEmail", email, { expires: 30 });
          localStorage.setItem("userInfo", JSON.stringify({ firstName, lastName, email }));
          toast.success("Phone number verified");

          createBooking({
            name: `${firstName} ${lastName}`,
            email: email,
            mobileNumber: formattedPhone,
            hotelcode: hotelData?.hotelCode || "",
            authcode: hotelData?.authKey || "",
            roomDetails: []
          });
        } else {
          toast.error("Invalid OTP");
        }
      },
      onError: (error) => {
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

  // Expose the validateForm method and guest details to the parent component via ref
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
    <div ref={formRef} className="flex flex-col gap-8 bg-white  rounded-lg shadow-sm">
      <div className="flex items-center mb-2">
        <div className="w-1.5 h-10 bg-primary-green rounded-full mr-4" style={{ backgroundColor: "#058FA2" }}></div>
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Enter Your Details</h2>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[
          { id: "firstName", label: "First Name *", placeholder: "John", type: "text" },
          { id: "lastName", label: "Last Name *", placeholder: "Smith", type: "text" },
          { id: "email", label: "Email Address *", placeholder: "abc@example.com", type: "email" },
          { id: "mobile", label: "Mobile Number *", placeholder: "1234567896", type: "tel" }
        ].map(({ id, label, placeholder, type }) => (
          <div key={id} className="flex flex-col gap-3">
            <label htmlFor={id} className="block text-base font-semibold text-gray-800 tracking-wide">{label}</label>
            <div className="flex">
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="w-full h-[54px] shadow-sm border border-gray-300 rounded-lg py-2.5 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all duration-200"
                value={id === "mobile" ? phoneNumber : id === "firstName" ? firstName : id === "lastName" ? lastName : id === "email" ? email : undefined}
                onChange={(e) => {
                  if (id === "mobile") setPhoneNumber(e.target.value);
                  else if (id === "firstName") setFirstName(e.target.value);
                  else if (id === "lastName") setLastName(e.target.value);
                  else if (id === "email") setEmail(e.target.value);
                }}
              />
              {id === "mobile" && !phoneVerified && (
                <button
                  type="button"
                  onClick={handleVerifyClick}
                  className={`ml-3 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${firstName.trim() && lastName.trim() && email.trim() && phoneNumber.trim() ? 'bg-cyan-600 hover:bg-cyan-700 text-white' : 'bg-gray-400 cursor-not-allowed text-white'}`}
                  disabled={!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim()}
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
              Verify &amp; Continue
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
        <div className="mt-4 py-3 px-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Phone number verified successfully
          </p>
        </div>
      )}
    </div>
  );
});

GuestDetailsForm.displayName = "GuestDetailsForm";
export default GuestDetailsForm;
