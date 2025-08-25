/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';

const fetchWebsiteData = async () => {
  const res = await axiosInstance.get('/api/websiteData');
  return res.data;
};

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

  // --- Grid / Gallery ---
  const addGalleryImagesMutation = useMutation({
    mutationFn: async (images) => {
      const res = await axiosInstance.post('/api/websiteData/images', images);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Location added successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to add location: ${error.message}`);
    },
  });

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
  // PUT /api/websiteData/home-partners
  // body can include any of: { heading?, subheading?, layout?, logos?: [{src, alt?, link?}] }
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

  // If loading, return the Loader component
  if (isLoading) {
    return {
      loading: true,
      Loader // Returning Loader component
    };
  }

  return {
    websiteData,
    amenities: websiteData?.amenities || [],
    galleryImages: websiteData?.grid || [],
    shineSection: websiteData?.shineSection || [],
    heroSectionUpdate: websiteData?.heroSection || [],
    offeringSection: websiteData?.whatWeOffers || [],
    whysunstarValue: websiteData?.WhySunstar?.WhySunstarValue || [],
    Testimonials: websiteData?.Testimonials || [],
    CoorporateBooking: websiteData?.CoorporateBooking || [],
    homePageDescription: websiteData?.homePageDescription || [],
    faqs: websiteData?.faqs || [],
    ContactUsDetail: websiteData?.ContactUsDetail || [],
    // 👇 NEW
    homePartners: websiteData?.HomePartners || { logos: [] },

    loading: isLoading,
    error,

    addAmenity: addAmenityMutation.mutateAsync,
    updateAmenity: updateAmenityMutation.mutateAsync,
    deleteAmenity: deleteAmenityMutation.mutateAsync,
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
    // 👇 NEW
    saveHomePartners: saveHomePartnersMutation.mutateAsync,
  };
};

export default useUpdatePagesHook;
