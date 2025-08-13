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
  const { data: userData, } = useGetUserByEmail(userInfo);


  // Check if current path starts with "/hotels"
  const isHotelsPath = location.pathname.startsWith("/hotels");
  const hotelInfo = localStorage.getItem("hotelInfo");
  let hotelObj = null;
  let payLink = "#";

  if (hotelInfo) {
    try {
      hotelObj = JSON.parse(hotelInfo);
      payLink = getHotelPayLink(hotelObj.hotelCode); // works, even if hotelCode is number
    } catch (err) {
      console.error("Parse error", err);
    }
  }

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
      <nav className={`bg-transparent nav ${navColor ? 'text-black' : 'text-primary-white'}  py-4 top-2 absolute w-full z-40`}>
        <div className="content flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <img
              src={`${navColor ? '/images/Logo/logo2.svg' : '/images/Logo/logo.svg'} `}
              alt="Logo"
              className="h-[49px] w-[150px]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="flex gap-10 items-center">
            <ul className="hidden md:flex items-center space-x-6">
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
                    className={`flex items-center px-3 py-2 rounded-md font-semibold uppercase transition-colors duration-300 ${active === name ? "text-primary-yellow" : "hover:text-primary-yellow"
                      }`}
                  >
                    {/* {icon} */}
                    <span className="text-mobile/body/2 md:text-desktop/body/1 md:font-semibold">{name}</span>
                  </button>
                </li>
              ))}
            </ul>

            {showLoginModal && <LoginModal closeModal={() => setShowLoginModal(false)} />}


            {/* Pay Now Button - Only show when path starts with "/hotels" */}
            {isHotelsPath && (
              <a href={payLink} target="_blank" rel="noopener noreferrer">
                <button className="bg-primary-yellow px-11 py-2 text-black font-bold rounded-full md:ml-4 hidden md:block">
                  Pay Now
                </button>
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}

          <div className="flex gap-2">

            {!isMenuOpen && (
              <button
                className="block md:hidden focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <span className="text-[34px]">☰</span>
              </button>
            )}

            <div className="md:absolute top-4 lg:right">
              {userInfo ? (
                <div onClick={() => navigate('/user/profile')} className="bg-white border-2 cursor-pointer text-primary-yellow font-bold w-12 h-12 rounded-full flex items-center justify-center">
                  {userData?.data.firstName?.[0]?.toUpperCase()}{userData?.data.lastName?.[0]?.toUpperCase()}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className=" text-primary-yellow px-4 py-2 rounded-full font-bold  "
                >
                  <img
                    src="/images/login.svg"
                    alt="Logo"
                    className="h-10 w-10"
                  />

                </button>
              )}

            </div>


          </div>

          {/* Mobile Menu (Slide-in Sidebar) */}
          <div
            id="mobile-menu"
            className={`fixed top-0 md:hidden left-0 h-screen overflow-hidden bg-primary-white text-[#A4A4A4] font-semibold w-72 transform transition-transform ease-in-out duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
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
                      className={`flex items-center space-x-2 w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${active === name ? "text-primary-yellow bg-gray-100" : "hover:text-primary-yellow"
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
                  <a
                    href="https://www.linkedin.com/company/hotelsunstargroup/"
                    className="flex items-center space-x-2 hover:text-primary-yellow transition-colors duration-300"
                  >
                    <LinkedInIcon style={{ color: "#FDC114" }} />
                    <span className="text-mobile/body/2">YouTube</span>
                  </a>
                  <a
                    href="https://in.pinterest.com/hotel_sunstar_groupm"
                    className="flex items-center space-x-2 hover:text-primary-yellow transition-colors duration-300"
                  >
                    <PinterestIcon style={{ color: "#FDC114" }} />
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