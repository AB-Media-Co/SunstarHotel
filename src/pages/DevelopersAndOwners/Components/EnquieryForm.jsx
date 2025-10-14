/* eslint-disable react/prop-types */
import { useEnquiryForm } from "../../../ApiHooks/useEnquiryFormHook";
import CommonUseEnquiryForm from "../../../Components/CommonUseEnquiryForm";

const EnquieryForm = ({ page = 'Dev & Owners', gid = [1824860371] }) => {
  const { mutate, isLoading } = useEnquiryForm();
const contactFields = [
  {
    name: "firstName",
    placeholder: "Your Name",
  },
  {
    name: "company", // repurposed to capture property location
    placeholder: "Property Location",
  },
  {
    name: "lastName", // repurposed for number of rooms
    placeholder: "Number of Rooms",
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
  },
  {
    name: "phone", // using phone for contact details
    placeholder: "Phone",
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