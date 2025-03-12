/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import CommonSwiper from "./CommonSlider";

const TestimonialSection = ({ backgroundImage, Testimonials }) => {
  const renderItem = (item) => {
    return (
      <motion.div
        id="reviews"
        className="bg-primary-white rounded-[32px] border p-6 md:p-[22px] shadow-lg md:text-left flex flex-col  hover:shadow-xl transition-shadow duration-300 h-[250px]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Content Container */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800 mb-4">
            {item?.heading || item?.name}
          </h3>
          <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-600 flex-grow">
            {item.description}
          </p>
        </div>
        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div className="text-left">
              <p className="text-mobile/body/2 md:text-desktop/body/2 font-semibold text-gray-800">
                {item.name}
              </p>
              <p className="text-mobile/caption md:text-desktop/caption text-gray-500">
                {item.location}
              </p>
            </div>
          </div>
         
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className="w-full py-10"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="content flex flex-col relative overflow-hidden container mx-auto">
        <h2 className="text-mobile/h4 md:text-desktop/h3  text-gray-900  text-start">
          {Testimonials?.clientHeading ? Testimonials?.clientHeading : "Testimonials"}
        </h2>

        <CommonSwiper
          items={Testimonials?.clients ? Testimonials?.clients : Testimonials}
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
