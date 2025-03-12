import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogs, useGetBlogBySlug } from "../../ApiHooks/useBlogHooks";
import Loader from "../../Components/Loader";
import { Helmet } from "react-helmet";

const ReadBlog = () => {
  const { slug } = useParams();
  const { data: blog, isLoading: blogLoading, error: blogError } = useGetBlogBySlug(slug);
  const { data: blogs, isLoading: blogsLoading } = useGetBlogs();
  const navigate = useNavigate();

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

  return (
    <>
      <Helmet>
        <title>{blog?.data?.title || "Sunstar Hotel Blog"}</title>
        <meta name="description" content={blog?.data?.description.slice(0, 150) || "Blog post from Sunstar Hotel"} />
        <meta name="keywords" content="hotel, blog, sunstar, travel" />
      </Helmet>

      <div className=" mx-auto">
        {blog?.data?.image && (
          <div className="relative w-full h-[80vh] mb-6">
            <img
              src={blog.data.image}
              alt={blog.data.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback image
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 transition duration-300 "></div>
            <div className="absolute content bottom-[30%] left-0 right-0 p-4">
              <h1 className="text-3xl max-w-3xl md:text-6xl font-bold text-white">{blog?.data?.title}</h1>
            </div>
          </div>
        )}

        <div className="content">
          <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
            {blog?.data?.description}
          </p>
        </div>
      </div>
      {moreBlogs?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="content mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
              More Blogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moreBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                  onClick={() => navigate(`/sunstar-blogs/${blog.slug}`)} 
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
                  <div className="absolute  bottom-4 left-4">
                    <h2 className="text-white text-lg md:text-xl font-bold">
                      {blog.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReadBlog;