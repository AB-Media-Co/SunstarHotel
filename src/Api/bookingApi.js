import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/bookings' });

export const createBooking = (data) => API.post('/book', data);
export const cancelBooking = (data) => API.post('/cancel-booking', data);
export const editBooking = (data) => API.put('/edit-booking', data);
