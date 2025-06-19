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
        <div className="bg-primary-green relative min-h-screen flex flex-col items-center justify-center border-b py-28 p-4">
            <h1 className='text-mobile/h3 md:text-desktop/h3 text-white py-6 text-start content'>Send Us Your Enquiry</h1>
            <img src="/images/TourAndTravel/iconss.svg" alt="" className='absolute top-28 right-36 w-[300px]' />
            <div className="bg-white rounded-3xl  shadow-2xl p-8 content mx-auto w-full flex flex-col lg:flex-row gap-8">

                    <div className="flex-1 ps-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Fill Out Your Details And We'll Get Back To You Soon!
                        </h2>

                        <div className="space-y-6">
                            {/* First Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="tourName"
                                        placeholder="Tour Name"
                                        value={formData.tourName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="duration"
                                        placeholder="Duration of trip"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Second Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="hotelCategory"
                                        placeholder="Hotel Category"
                                        value={formData.hotelCategory}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Third Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="number"
                                        name="adults"
                                        placeholder="No. of Adults"
                                        value={formData.adults}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        name="children"
                                        placeholder="No. of Child"
                                        value={formData.children}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Fourth Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Type your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email id"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Fifth Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="tel"
                                        name="contact"
                                        placeholder="Contact No."
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        name="travelDate"
                                        placeholder="Date of Travel"
                                        value={formData.travelDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Enquiry Text Area */}
                            <div>
                                <textarea
                                    name="enquiry"
                                    placeholder="*Your Enquiry"
                                    rows="4"
                                    value={formData.enquiry}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Submit Enquiry
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3  pe-8 py-20">
                        <div className="bg-primary-green text-white rounded-2xl p-6 space-y-6">
                            {/* Need Help Section */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5" />
                                        <span className="text-sm">booking@sunstarhospitality.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5" />
                                        <span className="text-sm">+91 11 4122 5666</span>
                                    </div>
                                </div>
                            </div>

                            {/* Terms & Conditions Section */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
                                <p className="text-sm leading-relaxed mb-4">
                                    Subject to availability and payment, you may add any additional night(s) to any Group Booking (after the dates of the original Group Booking) at the rate for the room(s) at the time you make the amendment.
                                </p>
                                <button className="text-white underline text-sm hover:no-underline transition-all">
                                    View All Terms & Conditions
                                </button>
                            </div>
                        </div>
                    </div>
            
            </div>
        </div>
    );
}