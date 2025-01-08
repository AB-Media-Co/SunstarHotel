export const getToken = () => {
    const token = localStorage.getItem('token');
    return token || null; // Ensure it always returns a string or null
};

export const removeToken = () => localStorage.removeItem('token');
