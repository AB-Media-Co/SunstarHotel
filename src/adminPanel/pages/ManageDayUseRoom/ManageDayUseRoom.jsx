import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { useGetHotels } from '../../../ApiHooks/useHotelHook2';
import { useMonthlyDayUseRooms, useUpdateDayUseAvailability, useBulkUpdateDayUseAvailability } from '../../../ApiHooks/useDayUseRoomHook';

const ManageDayUseRoom = () => {
  const [hotelCode, setHotelCode] = useState('');
  const [month, setMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newAvailability, setNewAvailability] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Bulk update states
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkSelectedHotels, setBulkSelectedHotels] = useState([]);
  const [bulkSelectedDate, setBulkSelectedDate] = useState('');
  const [bulkAvailability, setBulkAvailability] = useState('');
  const [bulkError, setBulkError] = useState('');

  const { data: hotels, isLoading: hotelsLoading, error: hotelsError } = useGetHotels();
  const { data, isLoading: roomLoading, error: roomError } = useMonthlyDayUseRooms(month, hotelCode);
  const updateMutation = useUpdateDayUseAvailability();
  const bulkUpdateMutation = useBulkUpdateDayUseAvailability();

  // Auto-clear success/error messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const openModal = (room, date, currentAvailability, hotelCode) => {
    setSelectedRoom(room);
    setSelectedDate(date);
    setNewAvailability(currentAvailability);
    setSelectedHotel(hotelCode);
    setIsOpen(true);
    setError('');
  };

  const openBulkModal = () => {
    setIsBulkModalOpen(true);
    setBulkSelectedHotels([]);
    setBulkSelectedDate('');
    setBulkAvailability('');
    setBulkError('');
  };

  const handleHotelSelection = (hotelCode) => {
    setBulkSelectedHotels(prev => {
      if (prev.includes(hotelCode)) {
        return prev.filter(code => code !== hotelCode);
      } else {
        return [...prev, hotelCode];
      }
    });
    setBulkError('');
  };

  const handleBulkSave = async () => {
    setBulkError('');
    
    if (!bulkSelectedDate || bulkSelectedHotels.length === 0 || bulkAvailability === '') {
      setBulkError('Please select date, hotels, and availability');
      return;
    }

    if (Number(bulkAvailability) < 0) {
      setBulkError('Availability cannot be negative');
      return;
    }

    try {
      // Get all rooms for selected hotels
      const updates = [];

      // Find all rooms for selected hotels from current data
      data?.data?.forEach(entry => {
        if (bulkSelectedHotels.includes(entry.hotel?.hotelCode?.toString())) {
          updates.push({
            hotelCode: entry.hotel.hotelCode.toString(),
            roomName: entry.room?.RoomName,
            timeSlot: 'Full Day',
            availability: Number(bulkAvailability)
          });
        }
      });

      if (updates.length === 0) {
        setBulkError('No rooms found for selected hotels');
        return;
      }

      const bulkUpdateData = {
        date: bulkSelectedDate,
        updates: updates
      };

      await bulkUpdateMutation.mutateAsync(bulkUpdateData);
      setSuccess(`Successfully updated ${updates.length} room(s) for ${bulkSelectedHotels.length} hotel(s)`);
      setIsBulkModalOpen(false);
    } catch (error) {
      setBulkError('Failed to update rooms. Please try again.');
    }
  };

  useEffect(() => {
    const now = new Date();
    const currentMonth = format(now, 'yyyy-MM');

    if (!month) {
      setMonth(currentMonth);
    }
  }, [hotels, hotelCode, month]);

  const handleSave = async () => {
    setError('');
    
    if (!newAvailability || Number(newAvailability) < 0) {
      setError('Please enter a valid availability number');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        hotelCode: selectedHotel,
        roomName: selectedRoom?.RoomName,
        date: selectedDate,
        timeSlot: 'Full Day',
        availability: Number(newAvailability),
      });
      setSuccess('Room availability updated successfully');
      setIsOpen(false);
    } catch (error) {
      setError('Failed to update availability. Please try again.');
    }
  };

  // Generate next 12 months including current
  const generateMonthOptions = () => {
    const now = new Date();
    const months = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const value = format(date, 'yyyy-MM');
      const label = format(date, 'MMMM yyyy');
      months.push({ value, label });
    }
    return months;
  };

  const monthOptions = generateMonthOptions();

  // Generate date options for bulk update (next 30 days)
  const generateDateOptions = () => {
    const now = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      const value = format(date, 'yyyy-MM-dd');
      const label = format(date, 'dd MMM yyyy');
      dates.push({ value, label });
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12'
    };
    
    return (
      <div className="flex items-center justify-center p-8">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-blue-600`}></div>
        <span className="ml-2 text-gray-600">{text}</span>
      </div>
    );
  };

  const FullPageLoader = () => (
    <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Request</h3>
          <p className="text-gray-600 text-sm">Please wait while we update your data...</p>
        </div>
      </div>
    </div>
  );

  const CardLoader = () => (
    <div className="bg-white shadow-sm rounded-xl mb-6 border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg border bg-gray-100">
              <div className="text-center">
                <div className="h-4 bg-gray-300 rounded w-12 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-8 mx-auto mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-10 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ErrorAlert = ({ message, onClose }) => (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-red-400 hover:text-red-600"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );

  const SuccessAlert = ({ message, onClose }) => (
    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-green-400 hover:text-green-600"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );

  if (hotelsLoading) {
    return (
      <div className="p-6 mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <div className="h-8 bg-gray-300 rounded w-80 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-64"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-32 mt-4 sm:mt-0"></div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-12 bg-gray-300 rounded w-full"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-12 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
          <LoadingSpinner size="lg" text="Loading hotels and room data..." />
        </div>
      </div>
    );
  }

  if (hotelsError) {
    return (
      <div className="p-6 mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Day Use Room Management</h1>
          <ErrorAlert message="Failed to load hotels. Please refresh the page." onClose={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Day Use Room Management</h1>
            <p className="text-gray-600 mt-1">Manage room availability across your properties</p>
          </div>
          <button
            onClick={openBulkModal}
            disabled={roomLoading || hotelsLoading}
            className="mt-4 sm:mt-0 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {roomLoading || hotelsLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              'Bulk Update'
            )}
          </button>
        </div>

        {/* Alerts */}
        {error && <ErrorAlert message={error} onClose={() => setError('')} />}
        {success && <SuccessAlert message={success} onClose={() => setSuccess('')} />}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hotel Selection
              </label>
              <select
                value={hotelCode}
                onChange={(e) => setHotelCode(e.target.value)}
                disabled={hotelsLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {hotelsLoading ? 'Loading hotels...' : 'All Hotels'}
                </option>
                {hotels?.hotels?.map((hotel) => (
                  <option key={hotel.hotelCode} value={hotel.hotelCode.toString()}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month Selection
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Month</option>
                {monthOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {roomLoading && (
          <div className="space-y-6">
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        )}

        {/* Global Loading Overlay */}
        {(updateMutation.isLoading || bulkUpdateMutation.isLoading) && <FullPageLoader />}

        {/* Error State */}
        {roomError && (
          <ErrorAlert message="Failed to load room data. Please try again." onClose={() => {}} />
        )}

        {/* Room Data */}
        {!roomLoading && data?.data?.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Room Data Found</h3>
            <p className="text-gray-600">Select a hotel and month to view room availability</p>
          </div>
        )}

        {!roomLoading && data?.data?.map((entry, idx) => (
          <div key={idx} className="bg-white shadow-sm rounded-xl mb-6 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {entry.hotel?.name || 'Unknown Hotel'}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {entry.room?.RoomName || 'Unknown Room'}
                  </p>
                </div>
                {entry.error && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Error
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {entry.error ? (
                <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="font-medium">{entry.error}</p>
                </div>
              ) : entry.monthData ? (
                <>
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span className="text-gray-700">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span className="text-gray-700">Sold Out</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {Object.entries(entry.monthData).map(([date, info]) => (
                      <div
                        key={date}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md transform hover:-translate-y-1 ${
                          info.soldOut 
                            ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                            : 'bg-green-50 border-green-200 hover:bg-green-100'
                        } ${updateMutation.isLoading ? 'pointer-events-none opacity-50' : ''}`}
                        onClick={() => openModal(entry.room, date, info.availability, entry?.hotel?.hotelCode)}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold text-gray-800 mb-1">
                            {format(new Date(date), 'dd MMM')}
                          </div>
                          <div className="text-xs text-gray-600 mb-1">
                            ₹{info.rate}
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            {info.availability} rooms
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No data available for this period
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Single Room Update Modal */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
                Update Room Availability
              </Dialog.Title>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Room:</p>
                <p className="font-medium text-gray-900">{selectedRoom?.RoomName}</p>
                <p className="text-sm text-gray-600 mt-2 mb-1">Date:</p>
                <p className="font-medium text-gray-900">{selectedDate}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Availability
                </label>
                <input
                  type="number"
                  min="0"
                  value={newAvailability}
                  onChange={(e) => setNewAvailability(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter new availability"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={updateMutation.isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {updateMutation.isLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Bulk Update Modal */}
        <Dialog open={isBulkModalOpen} onClose={() => setIsBulkModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-6">
                Bulk Update Room Availability
              </Dialog.Title>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <select
                  value={bulkSelectedDate}
                  onChange={(e) => setBulkSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Choose a date</option>
                  {dateOptions.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hotel Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Hotels 
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    {bulkSelectedHotels.length} selected
                  </span>
                </label>
                <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-50">
                  {hotels?.hotels
                    ?.filter((hotel) => hotel?.isDayUseRoom)
                    .map((hotel) => (
                      <div key={hotel.hotelCode} className="flex items-center p-2 hover:bg-white rounded-lg transition-colors duration-200">
                        <input
                          type="checkbox"
                          id={`hotel-${hotel.hotelCode}`}
                          checked={bulkSelectedHotels.includes(hotel.hotelCode.toString())}
                          onChange={() => handleHotelSelection(hotel.hotelCode.toString())}
                          className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label
                          htmlFor={`hotel-${hotel.hotelCode}`}
                          className="ml-3 text-sm text-gray-700 cursor-pointer flex-1"
                        >
                          {hotel.name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>

              {/* Availability Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Availability
                </label>
                <input
                  type="number"
                  min="0"
                  value={bulkAvailability}
                  onChange={(e) => setBulkAvailability(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter availability for all selected hotels"
                />
              </div>

              {/* Error Message */}
              {bulkError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{bulkError}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsBulkModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkSave}
                  disabled={bulkUpdateMutation.isLoading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {bulkUpdateMutation.isLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {bulkUpdateMutation.isLoading ? 'Updating...' : 'Update All Hotels'}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageDayUseRoom;