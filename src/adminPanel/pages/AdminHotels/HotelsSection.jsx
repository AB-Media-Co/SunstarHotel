/* eslint-disable react/prop-types */
import { Add, Delete, Edit, StarRate, AccessTime } from "@mui/icons-material";
import Switch from '@mui/material/Switch';
import { useGetHotels, useEditHotel } from "../../../ApiHooks/useHotelHook2";
import { useState } from "react";

// Card component
const Card = ({ item, type, onEdit, onDelete, onToggle }) => {
  return (
    <div
      key={item._id}
      className="bg-white shadow-lg rounded-xl overflow-hidden relative border border-gray-200 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 h-full flex flex-col"
    >
      <div
        className="justify-end items-center py-4 px-2 flex gap-2 z-10 transition-opacity duration-200"
      >
        <button
          onClick={() => onEdit(item)}
          className="p-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition-colors duration-200"
          title="Edit"
        >
          <Edit fontSize="small" className="text-blue-600" />
        </button>
        <button
          onClick={() => onDelete(item.hotelCode)}
          className="p-2 px-4 rounded-full shadow-md hover:bg-red-100 transition-colors duration-200"
          title="Delete"
        >
          <Delete fontSize="small" className="text-red-600" />
        </button>
        <div className="flex items-center">
          <Switch
            checked={item.active}
            onChange={() => onToggle(item, 'active')}
            color="primary"
          />
          <span className="text-sm text-gray-700">
            {item.active ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex items-center">
          <Switch
            checked={item.isDayUseRoom}
            onChange={() => onToggle(item, 'dayUseRoom', !item.isDayUseRoom)}
            color="primary"
          />
          <span className="text-sm text-gray-700">Day Use Room</span>
        </div>
      </div>
      {/* Rest of the Card component remains unchanged */}
      <div className="relative group">
        <div className="h-48 sm:h-56 overflow-hidden">
          <img
            src={item.images?.[0] || "https://via.placeholder.com/300本土化?text=No+Image"}
            alt={type === "hotel" ? item.name : item.roomType}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 hover:text-blue-600 transition-colors duration-200">
            {type === "hotel" ? item.name : `${item.roomType} - Room ${item.roomNumber}`}
          </h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
            <StarRate fontSize="small" className="text-yellow-500" />
            <span className="ml-1 text-gray-700 font-semibold">{item.rating || "N/A"}</span>
          </div>
        </div>
        {type === "hotel" && (
          <div className="flex items-center mt-2">
            <AccessTime fontSize="small" className="text-gray-500 mr-1" />
            <span className="text-gray-700 text-sm">
              Check In: {item.checkIn || "N/A"} | Check Out: {item.checkOut || "N/A"}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex items-center">
            {item.discountedPrice ? (
              <div className="flex flex-col">
                <span className="text-green-600 font-bold text-lg">
                  ₹{item.price.toLocaleString()}
                  <span className="text-xs text-gray-600 ml-1">/night</span>
                </span>
              </div>
            ) : (
              <div>
                <span className="text-gray-700 font-bold text-lg">
                  ₹{item.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-600 ml-1">/night</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <span className="block font-bold text-gray-800 mb-3">Amenities:</span>
          <ul className="flex flex-wrap gap-1.5">
            {item?.amenities?.length ? (
              <>
                {item.amenities.slice(0, 3).map((amenity, index) => (
                  <li
                    key={index}
                    className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1.5 rounded-full border border-indigo-100 flex items-center gap-1 transition-colors duration-200 hover:bg-indigo-100"
                  >
                    {typeof amenity === "object" ? amenity.value : amenity}
                  </li>
                ))}
                {item.amenities.length > 3 && (
                  <li className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-200 transition-colors duration-200 hover:bg-gray-200">
                    +{item.amenities.length - 3} more
                  </li>
                )}
              </>
            ) : (
              <li className="text-gray-500 italic">No amenities listed</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Section component
export const Section = ({ title, type, onEdit, onDelete, onAdd }) => {
  const { data: hotels, isLoading, isError, error, refetch } = useGetHotels();
  const { mutate: editHotel } = useEditHotel();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [countdown, setCountdown] = useState(3);

  const handleToggle = async (item, toggleType = 'active', newStatus = !item.active) => {
    setIsUpdating(true);
    setCountdown(3);
    setUpdateMessage(
      toggleType === 'active'
        ? newStatus
          ? `Activating ${item.name}`
          : `Deactivating ${item.name}`
        : newStatus
          ? `Enabling Day Use Room for ${item.name}`
          : `Disabling Day Use Room for ${item.name}`
    );

    try {
      if (toggleType === 'active') {
        await editHotel(
          { hotelCode: item.hotelCode, hotelData: { active: newStatus } },
          { onSuccess: () => refetch() }
        );
      } else if (toggleType === 'dayUseRoom') {
        await editHotel(
          {
            hotelCode: item.hotelCode,
            hotelData: { isDayUseRoom: newStatus }
          },
          { onSuccess: () => refetch() }
        );
      }      
    } catch (err) {
      console.error("Error updating hotel:", err);
      setUpdateMessage("Failed to update. Please try again.");
      setTimeout(() => {
        setIsUpdating(false);
        setCountdown(3);
      }, 3000);
      return;
    }

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clear overlay after countdown
    setTimeout(() => {
      setIsUpdating(false);
      setCountdown(3);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="flex flex-col items-center">
          <div className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 animate-spin mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading {type}s...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="bg-red-50 p-6 rounded-lg max-w-md border border-red-100 shadow-md">
          <p className="text-red-600 font-semibold mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Error loading data
          </p>
          <p className="text-gray-700">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isEmpty = !hotels?.hotels?.length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white relative">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {type === "hotel"
              ? "Manage your hotel inventory, update details, and add new properties."
              : "Manage your room inventory, update details, and add new accommodations."}
          </p>
          <div className="mt-6">
            <button
              onClick={onAdd}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Add fontSize="small" className="mr-1" />
              Add New {type === "hotel" ? "Hotel" : "Room"}
            </button>
          </div>
        </div>
        {isEmpty ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No {type}s found
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding your first {type} to manage your inventory.
            </p>
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Add New {type === "hotel" ? "Hotel" : "Room"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels?.hotels?.map((item) => (
              <div key={item._id} className="h-full">
                <Card
                  item={item}
                  type={type}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggle={handleToggle}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {isUpdating && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/70 to-gray-900/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white/90 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 animate-slideUp">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="text-2xl font-bold text-blue-600 animate-pulse">{countdown}</p>
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-800 animate-pulse">
                {updateMessage}...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;