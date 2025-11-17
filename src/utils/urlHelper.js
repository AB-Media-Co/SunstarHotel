// Helper function to generate hotel URL with code and name
export const generateHotelUrl = (hotelCode, hotelName) => {
  if (!hotelCode) return '/hotels';
  
  // Convert hotel name to URL-friendly slug
  const nameSlug = hotelName 
    ? hotelName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
    : '';
  
  return nameSlug ? `/hotels/${hotelCode}-${nameSlug}` : `/hotels/${hotelCode}`;
};

// Helper function to extract hotelCode from URL
export const extractHotelCode = (urlParam) => {
  if (!urlParam) return null;
  
  // If URL contains hyphen, extract code before first hyphen
  if (urlParam.includes('-')) {
    return urlParam.split('-')[0];
  }
  
  // Otherwise return as is (backward compatibility)
  return urlParam;
};
