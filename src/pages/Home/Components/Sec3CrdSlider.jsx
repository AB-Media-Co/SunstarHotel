/* eslint-disable react/prop-types */
import CommonSwiper from "../../../Components/commonSlider";

const Sec3CardSlider = ({sec3CardSliderData}) => {
    const { heading, description, features } = sec3CardSliderData;

    const renderItem = (item) => (
        <div className="max-w-lg relative section">
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
        <div className="px-6 text-white section">
            <h2 className="text-3xl font-bold text-left mb-8">{heading}</h2>
            <p className="text-lg text-left mb-12">
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
