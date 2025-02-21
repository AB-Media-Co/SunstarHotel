/* eslint-disable react/prop-types */
import { Add, Delete, Edit, StarRate, LocationOn, KingBed, Wifi, LocalParking, Restaurant, Pool, AccessTime } from "@mui/icons-material";
import { useGetHotels } from "../../../ApiHooks/useHotelHook2";
import { useState } from "react";

// Helper function to get icon for amenity
const getAmenityIcon = (amenity) => {
  const amenityLabel = typeof amenity === 'object' && amenity !== null ? amenity.label : amenity;

  const amenityMap = {
    "wifi": <Wifi fontSize="small" />,
    "parking": <LocalParking fontSize="small" />,
    "restaurant": <Restaurant fontSize="small" />,
    "pool": <Pool fontSize="small" />,
    "king bed": <KingBed fontSize="small" />,
  };

  for (const [key, icon] of Object.entries(amenityMap)) {
    if (amenityLabel.toLowerCase().includes(key)) {
      return icon;
    }
  }

  return null; 
};

const Card = ({ item, type, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={item._id}
      className="bg-white shadow-lg rounded-xl overflow-hidden relative border border-gray-200 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute top-3 right-3 flex gap-2 z-10 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => onEdit(item)}
          className="bg-white p-2 rounded-full shadow-md hover:bg-blue-100 transition-colors duration-200"
          title="Edit"
        >
          <Edit fontSize="small" className="text-blue-600" />
        </button>
        <button
          onClick={() => onDelete(item.hotelCode)}
          className="bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition-colors duration-200"
          title="Delete"
        >
          <Delete fontSize="small" className="text-red-600" />
        </button>
      </div>

      <div className="relative group">
        {item.discountedPrice && (
          <div className="absolute top-3 left-0 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-r-lg shadow-md flex items-center">
            <span className="mr-1">SALE</span>
            <span className="text-lg font-bold">
              {Math.round((1 - item.discountedPrice / item.price) * 100)}%
            </span>
          </div>
        )}
        <div className="h-48 sm:h-56 overflow-hidden">
          <img
            src={item.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
            alt={type === 'hotel' ? item.name : item.roomType}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 hover:text-blue-600 transition-colors duration-200">
            {type === 'hotel' ? item.name : `${item.roomType} - Room ${item.roomNumber}`}
          </h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
            <StarRate fontSize="small" className="text-yellow-500" />
            <span className="ml-1 text-gray-700 font-semibold">{item.rating || 'N/A'}</span>
          </div>
        </div>

        <div className="mb-auto">
          <div className="flex items-center">
            <LocationOn fontSize="small" className="text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm">
              {item.location || item.hotel?.location || 'Location N/A'}
            </span>
          </div>
          {type === 'hotel' && (
            <div className="flex items-center mt-2">
              <AccessTime fontSize="small" className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">
                Check In: {item.checkIn || 'N/A'} | Check Out: {item.checkOut || 'N/A'}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex items-center">
            {item.discountedPrice ? (
              <div className="flex flex-col">
                <span className="line-through text-red-500 text-sm">₹{item.price.toLocaleString()}</span>
                <span className="text-green-600 font-bold text-lg">
                  ₹{item.discountedPrice.toLocaleString()}
                  <span className="text-xs text-gray-600 ml-1">/night</span>
                </span>
              </div>
            ) : (
              <div>
                <span className="text-gray-700 font-bold text-lg">₹{item.price.toLocaleString()}</span>
                <span className="text-xs text-gray-600 ml-1">/night</span>
              </div>
            )}
          </div>
          {/*           
          {type === 'hotel' && (
            <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
              <span className="text-blue-700 text-sm font-medium">
                {item.roomCount || 0} Rooms
              </span>
            </div>
          )} */}
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
                    {getAmenityIcon(amenity)}
                    {typeof amenity === 'object' ? amenity.label : amenity}
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

export default Card;

export const Section = ({ title, type, onEdit, onDelete, onAdd }) => {
  const { data: hotels, isLoading, isError, error } = useGetHotels();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="flex flex-col items-center">
          <div className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 animate-spin mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading {type}s...</p>
        </div>
      </div>
    );

  if (isError)
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
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm">
            Retry
          </button>
        </div>
      </div>
    );

  const isEmpty = !hotels?.hotels?.length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {type === 'hotel'
              ? 'Manage your hotel inventory, update details, and add new properties.'
              : 'Manage your room inventory, update details, and add new accommodations.'}
          </p>
          <div className="mt-6">
            <button
              onClick={onAdd}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Add fontSize="small" className="mr-1" />
              Add New {type === 'hotel' ? 'Hotel' : 'Room'}
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No {type}s found</h3>
            <p className="text-gray-600 mb-6">
              Start adding your first {type} to manage your inventory.
            </p>
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Add New {type === 'hotel' ? 'Hotel' : 'Room'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels?.hotels?.map((item) => (
              <div key={item._id} className="h-full">
                <Card item={item} type={type} onEdit={onEdit} onDelete={onDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
