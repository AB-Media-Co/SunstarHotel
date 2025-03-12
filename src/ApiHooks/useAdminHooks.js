import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  loginAdminAPI,
  registerAdminAPI,
  viewProfileApi,
  allUsersApi,
  editProfileApi,
  deleteProfileApi,
  editUserProfileByIdApi,
  deleteUserProfileByIdApi,
} from '../api/admin';

// Login hook
export const useAdminLogin = () => {
  return useMutation({
    mutationFn: loginAdminAPI,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token); // Store token on successful login
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });
};

// Register hook
export const useAdminRegister = () => {
  return useMutation({
    mutationFn: registerAdminAPI,
    onError: (error) => {
      console.error('Registration failed:', error.message);
    },
  });
};

// View admin profile hook
export const useViewAdminProfile = () => {
  return useQuery({
    queryKey: ['adminProfile'],
    queryFn: viewProfileApi,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: !!localStorage.getItem('token'), // Only run if token exists
    onError: (error) => {
      console.error('Failed to fetch profile:', error.message);
    },
  });
};

// Fetch all users hook
export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: allUsersApi,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: !!localStorage.getItem('token'), // Only run if token exists
    onError: (error) => {
      console.error('Failed to fetch all users:', error.message);
    },
  });
};

// Edit admin profile hook
export const useEditAdminProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminProfile']); // Refresh profile data
    },
    onError: (error) => {
      console.error('Failed to update profile:', error.message);
    },
  });
};

// Delete admin profile hook
export const useDeleteAdminProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfileApi,
    onSuccess: () => {
      queryClient.removeQueries(['adminProfile']); // Clear profile cache
      localStorage.removeItem('token'); // Remove token on self-deletion
    },
    onError: (error) => {
      console.error('Failed to delete profile:', error.message);
    },
  });
};

// Edit a user profile by ID hook
export const useEditUserProfileById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUserProfileByIdApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['allUsers']); // Refresh all users list
      queryClient.invalidateQueries(['adminProfile']); // Refresh current user's profile if modified
    },
    onError: (error) => {
      console.error('Failed to update user profile:', error.message);
    },
  });
};

// Delete a user profile by ID hook
export const useDeleteUserProfileById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserProfileByIdApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['allUsers']); // Refresh all users list
    },
    onError: (error) => {
      console.error('Failed to delete user profile:', error.message);
    },
  });
};