/* eslint-disable react/prop-types */
import RoatinfImg from "../../../Components/RoatinfImg";
import CardSlider from "./Sec2CardSlider";

const Section2Hotel = ({section2HotelData}) => {
    const { heading, description, imagePosition } = section2HotelData;

    return (
        <div className="flex flex-col lg:flex-row  justify-between items-center lg:items-start mt-10 py-10 px-4 lg:px-8 lg:pr-0 z-0">
            {/* Image and Text Container */}
            <div className="relative flex flex-col section items-center lg:items-start mb-8 lg:mb-0 w-full lg:ps-[164px]">
 
                <RoatinfImg position={imagePosition} />
                
                {/* Text container */}
                <div className="relative lg:w-[453px] text-black mt-[-4rem] lg:mt-40">
                    <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
                        {heading}
                    </h1>
                    <p className="text-sm md:text-lg mt-4 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Card Slider */}
            <div className="w-full overflow-hidden">
                <CardSlider />
            </div>
        </div>
    );
};

export default Section2Hotel;
