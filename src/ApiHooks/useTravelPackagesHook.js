import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

// ----------- PACKAGE HOOKS ----------- //

export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPackage) => {
      const response = await axiosInstance.post('/api/packages', newPackage);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Package created successfully");
      queryClient.invalidateQueries(['packages']);
    },
    onError: (error) => {
      toast.error("Error creating package: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/packages');
      return response.data;
    },
    onError: (error) => {
      toast.error("Error fetching packages: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const usePackagesByState = (state) => {
  return useQuery({
    queryKey: ['packagesByState', state],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/packages/state/${state}`);
      return response.data;
    },
    enabled: !!state,
    onError: (error) => {
      toast.error("Error fetching packages by state: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const usePackageById = (id) => {
  return useQuery({
    queryKey: ['package', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/packages/${id}`);
      return response.data;
    },
    enabled: !!id,
    onError: (error) => {
      toast.error("Error fetching package: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedPackage) => {
      if (!updatedPackage._id) throw new Error("Package ID is required for update");
      const response = await axiosInstance.put(`/api/packages/${updatedPackage._id}`, updatedPackage);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Package updated successfully");
      queryClient.invalidateQueries(['packages']);
    },
    onError: (error) => {
      toast.error("Error updating package: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/packages/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Package deleted successfully");
      queryClient.invalidateQueries(['packages']);
    },
    onError: (error) => {
      toast.error("Error deleting package: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const useTopSellingPackages = () => {
  return useQuery({
    queryKey: ['topSellingPackages'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/packages/top-selling');
      return response.data;
    },
    onError: (error) => {
      toast.error("Error fetching top packages: " + (error?.response?.data?.message || error.message));
    }
  });
};

// ----------- STATE HOOKS ----------- //

export const useCreateState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newState) => {
      const response = await axiosInstance.post('/api/states', newState);
      return response.data;
    },
    onSuccess: () => {
      toast.success("State created successfully");
      queryClient.invalidateQueries(['states']);
    },
    onError: (error) => {
      toast.error("Error creating state: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const useGetStates = () => {
  return useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/states');
      return response.data;
    },
    onError: (error) => {
      toast.error("Error fetching states: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const useStatesWithSummary = () => {
  return useQuery({
    queryKey: ['statesSummary'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/states/summary');
      return response.data;
    },
    onError: (error) => {
      toast.error("Error fetching state summaries: " + (error?.response?.data?.message || error.message));
    }
  });
};


export const useUpdateState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedState) => {
      if (!updatedState._id) throw new Error("State ID is required for update");
      const response = await axiosInstance.put(`/api/states/${updatedState._id}`, updatedState);
      return response.data;
    },
    onSuccess: () => {
      toast.success("State updated successfully");
      queryClient.invalidateQueries(['states']);
    },
    onError: (error) => {
      toast.error("Error updating state: " + (error?.response?.data?.message || error.message));
    }
  });
};

export const useDeleteState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/api/states/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("State deleted successfully");
      queryClient.invalidateQueries(['states']);
    },
    onError: (error) => {
      toast.error("Error deleting state: " + (error?.response?.data?.message || error.message));
    }
  });
};
