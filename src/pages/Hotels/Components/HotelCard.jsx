import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

function HotelCard() {
    useTextRevealAnimation();
    useScrollAnimations();
    return (
        <div className="py-6 content px-4">
            <div className="flex flex-col sm:flex-row justify-between md:items-center sm:space-x-5">
                {/* Hotel Name and Price Section */}
                <div className="flex flex-col sm:flex-row items-center sm:space-x-5 w-full sm:w-auto">
                    <div>
                        <h2 className="text-mobile/h4 md:text-desktop/h3 text-reveal-animation font-bold text-gray-800">
                            Hotel Sunstar - Grand
                        </h2>
                        <div className="text-mobile/caption md:text-desktop/caption text-teal-500 animation-on-scroll">
                            <a href="#" className="hover:underline">
                                Book Direct for Lowest Prices!
                            </a>
                        </div>
                    </div>
                    <div className="text-mobile/body/2 md:text-desktop/body/1 mt-3 sm:mt-0 flex md:flex-col gap-2 animation-on-scroll">
                        <p className="text-teal-500 font-bold">
                            ₹ 5,880 <span className="font-normal text-gray-600">/ night</span>
                        </p>
                        <p className="text-xs text-gray-500">Incl. taxes</p>
                    </div>
                </div>
                {/* Check-In/Check-Out Section */}
                <div className="bg-teal-100 text-[#058FA2] font-medium rounded-full py-2 px-4 justify-center flex text-mobile/body/2 md:text-desktop/body/1 shadow-sm mt-4 sm:mt-0">
                    Check-In <span className="font-bold text-teal-800">2:00pm</span> Check-Out{" "}
                    <span className="font-bold text-teal-800">11:00am</span>
                </div>
            </div>

            {/* Hotel Description */}
            <div className="mt-4 text-gray-600 animation-on-scroll w-full sm:w-[800px] text-mobile/body/2 md:text-desktop/body/1">
                <p>
                    Nestled in the heart of Karol Bagh, New Delhi, our hotel boasts a welcoming
                    wooden lodge-inspired lobby, a versatile restaurant and meeting room for your
                    culinary and business needs.
                </p>
            </div>

            {/* Divider */}
            <hr className="mt-4 border-gray-300" />
        </div>
    );
}

export default HotelCard;
