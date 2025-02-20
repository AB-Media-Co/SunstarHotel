/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";

const FAQSection = () => {
    const { faqs } = useUpdatePagesHook();

    const [activeIndex, setActiveIndex] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleViewMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div id="faqs" className="bg-gray-50 py-10">
            <div className="content mx-auto px-4">
                <h2 className="text-center md:text-left text-mobile/h4 md:text-desktop/h3 font-bold text-gray-800 mb-2">
                    Frequently Asked Questions
                </h2>
                <p className="text-center md:text-left text-mobile/body/2 md:text-desktop/body/1 text-[#737373] mb-8">
                    You need to come at least once in your life
                </p>
                {/* FAQ List */}
                <div className="flex flex-col gap-4">
                    {faqs.slice(0, showMore ? faqs.length : 5).map((faq, index) => (
                        <div key={index} className="border border-gray-300 bg-primary-white rounded-lg shadow-sm">
                            {/* Button Toggle */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left px-5 py-4 flex justify-between items-center font-medium text-gray-700 focus:outline-none transition-all duration-300"
                            >
                                <div className="flex gap-5 items-center font-semibold text-black">
                                    <span className="text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-mobile/body/2 md:text-desktop/body/1">
                                        {faq.question}
                                    </span>
                                </div>
                                <span className="text-black bg-gray-200 p-2 rounded-full transition-all duration-300">
                                    {activeIndex === index ? <RemoveIcon /> : <AddIcon />}
                                </span>
                            </button>
                            {/* FAQ Answer with Smooth Animation */}
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 py-3 text-mobile/body/2 md:text-desktop/body/1 text-gray-600">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
                {/* View More Button */}
                {faqs.length > 5 && (
                    <button
                        onClick={handleViewMore}
                        className="mx-auto md:mx-0 mt-4 px-4 py-2 bg-primary-green text-primary-white rounded  focus:outline-none"
                    >
                        {showMore ? "View Less" : "View More"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FAQSection;