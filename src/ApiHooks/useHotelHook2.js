import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

export const useGetHotels = () => {
  return useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/allhotels');
      return response.data;
    },
  });
};

export const useGetHotelById = (hotelID) => {
  return useQuery({
    queryKey: ['hotel', hotelID],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/hotels/${hotelID}`);
      return response.data;
    },
    enabled: !!hotelID,
  });
};

export const useAddHotel = () => {
  return useMutation({
    mutationFn: async (hotelData) => {
      const response = await axiosInstance.post('/api/add/hotel', hotelData);
      return response.data;
    },
  });
};

export const useEditHotel = () => {
  return useMutation({
    mutationFn: async ({ hotelID, hotelData }) => {
      const response = await axiosInstance.put(`/api/edit/hotel/${hotelID}`, hotelData);
      return response.data;
    },
  });
};

export const useDeleteHotelById = () => {
  return useMutation({
    mutationFn: async (hotelID) => {
      const response = await axiosInstance.delete(`/api/delete/hotel/${hotelID}`);
      return response.data;
    },
  });
};