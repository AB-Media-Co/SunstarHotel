import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import Icon from "../../../Components/Icons";
import { motion } from "framer-motion";

const Banner = () => {
  const { ContactUsDetail } = useUpdatePagesHook();

  return (
    <div className="relative h-[420px] md:h-[400px]">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/ContctUsImg/ContactUsBanner.png')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 content h-full flex flex-col justify-end px-6 pb-6 md:px-0 ">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary-white text-mobile/h3 md:text-desktop/h3 font-bold drop-shadow-xl mb-4"
        >
          Get in Touch with Us  ?
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-6 mt-2"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <Icon
              name="rotatePhone"
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"
            />
            <a
              href={`tel:${ContactUsDetail?.phoneNumber}`}
              className="text-primary-white text-base md:text-lg font-medium hover:underline"
            >
              {ContactUsDetail?.phoneNumber}
            </a>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <Icon
              name="email"
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"
            />
            <a
              href={ContactUsDetail?.emailId}
              className="text-primary-white text-base md:text-lg font-medium hover:underline"
            >
              {ContactUsDetail?.emailId}
            </a>
          </motion.div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-primary-white text-mobile/body/2 md:text-desktop/body/1 mt-6 drop-shadow"
        >
          For further support, reach out via email, and we'll get back to you promptly.
          <a href={ContactUsDetail?.emailId} className="underline font-semibold ml-1">
            {ContactUsDetail?.emailId}
          </a>
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-primary-white text-[#6EC4C3] font-semibold rounded-full shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <span>Contact Us</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
