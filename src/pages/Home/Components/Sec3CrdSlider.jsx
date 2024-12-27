/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import CommonSwiper from "../../../Components/CommonSlider";

const Sec3CardSlider = ({ sec3CardSliderData }) => {
    const { heading, description, features } = sec3CardSliderData || {};

    const renderItem = (item) => (
        <div className="max-w-full sm:max-w-lg relative">
            <div
                className="h-[300px]  md:h-[361px] bg-cover rounded-lg bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
                role="img"
                aria-label={item.title || "Feature image"}
            ></div>
            <div className="py-4 gap-2 sm:gap-4 h-[150px] md:h-[180px] w-full text-left flex flex-col">
                <h3 className="text-[18px] sm:text-[24px] md:text-[30px] font-bold mb-2">
                    {item.title}
                </h3>
                <p className="text-sm sm:text-md">{item.description}</p>
            </div>
        </div>
    );

    if (!features || features.length === 0) {
        return (
            <div className="px-4 sm:px-6 text-white pb-5">
                <h2 className="text-[22px] sm:text-[32px] md:text-[48px] font-bold text-left mb-4">
                    {heading || "No Heading Available"}
                </h2>
                <p className="text-sm sm:text-md md:text-lg text-left mb-4 md:mb-8">
                    {description || "No Description Available"}
                </p>
                <p>No features to display.</p>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 text-white pb-5">
            <h2 className="text-[22px] sm:text-[32px] md:text-[48px] font-bold text-left mb-4">
                {heading}
            </h2>
            <p className="text-sm sm:text-md md:text-lg text-left mb-4 md:mb-8">
                {description}
            </p>
            <CommonSwiper
                items={features}
                renderItem={renderItem}
                slidesPerView={{
                    default: 1, // 1.2 slides for small screens
                    768: 2.5,     // 2.5 slides for tablets
                    1024: 3.5,    // 3.5 slides for desktops
                }}
                spaceBetween={16} // Adjust spacing dynamically
                loop
                className="mySwiper"
            />
        </div>
    );
};

Sec3CardSlider.propTypes = {
    sec3CardSliderData: PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string,
        features: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                image: PropTypes.string,
            })
        ),
    }),
};

export default Sec3CardSlider;
