import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import Icon from "../../../Components/Icons";

const Banner = () => {
  const { ContactUsDetail } = useUpdatePagesHook();

  return (
    <div className="relative h-[370px] md:h-[400px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/ContctUsImg/ContactUsBanner.jpg')",
        }}
       
      />

      {/* Content */}
      <div className="relative z-10 content h-full flex flex-col justify-end px-6 pb-6 md:px-12 ">
        <h1 className="text-primary-white text-3xl md:text-5xl font-bold drop-shadow-xl mb-4"
         data-aos="fade-up">
          Need to get in touch?
        </h1>
        <div className="flex flex-wrap gap-6 mt-2"
         data-aos="fade-up">
          <div className="flex items-center gap-3">
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
          </div>
          <div className="flex items-center gap-3"  data-aos="fade-up">
            <Icon
              name="email"
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"
            />
            <a
              href= {ContactUsDetail?.emailId}
              className="text-primary-white text-base md:text-lg font-medium hover:underline"
            >
             {ContactUsDetail?.emailId}
            </a>
          </div>
        </div>
        <p className="text-primary-white text-sm md:text-base mt-6 drop-shadow"  data-aos="fade-up">
          For assistance with bookings, cancellations, etc. mail us on
          <a
            href= {ContactUsDetail?.emailId}
            className="underline font-semibold ml-1"
          >
             {ContactUsDetail?.emailId}
          </a>
        </p>
        {/* Call to Action Button */}
        <div className="mt-6"  data-aos="fade-up">
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-primary-white text-[#6EC4C3] font-semibold rounded-full shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
