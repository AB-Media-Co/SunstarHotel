import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Box,
    MenuItem
} from "@mui/material";
import {
    useGetBlogs,
    useAddBlog,
    useUpdateBlog,
    useDeleteBlog,
} from "../../../ApiHooks/useBlogHooks";
import { uploadImagesAPIV2 } from "../../../ApiHooks/useHotelHook2";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Styled input for image upload
const Input = styled('input')({
    display: 'none',
});

// Helper function to generate slug preview (mimics backend slugify)
const generateSlugPreview = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// ImageUpload Component
const ImageUpload = ({ value, onChange, disabled }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const inputId = `contained-button-file-${Math.random().toString(36).substr(2, 9)}`;

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadError(null);
        setIsUploading(true);

        try {
            const response = await uploadImagesAPIV2([file]);
            const imageUrl = response?.imageUrls[0];
            onChange(imageUrl);
            setIsUploading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError('Failed to upload image. Please try again.');
            setIsUploading(false);
            onChange('');
        }
    };

    return (
        <Box>
            <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                sx={{ mb: 1 }}
                disabled={disabled || isUploading}
            />
            <label htmlFor={inputId}>
                <Input
                    accept="image/*"
                    id={inputId}
                    type="file"
                    onChange={handleImageUpload}
                    disabled={disabled || isUploading}
                />
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={disabled || isUploading}
                    sx={{ mb: 1 }}
                >
                    Upload Image
                </Button>
            </label>
            {isUploading && (
                <Box display="flex" alignItems="center" mt={1}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                        Uploading...
                    </Typography>
                </Box>
            )}
            {uploadError && (
                <Typography variant="body2" color="error" mt={1}>
                    {uploadError}
                </Typography>
            )}
        </Box>
    );
};

const ManageBlogs = () => {
    const { data: blogs, isLoading, error } = useGetBlogs();
    console.log(blogs)
    const addBlogMutation = useAddBlog();
    const updateBlogMutation = useUpdateBlog();
    const deleteBlogMutation = useDeleteBlog();

    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({
        id: null,
        title: "",
        description: "",
        image: "",
        slug: "",
        keywords: "",
        category: "",
    });

    const handleOpen = (blog = { title: "", description: "", image: "", slug: "", keywords: "", category: "" }) => {
        setCurrentBlog({
            id: blog._id || null,
            title: blog.title || "",
            description: blog.description || "",
            image: blog.image || "",
            slug: blog.slug || "",
            keywords: blog.keywords ? blog.keywords.join(', ') : "",
            category: blog.category || ""
        });
        setEditMode(!!blog._id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentBlog({
            id: null,
            title: "",
            description: "",
            image: "",
            slug: "",
            keywords: "",
            category: "",
        });
        setEditMode(false);
    };

    const handleChange = (field, value) => {
        setCurrentBlog((prev) => {
            const newBlog = { ...prev, [field]: value };
            // Generate slug preview only when adding, not editing
            if (!editMode && field === "title") {
                newBlog.slug = generateSlugPreview(value);
            }
            return newBlog;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert comma separated keywords into array
        const keywordsArray = currentBlog.keywords
            .split(',')
            .map((kw) => kw.trim())
            .filter((kw) => kw);
        const blogData = {
            title: currentBlog.title,
            description: currentBlog.description,
            image: currentBlog.image,
            category: currentBlog.category,
            keywords: keywordsArray,
            // Slug is auto-generated by the backend
        };

        if (editMode) {
            updateBlogMutation.mutate(
                { id: currentBlog.id, updateData: blogData },
                {
                    onSuccess: () => {
                        handleClose();
                    },
                    onError: (error) => console.error('Update failed:', error),
                }
            );
        } else {
            addBlogMutation.mutate(blogData, {
                onSuccess: () => {
                    handleClose();
                },
                onError: (error) => console.error('Add failed:', error),
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            deleteBlogMutation.mutate(id, {
                onError: (error) => console.error('Delete failed:', error),
            });
        }
    };

    if (isLoading) {
        return (
            <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error">Error loading blogs: {error.message}</Typography>
            </Container>
        );
    }

    const StyledCard = styled(Card)(({ theme }) => ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "350px",
        transition: "transform 0.2s",
        "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[4],
        },
    }));



    const parseLinksInDescription = (text) => {
        const urlRegex = /(?:https?:\/\/[^\s]+|\/[^\s]+)/g;
    
        return text.split(' ').map((word, index) => {
            if (urlRegex.test(word)) {
                return (
                    <a href={word} target="_blank" rel="noopener noreferrer" key={index}>
                        {word}
                    </a>
                );
            }
            return word + ' ';
        });
    };

    return (
        <>
            <div className="mx-auto pt-10">
                <div className="w-full h-full text-black">
                    <Container>
                        <Typography
                            variant="h5"
                            className="content mt-14 font-bold pt-16 pb-5 text-start"
                        >
                            Manage Sunstar Hotel Blogs
                        </Typography>
                    </Container>
                </div>
                <div className="bg-white px-6">
                    <Container>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpen()}
                            sx={{ mb: 4 }}
                            disabled={isLoading}
                        >
                            Add New Blog
                        </Button>

                        <Grid container spacing={3}>
                            {blogs?.data?.map((blog) => (
                                <Grid item xs={12} sm={6} md={4} key={blog._id}>
                                    <StyledCard>
                                        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                            <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: "bold" }}>
                                                {/* {blog.title} */}
                                                {blog.title.split(' ').length > 5
                                                    ? blog.title.split(' ').slice(0, 5).join(' ') + '...'
                                                    : blog.title
                                                }
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    flexGrow: 1,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                }}
                                            >
                                                {/* {blog.description} */}
                                                {parseLinksInDescription(blog.description.split(' ').length > 50
                                                    ? blog.description.split(' ').slice(0, 50).join(' ') + '...'
                                                    : blog.description)
                                                }
                                            </Typography>
                                            {blog.image && (
                                                <Box sx={{ mt: 2, mb: 1 }}>
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        style={{
                                                            width: "100%",
                                                            height: "150px",
                                                            objectFit: "cover",
                                                            borderRadius: "4px",
                                                        }}
                                                        onError={(e) => (e.target.src = "/fallback-image.jpg")}
                                                    />
                                                </Box>
                                            )}
                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                                Slug: {blog.slug}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                                Category: {blog.category}
                                            </Typography>
                                            {blog.keywords && blog.keywords.length > 0 && (
                                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                                    Keywords: {blog.keywords.join(", ")}
                                                </Typography>
                                            )}
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                                            <Button size="small" color="primary" onClick={() => handleOpen(blog)}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleDelete(blog._id)}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{editMode ? "Edit Blog" : "Add New Blog"}</DialogTitle>
                            <DialogContent>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        value={currentBlog.title}
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        margin="normal"
                                        required
                                        disabled={addBlogMutation.isLoading || updateBlogMutation.isLoading}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={currentBlog.description}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                        margin="normal"
                                        multiline
                                        rows={4}
                                        required
                                        disabled={addBlogMutation.isLoading || updateBlogMutation.isLoading}
                                    />

                                    {/* Category Select */}
                                    <TextField
                                        select
                                        fullWidth
                                        label="Category"
                                        value={currentBlog.category}
                                        onChange={(e) => handleChange("category", e.target.value)}
                                        margin="normal"
                                        required
                                        disabled={addBlogMutation.isLoading || updateBlogMutation.isLoading}
                                        SelectProps={{
                                            MenuProps: {
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 250
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value="Hospitality">Hospitality</MenuItem>
                                        <MenuItem value="First-Time Visitors">First-Time Visitors</MenuItem>
                                        <MenuItem value="Location & Access">Location & Access</MenuItem>
                                        <MenuItem value="Hotel Features">Hotel Features</MenuItem>
                                        <MenuItem value="Travel Tips">Travel Tips</MenuItem>
                                        <MenuItem value="Nearby Tours">Nearby Tours</MenuItem>
                                        <MenuItem value="Shopping">Shopping</MenuItem>
                                        <MenuItem value="Wellness">Wellness</MenuItem>
                                        <MenuItem value="Guest Stories">Guest Stories</MenuItem>
                                        <MenuItem value="Dining">Dining</MenuItem>
                                        <MenuItem value="Tourism & Culture">Tourism & Culture</MenuItem>
                                        <MenuItem value="Day Trips">Day Trips</MenuItem>
                                        <MenuItem value="Events & Festivities">Events & Festivities</MenuItem>
                                        <MenuItem value="International Travel">International Travel</MenuItem>
                                        <MenuItem value="Local Life">Local Life</MenuItem>
                                        <MenuItem value="Behind the Scenes">Behind the Scenes</MenuItem>
                                        <MenuItem value="Luxury on Budget">Luxury on Budget</MenuItem>
                                        <MenuItem value="Sustainability">Sustainability</MenuItem>
                                        <MenuItem value="Travel Essentials">Travel Essentials</MenuItem>
                                        <MenuItem value="Scam Awareness">Scam Awareness</MenuItem>
                                    </TextField>
                                    {/* Keywords input */}
                                    <TextField
                                        fullWidth
                                        label="Keywords (comma separated)"
                                        value={currentBlog.keywords}
                                        onChange={(e) => handleChange("keywords", e.target.value)}
                                        margin="normal"
                                        disabled={addBlogMutation.isLoading || updateBlogMutation.isLoading}
                                        helperText="Enter keywords separated by commas"
                                    />


                                    <ImageUpload
                                        value={currentBlog.image}
                                        onChange={(value) => handleChange("image", value)}
                                        disabled={addBlogMutation.isLoading || updateBlogMutation.isLoading}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Slug (auto-generated)"
                                        value={editMode ? currentBlog.slug : currentBlog.slug || generateSlugPreview(currentBlog.title)}
                                        margin="normal"
                                        disabled
                                        helperText="Slug is automatically generated from the title by the server"
                                    />


                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    disabled={addBlogMutation.isLoading || updateBlogMutation.isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    variant="contained"
                                    disabled={addBlogMutation.isLoading || updateBlogMutation.isLoading}
                                >
                                    {editMode ? "Update" : "Add"}
                                    {(addBlogMutation.isLoading || updateBlogMutation.isLoading) && (
                                        <CircularProgress size={20} sx={{ ml: 1 }} />
                                    )}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default ManageBlogs;
