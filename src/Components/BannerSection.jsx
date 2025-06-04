import Aos from "aos";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const BannerSection = ({
    data,
    text = "text-xl md:text-4xl lg:text-5xl",
    ptext = "text-base md:text-lg lg:text-xl",
    lineh = "leading-tight md:leading-[60px] lg:leading-[75px]",
    bg = "bg-gradient-to-r from-primary-green to-teal-500",
    paddTop = "pt-10 md:pt-20 items-center",
    textC = "white",
    imgClass = "h-auto object-cover",
    ctaText,
    ctaLink,
}) => {

    

    useEffect(() => {
        Aos.init({
          duration: 1000,
          once: true,
        });
      }, []);
    return (
        <div className={`w-full ${bg} py-8 md:py-12 lg:py-20  md:px-8 lg:px-16 `}>
            <div className={`content flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto gap-8 lg:gap-12 ${paddTop}`}>
                {/* Text Section */}
                <div className="lg:w-1/2 " data-aos="fade-up" data-aos-delay="100" >
                    <h1
                        className={`${text} ${lineh} animate-fade-in font-bold text-${textC} mb-2 md:mb-6 tracking-tight `}
                    >
                        {data?.title ?? "About Us"}
                    </h1>
                    <p
                        className={`text-${textC} ${ptext} animate-fade-in whitespace-pre-line  leading-relaxed tracking-wide  `}
                        // style={{ animationDelay: "200ms" }}
                    >
                        {data?.description ?? "We are a company dedicated to excellence."}
                    </p>
                    {ctaText && ctaLink && (
                        <a
                            href={ctaLink}
                            className={`mt-4 inline-block px-6 py-3 bg-${textC === "white" ? "black" : "white"} text-${textC === "white" ? "white" : "black"} rounded-lg hover:bg-opacity-90 transition-colors`}
                        >
                            {ctaText}
                        </a>
                    )}
                </div>

                {/* Image Section */}
                <div className="lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0  " data-aos="fade-up" data-aos-delay="100"   >
                    <img
                        src={data?.image? data?.image:data?.img}
                        alt={data?.title ?? "Corporate Booking Banner"}
                       
                        className={`w-full max-h-[400px] ${imgClass} rounded-xl transition-transform duration-300  `}
                    />
                </div>
            </div>
        </div>
    );
};

export default BannerSection;