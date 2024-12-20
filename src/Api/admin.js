import axiosInstance from '../services/axiosInstance';

export const loginAdminAPI = async (userData) => {
  const response = await axiosInstance.post('/api/admin/login', userData);
  return response.data;
};

export const registerAdminAPI = async (userData) => {
  const response = await axiosInstance.post('/api/admin/register', userData);
  return response.data;
};
