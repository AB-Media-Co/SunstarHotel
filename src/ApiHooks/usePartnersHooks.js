// src/ApiHooks/usePartnersHooks.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

/** ------- QUERIES ------- **/
export const useGetPartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/partners');
      return res.data; 
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
};

export const getSinglePartnerById = async (id) => {
  const res = await axiosInstance.get(`/api/partners/${id}`);
  return res.data; // { _id, imageUrl, description, ... }
};

/** ------- MUTATIONS ------- **/
export const useAddPartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (partnerData) => {
      // partnerData: { imageUrl: string, description: string }
      const res = await axiosInstance.post('/api/partners', partnerData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};

export const useEditPartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      // data can be partial: { imageUrl?, description? }
      const res = await axiosInstance.patch(`/api/partners/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};

export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/api/partners/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};

/** ------- OPTIONAL: image upload helpers (reuse your existing endpoints) ------- **/
// If you already have these in another file, you can import and reuse.
// These expect you to get a CDN URL back, then call useAddPartner/useEditPartner with that URL.

export const uploadPartnerLogo = async (file) => {
  const formData = new FormData();
  formData.append('images', file); // backend expects 'images' (single or array)
  const res = await axiosInstance.post('/api/images/upload-single', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // adjust if your backend returns { url } or { urls: [...] }
  return res.data; 
};

export const uploadPartnerLogos = async (files = []) => {
  const formData = new FormData();
  files.forEach((f) => formData.append('images', f));
  const res = await axiosInstance.post('/api/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
