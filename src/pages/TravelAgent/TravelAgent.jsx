/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import {
  AttachMoney as AttachMoneyIcon,
  Discount as DiscountIcon,
  Hotel as HotelIcon,
  HeadsetMic as HeadsetMicIcon,
  CardMembership as CardMembershipIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Restaurant as RestaurantIcon,
  Upgrade as UpgradeIcon,
  ArrowForward as ArrowForwardIcon,
  Security as SecurityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const HeroSection = ({ title, description, imageSrc, buttonText, buttonLink }) => (
  <section className="relative h-[100vh] md:h-[100vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}>
    <div className="absolute inset-0 bg-black opacity-50" />
    <div className="relative content mx-auto h-full flex flex-col justify-center pt-20 items-start px-4">
      <h1 className="text-mobile/h3 md:text-desktop/h3 text-primary-white max-w-2xl font-bold">{title}</h1>
      <p className="mt-4 text-mobile/body/2 md:text-desktop/body/1 text-primary-white max-w-2xl">{description}</p>
      <a href={buttonLink} className="mt-8  bg-primary-white text-primary-yellow px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300 flex items-center">
        {buttonText} <ArrowForwardIcon className="ml-2" />
      </a>
    </div>
  </section>
);

const BenefitsSection = ({ benefits }) => (
  <section className="py-16 content">
    <div className=" mx-auto">
      <h2 className="text-mobile/h3 md:text-desktop/h3 text-gray-700 text-center font-bold mb-12">
        Why Partner With Us?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl text-gray-700 shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
            <div className=" mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold  mb-2">{item.title}</h3>
            <p className="text-mobile/body/2 md:text-desktop/body/1 text-primary-gray">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorksSection = ({ steps }) => (
  <section className="py-16 bg-gray-50 ">
    <div className="content mx-auto">
      <h2 className="text-mobile/h3 md:text-desktop/h3 text-gray-700 text-center font-bold mb-12">
        How It Works
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {steps.map((item, index) => (
          <div key={index} className="flex flex-col items-start text-center w-full md:w-1/4">
            <div className="bg-gray-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
              {item.step}
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">{item.title}</h3>
            <p className="text-mobile/body/2 md:text-desktop/body/1 text-primary-gray">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);



const TestimonialsSection = ({ testimonials }) => (
  <section className="py-16 bg-gray-50 px-4 md:px-8 lg:px-16">
    <div className="content mx-auto">
      <h2 className="text-mobile/h3 md:text-desktop/h3 text-gray-700 text-center font-bold mb-12">
        What Our Partners Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-mobile/body/2 md:text-desktop/body/1 text-primary-gray italic mb-4">{item.quote}</p>
            <div className="font-bold text-gray-700">{item.name}</div>
            <div className="text-sm text-primary-gray">{item.company}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const TravelAgent = () => {
  const heroContent = {
    title: "Earn More & Book Hassle-Free",
    description: "Join our travel agent network & enjoy high commissions, easy bookings, and exclusive perks.",
    imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Sign Up for Free",
    buttonLink: "#register"
  };

  const benefits = [
    { icon: <AttachMoneyIcon fontSize="large" />, title: '15% Commission', desc: 'Maximize your revenue on every booking' },
    { icon: <DiscountIcon fontSize="large" />, title: 'Exclusive Discounts', desc: '5% discount on online rates' },
    { icon: <HotelIcon fontSize="large" />, title: 'Free Rooms', desc: '1 free per 15 rooms (Groups Only)' },
    { icon: <HeadsetMicIcon fontSize="large" />, title: 'Dedicated Support', desc: 'Single-window processing' },
    { icon: <CardMembershipIcon fontSize="large" />, title: 'Loyalty Points', desc: '10% on every booking' },
    { icon: <DescriptionIcon fontSize="large" />, title: 'Marketing Materials', desc: 'Instant bookings & promo kits' }
  ];

  const steps = [
    { step: '1', title: 'Register', desc: 'Quick & free sign-up process' },
    { step: '2', title: 'Get Portal Access', desc: 'Exclusive agent dashboard' },
    { step: '3', title: 'Book & Earn', desc: 'Instant confirmations' },
    { step: '4', title: 'Redeem Rewards', desc: 'Use loyalty points' }
  ];



  const testimonials = [
    {
      quote: "Hotel Sunstar's portal saves me 3+ hours daily! Their support team is always available.",
      name: "Rajesh Mehta",
      company: "Travel Agent (Delhi)"
    },
    {
      quote: "I earned ₹50,000 extra last quarter just from loyalty points!",
      name: "Priya Sharma",
      company: "Golden Tours"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection {...heroContent} />
      <BenefitsSection benefits={benefits} />
      <HowItWorksSection steps={steps} />
      <TestimonialsSection testimonials={testimonials} />

    </div>
  );
};

export default TravelAgent;