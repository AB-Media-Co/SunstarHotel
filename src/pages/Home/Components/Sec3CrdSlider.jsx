/* eslint-disable react/prop-types */
import CommonSwiper from "../../../Components/commonSlider";

const Sec3CardSlider = ({sec3CardSliderData}) => {
    const { heading, description, features } = sec3CardSliderData;
    const renderItem = (item) => (
        <div className="max-w-lg relative ">
            <div
                className="h-60 bg-cover rounded-lg bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="py-4 gap-4 h-[180px] w-lg text-left flex flex-col">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p>{item.description}</p>
            </div>
        </div>
    );

    return (
        <div className="px-6 text-white ">
            <h2 className="md:text-3xl text-[22px] font-bold text-left mb-4 md:mb-8 text-reveal-animation">{heading}</h2>
            <p className="text-md md:text-lg text-left mb-4 md:mb-12 animation-on-scroll">
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
