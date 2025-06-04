/* eslint-disable react/prop-types */
import { useEnquiryForm } from "../../../ApiHooks/useEnquiryFormHook";
import CommonUseEnquiryForm from "../../../Components/CommonUseEnquiryForm";

const EnquieryForm = ({ page = 'Dev & Owners', gid = [1824860371] }) => {
  const { mutate, isLoading } = useEnquiryForm();

  const contactFields = [
    {
      name: "firstName",
      placeholder: "First Name*",
    },
    {
      name: "lastName",
      placeholder: "Last Name*",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email Address*",
    },
    {
      name: "phone",
      placeholder: "Phone Number",
    },
    {
      name: "company",
      placeholder: "Company Name",
    },
    {
      name: "hotelType",
      type: "dropdown",
      placeholder: "Current Hotel Status",
      colSpan: "md:col-span-1",
      options: [
        { value: "Operating", label: "Operating" },
        { value: "new", label: "New Build" },
        { value: "Conversion", label: "Conversion" },
      ],
    }
  ];

  const handleSubmit = (formData, callbacks) => {
    mutate({
      page,
      name: formData?.firstName + formData?.lastName,
      companyName: formData?.company,
      email: formData?.email,
      // address:formData?.hotelType,
      phone: formData?.phone,
      enquiry: formData?.hotelType,
      gid,
      submittedAt: new Date().toISOString(),
    }, callbacks);
    // , page, gid, type: 'basic' }, callbacks);
  };

  return (
    <div id="form">
      <CommonUseEnquiryForm
        title="Partner With Us"
        subtitle="Property owners and developers, let’s explore collaboration opportunities."
        fields={contactFields}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        buttonLabel="Submit"
      />

    </div>
  );
};

export default EnquieryForm;