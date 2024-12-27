/* eslint-disable react/prop-types */
import CommonSwiper from "../../../Components/CommonSlider";

const Sec3CardSlider = ({sec3CardSliderData}) => {
    const { heading, description, features } = sec3CardSliderData;
    const renderItem = (item) => (
        <div className="max-w-lg relative ">
            <div
                className="h-[361px] bg-cover rounded-lg bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="py-4 gap-4 h-[180px] w-lg text-left flex flex-col">
                <h3 className="text-[30px] font-bold mb-2">{item.title}</h3>
                <p className="">{item.description}</p>
            </div>
        </div>
    );

    return (
        <div className="px-6 text-white pb-5">
            <h2 className="md:text-[48px] text-[22px] font-bold text-left mb-4  text-reveal-animation">{heading}</h2>
            <p className="text-md md:text-lg text-left mb-4 md:mb-8 animation-on-scroll">
                {description}
            </p>
            <CommonSwiper
                items={features}
                renderItem={renderItem}
                slidesPerView={3.5}
                spaceBetween={30}
                loop={true}
                className="mySwiper"
            />
        </div>
    );
};

export default Sec3CardSlider;
