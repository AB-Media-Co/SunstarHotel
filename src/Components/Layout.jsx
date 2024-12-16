import{ useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const sections = pageRef.current.querySelectorAll('.section'); // Select each section

    sections.forEach(section => {
      const elements = section.querySelectorAll('h1, h2, h3, h4, span, p');

      // Trigger animation for each section
      gsap.fromTo(
        elements, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 1, 
          ease: 'power3.out', 
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // Animation starts when section hits 80% of viewport
            end: 'bottom 20%', // Animation ends when section is about to leave
            toggleActions: 'play reverse play reverse', // Ensures it plays and reverses on scroll
            markers: false, // Set true for debugging
          }
        }
      );
    });
  }, []);

  return (
    <div ref={pageRef}>
      <Outlet /> 
    </div>
  );
};

export default Layout;
