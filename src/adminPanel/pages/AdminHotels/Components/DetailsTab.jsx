/* eslint-disable react/prop-types */
import { Autocomplete, TextField, Switch, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';

const StarRating = ({ rating, onChange, maxRating = 5 }) => {
  // Function to handle clicking on full stars
  const handleStarClick = (value) => {
    onChange(value);
  };

  // Function to handle clicking on half stars
  const handleHalfStarClick = (value) => {
    onChange(value - 0.5);
  };

  return (
    <div className="flex relative">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFullStar = rating >= starValue;
        const isHalfStar = !isFullStar && rating >= starValue - 0.5;

        return (
          <div key={index} className="relative">
            {/* Half star clickable area (left half) */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-10"
              onClick={() => handleHalfStarClick(starValue)}
            ></div>

            {/* Full star clickable area (right half) */}
            <div
              className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-10"
              onClick={() => handleStarClick(starValue)}
            ></div>

            {/* Star display */}
            <div className="flex">
              {isFullStar ? (
                <span className="text-4xl text-yellow-500">★</span>
              ) : isHalfStar ? (
                <div className="relative text-4xl">
                  <span className="text-gray-300">★</span>
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <span className="text-yellow-500">★</span>
                  </div>
                </div>
              ) : (
                <span className="text-4xl text-gray-300">★</span>
              )}
            </div>
          </div>
        );
      })}

      {/* Display numerical rating (optional) */}
      <span className="ml-2 text-lg self-center">{rating.toFixed(1)}</span>
    </div>
  );
};



const ClockTimePicker = ({ initialTime, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(initialTime || '');
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [view, setView] = useState('hour'); // 'hour' or 'minute'

  // Parse time string when component mounts or initialTime changes
  useEffect(() => {
    if (initialTime) {
      parseTimeString(initialTime);
    }
  }, [initialTime]);

  // Parse a time string (either "1:00 PM" format or "13:00" format)
  const parseTimeString = (timeStr) => {
    if (!timeStr) return;

    try {
      // Handle "1:00 PM" format
      if (timeStr.includes('AM') || timeStr.includes('PM')) {
        const [timePart, ampm] = timeStr.split(' ');
        const [hours, minutes] = timePart.split(':');
        setSelectedHour(parseInt(hours, 10));
        setSelectedMinute(parseInt(minutes, 10));
        setSelectedAmPm(ampm);
        return;
      }

      // Handle "13:00" format
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours, 10);
      setSelectedHour(hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour));
      setSelectedMinute(parseInt(minutes, 10));
      setSelectedAmPm(hour >= 12 ? 'PM' : 'AM');
    } catch (e) {
      // Error parsing time - using default values
    }
  };

  // Format time to "1:00 PM" format
  const formatTime = () => {
    return `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedAmPm}`;
  };

  // Toggle between hour and minute selection
  const toggleView = () => {
    setView(view === 'hour' ? 'minute' : 'hour');
  };

  // Handle when an hour is selected on the clock
  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    setView('minute'); // Switch to minute selection after hour is selected
  };

  // Handle when a minute is selected on the clock
  const handleMinuteSelect = (minute) => {
    setSelectedMinute(minute);

    // Update the selectedTime
    const newTime = `${selectedHour}:${minute.toString().padStart(2, '0')} ${selectedAmPm}`;
    setSelectedTime(newTime);

    // Notify parent component
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: newTime,
          type: 'text'
        }
      });
    }
  };

  // Handle AM/PM toggle
  const handleAmPmToggle = (value) => {
    setSelectedAmPm(value);

    // Update the selectedTime
    const newTime = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${value}`;
    setSelectedTime(newTime);

    // Notify parent component
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: newTime,
          type: 'text'
        }
      });
    }
  };

  // Close the picker and apply the selected time
  const applyTime = () => {
    const newTime = formatTime();
    setSelectedTime(newTime);
    setIsOpen(false);

    // Notify parent component
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: newTime,
          type: 'text'
        }
      });
    }
  };

  // Generate clock face elements
  const generateClockFace = () => {
    if (view === 'hour') {
      // Generate 12 hours
      return Array.from({ length: 12 }, (_, i) => {
        const hour = i + 1; // 1-12
        const angle = (hour / 12) * 2 * Math.PI - Math.PI / 2; // Start at 12 o'clock
        const radius = 80; // Adjust as needed
        const x = Math.cos(angle) * radius + 100; // 100 is center x
        const y = Math.sin(angle) * radius + 100; // 100 is center y

        return (
          <div
            key={hour}
            className={`absolute rounded-full h-8 w-8 flex items-center justify-center cursor-pointer ${selectedHour === hour ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
              }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleHourSelect(hour)}
          >
            {hour}
          </div>
        );
      });
    } else {
      // Generate minutes (by 5s)
      return Array.from({ length: 12 }, (_, i) => {
        const minute = i * 5; // 0, 5, 10, ..., 55
        const angle = (minute / 60) * 2 * Math.PI - Math.PI / 2; // Start at 12 o'clock
        const radius = 80; // Adjust as needed
        const x = Math.cos(angle) * radius + 100; // 100 is center x
        const y = Math.sin(angle) * radius + 100; // 100 is center y

        return (
          <div
            key={minute}
            className={`absolute rounded-full h-8 w-8 flex items-center justify-center cursor-pointer ${selectedMinute === minute ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
              }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleMinuteSelect(minute)}
          >
            {minute}
          </div>
        );
      });
    }
  };

  // Draw clock hand
  const clockHandStyle = () => {
    if (view === 'hour') {
      const angle = ((selectedHour % 12) / 12) * 2 * Math.PI - Math.PI / 2;
      const length = 60; // Shorter than radius for hours
      const x = Math.cos(angle) * length;
      const y = Math.sin(angle) * length;

      return {
        transform: `translate(0, 0) rotate(${angle + Math.PI / 2}rad)`,
        transformOrigin: 'bottom center',
        height: `${length}px`
      };
    } else {
      const angle = (selectedMinute / 60) * 2 * Math.PI - Math.PI / 2;
      const length = 70; // Longer for minutes
      const x = Math.cos(angle) * length;
      const y = Math.sin(angle) * length;

      return {
        transform: `translate(0, 0) rotate(${angle + Math.PI / 2}rad)`,
        transformOrigin: 'bottom center',
        height: `${length}px`
      };
    }
  };

  return (
    <div className="relative">
      {/* Time display that opens the picker */}
      <div
        className="w-full border rounded-md p-3 cursor-pointer flex justify-between items-center bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedTime || 'Select Time'}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>

      {/* Clock picker popup */}
      {isOpen && (
        <div className="absolute z-20 mt-1 p-4 bg-white shadow-xl rounded-lg border" style={{ width: '250px' }}>
          {/* Digital time display */}
          <div className="mb-4 text-center text-2xl font-bold cursor-pointer" onClick={toggleView}>
            {selectedHour}:{selectedMinute.toString().padStart(2, '0')}
            <span className="ml-2">{selectedAmPm}</span>
          </div>

          {/* AM/PM selector */}
          <div className="flex justify-center mb-4 space-x-4">
            <button
              className={`px-4 py-1 rounded ${selectedAmPm === 'AM' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleAmPmToggle('AM')}
            >
              AM
            </button>
            <button
              className={`px-4 py-1 rounded ${selectedAmPm === 'PM' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleAmPmToggle('PM')}
            >
              PM
            </button>
          </div>

          {/* Clock face */}
          <div className="relative w-48 h-48 mx-auto mb-4">
            {/* Clock circle */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>

            {/* Center dot */}
            <div className="absolute rounded-full bg-blue-500 h-3 w-3" style={{ left: '100px', top: '100px', transform: 'translate(-50%, -50%)' }}></div>

            {/* Clock hand */}
            <div
              className="absolute w-1 bg-blue-500 rounded-full"
              style={{
                ...clockHandStyle(),
                left: '100px',
                bottom: '100px',
              }}
            ></div>

            {/* Clock numbers */}
            {generateClockFace()}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={applyTime}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export const DetailsTab = ({ formData, handleDetailsChange, amenities, handleAmenitiesChange, setFormData }) => {
  console.log('DetailsTab formData:', formData);
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    handleDetailsChange(e);
  };
  return <div className="space-y-5">
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



    <div className="border-t pt-6">
      <div className="group">
        <summary className="text-xl font-semibold cursor-pointer list-none flex justify-between items-center">
          SEO & Meta Data
        </summary>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Meta Title</label>
              <input
                type="text"
                name="title"
                value={formData.meta.title}
                onChange={handleDetailsChange}
                placeholder="Enter meta title"
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Meta Description</label>
              <input
                type="text"
                name="description"
                value={formData.meta.description}
                onChange={handleDetailsChange}
                placeholder="Enter meta description"
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Keywords</label>
            <input
              type="text"
              name="keywords"
              value={formData.meta.keywords.join(', ')}
              onChange={handleDetailsChange}
              placeholder="e.g., hotel in Dehradun, best hotels, luxury stay"
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <small className="text-gray-500">Use commas to separate keywords.</small>
          </div>
         
        </div>
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
      <div>
        <label className="block text-gray-700 font-medium mb-1">Phone Number:</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleDetailsChange}
          placeholder="Phone Number"
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



    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Check In:</label>
          <TimeSelector
            initialTime={formData.checkIn}
            onChange={handleTimeChange}
            name="checkIn"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Check Out:</label>
          <TimeSelector
            initialTime={formData.checkOut}
            onChange={handleTimeChange}
            name="checkOut"
          />
        </div>
      </div> */}



    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Check In:</label>
        <ClockTimePicker
          initialTime={formData.checkIn}
          onChange={handleTimeChange}
          name="checkIn"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Check Out:</label>
        <ClockTimePicker
          initialTime={formData.checkOut}
          onChange={handleTimeChange}
          name="checkOut"
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
};