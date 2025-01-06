import { useMutation } from '@tanstack/react-query';
import { loginAdminAPI, registerAdminAPI } from '../Api/admin';

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: loginAdminAPI,
  });
};

export const useAdminRegister = () => {
  return useMutation({
    mutationFn: registerAdminAPI,
  });
};
