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
  
  // Round to 2 decimal places if needed
  const roundedNum = Math.round(num * 100) / 100;
  
  // Convert to Indian number format (lakhs, crores)
  return roundedNum.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
};

/**
 * Formats currency with rupee symbol
 * @param {number|string} value - The number to format
 * @returns {string} Formatted currency with ₹ symbol
 */
export const formatINR = (value) => {
  return `₹${formatCurrency(value)}`;
};
