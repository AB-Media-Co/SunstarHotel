/* eslint-disable react/prop-types */
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import RoatinfImg from "../../../Components/RoatinfImg";
import CardSlider from "./Sec2CardSlider";

const Section2Hotel = () => {
    const { homePageDescription } = useUpdatePagesHook();
    console.log(homePageDescription)

    return (
        <div className="flex flex-col mt-[4rem] md:mt-0 md:gap-14 justify-between items-center lg:items-start px-4 lg:px-8 lg:pr-0 z-0">
            {/* Image and Text Container */}
            <div data-aos="fade-up" className="relative flex flex-col items-center lg:items-start mb-8 lg:mb-0 w-full">
                <RoatinfImg position='md:left-0 top-[-8rem] md:top-0 left-[-6rem] z-0' />
                {/* Text Container */}
                <div className="relative content text-black mt-[-2rem] lg:mt-10">
                    <h1 className="text-mobile/h2 lg:text-desktop/h2 font-bold text-reveal-animation">
                        {homePageDescription?.heading}
                    </h1>
                    <p className="text-mobile/body/2 lg:text-desktop/body/large mt-4 animation-on-scroll">
                        {homePageDescription?.description}
                    </p>
                </div>
            </div>

            {/* Card Slider */}
            <div className="w-full content  overflow-hidden">
                <CardSlider />
            </div>
        </div>
    );
};

export default Section2Hotel;
