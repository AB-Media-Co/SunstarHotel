/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import AllHotelCard from "../../../Components/AllHotelCard";
import useUpdatePagesHook from '../../../ApiHooks/useUpdatePagesHook'
import { usePricing } from "../../../Context/PricingContext";

const Section1 = ({ section1Data }) => {
  const { heroSectionUpdate, loading, Loader } = useUpdatePagesHook();
  const { words, buttonLabel, } = section1Data;
  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(false);
  const { isHotelModalOpen, openHotelModal, closeHotelModal } = usePricing();  

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


   // If loading is true, render the Loader component
   if (loading) {
    return <Loader />;
  }

  return (
    <div className="overflow-hidden md:overflow-visible">
      <div
        className="relative z-10 w-full h-screen bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroSectionUpdate?.image})`
        }}
      >
        <img
          src="images/HomepageImages/round.png"
          alt=""
          className="md:z-10 absolute right-0 md:right-16 top-[33rem] md:top-[30rem] w-[65%] md:w-[23%] animate-spin-slow"
        />

        <div
          data-aos="zoom-in"
          className="absolute top-[60%] left-[5%] sm:top-[63%] sm:left-[53%] md:top-[45%] md:left-[10%] flex flex-col md:gap-4 text-left text-primary-white max-w-[90%] sm:max-w-[80%] md:max-w-7xl"
        >
          <h1 className="text-mobile/h1 sm:text-5xl md:text-desktop/large/h text-reveal-animation">
            {heroSectionUpdate?.heading}
          </h1>
          <p className="text-mobile/title md:text-desktop/body/large md:max-w-[53%] animation-on-scroll-Section1">
            {heroSectionUpdate?.description}
          </p>

          <div
            onClick={openHotelModal}
            className="mt-6 flex justify-between items-center lg:w-[490px] font-semibold cursor-pointer bg-primary-white rounded-full py-2 md:py-4 px-7 hover:bg-gray-50 transition-colors"
          >
            <div className="flex gap-2 items-center animation-on-scroll-Section1">
              <p className="text-mobile/button md:text-desktop/button text-gray-600">
                {buttonLabel}
              </p>
              <p className="text-mobile/button md:text-desktop/button text-[#FDC114] w-fit">
                {currentWord}
              </p>
            </div>
            <div className="text-[#FDC114]">
              <SearchIcon size={35} />
            </div>
          </div>
        </div>
      </div>
      <AllHotelCard isOpen={isHotelModalOpen} onClose={closeHotelModal} />
    </div>
  );
};

export default Section1;

