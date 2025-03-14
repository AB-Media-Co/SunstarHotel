/* eslint-disable react/prop-types */
import { ChevronLast, ChevronFirst } from 'lucide-react';
import { useState, createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Hotel,
  LocationCity,
  NightShelterOutlined,
  People,
  Edit,
  Group,
  Article,
  Search,
} from '@mui/icons-material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useAdminContext } from '../utils/AdminContext';

// Create a Context to manage expanded state
const SidebarContext = createContext();

// Sidebar component
export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const { adminProfile } = useAdminContext();

  // Define sidebar items with role-based access
  const sidebarItems = [
    { id: 1, text: 'Hotels', icon: <Hotel />, path: '/admin/hotels', roles: ['superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer'] },
    { id: 2, text: 'Rooms', icon: <NightShelterOutlined />, path: '/admin/rooms', roles: ['superadmin', 'admin', 'manager', 'contentManager', 'hotelManager'] },
    { id: 3, text: 'Locations', icon: <LocationCity />, path: '/admin/hotel-locations', roles: ['superadmin', 'admin', 'manager', 'cityManager'] },
    { id: 4, text: 'Offers And Deals', icon: <LocalOfferIcon />, path: '/admin/offers', roles: ['superadmin', 'admin', 'manager', 'digitalMarketer'] },
    { id: 5, text: 'Update Pages', icon: <Edit />, path: '/admin/pages', roles: ['superadmin', 'admin', 'contentManager'] },
    { id: 6, text: 'Manage SEO', icon: <Search />, path: '/admin/manage-seo', roles: ['superadmin', 'admin', 'digitalMarketer'] },
    { id: 7, text: 'Manage Blogs', icon: <Article />, path: '/admin/manage-blogs', roles: ['superadmin', 'admin', 'contentManager', 'digitalMarketer'] },
    { id: 8, text: 'All Users', icon: <Group />, path: '/admin/all-users', roles: ['superadmin', 'admin'] },
    { id: 9, text: 'My Profile', icon: <People />, path: '/admin/profile', roles: ['superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer'] },
  ];

  const userRole = adminProfile?.data?.role;

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className="fixed top-0 left-0 h-full z-50 bg-white border-r shadow-lg transition-all duration-500 ease-in-out">
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center transition-all duration-500 ease-in-out">
            <Link className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'w-32' : 'w-0'}`}>
              <img src="/images/Logo/mobileLogo.svg" alt="Logo" className="w-full" />
            </Link>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <ul className="flex-1 px-3 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              // Show item only if user's role is in the allowed roles list
              if (!item.roles.includes(userRole)) return null;
              return <SidebarItem key={item.id} icon={item.icon} text={item.text} path={item.path} />;
            })}
          </ul>
        </nav>
      </aside>
      {/* Spacer div to push content right when sidebar is expanded */}
      <div className={`transition-all duration-500 ease-in-out ${expanded ? 'ml-64' : 'ml-20'}`} />
    </SidebarContext.Provider>
  );
}

// SidebarItem component
export function SidebarItem({ icon, text, path }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
      <Link
        to={path}
        className={`flex items-center w-full py-4 px-2 rounded-lg transition-all duration-500 ease-in-out ${
          location.pathname === path
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 scale-105 shadow-md'
            : 'hover:bg-indigo-50 text-gray-600'
        }`}
      >
        <div className="transition-transform duration-500 ease-in-out group-hover:scale-110">{icon}</div>
        <span className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'w-40 ml-3' : 'w-0'}`}>
          {text}
        </span>
      </Link>
    </li>
  );
}

export default Sidebar;