import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BusinessIcon from "@mui/icons-material/Business";
import HotelIcon from "@mui/icons-material/Hotel";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ContactMailIcon from "@mui/icons-material/ContactMail";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AllHotelCard from "./AllHotelCard";
import { hotels } from "../Data/AboutSectionData";
import { usePricing } from "../Context/PricingContext";
import { useGetUserByEmail } from "../ApiHooks/useUser";
import LoginModal from "./LoginModal";

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

  const [openDropdown, setOpenDropdown] = useState(null); // desktop: string | null
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null); // mobile: string | null
  const dropdownTimeoutRef = useRef(null);

  const userInfo = localStorage.getItem('user_email');
  const { data: userData } = useGetUserByEmail(userInfo);

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



  // Dropdown menu items for Corporate Booking

  const navItems = [
    { name: "Home", icon: <HomeIcon sx={{ fontSize: 20 }} />, route: "/" },

    {
      name: "Why Sunstar",
      icon: <InfoIcon sx={{ fontSize: 20 }} />,
      hasDropdown: false,
      route: "/why-sunstar"
    },

    {
      name: "Hotels",
      icon: <HotelIcon sx={{ fontSize: 20 }} />,
      action: openHotelModal,
    },


    {
      name: "Day Stays",
      icon: <BusinessIcon sx={{ fontSize: 20 }} />,
      hasDropdown: false,
      route: "/dayuseroom"
    },

    {
      name: "Services",
      icon: <BusinessIcon sx={{ fontSize: 20 }} />,
      hasDropdown: true,
      items: [
        { name: "Tour & Travel", route: "/tour&travel" },
        { name: "Event & Conference", route: "/eventandconference" },
      ],
    },

    {
      name: "Contact Us",
      icon: <ContactMailIcon sx={{ fontSize: 20 }} />,
      hasDropdown: false,
      route: "/contact"
    },
  ];


  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };
  const toggleMobileDropdown = (name) => {
    setMobileOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      setActive("Home");
    } else if (location.pathname.startsWith("/hotels")) {
      setActive("Hotels");
    } else if (location.pathname === "/why-sunstar") {
      setActive("Why Sunstar");
    } else if (location.pathname === "/corporate-booking") {
      setActive("Corporate Booking");
    } else if (location.pathname === "/dayuseroom") {
      setActive("Day Stays");
    } else if (location.pathname === "/contact") {
      setActive("Contact Us");
    } else if (location.pathname === "/tour&travel") {
      setActive("Services");
    } else if (location.pathname === "/eventandconference") {
      setActive("Services");
    } else {
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
    // setIsMobileDropdownOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleDropdownItemClick = (route) => {
    navigate(route);
    closeMobileMenu();
  };

  return (
    <>
      <nav className={`bg-transparent nav ${navColor ? 'text-black' : 'text-primary-white'} py-2 sm:py-4 top-2 absolute w-full z-40`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center min-h-[50px] sm:min-h-[60px] px-2 sm:px-4 md:px-6 lg:px-8 gap-2">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex-shrink-0">
            <img
              src={`${navColor ? '/images/Logo/logo2.svg' : '/images/Logo/logo.svg'}`}
              alt="Logo"
              className="w-[120px] md:w-[160px]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex gap-10 items-center flex-1 justify-center">
            <ul className="flex items-center space-x-2">
              {navItems.map(({ name, route, action, hasDropdown, items }, index) => (
                <li
                  key={index}
                  className="relative"
                  onMouseEnter={hasDropdown ? () => handleMouseEnter(name) : undefined}
                  onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                >
                  {hasDropdown ? (
                    <div>
                      <button
                        className={`flex items-center gap-1 px-3 py-2 rounded-md font-semibold uppercase transition-colors duration-300 ${active === name ? "text-primary-yellow" : "hover:text-primary-yellow"}`}
                      >
                        <span className="text-desktop/body/1 font-semibold whitespace-nowrap">{name}</span>
                        <KeyboardArrowDownIcon
                          sx={{
                            fontSize: 20,
                            transition: 'transform 0.3s ease',
                            transform: openDropdown === name ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        />
                      </button>

                      {/* Dropdown */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${openDropdown === name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                          }`}
                        style={{
                          minWidth: '240px', // enough for 2–3 items
                          maxWidth: '320px', pointerEvents: openDropdown === name ? 'auto' : 'none'
                        }}
                      >
                        <div className="grid grid-cols-1 gap-1 p-3">
                          {items?.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleDropdownItemClick(item.route)}
                              className="group text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:text-primary-yellow rounded-lg transition-all duration-200 flex items-center justify-between"
                            >
                              <span>{item.name}</span>
                              <svg
                                className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (action) action();
                        else if (route) navigate(route);
                      }}
                      className={`flex items-center px-3 py-2 rounded-md font-semibold uppercase transition-colors duration-300 ${active === name ? "text-primary-yellow" : "hover:text-primary-yellow"}`}
                    >
                      <span className="text-desktop/body/1 font-semibold whitespace-nowrap">{name}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>


          </div>

          <div className="flex gap-4">
            {/* Pay Now Button - Desktop */}
            {isHotelsPath && (
              <a href={payLink} target="_blank" rel="noopener noreferrer">
                <button
                  className="bg-primary-yellow text-[9px] md:text-sm px-4 py-1 md:py-3 border-2 border-primary-yellow rounded-full font-bold hover:bg-primary-yellow hover:text-black transition-all duration-300"
                >
                  Pay Now
                </button>
              </a>
            )}
            {/* Desktop User Profile */}
            <div className="hidden xl:flex items-center">
              {userInfo ? (
                <div
                  onClick={() => navigate('/user/profile', { state: { tab: "profile" } })}
                  className="bg-white border-2 cursor-pointer text-primary-yellow font-bold w-12 h-12 rounded-full flex items-center justify-center hover:border-primary-yellow hover:shadow-lg transition-all duration-300"
                >
                  {userData?.data.firstName?.[0]?.toUpperCase()}{userData?.data.lastName?.[0]?.toUpperCase()}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-primary-yellow px-4 py-2 border-2 border-primary-yellow rounded-full font-bold hover:bg-primary-yellow hover:text-black transition-all duration-300"
                >
                  Login
                </button>
              )}
            </div>


            {/* Mobile Menu Toggle and User Profile */}
            <div className="flex gap-3 items-center xl:hidden">
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

        </div>
      </nav >

      {/* Login Modal */}
      {showLoginModal && <LoginModal closeModal={() => setShowLoginModal(false)} />}

      {/* Mobile Menu Overlay */}
      {
        isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
        )
      }

      {/* Mobile and Tablet Menu (Slide-in Sidebar) */}
      <div
        className={`fixed top-0 bottom-0 xl:hidden left-0 bg-primary-white text-[#A4A4A4] font-semibold w-80 max-w-[85vw] transform transition-transform ease-in-out duration-300 z-50 overflow-hidden shadow-2xl ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            {/* Header with Logo and Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
              <Link to="/" onClick={closeMobileMenu} className="flex-shrink-0">
                <img
                  src="/images/Logo/mobileLogo.svg"
                  alt="Logo"
                  className="w-[120px] md:w-[160px]"
                />
              </Link>
              <button
                className="text-black focus:outline-none p-2 hover:bg-gray-100 rounded-full flex-shrink-0 transition-colors duration-200"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </button>
            </div>

            {/* Navigation Items - Scrollable Area */}
            <div className="flex-1 overflow-y-auto max-h-[380px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="py-4">
                <div className="space-y-1 px-4">
                  {navItems.map(({ name, icon, route, action, hasDropdown, items }, index) => (
                    <div key={index}>
                      {hasDropdown ? (
                        <div>
                          <button
                            onClick={() => toggleMobileDropdown(name)}
                            className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${active === name ? "text-primary-yellow bg-yellow-50 border-l-4 border-primary-yellow" : "hover:text-primary-yellow hover:bg-gray-50"
                              }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="flex-shrink-0">{icon}</span>
                              <span className="text-base font-medium">{name}</span>
                            </div>
                            <KeyboardArrowDownIcon
                              sx={{
                                fontSize: 20,
                                transition: 'transform 0.3s ease',
                                transform: mobileOpenDropdown === name ? 'rotate(180deg)' : 'rotate(0deg)'
                              }}
                            />
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileOpenDropdown === name ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                              }`}
                          >
                            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                              {items?.map((item, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleDropdownItemClick(item.route)}
                                  className="group flex items-center justify-between w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-primary-yellow hover:bg-yellow-50 rounded-md transition-all duration-200"
                                >
                                  <span>{item.name}</span>
                                  <svg
                                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            if (action) action();
                            else if (route) navigate(route);
                            closeMobileMenu();
                          }}
                          className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${active === name ? "text-primary-yellow bg-yellow-50 border-l-4 border-primary-yellow" : "hover:text-primary-yellow hover:bg-gray-50"
                            }`}
                        >
                          <span className="flex-shrink-0">{icon}</span>
                          <span className="text-base font-medium">{name}</span>
                        </button>
                      )}
                    </div>
                  ))}

                </div>

                {/* Pay Now Button for Mobile */}
                {/* {isHotelsPath && (
                  <div className="px-4 mt-6">
                    <a href={payLink} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
                      <button className="w-full bg-primary-yellow text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-300 shadow-md hover:shadow-lg">
                        Pay Now
                      </button>
                    </a>
                  </div>
                )} */}
              </div>
            </div>

          </div>

          {/* Social Links Section - Fixed at Bottom */}
          <div className="border-t border-gray-200 p-4 bg-gradient-to-b from-gray-50 to-gray-100" style={{ height: '180px' }}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Follow Us
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-sm"
                onClick={closeMobileMenu}
              >
                <InstagramIcon sx={{ color: "#FDC114", fontSize: 18 }} />
                <span className="text-xs">Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-sm"
                onClick={closeMobileMenu}
              >
                <FacebookIcon sx={{ color: "#FDC114", fontSize: 18 }} />
                <span className="text-xs">Facebook</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-sm"
                onClick={closeMobileMenu}
              >
                <YouTubeIcon sx={{ color: "#FDC114", fontSize: 18 }} />
                <span className="text-xs">YouTube</span>
              </a>
              <a
                href="https://www.linkedin.com/company/hotelsunstargroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-sm"
                onClick={closeMobileMenu}
              >
                <LinkedInIcon sx={{ color: "#FDC114", fontSize: 18 }} />
                <span className="text-xs">LinkedIn</span>
              </a>
              <a
                href="https://in.pinterest.com/hotel_sunstar_groupm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-sm col-span-2 justify-center"
                onClick={closeMobileMenu}
              >
                <PinterestIcon sx={{ color: "#FDC114", fontSize: 18 }} />
                <span className="text-xs">Pinterest</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <AllHotelCard hotels={hotels} isOpen={isHotelModalOpen} onClose={closeHotelModal} />
    </>
  );
};

export default Navbar;