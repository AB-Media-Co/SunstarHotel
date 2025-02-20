/* eslint-disable react/prop-types */
import React from 'react';

const RoomCard = ({ room, onEdit }) => {
  // Calculate discount percentage
  const discountPercentage = room.defaultRate > 0 ? ((room.defaultRate - room.discountRate) / room.defaultRate) * 100 : 0;

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform">
      {room.RoomImage && room.RoomImage.length > 0 ? (
        <img
          src={room.RoomImage[0]}
          alt={room.RoomName}
          className="w-full h-48 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 rounded mb-4 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{room.RoomName}</h3>
      <p className="text-gray-600 mb-2">{room.RoomDescription}</p>
   
      {room.Amenities && room.Amenities.length > 0 && (
        <p className="text-gray-600 mb-2">
          <strong className="font-semibold">Amenities:</strong> {room.Amenities.join(', ')}
        </p>
      )}
      <div className="mb-2 flex gap-2">
        <span className="text-gray-600 line-through">
          ₹ {room.defaultRate}
        </span>
        <span className="text-green-600  text-lg font-semibold">
          ₹{room.discountRate}
        </span>
    
      </div>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => onEdit(room)}
      >
        Edit / Update Room
      </button>
    </div>
  );
};

export default RoomCard;