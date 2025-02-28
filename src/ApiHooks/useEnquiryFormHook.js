import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast'
const submitEnquiry = async (enquiryData) => {
  const response = await axiosInstance.post('/api/enquiries', enquiryData);
  return response.data;
};

export const useEnquiryForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitEnquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
      toast.success("Enquiry submitted successfully")
    },
  });
};
