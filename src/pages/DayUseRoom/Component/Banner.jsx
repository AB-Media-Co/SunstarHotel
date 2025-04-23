import { motion } from "framer-motion";
// import SearchIcon from "@mui/icons-material/Search";

const Banner = () => {
    return (

      

        <header className="relative">
        <img
             src='/images/DayUseRoom/banner.webp'
            alt='Events and Conferences'
            className="w-full h-[100vh] object-cover"
            loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 content flex flex-col items-start pt-20 md:pt-0 justify-center text-start px-4 md:px-8 lg:px-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-primary-white text-mobile/h3 md:text-desktop/h3 font-bold drop-shadow-xl mb-3 sm:mb-4 max-w-full md:max-w-[850px] mx-auto md:mx-0 leading-tight"
                >
                    <span className="inline md:hidden">Experience Comfort with Our</span>
                    <span className="hidden md:inline">Experience Comfort & Convenience with Our <br /> </span>
                    <span className="text-[#FDD304]"> Day Use Rooms</span>
                    <span className="hidden md:inline"> at Hotel Sunstar Group</span>
                    <span className="inline md:hidden"> at Sunstar</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-primary-white text-mobile/body/2 md:text-desktop/body/1 md:text-lg  font-normal drop-shadow-xl mt-2 sm:mt-4 max-w-full md:max-w-[700px] mx-auto md:mx-0"
                >
                    <span className="hidden sm:inline">Need a refreshing break in the middle of the day? Hotel Sunstar Group's Day Use Rooms offer the perfect escape—whether you're a traveler on a layover, a professional seeking a productive workspace, or simply looking for a few hours of relaxation.</span>
                    <span className="inline sm:hidden">Perfect for layovers, workspace needs, or a few hours of relaxation. Enjoy our day rooms for a refreshing break.</span>
                </motion.p>
          
        </div>
    </header>
    );
};

export default Banner;