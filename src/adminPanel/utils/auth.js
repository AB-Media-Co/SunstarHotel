// Get the token from localStorage
export const getToken = () => {
    const token = localStorage.getItem('token');
    return token || null; // Ensure it always returns a string or null
};

// Remove the token from localStorage
export const removeToken = () => localStorage.removeItem('token');
