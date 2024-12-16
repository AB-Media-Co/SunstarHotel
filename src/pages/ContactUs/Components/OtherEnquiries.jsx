/* eslint-disable react/prop-types */
import Icon from "../../../Components/Icons";

const OtherEnquiries = ({ enquiries }) => {

    return (
        <div className="bg-gray-50 py-10">
            <div className="content mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Other Enquiries</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {enquiries.map((enquiry, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <Icon name={enquiry.icon} className="w-10 h-10" />
                            <div>
                                <p className="text-md font-medium text-[#A4A4A4]">{enquiry.title}</p>
                                <a
                                    href={`mailto:${enquiry.email}`}
                                    className="underline text-[#848484] font-bold hover:underline text-xl"
                                >
                                    {enquiry.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OtherEnquiries;
