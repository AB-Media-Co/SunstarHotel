/**
 * Format hotel address to show only the main location part
 * For example: "8A/33, W.E.A. Channa Market, Karol Bagh, New Delhi-5" 
 * becomes "Channa Market, Karol Bagh, New Delhi-5"
 * 
 * @param {string} fullAddress - The full hotel address
 * @returns {string} - The formatted address
 */
export const formatHotelAddress = (fullAddress) => {
  if (!fullAddress) return '';
  
  // Look for patterns like "Channa Market, Karol Bagh, New Delhi-5"
  // This regex looks for a pattern with at least two comma-separated parts after removing the street number/part
  const match = fullAddress.match(/[^,]+,\s*([^,]+,\s*[^,]+(?:,\s*[^,]+)?)$/);
  
  if (match && match[1]) {
    return match[1].trim();
  }
  
  // If the regex doesn't match, return the original address
  return fullAddress;
};