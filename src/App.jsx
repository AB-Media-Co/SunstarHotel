/* eslint-disable react/prop-types */
import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Sidebar, SidebarItem } from './adminPanel/Components/Sidebar';
import { Header } from './adminPanel/Components/Header';
import { getToken } from './adminPanel/utils/auth';
import Loader from './Components/Loader'; // Custom Loader component
// import Aos from 'aos'
// import "aos/dist/aos.css"

// Lazy-loaded components
const Layout = lazy(() => import('./Components/Layout'));
const Home = lazy(() => import('./pages/Home/Home'));
const AboutUs = lazy(() => import('./pages/About/AboutUs'));
const Corporatebooking = lazy(() => import('./pages/CorporateBooking/Corporatebooking'));
const Hotels = lazy(() => import('./pages/Hotels/Hotels'));
const ContactUs = lazy(() => import('./pages/ContactUs/ContactUs'));
const HotelRooms = lazy(() => import('./pages/Rooms/Rooms'));


const HotelDropdown = lazy(() => import('./Components/HotelDroddown'));
const AdminLogin = lazy(() => import('./adminPanel/pages/AdminLogin'));
const AdminHotels = lazy(() => import('./adminPanel/pages/AdminHotels/AdminHotels'));
const EditHotels = lazy(() => import('./adminPanel/pages/AdminHotels/EditHotels'));
const AddHotels = lazy(() => import('./adminPanel/pages/AdminHotels/AddHotels'));
const Rooms = lazy(() => import('./adminPanel/pages/Rooms/Rooms'));
const AddRooms = lazy(() => import('./adminPanel/pages/Rooms/AddRooms'));
const EditRooms = lazy(() => import('./adminPanel/pages/Rooms/EditRooms'));

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
// Loader-triggering wrapper for routes
function LoaderWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show loader if the pathname changes, not for hash navigation
    const currentPath = location.pathname;
    const prevPath = sessionStorage.getItem('currentPath');

    if (prevPath !== currentPath) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time
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
  // useEffect(() => {
	// 	Aos.init({
	// 		duration: 1000,
	// 		once: true
	// 	})
	// }, [])
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
                <Route path="/test" element={<HotelDropdown />} />
                <Route path="/room/:id" element={<HotelRooms />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/hotels"
                element={
                  <PrivateRoute>
                    <AdminHotels />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/edithotles/:hotelId"
                element={
                  <PrivateRoute>
                    <EditHotels />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/addHotels"
                element={
                  <PrivateRoute>
                    <AddHotels />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/rooms"
                element={
                  <PrivateRoute>
                    <Rooms />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/addRooms"
                element={
                  <PrivateRoute>
                    <AddRooms />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/editRooms/:roomId"
                element={
                  <PrivateRoute>
                    <EditRooms />
                  </PrivateRoute>
                }
              />
            </Routes>
          </LoaderWrapper>
        </Suspense>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
