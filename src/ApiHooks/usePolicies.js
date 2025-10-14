import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

/** ------- QUERIES ------- **/

// Get policy by type, e.g. 'privacy-policy' or 'terms-conditions'
export const useGetPolicy = (type) => {
  return useQuery({
    queryKey: ['policy', type],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/policy/${type}`);
      return res.data; // { type, content }
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    enabled: !!type,
  });
};

/** ------- MUTATIONS ------- **/

// Update policy document (rich text HTML string)
export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, content }) => {
      const res = await axiosInstance.put(`/api/policy/${type}`, { content });
      return res.data;
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries({ queryKey: ['policy', type] });
    },
  });
};
