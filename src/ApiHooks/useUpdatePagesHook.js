/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';

const fetchWebsiteData = async () => {
  const res = await axiosInstance.get('/api/websiteData');
  return res.data;
};

const DEFAULT_PATH = 'default';

const useUpdatePagesHook = () => {
  const queryClient = useQueryClient();

  const { data: websiteData, isLoading, error } = useQuery({
    queryKey: ['websiteData'],
    queryFn: fetchWebsiteData,
    staleTime: 1000 * 60,
  });

  // --- Amenities ---
  const addAmenityMutation = useMutation({
    mutationFn: async (amenity) => {
      const res = await axiosInstance.post('/api/websiteData/amenities', amenity);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Amenity added successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add amenity: ${error.message}`);
    },
  });

  const updateAmenityMutation = useMutation({
    mutationFn: async ({ id, amenity }) => {
      const res = await axiosInstance.put(`/api/websiteData/amenities/${id}`, amenity);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Amenity updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to update amenity: ${error.message}`);
    },
  });

  const deleteAmenityMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/api/websiteData/amenities/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Amenity deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to delete amenity: ${error.message}`);
    },
  });

  // --- ✅ Grid / Gallery (PATH-AWARE) ---
  const addGalleryImagesMutation = useMutation({
    /**
     * images param (kept name for backward-compat) should be:
     * { path?: 'default'|'travelAgent'|'career', massonaryGrid: { images: string[], content: any[] } }
     */
    mutationFn: async (images) => {
      // Handle old callers that might still send { images, content } shape
      // If someone mistakenly calls mutate({ images:[], content:[] }) we convert it.
      const maybeLegacy =
        images && Array.isArray(images.images) && Array.isArray(images.content);

      const payload = maybeLegacy
        ? { path: DEFAULT_PATH, massonaryGrid: { images: images.images, content: images.content } }
        : {
            path: images?.path || DEFAULT_PATH,
            massonaryGrid: images?.massonaryGrid || { images: [], content: [] },
          };

      const res = await axiosInstance.post('/api/websiteData/images', payload);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      const p =
        (variables && variables.path) ||
        (variables && variables.massonaryGrid && DEFAULT_PATH) ||
        DEFAULT_PATH;

      toast.success(`Gallery updated for "${p}"!`);
      // Invalidate the broad cache + any path-scoped cache if you add one later
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
      queryClient.invalidateQueries({ queryKey: ['websiteData', 'gallery', p] });
    },
    onError: (error) => {
      toast.error(`Failed to update gallery: ${error.message}`);
    },
  });

  // Helper: pick grid by path from cached websiteData
  const getGalleryByPath = (path = DEFAULT_PATH) => {
    const grid = websiteData?.grid || {};
    // Prefer specific path; fall back to default; else empty structure
    return grid?.[path] ?? grid?.[DEFAULT_PATH] ?? { images: [], content: [] };
  };

  // --- Shine ---
  const whatMakesUsShineMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/shine', Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Shine Section Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- Hero ---
  const HeroSectionMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/heroSection', Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Hero Section Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- What we offer ---
  const whatWeOfferingMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/what-we-Offering', Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('What-we-Offering Section Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- Why Sunstar ---
  const whysunstarValueMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/whysunstarValue', Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Value Section Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- Testimonials ---
  const TestimonialsMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/testimonial', Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('testimonial Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- Corporate Booking ---
  const CoorporateBookingMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/coorporate-Booking', Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('CoorporateBooking Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- Home Page Description ---
  const HomePageDescriptionMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/homePageDescription', Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Description Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- FAQs ---
  const faqsSectionMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/updateFaqs', Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Faq Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- Contact Us ---
  const updateContactUsDetailMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post('/api/websiteData/contactUs', Data);
      return res;
    },
    onSuccess: () => {
      toast.success('contactUs Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  // --- ✅ Home Partners (single upsert) ---
  const saveHomePartnersMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.put('/api/websiteData/home-partners', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Home Partners saved successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || error?.message || 'Failed to save Home Partners';
      toast.error(msg);
    },
  });

  // Loader shortcut
  if (isLoading) {
    return {
      loading: true,
      Loader,
    };
  }

  return {
    websiteData,

    amenities: websiteData?.amenities || [],
    // ⬇️ Back-compat: if you used galleryImages directly, this returns default grid or the raw grid
    galleryImages:
      websiteData?.grid?.[DEFAULT_PATH] ||
      websiteData?.grid ||
      [],
    shineSection: websiteData?.shineSection || [],
    heroSectionUpdate: websiteData?.heroSection || [],
    offeringSection: websiteData?.whatWeOffers || [],
    whysunstarValue: websiteData?.WhySunstar?.WhySunstarValue || [],
    Testimonials: websiteData?.Testimonials || [],
    CoorporateBooking: websiteData?.CoorporateBooking || [],
    homePageDescription: websiteData?.homePageDescription || [],
    faqs: websiteData?.faqs || [],
    ContactUsDetail: websiteData?.ContactUsDetail || [],
    homePartners: websiteData?.HomePartners || { logos: [] },

    // 🔹 Helper to fetch the correct grid from cached websiteData
    getGalleryByPath,

    loading: isLoading,
    error,

    addAmenity: addAmenityMutation.mutateAsync,
    updateAmenity: updateAmenityMutation.mutateAsync,
    deleteAmenity: deleteAmenityMutation.mutateAsync,

    // ⬇️ same name as before, now accepts { path, massonaryGrid }
    addGalleryImages: addGalleryImagesMutation.mutateAsync,

    whatMakesUsShine: whatMakesUsShineMutation.mutateAsync,
    updateHerosection: HeroSectionMutation.mutateAsync,
    updateOfferingSection: whatWeOfferingMutation.mutateAsync,
    updateWhySunstarValueection: whysunstarValueMutation.mutateAsync,
    updateTestimonials: TestimonialsMutation.mutateAsync,
    updtateCoorporateBooking: CoorporateBookingMutation.mutateAsync,
    updateHomepageDescriptionData: HomePageDescriptionMutation.mutateAsync,
    updateFaq: faqsSectionMutation.mutateAsync,
    updateContactUs: updateContactUsDetailMutation.mutateAsync,
    saveHomePartners: saveHomePartnersMutation.mutateAsync,
  };
};

export default useUpdatePagesHook;
