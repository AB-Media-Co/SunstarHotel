import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetHotelById, useEditHotel } from '../../../ApiHooks/useHotelHook2';
import toast from 'react-hot-toast';

export const EditHotel = () => {
  const navigate = useNavigate();
  const { hotelID } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelById(hotelID);
  const { mutate: editHotel } = useEditHotel();

  const [hotelData, setHotelData] = useState({
    name: '',
    description: '',
    location: '',
    amenities: [],
    rating: 0,
    images: [],
    price: 0,
    discountedPrice: 0,
    soldOut: false,
    testimonials: [],
    hotelCode: '',
    authKey: '',
  });

  useEffect(() => {
    if (hotel) {
      setHotelData(hotel);
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditHotel = () => {
    editHotel({ hotelID, hotelData }, {
      onSuccess: () => {
        toast.success('Hotel updated successfully');
        navigate('/admin/hotels');
      },
      onError: (error) => {
        toast.error(`Failed to update hotel: ${error.message}`);
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Hotel</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={hotelData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={hotelData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            name="location"
            value={hotelData.location}
            onChange={handleChange}
          />
        </div>
        {/* Add other fields as needed */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleEditHotel}
        >
          Update Hotel
        </button>
      </form>
    </div>
  );
};