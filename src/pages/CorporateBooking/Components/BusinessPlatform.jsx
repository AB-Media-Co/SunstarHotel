/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const BusinessPlatform = ({ features }) => {
  return (
    <div className="w-full py-10 px-4 content">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-mobile/h2 md:text-desktop/h3 font-bold md:font-bold text-black text-center md:text-left mb-8 text-reveal-animation">
        The most complete business platform
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features?.map((feature, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="border border-gray-400 rounded-lg p-6 flex flex-col items-center md:items-start md:text-left text-center shadow-sm hover:shadow-lg transition-shadow animation-on-scroll"
            >
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className="text-mobile/h5 md:text-desktop/h5/medium  text-black mb-2"
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                className="text-mobile/body/2 md:text-desktop/body/1 text-gray-600 "
              >
                {feature.description}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessPlatform;
