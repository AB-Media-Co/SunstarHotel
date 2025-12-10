import { Outlet, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load non-critical components
const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));

// Minimal navbar skeleton
const NavbarSkeleton = () => (
  <div className="h-20 bg-white border-b animate-pulse" />
);


const Layout = () => {
  const location = useLocation();

  // check if current route is /thankyou
  const hideNavbar = location.pathname === "/thankyou";

  return (
    <div className='home '>
      {!hideNavbar && (
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
      )}
      <Outlet />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {/* <HotelDropdown/> */}
    </div>
  );
};

export default Layout;
