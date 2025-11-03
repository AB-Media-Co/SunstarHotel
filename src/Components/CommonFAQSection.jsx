/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

/**
 * CommonFAQSection - A reusable FAQ component
 * 
 * @param {Object} props
 * @param {Array} props.faqs - Array of FAQ objects with question and answer properties
 * @param {string} props.pageName - Page name to fetch FAQs from API (optional, use either faqs or pageName)
 * @param {string} props.title - Custom title for the FAQ section (default: "Frequently Asked Questions")
 * @param {string} props.subtitle - Subtitle text (optional)
 * @param {boolean} props.showViewMore - Show view more button for large FAQ lists (default: true)
 * @param {number} props.initialLimit - Number of FAQs to show initially (default: 10)
 * @param {string} props.bgColor - Background color class (default: "bg-gray-50")
 * @param {string} props.layout - Layout style: "two-column" or "single-column" (default: "two-column")
 * @param {boolean} props.useAnimations - Enable framer-motion animations (default: true)
 */
const CommonFAQSection = ({
    faqs = [],
    title = "Frequently Asked Questions",
    subtitle = "",
    showViewMore = true,
    initialLimit = 10,
    bgColor = "bg-gray-50",
    layout = "two-column",
    useAnimations = true,
}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleViewMore = () => {
        setShowMore((prev) => !prev);
    };

    // Limit FAQs shown before "View More"
    const visibleFaqs = showViewMore && !showMore 
        ? faqs?.slice(0, initialLimit) 
        : faqs || [];

    // Split into 2 columns for two-column layout
    const leftColumn = layout === "two-column" ? visibleFaqs.filter((_, i) => i % 2 === 0) : visibleFaqs;
    const rightColumn = layout === "two-column" ? visibleFaqs.filter((_, i) => i % 2 !== 0) : [];

    const renderFaqItem = (faq, index) => {
        const isOpen = activeIndex === index;
        const content = (
            <div
                key={index}
                className="border-b flex flex-col gap-2 border-gray-300 pb-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
            >
                <div className="flex items-start w-full justify-between">
                    <p className="text-mobile/h6 md:text-desktop/h5/medium text-gray-800">
                        {faq.question}
                    </p>
                    <div className="mt-1 text-yellow-500 flex-shrink-0 ml-2">
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                </div>

                {useAnimations ? (
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="py-3 text-mobile/small/body md:text-desktop/body/1 text-gray-600">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                ) : (
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isOpen ? "max-h-96 mt-2" : "max-h-0"
                        }`}
                    >
                        <p className="pb-3 text-mobile/small/body md:text-desktop/body/1 text-gray-600">
                            {faq.answer}
                        </p>
                    </div>
                )}
            </div>
        );

        return useAnimations ? (
            <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {content}
            </motion.div>
        ) : content;
    };

    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <div id="faqs" className={`py-10 md:py-16 ${bgColor}`}>
            <div className="content ">
                <h2 className="text-start mb-4 text-mobile/h3 md:text-desktop/h3 text-gray-800 ">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-500 mb-8">
                        {subtitle}
                    </p>
                )}

                {layout === "two-column" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        <div className="flex flex-col gap-4 md:gap-6">
                            {leftColumn.map((faq, i) => renderFaqItem(faq, faqs.indexOf(faq)))}
                        </div>
                        <div className="flex flex-col gap-4 md:gap-6">
                            {rightColumn.map((faq, i) => renderFaqItem(faq, faqs.indexOf(faq)))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 md:gap-6">
                        {visibleFaqs.map((faq, i) => renderFaqItem(faq, i))}
                    </div>
                )}

                {showViewMore && faqs?.length > initialLimit && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleViewMore}
                            className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                        >
                            {useAnimations ? (
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
                            ) : (
                                <span>{showMore ? "View Less" : "View More"}</span>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommonFAQSection;
