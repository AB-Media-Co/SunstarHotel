import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

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

  // Add new amenity
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

  // Update an existing amenity
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

  // Delete an amenity
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

  // Add new location
  const addLocationMutation = useMutation({
    mutationFn: async (location) => {
      const res = await axiosInstance.post('/api/websiteData/locations', location);
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

  // Update an existing location
  const updateLocationMutation = useMutation({
    mutationFn: async ({ id, location }) => {
      const res = await axiosInstance.put(`/api/websiteData/locations/${id}`, location);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Location updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to update location: ${error.message}`);
    },
  });

  // Delete a location
  const deleteLocationMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/api/websiteData/locations/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Location deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => {
      toast.error(`Failed to delete location: ${error.message}`);
    },
  });



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



  return {
    websiteData,
    amenities: websiteData?.amenities || [],
    locations: websiteData?.locations || [],
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


    loading: isLoading,
    error,
    addAmenity: addAmenityMutation.mutateAsync,
    updateAmenity: updateAmenityMutation.mutateAsync,
    deleteAmenity: deleteAmenityMutation.mutateAsync,
    addLocation: addLocationMutation.mutateAsync,
    updateLocation: updateLocationMutation.mutateAsync,
    deleteLocation: deleteLocationMutation.mutateAsync,
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
  };
};

export default useUpdatePagesHook;
