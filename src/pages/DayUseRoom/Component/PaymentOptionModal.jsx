/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { User, Phone, Mail, X, Calendar } from "lucide-react";
import { useGetUserByEmail } from "../../../ApiHooks/useUser";
import { format } from "date-fns";
import { useEnquiryForm } from "../../../ApiHooks/useEnquiryFormHook";
import toast from 'react-hot-toast';

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
    const transitionClass = useFadeIn(isOpen);

    const userInfo = localStorage.getItem('user_email');
    const { data: userData, } = useGetUserByEmail(userInfo);

    const enquiry = useEnquiryForm();

    // User form state (prefilled if available)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (userData?.data) {
            setFirstName(userData.data.firstName || "");
            setLastName(userData.data.lastName || "");
            setEmail(userData.data.email || "");
            setPhone(userData.data.phone || "");
        }
    }, [userData]);


    if (!isOpen) return null;


    const handleBookingSubmit = () => {
        // Basic validation
        if (!firstName || !lastName || !email || !phone) {
            toast.error('Please fill all required fields');
            return;
        }

        const enquiryPayload = {
            type: 'day_use_room',
            selectedDate: format(new Date(selectedDate), 'yyyy-MM-dd'),
            checkInTime,
            checkOutTime,
            paymentMethod: 'Pay at Hotel', // Default payment method
            hotel: {
                name: room?.hotel?.name || '',
                hotelCode: room?.hotel?.hotelCode || '',
            },
            room: {
                name: room?.room?.RoomName || '',
                roomTypeId: room?.room?.RoomTypeID || '',
                rate: room?.dayUse?.rate || 0,
            },
            user: {
                firstName: firstName+ lastName,
                // lastName,
                email,
                phone,
            },
            source: 'website',
        };

        enquiry.mutate(enquiryPayload, {
            onSuccess: () => {
                toast.success('Day Use Room booking submitted successfully!');
                onClose();
            },
            onError: (err) => {
                console.error('Enquiry failed', err);
                toast.error('Failed to submit booking');
            },
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
                            {/* <div className="w-16 h-16 bg-primary-green rounded-2xl flex items-center justify-center ">
                                <Calendar className="w-8 h-8 text-white" />
                            </div> */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Day Use Room Booking</h2>
                                <p className="text-gray-600">Fill your details to confirm booking</p>
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

                    {/* Selected summary */}
                    <div className="px-6 pt-4">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-4">
                            <div>
                                <p className="text-xs text-gray-500">Selected Date</p>
                                <p className="font-semibold text-gray-800">{format(new Date(selectedDate), 'PPP')}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Check-in</p>
                                <p className="font-semibold text-gray-800">{checkInTime}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Check-out</p>
                                <p className="font-semibold text-gray-800">{checkOutTime}</p>
                            </div>
                        </div>
                    </div>

                    {/* User info form */}
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="text-sm text-gray-600">First Name</label>
                            <div className="mt-1 flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
                                <User className="w-4 h-4 text-gray-500" />
                                <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full outline-none" placeholder="Enter first name" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm text-gray-600">Last Name</label>
                            <div className="mt-1 flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
                                <User className="w-4 h-4 text-gray-500" />
                                <input value={lastName} onChange={(e)=>setLastName(e.target.value)} className="w-full outline-none" placeholder="Enter last name" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm text-gray-600">Email</label>
                            <div className="mt-1 flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full outline-none" placeholder="Enter email" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm text-gray-600">Phone</label>
                            <div className="mt-1 flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full outline-none" placeholder="Enter phone number" />
                            </div>
                        </div>
                    </div>

                    {/* Hotel and Room Info */}
                    <div className="px-6 pt-4">
                        <div className="bg-gradient-to-r from-primary-green/5 to-emerald-50 border border-primary-green/20 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-gray-800">{room?.hotel?.name || 'Hotel'}</h3>
                                <span className="text-primary-green font-bold">₹{room?.dayUse?.rate || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">{room?.room?.RoomName || 'Room'}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-3xl">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleBookingSubmit}
                            className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-primary-green rounded-xl shadow-lg hover:bg-primary-green/90 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-green"
                        >
                            Confirm Booking
                        </button>
                    </div>

                </div>
            </div>
            
        </>
    );
};

export default PaymentOptionModal;