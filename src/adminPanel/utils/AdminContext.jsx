/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { useViewAdminProfile, useFetchAllUsers } from '../../ApiHooks/useAdminHooks.js'; // Adjust path as needed

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  // Use React Query hooks for fetching admin profile and all users
  const {
    data: adminProfileData,
    isLoading: profileLoading,
    error: profileError,
  } = useViewAdminProfile();
  const {
    data: allUsersData,
    isLoading: usersLoading,
    error: usersError,
  } = useFetchAllUsers();

  // Update adminProfile when data or error changes
  useEffect(() => {
    if (adminProfileData) {
      setAdminProfile(adminProfileData);
    }
    if (profileError) {
      console.error('Error fetching admin profile:', profileError.message);
      setAdminProfile(null); // Clear profile on error
    }
  }, [adminProfileData, profileError]);

  // Update allUsers when data or error changes
  useEffect(() => {
    if (allUsersData) {
      setAllUsers(allUsersData);
    }
    if (usersError) {
      console.error('Error fetching all users:', usersError.message);
      setAllUsers(null); // Clear users on error
    }
  }, [allUsersData, usersError]);

  // Optional manual refetch functions (if needed beyond React Query's automatic fetching)
  const fetchAdminProfile = () => {
    // No need for manual fetch since useViewAdminProfile handles it
    // If you need to force a refetch, use React Query's refetch from useViewAdminProfile
  };

  const fetchAllUsers = () => {
    // No need for manual fetch since useFetchAllUsers handles it
  };

  return (
    <AdminContext.Provider
      value={{
        adminProfile,           // Current user's profile data
        allUsers,              // List of all users
        profileLoading,        // Loading state for admin profile
        usersLoading,          // Loading state for all users
        profileError,          // Error for admin profile fetch
        usersError,            // Error for all users fetch
        fetchAdminProfile,     // Optional manual fetch function
        fetchAllUsers,         // Optional manual fetch function
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

export default AdminProvider;