import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

  export const useGetHotels = () => {
    return useQuery({
      queryKey: ['hotels'],
      queryFn: async () => {
        const response = await axiosInstance.get('/api/ezee/allhotels');
        return response.data;
      },
      staleTime: 30000, // data is considered fresh for 30 seconds
      refetchOnWindowFocus: false, // prevents refetching when the window gains focus
    });
  };


export const useAddHotel = () => {
  return useMutation({
    mutationFn: async (hotelData) => {
      const response = await axiosInstance.post('/api/ezee/add/hotel', hotelData);
      return response.data;
    },
  });
};

export const useEditHotel = () => {
  return useMutation({
    mutationFn: async ({ hotelCode, hotelData }) => {
      const response = await axiosInstance.put(`/api/ezee/edit/hotel/${hotelCode}`, hotelData);
      return response.data;
    },
  });
};

export const useDeleteHotelById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hotelCode) => {
      const response = await axiosInstance.delete(`/api/ezee/delete/hotel/${hotelCode}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
  });
};

export const uploadImagesAPIV2 = async (images) => {
  const formData = new FormData();
  images.forEach((image) => formData.append('images', image));

  const response = await axiosInstance.post('/api/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const getSingleHotelWithCode = async (hotelCode) => {
  const response = await axiosInstance.get(`/api/ezee/hotels/${hotelCode}`);
  return response.data;
};


