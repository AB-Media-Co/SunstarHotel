import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import HotelIcon from '@mui/icons-material/Hotel';
import ContactMailIcon from '@mui/icons-material/ContactMail';


const   Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname === '/' ? 'Home' : location.pathname.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    setActive(currentPath);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Why Sunstar', icon: <InfoIcon /> },
    { name: 'Hotels', icon: <HotelIcon /> },
    { name: 'Corporate Booking', icon: <BusinessIcon /> },
    { name: 'Contact', icon: <ContactMailIcon /> },
  ];
  return (
    <nav className="bg-transparent nav text-white  py-4 top-2 absolute w-full z-40">
      <div className=" content  flex justify-between items-center">
        {/* Logo */}
        <Link to='/' className="text-2xl font-bold">
          <img src="/images/Logo/logo.svg" alt="Logo" className='h-[49px] w-[150px]' />
        </Link>

        {/* Desktop Menu */}
        <div className='flex gap-10 items-center'>
          <ul className="hidden md:flex space-x-6">
            {navItems.map(({ name, icon }) => (
              <li key={name}>
                <Link
                  to={name === 'Home' ? '/' : `/${name.toLowerCase().replace(/ /g, '-')}`}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md font-semibold uppercase transition-colors duration-300 ${active === name ? 'text-[#F9BF02]' : 'hover:text-[#F9BF02]'}`}
                >
                  {icon}
                  <span>{name}</span>
                </Link>
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
          className={`fixed top-0 md:hidden left-0 h-full bg-white text-[#A4A4A4] font-semibold w-72 transform transition-transform ease-in-out duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className='flex justify-between p-4'>
            <Link to='/' className="">
              <img src="/images/Logo/mobileLogo.svg" alt="Logo" className='h-[26px] w-[100px]' />
            </Link>
            <button
              className="text-black text-2xl  focus:outline-none"
              onClick={closeMobileMenu}
            >
              &times;
            </button>
          </div>
          <div className='flex flex-col h-[580px] justify-between'>
            <ul className="flex flex-col mt-4">
              {navItems.map(({ name, icon }) => (
                <li key={name} className="mb-2">
                  <Link
                    to={name === 'Home' ? '/' : `/${name.toLowerCase().replace(/ /g, '-')}`}
                    className={`flex items-center space-x-2 px-4 py-2  transition-colors duration-300 ${active === name ? 'text-[#F9BF02]' : 'hover:text-[#F9BF02]'}`}
                    onClick={closeMobileMenu}
                  >
                    {icon}
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>


            <div className='flex'>
              <div className='p-4 flex flex-col gap-10'>
                <div className="flex items-start flex-col space-y-2">
                  <a href="https://instagram.com" className="flex items-center space-x-2 hover:text-gray-300">
                    <InstagramIcon style={{ color: '#FDC114' }} />
                    <span>Instagram</span>
                  </a>
                  <a href="https://facebook.com" className="flex items-center space-x-2 hover:text-gray-300">
                    <FacebookIcon style={{ color: '#FDC114' }} />
                    <span>Facebook</span>
                  </a>
                  <a href="https://youtube.com" className="flex items-center space-x-2 hover:text-gray-300">
                    <YouTubeIcon style={{ color: '#FDC114' }} />
                    <span>YouTube</span>
                  </a>
                </div>

                <button className="bg-[#F9BF02] text-[#006167] px-4 w-[120px] rounded-full mt-4 py-2">
                  Book Now
                </button>
              </div>
              <div className='flex items-end justify-end w-full'>
                <img src="/images/Logo/menuelement.png" alt="" className='h-[180px] w-[180px]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
