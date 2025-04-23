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

  const getHotelDataLocal = localStorage.getItem("hotelInfo");
  const getHotelData = JSON.parse(getHotelDataLocal);

  const checkIn = localStorage.getItem("checkInDate");
  const checkOut = localStorage.getItem("checkOutDate");
  const days = calculateDays(checkIn, checkOut);

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // Create a ref for GuestDetailsForm
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
    return null; // or a loading indicator
  }

  return (
    <div className="p-4 content md:flex gap-5">
      <div className="flex flex-col gap-8">
        <Helmet>
          <title>Booking Details</title>
          <meta name="" content={``} />
          <meta name="" content={``} />
        </Helmet>
        <HotelDetailsCard />
        {/* Render GuestDetailsForm once and pass its ref */}
        <GuestDetailsForm ref={guestFormRef} />
        {hotelDetail.addToYourStay.length > 0 && <AddToYourStayOptions data={hotelDetail} />}
        <OfferCode hotelDetail={hotelDetail}  checkIn={checkIn} />
        <div className="lg:hidden">
          <ReservationSummarySidebar
            hotelDetail={hotelDetail}
            checkIn={checkIn}
            checkOut={checkOut}
            days={days}
            showButton={showButton}
            isPaymentVisible={isPaymentVisible}
          />
        </div>
        {/* Pass the guestFormRef to PaymentMethod */}
        <PaymentMethod hotelDetail={hotelDetail} guestFormRef={guestFormRef} 
          checkIn={checkIn}
          checkOut={checkOut}
        />
        <Footer ContactUsDetail={ContactUsDetail} />
      </div>
      <div className="hidden lg:block">
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
  );
};

export default BookingDetailsPage;
