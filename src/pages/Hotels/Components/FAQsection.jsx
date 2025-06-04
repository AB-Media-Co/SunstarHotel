/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const FAQSection = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleViewMore = () => {
        setShowMore((prev) => !prev);
    };

    // Limit FAQs shown before "View More"
    const visibleFaqs = faqs?.slice(0, showMore ? faqs.length : 10) || [];

    // Split into 2 columns for layout
    const leftColumn = visibleFaqs.filter((_, i) => i % 2 === 0);
    const rightColumn = visibleFaqs.filter((_, i) => i % 2 !== 0);

    const renderFaqItem = (faq, index) => (
        <div
            key={index}
            className="border-b flex flex-col gap-6 border-gray-300 pb-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
        >

            <div className="flex items-start w-full justify-between">
                <p className="font-medium text-lg text-gray-800">{faq.question}</p>
                <div className="mt-1 text-yellow-500">
                    {activeIndex === index ? <RemoveIcon /> : <AddIcon />}
                </div>
            </div>

            <AnimatePresence>
                {activeIndex === index && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className=" py-3 text-sm text-gray-600">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <div id="faqs" className=" py-10">
            <div className="content mx-auto px-4 max-w-7xl">
                <h2 className="text-center md:text-left text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Frequently Asked Questions
                </h2>
                <p className="text-center md:text-left text-gray-500 mb-8">
                    You need to come at least once in your life
                </p>

                {faqs?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <AnimatePresence>
                                {leftColumn.map((faq, i) => (
                                    <motion.div
                                        key={faq.question}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {renderFaqItem(faq, faqs.indexOf(faq))}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                        </div>
                        <div className="flex flex-col gap-4">

                            <AnimatePresence>
                                {rightColumn.map((faq, i) => (
                                    <motion.div
                                        key={faq.question}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {renderFaqItem(faq, faqs.indexOf(faq))}
                                    </motion.div>
                                ))}
                            </AnimatePresence>


                        </div>
                    </div>
                ) : (
                    <p>No FAQs available.</p>
                )}

                {faqs?.length > 10 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleViewMore}
                            className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={showMore ? "less" : "more"}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {showMore ? "View Less" : "View More"}
                                </motion.span>
                            </AnimatePresence>
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQSection;
