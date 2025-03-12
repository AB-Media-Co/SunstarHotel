import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

// Get all blogs
export const useGetBlogs = (keyword = '', category = '') => {
  return useQuery({
    // Include keyword and category in queryKey so React Query knows when to refetch
    queryKey: ['blogs', keyword, category],
    queryFn: async () => {
      const queryParams = [];
      if (keyword) queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
      if (category) queryParams.push(`category=${encodeURIComponent(category)}`);

      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      const response = await axiosInstance.get(`/api/blogs${queryString}`);
      return response.data;
    },
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });
};
// Get single blog by ID (for admin use)
export const useGetBlogById = (id) => {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};

// Add a new blog
export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBlog) => {
      const response = await axiosInstance.post('/api/blogs', newBlog);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog added successfully');
    },
    onError: (error) => {
      toast.error(`Failed to add blog: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Add multiple blogs
export const useAddMultipleBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blogsArray) => {
      const response = await axiosInstance.post('/api/blogs/bulk', blogsArray);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Multiple blogs added successfully');
    },
    onError: (error) => {
      toast.error(`Failed to add multiple blogs: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Update a blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updateData }) => {
      const response = await axiosInstance.put(`/api/blogs/${id}`, updateData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blogs', data.data._id] });
      toast.success('Blog updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update blog: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Delete a blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/blogs/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete blog: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Get single blog by slug (for public use)
export const useGetBlogBySlug = (slug) => {
  return useQuery({
    queryKey: ['blogs', slug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/slug/${slug}`);
      return response.data;
    },
    enabled: !!slug,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};
