/* eslint-disable react/prop-types */
import { useState } from "react";

const MultipleImageUpload = ({ onUploadSuccess, isUploading, imagesUrls = [], onRemoveImageUrl }) => {
    const [images, setImages] = useState([]); // Newly selected images

    // Handle file input change
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    // Remove newly selected image
    const handleRemoveImage = (id) => {
        setImages((prevImages) => prevImages.filter((image) => image.name !== id));
    };

    // Remove already uploaded image
    const handleRemoveUploadedImage = (url) => {
        if (onRemoveImageUrl) onRemoveImageUrl(url); // Call parent handler if provided
    };

    // Handle form submission (send images to the parent)
    const handleSubmit = (event) => {
        event.preventDefault();
        onUploadSuccess(images); // Pass the images array to the parent
        setImages([]); // Clear selected images after upload
    };

    return (
        <div className="container mx-auto my-10 px-4">
            <div className="bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Choose Images
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                multiple
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                            />
                            <div className="flex items-center justify-center w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-dashed border-blue-500 rounded-lg text-gray-700 font-medium hover:bg-blue-50 transition">
                                <span className="text-center">Click here to choose images</span>
                            </div>
                        </div>
                    </div>

                    {/* Preview newly selected images */}

                    <div className="flex gap-10">
                        {images.length > 0 && (
                            <div className="flex flex-wrap gap-4 mt-5">
                                {images.map((image) => (
                                    <div
                                        key={image.name}
                                        className="relative w-36 h-36 border border-gray-300 rounded-lg overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(image.name)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600 hover:scale-110 transition-transform"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Preview already uploaded images */}
                        {imagesUrls.length > 0 && (
                            <div className="flex flex-wrap gap-4 mt-5">
                                {imagesUrls.map((url, index) => (
                                    <div
                                        key={index}
                                        className="relative w-36 h-36 border border-gray-300 rounded-lg overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                                    >
                                        <img
                                            src={url}
                                            alt="uploaded"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveUploadedImage(url)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600 hover:scale-110 transition-transform"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    <button
                        onClick={handleSubmit}
                        className={`w-full mt-6 py-3 rounded-lg font-semibold text-white text-lg ${isUploading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-200 transform hover:scale-105"
                            }`}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            "Upload Images"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MultipleImageUpload;
