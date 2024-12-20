/* eslint-disable react/prop-types */
import RoatinfImg from "../../../Components/RoatinfImg";
import CommonSwiper from "../../../Components/commonSlider";

const Section6Testimonials = ({testimonials}) => {
   

  const renderTestimonial = (testimonial) => (
    <div className="py-6 w-full md:w-80   text-center flex flex-col justify-center items-center md:justify-start md:items-start md:text-left">
      <img
        src={testimonial.image}
        alt="Testimonial"
        className="w-[127px] h-[127px] rounded-full z-10 relative"
      />
      <div className="bg-gray-100 shadow-lg rounded-lg px-6 pt-14 pb-4 w-80 md:text-left relative top-[-3rem] z-0">
        <p className="text-gray-600 mb-4">{testimonial.text}</p>
        <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
        <p className="text-gray-500 text-sm">{testimonial.designation}</p>
      </div>
    </div>
  );

  return (
    <div className="py-10 bg-gray-50  lg:ps-[165px]">
      <div>
        <RoatinfImg position="right-[90px] top-[-8rem]" />
      </div>
      <h2 className="text-4xl font-bold mb-8">Testimonials</h2>
      <CommonSwiper
        items={testimonials}
        renderItem={renderTestimonial}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
      />
    </div>
  );
};

export default Section6Testimonials;
