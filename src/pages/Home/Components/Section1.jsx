/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const Section1 = ({section1Data}) => {
    const { words, heading, description, buttonLabel, images } = section1Data;
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [delay, setDelay] = useState(false);

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
        <div className="relative z-10 section ">
            {/* Background Image */}
            <img
                src={images.desktop}
                alt="Hotel Sunstar Grand Exterior"
                className="w-full h-[850px] object-cover hidden md:block"
            />
            <img
                src={images.mobile}
                alt="Hotel Sunstar Grand Exterior"
                className="w-full h-[850px] object-cover md:hidden"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.4]"></div>

            <div className="absolute top-[50%] left-[5%] sm:top-[53%] sm:left-[53%] md:top-[53%] md:left-[10%] flex flex-col gap-4 text-left text-white max-w-[90%] sm:max-w-[80%] md:max-w-[40%]">
                <h1 className="text-2xl sm:text-5xl md:text-[60px] font-bold leading-tight">
                    {heading}
                </h1>
                <p className="text-md sm:text-xl md:text-2xl mt-4 leading-relaxed">
                    {description}
                </p>

                <div className="mt-6 flex justify-between items-center lg:w-[490px] font-semibold cursor-pointer bg-white rounded-full py-4 px-7">
                    <div className="flex gap-2">
                        <p className="text-lg sm:text-xl text-[#7A7A7A] md:text-2xl mb-2">{buttonLabel}</p>
                        <p className="text-lg sm:text-xl text-[#FDC114] md:text-2xl  w-fit">
                            {currentWord}
                        </p>
                    </div>
                    <div className="text-[#FDC114]">
                        <SearchIcon style={{ fontSize: '35px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section1;
