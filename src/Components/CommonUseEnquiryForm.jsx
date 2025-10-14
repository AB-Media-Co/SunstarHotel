/* eslint-disable react/prop-types */
import { useState } from "react";

// Reusable Input Components
export const InputField = ({ type = "text", placeholder, value, onChange, error, additionalClasses = "" }) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-4 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#404040] focus:border-transparent shadow-sm placeholder-[#404040] ${additionalClasses}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </>
);

export const TextAreaField = ({ placeholder, rows, value, onChange, error, additionalClasses = "" }) => (
  <>
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onChange}
      className={`w-full p-4 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#404040] focus:border-transparent shadow-sm placeholder-[#404040] ${additionalClasses}`}
    ></textarea>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </>
);

export const DropdownField = ({ placeholder, options, value, onChange, error, additionalClasses = "" }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className={`w-full p-4 pr-10 rounded-xl border appearance-none ${error ? 'border-red-500' : 'border-gray-200'} transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#404040] focus:border-transparent shadow-sm placeholder-primary-green bg-white ${additionalClasses}`}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {/* Custom dropdown arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export const Button = ({ label, onClick, additionalClasses = "", type = "submit" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full md:w-auto px-8 py-3 bg-[#404040] text-white font-semibold rounded-full shadow-lg transition duration-200 ease-in-out hover:bg-[#04788E] focus:outline-none focus:ring-2 focus:ring-yellow-300 ${additionalClasses}`}
  >
    {label}
  </button>
);

// Main Form Component
const CommonUseEnquiryForm = ({
  title,
  subtitle,
  fields = [],
  onSubmit,
  isLoading = false,
  containerClassName = "",
  formClassName = "",
  buttonLabel = "Submit",
  loadingLabel = "Submitting...",
  showResponseMessage = true,
}) => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (fieldName, value) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    setFormErrors((prev) => ({ ...prev, [fieldName]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const errors = {};

    const isEmpty = (val) => {
      if (typeof val === "string") return val.trim() === "";
      // treat null/undefined as empty; objects like File are "not empty" if truthy
      return val == null;
    };

    fields.forEach((field) => {
      const required = field.required !== false;
      const val = formValues[field.name];

      if (!required) return;

      switch (field.type) {
        case "custom": // e.g., File upload
          if (val == null) {
            errors[field.name] = `${field.label || field.placeholder} is required.`;
          }
          break;

        // text-like inputs (including dropdown & textarea) are strings
        case "text":
        case "email":
        case "tel":
        case "textarea":
        case "dropdown":
        default:
          if (isEmpty(val)) {
            errors[field.name] = `${field.label || field.placeholder} is required.`;
          }
          break;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formValues,
      submittedAt: new Date().toISOString(),
    };

    onSubmit(payload, {
      onSuccess: () => {
        if (showResponseMessage) {
          setResponseMsg("Form submitted successfully!");
        }
        setFormValues({});
      },
      onError: (error) => {
        if (showResponseMessage) {
          setResponseMsg("Failed to submit form. Please try again.");
        }
        console.error("Submission error:", error);
      },
    });
  };

  const renderField = (field) => {
    const value = formValues[field.name] || "";
    const error = formErrors[field.name] || "";

    switch (field.type) {
      case "textarea":
        return (
          <TextAreaField
            placeholder={field.placeholder}
            rows={field.rows || 4}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={error}
            additionalClasses={field.className || ""}
          />
        );
      case "dropdown":
        return (
          <DropdownField
            placeholder={field.placeholder}
            options={field.options || []}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={error}
            additionalClasses={field.className || ""}
          />
        );
      case "custom":
        return field.component({
          value,
          error,
          onChange: (val) => handleChange(field.name, val),
        });
      default:
        return (
          <InputField
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={error}
            additionalClasses={field.className || ""}
          />
        );
    }
  };

  return (
    <div id="form" className={`min-h-screen relative flex items-center justify-center bg-primary-yellow p-4 ${containerClassName}`}>
      <img src="/images/HomepageImages/round2.png" alt="" className="absolute -left-10 top-0 hidden md:block " />
      <div className="w-full max-w-3xl bg-white p-2 py-8 lg:p-8 rounded-3xl z-10 shadow-2xl">
        {title && (
          <h1 className="text-center text-[#404040] text-2xl md:text-4xl font-extrabold mb-4">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-center text-[#404040] text-sm md:text-base mb-8">
            {subtitle}
          </p>
        )}
        <form onSubmit={handleSubmit} className={formClassName}>
          <div className="w-full px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={`w-full col-span-1 ${field.type === 'textarea' ? 'sm:col-span-2' : ''
                    }`}
                >
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex justify-center items-center mx-auto max-w-[200px]">
            <Button label={isLoading ? loadingLabel : buttonLabel} />
          </div>
          {showResponseMessage && responseMsg && (
            <p className="mt-4 text-center text-sm text-[#404040]">{responseMsg}</p>
          )}
        </form>
      </div>
      <img src="/images/CoorporateBookingImg/FormImg.png" alt="" className="absolute hidden md:block right-0 bottom-0 z-0 " />
    </div>
  );
};

export default CommonUseEnquiryForm;