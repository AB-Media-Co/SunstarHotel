/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {

  ArrowForward as ArrowForwardIcon,

} from '@mui/icons-material';
import TestimonialSection from "../../Components/TestimonialSection";
import CommonUseEnquiryForm from "../../Components/CommonUseEnquiryForm";
import { useEnquiryForm } from "../../ApiHooks/useEnquiryFormHook";

const HeroSection = ({ title, description, imageSrc, buttonText, buttonLink }) => (
  <section className="relative h-[100vh] md:h-[100vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}>
    <div className="absolute inset-0 bg-black opacity-50" />
    <div className="relative content mx-auto h-full flex flex-col justify-center pt-20 items-start px-4">
      <h1 className="text-mobile/h3 md:text-desktop/h2 text-primary-white max-w-2xl font-bold">{title}</h1>
      <p className="mt-4 text-mobile/body/2 md:text-desktop/body/2/regular text-primary-white max-w-2xl">{description}</p>

      <a href={buttonLink} className="mt-8  bg-primary-white text-primary-yellow px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300 flex items-center">
        {buttonText} <ArrowForwardIcon className="ml-2" />
      </a>
    </div>
  </section>
);

const BenefitsSection = ({ benefits = [], align = "left" }) => {
  const isCenter = align === "center";
  const textAlign = isCenter ? "text-center" : "text-left";
  const itemAlign = isCenter ? "items-center" : "items-start";

  return (
    <section className="py-16">
      <div className="content max-w-screen-xl mx-auto px-4">
        <h2 className="text-mobile/h3 md:text-desktop/h3 text-gray-700 font-bold mb-12 text-start">
          Why Partner With Us?
        </h2>

        {/* auto-rows-fr + h-full on cards => equal heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {benefits.map((item, index) => (
            <article
              key={index}
              className={`h-[93%] bg-white p-6 rounded-xl text-gray-700 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col ${itemAlign} ${textAlign}`}

            >
              {/* fixed-size icon box keeps all icons aligned */}
              <div className={`${isCenter ? "mx-auto" : ""} mb-4  flex items-center justify-center`}>
                {item?.icon ? (
                  <img
                    src={item.icon}
                    alt={item.title ? `${item.title} icon` : "Benefit icon"}
                    className="block  w-[4rem] object-contain"
                    loading="lazy"
                  />
                ) : null}
              </div>

              <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
              <p className="text-mobile/body/2  pb-4 md:text-desktop/body/1 text-primary-gray leading-relaxed">
                {item.desc}
              </p>
              {/* nothing below; flex + auto-rows-fr keeps heights consistent */}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = ({ steps }) => (
  <section className="py-16 bg-gray-50 ">
    <div className="content mx-auto">
      <h2 className="text-mobile/h3 md:text-desktop/h3 text-gray-700 text-start font-bold mb-12">
        How It Works
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {steps.map((item, index) => (
          <div key={index} className="flex flex-col items-start text-start w-full md:w-1/5">
            <div className="bg-primary-green text-white rounded-full w-24 h-24 flex items-center justify-center mb-4">

              <img src={item.icon} alt="" className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">{item.title}</h3>
            <p className="text-mobile/body/2 md:text-desktop/body/1 text-primary-gray">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);



const AgentRegistrationForm = ({ page = 'Agent Registration', gid = [0] }) => {
  const { mutate, isLoading } = useEnquiryForm();

  const formFields = [
    {
      name: "agentName",
      placeholder: "Agent Name (Full Name)",
      required: true,
    },
    {
      name: "companyName",
      placeholder: "Company Name",
      required: true,
    },
    {
      name: "phone",
      type: "tel",
      placeholder: "Phone Number",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email ID",
      required: true,
    },
    {
      name: "cityState",
      placeholder: "City / State",
      required: true,
    },
    {
      name: "gstDetails",
      placeholder: "Company GST Details",
      required: true,
    },
    {
      name: "requirements",
      type: "textarea",
      placeholder: "Your Requirements / Query",
      rows: 4,
      colSpan: "md:col-span-2",
      required: true,
    },
  ];

  const handleSubmit = (formData, callbacks) => {
    mutate(
      { ...formData, page, gid },
      {
        onSuccess: () => {
          callbacks.onSuccess();
          alert("Thank you for registering! Our team will contact you shortly.");
        },
        onError: callbacks.onError,
      }
    );
  };

  return (
    <CommonUseEnquiryForm
      title="Agent Registration Form"
      subtitle="Register now to join our travel agent network"
      fields={formFields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Submit & Join Now"
    />
  );
};




const TravelAgent = () => {
  const heroContent = {
    title: "Earn More & Book Hassle-Free",
    description: "Join our travel agent network & enjoy high commissions, easy bookings, and exclusive perks.",
    imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Sign Up for Free",
    buttonLink: "#form"
  };

  const benefits = [
    { icon: '/images/t1.svg', title: 'Earn Commission', desc: 'Attractive commission structure to maximize your earnings on every booking.' },
    { icon: '/images/t2.svg', title: 'Exclusive Discounts', desc: 'Offer your clients up to 5% off on standard online room rates.' },
    { icon: '/images/t3.svg', title: 'Free Rooms', desc: 'Get 1 complimentary room for every 15 rooms booked (valid for group bookings only).' },
    { icon: '/images/t4.svg', title: 'Exclusive Gifts', desc: 'Enjoy surprise rewards and special gifts after every 25 nights booked through your account.' },
    { icon: '/images/t5.svg', title: 'Dedicated Support', desc: 'Quick resolutions and smooth coordination through our single-window partner support system.' },
    { icon: '/images/t6.svg', title: 'Marketing Materials', desc: 'Access to ready-to-use banners, booking kits, brochures, and other promotional content.' },
    {
      icon: '/images/t7.svg',
      title: 'Award-Winning Hospitality',
      desc: 'Recognized for excellence in service, cleanliness, dining, and guest satisfaction.'
    }
  ];

  const steps = [
    { icon: '/images/1a.svg', title: 'Register', desc: 'Sign up as a travel agent with us — quick, simple, and absolutely free.' },
    { icon: '/images/2a.svg', title: 'Submit for Approval', desc: 'Once registered, submit your details for verification. Our team will review and approve your application promptly.' },
    { icon: '/images/3a.svg', title: 'Get Portal Access', desc: 'After approval, unlock your personal agent dashboard to manage bookings and track commissions with ease.' },
    { icon: '/images/4a.svg', title: 'Book & Earn', desc: 'Start booking rooms with instant confirmation and earn attractive commissions on every successful booking.' },
    { icon: '/images/5a.svg', title: 'Unlock Exclusive Gifts', desc: 'Get surprise rewards like free meals, room upgrades, or special discounts — gifted after every 25 nights booked!' }
  ];




  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection {...heroContent} />
      <BenefitsSection benefits={benefits} />
      <HowItWorksSection steps={steps} />
      <AgentRegistrationForm />
      {/* <TestimonialsSection testimonials={testimonials} /> */}
      <TestimonialSection page="travel-agent" head="What Our Partners Say" />
    </div>
  );
};

export default TravelAgent;