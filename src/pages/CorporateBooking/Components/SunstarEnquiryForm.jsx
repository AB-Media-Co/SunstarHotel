
const SunstarEnquiryForm = () => {
  return (
    <div className="flex justify-center items-center  bg-[#FDC114] ">
      <div className="w-full max-w-2xl py-10 px-8 ">
        <h1 className="text-center text-white text-[52px] font-bold mb-2">Sunstar Enquiry Form</h1>
        <p className="text-center text-white text-[24px] mb-6">Find out if your fleet meets our criteria</p>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              type="email"
              placeholder="Email*"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              type="text"
              placeholder="Travel Head/Decision's name"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 col-span-2"
            />
            <textarea
              placeholder="Your Enquiry"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 col-span-2"
              rows="4"
            ></textarea>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SunstarEnquiryForm;
