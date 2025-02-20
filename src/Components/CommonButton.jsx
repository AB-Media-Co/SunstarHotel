/* eslint-disable react/prop-types */
import React from "react";
import Icon from "./Icons";
import { useNavigate } from "react-router-dom";

const CommonButton = ({ className = "", link = "/", children }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(link)}
      className={`w-full bg-gradient-to-r  text-primary-gray py-3 px-6 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-opacity-50 transition-all duration-200 ease-in-out flex items-center justify-center space-x-3 ${className}`}
    >
      <span className="font-semibold text-lg">{children || "Book Now"}</span>
      <div className="bg-primary-green rounded-full p-2 flex items-center justify-center">
        <Icon name="upArrow" className="w-4 h-4 text-primary-white" />
      </div>
    </button>
  );
};

export default CommonButton;
