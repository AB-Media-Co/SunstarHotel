/* eslint-disable react/prop-types */
import { useState } from "react";

const MultipleImageUpload = ({ onUploadSuccess, isUploading, imagesUrls = [], onRemoveImageUrl }) => {
    const [images, setImages] = useState([]); // Newly selected images
    const [warningMessage, setWarningMessage] = useState(""); // To store warning messages

    // Handle file input change
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        // Check if more than 5 images are selected
        if (files.length + images.length > 5) {
            setWarningMessage("You can only select up to 5 images at a time.");
            return;
        }

        // Validate file sizes and filter out files that exceed 8MB
        const validFiles = files.filter(file => file.size <= 8 * 1024 * 1024); // 8MB limit
        if (validFiles.length !== files.length) {
            setWarningMessage("One or more images exceed 8MB and will not be uploaded.");
        } else {
            setWarningMessage("");
        }

        setImages((prevImages) => [...prevImages, ...validFiles]);
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

                    <div className="bg-yellow-50 border-l-4 my-4 border-yellow-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Please Select 5 images at once and size is not more than 8 mb.
                                </p>
                            </div>
                        </div>
                    </div>

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

                    {/* Warning Message */}
                    {warningMessage && (
                        <div className="text-red-500 text-sm mb-4">{warningMessage}</div>
                    )}

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
