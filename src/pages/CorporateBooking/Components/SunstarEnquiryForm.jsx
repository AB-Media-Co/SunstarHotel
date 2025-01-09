/* eslint-disable react/prop-types */
const InputField = ({ type = "text", placeholder, additionalClasses = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#058FA2] ${additionalClasses}`}
  />
);

const TextAreaField = ({ placeholder, rows, additionalClasses = "" }) => (
  <textarea
    placeholder={placeholder}
    rows={rows}
    className={`w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#058FA2] ${additionalClasses}`}
  ></textarea>
);

const Button = ({ label, onClick, additionalClasses = "" }) => (
  <button
    type="submit"
    onClick={onClick}
    className={`px-8 py-3 bg-[#058FA2] text-white text-mobile/button md:text-desktop/button font-semibold rounded-full shadow-md  focus:outline-none focus:ring-2 focus:ring-yellow-300 ${additionalClasses}`}
  >
    {label}
  </button>
);

const SunstarEnquiryForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#BAE9EF] to-[#BAE9EF]">
      <div className="w-full max-w-3xl bg-[#BAE9EF] p-8 lg:p-0">
        <h1 className="text-center text-[#058FA2] text-mobile/h3 md:text-desktop/h3 font-bold mb-4">
          Sunstar Enquiry Form
        </h1>
        <p className="text-center text-[#058FA2] text-mobile/body/2 md:text-desktop/body/1 mb-8">
          Find out if your fleet meets our criteria
        </p>
        <form>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField placeholder="Company Name" />
            <InputField type="email" placeholder="Email*" />
            <InputField placeholder="Address" />
            <InputField placeholder="Travel Head/Decision's Name" />
            <InputField placeholder="Phone" additionalClasses="md:col-span-2" />
            <TextAreaField
              placeholder="Your Enquiry"
              rows="4"
              additionalClasses="md:col-span-2"
            />
          </div>
          <div className="text-center mt-8">
            <Button label="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SunstarEnquiryForm;
