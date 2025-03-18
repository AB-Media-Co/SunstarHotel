import React, { useState } from 'react';
import TestimonialSection from '../../Components/TestimonialSection';
import { testimonialData } from '../../Data/AboutSectionData';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import VideocamIcon from '@mui/icons-material/Videocam';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SunstarEnquiryForm from '../CorporateBooking/Components/SunstarEnquiryForm';

const CorporateEventsPage = () => {
    const { Testimonials } = useUpdatePagesHook();

    const eventTypes = [
        { title: 'Training & Development', image: '/images/Sunstar other page Images/Training & Development/VET 1.png' },
        { title: 'Conference', image: '/images/Sunstar other page Images/Conference/hauser_partner_Event 1.png' },
        { title: 'Gala Dinner', image: '/images/Sunstar other page Images/Gala Dinner/8c30c532c44ad2bab6b62d288164acef 1.png' },
        { title: 'Awards Ceremony', image: '/images/Sunstar other page Images/Awards Ceremony/Hotelier-Awards-2021-20_11817772-1024x768-1 1.png' },
    ];

    // Enhanced Why Choose Us data with MUI icons for a more engaging UI
    const whyChooseUsFeatures = [
        { title: 'On Time', icon: <AccessTimeIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'System Driven', icon: <SettingsIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Conference Sitting', icon: <GroupIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Buffet', icon: <LocalDiningIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Projector & Mike', icon: <VideocamIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Stationery', icon: <ContentPasteIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Stay', icon: <HotelIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
        { title: 'Valet Parking', icon: <LocalParkingIcon sx={{ fontSize: 50, color: '#5BBEBC' }} /> },
    ];



    return (
        <div className="bg-primary-white text-primary-dark-green">
            {/* Hero Section */}
            <header className="relative">
                <img
                    src="/images/Sunstar other page Images/Coorporate events/cambridge-corporate-photographer-io-2016-003 1.png"
                    alt="Corporate Event"
                    className="w-full h-[100vh] object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 content flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-white">
                        Corporate Events at Sunstar Hotels
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-primary-white">
                        Introducing Sunstar Hotels, the ideal destination for corporate events. Our cutting-edge meeting rooms and event spaces
                        accommodate groups of all sizes. Enjoy personalized menus featuring fresh, local ingredients alongside comfortable
                        accommodations with workspaces and high-speed internet for business travellers.
                    </p>
                </div>
            </header>

            {/* MICE & Corporate Events Intro */}
            <section className="py-12 px-4 content">
                <h2 className="text-3xl font-bold text-center">MICE & Corporate Events</h2>
                <p className="mt-4 text-center text-primary-gray max-w-2xl mx-auto">
                    At Sunstar Hotels, we are committed to delivering exceptional service and support, ensuring the success of your corporate event.
                </p>
            </section>

            {/* Event Types Section */}
            <section className="py-12 px-4">
                <div className="grid content grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {eventTypes.map((event, index) => (
                        <div key={index} className="bg-primary-white shadow-md rounded overflow-hidden flex flex-col">
                            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                <p className="text-primary-gray mb-4 flex-grow">
                                    Starting at competitive prices.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Enhanced Why Choose Us Section */}
            <section className="py-12 px-4 bg-primary-green">
                <h2 className="text-3xl font-bold  text-center text-primary-white">Why Choose Us</h2>
                <div className="mt-8 grid grid-cols-1 content sm:grid-cols-2 md:grid-cols-4 gap-6">
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

            <TestimonialSection
                Testimonials={Testimonials}
                backgroundImage={testimonialData.backgroundImage}
            />

            <SunstarEnquiryForm />

        </div>
    );
};

export default CorporateEventsPage;
