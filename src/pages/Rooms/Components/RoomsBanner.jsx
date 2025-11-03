/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "../../../Components/CardsCommonComp/CommonCarousel";
import { useNavigate } from "react-router-dom";
import { ArrowRightAlt, Close as CloseIcon, ArrowBackIos, ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";

function RoomsBanner({ businessPlatformFeatures }) {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();

  // Disable scrolling when gallery is open
  useEffect(() => {
    if (showImageGallery || selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showImageGallery, selectedImage]);

  // Limit carousel to 5 images
  const carouselImages = businessPlatformFeatures?.RoomImage?.slice(0, 5) || [];
  const allImages = businessPlatformFeatures?.RoomImage || [];

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setShowImageGallery(false); // Close the gallery when an image is selected
  };

  const handlePrevImage = () => {
    const imageContainer = document.querySelector('.image-slider-container');
    if (imageContainer) {
      imageContainer.classList.add('sliding-prev');

      setTimeout(() => {
        const newIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length;
        setSelectedImage(allImages[newIndex]);
        setSelectedImageIndex(newIndex);
        imageContainer.classList.remove('sliding-prev');
      }, 150);
    } else {
      const newIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length;
      setSelectedImage(allImages[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    const imageContainer = document.querySelector('.image-slider-container');
    if (imageContainer) {
      imageContainer.classList.add('sliding-next');

      setTimeout(() => {
        const newIndex = (selectedImageIndex + 1) % allImages.length;
        setSelectedImage(allImages[newIndex]);
        setSelectedImageIndex(newIndex);
        imageContainer.classList.remove('sliding-next');
      }, 150);
    } else {
      const newIndex = (selectedImageIndex + 1) % allImages.length;
      setSelectedImage(allImages[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative">
      <Carousel
        features={carouselImages}
        height="h-[600px] rounded-lg"
        buttonColor="#FDC114"
        iconSize="h-6 w-6 "
        NavClass="bottom-[3rem] md:bottom-8"
        viewAll={true}
        setShowImageGallery={setShowImageGallery}
      />
      <div className="absolute top-8 right-2 md:right-20 z-50">
        <button
          onClick={() => navigate(-1)}
          className="bg-black/50 rounded-full p-2 shadow-md transition"
          aria-label="Go back"
        >
          <CloseIcon className="text-white" />
        </button>
      </div>

      {/* Full Image Gallery Modal - Updated Layout */}
      {showImageGallery && (
        <div
          className={`fixed inset-0 bg-[#6EC4C2]/95 z-50 overflow-y-auto transition-transform duration-500 translate-y-0`}
        >
          <div className="mx-auto w-full max-w-[95vw] md:max-w-3xl lg:max-w-5xl xl:max-w-[1280px]">
            {/* Sticky header */}
            <div
              className="sticky top-0 z-10 flex items-center gap-3 bg-[#6EC4C2]/95 px-4 md:px-6 py-4 md:py-6 cursor-pointer"
              onClick={() => setShowImageGallery(false)}
              aria-label="Close gallery"
            >
              <ArrowBackIosNew className="h-7 w-7 md:h-8 md:w-8 text-white" />
              <span className="text-white text-lg md:text-xl font-semibold">Room Images</span>
            </div>

            {/* Body */}
            <div className="bg-white w-full md:rounded-t-2xl py-8 md:py-10 min-h-screen">
              {allImages.length > 0 ? (
                <div className="px-4 md:px-8">
           
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    {allImages.map((image, imgIndex) => (
                      <button
                        type="button"
                        key={imgIndex}
                        className="relative w-full aspect-[4/3] cursor-pointer"
                        onClick={() => handleImageClick(image, imgIndex)}
                      >
                        <img
                          src={image}
                          alt={`Room image ${imgIndex + 1}`}
                          className="absolute inset-0 w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 italic px-4 md:px-8">No images available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Individual Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* Close button */}
            <button
              onClick={closeImageViewer}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-20"
            >
              <CloseIcon />
            </button>

            {/* Image container with animation */}
            <div className="relative max-w-4xl max-h-[80vh] w-full mx-4 overflow-hidden">
              <div className="image-slider-container relative w-full h-full">
                <img
                  key={selectedImageIndex}
                  src={selectedImage}
                  alt="Room preview"
                  className="w-full h-full object-contain image-fade-in"
                />
              </div>

              {/* Navigation buttons */}
              <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
                <button
                  onClick={handlePrevImage}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all hover:scale-110"
                >
                  <ArrowBackIos />
                </button>
                <button
                  onClick={handleNextImage}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all hover:scale-110"
                >
                  <ArrowForwardIos />
                </button>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .image-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes slideNextOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-30px);
          }
        }
        
        @keyframes slidePrevOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(30px);
          }
        }
        
        .sliding-next img {
          animation: slideNextOut 0.15s ease-out forwards;
        }
        
        .sliding-prev img {
          animation: slidePrevOut 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default RoomsBanner;