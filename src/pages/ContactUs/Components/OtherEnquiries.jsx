/* eslint-disable react/prop-types */
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import Icon from "../../../Components/Icons";

const OtherEnquiries = () => {
  const { ContactUsDetail } = useUpdatePagesHook();
  
  const enquiriesData = ContactUsDetail?.OtherEnquieirs || {};

  const iconsMapping = {
    reservations: 'marketing',      
    corporateSales: 'Group',     
    traveAgentSales: 'generalChat',       
    marketing: 'corporate',               
    careers: 'Group',                   
    hotelDevelopment: 'builders'  
  };

  const titlesMapping = {
    reservations: 'Reservations',
    corporateSales: 'Corporate Sales',
    traveAgentSales: 'Travel Agent Sales',
    marketing: 'Marketing',
    careers: 'Careers',
    hotelDevelopment: 'Hotel Development'
  };

  const enquiriesArray = Object.entries(enquiriesData).map(([key, email]) => ({
    key,
    email,
    icon: iconsMapping[key] || 'defaultIcon',
    title: titlesMapping[key] || key
  }));

  return (
    <div className="bg-gray-50 py-10">
      <div className="content mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Other Enquiries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {enquiriesArray.map((enquiry, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Icon name={enquiry.icon} className="w-10 h-10" />
              <div>
                <p className="text-md font-medium text-[#A4A4A4]">
                  {enquiry.title}
                </p>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="underline text-[#848484] font-bold hover:underline md:text-xl"
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
