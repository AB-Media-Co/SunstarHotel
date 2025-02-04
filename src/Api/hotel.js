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
  images.forEach((image) => formData.append('images', image));

  const response = await axiosInstance.post('/api/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};



// Ezee api data

export const getSingleHotelByEzee = async (HotelCode, APIKey) => {
  const response = await axiosInstance.get(`/api/ezeehotels/sync-fetch`, {
    params: { HotelCode, APIKey },
  });
  return response.data;
};



export const updateHotelByIdEzee = async ({ data }) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axiosInstance.put(`/api/ezeehotels/edit-fields`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating hotel:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};



export const getAllRoomsEzee = async ({ HotelCode, AuthCode  }) => {
  const response = await axiosInstance.get('/api/ezeehotels/sync-rooms', {
    params: { HotelCode, AuthCode  }

  });
  return response.data;
};