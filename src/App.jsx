/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home/Home";
import './App.css';
import Layout from "./Components/Layout";
import AboutUs from './pages/About/AboutUs';
import Corporatebooking from './pages/CorporateBooking/Corporatebooking';
import Hotels from './pages/Hotels/Hotels'
import ContactUs from './pages/ContactUs/ContactUs';
import CustomDateRangeSelector from './Components/Calendar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Sidebar } from './adminPanel/Components/Sidebar';
import { Header } from './adminPanel/Components/Header';
// import { Dashboard } from './adminPanel/pages/Dashboard/Dashboard';
import { Rooms } from './adminPanel/pages/Rooms/Rooms';
import { AdminHotels } from './adminPanel/pages/AdminHotels/AdminHotels';
import { getToken } from './adminPanel/utils/auth';
import { AdminLogin } from './adminPanel/pages/AdminLogin';
import { Sidebar, SidebarItem } from './adminPanel/Components/Sidebar';
import EditHotels from './adminPanel/pages/AdminHotels/EditHotels';
import  { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function PrivateRoute({ children }) {
  const token = getToken();
  // If user is not authenticated, redirect to login page
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem/>
      </Sidebar>
      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/calender" element={<CustomDateRangeSelector />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/corporate-booking" element={<Corporatebooking />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          {/* <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
          <Route path="/admin/hotels" element={<PrivateRoute><AdminHotels /></PrivateRoute>} />
          <Route path="/admin/edithotles/:hotelId" element={<PrivateRoute><EditHotels /></PrivateRoute>} />
          <Route path="/admin/rooms" element={<PrivateRoute><Rooms /></PrivateRoute>} />
        </Routes>
      </Router>
      <Toaster />

    </QueryClientProvider>
  );
}

export default App;
