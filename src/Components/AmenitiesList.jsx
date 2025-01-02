/* eslint-disable react/prop-types */
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useScrollAnimations from "../hooks/useScrollAnimations";
import useTextRevealAnimation from "../hooks/useTextRevealAnimation";
const AmenitiesList = ({ title, subtitle, amenities }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useTextRevealAnimation();
    useScrollAnimations();

    return (
        <div id="amenities" className="py-8 bg-white content">
            <hr className="bg-[#A4A4A4] h-[2px]" />
            <h2 className="md:text-[36px] text-[20px] font-bold my-6 text-reveal-animation">{title}</h2>
            <hr className="bg-[#A4A4A4] h-[2px]" />
            <p className="bg-[#FFC700] text-white text-[18px] md:px-4 md:py-2 py-1 rounded-lg text-center font-bold w-[200px] my-4">{subtitle}</p>
            <div className="grid grid-cols-3 sm:grid-cols-3 mt-8 lg:grid-cols-6 gap-8">
                {amenities.slice(0, visible ? amenities.length : 12).map((amenity, index) => (
                    <div key={index} className="flex flex-col justify-center items-center space-y-2 animation-on-scroll">
                        <img src={amenity.icon} alt="" className="md:w-[50px] w-[40px] md:h-[50px] h-[40px]" />
                        <p className="md:text-[16px] text-[12px] font-medium text-[#FDC114]">{amenity.label}</p>
                    </div>
                ))}
            </div>
            <button
                onClick={toggleVisibility}
                className="mt-6 text-[#848484] hover:underline flex items-center"
            >
                {visible ? (
                    <div className="flex gap-2 items-center">
                        <span className="md:text-[22px] font-bold underline"> See Less</span>
                        <KeyboardArrowUpIcon className="mt-2"/>
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <span className="md:text-[22px] font-bold underline">See More </span>
                        <ExpandMoreIcon className="mt-2"/>
                    </div>
                )}
            </button>
        </div>
    );
};

export default AmenitiesList;
