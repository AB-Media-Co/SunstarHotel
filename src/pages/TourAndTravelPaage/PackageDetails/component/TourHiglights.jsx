import React from 'react';
import nightIcon from '/images/TourAndTravel/night.svg';
import dayIcon from '/images/TourAndTravel/day.svg';
import { useNavigate } from 'react-router-dom';

const TourHighlights = ({ packageDetails }) => {
  const {
    title,
    duration,
    price,
    highlights = [],
  } = packageDetails || {};
  const navigate = useNavigate();

  return (
    <div className="content mx-auto p-4 my-4 border border-teal-300 rounded-xl flex flex-col md:flex-row justify-between items-center bg-white shadow-sm">
      <div className="flex-1 w-full">
        <div className="w-full justify-between flex flex-wrap gap-2">
          <h2 className="text-mobile/h3 md:text-desktop/h3 font-semibold text-gray-800 mb-2">
            {title}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <img src={nightIcon} alt="Night" className="w-6 h-6 md:w-7 md:h-7" />
              <span className="text-mobile/body/2 md:text-desktop/body/1 text-gray-800">
                {duration?.nights} Night
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src={dayIcon} alt="Day" className="w-6 h-6 md:w-7 md:h-7" />
              <span className="text-mobile/body/2 md:text-desktop/body/1 text-gray-800">
                {duration?.days} Day
              </span>
            </div>
          </div>
        </div>

        <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-700 mb-2 mt-1">Package Inclusion</p>

        <div className="flex flex-wrap max-w-md gap-2 mb-3">
          {highlights.map((item, idx) => (
            <span
              key={idx}
              className="bg-primary-green text-white text-xs px-3 py-1 rounded-full font-semibold"
            >
              {item.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="flex w-full justify-between items-end mt-2">
          <div>
            <div className="text-primary-green font-bold text-lg md:text-xl">
              ₹{price}/-
            </div>
            <p className="text-xs text-gray-500">*Per Person on twin sharing</p>
          </div>

          <button onClick={()=>navigate('/travel-booking-form')} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-5 rounded-full text-sm">
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourHighlights;
