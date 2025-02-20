/* eslint-disable react/prop-types */
import HotelCard from "../../../Components/CardsCommonComp/HotelCardLayout";

const SunstarBrandsSection = ({ hotels }) => {

    return (
        <section className="py-12 content">
            <div>
                <h2 className="text-mobile/h3 md:text-desktop/h2 font-bold text-gray-900 mb-2 text-reveal-animation">
                    Sunstar Brands
                </h2>
                <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-700 mb-10 font-semibold animation-on-scroll">
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
