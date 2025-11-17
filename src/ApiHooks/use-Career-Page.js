import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

// Query key
const CAREERS_QK = ['careersPage'];

/**
 * GET /api/careers
 * Fetch the full careers page document
 * opts: optional react-query options (enabled, initialData, etc.)
 */
export const useGetCareersPage = (opts = {}) => {
  return useQuery({
    queryKey: CAREERS_QK,
    queryFn: async () => {
      const res = await axiosInstance.get('/api/careers');
      return res.data; // backend returns the page object directly
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
    ...opts,
  });
};

/**
 * PUT /api/careers
 * Upsert the entire careers page (admin only)
 */
export const useUpsertCareersPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.put('/api/careers', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Careers page saved');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error saving careers page';
      toast.error(msg);
    },
  });
};

/**
 * PATCH /api/careers/hero
 * payload: { heading?, description? }
 */
export const usePatchHero = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.patch('/api/careers/hero', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Hero updated');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error updating hero';
      toast.error(msg);
    },
  });
};

/**
 * PATCH /api/careers/benefits/meta
 * payload: { heading?, description? }
 */
export const usePatchBenefitsMeta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.patch('/api/careers/benefits/meta', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Benefits section updated');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error updating benefits';
      toast.error(msg);
    },
  });
};

/**
 * PATCH /api/careers/join-team
 * payload: { heading?, description? }
 */
export const usePatchJoinTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.patch('/api/careers/join-team', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Join Team updated');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error updating Join Team';
      toast.error(msg);
    },
  });
};

/**
 * PATCH /api/careers/ready-to-join
 * payload: { heading?, description?, email? }
 */
export const usePatchReadyToJoin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.patch('/api/careers/ready-to-join', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Ready To Join updated');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error updating Ready To Join';
      toast.error(msg);
    },
  });
};

/**
 * POST /api/careers/benefit-cards
 * payload: { heading, description }
 */
export const useAddBenefitCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (card) => {
      const res = await axiosInstance.post('/api/careers/benefit-cards', card);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Benefit card added');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error adding benefit card';
      toast.error(msg);
    },
  });
};

/**
 * PUT /api/careers/benefit-cards/:cardId
 * variables: { cardId: string, updateData: { heading?, description? } }
 */
export const useUpdateBenefitCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cardId, updateData }) => {
      const res = await axiosInstance.put(`/api/careers/benefit-cards/${cardId}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Benefit card updated');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error updating benefit card';
      toast.error(msg);
    },
  });
};

/**
 * DELETE /api/careers/benefit-cards/:cardId
 * passes: cardId (string)
 */
export const useDeleteBenefitCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cardId) => {
      const res = await axiosInstance.delete(`/api/careers/benefit-cards/${cardId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Benefit card deleted');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error deleting benefit card';
      toast.error(msg);
    },
  });
};

/**
 * POST /api/careers/simple-cards
 * payload: { description }
 */
export const useAddSimpleCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (card) => {
      const res = await axiosInstance.post('/api/careers/simple-cards', card);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Card added');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error adding card';
      toast.error(msg);
    },
  });
};

/**
 * PUT /api/careers/simple-cards/:cardId
 * variables: { cardId: string, updateData: { description? } }
 */
export const useUpdateSimpleCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cardId, updateData }) => {
      const res = await axiosInstance.put(`/api/careers/simple-cards/${cardId}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Card updated');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error updating card';
      toast.error(msg);
    },
  });
};

/**
 * DELETE /api/careers/simple-cards/:cardId
 * passes: cardId (string)
 */
export const useDeleteSimpleCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cardId) => {
      const res = await axiosInstance.delete(`/api/careers/simple-cards/${cardId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Card deleted');
      queryClient.invalidateQueries({ queryKey: CAREERS_QK });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message ?? error?.message ?? 'Error deleting card';
      toast.error(msg);
    },
  });
};
