// hooks/useMeta.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

/**
 * 1. Fetch all meta entries
 *    GET /api/meta
 */
export const useGetMetas = () => {
  return useQuery({
    queryKey: ['meta'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/meta');
      return response.data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};

/**
 * 2. Fetch a single meta entry by ID
 *    GET /api/meta/:id
 *
 * (If your API uses a different param—like "page"—adapt accordingly.)
 */
export const useGetMetaById = (id) => {
  return useQuery({
    queryKey: ['meta', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/meta/${id}`);
      return response.data;
    },
    enabled: !!id, // only run if "id" is truthy
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};

/**
 * 3. Create a new meta entry
 *    POST /api/meta
 */
export const useAddMeta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newMeta) => {
      const response = await axiosInstance.post('/api/meta', newMeta);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta'] });
      toast.success('Meta created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create meta: ' + error.message);
    },
  });
};

/**
 * 4. Create multiple meta entries in bulk
 *    POST /api/meta/bulk
 *
 * (Only if you have a bulk endpoint defined in your backend)
 */
export const useAddMultipleMeta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (metaArray) => {
      const response = await axiosInstance.post('/api/meta/bulk', metaArray);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta'] });
      toast.success('Multiple meta entries created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create multiple meta entries: ' + error.message);
    },
  });
};


export const useUpdateMeta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updateData }) => {
      const response = await axiosInstance.put(`/api/meta/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta'] });
      toast.success('Meta updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update meta: ' + error.message);
    },
  });
};


export const useDeleteMeta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/meta/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta'] });
      toast.success('Meta deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete meta: ' + error.message);
    },
  });
};
