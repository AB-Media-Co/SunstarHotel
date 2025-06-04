import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogs, useGetBlogBySlug } from "../../ApiHooks/useBlogHooks";
import Loader from "../../Components/Loader";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const ReadBlog = () => {
  const { slug } = useParams();
  const { data: blog, isLoading: blogLoading, error: blogError } = useGetBlogBySlug(slug);
  const { data: blogs, isLoading: blogsLoading } = useGetBlogs();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (blogLoading || blogsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader />
      </div>
    );
  }

  if (blogError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-xl">Error loading blog: {blogError.message}</p>
      </div>
    );
  }

  const moreBlogs = blogs?.data?.filter(b => b.slug !== slug).slice(0, 3);

  const parseLinksInDescription = (text) => {
    const urlRegex = /(?:https?:\/\/[^\s]+|\/[^\s]+)/g;

    return text.split(' ').map((word, index) => {
      if (urlRegex.test(word)) {
        return (
          <a href={word} target="_blank" rel="noopener noreferrer" className="text-blue-500" key={index}>
            {word}
          </a>
        );
      }
      return word + ' ';
    });
  };


  return (
    <>
      <Helmet>
        <title>{blog?.data?.title || "Sunstar Hotel Blog"}</title>
        <meta name="description" content={blog?.data?.description.slice(0, 150) || "Blog post from Sunstar Hotel"} />
        <meta name="keywords" content="hotel, blog, sunstar, travel" />
      </Helmet>


      <div className="mx-auto">
        {blog?.data?.image && (
          <div className="relative w-full h-[80vh] mb-6">
            <img
              src={blog.data.image}
              alt={blog.data.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback image
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 transition duration-300"></div>
            <div className="absolute content bottom-[30%] left-0 right-0 p-4">
              <h1 className="max-w-3xl text-3xl md:text-6xl font-bold text-white">{blog?.data?.title}</h1>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row w-full py-6 gap-6 content">
          <div className="text-gray-600 w-full md:w-[70%] text-lg leading-relaxed whitespace-pre-wrap">
            {parseLinksInDescription(blog?.data?.description)}
          </div>
          
          <div className="w-full md:w-1/3">
            {moreBlogs?.length > 0 && (
              <section className="sticky top-0 pt-4 pb-8 ">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 px-4">
                  More Blogs
                </h2>
                <div className="flex flex-col gap-6 px-4">
                  {moreBlogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group h-72"
                      onClick={() => navigate(`/sunstar-blogs/${blog.slug}`)}
                    >
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                          onError={(e) => (e.target.src = "/fallback-image.jpg")}
                        />
                      )}
                      {/* Enhanced gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition duration-300"></div>

                      {/* Title overlay with improved positioning */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300">
                        <h2 className="text-white text-lg md:text-xl font-bold mb-2">
                          {blog.title}
                        </h2>
                        {/* <p className="text-gray-200 text-sm line-clamp-2 group-hover:opacity-100 transition-opacity duration-300">
                          {blog.description?.slice(0, 100)}...
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadBlog;