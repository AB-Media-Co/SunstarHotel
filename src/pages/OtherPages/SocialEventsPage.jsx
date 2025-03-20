import React, { useState } from 'react';
import TestimonialSection from '../../Components/TestimonialSection';
import { testimonialData } from '../../Data/AboutSectionData';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';
import SunstarEnquiryForm from '../CorporateBooking/Components/SunstarEnquiryForm';

const SocialEventsPage = () => {

    // Social events categories
    const socialEventsTypes = [
        { title: 'Birthday Celebrations', image: '/images/Sunstar other page Images/Birthday Celebrations/BD-1024x731.jpg 1.png' },
        { title: 'Anniversary', image: '/images/Sunstar other page Images/Anniversary/LINE_ALBUM_TCH-Happy-Anniversary_240717_4 1.png' },
        { title: 'Kitty Party', image: '/images/Sunstar other page Images/Kitty party/kitty-party-planning-ideas-main 1.png' },
        { title: 'Baby Shower', image: '/images/Sunstar other page Images/Baby shower/Carlton-all-edits-35-1920x1283 1.png' },
    ];

    const personalisedExperiences = [
        { title: 'Candle Light Dinner', image: '/images/Sunstar other page Images/candle light dinner/20eac2f6-570e-4697-8a39-d34b14ae254c_large 1.png' },
        { title: 'Bachelor Party', image: '/images/Sunstar other page Images/Bachelor Party/Bachelor-Party-Trip-Total-Advantage-Destination-Weddings 1.png' },
        { title: 'Marriage Proposal', image: '/images/Sunstar other page Images/Marriage Proposal/Agia-Pelagia-Proposal-Will-you-marry-me-letters-Crete-Marriage-Proposal-1 1.png' },
        { title: 'Group Party', image: '/images/Sunstar other page Images/Social event/48489934797_1b1fb859e6_k 1.png' },
    ];

    const whyChooseUsFeatures = [
        { title: 'On Time', icon: <AccessTimeIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'System Driven', icon: <SettingsIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Decoration', icon: <LocalFloristIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Buffet', icon: <RestaurantMenuIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'DJ & Music', icon: <MusicNoteIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Stay', icon: <HotelIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Parking', icon: <LocalParkingIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    ];

    const { Testimonials } = useUpdatePagesHook();


    return (
        <div className="bg-primary-white text-primary-dark-green">
            {/* Hero Section */}
            <header className="relative">
                <img
                    src="/images/Sunstar other page Images/Social event/web_zurich_venues_umweltarena-spreitenbach_pt_2194 2.png"
                    alt="Social Event"
                    className="w-full h-[100vh] object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-white">
                        Personalised Social Events at Sunstar Hotels
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-primary-white max-w-2xl">
                        Welcome to the personalised events page of Sunstar Hotels! Whether you are planning a birthday party, anniversary celebration, candle light dinner, baby shower, marriage proposal, or any other special occasion, we are excited to help make your personal event a truly unforgettable experience.
                    </p>
                </div>
            </header>

            {/* Introduction Section */}
            <section className="py-12 px-4">
                <p className="text-start text-black content mx-auto">
                    Our hotel offers a range of beautiful and unique event spaces, each of which can be customised to suit your needs and preferences. Our event planning team will work with you to create a personalised event that reflects your style and vision, from selecting the perfect venue to choosing the décor, setting and the menu.
                </p>
                <p className="mt-6 text-start text-black content mx-auto">
                    In addition to our beautiful and specially curated event spaces and exceptional catering, we offer a range of additional services to enhance your personalised event experience. These include floral arrangements, professional photography, and customised party favours, to name just a few.
                </p>
                <p className="mt-6 text-start text-black content mx-auto font-semibold">
                    Unforgettable Social Experiences Tailored to Perfection
                </p>
                <p className="mt-2 text-start text-black content mx-auto">
                    At Sunstar Hotels our team specialises in creating unforgettable social events that leave a lasting impression. From corporate gatherings to milestone celebrations, our dedicated team brings expertise, creativity, and meticulous attention to detail to curate extraordinary experiences.
                </p>
            </section>

                 {/* Personalised Experiences Section */}
                 <section className="py-12 px-4 bg-primary-gray bg-opacity-10">
                <h2 className="text-3xl font-bold text-center mb-8">Personalised Experiences</h2>
                <div className="grid content grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personalisedExperiences.map((event, index) => (
                        <div key={index} className="bg-primary-white shadow-md rounded overflow-hidden flex flex-col">
                            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                <p className="text-primary-gray mb-4 flex-grow">
                                    Packages starting at competitive rates.
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Social Events Section */}
            <section className="py-12 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Social Events</h2>
                <div className="grid grid-cols-1 content md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {socialEventsTypes.map((event, index) => (
                        <div key={index} className="bg-primary-white shadow-md rounded overflow-hidden flex flex-col">
                            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                <p className="text-primary-gray mb-4 flex-grow">
                                    Starting at attractive prices.
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </section>

       

            {/* Why Choose Us Section */}
            <section className="py-12 px-4 bg-primary-green">
                <h2 className="text-3xl font-bold text-center text-primary-white">Why Choose Us</h2>
                <div className="mt-8 grid content grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {whyChooseUsFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-primary-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <p className="text-lg font-semibold text-primary-dark-green">{feature.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}

            <TestimonialSection
                Testimonials={Testimonials}
                backgroundImage={testimonialData.backgroundImage}
            />

            <SunstarEnquiryForm/>

        </div>
    );
};

export default SocialEventsPage;
