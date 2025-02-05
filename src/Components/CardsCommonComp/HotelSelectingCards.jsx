/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Icon from "../Icons";

const HotelSelctingCards = ({
    link,
    hotel,
    btnClass = 'bg-white hover:bg-yellow-400 m-2 hover:shadow-2xl hover:rounded-lg rounded-lg transition ease-in-out duration-300 mt-0'
}) => {
    const navigate = useNavigate();

    const OnbuttonClick = () => {
        navigate(link);
    };

    return (
        <motion.div
            className="border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="relative w-full h-64">
                <motion.img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="px-4 py-2">
                    <h3 className="text-lg font-bold text-gray-900">{hotel.name}</h3>
                    <div className="flex justify-center text-sm text-gray-600">
                        <span className="text-yellow-500 mr-1">★</span>
                        {hotel.rating} • {hotel.reviews}
                    </div>
                </div>
                <motion.div
                    onClick={OnbuttonClick}
                    className={`${btnClass} text-[#058FA2] flex gap-2 py-4 justify-center items-center cursor-pointer`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-[#058FA2] rounded-full p-[8px]">
                        <Icon name="upArrow" className="w-2 h-2" />
                    </div>
                    <span className="font-bold text-xl">Book Now</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HotelSelctingCards;
