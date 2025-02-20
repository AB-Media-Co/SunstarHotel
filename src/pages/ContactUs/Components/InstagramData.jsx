import { useEffect, useState } from 'react';
import axios from 'axios';
import InstagramIcon from '@mui/icons-material/Instagram';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';

const InstagramData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/instagram/posts')
      .then(response => {
        setPosts(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the posts:", error);
        setError("Failed to fetch Instagram posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="content mx-auto">
        {/* Header */}
        <div className="text-start mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Instagram Feed</h1>
          <p className="text-lg text-gray-600">
            Latest posts from our Instagram account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500 mb-8">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((instaPost, index) => (
                <div
                  key={index}
                  className="bg-primary-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  {/* Details Section */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/images/Logo/sunstarlogo.svg"
                        alt="Sunstar Hospitality Logo"
                        className="w-8 h-8"
                      />
                      <div className='flex hover:underline'>
                        <a href="https://www.instagram.com/hotel_sunstar_group" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-gray-800 leading-4">
                          Sunstar <p>Hospitality</p> 
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Image Section with Hover Overlay for Caption */}
                  <Link to={instaPost.permalink} className="relative group ">
                    <img
                      src={instaPost?.media_url}
                      alt="Hotel Sunstar"
                      className="w-full h-[28rem] object-cover"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={`${instaPost.permalink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-green text-primary-white text-sm font-medium rounded hover:bg-primmary-green transition duration-300"
                      >
                        View Post <OpenInNewIcon className="ml-1" fontSize="small" />
                      </a>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramData;