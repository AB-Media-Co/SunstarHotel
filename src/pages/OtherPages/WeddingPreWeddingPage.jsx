import React from 'react';
import TestimonialSection from '../../Components/TestimonialSection';
import { testimonialData } from '../../Data/AboutSectionData';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';
import SunstarEnquiryForm from '../CorporateBooking/Components/SunstarEnquiryForm';

const WeddingPreWeddingPage = () => {
  // Wedding & Pre-wedding packages
  const weddingPackages = [
    { title: 'Wedding & Reception', image: '/images/WeddingPreWedding/1.jpeg' },
    { title: 'Cocktail', image: '/images/WeddingPreWedding/2.jpeg' },
    { title: 'Roka & Sagan', image: '/images/WeddingPreWedding/3.jpeg' },
    { title: 'Haldi & Mehndi', image: '/images/WeddingPreWedding/4.jpeg' },
  ];

  const whyChooseUsFeatures = [
    { title: 'On time every time', icon: <AccessTimeIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    { title: 'System Driven', icon: <SettingsIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    { title: 'Decoration', icon: <LocalFloristIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    { title: 'Buffet', icon: <RestaurantMenuIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    { title: 'DJ & Music', icon: <MusicNoteIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    { title: 'Cocktail', icon: <LocalBarIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    { title: 'Stay', icon: <HotelIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    { title: 'Parking & Valet Service', icon: <LocalParkingIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
  ];

  const { Testimonials } = useUpdatePagesHook();

  return (
    <div className="bg-primary-white text-primary-dark-green">
      {/* Hero Section */}
      <header className="relative">
        <img
          src="/images/WeddingPreWedding/WeddingHero.jpg"
          alt="Wedding & Pre-wedding"
          className="w-full h-[100vh] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-white">
            Wedding & Pre-wedding Events at Sunstar Hotels
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-white content">
            Our wedding packages are designed to suit a variety of budgets and preferences, and our team will work with you to create a customised experience that reflects your unique style and vision.
          </p>
          <p className="mt-4 text-lg md:text-xl text-primary-white content">
            From the moment you contact us to the moment you say “I do,” we will be there to guide you every step of the way. Our packages include everything you need for a perfect ceremony and reception – from floral arrangements, centrepieces, and table settings to a delicious menu featuring the finest, locally sourced ingredients.
          </p>
          <p className="mt-4 text-lg md:text-xl text-primary-white content">
            We are thrilled that you are considering us for your special day. Let us help you create your dream wedding and pre-wedding event.
          </p>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="py-12 px-4">
        <p className="text-start text-black content mx-auto">
          Our wedding packages are designed to suit a variety of budgets and preferences. Our dedicated team will work with you to create a customised experience that reflects your unique style and vision.
        </p>
        <p className="mt-6 text-start text-black content mx-auto">
          From floral arrangements and centrepieces to table settings and catering with the finest locally sourced ingredients, we provide everything for a perfect ceremony and reception.
        </p>
        <p className="mt-6 text-start text-black content mx-auto font-semibold">
          Your Special Day
        </p>
        <p className="mt-2 text-start text-black content mx-auto">
          We are thrilled that you are considering us for your special day. Our hotel is the perfect venue to host your dream wedding and pre-wedding events.
        </p>
      </section>

      {/* Wedding Packages Section */}
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Wedding & Pre-wedding Packages</h2>
        <div className="grid grid-cols-1 content md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weddingPackages.map((event, index) => (
            <div key={index} className="bg-primary-white shadow-md rounded overflow-hidden flex flex-col">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-primary-gray mb-4 flex-grow">
                  Packages starting at attractive rates.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-4 bg-primary-green">
        <h2 className="text-3xl font-bold text-center text-primary-white">Why Choose Us</h2>
        <div className="mt-8 grid grid-cols-1 content sm:grid-cols-2 md:grid-cols-4 gap-6">
          {whyChooseUsFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-primary-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <p className="text-lg font-semibold text-primary-dark-green text-center">{feature.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection
        Testimonials={Testimonials}
        backgroundImage={testimonialData.backgroundImage}
      />

      {/* Enquiry Capture Form */}
      <SunstarEnquiryForm />
    </div>
  );
};

export default WeddingPreWeddingPage;
