/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "../../../Components/CardsCommonComp/CommonCarousel";
import Calendar from "../../../Components/Calendar";
import Icon from "../../../Components/Icons";
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { usePricing } from "../../../Context/PricingContext";
import { ArrowRightAlt, Close as CloseIcon, ArrowForward, CalendarToday, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import {
  format,
} from "date-fns";

function RoomsBanner({ businessPlatformFeatures, hotelDetail }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  // const [openCalender, setOpenCalender] = useState(false);
  // const [bookingError, setBookingError] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { selectedRooms } = usePricing();

  const navigate = useNavigate();

  const { fetchRoomHotelDetails, sethotelData } = usePricing();

  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInDate");
    const storedCheckOut = localStorage.getItem("checkOutDate");
    if (storedCheckIn && storedCheckOut) {
      setCheckIn(storedCheckIn);
      setCheckOut(storedCheckOut);
    }
  }, []);

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

  // const handleBooking = async () => {
  //   if (selectedRooms?.length > 0) {
  //     navigate("/room/details")
  //   } else {
  //     setBookingError(false);
  //     await fetchRoomHotelDetails(businessPlatformFeatures?._id, hotelDetail?.hotelCode);

  //     navigate("/room/details");

  //     localStorage.setItem("hotelData", JSON.stringify(hotelDetail));

  //     sethotelData(hotelDetail)
  //   }
  // };

  // const calculateNights = () => {
  //   if (checkIn && checkOut) {
  //     const nights = differenceInCalendarDays(
  //       new Date(checkOut),
  //       new Date(checkIn)
  //     );
  //     return <div>{nights} Nights</div>;
  //   }
  //   return 0;
  // };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setShowImageGallery(false); // Close the gallery when an image is selected
  };

  const handlePrevImage = () => {
    // First create a temporary div to initiate slide animation
    const imageContainer = document.querySelector('.image-slider-container');
    if (imageContainer) {
      imageContainer.classList.add('sliding-prev');

      // After short delay, update the actual image
      setTimeout(() => {
        const newIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length;
        setSelectedImage(allImages[newIndex]);
        setSelectedImageIndex(newIndex);
        imageContainer.classList.remove('sliding-prev');
      }, 150);
    } else {
      // Fallback if DOM manipulation fails
      const newIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length;
      setSelectedImage(allImages[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    // First create a temporary div to initiate slide animation
    const imageContainer = document.querySelector('.image-slider-container');
    if (imageContainer) {
      imageContainer.classList.add('sliding-next');

      // After short delay, update the actual image
      setTimeout(() => {
        const newIndex = (selectedImageIndex + 1) % allImages.length;
        setSelectedImage(allImages[newIndex]);
        setSelectedImageIndex(newIndex);
        imageContainer.classList.remove('sliding-next');
      }, 150);
    } else {
      // Fallback if DOM manipulation fails
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

      {/* <div
        className={`bg-primary-white bg-opacity-50 backdrop-blur-sm py-8 px-4 lg:left-[10%] transition-all duration-500 ease-in-out 
          content absolute top-[60%] md:top-[70%]
          md:px-8 lg:px-12 rounded-md shadow-lg lg:mx-auto  
          z-10 flex flex-col items-center gap-6 mx-2
        `}
      >
        <div
          className={`flex justify-center flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-4`}
        >
          <div onClick={() => setOpenCalender(true)} className="flex flex-row cursor-pointer items-center justify-evenly border max-w-full w-full px-4 py-3 md:px-8 md:py-4 rounded-full gap-3 shadow-md">
            <CalendarToday className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
            <div className={`flex flex-col`}>
              <span className="font-semibold text-[8px] text-gray-700 md:text-base">
                {checkIn ? format(new Date(checkIn), "dd MMM, EEEE") : "Check in"}
              </span>
            </div>
            <ArrowRightAlt className="text-yellow-500" />
            <div className={`flex flex-col`}>
              <span className="font-semibold text-[8px] text-gray-700 md:text-base">
                {checkOut ? format(new Date(checkOut), "dd MMM, EEEE") : "Check-out"}
              </span>
            </div>
            {checkIn && checkOut && (
              <span className="flex items-center text-gray-700 justify-center text-[8px] md:text-base rounded-full border border-gray-300 px-3 md:py-1">
                {calculateNights()}
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 w-full">
            <button
              onClick={handleBooking}
              className="bg-[#006167] w-full md:w-auto text-primary-white text-sm sm:text-base lg:text-lg sm:w-auto rounded-full shadow-md px-6 py-3"
            >
              Book Room
            </button>
          </div>
        </div>

        {bookingError && (
          <p className="text-red-500 text-sm">
            Please select Check-In and Check-Out dates.
          </p>
        )}
      </div> */}

      {/* {openCalender && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Calendar
            setCheckInDate={setCheckIn}
            setCheckOutDate={setCheckOut}
            setOpenCalender={setOpenCalender}
          />
        </div>
      )} */}

      {/* Full Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div
            className="bg-white w-full max-h-full overflow-hidden animate-slideUp"
            style={{
              animation: 'slideUp 0.5s ease-out forwards',
            }}
          >
            <div className="content">
              <div className="p-4 flex justify-between items-center border-b">
                <h3 className="text-4xl font-bold text-gray-800">Room Images</h3>
                <button
                  onClick={() => setShowImageGallery(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="text-gray-700" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[90vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {businessPlatformFeatures?.RoomImage?.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md cursor-pointer"
                      onClick={() => handleImageClick(image, index)}
                    >
                      <img
                        src={image}
                        alt={`Room image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
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