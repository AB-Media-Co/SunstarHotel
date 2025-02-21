import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Icon from "../../../Components/Icons";
import { useLocation } from "react-router-dom";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";

const options = [
  {
    id: 1,
    icon: "🅿️",
    title: "Car park",
    description: "Secure parking for your vehicle during your stay.",
  },
  {
    id: 2,
    title: "Bottle of Wine",
    description: "Enjoy a complimentary bottle of fine wine.",
  },
  {
    id: 3,
    icon: "🐾",
    title: "Stay Of a Pet",
    description: "Bring your pet along for a comfortable stay.",
  },
];

const BookingDetailsPage = () => {
  const location = useLocation();
  const {
    businessPlatformFeatures,
    hotelDetail,
    checkIn,
    checkOut,
  } = location.state || {};
  const { ContactUsDetail } = useUpdatePagesHook();


  console.log(location.state); 

  // Format the date as "Sat, 23 Nov 2024"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const [RoomQty, setRoomQty] = useState(1);
  const [expanded, setExpanded] = useState({});
  const toggleDescription = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const paymentMethodElement = document.querySelector("#payment-method");
    if (paymentMethodElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsPaymentVisible(entry.isIntersecting);
        },
        { threshold: 0.1 } // At least 10% visible
      );
      observer.observe(paymentMethodElement);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (isPaymentVisible) {
      setTimeout(() => setShowButton(false), 300);
    } else {
      setShowButton(true);
    }
  }, [isPaymentVisible]);

  return (
    <div className="p-4 content md:flex gap-5">
      <div className="flex flex-col gap-8">
        {/* Hotel Details Card */}
        <div className="flex flex-col lg:flex-row lg:h-[200px] w-full border p-4 rounded-md border-gray-300 bg-primary-white gap-4">
          {/* Image Section */}
          <div className="w-full lg:w-1/3 relative">
            <img
              src={hotelDetail?.aboutUs?.img}
              alt="Hotel Room"
              className="rounded-md w-full h-full object-cover"
            />
            <p className="text-[#FDC114] px-4 py-1 top-[116px] rounded-e-full font-semibold absolute bg-primary-white overflow-hidden animate-wipe">
              <span className="inline-block primary-whitespace-nowrap">Best Choice</span>
            </p>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center w-full gap-2">
            <h2 className="text-2xl font-bold text-[#288592]">
              {hotelDetail?.name}
            </h2>
            <p className="text-lg text-black font-semibold">
              {businessPlatformFeatures?.RoomName}
            </p>
            <p className="text-sm  md:max-w-xs text-primary-gray font-normal">
              {hotelDetail?.name + ", " + hotelDetail?.location}

            </p>

          </div>

          <div className="flex flex-col items-start w-full lg:w-[400px] gap-4">
            <div className="flex items-center justify-between w-full lg:w-[180px] text-[#288592] font-medium border-2 p-2 gap-4 text-lg rounded-xl">
              <span
                className="cursor-pointer text-yellow-500"
                onClick={() => RoomQty > 1 && setRoomQty(RoomQty - 1)}
              >
                <Remove />
              </span>
              {RoomQty} {RoomQty > 1 ? "Rooms" : "Room"}
              <span
                className="cursor-pointer text-yellow-500"
                onClick={() => setRoomQty(RoomQty + 1)}
              >
                <Add />
              </span>
            </div>

            {/* Room Options */}
            <div className="w-full">
              <h3 className="text-gray-500 text-xl font-bold">Room Options:</h3>
              <div className="flex flex-col gap-2 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="roomOption"
                    
                    className="w-4 h-4 text-[#288592] cursor-pointer border-2 border-[#288592] focus:ring-[#288592]"
                  />
                  <span className="text-base text-gray-500 font-semibold">
                    Room only
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="roomOption"
                    className="w-4 h-4 text-[#288592] cursor-pointer border-2 border-[#288592] focus:ring-[#288592]"
                  />
                  <span className="text-base text-gray-500 font-semibold">
                    Continental Plan (breakfast)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Enter Your Details */}
        <div className="flex flex-col gap-6 p-4">
          <h2 className="text-3xl font-bold mb-4">Enter Your Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* First Name */}
            <div className="flex flex-col gap-6">
              <label htmlFor="firstName" className="block text-xl font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                className="w-full h-[70px] shadow-lg border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-0"
              />
            </div>
            {/* Last Name */}
            <div className="flex flex-col gap-6">
              <label htmlFor="lastName" className="block text-xl font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Smith"
                className="w-full h-[70px] shadow-lg border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-0"
              />
            </div>
            {/* Email Address */}
            <div className="flex flex-col gap-6">
              <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@"
                className="w-full h-[70px] shadow-lg border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-0"
              />
            </div>
            {/* Mobile Number */}
            <div className="flex flex-col gap-6">
              <label htmlFor="mobile" className="block text-xl font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative mt-1">
                <input
                  type="tel"
                  id="mobile"
                  placeholder="+91 1234567896"
                  className="w-full h-[70px] shadow-lg border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Add To Your Stay */}
        <div className="p-4 bg-primary-white">
          <h2 className="text-3xl font-bold mb-4">Add To Your Stay</h2>
          {options.map((option) => (
            <div
              key={option.id}
              className="flex w-full items-center justify-between border-[#A4A4A4] p-4 border rounded-lg mb-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <div className="flex gap-2 items-center w-full" onClick={() => toggleDescription(option.id)}>
                  <div className="text-3xl">{option.icon || ""}</div>
                  <div>
                    <div className="flex gap-2">
                      <h3 className="font-semibold text-lg">{option.title}</h3>
                      <button className="text-gray-500 text-sm">
                        {expanded[option.id] ? "▲" : "▼"}
                      </button>
                    </div>
                    {expanded[option.id] && (
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Offer Code */}
        <div className="flex flex-col p-4">
          <h2 className="text-3xl font-bold mb-4">Offer Code</h2>
          <div className="flex flex-col md:flex-row md:items-center max-w-xl gap-4 md:gap-2">
            <input
              type="text"
              id="promo"
              placeholder="Enter Offer Code Here"
              className="w-full h-[70px] shadow-lg border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-0"
            />
            <div className="w-[250px] h-[55px] cursor-pointer border rounded-lg p-4 text-center border-[#058FA2] text-[#058FA2] font-bold">
              Apply Offer Code
            </div>
          </div>
        </div>

        <hr className="h-[2px] bg-gray-500 lg:hidden w-full" />

        <div className="p-4 bg-primary-white rounded-lg shadow-lg lg:hidden w-full md:max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Reservation Summary</h2>
          <div className="flex flex-col gap-4 border-2 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Check-In</h3>
                <p className="md:text-lg font-semibold text-teal-600">
                  {formatDate(checkIn)}
                </p>
                <p className="text-sm text-gray-500">
                  From {hotelDetail?.checkIn || "10:00 AM"}
                </p>
              </div>
              <hr className="w-[2px] bg-gray-400 h-16" />
              <div>
                <h3 className="text-sm font-medium text-gray-700">Check-Out</h3>
                <p className="md:text-lg font-semibold text-teal-600">
                  {formatDate(checkOut)}
                </p>
                <p className="text-sm text-gray-500">
                  By {hotelDetail?.checkOut || "2:00 PM"}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-700 flex items-center">
                Total Length Of Stay:
                <span className="ml-2 font-semibold text-gray-800">2</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </p>
              <p className="text-sm text-gray-700 mt-2">
                You Selected:
                <span className="block text-xl font-semibold text-teal-600">
                  {hotelDetail?.name} - {businessPlatformFeatures?.RoomName}
                </span>
                <a href="#" className="text-sm text-orange-600 underline">
                  Change Your Selection
                </a>
              </p>
            </div>
          </div>
          {/* Price Summary */}
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Your Price Summary
            </h3>
            <div className="flex justify-between text-sm text-gray-700">
              <p>{businessPlatformFeatures?.RoomName}</p>
              <p className="font-medium text-gray-800">₹{businessPlatformFeatures?.discountRate}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <p>Pay Now Discount</p>
              <p className="font-medium text-red-600">- ₹ 700</p>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <p>Taxes & Other Charges</p>
              <p className="font-medium text-gray-800">₹ 756</p>
            </div>
          </div>
          {/* Payable Amount */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-base font-semibold">
              <p>Payable Amount</p>
              <p className="text-teal-600">₹ 7,056</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div id="payment-method" className="flex flex-col p-4">
          <h2 className="text-3xl font-bold mb-4">Payment Method</h2>
          <div className="flex flex-col gap-4">
            {/* Pay at Hotel Option */}
            <label htmlFor="pay-at-hotel" className="flex items-center gap-4 border-2 p-4 rounded-lg cursor-pointer hover:shadow-lg">
              <input type="radio" id="pay-at-hotel" name="payment-method" className="w-5 h-5" />
              <div>
                <h3 className="text-lg font-medium">Pay at Hotel</h3>
                <p className="text-sm text-gray-500">
                  Reserve now and pay directly at the hotel upon check-in.
                </p>
              </div>
            </label>
            {/* UPI Payment Option */}
            <label htmlFor="upi-payment" className="flex items-center gap-4 border-2 p-4 rounded-lg cursor-pointer hover:shadow-lg">
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
            <button className="mt-6 w-[200px] bg-teal-500 hover:bg-teal-600 text-primary-white font-semibold py-3 rounded">
              Continue to Pay
            </button>
          </div>
        </div>

        <hr className="h-[2px] bg-gray-500 w-full" />
        <div className="flex flex-col gap-10 md:flex-row justify-between md:items-center text-gray-600 px-4">
          {/* Left Section */}
          <div className="flex flex-col font-semibold md:gap-4">
            <p className="md:text-2xl">Facing an Issue? Call us for assistance.</p>
            <a href={`tel:${ContactUsDetail?.phoneNumber}`} className="md:text-xl underline hover:text-gray-800">
            {ContactUsDetail?.phoneNumber}
            </a>
          </div>
          {/* Right Section */}
          <div className="flex gap-4">
            <a href="#" className="md:text-lg font-semibold underline hover:text-gray-800">
              Cancellation Policy
            </a>
            <a href="#" className="md:text-lg font-semibold underline hover:text-gray-800">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="p-4 bg-primary-white sticky top-4 border-2 rounded-lg w-full md:max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Reservation Summary</h2>
          <div className="flex flex-col gap-4 border-2 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Check-In</h3>
                <p className="md:text-lg font-semibold text-teal-600">
                  {formatDate(checkIn)}
                </p>
                <p className="text-sm text-gray-500">
                  From {hotelDetail?.checkIn || "10:00 AM"}
                </p>
              </div>
              <hr className="w-[2px] bg-gray-400 h-16" />
              <div>
                <h3 className="text-sm font-medium text-gray-700">Check-Out</h3>
                <p className="md:text-lg font-semibold text-teal-600">
                  {formatDate(checkOut)}
                </p>
                <p className="text-sm text-gray-500">
                  By {hotelDetail?.checkOut || "2:00 PM"}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-700 flex items-center">
                Total Length Of Stay:
                <span className="ml-2 font-semibold text-gray-800">2</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </p>
              <p className="text-sm text-gray-700 mt-2">
                You Selected:
                <span className="block text-xl font-semibold text-teal-600">
                  {hotelDetail?.name} - {businessPlatformFeatures?.RoomName}
                </span>
                <a href="#" className="text-sm text-orange-600 underline">
                  Change Your Selection
                </a>
              </p>
            </div>
          </div>
          {/* Price Summary */}
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Your Price Summary
            </h3>
            <div className="flex justify-between text-sm text-gray-700">
              <p>1 Superior Twin x 1 Night</p>
              <p className="font-medium text-gray-800">₹ 7,000</p>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <p>Pay Now Discount</p>
              <p className="font-medium text-red-600">- ₹ 700</p>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <p>Taxes & Other Charges</p>
              <p className="font-medium text-gray-800">₹ 756</p>
            </div>
          </div>
          {/* Payable Amount */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-base font-semibold">
              <p>Payable Amount</p>
              <p className="text-primary-green">₹ 7,056</p>
            </div>
          </div>
          {/* Pay Button */}
          <a href="#payment-method">
            {showButton && (
              <button
                className={`mt-6 w-full bg-primary-green text-primary-white font-semibold py-3 rounded transition-opacity duration-300 ${isPaymentVisible ? "opacity-0" : "opacity-100"
                  }`}
              >
                See Payment Options
              </button>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
