/**
 * Formats a number with thousand separators (Indian format)
 * @param {number|string} value - The number to format
 * @returns {string} Formatted number with commas
 * 
 * Examples:
 * 5000 → 5,000
 * 50000 → 50,000
 * 500000 → 5,00,000
 * 5000000 → 50,00,000
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined || value === '') return '0';
  
  // Convert to number if string
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // Handle invalid numbers
  if (isNaN(num)) return '0';
  
  // Round to nearest integer (no decimals)
  const roundedNum = Math.round(num);
  
  // Convert to Indian number format (lakhs, crores) without decimals
  return roundedNum.toLocaleString('en-IN');
};

/**
 * Formats currency with rupee symbol
 * @param {number|string} value - The number to format
 * @returns {string} Formatted currency with ₹ symbol
 */
export const formatINR = (value) => {
  return `₹${formatCurrency(value)}`;
};