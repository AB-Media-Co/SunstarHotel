/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import useTextRevealAnimation from "../hooks/useTextRevealAnimation";
import useScrollAnimations from "../hooks/useScrollAnimations";

const BannerSection = ({
    data,
    text = "text-mobile/h1 md:text-desktop/h1",
    ptext = "text-mobile/body/1 md:text-desktop/body/large",
    lineh = "md:leading-[75px]",
    bg = "bg-[#6EC4C2]",  // Keeping the original background color
    paddTop = "md:pt-20 items-center",
    textC = "white",
    imgClass = "h-auto object-cover",
}) => {
    const { title, description, image } = data; // Destructure the passed data object

    useTextRevealAnimation();
    useScrollAnimations();

    return (
        <div className={`w-full ${bg} py-8 md:py-20 px-4 md:px-8 lg:px-16`}>
            <div className={`content flex section flex-col lg:flex-row justify-between ${paddTop}`}>
                {/* Text Section */}
                <motion.div
                    className="lg:w-1/2 md:text-center lg:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1
                        className={`${text} ${lineh} text-reveal-animation font-bold text-${textC} mb-2 md:mb-6 leading-snug tracking-tight`}
                    >
                        {title}
                    </h1>
                    <p
                        className={`text-${textC} ${ptext} animation-on-scroll leading-relaxed tracking-wide`}
                    >
                        {description}
                    </p>
                </motion.div>

                {/* Image Section */}
                <div
                    className="lg:w-1/2 flex animation-on-scroll justify-center items-center mt-8 lg:mt-0 relative"
                
                >
                    <img
                        src={image}
                        alt="Corporate Booking Banner"
                        className={`max-w-full ${imgClass} rounded-x`}
                    />
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
