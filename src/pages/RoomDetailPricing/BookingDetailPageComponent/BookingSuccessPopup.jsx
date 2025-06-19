/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Star,
  Sparkles,
  X,
  ArrowRight,
  BookOpen,
  Home
} from 'lucide-react';

export const BookingSuccessPopup = ({ 
  isOpen, 
  onClose, 
  onSeeBookings,
  onContinueBooking 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button> */}

        {/* Success Header */}
        <div className="bg-gradient-to-br from-green-400 to-teal-500 px-6 py-8 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-20 -right-5 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-green-100">
              Your reservation has been successfully booked
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="px-6 py-6">
             {/* Thank You Message */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Thank You for Your Booking!
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We've sent a confirmation email with all the details. 
              Have a wonderful stay!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onSeeBookings}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:from-teal-600 hover:to-teal-700 hover:shadow-lg transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>See My Bookings</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={onContinueBooking}
              className="w-full group relative overflow-hidden bg-white border-2 border-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-center">
                <Home className="w-5 h-5 mr-2" />
                <span>Continue to Book</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

