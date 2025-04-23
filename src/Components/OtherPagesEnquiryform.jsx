/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useEnquiryForm } from '../ApiHooks/useEnquiryFormHook';

const OtherPagesEnquiryForm = ({ img, page, gid }) => {

    const { mutate, isLoading } = useEnquiryForm();
    const [responseMsg, setResponseMsg] = useState("");


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        event: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);


        // Build the payload including a timestamp
        const payload = {
            page,
            companyName: formData.name,
            email: formData.email,
            formphone: formData.phone,
            enquiry: formData.event,
            gid,
            submittedAt: new Date().toISOString(),
        };

        // Call the mutation
        mutate(payload, {
            onSuccess: () => {
                setFormData('')
            },
            onError: (error) => {
                setResponseMsg("Failed to submit enquiry. Please try again.");
                console.error("Submission error:", error);
            },
        });


    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            {/* Left side - Event space image */}
            <div className="w-full md:w-1/2 h-64 md:h-screen bg-gray-200 relative overflow-hidden">
                <img
                    src={img}
                    alt="Corporate event space with blue lighting and elegant table settings"
                    className="w-full h-full object-cover"
                />

            </div>

            {/* Right side - Contact form */}
            <div className="w-full md:w-1/2 bg-[#4DB8B6] p-2 py-8 md:p-10 flex flex-col justify-center">
                <div className="max-w-xl mx-auto flex flex-col gap-10 w-full">
                    <h2 className="text-white text-4xl font-bold ">TALK WITH US?</h2>
                    <p className="text-white ">
                        Sunstar Offers The Perfect Corporate Events Packages Designed To Make Your Experience Truly Magical
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className='flex gap-6'>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="*Name"
                                className="w-full p-3 border-b-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="*Email"
                                className="w-full p-3 border-b-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
                                required
                            />
                        </div>



                        <div className='flex gap-8'>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="*Phone"
                                className=" w-full p-3 border-b-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
                                required
                            />
                            <div className="relative w-full">
                                <select
                                    name="event"
                                    value={formData.event}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-white bg-transparent text-white appearance-none focus:outline-none"
                                    required
                                >
                                    <option value="" disabled className="bg-teal-600">*Choose Event</option>
                                    <option value="corporate-meeting" className="bg-teal-600">Corporate Meeting</option>
                                    <option value="conference" className="bg-teal-600">Conference</option>
                                    <option value="product-launch" className="bg-teal-600">Product Launch</option>
                                    <option value="team-building" className="bg-teal-600">Team Building</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-start ">
                            <button
                                type="submit"
                                className="px-12 py-3 mt-10 bg-yellow-400 text-black font-medium rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            >
                               {isLoading ? "Submitting..." : "Submit"}
                            </button>


                        </div>

                    
                        {responseMsg && (
                            <p className="mt-4 text-center text-sm text-white">{responseMsg}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OtherPagesEnquiryForm;