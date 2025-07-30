/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CreditCard, Building2, Check, X } from "lucide-react";
import { useGetUserByEmail } from "../../../ApiHooks/useUser";
import { format } from "date-fns";
import { usePushBooking } from "../../../ApiHooks/pushBookingHook";
import RazorpayPayment from "../../RoomDetailPricing/BookingDetailPageComponent/RazorpayPayment";

const useFadeIn = (isOpen) => {
    const [transitionClass, setTransitionClass] = useState("opacity-0 scale-95 translate-y-4");


    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setTransitionClass("opacity-100 scale-100 translate-y-0");
            }, 10);
            return () => clearTimeout(timer);
        } else {
            setTransitionClass("opacity-0 scale-95 translate-y-4");
        }
    }, [isOpen]);

    return transitionClass;
};


const PaymentOptionModal = ({ isOpen, onClose, room, selectedDate, checkInTime, checkOutTime }) => {
    const [selectedOption, setSelectedOption] = useState("pay_at_hotel");
    const transitionClass = useFadeIn(isOpen);

    const userInfo = localStorage.getItem('user_email');
    const { data: userData, } = useGetUserByEmail(userInfo);
    console.log(room)

    const pushBooking = usePushBooking();


    if (!isOpen) return null;

    const Option = ({ value, title, description, icon: Icon, selected, onSelect, badge }) => (
        <div
            onClick={() => onSelect(value)}
            className={`
        relative border rounded-xl p-5 cursor-pointer transition-all duration-300 ease-out
        transform hover:scale-[1.02] hover:shadow-lg group
        ${selected
                    ? "bg-gradient-to-r from-teal-50 to-emerald-50 border-primary-green shadow-lg ring-2 ring-primary-green"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }
      `}
        >
            <div className="flex items-start gap-4">
                <div
                    className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
            ${selected ? "border-primary-green bg-primary-green" : "border-gray-300 group-hover:border-gray-400"}
          `}
                >
                    {selected && <Check className="w-3 h-3 text-white" />}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${selected ? "text-primary-green" : "text-gray-500"}`} />
                        <h3 className="font-semibold text-gray-800">{title}</h3>
                        {badge && (
                            <span className="px-2 py-1 bg-primary-green text-white text-xs font-medium rounded-full">
                                {badge}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
            </div>

            {selected && (
                <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                </div>
            )}
        </div>
    );


    const handlePaymentContinue = (paymenttypeunkid = "") => {
        const someOneElse = false;
        const guestData = {};
        const days = parseInt(localStorage.getItem("days")) || 1;

        const specialRequest = `Type: Day Use Room | Payment Method: ${selectedOption === "pay_at_hotel" ? "Pay at Hotel" : "Pay Now"} | Check-In: ${checkInTime} | Check-Out: ${checkOutTime}`;

        const Room_Details = {
            Room_1: {
                Rateplan_Id: room?.room?.RateTypeID || "",
                Ratetype_Id: room?.room?.RateTypeID || "",
                Roomtype_Id: room?.room?.RoomTypeID || "",
                baserate: Array(days).fill(room?.dayUse?.rate || 0).join(","),
                extradultrate: Array(days).fill(0).join(","),
                extrachildrate: Array(days).fill(0).join(","),
                number_adults: room?.room?.maxGuests?.toString() || "1",
                number_children: "0",
                ExtraChild_Age: "",
                Title: "",
                First_Name: someOneElse ? guestData.firstName || '' : userData?.data?.firstName || '',
                Last_Name: someOneElse ? guestData.lastName || '' : userData?.data?.lastName || '',
                Gender: userData?.data?.gender || '',
                SpecialRequest: specialRequest,
            }
        };

        const BookingData = {
            Room_Details,
            check_in_date: format(new Date(selectedDate), "yyyy-MM-dd"),
            check_out_date: '2025-07-05',
            Booking_Payment_Mode: selectedOption === "pay_at_hotel" ? "0" : "1",
            Email_Address: userData?.data?.email,
            Source_Id: "",
            MobileNo: someOneElse ? guestData.phone : userData?.data?.phone || '',
            Address: userData?.data?.address || '',
            State: userData?.data?.state || '',
            Country: userData?.data?.country || '',
            City: userData?.data?.city || '',
            Zipcode: "",
            Fax: "",
            Device: "Web",
            Languagekey: "",
            ...(selectedOption === "pay_now" && { paymenttypeunkid: paymenttypeunkid })
        };

        const payload = {
            BookingData,
            HotelCode: room?.hotel?.hotelCode || "",
            APIKey: room?.hotel?.apiKey,
            userEmail: userData?.data?.email,
        };
        console.log(payload)

        pushBooking.mutate(payload, {
            onSuccess: () => {
                alert("Booking successful");
                onClose(); // Close modal
            },
            onError: (err) => {
                console.error("Booking failed", err);
            }
        });
    };


    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
                <div
                    className={`bg-white w-full max-w-lg rounded-3xl shadow-2xl transform transition-all duration-300 ease-out ${transitionClass}`}
                >
                    {/* Header */}
                    <div className="relative p-6 border-b border-gray-100">
                        <div className=" flex gap-4">
                            <div className="w-16 h-16 bg-primary-green rounded-2xl flex items-center justify-center ">
                                <CreditCard className="w-8 h-8 text-white" />
                            </div>
                            <div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
                                <p className="text-gray-600">Select how you'd like to complete your booking</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Options */}
                    <div className="p-6 space-y-4">

                        <Option
                            value="pay_at_hotel"
                            title="Pay at Hotel"
                            description="Settle your bill directly at the property with flexible payment options upon arrival."
                            icon={Building2}
                            selected={selectedOption === "pay_at_hotel"}
                            onSelect={setSelectedOption}
                        />
                        <Option
                            value="pay_now"
                            title="Pay Now"
                            description="Complete your payment online securely with instant confirmation and special discounts."
                            icon={CreditCard}
                            selected={selectedOption === "pay_now"}
                            onSelect={setSelectedOption}
                            badge="Recommended"
                        />
                    </div>

                    <div className="flex justify-between items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-3xl">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>

                        {selectedOption && (
                            <div className="flex justify-end w-full">
                                {selectedOption === "pay_now" ? (
                                    <RazorpayPayment
                                        amount={room?.dayUse?.rate || 0}
                                        hotelDetail={room?.hotel}
                                        onSuccess={(paymenttypeunkid) => handlePaymentContinue(paymenttypeunkid)}
                                    />
                                ) : (
                                    <button
                                        onClick={() => handlePaymentContinue()}
                                        className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-primary-green rounded-xl shadow-lg"
                                    >
                                        Continue Booking
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            
        </>
    );
};

export default PaymentOptionModal;