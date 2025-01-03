const SunstarEnquiryForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-600">
      <div className="w-full max-w-3xl bg-white shadow-lg md:rounded-lg p-8">
        <h1 className="text-center text-gray-800 text-mobile/h3 md:text-desktop/h3 font-bold mb-4">
          Sunstar Enquiry Form
        </h1>
        <p className="text-center text-gray-600 text-mobile/body/2 md:text-desktop/body/1 mb-8">
          Find out if your fleet meets our criteria
        </p>
        <form>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              placeholder="Email*"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Travel Head/Decision's Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 md:col-span-2"
            />
            <textarea
              placeholder="Your Enquiry"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 md:col-span-2"
              rows="4"
            ></textarea>
          </div>
          <div className="text-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-500 text-white text-mobile/button md:text-desktop/button font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
