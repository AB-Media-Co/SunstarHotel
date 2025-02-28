/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEnquiryForm } from "../../../ApiHooks/useEnquiryFormHook";

const InputField = ({ type = "text", placeholder, value, onChange, additionalClasses = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-4 rounded-xl border border-gray-200 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#058FA2] focus:border-transparent shadow-sm ${additionalClasses}`}
  />
);

const TextAreaField = ({ placeholder, rows, value, onChange, additionalClasses = "" }) => (
  <textarea
    placeholder={placeholder}
    rows={rows}
    value={value}
    onChange={onChange}
    className={`w-full p-4 rounded-xl border border-gray-200 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#058FA2] focus:border-transparent shadow-sm ${additionalClasses}`}
  ></textarea>
);

const Button = ({ label, onClick, additionalClasses = "" }) => (
  <button
    type="submit"
    onClick={onClick}
    className={`w-full md:w-auto px-8 py-3 bg-[#058FA2] text-white font-semibold rounded-full shadow-lg transition duration-200 ease-in-out hover:bg-[#04788E] focus:outline-none focus:ring-2 focus:ring-yellow-300 ${additionalClasses}`}
  >
    {label}
  </button>
);

const SunstarEnquiryForm = () => {
  // State hooks for each field
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [decisionMaker, setDecisionMaker] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  // Use our custom enquiry form mutation hook
  const { mutate, isLoading } = useEnquiryForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the payload including a timestamp
    const payload = {
      companyName,
      email,
      address,
      decisionMaker,
      phone,
      enquiry,
      submittedAt: new Date().toISOString(),
    };

    // Call the mutation
    mutate(payload, {
      onSuccess: (data) => {
        setResponseMsg("Enquiry submitted successfully!");
        // Optionally clear the form fields
        setCompanyName("");
        setEmail("");
        setAddress("");
        setDecisionMaker("");
        setPhone("");
        setEnquiry("");
      },
      onError: (error) => {
        setResponseMsg("Failed to submit enquiry. Please try again.");
        console.error("Submission error:", error);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-green p-4">
      <div className="w-full max-w-3xl bg-white p-8 lg:p-8 rounded-3xl shadow-2xl">
        <h1 className="text-center text-[#058FA2] text-2xl md:text-4xl font-extrabold mb-4">
          Sunstar Enquiry Form
        </h1>
        <p className="text-center text-[#058FA2] text-sm md:text-base mb-8">
          Get Connected (For Corporates &amp; Travel Agents to register their interest)
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <InputField
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputField
              placeholder="Travel Head/Decision's Name"
              value={decisionMaker}
              onChange={(e) => setDecisionMaker(e.target.value)}
            />
            <InputField
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              additionalClasses="md:col-span-2"
            />
            <TextAreaField
              placeholder="Your Enquiry"
              rows="4"
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
              additionalClasses="md:col-span-2"
            />
          </div>
          <div className="mt-10">
            <Button label={isLoading ? "Submitting..." : "Submit"} />
          </div>
          {responseMsg && (
            <p className="mt-4 text-center text-sm text-[#058FA2]">{responseMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SunstarEnquiryForm;
