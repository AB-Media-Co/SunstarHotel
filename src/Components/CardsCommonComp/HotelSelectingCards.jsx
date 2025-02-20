/* eslint-disable react/prop-types */
import { Star } from "@mui/icons-material";
import Icon from "../Icons";
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useGetHotels } from "../../ApiHooks/useHotelHook2";

const HotelCard = ({ hotel }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: 'easeInOut' } },
    };

    const visibleAmenities = hotel?.amenities?.slice(0, 4) || [];
    const remainingAmenitiesCount = (hotel?.amenities?.length || 0) - visibleAmenities.length;

    return (
        <motion.div
            className="bg-primary-white rounded-2xl shadow-lg overflow-hidden w-full max-w-md transition-transform duration-300 hover:scale-105 flex flex-col" // Added flex-col
            variants={cardVariants}
            initial="hidden"
            animate="visible"
        >
            <img src={hotel?.images[0]} alt={hotel.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col gap-4 flex-grow"> {/* Added flex-grow */}
                <div className="flex justify-between flex-col md:flex-row items-start gap-4">
                    <div className="text-start flex flex-col gap-2 items-start">
                        <h1 className="text-xl font-bold text-black">{hotel?.name}</h1>
                        <div className="flex gap-2 items-center">
                            <Icon name='location_on' />
                            <p className="text-gray-600 text-sm">{hotel?.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="bg-primary-green text-primary-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                            <Star className="text-primary-yellow text-sm mr-1" />
                            {hotel.rating}
                        </span>
                    </div>
                </div>

                <div className="mt-2">
                    <ul className="flex flex-wrap mt-2">
                        {visibleAmenities.length > 0 ? (
                            visibleAmenities.map((amenity, index) => (
                                <li
                                    key={index}
                                    className="bg-gradient-to-r from-primary-green to-primary-green text-primary-white text-xs px-3 py-1 rounded-full m-1"
                                >
                                    {amenity}
                                </li>
                            ))
                        ) : (
                            <li>No amenities listed</li>
                        )}
                        {remainingAmenitiesCount > 0 && (
                            <li className="text-gray-600 text-xs">+{remainingAmenitiesCount} more</li>
                        )}
                    </ul>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="text-start">
                        <span className="text-2xl leading-none font-bold text-primary-green">₹ {hotel?.price}
                            <span className="text-gray-400 text-sm font-medium"> / night onwards</span>
                            <br />
                            <span className="text-gray-400 text-sm font-medium">Incl. taxes</span>
                        </span>
                        <p className="text-primary-green text-[12px] font-semibold">Lowest Price, Guaranteed!</p>
                    </div>
                    <Link to={`/hotels/${hotel.hotelCode}`} className="bg-primary-green text-primary-white px-4 py-2 rounded-lg shadow-md flex items-center transition duration-300 hover:bg-primary-dark-green">
                        Book Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const HotelSelectingCards = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const { data: hotels } = useGetHotels();

    return (
        <motion.div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
        >
            {hotels?.hotels?.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
            ))}
        </motion.div>
    );
};

export default HotelSelectingCards;
