/* eslint-disable react/prop-types */
import { useState } from 'react';

export const TestimonialsTab = ({
  formData,
  setFormData,
  testimonialInput,
  setTestimonialInput,
  handleAddTestimonial,
  handleRemoveTestimonial
}) => {
  // This local state keeps track of which testimonial (by index) is in edit mode.
  const [editIndex, setEditIndex] = useState(null);
  // Local state to hold the editable values temporarily.
  const [editValues, setEditValues] = useState({
    name: '',
    location: '',
    heading: '',
    description: ''
  });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditValues({ ...formData.testimonials[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (index) => {
    const updatedTestimonials = [...formData.testimonials];
    updatedTestimonials[index] = editValues;
    setFormData(prev => ({ ...prev, testimonials: updatedTestimonials }));
    setEditIndex(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  return (
    <div className="space-y-8">
      <div>
        {formData.testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow bg-white"
              >
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="heading"
                      value={editValues.heading}
                      onChange={handleEditChange}
                      placeholder="Edit Heading"
                      className="text-xl font-bold text-blue-600 mb-2 border rounded p-2 w-full"
                    />
                    <div className="mb-2">
                      <label className="font-medium">Name: </label>
                      <input
                        type="text"
                        name="name"
                        value={editValues.name}
                        onChange={handleEditChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium">Location: </label>
                      <input
                        type="text"
                        name="location"
                        value={editValues.location}
                        onChange={handleEditChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <textarea
                      name="description"
                      value={editValues.description}
                      onChange={handleEditChange}
                      placeholder="Edit testimonial description"
                      className="border rounded p-2 w-full mb-2"
                    />
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => handleEditSave(index)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleEditCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-xl font-bold text-blue-600 mb-2">
                      {testimonial.heading}
                    </h4>
                    <p className="text-gray-800 font-medium">
                      Name: <span className="font-normal">{testimonial.name}</span>
                    </p>
                    <p className="text-gray-800 font-medium">
                      Location: <span className="font-normal">{testimonial.location}</span>
                    </p>
                    <p className="text-gray-700 mt-2">{testimonial.description}</p>
                    <div className="flex gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => handleEditClick(index)}
                        className="inline-block text-blue-500 hover:underline font-medium"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveTestimonial(index)}
                        className="inline-block text-red-500 hover:underline font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
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
              onChange={(e) => {
                const { value } = e.target;
                setTestimonialInput(prev => ({ ...prev, name: value }));
              }}
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
              onChange={(e) => {
                const { value } = e.target;
                setTestimonialInput(prev => ({ ...prev, location: value }));
              }}
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
              onChange={(e) => {
                const { value } = e.target;
                setTestimonialInput(prev => ({ ...prev, heading: value }));
              }}
              placeholder="Enter heading"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={testimonialInput.description}
              onChange={(e) => {
                const { value } = e.target;
                setTestimonialInput(prev => ({ ...prev, description: value }));
              }}
              placeholder="Enter testimonial description"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            ></textarea>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddTestimonial}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-md transition-colors"
        >
          Add Testimonial
        </button>
      </div>
    </div>
  );
};
