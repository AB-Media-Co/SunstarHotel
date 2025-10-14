import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    CheckCircle2,
    Star,
    Sparkles,
    ArrowRight,
    BookOpen,
    Home,
} from "lucide-react";
const ThankYouPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);

    // Confetti animation on mount
    useEffect(() => {
        setShowConfetti(true);
        const t = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(t);
    }, []);

    // If someone opens /thankyou directly, go home
    useEffect(() => {
        if (!state) {
            navigate("/", { replace: true });
        }
    }, [state, navigate]);

    if (!state) return null;

    const {
        bookingResponse,
        payload,
        paymentMethod,
        checkIn,
        checkOut,
        hotel,
        user,
        rooms,
    } = state;

    const handleSeeBookings = () => {
        navigate("/user/profile", {
            replace: true, state: {
                tab: 'bookings'
            },
        });
    };

    const handleContinueBooking = () => {
        navigate("/", { replace: true });
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

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
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
                            Your reservation has been successfully booked
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 py-8">
                    {/* Thank You Message (from popup) */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                            <Star className="w-6 h-6 text-yellow-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Thank You for Your Booking!
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            We&apos;ve sent a confirmation email with all the details.
                            Have a wonderful stay!
                        </p>
                    </div>

                    {/* Booking Summary / Stats */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-xl border border-gray-200">
                            <div className="text-xs uppercase text-gray-500">Guest</div>
                            <div className="mt-1 text-sm text-gray-800">
                                {user?.firstName} {user?.lastName}
                            </div>
                            <div className="text-xs text-gray-500">{user?.email}</div>
                            {user?.phone && (
                                <div className="text-xs text-gray-500">{user?.phone}</div>
                            )}
                        </div>

                        <div className="p-4 rounded-xl border border-gray-200">
                            <div className="text-xs uppercase text-gray-500">Stay</div>
                            <div className="mt-1 text-sm text-gray-800">
                                {checkIn} — {checkOut}
                            </div>
                            <div className="text-xs text-gray-500">
                                Payment: {paymentMethod === "pay-at-hotel" ? "Pay at Hotel" : "Paid Online"}
                            </div>
                       
                        </div>

                        <div className="p-4 rounded-xl border border-gray-200">
                            <div className="text-xs uppercase text-gray-500">Hotel</div>
                            <div className="mt-1 text-sm text-gray-800">
                                {hotel?.name || hotel?.hotelCode}
                            </div>
                            <div className="text-xs text-gray-500">
                                Code: {hotel?.hotelCode || "-"}
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border border-gray-200">
                            <div className="text-xs uppercase text-gray-500">Booking</div>
                            <div className="mt-1 text-sm text-gray-800">
                                {bookingResponse?.data?.bookingId || bookingResponse?.bookingId || "—"}
                            </div>
                            <div className="text-xs text-gray-500">
                                Status: {bookingResponse?.data?.status || bookingResponse?.status || "Confirmed"}
                            </div>
                        </div>
                    </div>

                    {/* Rooms list */}
                    {Array.isArray(rooms) && rooms.length > 0 && (
                        <div className="mb-8">
                            <h4 className="font-semibold mb-3">Rooms</h4>
                            <ul className="space-y-2 text-sm">
                                {rooms.map((r, i) => (
                                    <li
                                        key={i}
                                        className="p-3 rounded-lg border border-gray-200 flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="text-gray-800">
                                                {r?.RoomTypeName || r?.RoomTypeID || "Room"}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Guests: {r?.guestQty || 1}
                                            </div>
                                        </div>
                                        {r?.price != null && (
                                            <div className="text-sm text-gray-700">₹{r.price}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>
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
