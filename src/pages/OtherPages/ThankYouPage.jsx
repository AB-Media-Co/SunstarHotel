import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    CheckCircle2,
    Star,
    Sparkles,
    ArrowRight,
    BookOpen,
    Home,
    Calendar,
} from "lucide-react";
import axiosInstance from "../../services/axiosInstance";
import { formatINR } from "../../utils/formatCurrency";
const ThankYouPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);
    const hasCalledAPI = useRef(false);
    const {
        bookingResponse,
        payload,
        paymentMethod,
        checkIn,
        checkOut,
        hotel,
        user,
        rooms,
        hotelDetail
    } = state || {};

    // Confetti animation on mount + Save booking to Excel
    useEffect(() => {
        setShowConfetti(true);
        const t = setTimeout(() => setShowConfetti(false), 3000);
        // Save booking data to Excel sheet - only once
        if (state && user && rooms && !hasCalledAPI.current) {
            hasCalledAPI.current = true;
            const bookingData = {
                hotelCode: hotelDetail?.hotelCode,
                AuthCode: hotelDetail?.authKey,
                checkIn: checkIn,
                checkOut: checkOut,
                Hoteldata: hotelDetail?.name,

                selectedRooms: rooms.map(room => ({
                    roomName: room?.roomName,
                    option: paymentMethod === "pay-at-hotel" ? "Pay at Hotel" : "Paid Online",
                    price: room?.price || 0,
                    RoomTypeID: room?.RoomTypeID || '',
                    RateTypeID: room?.RateTypeID || '',
                })),
                userEmail: user?.email,
                userPhone: user?.phone,
            };

            axiosInstance.post('/api/enquiries/hotelData', bookingData)
                .then(() => {
                    // Booking saved successfully
                })
                .catch(() => {
                    // Error saving booking
                });
        }

        return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    const handleSeeBookings = () => {
        const userEmail = localStorage.getItem('user_email');
        localStorage.clear();
        if (userEmail) localStorage.setItem('user_email', userEmail);
        navigate("/user/profile", {
            replace: true, state: {
                tab: 'bookings'
            },
        });
    };

    const handleContinueBooking = () => {
        const userEmail = localStorage.getItem('user_email');
        localStorage.clear();
        if (userEmail) localStorage.setItem('user_email', userEmail);
        navigate("/", { replace: true });
    };

    // Calculate number of nights
    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const nights = calculateNights();

    // Format date with day name for better display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
            return `${dayName}, ${formattedDate}`;
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            {/* Confetti */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-20">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-bounce"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                        </div>
                    ))}
                </div>
            )}

            <div className="relative bg-white rounded-2xl shadow-2xl md:max-w-2xl w-full md:mx-4 overflow-hidden">
                {/* Success Header (from popup) */}
                <div className="bg-gradient-to-br from-green-400 to-teal-500 px-6 py-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -top-10 -left-10 w-20 h-20 bg-white rounded-full"></div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full"></div>
                        <div className="absolute top-20 -right-5 w-16 h-16 bg-white rounded-full"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Booking Confirmed!
                        </h2>
                        <p className="text-green-100">
                            Your reservation has been successfully booked,  We&apos;ve sent a confirmation email with all the details.
                            Have a wonderful stay!
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 py-8">
                 
                    {/* Booking Summary / Stats */}
                    {user && (
                        <div className="space-y-4 mb-8">
                            {/* Guest Information */}
                            <div className="p-5 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Guest Information</div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {user?.firstName} {user?.lastName}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">{user?.email}</div>
                                        {user?.phone && (
                                            <div className="text-sm text-gray-600">{user?.phone}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Hotel & Stay Information with Rooms */}
                            <div className="p-5 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-white">
                                <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">Your Stay Details</div>
                                
                                {/* Hotel Name */}
                                <div className="mb-4">
                                    <div className="text-lg font-bold text-gray-900">
                                        {hotelDetail?.name || hotel?.name || "Hotel"}
                                    </div>
                                </div>

                                {/* Check-in & Check-out */}
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-1">
                                        <div className="text-xs font-medium text-gray-500">Check-in</div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {formatDate(checkIn)}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs font-medium text-gray-500">Check-out</div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {formatDate(checkOut)}
                                        </div>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="mb-4 pt-3 border-t border-teal-200">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                                        <Calendar className="w-4 h-4" />
                                        <span>{nights} {nights === 1 ? 'Night' : 'Nights'} Stay</span>
                                    </div>
                                </div>

                                {/* Room Details */}
                                {Array.isArray(rooms) && rooms.length > 0 && (
                                    <div>
                                        <div className="pt-3 border-t border-teal-200">
                                            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">Booked Rooms</div>
                                            <div className="space-y-2">
                                                {rooms.map((r, i) => (
                                                    <div key={i} className="bg-white rounded-lg p-3 border border-teal-100">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1">
                                                                <div className="font-semibold text-gray-900 text-sm">
                                                                    {r?.roomName || r?.RoomTypeName || r?.RoomTypeID || "Room"}
                                                                </div>
                                                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 mt-2">
                                                                    <div className="flex items-center gap-1">
                                                                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                        </svg>
                                                                        <span>{r?.guestQty || 1} {(r?.guestQty || 1) === 1 ? 'Guest' : 'Guests'}</span>
                                                                    </div>
                                                                    {r?.option && (
                                                                        <div className="flex items-center gap-1">
                                                                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                                                            <span>{r.option === 'continental' ? 'With Breakfast' : 'Room Only'}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {r?.price != null && (
                                                                <div className="text-right flex-shrink-0">
                                                                    <div className="font-semibold text-teal-600 text-sm">{formatINR(r.price)}</div>
                                                                    <div className="text-xs text-gray-500">per night</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Booking & Payment Information */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Booking ID</div>
                                    <div className="text-base font-bold text-gray-900">
                                        {bookingResponse?.data?.ReservationNo || 
                                         bookingResponse?.ReservationNo || 
                                         bookingResponse?.data?.bookingId || 
                                         bookingResponse?.bookingId || 
                                         "Processing"}
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-teal-600">
                                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                        {bookingResponse?.data?.BookingStatus || 
                                         bookingResponse?.BookingStatus || 
                                         bookingResponse?.data?.status || 
                                         bookingResponse?.status || 
                                         "Confirmed"}
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Payment Method</div>
                                    <div className="text-base font-semibold text-gray-900">
                                        {paymentMethod === "pay-at-hotel" ? "Pay at Hotel" : "Paid Online"}
                                    </div>
                                    {paymentMethod === "pay-at-hotel" ? (
                                        <div className="text-xs text-gray-600 mt-2">
                                            Payment will be collected at check-in
                                        </div>
                                    ) : (
                                        <div className="text-xs text-teal-600 font-medium mt-2">
                                            Payment completed successfully
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Action Buttons (same behavior as popup) */}
                    <div className="space-y-3">
                        <button
                            onClick={handleSeeBookings}
                            className="w-full group relative overflow-hidden bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:from-teal-600 hover:to-teal-700 hover:shadow-lg transform hover:scale-[1.02]"
                        >
                            <div className="flex items-center justify-center">
                                <BookOpen className="w-5 h-5 mr-2" />
                                <span>See My Bookings</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>

                        <button
                            onClick={handleContinueBooking}
                            className="w-full group relative overflow-hidden bg-white border-2 border-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transform hover:scale-[1.02]"
                        >
                            <div className="flex items-center justify-center">
                                <Home className="w-5 h-5 mr-2" />
                                <span>Continue to Book</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </div>

                    {/* Debug/Dev toggle (optional) */}
                    {/* <pre className="mt-6 text-xs bg-gray-50 p-3 rounded-lg overflow-x-auto">
              {JSON.stringify(state, null, 2)}
            </pre> */}
                </div>
            </div>
        </div>
    )
}

export default ThankYouPage
