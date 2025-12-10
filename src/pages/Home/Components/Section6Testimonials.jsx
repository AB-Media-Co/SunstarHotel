/* eslint-disable react/prop-types */
import RoatinfImg from "../../../Components/RoatinfImg";
import CommonSwiper from "../../../Components/CommonSlider";

const truncateWords = (text = "", limit = 50) => {
  const normalized = (text || "").trim();
  if (!normalized) return "";
  const words = normalized.split(/\s+/);
  return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : normalized;
};

const Section6Testimonials = ({testimonials}) => {
  const renderTestimonial = (testimonial) => (
    <div className="h-full">
      <div className="bg-white shadow-lg rounded-2xl px-6 py-5 h-full flex flex-col gap-4 border border-gray-100">
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image}
            alt="Testimonial"
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
            <p className="text-gray-500 text-sm">{testimonial.designation}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          {truncateWords(testimonial.text, 50)}
        </p>
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
        spaceBetween={20}
        slidesPerViewDesktop={3}
        slidesPerViewTablet={2}
        loop={true}
        arrow="mt-8"
        autoplayDelay={4000}
      />
    </div>
  );
};

export default Section6Testimonials;
