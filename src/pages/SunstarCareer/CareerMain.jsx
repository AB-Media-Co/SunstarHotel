/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useUpdatePagesHook from "../../ApiHooks/useUpdatePagesHook";
import CommonSwiper from "../../Components/CommonSlider";
import ImageGallery from "../../Components/ImageGallery";

// Reusable HeroSection component accepting content as props
const HeroSection = ({ title, description, imageSrc, buttonText, buttonLink }) => (
  <section
    className="relative h-[80vh] bg-cover bg-center"
    style={{ backgroundImage: `url(${imageSrc})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <div className="relative content container mx-auto h-full flex flex-col justify-center pt-20 items-start px-4">
      <h1 className="text-mobile/h3 md:text-desktop/h2  text-primary-white max-w-2xl font-bold">{title}</h1>
      <p className="mt-4 text-mobile/body/2 md:text-desktop/body/1 text-primary-white max-w-2xl">{description}</p>
      <a href={buttonLink} className="mt-8 inline-block bg-primary-yellow text-primary-white px-6 py-3 rounded-lg font-medium text-mobile/body/2 md:text-desktop/body/1">
        {buttonText}
      </a>
    </div>
  </section>
);

const ValuesSection = ({ title, values }) => (
  <section className="py-16 bg-primary-white text-start content">
    <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold mb-12">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
      {values.map((value, index) => (
        <div key={index}>
          <h3 className="text-mobile/h5/medium md:text-desktop/h5/medium mb-2">{value.heading}</h3>
          <p className="text-primary-gray text-mobile/body/2 md:text-desktop/body/1">{value.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const WhyWorkWithUs = ({ title, description, points }) => (
  <section className="py-16 content">
    <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold mb-6 ">{title}</h2>
    <p className="text-mobile/body/2 md:text-desktop/body/1 mb-8 max-w-3xl">{description}</p>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6  text-mobile/body/2 md:text-desktop/body/1 list-disc pl-6">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </section>
);



const renderTestimonial = (testimonial) => (
  <div className="py-6 text-center flex flex-col justify-center items-center md:justify-start md:items-start md:text-left">
    <div className="bg-gray-100 shadow-lg rounded-lg px-6 pt-14 pb-4 max-w-full h-[250px] md:text-left relative top-[-3rem] z-0">
      <p className="text-gray-600 mb-4">{testimonial.description}</p>
      <h3 className="text-gray-800">{testimonial.heading}</h3>
      <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
      <p className="text-gray-500 text-sm">{testimonial.location}</p>
    </div>
  </div>
);

const heroContent = {
  title: "Come Shine with Us ",
  description: `We believe in hiring locally in tourist destinations and looking beyond conventional
   industry backgrounds. At Sunstar, we want to build a team of entrepreneurial-minded individuals who can adapt and innovate.
    This mindset is critical for scaling our brand successfully. If you believe you have what it takes, apply with us.`,
  imageSrc: "/images/career/hotel-lobby.webp",
  buttonText: "Apply Now",
  buttonLink: "/career-form",
};

const valuesContent = {
  title: "Do you have what it takes to thrive at Sunstar?",
  values: [
    { heading: "Integrity & Warmth", description: "We lead with sincerity and genuine care, ensuring every guest feels valued." },
    { heading: "Hospitality First", description: "Exceptional service isn’t an act—it’s our daily culture at Sunstar." },
    { heading: "Team Excellence", description: "Great service is built by great teams. We win together, every day." },
    { heading: "Agility & Focus", description: "In a fast-paced world, we adapt quickly and aim high—without compromise." },
    { heading: "Professional Growth", description: "We nurture talent, set clear goals, and celebrate success together." },
    { heading: "Smart Hospitality", description: "Technology enhances our service, but our people make the difference." }
  ]
};

// const joinUsContent = {
//   title: "Come Shine with Us (Careers @ Sunstar)",
//   description: "We believe in hiring locally in tourist destinations and looking beyond conventional
//    industry backgrounds. At Sunstar, we want to build a team of entrepreneurial-minded individuals who can adapt and innovate.
//     This mindset is critical for scaling our brand successfully. If you believe you have what it takes, apply with us."
// };

const whyWorkWithUsContent = {
  title: "Why Work With Us?",
  description: "At Hotel Sunstar Group, we believe that our team is the heart of our hospitality. We offer a work environment that encourages personal and professional growth. Discover a workplace where innovation is encouraged and your potential is celebrated.",
  points: [
    "Growth opportunities within the hospitality industry",
    "Comprehensive training & skill development programs",
    "Recognition and reward systems for outstanding performance",
    "Healthy, respectful and team-oriented work environment",
    "Best-in-class culture with engaging hospitality activities"
  ]
};

const CareerMain = () => {
  const { Testimonials } = useUpdatePagesHook();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeroSection {...heroContent} />
      {/* <JoinUsIntro {...joinUsContent} /> */}
      <WhyWorkWithUs {...whyWorkWithUsContent} />
      <ValuesSection {...valuesContent} />
      <div className="content">
        <ImageGallery />
      </div>

      <div className="py-10 bg-gray-50">
        <div className="content">
          <h2 className="text-4xl font-bold mb-2">Testimonials</h2>
          <p className="text-mobile/body/2 md:text-desktop/body/large mb-8">
            We’re one big family of doers, dreamers, thinkers & (a few) chatterboxes.
          </p>
          <CommonSwiper
            items={Testimonials?.clients}
            renderItem={renderTestimonial}
            spaceBetween={20}
            slidesPerViewDesktop={2}
            slidesPerViewTablet={1}
            loop={true}
            arrow="mt-8"
            autoplayDelay={4000}
          />
        </div>

      </div>


    </>
  );
};

export default CareerMain;
