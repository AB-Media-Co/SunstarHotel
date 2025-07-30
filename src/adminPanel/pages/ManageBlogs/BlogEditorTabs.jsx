/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react"
import { Tab } from "@headlessui/react"
import {
  Bold,
  Italic,
  Link,
  ImageIcon,
  Quote,
  List,
  ListOrdered,
  Code,
  Heading1,
  Heading2,
  Eye,
  Edit3,
  FileText,
  Save,
  X,
  Trash2,
  Plus,
  Upload,
} from "lucide-react"
import {
  useCreateBlog2,
  useGetBlogs2,
  useDeleteBlog2,
  useUpdateBlog2,
  useGetBlogById2,
} from "../../../ApiHooks/useBlogs2"
import ImageUpload from "../../Components/ImageUpload"


const allowedCategories = [
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


export default function BlogEditorTabs() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")

  const [metaTitle, setMetaTitle] = useState("")          // New state for meta title
  const [metaDescription, setMetaDescription] = useState("") // New state for meta description
  const [metaKeywords, setMetaKeywords] = useState("")

  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const { data: blogList, refetch } = useGetBlogs2({ status: "all" })
  const { mutate: createBlog } = useCreateBlog2()
  const { mutate: updateBlog } = useUpdateBlog2()
  const { mutate: deleteBlog } = useDeleteBlog2()
  const { data: blogData, isLoading } = useGetBlogById2(selectedBlogId)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (blogData && !isLoading) {
      setTitle(blogData.title || "")
      setAuthor(blogData.author || "")
      setCategory(blogData.category || "")
      setFeaturedImage(blogData.featuredImage?.url || "")
      setContent(blogData.content || "")
      setMetaTitle(blogData.meta?.title || "")               // Populate meta title
      setMetaDescription(blogData.meta?.description || "")   // Populate meta description
      setMetaKeywords(blogData.meta?.keywords.join(", ") || "") // Populate meta keywords

    }
  }, [blogData, isLoading])

  const handleSubmit = () => {
    if (!title || !content || !author) {
      alert("Title, content, and author are required.")
      return
    }

    const payload = {
      title,
      content,
      author,
      category,
      featuredImage: { url: featuredImage },
      meta: {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords.split(",").map(keyword => keyword.trim()), // Convert keywords to array

      },
      status: "published",
    }

    if (selectedBlogId) {
      updateBlog(
        { id: selectedBlogId, updateData: payload },
        {
          onSuccess: () => {
            setSelectedBlogId(null)
            resetForm()
            refetch()
          },
          onError: (error) => {
            console.error("Error updating blog:", error)
            alert("Failed to update blog. Please try again.")
          },
        },
      )
    } else {
      createBlog(payload, {
        onSuccess: () => {
          resetForm()
          refetch()
        },
        onError: (error) => {
          console.error("Error creating blog:", error)
          alert("Failed to create blog. Please try again.")
        },
      })
    }
  }

  const resetForm = () => {
    setTitle("")
    setAuthor("")
    setContent("")
    setCategory("")
    setFeaturedImage("")
    setSelectedBlogId(null)
    setMetaTitle("")
    setMetaDescription("")
    setMetaKeywords("")
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id, {
        onSuccess: () => {
          refetch()
        },
        onError: (error) => {
          console.error("Error deleting blog:", error)
          alert("Failed to delete blog. Please try again.")
        },
      })
    }
  }

  const formatText = (tag) => {
    const selection = window.getSelection()
    const selectedText = selection?.toString()
    if (!selectedText) {
      alert("Please select text to format")
      return
    }

    let wrapped
    switch (tag) {
      case "link":
        const url = prompt("Enter URL:", "https://")
        if (url) {
          wrapped = `<a href='${url}' target='_blank' class='text-blue-600 underline hover:text-blue-800'>${selectedText}</a>`
        }
        break
      case "h1":
        wrapped = `<h1 class='text-3xl font-bold mb-4'>${selectedText}</h1>`
        break
      case "h2":
        wrapped = `<h2 class='text-2xl font-semibold mb-3'>${selectedText}</h2>`
        break
      case "blockquote":
        wrapped = `<blockquote class='border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4'>${selectedText}</blockquote>`
        break
      case "code":
        wrapped = `<code class='bg-gray-100 px-2 py-1 rounded text-sm font-mono'>${selectedText}</code>`
        break
      case "ul":
        wrapped = `<ul class='list-disc list-inside my-4'><li>${selectedText}</li></ul>`
        break
      case "ol":
        wrapped = `<ol class='list-decimal list-inside my-4'><li>${selectedText}</li></ol>`
        break
      default:
        wrapped = `<${tag}>${selectedText}</${tag}>`
    }

    if (wrapped) {
      setContent(content.replace(selectedText, wrapped))
    }
  }

  const handleImageInsert = async (file) => {
    if (!file) return

    try {
      setIsUploading(true)
      const { uploadSingleImagesAPIV2 } = await import("../../../ApiHooks/useHotelHook2")
      const response = await uploadSingleImagesAPIV2([file])
      const imageUrl = response?.imageUrls?.[0]

      if (imageUrl) {
        setContent(
          (prev) =>
            prev + `<img src="${imageUrl}" alt="Content Image" class="my-4 rounded-lg shadow-md max-w-full h-auto" />`,
        )
        alert("Image uploaded successfully!")
      } else {
        throw new Error("No image URL returned")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }


  const ToolbarButton = ({ onClick, icon: Icon, tooltip, active = false, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group p-2.5 rounded-full transition-all duration-200 
        ${active
          ? "bg-blue-600 text-white shadow-lg"
          : disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200"
        }
        ${!disabled && "hover:shadow-md hover:scale-105 active:scale-95"}
      `}
      title={tooltip}
    >
      <Icon className="h-4 w-4" />
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        {tooltip}
      </div>
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="content mt-14 mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Edit3 className="h-6 w-6" />
              Blog Editor
            </h1>
            <p className="text-blue-100 mt-1">Create and manage your blog posts</p>
          </div>

          <Tab.Group>
            <Tab.List className="flex border-b border-gray-200 bg-gray-50">
              {[
                { name: "Editor", icon: Edit3 },
                { name: "Preview", icon: Eye },
                { name: "All Blogs", icon: FileText },
              ].map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) => `
                  flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200
                  ${selected
                      ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                `}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>

            {/* Editor Tab */}
            <Tab.Panel className="p-8">
              <div className="space-y-6">
                {/* Form Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedBlogId ? "Edit Blog Post" : "Create New Blog Post"}
                  </h2>
                  {selectedBlogId && (
                    <button
                      onClick={resetForm}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Cancel Edit
                    </button>
                  )}
                </div>


                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter meta title..."
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter meta description..."
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter keywords, separated by commas"
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                    />
                  </div>

                 
                </div>


                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your blog title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Author name..."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4  py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">-- Select Category --</option>
                        {allowedCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                    <ImageUpload
                      index={0}
                      feature={{ image: featuredImage }}
                      setImageUpload={setIsUploading}
                      handleFeatureChange={(field, value) => setFeaturedImage(value)}
                    />
                  </div>
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>

                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border border-gray-200 rounded-t-lg">
                    <ToolbarButton onClick={() => formatText("h1")} icon={Heading1} tooltip="Heading 1" />
                    <ToolbarButton onClick={() => formatText("h2")} icon={Heading2} tooltip="Heading 2" />
                    <div className="w-px h-8 bg-gray-300 mx-1" />
                    <ToolbarButton onClick={() => formatText("b")} icon={Bold} tooltip="Bold" />
                    <ToolbarButton onClick={() => formatText("i")} icon={Italic} tooltip="Italic" />
                    <ToolbarButton onClick={() => formatText("code")} icon={Code} tooltip="Code" />
                    <div className="w-px h-8 bg-gray-300 mx-1" />
                    <ToolbarButton onClick={() => formatText("link")} icon={Link} tooltip="Add Link" />
                    <ToolbarButton onClick={() => formatText("blockquote")} icon={Quote} tooltip="Quote" />
                    <ToolbarButton onClick={() => formatText("ul")} icon={List} tooltip="Bullet List" />
                    <ToolbarButton onClick={() => formatText("ol")} icon={ListOrdered} tooltip="Numbered List" />
                    <div className="w-px h-8 bg-gray-300 mx-1" />
                    <label className="cursor-pointer">
                      <ToolbarButton
                        onClick={() => fileInputRef.current?.click()}
                        icon={ImageIcon}
                        tooltip="Insert Image"
                        disabled={isUploading}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleImageInsert(e.target.files[0])}
                        disabled={isUploading}
                      />

                    </label>
                  </div>

                  <textarea
                    rows={12}
                    className="w-full px-4 py-4 border border-gray-200 border-t-0 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                    placeholder="Write your blog content here... You can use HTML tags for formatting."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    * Required fields
                    {isUploading && (
                      <span className="ml-4 text-blue-600">
                        <Upload className="inline h-4 w-4 animate-spin mr-1" />
                        Uploading image...
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={isUploading || !title || !content || !author}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4" />
                      {selectedBlogId ? "Update Blog" : "Publish Blog"}
                    </button>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Preview Tab */}
            <Tab.Panel className="p-8">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Preview</h2>
                  <p className="text-gray-600">See how your blogs will look to readers</p>
                </div>

                {blogList?.blogs?.length ? (
                  <div className="space-y-8">
                    {blogList.blogs.map((blog) => (
                      <article
                        key={blog._id}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                      >
                        {blog.featuredImage?.url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={blog.featuredImage.url || "/placeholder.svg"}
                              alt="Featured"
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-8">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                              {blog.category || "Uncategorized"}
                            </span>
                            <span>By {blog.author}</span>
                          </div>
                          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{blog.title}</h1>
                          <div
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg">No blogs to preview yet.</p>
                    <p className="text-gray-400">Create your first blog post to see it here!</p>
                  </div>
                )}
              </div>
            </Tab.Panel>

            {/* All Blogs Tab */}
            <Tab.Panel className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">All Blog Posts</h2>
                    <p className="text-gray-600 mt-1">Manage your published content</p>
                  </div>
                  <div className="text-sm text-gray-500">{blogList?.blogs?.length || 0} posts total</div>
                </div>

                {blogList?.blogs?.length ? (
                  <div className="grid gap-6">
                    {blogList.blogs.map((blog) => (
                      <div
                        key={blog._id}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {blog.title}
                              </h3>
                              {blog.category && (
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                  {blog.category}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">by {blog.author}</p>
                            <div
                              className="text-gray-700 text-sm leading-relaxed line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: blog.excerpt || blog.content.substring(0, 150) + "...",
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => setSelectedBlogId(blog._id)}
                              className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first blog post.</p>
                  </div>
                )}
              </div>
            </Tab.Panel>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}

