/* eslint-disable react/prop-types */
import HotelCard from "../../../Components/CardsCommonComp/HotelCardLayout";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

const SunstarBrandsSection = ({ hotels }) => {
    useTextRevealAnimation();
    useScrollAnimations();

    return (
        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-reveal-animation">Sunstar Brands</h2>
                <p className="text-gray-700 mb-10 font-semibold animation-on-scroll">
                    Revolutionizing the mid-market hotel space, one hotel at a time.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {hotels?.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                ))}
            </div>
        </section>
    );
};

export default SunstarBrandsSection;
