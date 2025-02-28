export const TestimonialsTab = ({ formData, testimonialInput, handleTestimonialChange, handleAddTestimonial, handleRemoveTestimonial }) => (
    <div className="space-y-8">
      <div>
        {formData.testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.testimonials.map((testimonial, index) => (
              <div key={index} className="border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow bg-white">
                <h4 className="text-xl font-bold text-blue-600 mb-2">{testimonial.heading}</h4>
                <p className="text-gray-800 font-medium">
                  Name: <span className="font-normal">{testimonial.name}</span>
                </p>
                <p className="text-gray-800 font-medium">
                  Location: <span className="font-normal">{testimonial.location}</span>
                </p>
                <p className="text-gray-700 mt-2">{testimonial.description}</p>
                <button type="button" onClick={() => handleRemoveTestimonial(index)} className="mt-4 inline-block text-red-500 hover:underline font-medium">
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No testimonials added yet.</p>
        )}
      </div>
      <div className="border rounded-lg p-6 shadow-sm bg-gray-50">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Add Testimonial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={testimonialInput.name}
              onChange={handleTestimonialChange}
              placeholder="Enter name"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location:</label>
            <input
              type="text"
              name="location"
              value={testimonialInput.location}
              onChange={handleTestimonialChange}
              placeholder="Enter location"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Heading:</label>
            <input
              type="text"
              name="heading"
              value={testimonialInput.heading}
              onChange={handleTestimonialChange}
              placeholder="Enter heading"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={testimonialInput.description}
              onChange={handleTestimonialChange}
              placeholder="Enter testimonial description"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            ></textarea>
          </div>
        </div>
        <button type="button" onClick={handleAddTestimonial} className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-md transition-colors">
          Add Testimonial
        </button>
      </div>
    </div>
  );