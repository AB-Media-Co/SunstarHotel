/* eslint-disable react/prop-types */
// LoginModal.js
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSendOtp, useVerifyOtp, useCheckEmailVerification } from '../ApiHooks/useUser';
import { X, ArrowLeft } from 'lucide-react';

const LoginModal = ({ closeModal }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [verifying, setVerifying] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);

    const sendOtp = useSendOtp();
    const verifyOtp = useVerifyOtp();
    const { data: emailVerificationData, refetch: checkEmailVerification } = useCheckEmailVerification(email);

    const handleEmailSubmit = async () => {
        if (!email.includes('@')) {
            toast.error('Enter a valid email');
            return;
        }

        setCheckingEmail(true);

        try {
            // Check if email exists in database
            const result = await checkEmailVerification();

            if (result.data?.verified) {
                // Email exists in DB, proceed with OTP directly
                setSendingOtp(true);
                sendOtp.mutate(
                    { email },
                    {
                        onSuccess: () => {
                            setSendingOtp(false);
                            setStep(3); // Go directly to OTP step
                        },
                        onError: () => {
                            setSendingOtp(false);
                            // toast.error('Failed to send OTP. Please try again.');
                        }
                    }
                );
            } else {
                // Email doesn't exist, go to user details step
                setStep(2);
            }
        } catch (error) {
            console.error('Failed to verify email. Please try again.', error);
        } finally {
            setCheckingEmail(false);
        }
    };

    const handleUserDetailsSubmit = () => {
        const { firstName, lastName, phone } = userDetails;

        if (!firstName.trim()) {
            toast.error('Please enter your first name');
            return;
        }
        if (!lastName.trim()) {
            toast.error('Please enter your last name');
            return;
        }
        if (!phone.trim()) {
            toast.error('Please enter your phone number');
            return;
        }
        if (phone.length < 10) {
            toast.error('Please enter a valid phone number');
            return;
        }

        // Now send OTP after collecting user details
        setSendingOtp(true);
        sendOtp.mutate(
            { email, ...userDetails }, // Include user details with OTP request
            {
                onSuccess: () => {
                    setSendingOtp(false);
                    setStep(3); // Go to OTP verification step
                },
                onError: () => {
                    setSendingOtp(false);
                    console.error('Failed to send OTP. Please try again.');
                }
            }
        );
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            toast.error('Please enter full 6-digit OTP');
            return;
        }

        setVerifying(true);
        verifyOtp.mutate(
            { email, otp: otpCode, ...userDetails },
            {
                onSuccess: () => {
                    localStorage.setItem("user_email", email);
                    localStorage.setItem("user_email", email);
                    closeModal();
                },
                onError: () => {
                    setVerifying(false);
                    console.error('Invalid OTP. Please try again.');
                }
            }
        );
    };

    const handleOtpChange = (index, value) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 6) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleResendOtp = () => {
        setSendingOtp(true);
        setOtp(['', '', '', '', '', '']); // Clear previous OTP
        sendOtp.mutate(
            { email, ...userDetails },
            {
                onSuccess: () => {
                    setSendingOtp(false);
                    // toast.success('OTP sent again');
                },
                onError: () => {
                    setSendingOtp(false);
                    // toast.error('Failed to resend OTP');
                }
            }
        );
    };

    const handleUserDetailsChange = (field, value) => {
        setUserDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getBackStep = () => {
        if (step === 2) return 1;
        if (step === 3) return emailVerificationData?.verified ? 1 : 2;
        return 1;
    };

    const stepImages = {
        1: '/images/Loginorjoin.png',
        2: '/images/completeprofile.png',
        3: '/images/verifyemail.png',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl z-50 overflow-hidden shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col md:flex-row">
                
                {/* Left Image Section - Hidden on mobile, visible on md+ */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src={stepImages[step]}
                        alt={
                            step === 1
                                ? 'Login or Sign Up'
                                : step === 2
                                    ? 'Complete Your Profile'
                                    : 'Verify Email'
                        }
                        className="object-cover object-center w-full h-full"
                    />
                </div>

                {/* Right Form Section */}
                <div className="flex-1 p-4 sm:p-6 md:p-8 relative overflow-y-auto">
                    {/* Close button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                    </button>

                    {/* Back button for steps 2 and 3 */}
                    {(step === 2 || step === 3) && (
                        <button
                            onClick={() => setStep(getBackStep())}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Back</span>
                        </button>
                    )}

                    {/* Content Container */}
                    <div className="max-w-sm sm:max-w-md mx-auto pt-2  md:pt-0">
                        
                        {/* Step 1: Email Input */}
                        {step === 1 && (
                            <>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Login or Sign Up</h2>
                                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                                   Track bookings, get rewards & enjoy up to 15% off with Sunstar.
                                </p>

                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Email Address"
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                            disabled={checkingEmail || sendingOtp}
                                        />
                                    </div>

                                    <button
                                        onClick={handleEmailSubmit}
                                        disabled={checkingEmail || sendingOtp}
                                        className="w-full bg-primary-green disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                                    >
                                        {checkingEmail ? 'Checking...' : sendingOtp ? 'Sending OTP...' : 'Continue'}
                                    </button>
                                </div>

                                <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                                    By continuing, you agree to the terms of use, privacy & cookie policy.
                                </p>
                            </>
                        )}

                        {/* Step 2: User Details (for new users) */}
                        {step === 2 && (
                            <>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Complete Your Profile</h2>
                                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                                    Please provide your details to continue
                                </p>

                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={userDetails.firstName}
                                            onChange={(e) => handleUserDetailsChange('firstName', e.target.value)}
                                            placeholder="Enter First Name"
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                            disabled={sendingOtp}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={userDetails.lastName}
                                            onChange={(e) => handleUserDetailsChange('lastName', e.target.value)}
                                            placeholder="Enter Last Name"
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                            disabled={sendingOtp}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={userDetails.phone}
                                            onChange={(e) => handleUserDetailsChange('phone', e.target.value)}
                                            placeholder="Enter Phone Number"
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                            disabled={sendingOtp}
                                        />
                                    </div>

                                    <button
                                        onClick={handleUserDetailsSubmit}
                                        disabled={sendingOtp}
                                        className="w-full bg-primary-green hover:bg-primary-green disabled:bg-primary-green disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                                    >
                                        {sendingOtp ? 'Sending OTP...' : 'Continue'}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 3: OTP Verification */}
                        {step === 3 && (
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Verify Email</h2>
                                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                                    Enter the 6-digit OTP sent to {email}
                                </p>
                                
                                {/* OTP Input Grid - Responsive */}
                                <div className="flex gap-2 sm:gap-3 justify-center">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-black text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all"
                                            maxLength="1"
                                            disabled={verifying}
                                        />
                                    ))}
                                </div>
                                
                                <button
                                    onClick={handleVerify}
                                    className="w-full bg-primary-green hover:bg-primary-green disabled:bg-primary-green disabled:cursor-not-allowed text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                                    disabled={verifying}
                                >
                                    {verifying ? 'Verifying...' : 'Continue'}
                                </button>
                                
                                <p className="text-xs sm:text-sm mt-4 text-gray-500 text-center">
                                    Didn't get a code?
                                    <button
                                        className="underline text-primary-green ml-1 disabled:text-gray-400"
                                        onClick={handleResendOtp}
                                        disabled={sendingOtp || verifying}
                                    >
                                        {sendingOtp ? 'Sending...' : 'Resend OTP'}
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
