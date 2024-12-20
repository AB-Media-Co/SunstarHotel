import {  useRef } from 'react';
import { Outlet } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "./Navbar";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const pageRef = useRef(null);


  
  return (
    <div ref={pageRef} className='home '>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
