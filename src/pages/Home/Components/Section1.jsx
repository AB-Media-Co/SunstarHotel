/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import { hotels } from "../../../Data/AboutSectionData";
import { CloseOutlined } from "@mui/icons-material";
import HotelSelctingCards from "../../../Components/CardsCommonComp/HotelSelectingCards";
// import "./Section1.css"; 

const Section1 = ({ section1Data }) => {
    const { words, heading, description, buttonLabel, images } = section1Data;
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [delay, setDelay] = useState(false);
    const [hotelOpen, SetHotelsOpen] = useState(false);

    useTextRevealAnimation();
    useScrollAnimations("#section1");
    
    useEffect(() => {
        if (delay) {
            const delayTimer = setTimeout(() => setDelay(false), 1000);
            return () => clearTimeout(delayTimer);
        }

        const type = () => {
            const word = words[index];
            if (isDeleting) {
                setCurrentWord((prev) => prev.slice(0, -1));
                if (currentWord === "") {
                    setIsDeleting(false);
                    setIndex((prevIndex) => (prevIndex + 1) % words.length);
                }
            } else {
                setCurrentWord(word.slice(0, currentWord.length + 1));
                if (currentWord === word) {
                    setIsDeleting(true);
                    setDelay(true);
                }
            }
        };

        const typingSpeed = isDeleting ? 50 : 100;
        const timer = setTimeout(type, typingSpeed);

        return () => clearTimeout(timer);
    }, [currentWord, isDeleting, index, words, delay]);

    // Disable scroll when hotel popup is open
    useEffect(() => {
        if (hotelOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [hotelOpen]);

    return (
        <div className="relative z-10 ">
            {/* Background Image */}
            <img
                src={images.desktop}
                alt="Hotel Sunstar Grand Exterior"
                className="w-full h-[850px] object-cover hidden md:block zoom-in-on-scroll "
            />
            <img
                src={images.mobile}
                alt="Hotel Sunstar Grand Exterior"
                className="w-full h-[850px] object-cover md:hidden "
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.4]"></div>

            <div className="absolute  top-[50%] left-[5%] sm:top-[53%] sm:left-[53%] md:top-[53%] md:left-[10%] flex flex-col gap-4 text-left text-white max-w-[90%] sm:max-w-[80%] md:max-w-[40%]">
                <h1 className="text-2xl sm:text-5xl md:text-[60px] font-bold leading-tight text-reveal-animation">
                    {heading}
                </h1>
                <p className="text-md sm:text-xl md:text-2xl mt-4 leading-relaxed  animation-on-scroll-Section1">
                    {description}
                </p>

                <div onClick={() => SetHotelsOpen(true)} className="mt-6 flex justify-between items-center lg:w-[490px] font-semibold cursor-pointer bg-white rounded-full  py-2 md:py-4 px-7  ">
                    <div className="flex gap-2">
                        <p className="text-[16px] sm:text-xl text-[#7A7A7A] md:text-2xl mb-2 animation-on-scroll">
                            {buttonLabel}
                        </p>
                        <p className="text-[16px] sm:text-xl text-[#FDC114] md:text-2xl w-fit animation-on-scroll">
                            {currentWord}
                        </p>
                    </div>
                    <div className="text-[#FDC114]">
                        <SearchIcon style={{ fontSize: '35px' }} />
                    </div>
                </div>
                {hotelOpen && (
                    <div className="fixed  inset-0 bg-[#6EC4C2]  w-full flex justify-center items-center z-50">
                        <div className="flex hotelSelection flex-col Calender  overflow-auto mt-64     md:w-[1300px]  md:flex-row gap-6">
                            <div>
                                <div className="flex justify-between items-center px-4 py-2">
                                    <div className="text-[48px] font-semibold">
                                        Hotels
                                    </div>
                                    <button
                                        className=" text-black iconb text-xl  font-bold cursor-pointer"
                                        onClick={() => SetHotelsOpen(false)}
                                    >
                                        <CloseOutlined className="icon" />
                                    </button>
                                </div>
                                <div className="text-center text-lg h-[100vh]   ">
                                    <div className="grid gap-6 sm:grid-cols-2  rounded-t-[32px] overflow-y-auto bg-white hotelSelection  md:w-[1300px] lg:grid-cols-3 md:py-12 md:pb-[20rem] px-10">
                                        {hotels?.map((hotel, index) => (
                                            <HotelSelctingCards key={index} hotel={hotel} link="/hotels" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Section1;
