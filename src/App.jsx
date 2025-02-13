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
import AddRooms from './adminPanel/pages/Rooms/AddRooms';
import EditRooms from './adminPanel/pages/Rooms/EditRooms';
import { CreateUser } from './adminPanel/pages/Users/CreateUser';
import ViewUser from './adminPanel/pages/Users/ViewUser';
import { AdminProvider } from './adminPanel/utils/AdminContext';
import AllUsers from './adminPanel/pages/Users/AllUsers';
import { HotelLocations } from './adminPanel/pages/HotelLocations/HotelLocations';
import { EditHotel } from './adminPanel/pages/AdminHotels/EditHotel';
import { AddHotel } from './adminPanel/pages/AdminHotels/AddHotel';

const Layout = lazy(() => import(/* webpackChunkName: "layout" */ './Components/Layout'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home/Home'));
const AboutUs = lazy(() => import(/* webpackChunkName: "aboutus" */ './pages/About/AboutUs'));
const Corporatebooking = lazy(() => import(/* webpackChunkName: "corporatebooking" */ './pages/CorporateBooking/Corporatebooking'));
const Hotels = lazy(() => import(/* webpackChunkName: "hotels" */ './pages/Hotels/Hotels'));
const ContactUs = lazy(() => import(/* webpackChunkName: "contactus" */ './pages/ContactUs/ContactUs'));
const HotelRooms = lazy(() => import(/* webpackChunkName: "hotelrooms" */ './pages/Rooms/Rooms'));
const RoomsDetails = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/Rooms/Components/BookingDetailsPage'));
const CityPage = lazy(() => import(/* webpackChunkName: "roomsdetails" */ './pages/Citypage/CityPage'));

const queryClient = new QueryClient();

// Private Route wrapper
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

// Loader-triggering wrapper for routes
function LoaderWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = sessionStorage.getItem('currentPath');
    if (prevPath !== currentPath) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 200);
      sessionStorage.setItem('currentPath', currentPath);
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (loading) {
    return <Loader />;
  }

  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loader />}>
          <LoaderWrapper>
            <Routes>
              {/* Public Routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/why-sunstar" element={<AboutUs />} />
                <Route path="/corporate-booking" element={<Corporatebooking />} />
                <Route path="/hotels/:hotelId" element={<Hotels />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/room/:id" element={<HotelRooms />} />
                <Route path="/citypage" element={<CityPage />} />
              </Route>

              <Route path="/room/details" element={<RoomsDetails />} />
            </Routes>

            <AdminProvider>
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/hotels" element={<PrivateRoute><AdminHotels /></PrivateRoute>} />
                <Route path="/admin/edithotels/:hotelId" element={<PrivateRoute><EditHotel/></PrivateRoute>} />
                <Route path="/admin/addHotels" element={<PrivateRoute><AddHotel/></PrivateRoute>} />

                <Route path="/admin/rooms" element={<PrivateRoute><Rooms /></PrivateRoute>} />
                <Route path="/admin/addRooms" element={<PrivateRoute><AddRooms /></PrivateRoute>} />
                <Route path="/admin/editRooms/:roomId" element={<PrivateRoute><EditRooms /></PrivateRoute>} />
                <Route path="/admin/create_user" element={<PrivateRoute><CreateUser /></PrivateRoute>} />
                <Route path="/admin/view-user" element={<PrivateRoute><ViewUser /></PrivateRoute>} />
                <Route path="/admin/all-users" element={<PrivateRoute><AllUsers /></PrivateRoute>} />
                <Route path="/admin/hotel-locations" element={<PrivateRoute><HotelLocations/></PrivateRoute>} />
              </Routes>
            </AdminProvider>
          </LoaderWrapper>
        </Suspense>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
