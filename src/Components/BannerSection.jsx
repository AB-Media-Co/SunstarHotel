/* eslint-disable react/prop-types */
const BannerSection = ({
    data,
    text = "text-mobile/h1 md:text-desktop/h1",
    ptext = "text-mobile/body/1 md:text-desktop/body/large",
    lineh = "md:leading-[75px]",
    bg = "bg-primary-green",  // Keeping the original background color
    paddTop = "md:pt-20 items-center",
    textC = "white",
    imgClass = "h-auto object-cover",
}) => {
    console.log(data)
    return (
        <div className={`w-full ${bg} py-8 md:py-20 px-4 md:px-8 lg:px-16`}>
            <div className={`content flex section flex-col lg:flex-row justify-between ${paddTop}`}>
                {/* Text Section */}
                <div
                    className="lg:w-1/2 md:text-center lg:text-left"
                    data-aos="fade-up"
                >
                    <h1
                        className={`${text} ${lineh} text-reveal-animation font-bold text-${textC} mb-2 md:mb-6 leading-snug tracking-tight`}
                    >
                       {data?.title? data?.title:"About Us"}
                    </h1>
                    <p
                        className={`text-${textC} ${ptext} animation-on-scroll leading-relaxed tracking-wide`}
                    >
                        {data?.description}
                    </p>
                </div>

                {/* Image Section */}
                <div
                    className="lg:w-1/2 flex animation-on-scroll justify-center items-center mt-8 lg:mt-0 relative"
                data-aos="fade-up"
                >
                    <img
                        src={data?.image? data?.image:data?.img}
                        alt="Corporate Booking Banner"
                        className={`max-w-full ${imgClass} rounded-x`}
                    />
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
