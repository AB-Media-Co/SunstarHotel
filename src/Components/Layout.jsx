import {  useRef } from 'react';
import { Outlet } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "./Navbar";
import Footer from "./Footer";
import HotelDropdown from './HotelDroddown';

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const pageRef = useRef(null);
  return (
    <div ref={pageRef} className='home '>
      {/* <Navbar />
      <Outlet />
      <Footer /> */}
      <HotelDropdown/>
    </div>
  );
};

export default Layout;
