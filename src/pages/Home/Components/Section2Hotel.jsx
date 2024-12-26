/* eslint-disable react/prop-types */
import RoatinfImg from "../../../Components/RoatinfImg";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";
import CardSlider from "./Sec2CardSlider";

const Section2Hotel = ({ section2HotelData }) => {
    const { heading, description, imagePosition } = section2HotelData;
    useTextRevealAnimation();
    useScrollAnimations()
    return (
        <div className="flex flex-col mt-[4rem] md:mt-0 gap-14 justify-between items-center lg:items-start  px-4 lg:px-8 lg:pr-0 z-0">
            {/* Image and Text Container */}
            <div className="relative flex flex-col  items-center lg:items-start mb-8 lg:mb-0 w-full ">
                <RoatinfImg position={imagePosition} />
                {/* Text container */}
                <div className="relative  content   text-black mt-[-2rem] lg:mt-10"
                    style={{ maxWidth: "85rem" }}
                >
                    <h1 className="text-[40px] lg:text-[48px] font-bold leading-tight text-reveal-animation">
                        {heading}
                    </h1>
                    <p className="text-sm md:text-lg mt-4 leading-relaxed animation-on-scroll">
                        {description}
                    </p>
                </div>
            </div>

            {/* Card Slider */}
            <div className="w-full lg:ps-[124px]  overflow-hidden">
                <CardSlider />
            </div>
        </div>
    );
};

export default Section2Hotel;
