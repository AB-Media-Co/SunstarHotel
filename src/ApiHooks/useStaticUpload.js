import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

/**
 * Upload ONE file to your static media endpoint.
 * Expects backend response: { ok: true, url: "https://.../site_media/filename.png" }
 */
const useStaticUpload = () => {
  return useMutation({
    mutationFn: async (file) => {
      const fd = new FormData();
      fd.append('image', file); // ← "image" to match upload.single('image')
      const res = await axiosInstance.post('/api/media/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data; // { ok, url }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Upload failed');
    },
  });
};
export default useStaticUpload;
