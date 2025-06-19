import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../Components/Loader";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useGetBlogById2, useGetBlogs2 } from "../../ApiHooks/useBlogs2";

const ReadBlog = () => {
  const { slug } = useParams();
  const { state } = useLocation();
  console.log(state,"aa")
  const { data: blogs, isLoading: blogsLoading } = useGetBlogs2({ status: "all" })
  const { data: blog, isLoading: blogLoading, error: blogError } = useGetBlogById2(state?.blog?._id);
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

  console.log(blogs)
  const moreBlogs = blogs?.blogs?.filter(b => b.slug !== slug).slice(0, 3);


  return (
    <>
      <Helmet>
        <title>{blog?.data?.title || "Sunstar Hotel Blog"}</title>
        <meta name="description" content={blog?.data?.description.slice(0, 150) || "Blog post from Sunstar Hotel"} />
        <meta name="keywords" content="hotel, blog, sunstar, travel" />
      </Helmet>


      <div className="mx-auto">
        {blog?.featuredImage?.url && (
          <div className="relative w-full h-[80vh] mb-6">
            <img
              src={blog.featuredImage.url}
              alt={blog.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback image
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 transition duration-300"></div>
            <div className="absolute content bottom-[30%] left-0 right-0 p-4">
              <h1 className="max-w-3xl text-3xl md:text-6xl font-bold text-white">{blog?.title}</h1>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row w-full py-6 gap-6 content">
          <div className="text-gray-600 w-full md:w-[70%] text-lg leading-relaxed whitespace-pre-wrap">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {blog.category || "Uncategorized"}
                </span>
                <span>By {blog.author}</span>
              </div>
            <div className="">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{blog.title}</h1>
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
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
                      onClick={() => navigate(`/sunstar-blogs/${blog.title}`, { state: { blog } })}
                    >
                      {blog.featuredImage.url && (
                        <img
                          src={blog.featuredImage.url}
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



