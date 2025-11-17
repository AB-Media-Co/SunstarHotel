import { motion } from "framer-motion";
// import SearchIcon from "@mui/icons-material/Search";

const Banner = ({ hero }) => {
    return (
       <header className="relative">
        <img
             src='/images/DayUseRoom/banner.webp'
            alt='Events and Conferences'
            className="w-full h-[100vh] object-cover"
            loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 opacity-60"></div>
        <div className="absolute inset-0 content flex flex-col items-start pt-20 md:pt-0 justify-center text-start">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-primary-white capitalize text-mobile/h3 md:text-desktop/h3 font-bold drop-shadow-xl mb-3 sm:mb-4 max-w-full md:max-w-[850px] mx-auto md:mx-0 leading-tight"
                >
                    {hero?.heading}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-primary-white text-mobile/body/2 md:text-desktop/body/1  font-normal drop-shadow-xl mt-2 sm:mt-4 max-w-full md:max-w-[700px] mx-auto md:mx-0"
                >
                    {hero?.description}
                </motion.p>
          
        </div>
    </header>
    );
};

export default Banner;