import axios from 'axios';

const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
// const baseURL = isLocal ? "http://localhost:5000" : "https://sunstarbackend.onrender.com";
const baseURL = isLocal ? "http://localhost:5000" : "";

const axiosInstance = axios.create({
  baseURL: baseURL,
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
