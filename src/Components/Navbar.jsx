import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
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

  const navItems = ['Home', 'About', 'Corporate Booking', 'Hotels', 'Contact'];

  return (
    <nav className="bg-transparent text-white py-4 top-2 absolute w-full z-50">
      <div className="content flex justify-between items-center">
        {/* Logo */}
        <Link to='/' className="text-2xl font-bold">
          <img src="/images/Logo/logo.svg" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className='flex gap-10 items-center'>
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                  className={`px-3 py-2 rounded-md font-semibold uppercase transition-colors duration-300 ${active === item ? 'text-[#F9BF02]' : 'hover:text-[#F9BF02]'}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Book Now Button */}
          <button className="bg-yellow-500 hover:bg-yellow-600 px-11 py-2 text-black font-bold rounded-full md:ml-4 hidden md:block">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <span className="text-2xl">☰</span>
        </button>

        {/* Mobile Menu (Slide-in Sidebar) */}
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-64 transform transition-transform ease-in-out duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button
            className="text-white text-2xl self-end focus:outline-none"
            onClick={closeMobileMenu}
          >
            &times;
          </button>
          {navItems.map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
              className={`px-3 py-2 rounded-md block transition-colors duration-300 ${active === item ? 'text-[#F9BF02]' : 'hover:text-[#F9BF02]'}`}
              onClick={closeMobileMenu}
            >
              {item}
            </Link>
          ))}
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md mt-4">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
