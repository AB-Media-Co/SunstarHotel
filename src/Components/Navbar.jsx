import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BusinessIcon from "@mui/icons-material/Business";
import HotelIcon from "@mui/icons-material/Hotel";
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PinterestIcon from '@mui/icons-material/Pinterest';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AllHotelCard from "./AllHotelCard";
import { hotels } from "../Data/AboutSectionData";
import { usePricing } from "../Context/PricingContext";
import { useGetUserByEmail } from "../ApiHooks/useUser";
import LoginModal from "./LoginModal";
import { LogIn } from "lucide-react";


function getHotelPayLink(hotelCode) {
  switch (String(hotelCode)) {
    case "14494":
      return "https://hotelsunstarresidency.hotelpay.co.in/";
    case "14492":
      return "https://hotelsunstargrand.hotelpay.co.in/";
    case "14496":
      return "https://suncourthotelyatri.hotelpay.co.in/";
    case "14493":
      return "https://sunstarheritage.hotelpay.co.in/";
    default:
      return "#";
  }
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isHotelModalOpen, openHotelModal, closeHotelModal, navColor } = usePricing();
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const userInfo = localStorage.getItem('user_email');
  const { data: userData } = useGetUserByEmail(userInfo);

  // Check if current path starts with "/hotels"
  const isHotelsPath = location.pathname.startsWith("/hotels");
  const hotelInfo = localStorage.getItem("hotelInfo");
  let hotelObj = null;
  let payLink = "#";

  if (hotelInfo) {
    try {
      hotelObj = JSON.parse(hotelInfo);
      payLink = getHotelPayLink(hotelObj.hotelCode);
    } catch (err) {
      console.error("Parse error", err);
    }
  }

  // Updated navItems using context function for Hotels
  const navItems = [
    { name: "Home", icon: <HomeIcon sx={{ fontSize: 20 }} />, route: "/" },
    { name: "Why Sunstar?", icon: <InfoIcon sx={{ fontSize: 20 }} />, route: "/why-sunstar" },
    {
      name: "Hotels",
      icon: <HotelIcon sx={{ fontSize: 20 }} />,
      action: openHotelModal
    },
    { name: "Corporate Booking", icon: <BusinessIcon sx={{ fontSize: 20 }} />, route: "/corporate-booking" },
    { name: "Day Use Room", icon: <BusinessIcon sx={{ fontSize: 20 }} />, route: "/dayuseroom" },
    { name: "Contact", icon: <ContactMailIcon sx={{ fontSize: 20 }} />, route: "/contact" },
  ];

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`bg-transparent nav ${navColor ? 'text-black' : 'text-primary-white'} py-4 top-2 absolute w-full z-40`}>
        <div className="content flex justify-between items-center min-h-[60px] px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex-shrink-0">
            <img
              src={`${navColor ? '/images/Logo/logo2.svg' : '/images/Logo/logo.svg'}`}
              alt="Logo"
              className="h-[40px] sm:h-[49px] w-[120px] sm:w-[150px]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-10 items-center flex-1 justify-center">
            <ul className="flex items-center space-x-6">
              {navItems.map(({ name, route, action }, index) => (
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
                    <span className="text-desktop/body/1 font-semibold whitespace-nowrap">{name}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Pay Now Button - Desktop */}
            {isHotelsPath && (
              <a href={payLink} target="_blank" rel="noopener noreferrer">
                <button className="bg-primary-yellow px-4 py-4 text-sm text-black font-bold rounded-full mr-4">
                  Pay Now
                </button>
              </a>
            )}
          </div>

          {/* Desktop User Profile */}
          <div className="hidden lg:flex items-center">
            {userInfo ? (
              <div 
                onClick={() => navigate('/user/profile', { state: { tab: "profile" } })} 
                className="bg-white border-2 cursor-pointer text-primary-yellow font-bold w-12 h-12 rounded-full flex items-center justify-center"
              >
                {userData?.data.firstName?.[0]?.toUpperCase()}{userData?.data.lastName?.[0]?.toUpperCase()}
              </div> 
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-primary-yellow px-4 py-2 border-2 border-primary-yellow rounded-full font-bold"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle and User Profile */}
          <div className="flex gap-3 items-center lg:hidden">
            {/* User Profile for Mobile */}
            {userInfo ? (
              <div 
                onClick={() => navigate('/user/profile', { state: { tab: "profile" } })} 
                className="bg-white border-2 cursor-pointer text-primary-yellow font-bold w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm flex-shrink-0"
              >
                {userData?.data.firstName?.[0]?.toUpperCase()}{userData?.data.lastName?.[0]?.toUpperCase()}
              </div> 
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-primary-yellow px-2 sm:px-3 py-1 border-2 border-primary-yellow rounded-full font-bold text-xs sm:text-sm whitespace-nowrap"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="focus:outline-none p-1 flex-shrink-0"
              onClick={toggleMobileMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <CloseIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: navColor ? '#000' : '#fff' }} />
              ) : (
                <MenuIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: navColor ? '#000' : '#fff' }} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && <LoginModal closeModal={() => setShowLoginModal(false)} />}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile and Tablet Menu (Slide-in Sidebar) */}
      <div
        className={`fixed top-0 bottom-0 lg:hidden left-0 bg-primary-white text-[#A4A4A4] font-semibold w-80 max-w-[85vw] transform transition-transform ease-in-out duration-300 z-50 overflow-hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
          <Link to="/" onClick={closeMobileMenu} className="flex-shrink-0">
            <img
              src="/images/Logo/mobileLogo.svg"
              alt="Logo"
              className="h-[26px] w-[100px]"
            />
          </Link>
          <button
            className="text-black focus:outline-none p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </button>
        </div>

        {/* Navigation Items - Scrollable Area */}
        <div className="flex-1 overflow-y-auto max-h-[345px]" >
          <div className="py-4">
            <div className="space-y-1 px-4">
              {navItems.map(({ name, icon, route, action }, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (action) {
                      action();
                    } else if (route) {
                      navigate(route);
                    }
                    closeMobileMenu();
                  }}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    active === name 
                      ? "text-primary-yellow bg-yellow-50 border-l-4 border-primary-yellow" 
                      : "hover:text-primary-yellow hover:bg-gray-50"
                  }`}
                >
                  <span className="flex-shrink-0">{icon}</span>
                  <span className="text-base font-medium">{name}</span>
                </button>
              ))}
            </div>

            {/* Pay Now Button for Mobile - Only show when on hotels path */}
            {isHotelsPath && (
              <div className="px-4 mt-6">
                <a href={payLink} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
                  <button className="w-full bg-primary-yellow text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-300">
                    Pay Now
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Social Links Section - Fixed at Bottom */}
        <div className="border-t border-gray-200 p-4 bg-gray-50" style={{ height: '180px' }}>
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
            Follow Us
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-colors duration-300"
              onClick={closeMobileMenu}
            >
              <InstagramIcon sx={{ color: "#FDC114", fontSize: 18 }} />
              <span className="text-xs">Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-colors duration-300"
              onClick={closeMobileMenu}
            >
              <FacebookIcon sx={{ color: "#FDC114", fontSize: 18 }} />
              <span className="text-xs">Facebook</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-colors duration-300"
              onClick={closeMobileMenu}
            >
              <YouTubeIcon sx={{ color: "#FDC114", fontSize: 18 }} />
              <span className="text-xs">YouTube</span>
            </a>
            <a
              href="https://www.linkedin.com/company/hotelsunstargroup/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-colors duration-300"
              onClick={closeMobileMenu}
            >
              <LinkedInIcon sx={{ color: "#FDC114", fontSize: 18 }} />
              <span className="text-xs">LinkedIn</span>
            </a>
            <a
              href="https://in.pinterest.com/hotel_sunstar_groupm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-colors duration-300 col-span-2 justify-center"
              onClick={closeMobileMenu}
            >
              <PinterestIcon sx={{ color: "#FDC114", fontSize: 18 }} />
              <span className="text-xs">Pinterest</span>
            </a>
          </div>
        </div>
      </div>

      <AllHotelCard hotels={hotels} isOpen={isHotelModalOpen} onClose={closeHotelModal} />
    </>
  );
};

export default Navbar;