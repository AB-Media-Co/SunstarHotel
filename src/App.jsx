/* eslint-disable react/prop-types */
import { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Sidebar, SidebarItem } from './adminPanel/Components/Sidebar';
import { Header } from './adminPanel/Components/Header';
import { getToken } from './adminPanel/utils/auth';
import { Rooms } from './adminPanel/pages/Rooms/Rooms';
import { AdminHotels } from './adminPanel/pages/AdminHotels/AdminHotels';
import { AdminLogin } from './adminPanel/pages/AdminLogin';
// import AddRooms from './adminPanel/pages/Rooms/AddRooms';
// import EditRooms from './adminPanel/pages/Rooms/EditRooms';
import { CreateUser } from './adminPanel/pages/Users/CreateUser';
import ViewUser from './adminPanel/pages/Users/ViewUser';
import { AdminProvider } from './adminPanel/utils/AdminContext';
import AllUsers from './adminPanel/pages/Users/AllUsers';
import { HotelLocations } from './adminPanel/pages/HotelLocations/HotelLocations';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EditHotel from './adminPanel/pages/AdminHotels/EditHotel';
import AddHotel from './adminPanel/pages/AdminHotels/AddHotel';
import UpdatePage from './adminPanel/pages/UpdatePages/UpdatePage';
import DealsOffers from './adminPanel/pages/Deals&Offers/DealsOffers';
import { PricingProvider } from './Context/PricingContext';
import ManageBlogs from './adminPanel/pages/ManageBlogs/ManageBlogs';
import SeoMeta from './adminPanel/pages/OptimiseSeo/SeoMeta';
import EventandConference from './pages/OtherPages/EventandConference';
import ComingSoonPage from './pages/OtherPages/ComingSoonPage';
import CookieConsent from "./Components/CookieConsent"; // adjust path
import CareerMain from './pages/SunstarCareer/CareerMain';
import TravelAgent from './pages/TravelAgent/TravelAgent';
import TourAndTravel from './adminPanel/pages/TourAndTravel/TourAndTravel';
import Jobs from './adminPanel/pages/CareerPageJobs/Jobs';
import BlogEditorTabs from './adminPanel/pages/ManageBlogs/BlogEditorTabs';
import MyBookings from './pages/OtherPages/My-Bookings';

// import PhoneAuth from './pages/PhoneAuth';


const Layout = lazy(() => import(/* webpackChunkName: "layout" */ './Components/Layout'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home/Home'));
const AboutUs = lazy(() => import(/* webpackChunkName: "aboutus" */ './pages/About/AboutUs'));
const Corporatebooking = lazy(() => import(/* webpackChunkName: "corporatebooking" */ './pages/CorporateBooking/Corporatebooking'));
const Hotels = lazy(() => import(/* webpackChunkName: "hotels" */ './pages/Hotels/Hotels'));
const ContactUs = lazy(() => import(/* webpackChunkName: "contactus" */ './pages/ContactUs/ContactUs'));
const HotelRooms = lazy(() => import(/* webpackChunkName: "hotelrooms" */ './pages/Rooms/Rooms'));
const RoomsDetails = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/RoomDetailPricing/BookingDetailsPage'));
const CityPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/Citypage/CityPage'));
const TermsAndConditions = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/OtherPages/TermsAndConditions'));
const CancellationPolicyPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/OtherPages/PrivacyPolicies'));
const BlogsPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/OtherPages/Blogs'));
const ReadBlogPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/OtherPages/ReadBlog'));
const CorporateEventsPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/OtherPages/CorporateEventsPage'));
const SocialEventsPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/OtherPages/SocialEventsPage'));
const WeddingPreWeddingPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/OtherPages/WeddingPreWeddingPage'));
const BookingForm = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/OtherPages/BookingForm'));
const DevelopersOwners = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/DevelopersAndOwners/DevelopersOwners'));
const DayUseRoom = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/DayUseRoom/DayUseRoom'));
const TourAndTravelPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/TourAndTravelPaage/TourAndTravelMain/TourAndTravelPage'));
const SelectedState = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/TourAndTravelPaage/SeletectedState/SelectedState'));
const PackageDetails = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/TourAndTravelPaage/PackageDetails/PackageDetail'));
const TravelBookingForm = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/TourAndTravelPaage/TravelBookingForm'));

const queryClient = new QueryClient();

function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem />
      </Sidebar>
      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <PricingProvider>
          <Routes>
            <Route element={<Layout />}>

              <Route path="/" element={<Home />} />
              <Route path="/why-sunstar" element={<AboutUs />} />
              <Route path="/corporate-booking" element={<Corporatebooking />} />
              <Route path="/hotels/:hotelCode" element={<Hotels />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/citypage/:cityName" element={<CityPage />} />
              <Route path="/terms-conditions&cancellation" element={<TermsAndConditions />} />
              <Route path="/privacy-policies" element={<CancellationPolicyPage />} />
              <Route path="/sunstar-blogs" element={<BlogsPage />} />
              <Route path="/sunstar-blogs/:slug" element={<ReadBlogPage />} />
              <Route path="/coorporatevents" element={<CorporateEventsPage />} />
              <Route path="/socialevents" element={<SocialEventsPage />} />
              <Route path="/weddingpreWedding" element={<WeddingPreWeddingPage />} />
              <Route path="/booking-form" element={<BookingForm />} />
              <Route path="/developers&owners" element={<DevelopersOwners />} />
              <Route path="/eventandconference" element={<EventandConference />} />
              <Route path="/dayuseroom" element={<DayUseRoom />} />
              <Route path="/career" element={<CareerMain />} />
              <Route path="/tour&travel" element={<TourAndTravelPage />} />
              <Route path="/destination/:state" element={<SelectedState />} />
              <Route path="/package-detail/:title" element={<PackageDetails />} />
              <Route path="/travel-agent" element={<TravelAgent />} />
              <Route path="/in-the-media" element={<ComingSoonPage />} />
              <Route path="/loyalty-program" element={<ComingSoonPage />} />
              <Route path="/travel-booking-form" element={  <TravelBookingForm/>} />
              <Route path="/my-bookings" element={  <MyBookings/>} />
            </Route>
            <Route path="/room/details" element={<RoomsDetails />} />
            <Route path="/room/:id" element={<HotelRooms />} />

            {/* <Route path="/otp" element={<PhoneAuth />} /> */}
          </Routes>
        </PricingProvider>

        <AdminProvider>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/hotels" element={<PrivateRoute><AdminHotels /></PrivateRoute>} />
            <Route path="/admin/hotels/edit/:hotelCode" element={<PrivateRoute><EditHotel /></PrivateRoute>} />
            <Route path="/admin/hotels/add" element={<PrivateRoute><AddHotel /></PrivateRoute>} />
            <Route path="/admin/pages" element={<PrivateRoute><UpdatePage /></PrivateRoute>} />
            <Route path="/admin/offers" element={<PrivateRoute><DealsOffers /></PrivateRoute>} />
            <Route path="/admin/rooms" element={<PrivateRoute><Rooms /></PrivateRoute>} />
            <Route path="/admin/create_user" element={<PrivateRoute><CreateUser /></PrivateRoute>} />
            <Route path="/admin/view-user" element={<PrivateRoute><ViewUser /></PrivateRoute>} />
            <Route path="/admin/all-users" element={<PrivateRoute><AllUsers /></PrivateRoute>} />
            <Route path="/admin/hotel-locations" element={<PrivateRoute><HotelLocations /></PrivateRoute>} />
            {/* <Route path="/admin/manage-blogs" element={<PrivateRoute><ManageBlogs /></PrivateRoute>} /> */}
            <Route path="/admin/manage-blogs" element={<PrivateRoute><BlogEditorTabs /></PrivateRoute>} />
            <Route path="/admin/manage-seo" element={<PrivateRoute><SeoMeta /></PrivateRoute>} />
            <Route path="/admin/tour&travel" element={<PrivateRoute><TourAndTravel /></PrivateRoute>} />
            <Route path="/admin/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
          </Routes>
        </AdminProvider>
        {/* <Suspense fallback={<Loader />}>
          <LoaderWrapper>
          </LoaderWrapper>
        </Suspense> */}
      </Router>
      <CookieConsent />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
