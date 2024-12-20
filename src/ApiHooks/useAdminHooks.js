import { useMutation } from '@tanstack/react-query';
import { loginAdminAPI } from '../Api/admin';

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: loginAdminAPI,
  });
};
