import axiosInstance from '../services/axiosInstance';

export const addHotelAPI = async (hotelData) => {
  const response = await axiosInstance.post('/api/hotels/add', hotelData);
  return response.data;
};

export const getHotelAPI = async () => {
  const response = await axiosInstance.get(`/api/hotels`);
  return response.data;
};

export const updateHotelByIdAPI = async ({ id, data }) => {
  const response = await axiosInstance.put(`/api/hotels/${id}`, data);
  return response.data;
};

export const deleteHotelByIdAPI = async (id) => {
  const token = localStorage.getItem('token'); 
  const response = await axiosInstance.delete(`/api/hotels/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};


export const addRoomToHotelAPI = async ({ hotelId, roomData }) => {
  const response = await axiosInstance.post(`/api/hotels/${hotelId}/add`, roomData);
  return response.data;
};

export const getRoomByIdAPI = async ({ hotelId, roomId }) => {
  const response = await axiosInstance.get(`/api/hotels/${hotelId}/rooms/${roomId}`);
  return response.data;
};

export const updateRoomByIdAPI = async ({ hotelId, roomId, roomData }) => {
  const response = await axiosInstance.put(`/api/hotels/${hotelId}/rooms/${roomId}`, roomData);
  return response.data;
};



export const deleteRoomByIdAPI = async (roomId) => {
  const token = localStorage.getItem('token'); 
  const response =  await axiosInstance.delete(`/api/hotels/rooms/${roomId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};


export const getAllRoomsAPI = async () => {
  const response = await axiosInstance.get('/api/hotels/getAllRooms');
  return response.data;
};

export const getSingleRoomById = async (hotelId) => {
  const response = await axiosInstance.get(`/api/hotels/${hotelId}`);
  return response.data;
};

export const getSingleHotelById = async (roomId) => {
  const response = await axiosInstance.get(`/api/hotels/rooms/${roomId}`);
  return response.data;
};
