import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative h-[111vh] md:h-[620px]">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-cover bg-right bg-[url('/images/Dev&Owwners/dev&o.png')] md:bg-[url('/images/ContctUsImg/ContactUsBanner.png')]"
      />


      {/* Content */}
      <div className="relative content z-10 pt-[7rem] md:pt-44 h-full flex flex-col px-6 pb-8 md:px-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary-white text-mobile/h3 md:text-desktop/h3 max-w-[700px]  font-bold drop-shadow-xl md:mb-4"
        >
          Turn Your Property into a Profitable Hotel with Hotel Sunstar Group <br /> <span className="text-[#FDD304]">Guaranteed Returns | Zero Headaches | Complete Transparency</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-primary-white max-w-[600px] pt-6 text-mobile/body/2 md:text-desktop/body/1 drop-shadow-xl"
        >
          Whether you own an existing hotel or a property ready for transformation, Hotel Sunstar Group brings 44 years of expertise in hotel operations, marketing, and revenue management to help you maximize your returns. We manage, market, and optimize your hotel while you enjoy hassle-free earnings.
        </motion.p>
      </div>
    </div>
  );
};

export default Banner;
