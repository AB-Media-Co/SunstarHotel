import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = () => {
  return (
    <div className='home '>
      <Navbar />
      <Outlet />
      <Footer />
      {/* <HotelDropdown/> */}
    </div>
  );
};

export default Layout;
