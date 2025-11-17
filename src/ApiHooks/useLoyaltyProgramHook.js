import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

/**
 * GET /api/loyalty
 * Fetch full loyalty program page (hero, tiers, how_it_works, sidebar_widget)
 * opts: optional react-query options (enabled, initialData, etc.)
 */
export const useGetLoyaltyProgram = (opts = {}) => {
  return useQuery({
    queryKey: ['loyaltyProgram'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/loyalty');
      console.log(res,"ressss")
      // backend returns the page object directly (res.data)
      return res.data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
    ...opts
  });
};

/**
 * Upsert full loyalty program (PUT /api/loyalty)
 * Admin only — returns updated page
 */
export const useUpsertLoyaltyProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.put('/api/loyalty', payload);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success('Loyalty Program saved');
      queryClient.invalidateQueries({ queryKey: ['loyaltyProgram'] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error saving program';
      toast.error(msg);
    },
  });
};

/**
 * Add tier (POST /api/loyalty/tiers)
 * payload: { level, name, requirement_text, benefit_text, unlock_after_nights, style? }
 */
export const useAddTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tier) => {
      const res = await axiosInstance.post('/api/loyalty/tiers', tier);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Tier added');
      queryClient.invalidateQueries({ queryKey: ['loyaltyProgram'] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error adding tier';
      toast.error(msg);
    },
  });
};

/**
 * Update tier by level (PUT /api/loyalty/tiers/:level)
 * variables: { level: number|string, updateData: {...} }
 */
export const useUpdateTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ level, updateData }) => {
      const res = await axiosInstance.put(`/api/loyalty/tiers/${level}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Tier updated');
      queryClient.invalidateQueries({ queryKey: ['loyaltyProgram'] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error updating tier';
      toast.error(msg);
    },
  });
};

/**
 * Delete tier by level (DELETE /api/loyalty/tiers/:level)
 * passes level (number|string)
 */
export const useDeleteTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (level) => {
      const res = await axiosInstance.delete(`/api/loyalty/tiers/${level}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Tier deleted');
      queryClient.invalidateQueries({ queryKey: ['loyaltyProgram'] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error deleting tier';
      toast.error(msg);
    },
  });
};

/**
 * Seed dev data (POST /api/seed/loyalty)
 * payload: seed JSON object
 * (use carefully — dev only)
 */
export const useSeedLoyaltyProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (seedPayload) => {
      // if seedPayload omitted, backend can reject — prefer to pass a payload
      const res = await axiosInstance.post('/api/seed/loyalty', seedPayload ?? {});
      return res.data;
    },
    onSuccess: () => {
      toast.success('Seeded loyalty program');
      queryClient.invalidateQueries({ queryKey: ['loyaltyProgram'] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error seeding program';
      toast.error(msg);
    },
  });
};
