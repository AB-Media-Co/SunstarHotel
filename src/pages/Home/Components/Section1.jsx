/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import AllHotelCard from "../../../Components/AllHotelCard";
import { hotels } from "../../../Data/AboutSectionData";

const Section1 = ({ section1Data }) => {
    const { words, heading, description, buttonLabel, images } = section1Data;
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [delay, setDelay] = useState(false);
    const [hotelOpen, setHotelOpen] = useState(false);

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

    return (
        <div className="relative z-10">
            {/* Background Image */}
            <img
                src={images.desktop}
                alt="Hotel Sunstar Grand Exterior"
                className="w-full h-[100vh] object-cover hidden md:block"
            />
            <img
                src={images.mobile}
                alt="Hotel Sunstar Grand Exterior"
                className="w-full h-[650px] object-cover md:hidden"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.4]"></div>

            <div data-aos="fade-up" className="absolute top-[60%] left-[5%] sm:top-[63%] sm:left-[53%] md:top-[45%] md:left-[10%] flex flex-col md:gap-4 text-left text-white max-w-[90%] sm:max-w-[80%] md:max-w-[40%]">
                <h1 className="text-mobile/h1 sm:text-5xl md:text-desktop/large/h text-reveal-animation">
                    {heading}
                </h1>
                <p className="text-mobile/title md:text-desktop/body/large animation-on-scroll-Section1">
                    {description}
                </p>

                <div onClick={() => setHotelOpen(true)} className="mt-6 flex justify-between items-center lg:w-[490px] font-semibold cursor-pointer bg-white rounded-full py-2 md:py-4 px-7">
                    <div className="flex gap-2 items-center animation-on-scroll-Section1">
                        <p className="text-mobile/button md:text-desktop/button text-[#7A7A7A]">
                            {buttonLabel}
                        </p>
                        <p className="text-mobile/button md:text-desktop/button text-[#FDC114] w-fit">
                            {currentWord}
                        </p>
                    </div>
                    <div className="text-[#FDC114]">
                        <SearchIcon style={{ fontSize: '35px' }} />
                    </div>
                </div>
                <AllHotelCard hotels={hotels} isOpen={hotelOpen} onClose={() => setHotelOpen(false)} />
            </div>
        </div>
    );
};

export default Section1;
