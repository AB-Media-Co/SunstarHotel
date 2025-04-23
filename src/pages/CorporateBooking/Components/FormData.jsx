import { useEnquiryForm } from "../../../ApiHooks/useEnquiryFormHook";
import CommonUseEnquiryForm from "../../../Components/CommonUseEnquiryForm";

// Example 1: Form with TextArea (Sunstar Enquiry)
 const FormData = ({ page = 'Sunstar Enquiry', gid = [0] }) => {
  const { mutate, isLoading } = useEnquiryForm();

  const formFields = [
    {
      name: "name",
      placeholder: "Name", 
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email*",
    },
    {
      name: "phone",
      placeholder: "Phone",
      colSpan: "md:col-span-2",
    },
    {
      name: "decisionMaker",
      placeholder: "Designation", 
    },
    {
      name: "companyName",
      placeholder: "Company Name",
    },
    
    {
      name: 'address',
      type: 'dropdown',
      placeholder: 'Coorporeate booking',
      options: [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Support' },
        { value: 'sales', label: 'Sales' },
      ],
      required: true,
    },
    {
      name: "enquiry",
      type: "textarea",
      placeholder: "Your Enquiry",
      rows: 4,
      colSpan: "md:col-span-2",
    },
  ];

  const handleSubmit = (formData, callbacks) => {
    mutate({ ...formData, page, gid }, callbacks);
  };

  return (
    <CommonUseEnquiryForm
      title="Sunstar Enquiry Form"
      subtitle="Get Connected (For Corporates &amp; Travel Agents to register their interest)"
      fields={formFields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      
    />
  );
};

export default FormData


// // Example 2: Form without TextArea (Contact Information Form)
// export const ContactInfoForm = () => {
//   const { mutate, isLoading } = useEnquiryForm();

//   const contactFields = [
//     {
//       name: "firstName",
//       placeholder: "First Name*",
//     },
//     {
//       name: "lastName",
//       placeholder: "Last Name*",
//     },
//     {
//       name: "email",
//       type: "email",
//       placeholder: "Email Address*",
//     },
//     {
//       name: "phone",
//       placeholder: "Phone Number",
//     },
//     {
//       name: "company",
//       placeholder: "Company Name",
//     },
//     {
//       name: "jobTitle",
//       placeholder: "Job Title",
//     },
//   ];

//   const handleSubmit = (formData, callbacks) => {
//     mutate({ ...formData, page: 'Contact Information', type: 'basic' }, callbacks);
//   };

//   return (
//     <GenericForm
//       title="Contact Information"
//       subtitle="Please provide your contact details"
//       fields={contactFields}
//       onSubmit={handleSubmit}
//       isLoading={isLoading}
//       buttonLabel="Save Information"
//     />
//   );
// };

// // Example 3: Newsletter Subscription Form (Very Simple)
// export const NewsletterForm = () => {
//   const { mutate, isLoading } = useEnquiryForm();

//   const subscribeFields = [
//     {
//       name: "email",
//       type: "email",
//       placeholder: "Your Email Address",
//       colSpan: "md:col-span-2",
//     }
//   ];

//   const handleSubmit = (formData, callbacks) => {
//     mutate({ ...formData, page: 'Newsletter', type: 'subscription' }, callbacks);
//   };

//   return (
//     <GenericForm
//       title="Subscribe to Our Newsletter"
//       subtitle="Stay updated with our latest news and offers"
//       fields={subscribeFields}
//       onSubmit={handleSubmit}
//       isLoading={isLoading}
//       buttonLabel="Subscribe"
//       containerClassName="bg-gray-100"
//     />
//   );
// };