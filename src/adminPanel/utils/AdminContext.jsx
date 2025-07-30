/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useViewAdminProfile, useFetchAllUsers } from '../../ApiHooks/useAdminHooks.js'; // Adjust path as needed

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  // React Query hooks
  const {
    data: adminProfileData,
    isLoading: isProfileLoading,
    error: profileError,
    refetch: refetchAdminProfile,
  } = useViewAdminProfile();

  const {
    data: allUsersData,
    isLoading: isUsersLoading,
    error: usersError,
    refetch: refetchAllUsers,
  } = useFetchAllUsers();

  // Handle admin profile updates and errors
  useEffect(() => {
    if (adminProfileData) {
      setAdminProfile(adminProfileData);
    } else if (profileError) {
      console.error('Error fetching admin profile:', profileError.message);
      setAdminProfile(null);
    }
  }, [adminProfileData, profileError]);

  // Handle all users updates and errors
  useEffect(() => {
    if (allUsersData) {
      setAllUsers(allUsersData);
    } else if (usersError) {
      console.error('Error fetching users list:', usersError.message);
      setAllUsers(null);
    }
  }, [allUsersData, usersError]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    adminProfile,
    allUsers,
    isProfileLoading,
    isUsersLoading,
    profileError,
    usersError,
    refetchAdminProfile,
    refetchAllUsers,
  }), [
    adminProfile,
    allUsers,
    isProfileLoading,
    isUsersLoading,
    profileError,
    usersError,
    refetchAdminProfile,
    refetchAllUsers,
  ]);

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use admin context
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

export default AdminProvider;
