/* eslint-disable react/prop-types */
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQSection = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        // Toggle the current FAQ, close others
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div id="faqs" className="bg-gray-50 py-10">
            <div className="content mx-auto px-4">
                <h2 className="text-center md:text-left text-[36px] font-bold text-gray-800 mb-2">
                    Frequently Asked Questions
                </h2>
                <p className="text-center md:text-left text-[#737373] mb-8">
                    You need to come at least once in your life
                </p>
                {/* Flexbox with better alignment and proper item control */}
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index} // Unique key for each FAQ
                            className="border border-gray-300 bg-white"
                        >
                            {/* Toggle Button */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-700 focus:outline-none"
                            >
                                <div className="flex gap-5 items-center font-semibold text-black">
                                    <span className="font-bold text-[36px]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {faq.question}
                                </div>
                                <span className="text-black bg-gray-200 p-2 rounded-sm">
                                    {activeIndex === index ? <RemoveIcon /> : <AddIcon />}
                                </span>
                            </button>
                            {/* FAQ Answer */}
                            {activeIndex === index && (
                                <div className="px-4 py-3 text-gray-600 transition-all duration-300">
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
