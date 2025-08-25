import { useGetUserByEmail } from "../../../ApiHooks/useUser";
import { usePricing } from "../../../Context/PricingContext";

const LoyaltyProgramCard = ({ onViewAll }) => {
    const userInfo = localStorage.getItem('user_email');
    const { openHotelModal } = usePricing();

    const { data: userData } = useGetUserByEmail(userInfo);
    console.log(userData)

    return (
        <div className=" md:p-8">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="bg-white rounded-3xl shadow-lg p-4 overflow-hidden max-w-md mx-auto">
                    <div>
                        <div className="flex items-center text-sm text-green-500 mb-2">
                            {/* lightning icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            Book direct & pay less
                        </div>

                        <h3 className="text-gray-600 text-3xl font-bold mb-3">
                            Complete a stay and get 5% extra off on your next booking
                        </h3>

                        <button
                            onClick={openHotelModal}
                            className="px-4 py-2 mt-4 border border-primary-green rounded text-primary-green font-medium hover:bg-yellow-50 transition">
                            Book Now
                        </button>
                    </div>
                </div>

                {/* Right Card */}
                <div className="relative">
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-md mx-auto">
                        {/* Card Header */}
                        <div className="bg-white p-4 pb-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-primary-green text-2xl font-semibold mb-1">
                                        Sunstar
                                    </h2>

                                </div>

                                <div className="text-right">
                                    <div className="text-gray-900 font-semibold">{userData?.data?.firstName + ' ' + userData?.data?.lastName}</div>
                                    <div className="text-gray-500 text-sm">{userData?.data?.email}</div>
                                </div>
                            </div>

                            {/* City Skyline Illustration */}
                            <div className="flex justify-center">
                                <img src="/images/loyalty-illustration.svg" alt="" className="h-[110px]" />
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div className="bg-primary-green p-4">
                            <div className="flex justify-between items-center text-white">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold">{userData?.data?.totalBookings} Stays</span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>

                                <div className="text-right">
                                    <div className="text-sm opacity-90">1 Stay to Road Warrior</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div className=" mx-auto mt-5 md:p-6">
                {/* Header */}
                <h2 className="text-2xl font-semibold text-gray-800">
                    Your Recent Stays
                </h2>
                <p className="mt-2 text-gray-500">
                    {userData?.data?.totalBookings} Stays completed in the past 180 days. Stays will appear here after
                    check-out. They will be counted towards loyalty benefits within 48hrs.
                </p>

      

                {/* Card */}
                <div className="mt-6 bg-gray-100 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-700">
                        You don't have any recent stays
                    </h3>
                    <p className="mt-2 text-gray-500">
                        It looks like you haven't completed a stay with us in the past 180
                        days. Check out our top-rated hotels & book direct to save more!
                    </p>
                    <button
                        onClick={onViewAll}
                        className="mt-4 bg-primary-green hover:bg-primary-green text-white font-semibold px-6 py-3 rounded-lg">
                        View All Bookings
                    </button>
                </div>
            </div>
         
        </div>
    );
};

export default LoyaltyProgramCard;
