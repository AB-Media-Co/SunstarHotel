/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import amenitiesIconsMap, { defaultIcon } from "../Data/amenitiesIconsMap";
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AmenitiesList2 = ({ amenities }) => {
    const [visible, setVisible] = useState(false);
    const itemsToShow = visible ? amenities.length : 12;

    return (
        <section id="amenities" className="py-12 bg-primary-white content">
            <div className="container mx-auto ">
                <hr className="bg-[#A4A4A4] h-[2px] w-full" />
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold my-4 text-reveal-animation transition-all duration-300">
                    Amenities
                </h2>
                <hr className="bg-[#A4A4A4] h-[2px] w-full mb-6" />

                <div className="flex justify-start">
                    <span className="bg-primary-green text-primary-white text-lg font-bold 
                           px-6 py-2 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                        Popular Amenities
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:gap-x-[12rem] gap-y-10  mt-10">
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
                                    className="flex flex-col justify-center w-full
                                    max-w-[300px] items-center group"
                                >
                                    <div className="transition-all duration-300">
                                        <img
                                            src={iconPath}
                                            alt={amenity.label}
                                            className="w-16 h-16 object-contain"
                                        />
                                    </div>
                                    <p className="md:text-base text-sm font-medium mt-3 text-center text-gray-800 group-hover:text-black">
                                        {amenity.value}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
                {amenities.length > 12 && (
                    <div className="flex justify-start mt-10">
                        <motion.button
                            onClick={() => setVisible(!visible)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gray-100 
                                 text-gray-700 font-bold transition-colors duration-300"
                        >
                            {visible ? (
                                <>
                                    <span>See Less</span>
                                    <KeyboardArrowUpIcon />
                                </>
                            ) : (
                                <>
                                    <span>See More</span>
                                    <ExpandMoreIcon />
                                </>
                            )}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};