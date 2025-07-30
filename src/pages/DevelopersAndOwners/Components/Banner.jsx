import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative h-[116vh] md:h-[620px] lg:h-[550px]">
      {/* Background Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-cover bg-center bg-primary-green md:bg-primary-green"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center content h-full">
        {/* Text Content */}
        <div className="pt-[7rem]  flex flex-col pb-8 md:px-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary-white text-mobile/h3 lg:text-desktop/h3 capitalize max-w-[700px] font-bold drop-shadow-xl md:mb-4"
          >
            Turn Your Property into a Profitable Hotel with Hotel Sunstar Group <br />
            <span className="text-[#FDD304]">Guaranteed Returns | Zero Headaches | Complete Transparency</span>
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

        {/* Illustration */}
        <div className="flex justify-center items-end mt-8  md:mt-28">
          <img
            src="/images/Dev&Owwners/illus.svg"
            alt=""
            className=" h-auto w-80 md:w-full m"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
