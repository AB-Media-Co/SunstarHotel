import React, { useState } from 'react';
import {
  useCreateState,
  useGetStates,
  useCreatePackage,
  usePackages,
  useDeletePackage,
  useUpdatePackage,
  useUpdateState,
  useDeleteState,
} from '../../../ApiHooks/useTravelPackagesHook';
import MultipleImageUpload from '../../Components/MultipleImageUpload';
import ImageUpload from '../../Components/ImageUpload';
import toast from 'react-hot-toast';
import { uploadImagesAPIV2 } from '../../../ApiHooks/useHotelHook2';


const TourAndTravel = () => {
  const { data: states = [] } = useGetStates();
  const { data: packages = [] } = usePackages();
  const createState = useCreateState();
  const createPackage = useCreatePackage();
  const deletePackage = useDeletePackage();
  const updatePackage = useUpdatePackage();
  const updateState = useUpdateState();
  const deleteState = useDeleteState();

  const [stateForm, setStateForm] = useState({ name: '', image: '' });
  
  const [newHighlight, setNewHighlight] = useState('');
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');
  const [newItineraryDay, setNewItineraryDay] = useState('');
  const [newItineraryTitle, setNewItineraryTitle] = useState('');
  const [newItineraryDetails, setNewItineraryDetails] = useState('');
  const [isUploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState('states');
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [packageForm, setPackageForm] = useState({
    _id: undefined,
    stateId: '',
    title: '',
    images:images,
    duration: { nights: '', days: '' },
    price: '',
    highlights: [],
    inclusions: [],
    exclusions: [],
    description: '',
    itinerary: [],
    topSelling: false,
  });
  const handleStateChange = (key, value) => {
    setStateForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePackageChange = (key, value) => {
    if (key.includes('duration.')) {
      const subKey = key.split('.')[1];
      setPackageForm((prev) => ({
        ...prev,
        duration: { ...prev.duration, [subKey]: value },
      }));
    } else if (key === 'topSelling') {
      setPackageForm((prev) => ({ ...prev, topSelling: !prev.topSelling }));
    } else if (key === 'images') {
      setPackageForm((prev) => ({ ...prev, images: value }));
    } else {
      setPackageForm((prev) => ({ ...prev, [key]: value }));
    }
  };


  const resetPackageForm = () => {
    setPackageForm({
      _id: undefined,
      stateId: '',
      title: '',
      images: [],
      duration: { nights: '', days: '' },
      price: '',
      highlights: [],
      inclusions: [],
      exclusions: [],
      description: '',
      itinerary: [],
      topSelling: false,
    });
    setImages([]);
  };

  const handleCreateOrUpdatePackage = () => {
    if (!packageForm.stateId || !packageForm.title || !packageForm.images) {
      alert('Please fill in all required fields (State, Title, and Image)');
      return;
    }
    if (packageForm._id) {
      updatePackage.mutate(packageForm, { onSuccess: resetPackageForm });
    } else {
      createPackage.mutate(packageForm, { onSuccess: resetPackageForm });
    }
  };

  const handleEditPackage = (pkg) => {
    console.log(pkg)
    setPackageForm(pkg);
    setActiveTab('packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage.mutate(id);
    }
  };


  const handleImageUpload = async (selectedFiles) => {
    if (selectedFiles.length === 0) {
      toast.error("No images selected");
      return;
    }
    setIsUploading(true);
    try {
      const data = await uploadImagesAPIV2(selectedFiles);
      const uploadedUrls = Array.isArray(data) ? data : [data];
      const newImageUrls = uploadedUrls[0].imageUrls;
      setImages((prev) => [...prev, ...newImageUrls]);
      setPackageForm((prev) => ({
        ...prev,
        images: [...prev.images, ...newImageUrls],
      }));
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images");
    }
    setIsUploading(false);
  };

  const handleRemoveImageUrl = (url) => {
    setPackageForm(prev => ({
      ...prev,
      images: prev.images?.filter(img => img !== url)
      ,
    }));
  };



  const handleAddItinerary = () => {
    if (!newItineraryDay || !newItineraryTitle || !newItineraryDetails) return;

    const newItem = {
      day: newItineraryDay,
      title: newItineraryTitle,
      details: newItineraryDetails,
    };

    setPackageForm(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, newItem],
    }));

    // Reset fields
    setNewItineraryDay('');
    setNewItineraryTitle('');
    setNewItineraryDetails('');
  };

  const handleRemoveItinerary = (index) => {
    setPackageForm(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };


  const resetStateForm = () =>
    setStateForm({ _id: '', name: '', image: '' });

  const handleCreateOrUpdateState = () => {
    if (!stateForm.name || !stateForm.image) {
      alert('Please fill in State Name and Image');
      return;
    }

    if (stateForm._id) {
      updateState.mutate(stateForm, { onSuccess: resetStateForm });
    } else {
      createState.mutate(stateForm, { onSuccess: resetStateForm });
    }
  };

  const handleEditState = (st) => {
    setStateForm(st);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteState = (id) => {
    if (window.confirm('Delete this state?')) {
      deleteState.mutate(id);
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tour and Travel Management</h1>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'states' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('states')}
        >
          States
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'packages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('packages')}
        >
          Packages
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'view' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('view')}
        >
          View Packages
        </button>
      </div>

      {/* States Tab */}
      {activeTab === 'states' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New State</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state name"
                value={stateForm.name}
                onChange={(e) => handleStateChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State Image</label>
              <ImageUpload
                feature={stateForm}
                handleFeatureChange={handleStateChange}
                setImageUpload={setUploadingImage}
                index={0}
              />
            </div>
          </div>


          <div className="flex gap-4 mt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
              onClick={handleCreateOrUpdateState}
              disabled={isUploadingImage}
            >
              {isUploadingImage
                ? 'Uploading…'
                : stateForm._id
                  ? 'Update State'
                  : 'Create State'}
            </button>

            {stateForm._id && (
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                onClick={resetStateForm}
              >
                Cancel
              </button>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mt-10 mb-4">
            All States
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {states.map((st) => (
              <div
                key={st._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={st.image}
                  alt={st.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex justify-between items-center">
                  <h4 className="text-lg font-medium text-gray-800">{st.name}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditState(st)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteState(st._id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}



      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {packageForm._id ? 'Edit Package' : 'Create New Package'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select State*</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={packageForm.stateId}
                onChange={(e) => handlePackageChange('stateId', e.target.value)}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>{state.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Title*</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter package title"
                value={packageForm.title}
                onChange={(e) => handlePackageChange('title', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Image*</label>
            <MultipleImageUpload
              onUploadSuccess={handleImageUpload}
              isUploading={isUploading}
              imagesUrls={packageForm.images}
              onRemoveImageUrl={handleRemoveImageUrl}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nights</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Number of nights"
                value={packageForm.duration.nights}
                onChange={(e) => handlePackageChange('duration.nights', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Number of days"
                value={packageForm.duration.days}
                onChange={(e) => handlePackageChange('duration.days', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Package price"
                value={packageForm.price}
                onChange={(e) => handlePackageChange('price', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Package description"
              value={packageForm.description}
              onChange={(e) => handlePackageChange('description', e.target.value)}
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="topSelling"
              checked={packageForm.topSelling}
              onChange={() => handlePackageChange('topSelling')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="topSelling" className="ml-2 block text-sm text-gray-700">
              Mark as Top Selling Package
            </label>
          </div>



          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Itinerary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Day (e.g., Day 1)"
                  value={newItineraryDay}
                  onChange={(e) => setNewItineraryDay(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Title (e.g., Arrival at Jammu)"
                  value={newItineraryTitle}
                  onChange={(e) => setNewItineraryTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Details (e.g., Pickup from airport)"
                  value={newItineraryDetails}
                  onChange={(e) => setNewItineraryDetails(e.target.value)}
                />
              </div>
            </div>

            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 mb-4"
              onClick={handleAddItinerary}
            >
              Add Itinerary Item
            </button>

            <div className="space-y-3">
              {packageForm.itinerary.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-800">{item.day}</h5>
                      <h5 className="font-medium text-gray-800">{item.title}</h5>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-800 ml-2"
                      onClick={() => handleRemoveItinerary(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Section */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Highlights</h4>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="Add highlight"
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                onClick={() => {
                  setPackageForm(prev => ({ ...prev, highlights: [...prev.highlights, newHighlight] }));
                  setNewHighlight('');
                }}
              >
                Add
              </button>
            </div>
            <ul className="space-y-1">
              {packageForm.highlights.map((h, i) => (
                <li key={i} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                  <span>{h}</span>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => setPackageForm(prev => ({ ...prev, highlights: prev.highlights.filter((_, idx) => idx !== i) }))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>



          {/* Inclusions Section */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Inclusions</h4>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newInclusion}
                onChange={(e) => setNewInclusion(e.target.value)}
                placeholder="Add inclusion"
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                onClick={() => {
                  setPackageForm(prev => ({ ...prev, inclusions: [...prev.inclusions, newInclusion] }));
                  setNewInclusion('');
                }}
              >
                Add
              </button>
            </div>
            <ul className="space-y-1">
              {packageForm.inclusions.map((h, i) => (
                <li key={i} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                  <span>{h}</span>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => setPackageForm(prev => ({ ...prev, inclusions: prev.inclusions.filter((_, idx) => idx !== i) }))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions Section */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Exclusions</h4>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                placeholder="Add exclusion"
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                onClick={() => {
                  setPackageForm(prev => ({ ...prev, exclusions: [...prev.exclusions, newExclusion] }));
                  setNewExclusion('');
                }}
              >
                Add
              </button>
            </div>
            <ul className="space-y-1">
              {packageForm.exclusions.map((h, i) => (
                <li key={i} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                  <span>{h}</span>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => setPackageForm(prev => ({ ...prev, exclusions: prev.exclusions.filter((_, idx) => idx !== i) }))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
              onClick={handleCreateOrUpdatePackage}
              disabled={isUploadingImage}
            >
              {isUploadingImage ? 'Uploading...' : packageForm._id ? 'Update Package' : 'Create Package'}
            </button>
            {packageForm._id && (
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                onClick={resetPackageForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* View Packages Tab */}
      {activeTab === 'view' && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <img
                    src={pkg.images[0]}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  {pkg.topSelling && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Top Selling
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-blue-600">₹{pkg.price}</span>
                    <span className="text-sm text-gray-500">
                      {pkg.duration.nights}N/{pkg.duration.days}D
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded text-sm transition duration-200"
                      onClick={() => handleEditPackage(pkg)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded text-sm transition duration-200"
                      onClick={() => handleDeletePackage(pkg._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourAndTravel;