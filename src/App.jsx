/* eslint-disable react/prop-types */
import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Sidebar, SidebarItem } from './adminPanel/Components/Sidebar';
import { Header } from './adminPanel/Components/Header';
import { getToken } from './adminPanel/utils/auth';
import Loader from './Components/Loader';

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

// function LoaderWrapper({ children }) {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const prevPath = sessionStorage.getItem('currentPath');
//     if (prevPath !== currentPath) {
//       setLoading(true);
//       const timer = setTimeout(() => setLoading(false), 200);
//       sessionStorage.setItem('currentPath', currentPath);
//       return () => clearTimeout(timer);
//     }
//   }, [location]);

//   if (loading) {
//     return <Loader />;
//   }

//   return children;
// }

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
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
              <Route path="/room/:id" element={<HotelRooms />} />
              <Route path="/citypage/:cityName" element={<CityPage />} />
              <Route path="/terms-conditions&cancellation" element={<TermsAndConditions />} />
              <Route path="/privacy-policies" element={<CancellationPolicyPage />} />
              <Route path="/sunstar-blogs" element={<BlogsPage />} />
              <Route path="/sunstar-blogs/:slug" element={<ReadBlogPage />} />
            </Route>
            <Route path="/room/details" element={<RoomsDetails />} />
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
            <Route path="/admin/manage-blogs" element={<PrivateRoute><ManageBlogs /></PrivateRoute>} />
            <Route path="/admin/manage-seo" element={<PrivateRoute><SeoMeta /></PrivateRoute>} />
          </Routes>
        </AdminProvider>
        {/* <Suspense fallback={<Loader />}>
          <LoaderWrapper>
          </LoaderWrapper>
        </Suspense> */}
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
