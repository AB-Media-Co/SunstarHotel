import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed max-w-[350px] bottom-4  right-4 sm:right-8 z-50 bg-white shadow-lg rounded-lg p-5 flex flex-col  items-center justify-between gap-4 animate-fadeIn">
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-800">We value your privacy</h3>
        <p className="text-sm text-gray-600 mt-1">
          We use cookies to enhance your experience. You can accept or decline the use of cookies.
        </p>
      </div>
      <div className="flex items-end w-full justify-end gap-3">
        <button
          onClick={handleDecline}
          className="border border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
