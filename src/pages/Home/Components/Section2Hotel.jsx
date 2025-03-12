/* eslint-disable react/prop-types */
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import RoatinfImg from "../../../Components/RoatinfImg";
import CardSlider from "./Sec2CardSlider";

const Section2Hotel = () => {
    const { homePageDescription } = useUpdatePagesHook();

    return (
        <div className="flex flex-col mt-[2rem] sm:mt-[3rem] md:mt-0 md:gap-14 justify-between items-center lg:items-start px-2 sm:px-4 lg:px-8 lg:pr-0 z-0">
            <div data-aos="fade-up" className="relative flex flex-col items-center lg:items-start mb-6 sm:mb-8 lg:mb-0 w-full">
                <RoatinfImg position='md:left-0 top-[-6rem] sm:top-[-7rem] md:top-0 left-[-4rem] sm:left-[-6rem] z-0' />
                <div className="relative content text-black mt-[-1rem] sm:mt-[-1.5rem] lg:mt-10 px-2 sm:px-4">
                    <h1 className="text-mobile/h2 sm:text-[1.8rem] md:text-[2rem] lg:text-desktop/h2 font-bold text-reveal-animation">
                        {homePageDescription?.heading}
                    </h1>
                    <p className="text-mobile/body/2 sm:text-[1rem] lg:text-desktop/body/1 mt-3 sm:mt-4 animation-on-scroll text-justify">
                        {homePageDescription?.description}
                    </p>
                </div>
            </div>

            {/* Card Slider */}
            <div className="w-full content overflow-hidden mt-4 sm:mt-6 md:mt-0">
                <CardSlider />
            </div>
        </div>
    );
};

export default Section2Hotel;
