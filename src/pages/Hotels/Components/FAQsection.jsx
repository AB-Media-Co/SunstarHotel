/* eslint-disable react/prop-types */
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQSection = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        // If the clicked FAQ is already open, collapse it, otherwise open it and close others
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-50 py-10">
            <div className="content mx-auto px-4">
                <h2 className="text-center md:text-left text-[36px] font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
                <p className="text-center md:text-left text-[#737373] mb-8">You need to come at least once in your life</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-300 bg-white py-6">
                            <button
                                onClick={() => toggleFAQ(index)} // Toggle the FAQ
                                className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-700 focus:outline-none"
                            >
                                <div className='flex gap-5 items-center font-semibold text-black'>
                                    <span className='font-bold text-[36px]'>
                                        {(index + 1)?.toString()?.padStart(2, '0')}  
                                    </span>
                                    {faq.question}
                                </div>
                                <span className="text-black bg-gray-200 p-2 rounded-sm">
                                    {activeIndex === index ? <RemoveIcon /> : <AddIcon />}
                                </span>
                            </button>
                            {activeIndex === index && (
                                <div className="px-4 py-3 text-gray-600">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
