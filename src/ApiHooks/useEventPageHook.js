import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

// Get all event pages
export const useGetAllEventPages = (activeOnly = false) => {
  return useQuery({
    queryKey: ['eventPages', activeOnly],
    queryFn: async () => {
      const queryString = activeOnly ? '?active=true' : '';
      const response = await axiosInstance.get(`/api/event-pages${queryString}`);
      return response.data;
    },
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });
};

// Get single event page by slug
export const useGetEventPageBySlug = (slug) => {
  return useQuery({
    queryKey: ['eventPage', slug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/event-pages/${slug}`);
      return response.data;
    },
    enabled: !!slug, // Only run if slug exists
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

// Create new event page
export const useCreateEventPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventPageData) => {
      const response = await axiosInstance.post('/api/event-pages', eventPageData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['eventPages'] });
      toast.success('Event page created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create page: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Update entire event page
export const useUpdateEventPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, updateData }) => {
      const response = await axiosInstance.put(`/api/event-pages/${slug}`, updateData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['eventPages'] });
      queryClient.invalidateQueries({ queryKey: ['eventPage', variables.slug] });
      toast.success('Event page updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update page: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Update specific section of event page
export const useUpdateEventPageSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, section, sectionData }) => {
      const response = await axiosInstance.patch(
        `/api/event-pages/${slug}/section/${section}`,
        sectionData
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['eventPages'] });
      queryClient.invalidateQueries({ queryKey: ['eventPage', variables.slug] });
      toast.success(`${variables.section} updated successfully`);
    },
    onError: (error) => {
      toast.error(`Failed to update section: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Toggle event page active status
export const useToggleEventPageStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug) => {
      const response = await axiosInstance.patch(`/api/event-pages/${slug}/toggle-status`);
      return response.data;
    },
    onSuccess: (data, slug) => {
      queryClient.invalidateQueries({ queryKey: ['eventPages'] });
      queryClient.invalidateQueries({ queryKey: ['eventPage', slug] });
      toast.success(data.message || 'Status updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to toggle status: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Delete event page
export const useDeleteEventPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug) => {
      const response = await axiosInstance.delete(`/api/event-pages/${slug}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventPages'] });
      toast.success('Event page deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete page: ${error.response?.data?.message || error.message}`);
    },
  });
};