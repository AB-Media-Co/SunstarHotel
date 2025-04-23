import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useGetBlogs } from "../../ApiHooks/useBlogHooks";
import SearchIcon from '@mui/icons-material/Search';
const categories = [
  "Hospitality",
  "First-Time Visitors",
  "Location & Access",
  "Hotel Features",
  "Travel Tips",
  "Nearby Tours",
  "Shopping",
  "Wellness",
  "Guest Stories",
  "Dining",
  "Tourism & Culture",
  "Day Trips",
  "Events & Festivities",
  "International Travel",
  "Local Life",
  "Behind the Scenes",
  "Luxury on Budget",
  "Sustainability",
  "Travel Essentials",
  "Scam Awareness"
];

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); 
  
  // First, get all blogs to determine available categories
  const { data: allBlogs, isLoading: loadingAllBlogs } = useGetBlogs("", "");
  
  // Then, get filtered blogs based on search and selected categories
  const { data: filteredBlogs, isLoading: loadingFilteredBlogs, error } = useGetBlogs(
    searchQuery, 
    selectedCategories.join(',')
  );
  
  // Use either the filtered blogs or all blogs for display
  const displayBlogs = selectedCategories.length > 0 || searchQuery ? filteredBlogs : allBlogs;
  const isLoading = loadingAllBlogs || loadingFilteredBlogs;
  
  const navigate = useNavigate();

  const handleCardClick = (slug) => {
    navigate(`/sunstar-blogs/${slug}`);
  };

  // Handle category button click
  const handleCategoryClick = (cat) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) {
        return prev.filter(c => c !== cat);
      } else {
        return [...prev, cat];
      }
    });
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-xl">
          Error loading blogs: {error.message}
        </p>
      </div>
    );
  }

  // Extract available categories from ALL blogs data
  const availableCategories = Array.from(
    new Set(allBlogs?.data?.map((b) => b.category).filter(Boolean))
  );

  return (
    <>
      <Helmet>
        <title>Sunstar Hotel Blogs</title>
        <meta name="description" content="Blogs for Sunstar Hotel." />
        <meta name="keywords" content="hotel, blogs, sunstar, travel" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary-green text-white pt-28 pb-10">
        <div className="content flex flex-col gap-12 mx-auto px-4 w-full">
          <div className="flex justify-between flex-col md:flex-row gap-4 items-center w-full">
            <div>
              <h1 className="text-mobile/h3 md:text-desktop/h3 mb-4 animate-fade-in-down">
                Blogs & Buzz
              </h1>
              <p className="text-mobile/body/2 md:text-desktop/body/1 animate-fade-in-up">
                Discover our latest stories, travel tips, and hotel experiences
              </p>
            </div>
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-lg">
              <button
                type="submit"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <SearchIcon />
              </button>
              <input
                type="text"
                placeholder="Search by keyword, city, delhi, yoga, leisure travel"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg px-4 py-4 pl-12 border focus:outline-none text-black"
                style={{ maxWidth: "100%" }}
              />
            </form>
          </div>

          {/* Always show all available categories from allBlogs */}
          <div className="flex flex-wrap gap-2">
            {categories
              .filter(cat => availableCategories?.includes(cat))
              .map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full transition-colors duration-300  
                    ${selectedCategories.includes(cat)
                      ? "bg-primary-dark-green text-white"
                      : "text-white hover:bg-primary-dark-green hover:text-white hover:border-0 border border-white"
                    }`}
                >
                  {cat}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <div className="bg-white">
        <section className="py-16 content mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBlogs?.data?.map((blog) => (
              <div
                key={blog._id}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                onClick={() => handleCardClick(blog.slug)}
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 object-cover transform transition duration-300 group-hover:scale-105"
                    onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition duration-300"></div>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-white text-lg md:text-xl font-bold">
                    {blog.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* If no blogs */}
          {isLoading ? (
            <div className="mx-auto flex w-full justify-center items-center">
              <img src="/images/Logo/spinner.svg" alt="" />
            </div>
          ) : (
            (!displayBlogs?.data || displayBlogs.data.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No blogs available at the moment. Check back later!
                </p>
              </div>
            )
          )}
        </section>
      </div>
    </>
  );
};

export default Blogs;