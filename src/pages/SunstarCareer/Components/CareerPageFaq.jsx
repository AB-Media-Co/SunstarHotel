import { Plus, Minus } from "lucide-react"; // optional: use lucide-react for icons
import { useState } from "react";
import { useGetFAQsByPage } from "../../../ApiHooks/useFaqsHooks";


const CareerPageFaq = () => {
    const { data: faqs } = useGetFAQsByPage('Career'); // Fetch FAQs for the selected page

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    // Split into 2 columns
    const leftFAQs = faqs?.filter((_, i) => i % 2 === 0);
    const rightFAQs = faqs?.filter((_, i) => i % 2 !== 0);
    

    const renderFAQItem = (faq, index) => {
        const isOpen = openIndex === index;

        return (
            <div
                key={index}
                onClick={() => toggle(index)}
                className="border-b flex flex-col gap-6 border-gray-300 pb-4 cursor-pointer"
            >
                <div className="flex items-start justify-between">
                    <p className="font-medium text-lg text-gray-800">{faq.question}</p>
                    <div className="mt-1 text-yellow-500">
                        {isOpen ? <Minus size={25} /> : <Plus size={25} />}
                    </div>
                </div>

                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 mt-2" : "max-h-0"
                        }`}
                >
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
            </div>
        );
    };
  return (
    <div>
       <section className="py-16 md:px-12 bg-gray-50">
                <div className="content mx-auto">
                    <h2 className="text-mobile/h3 md:text-desktop/h3  text-gray-800 mb-10">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            {leftFAQs?.map((faq, i) => renderFAQItem(faq, i * 2))}
                        </div>
                        <div className="space-y-6">
                            {rightFAQs?.map((faq, i) => renderFAQItem(faq, i * 2 + 1))}
                        </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default CareerPageFaq
