/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { useViewAdminProfile, useFetchAllUsers } from '../../ApiHooks/useAdminHooks.js';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAdminProfile = async () => {
    setLoading(true);
    try {
      const data = await useViewAdminProfile();
      setAdminProfile(data);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const data = await useFetchAllUsers();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
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
