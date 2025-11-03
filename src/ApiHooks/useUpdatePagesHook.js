/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';

const DEFAULT_PATH = 'default';

const API = {
  WEBSITE_DATA: '/api/websiteData',
  AMENITIES: '/api/websiteData/amenities',
  GRID: '/api/websiteData/images',
  SHINE_UPSERT: '/api/websiteData/what-makes-us-shine',                 // ⬅️ NEW
  SHINE_GET: '/api/websiteData/what-makes-us-shine',                     // ⬅️ NEW
  SHINE_REPLACE_ITEMS: '/api/websiteData/what-makes-us-shine/items',     // ⬅️ NEW
  SHINE_PATCH_ITEM: (idx) => `/api/websiteData/what-makes-us-shine/items/${idx}`, // ⬅️ NEW
  HERO: '/api/websiteData/heroSection',
  OFFERING: '/api/websiteData/what-we-Offering',
  WHY_SUNSTAR: '/api/websiteData/whysunstarValue',
  TESTIMONIAL: '/api/websiteData/testimonial',
  COORPORATE_BOOKING: '/api/websiteData/coorporate-Booking',
  HOME_PAGE_DESC: '/api/websiteData/homePageDescription',
  FAQS: '/api/websiteData/updateFaqs',
  CONTACT_US: '/api/websiteData/contactUs',
  HOME_PARTNERS: '/api/websiteData/home-partners',
};

const fetchWebsiteData = async () => {
  const res = await axiosInstance.get(API.WEBSITE_DATA);
  return res.data;
};

// Optional: fetch the Shine section alone (lighter payload)
const fetchWhatMakesUsShine = async () => {
  const res = await axiosInstance.get(API.SHINE_GET);
  // console.log(res,"shine")
  return res.data;
};

const useUpdatePagesHook = () => {
  const queryClient = useQueryClient();

  // --- All Website Data (broad cache) ---
  const { data: websiteData, isLoading, error } = useQuery({
    queryKey: ['websiteData'],
    queryFn: fetchWebsiteData,
    staleTime: 1000 * 60,
  });

  // --- What Makes Us Shine (section-only cache) ---
  const { data: whatMakesUsShineData } = useQuery({
    queryKey: ['whatMakesUsShine'],
    queryFn: fetchWhatMakesUsShine,
    // keep it fresh alongside websiteData
    staleTime: 1000 * 60,
  });

  // --- Amenities ---
  const addAmenityMutation = useMutation({
    mutationFn: async (amenity) => {
      const res = await axiosInstance.post(API.AMENITIES, amenity);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Amenity added successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add amenity: ${error.message}`),
  });

  const updateAmenityMutation = useMutation({
    mutationFn: async ({ id, amenity }) => {
      const res = await axiosInstance.put(`${API.AMENITIES}/${id}`, amenity);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Amenity updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to update amenity: ${error.message}`),
  });

  const deleteAmenityMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`${API.AMENITIES}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Amenity deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to delete amenity: ${error.message}`),
  });

  // --- ✅ Grid / Gallery (PATH-AWARE) ---
  const addGalleryImagesMutation = useMutation({
    mutationFn: async (images) => {
      const maybeLegacy =
        images && Array.isArray(images.images) && Array.isArray(images.content);

      const payload = maybeLegacy
        ? { path: DEFAULT_PATH, massonaryGrid: { images: images.images, content: images.content } }
        : {
            path: images?.path || DEFAULT_PATH,
            massonaryGrid: images?.massonaryGrid || { images: [], content: [] },
          };

      const res = await axiosInstance.post(API.GRID, payload);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      const p =
        (variables && variables.path) ||
        (variables && variables.massonaryGrid && DEFAULT_PATH) ||
        DEFAULT_PATH;

      toast.success(`Gallery updated for "${p}"!`);
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
      queryClient.invalidateQueries({ queryKey: ['websiteData', 'gallery', p] });
    },
    onError: (error) => toast.error(`Failed to update gallery: ${error.message}`),
  });

  // Helper: pick grid by path from cached websiteData
  const getGalleryByPath = (path = DEFAULT_PATH) => {
    const grid = websiteData?.grid || {};
    return grid?.[path] ?? grid?.[DEFAULT_PATH] ?? { images: [], content: [] };
  };

  // --- ⭐ What Makes Us Shine (NEW ENDPOINTS) ---
  // Upsert whole section (heading, description, exactly 3 items)
  const upsertWhatMakesUsShineMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(API.SHINE_UPSERT, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('What Makes Us Shine saved!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
      queryClient.invalidateQueries({ queryKey: ['whatMakesUsShine'] });
    },
    onError: (error) => toast.error(error?.response?.data?.error || `Failed to save: ${error.message}`),
  });

  // Replace only items (exactly 3)
  const replaceShineItemsMutation = useMutation({
    mutationFn: async (items) => {
      const res = await axiosInstance.put(API.SHINE_REPLACE_ITEMS, { items });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Shine items replaced!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
      queryClient.invalidateQueries({ queryKey: ['whatMakesUsShine'] });
    },
    onError: (error) => toast.error(error?.response?.data?.error || `Failed to replace items: ${error.message}`),
  });

  // Patch a single item by index (0/1/2)
  const patchShineItemMutation = useMutation({
    mutationFn: async ({ index, patch }) => {
      const res = await axiosInstance.patch(API.SHINE_PATCH_ITEM(index), patch);
      return res.data;
    },
    onSuccess: (_data, vars) => {
      toast.success(`Shine item ${vars?.index} updated!`);
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
      queryClient.invalidateQueries({ queryKey: ['whatMakesUsShine'] });
    },
    onError: (error) => toast.error(error?.response?.data?.error || `Failed to update item: ${error.message}`),
  });

  // --- Hero ---
  const HeroSectionMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post(API.HERO, Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Hero Section Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
  });

  // --- What we offer ---
  const whatWeOfferingMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post(API.OFFERING, Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('What-we-Offering Section Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
  });

  // --- Why Sunstar ---
  const whysunstarValueMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post(API.WHY_SUNSTAR, Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Value Section Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
  });

  // --- Testimonials ---
  const TestimonialsMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post(API.TESTIMONIAL, Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('testimonial Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
  });

  // --- Corporate Booking ---
  const CoorporateBookingMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post(API.COORPORATE_BOOKING, Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('CoorporateBooking Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
  });

  // --- Home Page Description ---
  const HomePageDescriptionMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post(API.HOME_PAGE_DESC, Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Description Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
  });

  // --- FAQs ---
  const faqsSectionMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post(API.FAQS, Data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Faq Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
  });

  // --- Contact Us ---
  const updateContactUsDetailMutation = useMutation({
    mutationFn: async (Data) => {
      const res = await axiosInstance.post(API.CONTACT_US, Data);
      return res.data; // ⬅️ FIX: previously returned the raw response
    },
    onSuccess: () => {
      toast.success('contactUs Updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
    onError: (error) => toast.error(`Failed to add: ${error.message}`),
  });

  // --- ✅ Home Partners (single upsert) ---
  const saveHomePartnersMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.put(API.HOME_PARTNERS, data);
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

    // Section-specific cache (optional, but handy in UI)
    whatMakesUsShineData,

    amenities: websiteData?.amenities || [],
    galleryImages:
      websiteData?.grid?.[DEFAULT_PATH] ||
      websiteData?.grid ||
      [],
    shineSection: websiteData?.shineSection || [], // (legacy shine if you still use it)
    heroSectionUpdate: websiteData?.heroSection || [],
    offeringSection: websiteData?.whatWeOffers || [],
    whysunstarValue: websiteData?.WhySunstar?.WhySunstarValue || [],
    Testimonials: websiteData?.Testimonials || [],
    CoorporateBooking: websiteData?.CoorporateBooking || [],
    homePageDescription: websiteData?.homePageDescription || [],
    faqs: websiteData?.faqs || [],
    ContactUsDetail: websiteData?.ContactUsDetail || [],
    homePartners: websiteData?.HomePartners || { logos: [] },

    // Helpers
    getGalleryByPath,

    loading: isLoading,
    error,

    // Amenity ops
    addAmenity: addAmenityMutation.mutateAsync,
    updateAmenity: updateAmenityMutation.mutateAsync,
    deleteAmenity: deleteAmenityMutation.mutateAsync,

    // Grid
    addGalleryImages: addGalleryImagesMutation.mutateAsync,

    // ⭐ Shine ops (NEW)
    upsertWhatMakesUsShine: upsertWhatMakesUsShineMutation.mutateAsync,
    replaceShineItems: replaceShineItemsMutation.mutateAsync,
    patchShineItem: patchShineItemMutation.mutateAsync,

    // Other sections
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
