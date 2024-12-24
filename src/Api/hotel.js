import axiosInstance from '../services/axiosInstance';

export const addHotelAPI = async (hotelData) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post('/api/hotels/add', hotelData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const getHotelAPI = async () => {
  const response = await axiosInstance.get(`/api/hotels`);
  return response.data;
};

export const updateHotelByIdAPI = async ({ id, data }) => {
  const token = localStorage.getItem('token');

  const response = await axiosInstance.put(`/api/hotels/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
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


export const addRoomToHotelAPI = async (roomData) => {
  const token = localStorage.getItem('token');

  const response = await axiosInstance.post(`/api/hotels/rooms/add`, roomData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const getRoomByIdAPI = async (roomId) => {
  const token = localStorage.getItem('token');

  const response = await axiosInstance.get(`/api/hotels/rooms/${roomId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateRoomByIdAPI = async ({ id, data }) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.put(`/api/hotels/rooms/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};



export const deleteRoomByIdAPI = async (roomId) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.delete(`/api/hotels/rooms/${roomId}`, {
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

export const getSingleHotelById = async (hotelId) => {
  const response = await axiosInstance.get(`/api/hotels/${hotelId}`);
  return response.data;
};


export const uploadImagesAPI = async (images) => {
  const formData = new FormData();
  images.forEach((image) => formData.append('images', image)); // Change 'images[]' to 'images'

  const response = await axiosInstance.post('/api/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
