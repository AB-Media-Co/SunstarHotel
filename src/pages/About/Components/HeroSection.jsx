/* eslint-disable react/prop-types */

import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

const HeroSection = ({ title, highlightText, description, imageSrc }) => {
    const words = title.split(" ");
    useTextRevealAnimation();
    useScrollAnimations("#section1");


    

    return (
        <div className="w-full bg-[#6EC4C2] py-10 px-4 md:px-8 pt-32 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Left Text Section */}
                    <div className="md:w-[750px] mb-8 md:mb-0">
                        <h1 className="text-mobile/h2 md:text-desktop/h2 font-bold mb-4 text-shadow-lg ">
                            {words.map((word, index) => {
                                const shouldHighlight = highlightText?.includes(word);
                                return (
                                    <span
                                        key={index}
                                        className={`${
                                            shouldHighlight
                                                ? "text-[#FDC114] text-reveal-animation"
                                                : "text-white text-reveal-animation"
                                        }`}
                                    >
                                        {index > 0 && " "}
                                        {word}
                                    </span>
                                );
                            })}
                        </h1>
                        <p className="text-mobile/body/2 md:text-desktop/body/large text-white mb-6 whitespace-pre-line animation-on-scroll-Section1">
                            {description}
                        </p>
                    </div>
                    {/* Right Image Section */}
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <div className="relative animation-on-scroll inline-block">
                            {/* Background Shape */}
                            <div className="absolute -bottom-8 right-0 md:-right-8 bg-yellow-400 rounded-full h-32 w-32 md:h-48 md:w-48" />
                            {/* Dynamic Image */}
                            <img
                                src={imageSrc}
                                alt="Travel representation"
                                className=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
