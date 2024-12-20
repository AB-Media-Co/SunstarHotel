import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminLogin } from '../../ApiHooks/useAdminHooks';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const { mutate, isLoading, isError, error } = useAdminLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    const userData = { username, password };

    // Call the mutation to log in the admin
    mutate(userData, {
      onSuccess: (data) => {
        console.log('Login successful', data);
        localStorage.setItem('token', data.token); // Store the token in localStorage
        navigate('/admin/hotels');
      },
      onError: (error) => {
        console.error('Login failed', error);
        alert(error?.response?.data?.message || 'Login failed');
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-blue-500 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8 animate-fade-in">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative input-wrapper">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-2xl outline-none peer focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-2xl outline-none peer focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {isError && <p className="text-red-500 mt-4 text-center">{error?.response?.data?.message || 'Something went wrong!'}</p>}
        </form>
      </div>
    </div>
  );
};
