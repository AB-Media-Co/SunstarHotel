/* eslint-disable react/prop-types */

const HeroSection = ({ title, highlightText, description, imageSrc }) => {
    const words = title.split(" ");

    return (
        <div className="w-full bg-[#6EC4C2] section py-10 px-4 md:px-8 pt-32 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Left Text Section */}
                    <div className="md:w-[750px] mb-8 md:mb-0 ">
                        <h1 className="text-3xl leading-[55px] md:text-[48px] font-bold text-white mb-4 text-shadow-lg">
                            {words.map((word, index) => {
                                // console.log(word)

                                const shouldHighlight = highlightText?.includes(word);
                                // console.log(shouldHighlight)
                                return (
                                    <span key={index} className={shouldHighlight ? "text-[#FDC114]" : ""}>
                                        {index > 0 && " "}{word}
                                    </span>
                                );
                            })}
                        </h1>
                        <p className="text-white text-[22px] mb-6 text- whitespace-pre-line">{description}</p>
                    </div>
                    {/* Right Image Section */}
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <div className="relative inline-block">
                            {/* Background Shape */}
                            <div className="absolute -bottom-8 -right-8 bg-yellow-400 rounded-full h-32 w-32 md:h-48 md:w-48" />
                            {/* Dynamic image */}
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
