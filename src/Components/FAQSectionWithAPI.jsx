/* eslint-disable react/prop-types */
import { useGetFAQsByPage } from "../ApiHooks/useFaqsHooks";
import CommonFAQSection from "./CommonFAQSection";

/**
 * FAQSectionWithAPI - FAQ component that fetches data from API
 * 
 * @param {Object} props
 * @param {string} props.pageName - Page name to fetch FAQs from API (required)
 * @param {string} props.title - Custom title for the FAQ section
 * @param {string} props.subtitle - Subtitle text
 * @param {boolean} props.showViewMore - Show view more button
 * @param {number} props.initialLimit - Number of FAQs to show initially
 * @param {string} props.bgColor - Background color class
 * @param {string} props.layout - Layout style: "two-column" or "single-column"
 * @param {boolean} props.useAnimations - Enable framer-motion animations
 */
const FAQSectionWithAPI = ({ pageName, ...props }) => {
    const { data: faqs, isLoading, error } = useGetFAQsByPage(pageName);

    if (isLoading) {
        return (
            <div className="py-10 md:py-16">
                <div className="content mx-auto px-4 max-w-7xl">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-20 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return null; // Silently fail, or you can show an error message
    }

    return <CommonFAQSection faqs={faqs} {...props} />;
};

export default FAQSectionWithAPI;
