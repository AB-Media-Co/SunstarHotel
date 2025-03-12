/* eslint-disable react/prop-types */
import { Autocomplete, TextField, Switch, FormControlLabel } from '@mui/material';

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
            className={`text-4xl focus:outline-none ${starValue <= rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export const DetailsTab = ({ formData, handleDetailsChange, amenities, handleAmenitiesChange, setFormData }) => (
  <div className="space-y-5">
    <FormControlLabel
      control={
        <FormControlLabel
          control={
            <Switch
              checked={formData.payAtHotel === "yes"}
              onChange={e =>
                handleDetailsChange({
                  target: {
                    name: "payAtHotel",
                    value: e.target.checked ? "yes" : "no",
                    checked: e.target.checked,
                    type: "checkbox"
                  }
                })
              }
              color="primary"
            />
          }
          label="Pay at Hotel"
        />

      }
    />
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
          onChange={newRating =>
            handleDetailsChange({
              target: { name: 'rating', value: newRating, type: 'number' }
            })
          }
        />
      </div>
    </div>
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Continental Plan (Breakfast)</h2>
      <div className="flex gap-4">
        <input
          type="number"
          name="amount"
          value={formData.continentalPlan.rate.amount}
          onChange={(e) => setFormData({
            ...formData,
            continentalPlan: {
              ...formData.continentalPlan,
              rate: { ...formData.continentalPlan.rate, amount: Number(e.target.value) }
            }
          })}
          placeholder="Rate Amount"
          className="w-full border rounded-md p-2"
        />
        <select
          name="period"
          value={formData.continentalPlan.rate.period}
          onChange={(e) => setFormData({
            ...formData,
            continentalPlan: {
              ...formData.continentalPlan,
              rate: { ...formData.continentalPlan.rate, period: e.target.value }
            }
          })}
          className="w-full border rounded-md p-2"
        >
          <option value="per person">Per Person</option>
          <option value="per breakfast">Per Breakfast</option>
        </select>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <div>
        <label className="block text-gray-700 font-medium ">Price:</label>
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
      {/* <div>
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
      </div> */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Phone Number:</label>
        <input
          type="number"
          name="phoneNumber"

          value={formData.phoneNumber}
          onChange={handleDetailsChange}
          placeholder="Phoone Number"
          className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
        />
      </div>



    </div>
    <div>
      <label className="block text-gray-700 font-medium mb-1">Amenities:</label>
      <Autocomplete
        multiple
        id="amenities-select"
        options={amenities?.map(a => ({ label: a.label, value: a.value }))}
        value={formData.amenities}
        onChange={handleAmenitiesChange}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        getOptionLabel={option => option.label}
        renderInput={params => <TextField {...params} label="Select amenities" placeholder="Select amenities" />}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Check In:</label>
        <input
          type="time"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleDetailsChange}
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
);
