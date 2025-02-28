/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import CommonSwiper from "./CommonSlider";

const TestimonialSection = ({ backgroundImage,Testimonials }) => {
    const renderItem = (item) => {
        // console.log("Rendering item:", item);
        return (
            <motion.div
                id="reviews"
                className="bg-primary-white rounded-[32px] p-6 shadow-xl md:text-left flex flex-col h-full hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h3 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800 mb-4">
                    {item.heading}
                </h3>
                <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-600 flex-grow">
                    {item.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        {/*  <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-full mr-3 object-cover"
                    /> */}
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

    return (
        <div
            className="w-full py-16"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <div className="content flex flex-col gap-6 relative overflow-hidden container mx-auto">
                <h2 className="text-mobile/h4 md:text-desktop/h2 md:text-[40px] text-gray-900 mb-8 text-center">
                    {Testimonials?.clientHeading ? Testimonials?.clientHeading :"Testimonials"}
                </h2>

                <CommonSwiper
                    items={Testimonials?.clients? Testimonials?.clients : Testimonials}
                    renderItem={renderItem}
                    spaceBetween={30}
                    loop={false}
                    className="relative z-10 testiM mySwiper"
                    slidesPerViewDesktop={3}
                    arrow="pt-6"
                />
            </div>
        </div>
    );
};

export default TestimonialSection;
