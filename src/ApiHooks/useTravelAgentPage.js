import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

// ✅ GET Full Travel Agent Page
export const useGetTravelAgentPage = (opts = {}) => {
  return useQuery({
    queryKey: ['travelAgentPage'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/travel-agent');
      console.log(res)
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 30000,
    ...opts,
  });
};

// ✅ Update Hero (heading / description)
export const usePatchTAHero = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.patch('/api/travel-agent/hero', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Hero updated');
      qc.invalidateQueries({ queryKey: ['travelAgentPage'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

// ✅ Add Single Card (Partner or How It Works)
export const useAddTACard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload /* { section, title, description, icon? } */) => {
      const res = await axiosInstance.post('/api/travel-agent/cards', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Card added');
      qc.invalidateQueries({ queryKey: ['travelAgentPage'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

// ✅ Add Multiple Cards
export const useBulkAddTACards = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload /* { section, cards: [] } */) => {
      const res = await axiosInstance.post('/api/travel-agent/cards/bulk', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Cards added');
      qc.invalidateQueries({ queryKey: ['travelAgentPage'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

// ✅ Update Single Card
export const useUpdateTACard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ section, cardId, update }) => {
      const res = await axiosInstance.put(`/api/travel-agent/cards/${section}/${cardId}`, update);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Card updated');
      qc.invalidateQueries({ queryKey: ['travelAgentPage'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};

// ✅ Delete Single Card
export const useDeleteTACard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ section, cardId }) => {
      const res = await axiosInstance.delete(`/api/travel-agent/cards/${section}/${cardId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Card deleted');
      qc.invalidateQueries({ queryKey: ['travelAgentPage'] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || e.message),
  });
};
