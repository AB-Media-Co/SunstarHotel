import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = () => {
  const location = useLocation();

  // check if current route is /thankyou
  const hideNavbar = location.pathname === "/thankyou";

  return (
    <div className='home '>
      {!hideNavbar && <Navbar />}
      <Outlet />
      <Footer />
      {/* <HotelDropdown/> */}
    </div>
  );
};

export default Layout;
