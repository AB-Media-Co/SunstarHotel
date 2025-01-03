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

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hotelOpen, setHotelOpen] = useState(false);

  useEffect(() => {
    const currentPath =
      location.pathname === "/"
        ? "Home"
        : location.pathname.startsWith("/hotels")
          ? "Hotels"
          : location.pathname
            .replace("/", "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    setActive(currentPath);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleHotelsClick = () => {
    closeMobileMenu();
    setHotelOpen(true);
  };

  const navItems = [
    { name: "Home", icon: <HomeIcon />, route: "/" },
    { name: "Why Sunstar", icon: <InfoIcon />, route: "/why-sunstar" },
    { name: "Hotels", icon: <HotelIcon />, action: handleHotelsClick },
    { name: "Corporate Booking", icon: <BusinessIcon />, route: "/corporate-booking" },
    { name: "Contact", icon: <ContactMailIcon />, route: "/contact" },
  ];

  return (
    <nav className="bg-transparent nav text-white py-4 top-2 absolute w-full z-40">
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md font-semibold uppercase transition-colors duration-300 ${active === name ? "text-[#F9BF02]" : "hover:text-[#F9BF02]"
                    }`}
                >
                  {icon}
                  <span className="text-mobile/body/2 md:text-desktop/body/1">{name}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Book Now Button */}
          <button className="bg-[#F9BF02] px-11 py-2 text-black font-bold rounded-full md:ml-4 hidden md:block">
            Book Now
          </button>
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
          className={`fixed top-0 md:hidden left-0 h-fit overflow-hidden bg-white text-[#A4A4A4] font-semibold w-72 transform transition-transform ease-in-out duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Header with Logo and Close Button */}
          <div className="flex justify-between p-4  border-b border-gray-200">
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
          <div className="flex h-[90vh] flex-col justify-between mt-4 space-y-4  px-4 overflow-hidden">
            <div className="space-y-4 ">
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
                    className={`flex items-center space-x-2 w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${active === name
                      ? "text-[#F9BF02] bg-gray-100"
                      : "hover:text-[#F9BF02]"
                      }`}
                  >
                    {icon}
                    <span className="text-mobile/body/2">{name}</span>
                  </button>
                </div>
              ))}

            </div>

            <div className="relative px-4 py-6 border-t h-[240px]  border-gray-200">
              <img
                src="/images/Logo/menuelement.png"
                alt="Decoration"
                className="absolute inset-0 opacity-20 w-full  object-cover "
              />
              <div className="flex flex-col space-y-4 relative">
                <a
                  href="https://instagram.com"
                  className="flex items-center space-x-2 hover:text-[#F9BF02] transition-colors duration-300"
                >
                  <InstagramIcon style={{ color: "#FDC114" }} />
                  <span className="text-mobile/body/2">Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  className="flex items-center space-x-2 hover:text-[#F9BF02] transition-colors duration-300"
                >
                  <FacebookIcon style={{ color: "#FDC114" }} />
                  <span className="text-mobile/body/2">Facebook</span>
                </a>
                <a
                  href="https://youtube.com"
                  className="flex items-center space-x-2 hover:text-[#F9BF02] transition-colors duration-300"
                >
                  <YouTubeIcon style={{ color: "#FDC114" }} />
                  <span className="text-mobile/body/2">YouTube</span>
                </a>
              </div>

              <button className="mt-6 bg-[#F9BF02] text-[#006167] px-6 py-3 w-full rounded-lg font-bold relative">
                Book Now
              </button>
            </div>
          </div>

        </div>




        <AllHotelCard hotels={hotels} isOpen={hotelOpen} onClose={() => setHotelOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;
