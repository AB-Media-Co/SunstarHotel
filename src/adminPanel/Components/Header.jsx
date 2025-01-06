import { Logout, Person } from "@mui/icons-material";
import { useState } from "react";
import { removeToken } from "../utils/auth";

export const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-white px-10 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="flex gap-6 items-center relative">
        {/* User Icon with Dropdown */}
        <div 
          className="cursor-pointer rounded-full bg-gray-500 py-[10px] px-[12px] relative"
          onClick={toggleDropdown}
        >
          <Person className="text-white" />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-md rounded-md border w-40">
            <ul className="flex flex-col">
              <li
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { 
                  window.location.href = "/admin/view-user"; 
                  setDropdownOpen(false);
                }}
              >
                View User
              </li>
              <li
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { 
                  window.location.href = "/admin/create-user"; 
                  setDropdownOpen(false);
                }}
              >
                Create User
              </li>
            </ul>
          </div>
        )}

        {/* Logout Icon */}
        <div className="cursor-pointer border border-red-500 p-2 rounded-lg">
          <Logout
            onClick={() => {
              removeToken();
              window.location.href = "/admin/login";
            }}
            className="text-red-500"
          />
        </div>
      </div>
    </header>
  );
};
