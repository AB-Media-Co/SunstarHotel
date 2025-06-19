import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

// 🔹 Get all blogs (with optional filters)
export const useGetBlogs2 = (params = {}) => {
  return useQuery({
    queryKey: ['blogs2', params],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/blogs2', { params });
      return response.data.data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};

// 🔹 Get single blog by ID
export const useGetBlogById2 = (id) => {
  return useQuery({
    queryKey: ['blog2', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs2/${id}`);
      return response.data.data;
    },
    enabled: !!id,
    staleTime: 60000,
  });
};

// 🔹 Create blog
export const useCreateBlog2 = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blogData) => {
      const response = await axiosInstance.post('/api/blogs2', blogData);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Blog created successfully');
      queryClient.invalidateQueries({ queryKey: ['blogs2'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error creating blog');
    },
  });
};

// 🔹 Update blog
export const useUpdateBlog2 = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updateData }) => {
      const response = await axiosInstance.put(`/api/blogs2/${id}`, updateData);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Blog updated successfully');
      queryClient.invalidateQueries({ queryKey: ['blogs2'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error updating blog');
    },
  });
};

// 🔹 Delete blog
export const useDeleteBlog2 = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/blogs2/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Blog deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['blogs2'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error deleting blog');
    },
  });
};

// 🔹 Like a blog
export const useLikeBlog2 = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.post(`/api/blogs2/like/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Blog liked');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error liking blog');
    },
  });
};

// 🔹 Add comment to a blog
export const useAddComment2 = () => {
  return useMutation({
    mutationFn: async ({ id, comment }) => {
      const response = await axiosInstance.post(`/api/blogs2/comment/${id}`, comment);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Comment added');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error adding comment');
    },
  });
};

// 🔹 Get blog statistics
export const useBlogStats2 = () => {
  return useQuery({
    queryKey: ['blogs2-stats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/blogs2/stats');
      return response.data.data;
    },
    staleTime: 60000,
  });
};
