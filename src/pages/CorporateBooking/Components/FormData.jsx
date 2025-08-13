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
      placeholder: 'Corporate Booking',
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


