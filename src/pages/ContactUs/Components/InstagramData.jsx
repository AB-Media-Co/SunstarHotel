import { useEffect, useState } from 'react';
import axios from 'axios';
import InstagramIcon from '@mui/icons-material/Instagram';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const InstagramData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/instagram/posts')
      .then(response => {
        console.log("API Response:", response.data);
        setPosts(response.data.posts || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Instagram Feed</h1>
          <p className="text-lg text-gray-600">
            Latest posts from our Instagram account
          </p>
        </div>

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
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  {/* Image Section with Hover Overlay for Caption */}
                  <div className="relative group">
                    <img
                      src={`http://localhost:5000/api/instagram/proxy-image?url=${encodeURIComponent(
                        instaPost.imageUrl
                      )}`}
                      alt="Hotel Sunstar"
                      className="w-full h-64 object-cover"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                
                  </div>

                  {/* Details Section */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/images/Logo/sunstarlogo.svg"
                        alt="Sunstar Hospitality Logo"
                        className="w-10 h-10"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          Sunstar Hospitality
                        </p>
                        <a
                          href="https://www.instagram.com/hotel_sunstar_group?igsh=ZjdiMjM4ajY3NWpi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#3C908F] hover:underline flex items-center"
                        >
                          <InstagramIcon className="mr-1" fontSize="small" />
                          @hotel_sunstar_group
                        </a>
                      </div>
                    </div>
                    <a
                      href={`https://www.instagram.com/p/${instaPost.link.split('/p/')[1].replace('/', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 bg-[#3C908F] text-white text-xs font-medium rounded hover:bg-[#3C908F] transition duration-300"
                    >
                      View Post <OpenInNewIcon className="ml-1" fontSize="small" />
                    </a>
                  </div>
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
