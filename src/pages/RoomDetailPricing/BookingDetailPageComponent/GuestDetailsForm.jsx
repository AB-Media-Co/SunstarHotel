export const GuestDetailsForm = () => (
  <div className="flex flex-col gap-6  bg-white ">
    <div className="flex items-center mb-6">
      <div className="w-1 h-8 bg-primary-green rounded-full mr-3" style={{ backgroundColor: "#058FA2" }}></div>
      <h2 className="text-3xl font-bold text-gray-800">Enter Your Details</h2>
    </div>    <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {[
        { id: "firstName", label: "First Name *", placeholder: "John", type: "text" },
        { id: "lastName", label: "Last Name *", placeholder: "Smith", type: "text" },
        { id: "email", label: "Email Address *", placeholder: "abc@example.com", type: "email" },
        { id: "mobile", label: "Mobile Number", placeholder: "+91 1234567896", type: "tel" },
      ].map(({ id, label, placeholder, type }) => (
        <div key={id} className="flex flex-col gap-2">
          <label htmlFor={id} className="block text-lg font-medium text-gray-700">
            {label}
          </label>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className="w-full h-[50px] shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-primary-green focus:border-primary-green"
          />
        </div>
      ))}
    </form>
  </div>
);
