/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import amenitiesIconsMap, { defaultIcon } from "../Data/amenitiesIconsMap";
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AmenitiesList2 = ({ amenities }) => {
    const [visible, setVisible] = useState(false);
    const itemsToShow = visible ? amenities.length : 10;

    return (
        <section id="amenities" className="py-8 sm:py-12 bg-primary-white content">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <hr className="bg-[#A4A4A4] h-[2px] w-full" />
                <h2 className="text-mobile/h3 sm:text-xl md:text-desktop/h3 font-bold my-4 text-reveal-animation transition-all duration-300">
                    Popular Amenities
                </h2>
                <hr className="bg-[#A4A4A4] h-[2px] w-full mb-6" />

                <div className="grid grid-cols-2 
                              xs:grid-cols-2 
                              sm:grid-cols-3 
                              md:grid-cols-4 
                              lg:grid-cols-5 
                              gap-4 
                              sm:gap-6 
                              md:gap-8 
                              lg:gap-10 
                              xl:gap-12
                              mt-6 sm:mt-8 md:mt-10">
                    <AnimatePresence>
                        {amenities.slice(0, itemsToShow).map((amenity, index) => {
                            const key = amenity.label.toLowerCase();
                            const iconPath = amenitiesIconsMap[key] || defaultIcon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index % 12 * 0.05 }}
                                    className="flex flex-col justify-center items-center group
                                             w-full min-h-[100px] sm:min-h-[120px] md:min-h-[140px]
                                             p-2 sm:p-3 md:p-4
                                             hover:bg-gray-50 rounded-lg transition-all duration-300"
                                >
                                    <div className="transition-all duration-300 group-hover:scale-105">
                                        <img
                                            src={iconPath}
                                            alt={amenity.label}
                                            className="w-12 h-12 
                                                     sm:w-14 sm:h-14 
                                                     md:w-16 md:h-16 
                                                     lg:w-18 lg:h-18 
                                                     xl:w-20 xl:h-20
                                                     object-contain"
                                        />
                                    </div>
                                    <p className="text-xs 
                                                sm:text-sm 
                                                md:text-base 
                                                lg:text-base 
                                                xl:text-lg
                                                font-medium 
                                                mt-2 sm:mt-3 
                                                text-center 
                                                text-gray-800 
                                                group-hover:text-black 
                                                transition-colors duration-300
                                                line-clamp-2
                                                leading-tight">
                                        {amenity.value}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {amenities.length > 10 && (
                    <div className="flex justify-center sm:justify-start mt-8 sm:mt-10">
                        <motion.button
                            onClick={() => setVisible(!visible)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 
                                     px-4 py-2 
                                     sm:px-6 sm:py-3 
                                     md:px-8 md:py-3
                                     rounded-lg 
                                     bg-gray-100 
                                     hover:bg-gray-200 
                                     text-gray-700 
                                     hover:text-black
                                     font-medium sm:font-bold 
                                     transition-all duration-300
                                     text-sm sm:text-base
                                     shadow-sm hover:shadow-md"
                        >
                            {visible ? (
                                <>
                                    <span>See Less</span>
                                    <KeyboardArrowUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </>
                            ) : (
                                <>
                                    <span>See More</span>
                                    <ExpandMoreIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </>
                            )}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};
