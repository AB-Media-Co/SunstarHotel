import { useState, forwardRef, useEffect } from "react";
import { useGetUserByEmail } from "../../../ApiHooks/useUser";
import LoginModal from "../../../Components/LoginModal";
import { usePricing } from "../../../Context/PricingContext";

const GuestDetailsForm = forwardRef(({ setIsVerified }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("user_email") || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isBookingForSomeoneElse, setIsBookingForSomeoneElse] = useState(false);
  const {someOneElse, setSomeoneElse,setGuestData} = usePricing()

  const [focusedField, setFocusedField] = useState(null);


  const verifiedUser = localStorage.getItem("user_email") !== null;

  const { data: userData } = useGetUserByEmail(email);

  console.log(userData)

  const [showLoginModal, setShowLoginModal] = useState(false);



  useEffect(() => {
    if (verifiedUser && someOneElse) {
      setGuestData({
        firstName,
        lastName,
        email,
        phone: phoneNumber
      });
    }
  }, [verifiedUser, someOneElse, firstName, lastName, email, phoneNumber, setGuestData]);
  


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
    switch (id) {
      case "firstName": return firstName;
      case "lastName": return lastName;
      case "email": return email;
      case "mobile": return phoneNumber;
      default: return "";
    }
  };

  const handleFieldChange = (id, value) => {
    switch (id) {
      case "firstName": setFirstName(value); break;
      case "lastName": setLastName(value); break;
      case "email": setEmail(value); break;
      case "mobile": setPhoneNumber(value); break;
    }
  };


  return (
    <div id="guestDetail" className="flex flex-col gap-10 relative overflow-hidden" >

      {/* Enhanced Header */}
      <div className="flex items-center mb-2 relative z-10">
        <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full mr-5 shadow-lg"></div>
        <div>
          <h2 className=" text-xl md:text-4xl font-bold text-gray-900 tracking-tight mb-1">Guest Details</h2>
          <p className="text-gray-600">Please provide your information to proceed</p>
        </div>
      </div>


      <div className="relative z-10">
        {/* Verification Status Banner */}
        {verifiedUser && (
          <>
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
            <div className="mb-8 p-4 border rounded-xl bg-gray-50 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                {/* Avatar with initials */}
                <div className="w-12 h-12 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-lg shadow">
                  {userData?.data?.firstName?.charAt(0)}{userData?.data?.lastName?.charAt(0)}
                </div>
                {/* User Info */}
                <div className="flex flex-col">
                  <p className="text-gray-900 font-semibold text-lg">{userData?.data?.firstName} {userData?.data?.lastName}</p>
                  <p className="text-sm text-gray-500">
                    {userData?.data?.email?.replace(/^(.{2})(.*)(@.*)$/, (_, a, b, c) => `${a}${'*'.repeat(b.length)}${c}`)} |
                    {' '}{userData?.data?.phone?.replace(/^(.{0,2})(.*)(.{4})$/, (_, a, b, c) => `${'*'.repeat(a.length ? a.length : 2)}${'*'.repeat(b.length)}${c}`)}
                  </p>
                </div>
              </div>

              {/* Log Out Link */}
              <button
                onClick={() => {
                  localStorage.removeItem("user_email");
                  window.location.reload();
                }}
                className="text-sm font-semibold text-gray-500 hover:underline"
              >
                Log Out
              </button>
            </div>

            {/* Checkbox Option */}
            <label className="flex items-center gap-2 text-gray-700 text-sm mb-8">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-yellow-500 border-gray-300 rounded"
                checked={isBookingForSomeoneElse}
                onChange={(e) => {
                  setIsBookingForSomeoneElse(e.target.checked);
                  setSomeoneElse(e.target.checked);
                }}
              />
              I'm booking for someone else
            </label>


            {/* Guest Details Form - Optional, if needed */}
            {isBookingForSomeoneElse && (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {formFields.map(({ id, label, placeholder, type, icon }) => {
                  const fieldValue = getFieldValue(id);
                  const isFieldFocused = focusedField === id;
                  const hasValue = fieldValue && fieldValue.trim();

                  return (
                    <div key={id} className="flex flex-col gap-3 group">
                      <label
                        htmlFor={id}
                        className={`block text-sm font-semibold tracking-wide transition-colors duration-200 ${isFieldFocused || hasValue ? 'text-cyan-600' : 'text-gray-700'
                          }`}
                      >
                        {label} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <div
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${isFieldFocused
                              ? 'text-cyan-500'
                              : hasValue
                                ? 'text-cyan-600'
                                : 'text-gray-400'
                              }`}
                          >
                            {icon}
                          </div>
                          <input
                            type={type}
                            id={id}
                            placeholder={placeholder}
                            className={`w-full h-14 pl-12 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 border-2 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-100
                              ${isFieldFocused
                                ? 'border-cyan-400 shadow-lg'
                                : hasValue
                                  ? 'border-cyan-300 bg-cyan-50'
                                  : 'border-gray-200 hover:border-gray-300'}
                              ${id === "email" ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
                            `}
                            value={fieldValue}
                            onChange={(e) => handleFieldChange(id, e.target.value)}
                            onFocus={() => setFocusedField(id)}
                            onBlur={() => setFocusedField(null)}
                            disabled={id === "email"}

                          />
                          {hasValue && (
                            <button
                              type="button"
                              onClick={() => handleFieldChange(id, '')}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </form>
            )}

          </>
        )}

        {!verifiedUser && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center shadow">
                !
              </div>
              <div>
                <p className="font-semibold text-yellow-800">Verification Needed</p>
                <p className="text-yellow-600 text-sm">Please verify your account to continue</p>
              </div>
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="ml-4 px-5 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
            >
              Please Verify
            </button>
          </div>
        )}
        {showLoginModal && <LoginModal closeModal={() => setShowLoginModal(false)} />}
      </div>
    </div>
  );
});

GuestDetailsForm.displayName = "GuestDetailsForm";
export default GuestDetailsForm;