import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

// ---------- CREATE JOB POST ---------- //
export const useCreateJobPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newJobPost) => {
      const response = await axiosInstance.post('/api/jobs/create', newJobPost);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Job post created successfully");
      queryClient.invalidateQueries(['jobPosts']);
    },
    onError: (error) => {
      toast.error("Error creating job post: " + (error?.response?.data?.message || error.message));
    }
  });
};

// ---------- GET ALL JOB POSTS ---------- //
export const useJobPosts = () => {
  return useQuery({
    queryKey: ['jobPosts'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/jobs');
      return response.data;
    },
    onError: (error) => {
      toast.error("Error fetching job posts: " + (error?.response?.data?.message || error.message));
    }
  });
};

// ---------- GET SINGLE JOB POST ---------- //
export const useJobPostById = (id) => {
  return useQuery({
    queryKey: ['jobPost', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/jobs/${id}`);
      return response.data;
    },
    enabled: !!id,
    onError: (error) => {
      toast.error("Error fetching job post: " + (error?.response?.data?.message || error.message));
    }
  });
};

// ---------- UPDATE JOB POST ---------- //
export const useUpdateJobPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedJobPost) => {
      if (!updatedJobPost._id) throw new Error("Job post ID is required for update");
      const response = await axiosInstance.put(`/api/jobs/${updatedJobPost._id}`, updatedJobPost);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Job post updated successfully");
      queryClient.invalidateQueries(['jobPosts']);
    },
    onError: (error) => {
      toast.error("Error updating job post: " + (error?.response?.data?.message || error.message));
    }
  });
};

// ---------- DELETE JOB POST ---------- //
export const useDeleteJobPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/jobs/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Job post deleted successfully");
      queryClient.invalidateQueries(['jobPosts']);
    },
    onError: (error) => {
      toast.error("Error deleting job post: " + (error?.response?.data?.message || error.message));
    }
  });
};
