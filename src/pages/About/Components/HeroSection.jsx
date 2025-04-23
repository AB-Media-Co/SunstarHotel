/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const HeroSection = ({ title, highlightText, description, imageSrc }) => {
    const words = title.split(" ");
    return (
        <div className="w-full bg-[#6EC4C2] py-20 px-0 md:px-12 lg:px-20 relative overflow-hidden">
            <div className="content mx-auto flex flex-col md:pt-20 lg:flex-row items-center mt-6 md:mt-0 justify-between  md:gap-12">
                {/* Left Text Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="lg:w-1/2 text-left lg:text-left"
                >
                    <h1 className="text-mobile/h2 md:text-desktop/h2 font-bold md:text-[47px]  text-primary-white  mb-6">
                        {words.map((word, index) => {
                            const shouldHighlight = highlightText?.includes(word);
                            return (
                                <motion.span
                                    key={index}
                                    className={`${
                                        shouldHighlight
                                            ? "text-[#FDC114] text-reveal-animation"
                                            : "text-primary-white text-reveal-animation"
                                    }`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                >
                                    {index > 0 && " "}
                                    {word}
                                </motion.span>
                            );
                        })}
                    </h1>
                    <p className="text-mobile/body/2 text-start md:text-desktop/body/large text-primary-white mb-6 whitespace-pre-line animation-on-scroll-Section1 leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                {/* Right Image Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="lg:w-1/2 flex justify-center lg:justify-end relative"
                >
                    {/* Background Shape */}
                    <motion.div 
                        initial={{ scale: 0, rotate: 90 }} 
                        animate={{ scale: 1, rotate: 0 }} 
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute -bottom-8 right-0 md:-right-8 bg-yellow-400 rounded-full h-32 w-32 md:h-48 md:w-48"
                    />
                    
                    {/* Dynamic Image with Styling */}
                    <motion.img
                        src={imageSrc}
                        alt="Travel representation"
                        className="relative rounded-lg  max-w-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
