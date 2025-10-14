import React, { useState } from 'react';
import { useVenues, useCreateVenue, useUpdateVenue, useDeleteVenue } from '../../../ApiHooks/useVenues';
import { Plus, Edit, Trash2, X, Search, Filter } from 'lucide-react';
import ImageUpload from '../../Components/ImageUpload';
import VenueLocationData from './VenueLocationData'; // <- venue locations wala component

const VenueManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [tab, setTab] = useState('venues'); // 'venues' | 'venueLocations'
  const [mode, setMode] = useState('create'); // 'create', 'edit'
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    search: '',
    minPrice: '',
    maxPrice: '',
    minCapacity: '',
    maxCapacity: '',
    minRating: '',
    isActive: true
  });
  const [showFilters, setShowFilters] = useState(false);

  // React Query hooks (ye fetch hoga chahe tab kuch bhi ho; agar aap chaho to hook me enabled option add kar sakte ho)
  const { data: venuesData, isLoading, error } = useVenues(filters);
  const createMutation = useCreateVenue();
  const updateMutation = useUpdateVenue();
  const deleteMutation = useDeleteVenue();

  const venues = venuesData?.data || [];

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    pricePerPlate: '',
    capacityMin: '',
    capacityMax: '',
    location: '',
    description: '',
    rating: 0,
    isActive: true
  });

  const handleFeatureChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const openModal = (venueMode, venue = null) => {
    setMode(venueMode);
    setSelectedVenue(venue);

    if (venue) {
      setFormData({
        name: venue.name || '',
        image: venue.image || '',
        pricePerPlate: venue.pricePerPlate || '',
        capacityMin: venue.capacityMin || '',
        capacityMax: venue.capacityMax || '',
        location: venue.location || '',
        description: venue.description || '',
        rating: venue.rating || 0,
        isActive: venue.isActive ?? true
      });
    } else {
      setFormData({
        name: '',
        image: '',
        pricePerPlate: '',
        capacityMin: '',
        capacityMax: '',
        location: '',
        description: '',
        rating: 0,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVenue(null);
    setIsImageUploading(false);
    setFormData({
      name: '',
      image: '',
      pricePerPlate: '',
      capacityMin: '',
      capacityMax: '',
      location: '',
      description: '',
      rating: 0,
      isActive: true
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Venue name is required';
    if (!formData.location.trim()) return 'Location is required';
    if (!formData.pricePerPlate || formData.pricePerPlate <= 0) return 'Valid price is required';
    if (!formData.capacityMin || formData.capacityMin <= 0) return 'Valid minimum capacity is required';
    if (!formData.capacityMax || formData.capacityMax <= 0) return 'Valid maximum capacity is required';
    if (Number(formData.capacityMin) > Number(formData.capacityMax)) return 'Min capacity cannot be greater than max capacity';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    if (isImageUploading) {
      alert('Please wait for image upload to complete');
      return;
    }

    const payload = {
      ...formData,
      pricePerPlate: Number(formData.pricePerPlate),
      capacityMin: Number(formData.capacityMin),
      capacityMax: Number(formData.capacityMax),
      rating: Number(formData.rating)
    };

    if (mode === 'create') {
      createMutation.mutate(payload, { onSuccess: () => closeModal() });
    } else if (mode === 'edit') {
      updateMutation.mutate({ id: selectedVenue._id, updates: payload }, { onSuccess: () => closeModal() });
    }
  };

  const handleDelete = (venue) => {
    if (window.confirm(`Are you sure you want to delete "${venue.name}"?`)) {
      deleteMutation.mutate(venue._id);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 12,
      search: '',
      minPrice: '',
      maxPrice: '',
      minCapacity: '',
      maxCapacity: '',
      minRating: '',
      isActive: true
    });
  };

  // -------- UI STARTS HERE --------
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">Error loading venues: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mt-20 mx-auto">

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6 flex gap-2">
          <button
            onClick={() => setTab('venues')}
            className={`px-4 py-2 rounded ${tab === 'venues' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
          >
            Venues
          </button>
          <button
            onClick={() => setTab('venueLocations')}
            className={`px-4 py-2 rounded ${tab === 'venueLocations' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
          >
            Venue Location Data
          </button>
        </div>

        {tab === 'venueLocations' && (
          <VenueLocationData />
        )}

        {/* ✅ Only render the Venues UI when 'venues' tab is active */}
        {tab === 'venues' && (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Venue Management</h1>
                  <p className="text-gray-600 mt-2">
                    {venuesData?.total || 0} venues found
                  </p>
                </div>
                <button
                  onClick={() => openModal('create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  Add New Venue
                </button>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search venues..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Filter size={20} />
                    Filters
                  </button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Capacity</label>
                        <input
                          type="number"
                          value={filters.minCapacity}
                          onChange={(e) => handleFilterChange('minCapacity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
                        <select
                          value={filters.minRating}
                          onChange={(e) => handleFilterChange('minRating', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Any Rating</option>
                          <option value="1">1+ Stars</option>
                          <option value="2">2+ Stars</option>
                          <option value="3">3+ Stars</option>
                          <option value="4">4+ Stars</option>
                          <option value="5">5 Stars</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={clearFilters}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Venues Grid */}
            {!isLoading && venues.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {venues.map((venue) => (
                  <div key={venue._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={venue.image || '/api/placeholder/300/200'}
                        alt={venue.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => { e.target.src = '/api/placeholder/300/200'; }}
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => openModal('edit', venue)}
                          className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-sm transition-colors"
                        >
                          <Edit size={16} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(venue)}
                          disabled={deleteMutation.isPending}
                          className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-sm transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                        venue.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {venue.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{venue.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{venue.location}</p>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xl font-bold text-green-600">
                          ₹{venue.pricePerPlate}/plate
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm text-gray-600">{venue.rating}/5</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        Capacity: {venue.capacityMin} - {venue.capacityMax} people
                      </div>

                      {venue.description && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {venue.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && venues.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <Search size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No venues found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or add a new venue.
                  </p>
                  <button
                    onClick={() => openModal('create')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Add Your First Venue
                  </button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {venuesData?.pages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFilterChange('page', filters.page - 1)}
                    disabled={filters.page === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>

                  {[...Array(Math.min(5, venuesData.pages))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handleFilterChange('page', page)}
                        className={`px-3 py-2 rounded-lg ${
                          filters.page === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handleFilterChange('page', filters.page + 1)}
                    disabled={filters.page === venuesData?.pages}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal (only for Venues tab) */}
      {tab === 'venues' && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {mode === 'create' ? 'Add New Venue' : 'Edit Venue'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFeatureChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter venue name"
                  />
                </div>

                {/* Image Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue Image</label>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <ImageUpload
                      feature={formData}
                      handleFeatureChange={handleFeatureChange}
                      setImageUpload={setIsImageUploading}
                      index={selectedVenue?._id || 'new'}
                    />

                    {/* Image Preview */}
                    {formData.image && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <div className="relative inline-block">
                          <img
                            src={formData.image}
                            alt="Venue preview"
                            className="w-full max-w-xs h-32 object-cover rounded-lg border shadow-sm"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <button
                            type="button"
                            onClick={() => handleFeatureChange('image', '')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Plate (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.pricePerPlate}
                    onChange={(e) => handleFeatureChange('pricePerPlate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => handleFeatureChange('rating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 4.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Capacity *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacityMin}
                    onChange={(e) => handleFeatureChange('capacityMin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacityMax}
                    onChange={(e) => handleFeatureChange('capacityMax', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => handleFeatureChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Mumbai, Maharashtra"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="4"
                    value={formData.description}
                    onChange={(e) => handleFeatureChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the venue, amenities, and special features..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleFeatureChange('isActive', e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Active (venue is available for bookings)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending || isImageUploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isImageUploading
                    ? 'Uploading Image...'
                    : createMutation.isPending || updateMutation.isPending
                    ? 'Saving...'
                    : mode === 'create'
                    ? 'Create Venue'
                    : 'Update Venue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueManagement;
