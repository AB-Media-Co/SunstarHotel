import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BusinessIcon from "@mui/icons-material/Business";
import HotelIcon from "@mui/icons-material/Hotel";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AllHotelCard from "./AllHotelCard";
import { hotels } from "../Data/AboutSectionData";
import { usePricing } from "../Context/PricingContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isHotelModalOpen, openHotelModal, closeHotelModal } = usePricing();  
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if current path starts with "/hotels"
  const isHotelsPath = location.pathname.startsWith("/hotels");

  // Updated navItems using context function for Hotels
  const navItems = [
    { name: "Home", icon: <HomeIcon />, route: "/" },
    { name: "Why Sunstar?", icon: <InfoIcon />, route: "/why-sunstar" },
    { 
      name: "Hotels", 
      icon: <HotelIcon />, 
      action: openHotelModal 
    },
    { name: "Corporate Booking", icon: <BusinessIcon />, route: "/corporate-booking" },
    { name: "Day Use Room", icon: <BusinessIcon />, route: "/dayuseroom" },
    { name: "Contact", icon: <ContactMailIcon />, route: "/contact" },
  ];

  useEffect(() => {
    // Improved active tab detection logic
    if (location.pathname === "/") {
      setActive("Home");
    } else if (location.pathname.startsWith("/hotels")) {
      setActive("Hotels");
    } else if (location.pathname === "/why-sunstar") {
      setActive("Why Sunstar?");  
    } else if (location.pathname === "/corporate-booking") {
      setActive("Corporate Booking");
    } else if (location.pathname === "/dayuseroom") {
      setActive("Day Use Room");
    } else if (location.pathname === "/contact") {
      setActive("Contact");
    } else {
      // For any other path, extract and format the name from the path
      const pathName = location.pathname
        .replace("/", "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      setActive(pathName);
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-transparent nav text-primary-white py-4 top-2 absolute w-full z-40">
        <div className="content flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <img
              src="/images/Logo/logo.svg"
              alt="Logo"
              className="h-[49px] w-[150px]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="flex gap-10 items-center">
            <ul className="hidden md:flex space-x-6">
              {navItems.map(({ name, icon, route, action }, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      if (action) {
                        action();
                      } else if (route) {
                        navigate(route);
                      }
                    }}
                    className={`flex items-center px-3 py-2 rounded-md font-semibold uppercase transition-colors duration-300 ${
                      active === name ? "text-primary-yellow" : "hover:text-primary-yellow"
                    }`}
                  >
                    {/* {icon} */}
                    <span className="text-mobile/body/2 md:text-desktop/body/1 md:font-semibold">{name}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Pay Now Button - Only show when path starts with "/hotels" */}
            {isHotelsPath && (
              <button className="bg-primary-yellow px-11 py-2 text-black font-bold rounded-full md:ml-4 hidden md:block">
                Pay Now
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          {!isMenuOpen && (
            <button
              className="block md:hidden focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <span className="text-[34px]">☰</span>
            </button>
          )}

          {/* Mobile Menu (Slide-in Sidebar) */}
          <div
            id="mobile-menu"
            className={`fixed top-0 md:hidden left-0 h-screen overflow-hidden bg-primary-white text-[#A4A4A4] font-semibold w-72 transform transition-transform ease-in-out duration-500 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header with Logo and Close Button */}
            <div className="flex justify-between p-4 border-b border-gray-200">
              <Link to="/" onClick={closeMobileMenu}>
                <img
                  src="/images/Logo/mobileLogo.svg"
                  alt="Logo"
                  className="h-[26px] w-[100px]"
                />
              </Link>
              <button
                className="text-black text-2xl focus:outline-none"
                onClick={closeMobileMenu}
              >
                &times;
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex h-[90vh] flex-col justify-between mt-4 space-y-4 px-4 overflow-hidden">
              <div className="space-y-4">
                {navItems.map(({ name, icon, route, action }, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        if (action) {
                          action();
                        } else if (route) {
                          navigate(route);
                        }
                        closeMobileMenu();
                      }}
                      className={`flex items-center space-x-2 w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                        active === name ? "text-primary-yellow bg-gray-100" : "hover:text-primary-yellow"
                      }`}
                    >
                      {icon}
                      <span className="text-mobile/body/2">{name}</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="relative px-4 py-6 border-t h-[300px] border-gray-200">
                <img
                  src="/images/Logo/menuelement.png"
                  alt="Decoration"
                  className="absolute inset-0 opacity-20 w-full object-cover"
                />
                <div className="flex flex-col space-y-4 relative">
                  <a
                    href="https://instagram.com"
                    className="flex items-center space-x-2 hover:text-primary-yellow transition-colors duration-300"
                  >
                    <InstagramIcon style={{ color: "#FDC114" }} />
                    <span className="text-mobile/body/2">Instagram</span>
                  </a>
                  <a
                    href="https://facebook.com"
                    className="flex items-center space-x-2 hover:text-primary-yellow transition-colors duration-300"
                  >
                    <FacebookIcon style={{ color: "#FDC114" }} />
                    <span className="text-mobile/body/2">Facebook</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    className="flex items-center space-x-2 hover:text-primary-yellow transition-colors duration-300"
                  >
                    <YouTubeIcon style={{ color: "#FDC114" }} />
                    <span className="text-mobile/body/2">YouTube</span>
                  </a>
                </div>

                {/* Mobile Pay Now Button - Only show when path starts with "/hotels" */}
                {isHotelsPath && (
                  <button className="mt-6 bg-primary-yellow text-primary-green px-6 py-3 w-full rounded-lg font-bold relative">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AllHotelCard hotels={hotels} isOpen={isHotelModalOpen} onClose={closeHotelModal} />
    </>
  );
};

export default Navbar;