// Updated React Query hooks for admin APIs

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  loginAdminAPI,
  registerAdminAPI,
  viewProfileApi,
  allusersApi,
  editProfileApi,
  deleteProfileApi,
  editUserProfileByIdApi,
  deleteUserProfileByIdApi
} from '../Api/admin';


// Login hook
export const useAdminLogin = () => {
  return useMutation({
    mutationFn: loginAdminAPI,
  });
};

// Register hook
export const useAdminRegister = () => {
  return useMutation({
    mutationFn: registerAdminAPI,
  });
};

export const useViewAdminProfile = () => {
  return useQuery({
    queryKey: ['adminProfile'],
    queryFn: viewProfileApi,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: allusersApi,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// Hook to edit admin profile
export const useEditAdminProfile = () => {
  const queryClient = useQueryClient(); // Access query client

  return useMutation({
    mutationFn: editProfileApi, // Function to send edit request
    onSuccess: () => {
      // Invalidate the 'adminProfile' query to trigger a refetch
      queryClient.invalidateQueries(['adminProfile']);
    },
    onError: (error) => {
      console.error('Failed to update profile:', error.response?.data?.message || error.message);
    },
  });
};


export const useDeleteAdminProfile = () => {
  const queryClient = useQueryClient(); // Access query client

  return useMutation({
    mutationFn: deleteProfileApi, // Function to send delete request
    onSuccess: () => {
      // Optionally clear 'adminProfile' cache or handle logout flow
      queryClient.removeQueries(['adminProfile']);
    },
    onError: (error) => {
      console.error('Failed to delete profile:', error.response?.data?.message || error.message);
    },
  });
};



// Hook to edit a user profile by ID
export const useEditUserProfileById = () => {
  const queryClient = useQueryClient(); // Access query client

  return useMutation({
    mutationFn: editUserProfileByIdApi, // Function to send edit request
    onSuccess: () => {
      // Invalidate the 'allUsers' query to refresh the user list
      queryClient.invalidateQueries(['allUsers']);
    },
    onError: (error) => {
      console.error('Failed to update user profile:', error.response?.data?.message || error.message);
    },
  });
};

// Hook to delete a user profile by ID
export const useDeleteUserProfileById = () => {
  const queryClient = useQueryClient(); // Access query client

  return useMutation({
    mutationFn: deleteUserProfileByIdApi, // Function to send delete request
    onSuccess: () => {
      // Invalidate the 'allUsers' query to refresh the user list
      queryClient.invalidateQueries(['allUsers']);
    },
    onError: (error) => {
      console.error('Failed to delete user profile:', error.response?.data?.message || error.message);
    },
  });
};
