import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

export const useGetLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/locations');
      return response.data;
    },
    staleTime: 30000, 
    refetchOnWindowFocus: false,
  });
};

export const useGetLocationById = (id) => {
  return useQuery({
    queryKey: ['locations', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/locations/${id}`);
      return response.data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};

export const useAddLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newLocation) => {
      const response = await axiosInstance.post('/api/locations', newLocation);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toast.success('Location added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add location: ' + error.message);
    },
  });
};

export const useAddMultipleLocations = ()  => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (locationsArray) => {
      const response = await axiosInstance.post('/api/locations/bulk', locationsArray);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toast.success('Multiple locations added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add multiple locations: ' + error.message);
    },
  });
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updateData }) => {
      const response = await axiosInstance.put(`/api/locations/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toast.success('Location updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update location: ' + error.message);
    },
  });
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/locations/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toast.success('Location deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete location: ' + error.message);
    },
  });
};
