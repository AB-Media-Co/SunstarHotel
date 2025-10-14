import { useState } from "react";
import CommonUseEnquiryForm from "../../../Components/CommonUseEnquiryForm";
import { useApplyForJob } from "../../../ApiHooks/useUser";

/* --- Small custom component for file upload (works with CommonUseEnquiryForm's "custom" type) --- */
const ResumeUpload = ({ value, error, onChange }) => (
  <div>

    <input
      type="file"
      accept=".pdf,.doc,.docx"
      onChange={(e) => onChange(e.target.files?.[0] || null)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 hover:file:bg-teal-100"
      required
    />
    {value && (
      <p className="text-xs text-gray-600 mt-1 truncate">
        Selected: {value.name}
      </p>
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

/* --- Page/section that uses CommonUseEnquiryForm --- */
const JobApplicationForm = () => {
  // optional local loading state if you want to disable the button externally too
  const { mutate: applyForJob, isPending } = useApplyForJob();
  const [loading, setLoading] = useState(false); // will mirror isPending for your existing prop

  const genderOptions = [
    // { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    // { label: "Other", value: "other" },
    // { label: "Prefer not to say", value: "prefer-not-to-say" },
  ];

  // fields config for CommonUseEnquiryForm
  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      required: true,
    },
    {
      name: "appliedFor",
      type: "text",
      placeholder: "Enter Applied for",
      required: true,
    },
    {
      name: "phoneNumber",
      type: "tel",
      placeholder: "Phone",
      required: true,
      className: "[-moz-appearance:textfield] [appearance:textfield]",
    },
    {
      name: "emailId",
      type: "email",
      placeholder: "Email",
      required: true,
    },
    {
      name: "gender",
      type: "dropdown",
      placeholder: "Select Gender",
      options: genderOptions,
      required: true,
    },
    {
      name: "resume",
      type: "custom",
      required: true,
      component: (props) => <ResumeUpload {...props} />,
    },
  ];

  // simple client-side checks for phone/email/file before sending
  const extraValidate = (payload) => {
    const errs = [];

    // phone (basic) – tweak as per your locale
    if (!/^\+?[0-9\s-]{7,15}$/.test(payload.phoneNumber || "")) {
      errs.push("Please enter a valid phone number.");
    }

    // email basic
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.emailId || "")) {
      errs.push("Please enter a valid email address.");
    }

    // resume checks
    const file = payload.resume;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!file) {
      errs.push("Resume is required.");
    } else {
      if (!allowed.includes(file.type)) errs.push("Resume must be a PDF or Word document.");
      const maxMB = 5;
      if (file.size > maxMB * 1024 * 1024) errs.push(`Resume must be ≤ ${maxMB}MB.`);
    }

    return errs;
  };

  const onSubmit = async (payload, callbacks) => {
    const problems = extraValidate(payload);
    if (problems.length) {
      callbacks.onError(problems.join(" "));
      alert(problems.join("\n"));
      return;
    }

    setLoading(true);
    applyForJob(
      {
        ...payload,
        submittedAt: payload.submittedAt || new Date().toISOString(),
      },
      {
        onSuccess: () => {
          callbacks.onSuccess();
        },
        onError: (err) => {
          callbacks.onError(err?.response?.data?.message || err.message || "Failed to submit form.");
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <CommonUseEnquiryForm
      title="APPLY HERE"
      subtitle="Whether you're looking for solutions or want to explore opportunities, we're here to collaborate with you."
      fields={fields}
      onSubmit={onSubmit}
      isLoading={loading}
      buttonLabel="Submit"
      loadingLabel="Submitting..."
      containerClassName="min-h-screen bg-primary-green"       // keeps your original look
      formClassName="space-y-6"                                 // nice spacing
    />
  );
};

export default JobApplicationForm;
