/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { useViewAdminProfile, useFetchAllUsers } from '../../ApiHooks/useAdminHooks.js';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: adminProfileData, error: adminProfileError } = useViewAdminProfile();
  const { data: allUsersData, error: allUsersError } = useFetchAllUsers();

  useEffect(() => {
    if (adminProfileError) {
      console.error("Error fetching admin profile:", adminProfileError);
    } else {
      setAdminProfile(adminProfileData);
    }
  }, [adminProfileData, adminProfileError]);

  useEffect(() => {
    if (allUsersError) {
      console.error("Error fetching users:", allUsersError);
    } else {
      setAllUsers(allUsersData);
    }
  }, [allUsersData, allUsersError]);

  const fetchAdminProfile = () => {
    setLoading(true);
    // Admin profile fetching logic is now handled by the useViewAdminProfile hook
  };

  const fetchAllUsers = () => {
    setLoading(true);
    // Fetching users is now handled by useFetchAllUsers hook
  };

  return (
    <AdminContext.Provider
      value={{
        adminProfile,
        allUsers,
        loading,
        fetchAdminProfile,
        fetchAllUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
