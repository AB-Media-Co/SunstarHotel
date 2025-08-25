import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

/** 🔹 Get agents (optional role filter) */
export const useGetAgents = (params = {}) => {
  return useQuery({
    queryKey: ['agents', params],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/agents', { params });
      return res?.data?.data || []; // array of agents
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
};

/** ⚠️ Only use if your backend exposes GET /api/agents/:id */
export const useGetAgentById = (id) => {
  return useQuery({
    queryKey: ['agent', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/agents/${id}`);
      return res?.data?.data || null; // single agent
    },
    staleTime: 60_000,
  });
};

/** 🔹 Login (send OTP) — backend may return 202/200 + message */
export const useLoginAgent = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post('/api/agents/login', payload);
      // expected: { ok, message, data?: { email, role } }
      return { httpStatus: res.status, ...res.data };
    },
    onSuccess: (resp) => {
      toast.success(resp?.message || 'OTP sent to your email');
      // UI should show OTP step/modal
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });
};

/**
 * 🔹 Verify OTP — handle:
 *  - Approved: 200, { ok:true, data:{ approved:true } }
 *  - Pending: 200/202, { ok:true, pendingApproval:true } OR { ok:true, data:{ approved:false } }
 *  - Old backend pending: 403 with message
 */
export const useVerifyAgentOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post('/api/agents/verify-otp', payload);
      return { httpStatus: res.status, ...res.data };
    },
    onSuccess: (resp, vars) => {
      const emailKey = String(resp?.data?.email || vars?.email || '').toLowerCase();

      // persist email so pages query the same key
      if (emailKey) localStorage.setItem('user_email', emailKey);

      // ⚡️ seed cache so UI updates instantly
      if (resp?.data) {
        queryClient.setQueryData(['agent-by-email', emailKey], resp.data);
      }
      // and refetch to be safe
      queryClient.invalidateQueries({ queryKey: ['agent-by-email', emailKey] });
      queryClient.invalidateQueries({ queryKey: ['agents'] });

      if (resp?.pendingApproval === true || resp?.data?.approved === false) {
        toast.success(resp?.message || 'Verified. Your account is pending approval.');
      } else if (resp?.ok) {
        toast.success(resp?.message || 'Login successful');
      } else {
        toast.error(resp?.message || 'Verification failed');
      }
    },
    onError: (error) => {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message;

      // Old backend pending case (403)
      if (status === 403) {
        toast.success(msg || 'Verified. Your account is pending approval.');
        return;
      }
      toast.error(msg || 'Invalid or expired OTP');
    },
  });
};

/** 🔹 Resend OTP — reuse login endpoint */
export const useResendAgentOtp = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post('/api/agents/login', payload);
      return res.data;
    },
    onSuccess: (resp) => {
      toast.success(resp?.message || 'OTP re-sent');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to resend OTP');
    },
  });
};

/** 🔹 Approve an agent/corporate */
export const useApproveAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      // backend route is PATCH /api/agents/:id/approve
      const res = await axiosInstance.post(`/api/agents/${id}/approve`);
      return res?.data?.data;
    },
    onSuccess: (data) => {
      toast.success('Agent approved');
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      if (data?._id) {
        queryClient.setQueryData(['agent', data._id], data);
      }
      if (data?.email) {
        queryClient.invalidateQueries({ queryKey: ['agent-by-email', String(data.email).toLowerCase()] });
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Approval failed');
    },
  });
};

/** 🔹 Get by email (auto-polls while verified && !approved) */
export const useGetAgentByEmail = (email) => {
  const key = String(email || '').toLowerCase();

  return useQuery({
    queryKey: ['agent-by-email', key],
    enabled: !!key,
    queryFn: async () => {
      const res = await axiosInstance.get('/api/agents/by-email', { params: { email: key } });
      return res?.data?.data || null; // { _id, email, role, approved, isVerified, ... }
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    // 🔁 While verified but not approved, poll every 15s so button flips automatically
    refetchInterval: (data) => (data && data.isVerified && !data.approved ? 15000 : false),
  });
};

/** 🔹 Delete agent/corporate */
export const useDeleteAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/api/agents/${id}`);
      return res.data;
    },
    onSuccess: (resp) => {
      toast.success(resp?.message || 'Agent deleted');
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      // optional: you can also clear any cached 'agent-by-email' if you know the email
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Delete failed');
    },
  });
};
