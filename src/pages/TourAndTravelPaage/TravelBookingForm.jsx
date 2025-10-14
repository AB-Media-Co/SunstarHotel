import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';

export default function TravelBookingForm() {
    const [formData, setFormData] = useState({
        tourName: '',
        duration: '',
        country: '',
        hotelCategory: '',
        adults: '',
        children: '',
        name: '',
        email: '',
        contact: '',
        travelDate: '',
        enquiry: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    return (
        <div className="bg-primary-green relative min-h-screen flex flex-col items-center justify-center border-b py-16 sm:py-20 md:py-28 px-4">
            {/* Header */}
            <h1 className='text-2xl font-bold sm:text-3xl md:text-4xl lg:text-mobile/h3 xl:text-desktop/h3 text-white py-4 md:py-6 text-center lg:text-start w-full max-w-7xl'>
                Send Us Your Enquiry
            </h1>
            
            {/* Background Icon - Hidden on small screens */}
            <img 
                src="/images/TourAndTravel/iconss.svg" 
                alt="" 
                className='absolute top-16 sm:top-20 md:top-28 right-4 sm:right-8 md:right-16 lg:right-36 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] opacity-20 sm:opacity-40 md:opacity-100 hidden sm:block' 
            />
            
            {/* Main Container */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8">
                
                {/* Form Section */}
                <div className="flex-1 lg:ps-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 text-center lg:text-left">
                        Fill Out Your Details And We'll Get Back To You Soon!
                    </h2>

                    <div className="space-y-4 md:space-y-6">
                        {/* First Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="tourName"
                                    placeholder="Tour Name"
                                    value={formData.tourName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="Duration of trip"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="hotelCategory"
                                    placeholder="Hotel Category"
                                    value={formData.hotelCategory}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* Third Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <input
                                    type="number"
                                    name="adults"
                                    placeholder="No. of Adults"
                                    value={formData.adults}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="children"
                                    placeholder="No. of Child"
                                    value={formData.children}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* Fourth Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* Fifth Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <input
                                    type="tel"
                                    name="contact"
                                    placeholder="Phone"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <input
                                    type="date"
                                    name="travelDate"
                                    placeholder="Tour start date"
                                    value={formData.travelDate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* Enquiry Text Area */}
                        <div>
                            <textarea
                                name="enquiry"
                                placeholder="Your Enquiry"
                                rows="4"
                                value={formData.enquiry}
                                onChange={handleInputChange}
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors resize-none text-sm md:text-base"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-2 md:pt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 md:py-3 px-8 md:px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base w-full sm:w-auto"
                            >
                                Submit Enquiry
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3 lg:pe-8 lg:py-20 py-6">
                    <div className="bg-primary-green text-white rounded-xl md:rounded-2xl p-4 md:p-6 space-y-4 md:space-y-6">
                        {/* Need Help Section */}
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Need Help?</h3>
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                                    <span className="text-xs md:text-sm break-all">booking@sunstarhospitality.com</span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                                    <span className="text-xs md:text-sm">+91 01142503285</span>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions Section */}
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Terms & Conditions</h3>
                            <p className="text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                                Subject to availability and payment, you may add any additional night(s) to any Group Booking (after the dates of the original Group Booking) at the rate for the room(s) at the time you make the amendment.
                            </p>
                            <button className="text-white underline text-xs md:text-sm hover:no-underline transition-all break-words">
                                View All Terms & Conditions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
