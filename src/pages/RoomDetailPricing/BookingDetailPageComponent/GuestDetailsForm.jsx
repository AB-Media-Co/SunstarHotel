import { useState, forwardRef, useEffect } from "react";
import { useSendOtp, useVerifyOtp, useGetUserByEmail } from "../../../ApiHooks/useUser";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const GuestDetailsForm = forwardRef(({setIsVerified}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("user_email") || "");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  const { data: userData, refetch: refetchUser } = useGetUserByEmail(email);
  console.log("userData", userData);  // log userData here

  // ✅ Auto-fill after getting user data
  useEffect(() => {
    if (userData?.data?.isVerified) {
      setFirstName(userData?.data?.firstName || "");
      setLastName(userData?.data?.lastName || "");
      setPhoneNumber(userData?.data?.phone || "");
      setIsVerified(userData?.data?.isVerified);

    }
    if (userData?.data?.isVerified) {
      localStorage.setItem("user_email", email);
    }
  }, [email, setIsVerified, userData]);

  const handleSendOtp = () => {
    const payload = { email, phone: phoneNumber, firstName, lastName, role: "user", loyalAgent: false };
    sendOtpMutation.mutate(payload, {
      onSuccess: () => {
        setOtpSent(true);
      }
    });
  };

  const handleVerifyOtp = () => {
    verifyOtpMutation.mutate({ email, otp }, {
      onSuccess: () => {
        localStorage.setItem("user_email", email);
        refetchUser();
        setOtp("");  // clear OTP after success
      }
    });
  };

  const isFormValid = firstName.trim() && lastName.trim() && email.trim() && phoneNumber.trim();

  const formFields = [ 
    { 
      id: "firstName", 
      label: "First Name", 
      placeholder: "Enter your first name", 
      type: "text",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    { 
      id: "lastName", 
      label: "Last Name", 
      placeholder: "Enter your last name", 
      type: "text",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    { 
      id: "email", 
      label: "Email Address", 
      placeholder: "Enter your email address", 
      type: "email",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    },
    { 
      id: "mobile", 
      label: "Mobile Number", 
      placeholder: "Enter your mobile number", 
      type: "tel",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      )
    }
  ];

  const getFieldValue = (id) => {
    switch(id) {
      case "firstName": return firstName;
      case "lastName": return lastName;
      case "email": return email;
      case "mobile": return phoneNumber;
      default: return "";
    }
  };

  const handleFieldChange = (id, value) => {
    switch(id) {
      case "firstName": setFirstName(value); break;
      case "lastName": setLastName(value); break;
      case "email": setEmail(value); break;
      case "mobile": setPhoneNumber(value); break;
    }
  };

  return (
    <div id="guestDetail" className="flex flex-col gap-10 relative overflow-hidden" >
      {/* Decorative Background Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-cyan-600"></div>
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full opacity-20"></div>
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-full opacity-30"></div> */}

      {/* Enhanced Header */}
      <div className="flex items-center mb-2 relative z-10">
        <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full mr-5 shadow-lg"></div>
        <div>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-1">Guest Details</h2>
          <p className="text-gray-600">Please provide your information to proceed</p>
        </div>
      </div>

     
        <div className="relative z-10">
          {/* Verification Status Banner */}
          {userData?.data?.isVerified && (
            <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-800">Account Verified</p>
                <p className="text-green-600 text-sm">Your email and mobile number are verified</p>
              </div>
            </div>
          )}

          {/* Enhanced Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formFields.map(({ id, label, placeholder, type, icon }) => {
              const fieldValue = getFieldValue(id);
              const isFieldFocused = focusedField === id;
              const hasValue = fieldValue && fieldValue.trim();
              
              return (
                <div key={id} className="flex flex-col gap-3 group">
                  <label 
                    htmlFor={id} 
                    className={`block text-sm font-semibold tracking-wide transition-colors duration-200 ${
                      isFieldFocused || hasValue ? 'text-cyan-600' : 'text-gray-700'
                    }`}
                  >
                    {label} <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      {/* Icon */}
                      <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                        isFieldFocused ? 'text-cyan-500' : hasValue ? 'text-cyan-600' : 'text-gray-400'
                      }`}>
                        {icon}
                      </div>
                      
                      {/* Input Field */}
                      <input
                        type={type}
                        id={id}
                        placeholder={placeholder}
                        className={`w-full h-14 pl-12 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-100 ${
                          isFieldFocused 
                            ? 'border-cyan-400 shadow-lg' 
                            : hasValue 
                              ? 'border-cyan-300 bg-cyan-50' 
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(id, e.target.value)}
                        onFocus={() => setFocusedField(id)}
                        onBlur={() => setFocusedField(null)}
                      />
                      
                      {/* Clear Button */}
                      {hasValue && (
                        <button
                          type="button"
                          onClick={() => handleFieldChange(id, "")}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Verify Button for Mobile */}
                    {id === "mobile" && !userData?.data?.isVerified && (
                      <button
                        type="button"
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                          isFormValid 
                            ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-cyan-200 hover:shadow-cyan-300' 
                            : 'bg-gray-300 cursor-not-allowed text-gray-500'
                        } ${sendOtpMutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isFormValid || sendOtpMutation.isLoading}
                        onClick={handleSendOtp}
                      >
                        {sendOtpMutation.isLoading ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <CheckCircleOutlineOutlinedIcon/>
                            Verify
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </form>
        </div>

      {/* Enhanced OTP Section */}
      {otpSent && !userData?.data?.isVerified && (
        <div className="relative z-10 mt-8 p-6 bg-gradient-to-br from-cyan-50 to-white border-2 border-cyan-200 rounded-2xl shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-2xl"></div>
          
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Verify Your Mobile</h3>
              <p className="text-gray-600 text-sm">We've sent a verification code to your mobile number</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <input
                type="text"
                id="otp"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="w-full h-14 pl-12 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-cyan-200 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 focus:shadow-lg"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                onKeyPress={(e) => e.key === 'Enter' && otp.length === 6 && handleVerifyOtp()}
              />
              {otp && (
                <button
                  type="button"
                  onClick={() => setOtp('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            
            <button
              type="button"
              className={`w-full h-14 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                verifyOtpMutation.isLoading || otp.length !== 6
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                  : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-cyan-300 hover:shadow-cyan-400'
              }`}
              onClick={handleVerifyOtp}
              disabled={verifyOtpMutation.isLoading || otp.length !== 6}
            >
              {verifyOtpMutation.isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Verifying OTP...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verify OTP
                </div>
              )}
            </button>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Didn't receive the code?</span>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendOtpMutation.isLoading}
                className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline transition-colors"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

GuestDetailsForm.displayName = "GuestDetailsForm";
export default GuestDetailsForm;