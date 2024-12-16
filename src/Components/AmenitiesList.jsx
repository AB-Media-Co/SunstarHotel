/* eslint-disable react/prop-types */
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const AmenitiesList = ({ title, subtitle, amenities }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div className="py-8 bg-white content">
            <hr className="bg-[#A4A4A4] h-[2px]" />
            <h2 className="text-[36px] font-bold my-6">{title}</h2>
            <hr className="bg-[#A4A4A4] h-[2px]" />
            <p className="bg-[#FFC700] text-white text-[18px] px-4 py-2 rounded-lg text-center font-bold w-[200px] my-4">{subtitle}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 mt-8 lg:grid-cols-5 gap-6">
                {amenities.slice(0, visible ? amenities.length : 10).map((amenity, index) => (
                    <div key={index} className="flex flex-col">
                        <img src={amenity.icon} alt="" className="w-[60px] h-[60px]" />
                        <p className="text-[18px] font-medium text-[#FDC114]">{amenity.label}</p>
                    </div>
                ))}
            </div>
            <button
                onClick={toggleVisibility}
                className="mt-6 text-[#848484] hover:underline flex items-center"
            >
                {visible ? (
                    <div className="flex gap-2 items-center">
                        <span className="text-[22px] font-bold underline"> See Less</span>
                        <KeyboardArrowUpIcon className="mt-2"/>
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <span className="text-[22px] font-bold underline">See More </span>
                        <ExpandMoreIcon className="mt-2"/>
                    </div>
                )}
            </button>
        </div>
    );
};

export default AmenitiesList;
