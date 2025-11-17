// src/hooks/useTourAndTravel.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

/**
 * GET the singleton tour & travel content
 * Response: { hero: { title, desc }, advantages: [{ title, desc, types: [{title,desc}] }, ...] }
 */
export const useGetTourAndTravel = (opts = {}) => {
  return useQuery({
    queryKey: ['tourandtravel'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/tourandtravel');
      return response.data;
    },
    staleTime: opts.staleTime ?? 30000,
    refetchOnWindowFocus: opts.refetchOnWindowFocus ?? false,
    enabled: opts.enabled ?? true,
  });
};

/**
 * Upsert (create or update) the singleton content.
 * Send payload shaped like:
 * {
 *   hero: { title: string, desc?: string },
 *   advantages: [
 *     { title: string, desc?: string, types: [{ title: string, desc?: string }] }
 *   ]
 * }
 */
export const useUpsertTourAndTravel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      // Using PUT for upsert (backend supports POST/PUT)
      const response = await axiosInstance.put('/api/tourandtravel', payload);
      return response.data;
    },
    onSuccess: (data) => {
      // toast.success('Content saved'); // enable if you want toast
      queryClient.invalidateQueries({ queryKey: ['tourandtravel'] });
    },
    onError: (err) => {
      console.error(err?.response?.data?.message || 'Error saving tour & travel content');
      // toast.error(err?.response?.data?.message || 'Error saving content');
    },
  });
};

/**
 * Delete the singleton content (optional)
 */
export const useDeleteTourAndTravel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/api/tourandtravel');
      return response.data;
    },
    onSuccess: () => {
      // toast.success('Content deleted');
      queryClient.invalidateQueries({ queryKey: ['tourandtravel'] });
    },
    onError: (err) => {
      console.error(err?.response?.data?.message || 'Error deleting tour & travel content');
    },
  });
};
