/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUpdatePagesHook from "../../ApiHooks/useUpdatePagesHook";
import { Footer } from "./BookingDetailPageComponent/Footer";
import PaymentMethod from "./BookingDetailPageComponent/PaymentMethod";
import { ReservationSummarySidebar } from "./BookingDetailPageComponent/ReservationSummarySidebar";
import { OfferCode } from "./BookingDetailPageComponent/OfferCode";
import { AddToYourStayOptions } from "./BookingDetailPageComponent/AddToYourStayOptions";
import GuestDetailsForm from "./BookingDetailPageComponent/GuestDetailsForm";
import { HotelDetailsCard } from "./BookingDetailPageComponent/HotelDetailsCard";
import { usePricing } from "../../Context/PricingContext";
import { Helmet } from "react-helmet";
import { HeaderHotel } from "./BookingDetailPageComponent/HeaderHotel";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useGetUserByEmail } from "../../ApiHooks/useUser";
import LoginModal from "../../Components/LoginModal";

const calculateDays = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const diffTime = Math.abs(endDate - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const BookingDetailsPage = () => {
  const { ContactUsDetail } = useUpdatePagesHook();
  const { details, hotelData } = usePricing();
  const hotelDetail = details[0];
  const navigate = useNavigate();
  const [verified, setIsVerified] = useState(false);
  const userInfo = localStorage.getItem('user_email');
  const { data: userData, } = useGetUserByEmail(userInfo);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const getHotelDataLocal = localStorage.getItem("hotelInfo");
  const getHotelData = JSON.parse(getHotelDataLocal);

  const checkIn = localStorage.getItem("checkInDate");
  const checkOut = localStorage.getItem("checkOutDate");
  const days = calculateDays(checkIn, checkOut);

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const guestFormRef = useRef();

  useEffect(() => {
    const paymentMethodElement = document.querySelector("#payment-method");
    if (paymentMethodElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsPaymentVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(paymentMethodElement);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (isPaymentVisible) {
      setTimeout(() => setShowButton(false), 300);
    } else {
      setShowButton(true);
    }
  }, [isPaymentVisible]);

  useEffect(() => {
    if (!details || details.length === 0 || !hotelDetail) {
      navigate(`/hotels/${getHotelData?.hotelCode}`);
    }
  }, [details, hotelData, hotelDetail, navigate, getHotelData]);

  if (!details || details.length === 0 || !hotelDetail) {
    return null;
  }

  return (
    <div className="md:p-4 md:pb-0  bg-primary-green overflow-hidden">
      <Helmet>
        <title>Booking Details</title>
        <meta name="" content={``} />
        <meta name="" content={``} />
      </Helmet>
      <div className="content flex gap-3 md:gap-5 lg:gap-6 flex-col py-3 md:py-6 lg:py-10 px-3 md:px-0">

        {/* Header Row - Mobile optimized */}
        <div className="flex justify-between items-center">

          {/* Left: Back button + Logo */}
          <div
            className="flex items-center cursor-pointer gap-2 md:gap-6 text-white"
            onClick={() => navigate(-1)}
          >
            <button aria-label="Go back" className="flex items-center flex-shrink-0">
              <ArrowBackIosNew className="text-white h-5 w-5 sm:h-6 sm:w-6 md:h-9 md:w-9" />
            </button>
            <img
              src="/images/Logo/logo.svg"
              alt={hotelDetail?.name}
              className="w-[100px] sm:w-[120px] md:w-[150px]"
            />
          </div>

          {/* Right: User Profile / Login */}
          <div className="flex-shrink-0">
            {userInfo ? (
              <div
                onClick={() => navigate('/user/profile')}
                className="bg-white cursor-pointer text-primary-yellow font-bold w-10 h-10 sm:w-12 sm:h-12 md:h-12 md:w-12 rounded-full flex items-center justify-center text-sm sm:text-base"
              >
                {userData?.data.firstName?.[0]?.toUpperCase()}{userData?.data.lastName?.[0]?.toUpperCase()}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="border-2 border-primary-yellow text-primary-yellow px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-base hover:bg-primary-yellow hover:text-white transition"
              >
                Login
              </button>
            )}
          </div>

          {showLoginModal && <div>Login Modal Here</div>}
        </div>

        {/* Title */}
        <div className="text-white  text-mobile/head md:text-desktop/head">
          Booking Details
        </div>

      </div>
      <div className="md:flex gap-5 content bg-white py-6 md:py-0 rounded-t-3xl overflow-visible relative">
        <div className="flex-1 flex flex-col md:px-8 md:py-10 gap-4 md:gap-8 min-w-0">
          <HeaderHotel />
          <HotelDetailsCard />
          {hotelDetail.addToYourStay.length > 0 && <AddToYourStayOptions data={hotelDetail} />}

          <GuestDetailsForm ref={guestFormRef} setIsVerified={setIsVerified} />
          <OfferCode hotelDetail={hotelDetail} checkIn={checkIn} verified={verified} />




          <PaymentMethod hotelDetail={hotelDetail}
            verified={verified}
            checkIn={checkIn}
            checkOut={checkOut}
          />
          <div className="xl:hidden">
            <ReservationSummarySidebar
              hotelDetail={hotelDetail}
              checkIn={checkIn}
              checkOut={checkOut}
              days={days}
              showButton={showButton}
              isPaymentVisible={isPaymentVisible}
            />
          </div>
          <Footer ContactUsDetail={ContactUsDetail} />
        </div>
        <div className="hidden xl:block xl:w-[420px] flex-shrink-0 px-8 py-10">
          <ReservationSummarySidebar
            hotelDetail={hotelDetail}
            checkIn={checkIn}
            checkOut={checkOut}
            days={days}
            showButton={showButton}
            isPaymentVisible={isPaymentVisible}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;