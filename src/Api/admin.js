import axiosInstance from '../services/axiosInstance';

// Login API
export const loginAdminAPI = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/admin/login', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error logging in' };
  }
};

// Register API
export const registerAdminAPI = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/api/admin/register', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error registering admin' };
  }
};

// View single admin profile API
export const viewProfileApi = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/api/admin/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error fetching profile' };
  }
};

// Edit single admin profile API
export const editProfileApi = async (updatedData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put('/api/admin/profile', updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error updating profile' };
  }
};

// Delete single admin profile API
export const deleteProfileApi = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.delete('/api/admin/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error deleting profile' };
  }
};

// View all users API
export const allUsersApi = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/api/admin/profiles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error fetching all users' };
  }
};

// Edit a user profile by ID API
export const editUserProfileByIdApi = async ({ id, updatedData }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(`/api/admin/profiles/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error updating user profile' };
  }
};

// Delete a user profile by ID API
export const deleteUserProfileByIdApi = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.delete(`/api/admin/profiles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error deleting user profile' };
  }
};