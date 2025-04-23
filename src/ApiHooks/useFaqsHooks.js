import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

// Fetch all FAQs for a specific page
export const useGetFAQsByPage = (page) => {
  return useQuery({
    queryKey: ['faqs', page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/faqs/${page}`);
      return response.data;
    },
    staleTime: 30000, // Adjust according to the frequency of changes to the data
    refetchOnWindowFocus: false, // Adjust if you need the data to refetch when the window comes back into focus
  });
};

// Fetch a single FAQ by ID
export const useGetFAQById = (id) => {
  return useQuery({
    queryKey: ['faq', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/faqs/${id}`);
      return response.data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};

// Add a new FAQ
export const useAddFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newFAQ) => {
      const response = await axiosInstance.post('/api/faqs/add', newFAQ);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('FAQ added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add FAQ: ' + (error.response?.data?.message || error.message));
    },
  });
};

// Add multiple FAQs in bulk
export const useAddMultipleFAQs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (faqsArray) => {
      const response = await axiosInstance.post('/api/faqs/add-multiple', faqsArray);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('Multiple FAQs added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add multiple FAQs: ' + (error.response?.data?.message || error.message));
    },
  });
};

// Update an existing FAQ
export const useUpdateFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updateData }) => {
      const response = await axiosInstance.put(`/api/faqs/update/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('FAQ updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update FAQ: ' + (error.response?.data?.message || error.message));
    },
  });
};

// Delete an FAQ by ID
export const useDeleteFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/faqs/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('FAQ deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete FAQ: ' + (error.response?.data?.message || error.message));
    },
  });
};
