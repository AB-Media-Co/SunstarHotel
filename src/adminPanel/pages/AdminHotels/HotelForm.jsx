/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Autocomplete, TextField } from '@mui/material';
import { useAddHotel, useEditHotel, uploadImagesAPIV2 } from '../../../ApiHooks/useHotelHook2';
import MultipleImageUpload from '../../Components/MultipleImageUpload';
import useUpdatePagesHook from '../../../ApiHooks/useUpdatePagesHook';
import ImageUpload from '../../Components/ImageUpload'; // adjust the path as needed

// A simple reusable star rating component
const StarRating = ({ rating, onChange, maxRating = 5 }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(starValue)}
            className={`text-4xl focus:outline-none ${starValue <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

const HotelForm = ({ initialData = null }) => {
  const isEditMode = Boolean(initialData);
  const navigate = useNavigate();
  const { amenities } = useUpdatePagesHook();
  const { locations } = useUpdatePagesHook();

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    amenities: initialData?.amenities || [],
    rating: initialData?.rating || 0,
    price: initialData?.price || 0,
    discountedPrice: initialData?.discountedPrice || 0,
    soldOut: initialData?.soldOut || false,
    hotelCode: initialData?.hotelCode || '',
    authKey: initialData?.authKey || '',
    images: initialData?.images || [],
    testimonials: initialData?.testimonials || [],
    checkIn: initialData?.checkIn || '',
    checkOut: initialData?.checkOut || '',
    aboutUs: {
      description: initialData?.aboutUs?.description || '',
      image: initialData?.aboutUs?.img || '',
    },
  });

  // For tab management: 'details', 'images', 'testimonials', 'aboutUs'
  const [currentTab, setCurrentTab] = useState('details');

  // State for new testimonial inputs
  const [testimonialInput, setTestimonialInput] = useState({
    name: '',
    description: '',
    rating: 0,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [, setIsAboutUsUploading] = useState(false);

  const { mutate: addHotel } = useAddHotel();
  const { mutate: editHotel } = useEditHotel();

  const handleTabChange = (tabName) => {
    setCurrentTab(tabName);
  };

  const handleDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handler for About Us text changes
  const handleAboutUsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      aboutUs: {
        ...prev.aboutUs,
        [name]: value,
      },
    }));
  };

  // Handler for updating About Us feature (used by ImageUpload)
  const handleAboutUsFeatureChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      aboutUs: {
        ...prev.aboutUs,
        [key]: value,
      },
    }));
  };

  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setTestimonialInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTestimonial = () => {
    if (
      testimonialInput.name.trim() &&
      testimonialInput.description.trim() &&
      testimonialInput.rating
    ) {
      setFormData((prev) => ({
        ...prev,
        testimonials: [
          ...prev.testimonials,
          {
            name: testimonialInput.name,
            description: testimonialInput.description,
            rating: Number(testimonialInput.rating),
          },
        ],
      }));
      setTestimonialInput({ name: '', description: '', rating: 0 });
    } else {
      toast.error('Please fill in all testimonial fields');
    }
  };

  const handleRemoveTestimonial = (index) => {
    setFormData((prev) => {
      const newTestimonials = [...prev.testimonials];
      newTestimonials.splice(index, 1);
      return { ...prev, testimonials: newTestimonials };
    });
  };

  const handleImagesUpload = async (selectedFiles) => {
    if (selectedFiles.length === 0) {
      toast.error('No images selected');
      return;
    }
    setIsUploading(true);
    try {
      const data = await uploadImagesAPIV2(selectedFiles);
      const uploadedUrls = Array.isArray(data) ? data : [data];
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls[0].imageUrls],
      }));
      toast.success('Images uploaded successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsUploading(false);
  };

  // Handler to remove an already uploaded image URL.
  const handleRemoveImageUrl = (url) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create payload and convert aboutUs.image to aboutUs.img for the schema
    const payload = {
      ...formData,
      amenities: formData.amenities,
      rating: Number(formData.rating),
      price: Number(formData.price),
      discountedPrice: Number(formData.discountedPrice),
      aboutUs: {
        description: formData.aboutUs.description,
        img: formData.aboutUs.image, // convert key "image" to "img"
      },
    };

    console.log(payload);

    if (isEditMode) {
      // Update the hotel using hotelCode as the identifier
      editHotel(
        { hotelCode: formData.hotelCode, hotelData: payload },
        {
          onSuccess: () => {
            toast.success('Hotel updated successfully!');
            navigate('/admin/hotels');
          },
          onError: (error) => {
            toast.error(`Error updating hotel: ${error.message}`);
          },
        }
      );
    } else {
      addHotel(payload, {
        onSuccess: () => {
          toast.success('Hotel added successfully!');
          navigate('/admin/hotels');
        },
        onError: (error) => {
          toast.error(`Error adding hotel: ${error.message}`);
        },
      });
    }
  };

  const handleAmenitiesChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      amenities: newValue, // yahan newValue already objects { label, value } ke form me honge
    }));
  };


  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setFormData((prev) => ({
      ...prev,
      location: selectedLocation,
    }));
  };


  console.log(formData)
  return (
    <div className="mx-auto py-16 px-8">
      <div className="bg-white p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isEditMode ? 'Edit Hotel' : 'Add Hotel'}
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 border-b">
          {['details', 'images', 'testimonials', 'aboutUs'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="relative text-xl px-4 py-2 mx-2 font-medium focus:outline-none transition-colors duration-300 ease-in-out"
            >
              <span className={currentTab === tab ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
              {/* Animated Underline */}
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out ${currentTab === tab ? 'w-full' : 'w-0'
                  }`}
              ></span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* DETAILS TAB */}
          {currentTab === 'details' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleDetailsChange}
                    required
                    placeholder="Enter hotel name"
                    className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Rating:</label>
                  <StarRating
                    rating={formData.rating}
                    onChange={(newRating) =>
                      setFormData((prev) => ({ ...prev, rating: newRating }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleDetailsChange}
                  required
                  placeholder="Enter description"
                  className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Location:</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleLocationChange}
                  required
                  className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                >
                  <option value="">Select location</option>
                  {locations.map((location) => (
                    <option key={location._id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Amenities:</label>
                <Autocomplete
                  multiple
                  id="amenities-select"
                  options={amenities.map((amenity) => ({
                    label: amenity.label,
                    value: amenity.value,
                  }))}
                  value={formData.amenities}  // ab directly objects ke array ko use karenge
                  onChange={handleAmenitiesChange}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Select amenities" placeholder="Select amenities" />
                  )}
                />

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleDetailsChange}
                    min="0"
                    placeholder="Price"
                    className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Discounted Price:</label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleDetailsChange}
                    min="0"
                    placeholder="Discounted Price"
                    className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
              {/* New Check In and Check Out fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Check In:</label>
                  <input
                    type="time"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleDetailsChange}
                    placeholder="Enter check in time"
                    className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Check Out:</label>
                  <input
                    type="time"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleDetailsChange}
                    placeholder="Enter check out time"
                    className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="soldOut"
                  checked={formData.soldOut}
                  onChange={handleDetailsChange}
                  className="mr-2"
                />
                <label className="text-gray-700 font-medium">Sold Out</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Hotel Code:</label>
                  <input
                    type="text"
                    name="hotelCode"
                    value={formData.hotelCode}
                    onChange={handleDetailsChange}
                    required
                    placeholder="Enter hotel code"
                    className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Auth Key:</label>
                  <input
                    type="text"
                    name="authKey"
                    value={formData.authKey}
                    onChange={handleDetailsChange}
                    required
                    placeholder="Enter authentication key"
                    className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* IMAGES TAB */}
          {currentTab === 'images' && (
            <div className="space-y-5">
              <MultipleImageUpload
                onUploadSuccess={handleImagesUpload}
                isUploading={isUploading}
                imagesUrls={formData.images}
                onRemoveImageUrl={handleRemoveImageUrl}
              />
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {currentTab === 'testimonials' && (
            <div className="space-y-5">
              <div>
                {formData.testimonials && formData.testimonials.length > 0 ? (
                  formData.testimonials.map((testimonial, index) => (
                    <div key={index} className="border rounded-md p-4 mb-3 shadow-sm">
                      <p className="text-gray-800">
                        <strong>Name:</strong> {testimonial.name}
                      </p>
                      <p className="text-gray-800">
                        <strong>Description:</strong> {testimonial.description}
                      </p>
                      <p className="text-gray-800">
                        <strong>Rating:</strong> {testimonial.rating}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemoveTestimonial(index)}
                        className="text-red-500 mt-2 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No testimonials added yet.</p>
                )}
              </div>
              <div className="border rounded-md p-4 shadow-sm">
                <h3 className="text-lg font-bold mb-3">Add Testimonial</h3>
                <div className="mb-3">
                  <label className="block text-gray-700 font-medium mb-1">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={testimonialInput.name}
                    onChange={handleTestimonialChange}
                    placeholder="Enter name"
                    className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 font-medium mb-1">Description:</label>
                  <textarea
                    name="description"
                    value={testimonialInput.description}
                    onChange={handleTestimonialChange}
                    placeholder="Enter testimonial description"
                    className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 font-medium mb-1">Rating:</label>
                  <StarRating
                    rating={testimonialInput.rating}
                    onChange={(newRating) =>
                      setTestimonialInput((prev) => ({ ...prev, rating: newRating }))
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition-colors"
                >
                  Add Testimonial
                </button>
              </div>
            </div>
          )}

          {/* ABOUT US TAB */}
          {currentTab === 'aboutUs' && (
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">About Us Description:</label>
                <textarea
                  name="description"
                  value={formData.aboutUs.description}
                  onChange={handleAboutUsChange}
                  placeholder="Enter about us description"
                  className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">About Us Image:</label>
                <ImageUpload
                  feature={formData.aboutUs}
                  handleFeatureChange={handleAboutUsFeatureChange}
                  setImageUpload={setIsAboutUsUploading}
                  index={0}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-colors"
            >
              {isEditMode ? 'Update Hotel' : 'Add Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelForm;
