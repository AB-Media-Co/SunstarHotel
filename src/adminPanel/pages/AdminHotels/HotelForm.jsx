/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAddHotel, useEditHotel, uploadImagesAPIV2 } from '../../../ApiHooks/useHotelHook2';
import MultipleImageUpload from '../../Components/MultipleImageUpload';
import useUpdatePagesHook from '../../../ApiHooks/useUpdatePagesHook';
import { AboutUsTab } from './Components/AboutUsTab';
import { TestimonialsTab } from './Components/TestimonialsTab';
import { ImagesTab } from './Components/ImagesTab';
import { LocationTab } from './Components/LocationTab';
import { DetailsTab } from './Components/DetailsTab';

const MultipleImagesTab = ({
  formData,
  isUploading,
  newSectionHeading,
  setNewSectionHeading,
  handleCarouselImagesUpload,
  handleRemoveCarouselImage,
  handleAddImageSection,
  handleSectionHeadingChange,
  handleRemoveImageSection,
  handleSectionImagesUpload,
  handleRemoveSectionImageUrl
}) => (
  <div className="space-y-8">
    {/* Carousel Images Panel */}
    <div className="">
      <h3 className="text-xl font-bold mb-4">Carousel Images</h3>
      <MultipleImageUpload
        onUploadSuccess={files => handleCarouselImagesUpload(files)}
        isUploading={isUploading}
        imagesUrls={formData?.imageSections?.carouselImages}
        onRemoveImageUrl={handleRemoveCarouselImage}
      />
    </div>
    {/* Image Sections Panel */}
    <div className="">
      <h3 className="text-xl font-bold mb-4">Image Sections</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          value={newSectionHeading}
          onChange={e => setNewSectionHeading(e.target.value)}
          placeholder="Section Heading (e.g., Lobby, King Size Room)"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="button"
          onClick={handleAddImageSection}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add Section
        </button>
      </div>
      <h1 className='text-2xl font-semibold'>Heading</h1>
      {formData?.imageSections?.sections?.length > 0 ? (
        formData.imageSections.sections.map((section, index) => (
          <div key={index} className="p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <input
                type="text"
                value={section.heading}
                onChange={e => handleSectionHeadingChange(index, e.target.value)}
                placeholder="Section Heading"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveImageSection(index)}
                className="mt-2 sm:mt-0 sm:ml-4 text-red-500 hover:underline"
              >
                Remove Section
              </button>
            </div>
            <MultipleImageUpload
              onUploadSuccess={files => handleSectionImagesUpload(index, files)}
              isUploading={isUploading}
              imagesUrls={section.images}
              onRemoveImageUrl={url => handleRemoveSectionImageUrl(index, url)}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-600 italic">No image sections added yet.</p>
      )}
    </div>
  </div>
);

const HotelForm = ({ initialData = null }) => {
  const isEditMode = Boolean(initialData);
  const navigate = useNavigate();
  const { amenities } = useUpdatePagesHook();

  // Helper for initial transport values
  const getInitialTransportValue = (field) => {
    const value = initialData?.location?.[field];
    if (typeof value === 'string') return value;
    if (Array.isArray(value) && value.length > 0) return value[0].name || '';
    return '';
  };

  // Transform old imageSections structure if necessary to match schema: { sections: [], carouselImages: [] }
  const transformImageSections = (data) => {
    if (!data) return { sections: [], carouselImages: [] };
    if (Array.isArray(data.sections) && Array.isArray(data.carouselImages)) {
      return data;
    }
    if (data.images) {
      return { sections: [], carouselImages: data.images };
    }
    return { sections: [], carouselImages: [] };
  };
  const initialImageSections = transformImageSections(initialData?.imageSections);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    location: {
      hotelAddress: initialData?.location?.hotelAddress || '',
      metro: getInitialTransportValue('metro'),
      airport: getInitialTransportValue('airport'),
      railwayStation: getInitialTransportValue('railwayStation'),
      attractions: initialData?.location?.attractions || [],
      restaurants: initialData?.location?.restaurants || [],
      activities: initialData?.location?.activities || [],
      nightlife: initialData?.location?.nightlife || []
    },
    amenities: initialData?.amenities || [],
    rating: initialData?.rating || 0,
    price: initialData?.price || 0,
    discountedPrice: initialData?.discountedPrice || 0,
    soldOut: initialData?.soldOut || false,
    // New field: Pay at Hotel (defaults to "no")
    payAtHotel: initialData?.payAtHotel || "no",
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
    imageSections: initialImageSections,
    cityLocation: initialData?.cityLocation || '',

    // Initialize FAQs (new field)
    faqs: initialData?.faqs || [],
    addToYourStay: initialData?.addToYourStay || [],
    continentalPlan: initialData?.continentalPlan || { rate: { amount: 0, period: 'per person' } },

  });

  // State for new FAQ input
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });
  const [currentTab, setCurrentTab] = useState('details');
  const [locationInputs, setLocationInputs] = useState({
    attractions: { name: '' },
    restaurants: { name: '' },
    activities: { name: '' },
    nightlife: { name: '' },
  });
  const [testimonialInput, setTestimonialInput] = useState({
    name: '',
    location: '',
    description: '',
    heading: '',
  });
  const [newSectionHeading, setNewSectionHeading] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  // const [, setIsAboutUsUploading] = useState(false);

  const { mutate: addHotel } = useAddHotel();
  const { mutate: editHotel } = useEditHotel();

  const handleTabChange = tabName => setCurrentTab(tabName);

  const handleDetailsChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "payAtHotel" ? (checked ? "yes" : "no") : type === 'checkbox' ? checked : value,
    }));
  };

  const handleAboutUsChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      aboutUs: { ...prev.aboutUs, [name]: value }
    }));
  };
  const handleAboutUsFeatureChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      aboutUs: { ...prev.aboutUs, [key]: value }
    }));
  };

  const handleTestimonialChange = e => {
    const { name, value } = e.target;
    setTestimonialInput(prev => ({ ...prev, [name]: value }));
  };
  const handleAddTestimonial = () => {
    const { name, location, description, heading } = testimonialInput;
    if (name.trim() && location.trim() && description.trim() && heading.trim()) {
      setFormData(prev => ({
        ...prev,
        testimonials: [
          ...prev.testimonials,
          { name: name.trim(), location: location.trim(), description: description.trim(), heading: heading.trim() }
        ]
      }));
      setTestimonialInput({ name: '', location: '', description: '', heading: '' });
    } else {
      toast.error('Please fill in all testimonial fields');
    }
  };
  const handleRemoveTestimonial = index => {
    setFormData(prev => {
      const newTestimonials = [...prev.testimonials];
      newTestimonials.splice(index, 1);
      return { ...prev, testimonials: newTestimonials };
    });
  };

  // FAQ Handlers
  const handleFAQChange = (field, value) => {
    setNewFAQ(prev => ({ ...prev, [field]: value }));
  };
  const handleAddFAQ = () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim()) {
      return toast.error('Please fill in both question and answer for the FAQ.');
    }
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: newFAQ.question.trim(), answer: newFAQ.answer.trim() }]
    }));
    setNewFAQ({ question: '', answer: '' });
  };
  const handleRemoveFAQ = index => {
    setFormData(prev => {
      const newFAQs = [...prev.faqs];
      newFAQs.splice(index, 1);
      return { ...prev, faqs: newFAQs };
    });
  };

  const handleImagesUpload = async selectedFiles => {
    if (!selectedFiles.length) return toast.error('No images selected');
    setIsUploading(true);
    try {
      const data = await uploadImagesAPIV2(selectedFiles);
      const uploadedUrls = Array.isArray(data) ? data : [data];
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls[0].imageUrls],
      }));
      toast.success('Images uploaded successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsUploading(false);
  };
  const handleRemoveImageUrl = url => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== url)
    }));
  };

  const handleLocationInputChange = (category, field, value) => {
    setLocationInputs(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };
  const addLocationItem = category => {
    const { name } = locationInputs[category];
    if (!name.trim()) return toast.error(`Please provide a name for ${category}`);
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [category]: [...(prev.location[category] || []), { name: name.trim() }]
      }
    }));
    setLocationInputs(prev => ({ ...prev, [category]: { name: '' } }));
  };
  const removeLocationItem = (category, index) => {
    setFormData(prev => {
      const updated = [...(prev.location[category] || [])];
      updated.splice(index, 1);
      return { ...prev, location: { ...prev.location, [category]: updated } };
    });
  };

  const handleHotelAddressChange = e => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: { ...prev.location, hotelAddress: value }
    }));
  };
  const handleTransportChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      location: { ...prev.location, [category]: value }
    }));
  };

  // Handlers for the Multiple Images tab
  const handleCarouselImagesUpload = async selectedFiles => {
    if (!selectedFiles.length) return toast.error('No images selected for carousel');
    setIsUploading(true);
    try {
      const data = await uploadImagesAPIV2(selectedFiles);
      const uploadedUrls = Array.isArray(data) ? data : [data];
      setFormData(prev => ({
        ...prev,
        imageSections: {
          ...prev.imageSections,
          carouselImages: [...prev.imageSections.carouselImages, ...uploadedUrls[0].imageUrls]
        }
      }));
      toast.success('Carousel images uploaded successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsUploading(false);
  };
  const handleRemoveCarouselImage = url => {
    setFormData(prev => ({
      ...prev,
      imageSections: {
        ...prev.imageSections,
        carouselImages: prev.imageSections.carouselImages.filter(img => img !== url)
      }
    }));
  };

  const handleAddImageSection = () => {
    if (!newSectionHeading.trim()) return toast.error('Please provide a heading for the image section');
    setFormData(prev => ({
      ...prev,
      imageSections: {
        ...prev.imageSections,
        sections: [...prev.imageSections.sections, { heading: newSectionHeading.trim(), images: [] }]
      }
    }));
    setNewSectionHeading('');
  };
  const handleSectionHeadingChange = (index, value) => {
    setFormData(prev => {
      const newSections = [...prev.imageSections.sections];
      newSections[index].heading = value;
      return { ...prev, imageSections: { ...prev.imageSections, sections: newSections } };
    });
  };
  const handleSectionImagesUpload = async (index, selectedFiles) => {
    if (!selectedFiles.length) return toast.error('No images selected for this section');
    setIsUploading(true);
    try {
      const data = await uploadImagesAPIV2(selectedFiles);
      const uploadedUrls = Array.isArray(data) ? data : [data];
      setFormData(prev => {
        const newSections = [...prev.imageSections.sections];
        newSections[index].images = [...newSections[index].images, ...uploadedUrls[0].imageUrls];
        return { ...prev, imageSections: { ...prev.imageSections, sections: newSections } };
      });
      toast.success('Section images uploaded successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsUploading(false);
  };
  const handleRemoveSectionImageUrl = (sectionIndex, url) => {
    setFormData(prev => {
      const newSections = [...prev.imageSections.sections];
      newSections[sectionIndex].images = newSections[sectionIndex].images.filter(img => img !== url);
      return { ...prev, imageSections: { ...prev.imageSections, sections: newSections } };
    });
  };
  const handleRemoveImageSection = sectionIndex => {
    setFormData(prev => {
      const newSections = [...prev.imageSections.sections];
      newSections.splice(sectionIndex, 1);
      return { ...prev, imageSections: { ...prev.imageSections, sections: newSections } };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...formData,
      location: {
        hotelAddress: formData.location.hotelAddress,
        metro: formData.location.metro ? [{ name: formData.location.metro }] : [],
        airport: formData.location.airport ? [{ name: formData.location.airport }] : [],
        railwayStation: formData.location.railwayStation ? [{ name: formData.location.railwayStation }] : [],
        attractions: formData.location.attractions,
        restaurants: formData.location.restaurants,
        activities: formData.location.activities,
        nightlife: formData.location.nightlife,
      },
      amenities: formData.amenities,
      rating: Number(formData.rating),
      price: Number(formData.price),
      discountedPrice: Number(formData.discountedPrice),
      aboutUs: {
        description: formData.aboutUs.description,
        img: formData.aboutUs.image,
      },
      imageSections: formData.imageSections,
      faqs: formData.faqs,

      cityLocation: formData.cityLocation,
      addToYourStay: formData.addToYourStay,
      continentalPlan: formData.continentalPlan
    };

    if (isEditMode) {
      editHotel({ hotelCode: formData.hotelCode, hotelData: payload }, {
        onSuccess: () => {
          toast.success('Hotel updated successfully!');
          navigate('/admin/hotels');
        },
        onError: error => toast.error(`Error updating hotel: ${error.message}`),
      });
    } else {
      addHotel(payload, {
        onSuccess: () => {
          toast.success('Hotel added successfully!');
          navigate('/admin/hotels');
        },
        onError: error => toast.error(`Error adding hotel: ${error.message}`),
      });
    }
  };

  const handleAmenitiesChange = (event, newValue) => {
    setFormData(prev => ({ ...prev, amenities: newValue }));
  };
  const handleCityLocationChange = e => {
    setFormData(prev => ({
      ...prev,
      cityLocation: e.target.value
    }));
  };

  const transportLocations = ['metro', 'airport', 'railwayStation'];
  const pointsOfInterest = ['attractions', 'restaurants', 'activities', 'nightlife'];
  console.log(formData)

  return (
    <div className="mx-auto py-16 px-8">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isEditMode ? 'Edit Hotel' : 'Add Hotel'}
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 border-b">
          {['details', 'aboutUs', 'location', 'images', 'multipleImages', 'testimonials', 'faqs', 'addToYourStay'].map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="relative text-xl px-4 py-2 mx-2 font-medium focus:outline-none transition-colors duration-300"
            >
              <span className={currentTab === tab ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}>
                {tab === 'multipleImages' ? 'Multiple Images' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
              <span className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${currentTab === tab ? 'w-full' : 'w-0'}`}></span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {currentTab === 'details' && (
            <DetailsTab
              formData={formData}
              handleDetailsChange={handleDetailsChange}
              amenities={amenities}
              handleAmenitiesChange={handleAmenitiesChange}
              setFormData={setFormData}
            />
          )}

          {currentTab === 'location' && (
            <LocationTab
              formData={formData}
              handleHotelAddressChange={handleHotelAddressChange}
              handleTransportChange={handleTransportChange}
              transportLocations={transportLocations}
              pointsOfInterest={pointsOfInterest}
              locationInputs={locationInputs}
              handleLocationInputChange={handleLocationInputChange}
              addLocationItem={addLocationItem}
              removeLocationItem={removeLocationItem}
              handleCityLocationChange={handleCityLocationChange}
            />
          )}

          {currentTab === 'images' && (
            <ImagesTab
              formData={formData}
              isUploading={isUploading}
              handleImagesUpload={handleImagesUpload}
              handleRemoveImageUrl={handleRemoveImageUrl}
            />
          )}

          {currentTab === 'multipleImages' && (
            <MultipleImagesTab
              formData={formData}
              isUploading={isUploading}
              newSectionHeading={newSectionHeading}
              setNewSectionHeading={setNewSectionHeading}
              handleCarouselImagesUpload={handleCarouselImagesUpload}
              handleRemoveCarouselImage={handleRemoveCarouselImage}
              handleAddImageSection={handleAddImageSection}
              handleSectionHeadingChange={handleSectionHeadingChange}
              handleRemoveImageSection={handleRemoveImageSection}
              handleSectionImagesUpload={handleSectionImagesUpload}
              handleRemoveSectionImageUrl={handleRemoveSectionImageUrl}
            />
          )}

          {currentTab === 'testimonials' && (
            <TestimonialsTab
              formData={formData}
              testimonialInput={testimonialInput}
              handleTestimonialChange={handleTestimonialChange}
              handleAddTestimonial={handleAddTestimonial}
              handleRemoveTestimonial={handleRemoveTestimonial}
            />
          )}

          {currentTab === 'aboutUs' && (
            <AboutUsTab
              formData={formData}
              handleAboutUsChange={handleAboutUsChange}
              handleAboutUsFeatureChange={handleAboutUsFeatureChange}
            />
          )}

          {currentTab === 'faqs' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">FAQs</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={newFAQ.question}
                    onChange={e => handleFAQChange('question', e.target.value)}
                    placeholder="FAQ Question"
                    className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <input
                    type="text"
                    value={newFAQ.answer}
                    onChange={e => handleFAQChange('answer', e.target.value)}
                    placeholder="FAQ Answer"
                    className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddFAQ}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Add FAQ
                  </button>
                </div>
                {formData.faqs.length > 0 ? (
                  formData.faqs.map((faq, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <p className="font-semibold">{faq.question}</p>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFAQ(index)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 italic">No FAQs added yet.</p>
                )}
              </div>
            </div>
          )}

          {currentTab === 'addToYourStay' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Add To Your Stay</h2>

              {formData.addToYourStay.length > 0 && formData.addToYourStay.map((item, index) => (
                <div key={index} className="border p-4 rounded-md space-y-2">
                  <input
                    type="text"
                    value={item.heading}
                    onChange={(e) => {
                      const updatedItems = [...formData.addToYourStay];
                      updatedItems[index].heading = e.target.value;
                      setFormData({ ...formData, addToYourStay: updatedItems });
                    }}
                    placeholder="Heading"
                    className="w-full border rounded-md p-2"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const updatedItems = [...formData.addToYourStay];
                      updatedItems[index].description = e.target.value;
                      setFormData({ ...formData, addToYourStay: updatedItems });
                    }}
                    placeholder="Description"
                    className="w-full border rounded-md p-2"
                  />
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={item.rate?.amount || 0}
                      onChange={(e) => {
                        const updatedItems = [...formData.addToYourStay];
                        updatedItems[index].rate = {
                          ...updatedItems[index].rate,
                          amount: Number(e.target.value)
                        };
                        setFormData({ ...formData, addToYourStay: updatedItems });
                      }}
                      placeholder="Rate Amount"
                      className="w-full border rounded-md p-2"
                    />
                    <select
                      value={item.rate?.period || ''}
                      onChange={(e) => {
                        const updatedItems = [...formData.addToYourStay];
                        updatedItems[index].rate = {
                          ...updatedItems[index].rate,
                          period: e.target.value
                        };
                        setFormData({ ...formData, addToYourStay: updatedItems });
                      }}
                      className="w-full border rounded-md p-2"
                    >
                      <option value="">Default</option>
                      <option value="per night">Per Night</option>
                      <option value="per day">Per Day</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedItems = formData.addToYourStay.filter((_, i) => i !== index);
                      setFormData({ ...formData, addToYourStay: updatedItems });
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Remove Entry
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    addToYourStay: [
                      ...formData.addToYourStay,
                      { heading: '', description: '', rate: { amount: 0, period: 'per night' } }
                    ]
                  });
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Add New Entry
              </button>
            </div>
          )}

          <div className="mt-8">
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-colors">
              {isEditMode ? 'Update Hotel' : 'Add Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelForm;
