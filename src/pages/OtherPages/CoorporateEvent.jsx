
import { Helmet } from "react-helmet";
import { useState } from 'react';

const CoorporateEvent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: ''
    });

    const eventTypes = [
        {
            title: "Training & Development",
            image: "/images/corporate/training.jpg",
            price: "Starting from ₹25,000",
            capacity: "Up to 50 people"
        },
        {
            title: "Conference",
            image: "/images/corporate/conference.jpg",
            price: "Starting from ₹50,000",
            capacity: "Up to 200 people"
        },
        {
            title: "Gala Dinner",
            image: "/images/corporate/gala.jpg",
            price: "Starting from ₹75,000",
            capacity: "Up to 300 people"
        },
        {
            title: "Awards Ceremony",
            image: "/images/corporate/awards.jpg",
            price: "Starting from ₹100,000",
            capacity: "Up to 500 people"
        }
    ];

    const testimonials = [
        {
            name: "John Smith",
            company: "Tech Solutions Inc.",
            comment: "Exceptional service for our annual conference. The staff was incredibly professional.",
            image: "/images/testimonials/john.jpg"
        },
        {
            name: "Sarah Johnson",
            company: "Global Enterprises",
            comment: "Perfect venue for our corporate training sessions. State-of-the-art facilities.",
            image: "/images/testimonials/sarah.jpg"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <>
            <Helmet>
                <title>Corporate Events | Sunstar Hotel</title>
                <meta name="description" content="Host your corporate events at Sunstar Hotel. State-of-the-art facilities for conferences, training sessions, and corporate gatherings." />
                <meta name="keywords" content="corporate events, conference venue, business meetings, corporate training, event space" />
            </Helmet>

            {/* Hero Section */}
            <div className="relative h-[60vh]">
                <img 
                    src="/images/corporate/hero-banner.jpg" 
                    alt="Corporate Events at Sunstar" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl text-white font-bold text-center">
                        Corporate Events at Sunstar
                    </h1>
                </div>
            </div>

            {/* Introduction */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg mb-8">
                        Introducing Sunstar Hotels, the ideal destination for corporate events. Our cutting-edge meeting rooms and event spaces accommodate groups of all sizes...
                    </p>
                </div>
            </div>

            {/* Event Types */}
            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">MICE & Corporate Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {eventTypes.map((event, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                                 onClick={() => document.getElementById('enquiryForm').scrollIntoView({ behavior: 'smooth' })}>
                                <img src={event.image} alt={event.title} className="w-full h-48 object-cover"/>
                                <div className="p-4">
                                    <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                                    <p className="text-primary-green">{event.price}</p>
                                    <p className="text-gray-600">{event.capacity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {['On time', 'System Driven', 'Conference Sitting', 'Buffet', 
                      'Projector & Mike', 'Stationery', 'Stay', 'Valet Parking'].map((feature, index) => (
                        <div key={index} className="text-center p-4 bg-white shadow-lg rounded-lg">
                            <p className="font-semibold">{feature}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Hear from our guests</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="font-bold">{testimonial.name}</h3>
                                        <p className="text-gray-600">{testimonial.company}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">{testimonial.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enquiry Form */}
            <div id="enquiryForm" className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Make an Enquiry</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <select className="w-full p-3 border rounded" required>
                                <option value="">Select Event Type</option>
                                {eventTypes.map((type, index) => (
                                    <option key={index} value={type.title}>{type.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                type="date"
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary-green text-white py-3 px-6 rounded hover:bg-green-700 transition duration-300"
                        >
                            Submit Enquiry
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CoorporateEvent;
