/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import useTextRevealAnimation from "../hooks/useTextRevealAnimation";
import CommonSwiper from "./CommonSlider";

const TestimonialSection = ({ title, testimonials, backgroundImage }) => {
    const renderItem = (item) => {
        return (
            <motion.div
                id="reviews"
                className="bg-white pb-10 rounded-[32px] p-6 shadow-lg md:text-left flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }} // Ensures animation happens only once
            >
                <h3 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800 mb-4">
                    {item.title}
                </h3>
                <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-600 flex-grow">
                    {item.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 rounded-full mr-3 object-cover"
                        />
                        <div className="text-left">
                            <p className="text-mobile/body/2 md:text-desktop/body/2 font-semibold text-gray-800">
                                {item.name}
                            </p>
                            <p className="text-mobile/caption md:text-desktop/caption text-gray-500">
                                {item.location}
                            </p>
                        </div>
                    </div>
                    <div className="flex mt-6">
                        {Array.from({ length: item.rating }).map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#FDC114"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#FDC114"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.75.75 0 011.04 0l2.208 2.244 3.094.428a.75.75 0 01.416 1.306l-2.208 2.244.56 3.314a.75.75 0 01-1.078.79l-2.808-1.53-2.808 1.53a.75.75 0 01-1.078-.79l.56-3.314-2.208-2.244a.75.75 0 01.416-1.306l3.094-.428L11.48 3.5z"
                                />
                            </svg>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    };

    useTextRevealAnimation();

    return (
        <div
            className="w-full bg-[#BAE9EF] flex flex-col gap-6 py-12 px-4 md:px-0 md:ps-8 lg:ps-[140px] relative overflow-hidden"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            {/* Section Heading */}
            <h2 className="text-mobile/h4 md:text-desktop/h2 md:text-[40px] text-gray-900 mb-8 text-reveal-animation">
                {title}
            </h2>

            {/* Slider */}
            <CommonSwiper
                items={testimonials}
                renderItem={renderItem}
                spaceBetween={30}
                loop={false}
                className="relative z-10 testiM mySwiper"
                slidesPerViewDesktop={3.5}
                arrow="pt-6"
            />
        </div>
    );
};

export default TestimonialSection;
