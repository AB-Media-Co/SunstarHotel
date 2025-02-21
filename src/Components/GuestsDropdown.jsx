/* eslint-disable react/prop-types */
import { useState } from 'react';
import Icon from './Icons';

const GuestsDropdown = ({
  dropdownDirection = "down",
  classBg = 'bg-primary-white',
  nights='2'
}) => {

  const [showDropdown, setShowDropdown] = useState(false);

  // State to manage the pop-up alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [guestDetails, setGuestDetails] = useState({
    adults: 2,
    kids: 0,
    rooms: 1,
  });

  const totalGuests = guestDetails.adults + guestDetails.kids;

 
  const checkLimits = (field, newValue) => {
    // 1. Check max guests (example: 6 total)
    if (field !== 'rooms') {
      const newTotalGuests =
        field === 'adults'
          ? newValue + guestDetails.kids
          : guestDetails.adults + newValue;
      if (newTotalGuests > 3) {
        setAlertMessage("Maximum of 6 total guests (adults + kids) allowed.");
        setShowAlert(true);
        return false;
      }
    }

    // 2. Check rooms constraints
    if (field === 'rooms') {
      // If 15 nights, only 2 rooms allowed
      if (nights === 15 && newValue > 2) {
        setAlertMessage(
          "For a stay of 15 nights, only 2 rooms can be selected. " +
          "Online bookings are limited to 30 units (rooms x nights) " +
          "and a maximum of 5 rooms per booking."
        );
        setShowAlert(true);
        return false;
      }

      // Max 5 rooms overall
      if (newValue > 5) {
        setAlertMessage(
          "You cannot select more than 5 rooms in a single booking."
        );
        setShowAlert(true);
        return false;
      }

      // Check total units (rooms x nights <= 30)
      const newTotalUnits = newValue * nights;
      if (newTotalUnits > 30) {
        setAlertMessage(
          `Online bookings are limited to 30 total units (rooms x nights). ` +
          `Currently: ${newTotalUnits} units.`
        );
        setShowAlert(true);
        return false;
      }
    }

    return true; // If all checks pass
  };

  const handleIncrement = (field) => {
    const newValue = guestDetails[field] + 1;

    // Check limits first
    if (!checkLimits(field, newValue)) return;

    // If okay, update
    setGuestDetails((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleDecrement = (field) => {
    if (
      (field === "adults" || field === "rooms") && guestDetails[field] > 1
    ) {
      const newValue = guestDetails[field] - 1;
      if (!checkLimits(field, newValue)) return;
      setGuestDetails((prev) => ({
        ...prev,
        [field]: newValue,
      }));
    } else if (field === "kids" && guestDetails[field] > 0) {
      const newValue = guestDetails[field] - 1;
      if (!checkLimits(field, newValue)) return;
      setGuestDetails((prev) => ({
        ...prev,
        [field]: newValue,
      }));
    }
  };

  return (
    <div className="relative">
      {/* MAIN BUTTON */}
      <div
        className={`
          flex items-center ${classBg} border border-primary-dark-green 
          rounded-full px-[8px] md:px-6 py-[8px] md:py-[15px] 
          sm:py-3 space-x-2 cursor-pointer hover:shadow-md shadow-sm
        `}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <Icon name="guestHotel" className="h-5 w-5 sm:h-6 sm:w-6 text-primary-dark-green" />
        <span className="text-primary-dark-green text-mobile/body/2 md:text-desktop/body/1 font-semibold">
          {totalGuests} Guests, {guestDetails.rooms} Room
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-primary-dark-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* DROPDOWN */}
      {showDropdown && (
        <div
          className={`
            absolute z-20 bg-primary-white border  border-gray-200 
            rounded-md shadow-lg px-[5px] py-[10px] md:p-4 w-full sm:w-64
            ${dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"}
          `}
        >
          {/* Dropdown Items */}
          {["Adults", "Kids", "Rooms"].map((label, index) => {
            const field = label.toLowerCase();
            return (
              <div key={index} className="flex justify-between items-center mb-4">
                <span className="text-gray-700 text-mobile/body/2 md:text-desktop/body/1">
                  {label}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrement(field)}
                    className="text-primary-white bg-primary-green px-2 sm:px-3 py-1 rounded-full"
                  >
                    -
                  </button>
                  <span className="text-gray-700 text-mobile/body/2 md:text-desktop/body/1">
                    {guestDetails[field]}
                  </span>
                  <button
                    onClick={() => handleIncrement(field)}
                    className="text-primary-white bg-primary-green px-2 sm:px-3 py-1 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}

          {/* Done Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowDropdown(false)}
              className="bg-primary-green text-primary-white text-mobile/button md:text-desktop/button px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-[#004c4c] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ALERT BOX */}
      {showAlert && (
        <div
          className="absolute  left-1/2 top-[7rem] transform -translate-x-1/2 mt-2
                     bg-white border border-gray-300 rounded-md p-4 shadow-md w-72
                     z-30"
        >
          <p className="text-gray-700 text-sm mb-3">
            {alertMessage}
          </p>
          <div className="flex items-center justify-end space-x-2">
            <button
              className="text-primary-green font-semibold"
              onClick={() => {
                // Example: maybe redirect to a contact page or something
                // For now, just close the alert.
                setShowAlert(false);
              }}
            >
              Book More
            </button>
            <button
              className="text-gray-500 font-semibold"
              onClick={() => setShowAlert(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestsDropdown;
