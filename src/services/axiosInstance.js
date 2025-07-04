import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000', 
  // baseURL: 'https://sunstarbackend.onrender.com', 
  // baseURL: 'https://sunstarhospitality.com', 
  baseURL: '',
  // mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
