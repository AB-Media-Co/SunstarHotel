import Icon from "../../../Components/Icons";

const Banner = () => {
  return (
    <div className="relative h-[370px] md:h-[400px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/ContctUsImg/ContactUsBanner.jpg')",
        }}
      />

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 content h-full flex flex-col justify-end px-6 pb-6 md:px-12 md:pb-16">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-xl mb-4">
          Need to get in touch?
        </h1>
        <div className="flex flex-wrap gap-6 mt-2">
          <div className="flex items-center gap-3">
            <Icon
              name="rotatePhone"
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"
            />
            <span className="text-white text-base md:text-lg font-medium">
              +915845965840
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Icon
              name="email"
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"
            />
            <span className="text-white text-base md:text-lg font-medium">
              help@sunstar.com
            </span>
          </div>
        </div>
        <p className="text-white text-sm md:text-base mt-6 drop-shadow">
          For assistance with bookings, cancellations, etc. mail us on{" "}
          <span className="underline font-semibold">book@sunstar.com</span>
        </p>
        {/* Call to Action Button */}
        <div className="mt-6">
          <a
            href="#contact" // Adjust the href as needed for your site
            className="inline-flex items-center px-6 py-3 bg-white text-[#6EC4C3] font-semibold rounded-full shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
