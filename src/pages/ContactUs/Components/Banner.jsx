import Icon from "../../../Components/Icons";

const Banner = () => {
    return (
        <div className="bg-contain bg-[#6EC4C3] bg-no-repeat bg-bottom h-[500px] md:h-[450px] relative"
            style={{
                backgroundImage: "url('/images/ContctUsImg/ContactUsBanner.jpg')", // Correct path if using public folder
            }} >
            {/* Dark overlay to ensure text visibility */}
            <div className="content h-full flex pt-6  items-end ">
                <div className="flex flex-col gap-5 pb-4 md:pb-16" >
                    <h1 className="text-white text-[44px] font-bold">Need to get in touch ?</h1>
                    <div className="flex gap-10 flex-wrap">
                        <div className="flex items-center gap-4">
                            <Icon name='rotatePhone' className="w-10 h-10" /> <span className="text-white text-[22px] font-medium">+915845965840</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Icon name='email' className="w-10 h-10" /> <span className="text-white text-[22px] font-medium">help@sunstar.com</span>
                        </div>
                    </div>
                    <p className="text-white pt-10">For assistance with bookings, cancellation, etc. mail us on book@sunstar.com </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
