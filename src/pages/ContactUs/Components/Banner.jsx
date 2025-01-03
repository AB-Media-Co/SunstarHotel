import Icon from "../../../Components/Icons";

const Banner = () => {
    return (
        <div className="bg-contain bg-[#6EC4C3] bg-no-repeat bg-bottom h-[370px] md:h-[400px] relative"
            style={{
                backgroundImage: "url('/images/ContctUsImg/ContactUsBanner.jpg')", // Correct path if using public folder
            }} >
            {/* Dark overlay to ensure text visibility */}
            <div className="content h-full flex pt-6  items-end ">
                <div className="flex flex-col gap-5 pb-4 md:pb-16">
                    <h1 className="text-white text-desktop/h2 md:text-desktop/h2 font-bold">
                        Need to get in touch?
                    </h1>
                    <div className="flex gap-10 flex-wrap">
                        <div className="flex items-center gap-4">
                            <Icon name="rotatePhone" className="md:w-10 w-6 h-6 md:h-10" />
                            <span className="text-white text-desktop/body/2/medium md:text-desktop/body/1 font-medium">
                                +915845965840
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Icon name="email" className="md:w-10 w-6 h-6 md:h-10" />
                            <span className="text-white text-mobile/body/2 md:text-desktop/body/1 font-medium">
                                help@sunstar.com
                            </span>
                        </div>
                    </div>
                    <p className="text-white text-mobile/body/2 md:text-desktop/body/1 pt-10">
                        For assistance with bookings, cancellation, etc. mail us on book@sunstar.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
