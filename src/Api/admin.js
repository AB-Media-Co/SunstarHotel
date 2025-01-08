import axiosInstance from '../services/axiosInstance';

// Login API
export const loginAdminAPI = async (userData) => {
  const response = await axiosInstance.post('/api/admin/login', userData);
  return response.data;
};

// Register API
export const registerAdminAPI = async (userData) => {
  const response = await axiosInstance.post('/api/admin/register', userData);
  return response.data;
};

// View single admin profile API
export const viewProfileApi = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get('/api/admin/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};




// Edit single admin profile API
export const editProfileApi = async (updatedData) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.put('/api/admin/profile', updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete single admin profile API
export const deleteProfileApi = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.delete('/api/admin/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};



// View all users API
export const allusersApi = async () => {
  const token = localStorage.getItem('token');

  const response = await axiosInstance.get('/api/admin/profiles', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }); 
  return response.data;
};




// Edit a user profile by ID API
export const editUserProfileByIdApi = async ({ id, updatedData }) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.put(`/api/admin/profiles/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a user profile by ID API
export const deleteUserProfileByIdApi = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.delete(`/api/admin/profiles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
