import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

// 🔹 Get all testimonials (optionally filtered by page)
export const useGetTestimonials = (params = {}) => {
  return useQuery({
    queryKey: ['testimonials', params],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/testimonials', { params });
      return response.data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};

// 🔹 Get single testimonial by ID
export const useGetTestimonialById = (id) => {
  return useQuery({
    queryKey: ['testimonial', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/testimonials/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 60000,
  });
};

// 🔹 Create one testimonial
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/api/testimonials', data);
      return response.data;
    },
    onSuccess: () => {
    //   toast.success('Testimonial created');
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
    onError: (err) => {
      console.error(err.response?.data?.message || 'Error creating testimonial');
    },
  });
};

// 🔹 Bulk‑create testimonials
export const useBulkCreateTestimonials = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (list) => {
      const response = await axiosInstance.post('/api/testimonials/bulk', list);
      return response.data;
    },
    onSuccess: () => {
    //   toast.success('Testimonials created');
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
    onError: (err) => {
      console.error(err.response?.data?.message || 'Error bulk creating testimonials');
    },
  });
};

// 🔹 Update a testimonial
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updateData }) => {
      const response = await axiosInstance.put(`/api/testimonials/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
    //   toast.success('Testimonial updated');
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
    onError: (err) => {
      console.error(err.response?.data?.message || 'Error updating testimonial');
    },
  });
};

// 🔹 Delete a testimonial
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/testimonials/${id}`);
      return response.data;
    },
    onSuccess: () => {
    //   toast.success('Testimonial deleted');
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
    onError: (err) => {
      console.error(err.response?.data?.message || 'Error deleting testimonial');
    },
  });
};
