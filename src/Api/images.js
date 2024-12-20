import axiosInstance from '../services/axiosInstance';

export const uploadImageAPI = async (imageData) => {
  const response = await axiosInstance.post('/api/images/upload', imageData);
  return response.data;
};
