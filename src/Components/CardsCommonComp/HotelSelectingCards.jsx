/* eslint-disable react/prop-types */
import { hotels } from "../../Data/AboutSectionData";
import { Star, CheckCircle } from "@mui/icons-material";
import Icon from "../Icons";
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const HotelCard = ({ hotel }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: 'easeInOut' } },
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-md"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
      <div className="p-4  flex flex-col gap-4">
        <div className="flex justify-between flex-col md:flex-row ms:items-start gap-4 items-center">
          <div className="text-start flex flex-col gap-2 items-start">
            <h1 className="text-lg font-bold text-black">{hotel.name}</h1>
            <div className="flex gap-2">
              <Icon name='location_on' />
              <p className="text-gray-600 text-sm">{hotel.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#4DB8B6] text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
              <Star className="text-yellow-500 text-sm mr-1" />
              {hotel.rating} ({hotel.reviews})
            </span>
          </div>
        </div>
        <ul className="text-sm text-gray-500 mt-2 space-y-1 flex flex-col gap-2">
          {hotel.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <CheckCircle className="text-[#058FA2] w-[6px]" />
              <span className="text-start">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-start">
            <span className="text-2xl text-start leading-3 font-bold text-[#058FA2]">{hotel.price} <span className="text-gray-400 text-sm font-medium"> / night onwards</span> <br /> <span className="text-gray-400 text-sm font-medium">Incl.taxes</span> </span>
            <p className="text-[#058FA2] text-[12px] font-semibold">Lowest Price, Guaranteed!</p>
          </div>
          <Link to={`/hotels/${hotel.hotelId}`} className="bg-[#058FA2] text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-[#058FA2]">
            {/* <LocalOffer className="text-white text-sm mr-1" /> */}
            Book Now
          </Link>
        </div>
      </div>
      {/* <p className="text-xs text-gray-500 mt-2 px-4 py-1 flex items-center bg-[#4DB8B629]">
        <Icon name='discount' />
        Discount of {hotel.discount} included with coupon <span className="font-bold ml-1">{hotel.coupon}</span>
      </p> */}
    </motion.div>
  );
};

const HotelSelectingCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.3, ease: 'easeInOut' }}
    >
      {hotels.slice(0, 6).map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </motion.div>
  );
};

export default HotelSelectingCards;