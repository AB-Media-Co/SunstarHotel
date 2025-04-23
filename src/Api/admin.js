import axiosInstance from '../services/axiosInstance';

// Helper to build the Authorization header
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Login API call.
 * @param {object} userData
 * @returns {Promise<object>}
 */
export const loginAdminAPI = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/admin/login', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error logging in' };
  }
};

/**
 * Register Admin API call.
 * @param {object} userData
 * @returns {Promise<object>}
 */
export const registerAdminAPI = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/admin/register', userData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error registering admin' };
  }
};

/**
 * View Admin Profile API call.
 * @returns {Promise<object>}
 */
export const viewProfileApi = async () => {
  try {
    const response = await axiosInstance.get('/api/admin/profile', {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error fetching profile' };
  }
};

/**
 * Edit Admin Profile API call.
 * @param {object} updatedData
 * @returns {Promise<object>}
 */
export const editProfileApi = async (updatedData) => {
  try {
    const response = await axiosInstance.put('/api/admin/profile', updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error updating profile' };
  }
};

/**
 * Delete Admin Profile API call.
 * @returns {Promise<object>}
 */
export const deleteProfileApi = async () => {
  try {
    const response = await axiosInstance.delete('/api/admin/profile', {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error deleting profile' };
  }
};

/**
 * Fetch All Users API call.
 * @returns {Promise<object>}
 */
export const allUsersApi = async () => {
  try {
    const response = await axiosInstance.get('/api/admin/profiles', {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error fetching all users' };
  }
};

/**
 * Edit User Profile By ID API call.
 * @param {object} params - Object containing id and updatedData.
 * @returns {Promise<object>}
 */
export const editUserProfileByIdApi = async ({ id, updatedData }) => {
  try {
    const response = await axiosInstance.put(`/api/admin/profiles/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error updating user profile' };
  }
};

/**
 * Delete User Profile By ID API call.
 * @param {string} id
 * @returns {Promise<object>}
 */
export const deleteUserProfileByIdApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/profiles/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error deleting user profile' };
  }
};

/**
 * Change Password API call.
 * For a regular user, provide { currentPassword, newPassword }.
 * For SuperAdmin, provide { userId, newPassword } to change another user's password.
 * @param {object} passwordData
 * @returns {Promise<object>}
 */
export const changePasswordAPI = async (passwordData) => {
  try {
    const response = await axiosInstance.post('/api/admin/change-password', passwordData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error changing password' };
  }
};
