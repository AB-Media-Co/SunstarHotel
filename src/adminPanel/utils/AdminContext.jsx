/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import { useViewAdminProfile, useFetchAllUsers } from '../../ApiHooks/useAdminHooks.js';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { data: adminProfile, isLoading: isProfileLoading, error: profileError } = useViewAdminProfile();
  const { data: allUsers, isLoading: isUsersLoading, error: usersError } = useFetchAllUsers();

  return (
    <AdminContext.Provider
      value={{
        adminProfile,
        isProfileLoading,
        profileError,
        allUsers,
        isUsersLoading,
        usersError,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
