/* eslint-disable react/prop-types */
import { useGetLocations } from '../../../../ApiHooks/useLocationHook';

export const LocationTab = ({
  formData,
  handleHotelAddressChange,
  handleTransportChange,
  transportLocations,
  pointsOfInterest,
  locationInputs,
  handleLocationInputChange,
  addLocationItem,
  removeLocationItem,
  handleCityLocationChange // new prop for updating cityLocation in formData
}) => {
  const { data: locations, isLoading, isError } = useGetLocations();

  return (
    <div className="space-y-8">
      {/* City Dropdown Section */}


      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please fill in the correct location information. Accuracy is important for guest experience.
            </p>
          </div>
        </div>
      </div>

      <div className='flex gap-4 w-full'>

        <div className="bg-white border  w-full rounded-lg p-6 shadow-md transition-shadow duration-300">
          <label className="block text-gray-700 font-medium mb-2">Hotel Address</label>
          <input
            type="text"
            name="hotelAddress"
            value={formData.location.hotelAddress}
            onChange={handleHotelAddressChange}
            required
            placeholder="Enter hotel address"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="bg-white border  w-full rounded-lg p-6 shadow-md transition-shadow duration-300">
          <label className="block text-gray-700 font-medium mb-2">Select City</label>
          {isLoading ? (
            <p>Loading cities...</p>
          ) : isError ? (
            <p>Error loading cities</p>
          ) : (
            <select
              value={formData.cityLocation || ''}
              onChange={handleCityLocationChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select a city</option>
              {locations && locations.map(location => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>


      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-xl font-semibold mt-6">Transportation Options</h3>
        <div className="flex gap-6 w-full">
          {transportLocations.map(category => (
            <div key={category} className="bg-white border w-full rounded-lg p-6 shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold capitalize">
                {category === 'railwayStation' ? 'Railway Station' : category}
              </h3>
              <input
                type="text"
                placeholder="Enter name"
                value={formData.location[category] || ''}
                onChange={e => handleTransportChange(category, e.target.value)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Points of Interest</h3>
      {pointsOfInterest.map(category => (
        <div key={category} className="bg-white border rounded-lg p-6 shadow-md transition-shadow duration-300">
          <h3 className="text-xl font-semibold capitalize">{category}</h3>
          {formData.location[category] && formData.location[category].length > 0 && (
            <ul className="mb-4 space-y-2">
              {formData.location[category].map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 rounded-md p-3">
                  <span className="text-gray-800">{item.name}</span>
                  <button type="button" onClick={() => removeLocationItem(category, index)} className="text-red-500 hover:underline font-medium">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Name"
              value={locationInputs[category].name}
              onChange={e => handleLocationInputChange(category, 'name', e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button type="button" onClick={() => addLocationItem(category)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
