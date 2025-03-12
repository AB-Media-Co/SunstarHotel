/* eslint-disable react/prop-types */
import CommonSwiper from "../../../Components/CommonSlider";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import { useNavigate } from "react-router-dom";

const truncateText = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

const Sec3CardSlider = () => {
  const { shineSection } = useUpdatePagesHook();
  const { heading, description, features } = shineSection || {};
  const navigate = useNavigate()

  const renderItem = (item, index) => (
    <div
      className="max-w-full sm:max-w-lg relative cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={() => {
        navigate("/why-sunstar#what-make-us-shine");
        setTimeout(() => {
          document.getElementById("what-make-us-shine")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }}
    >
      <div
        className="h-[300px] md:h-[280px] bg-cover rounded-lg bg-center "
        style={{ backgroundImage: `url(${item.image})` }}
        role="img"
        aria-label={item.title || "Feature image"}
      ></div>
      <div className="py-4  w-fullgap-2 h-[150px] md:h-[180px] w-full text-left flex flex-col">
        <h3 className="text-mobile/h4 md:text-desktop/h4 md:font-semibold mb-2 ">
          {item.title}
        </h3>
        <p className="text-mobile/body/2 md:text-desktop/body/1">
          {truncateText(item.description, 15)}
        </p>
      </div>
    </div>
  );

  if (!features || features.length === 0) {
    return (
      <div className="px-4 sm:px-6 text-primary-white pb-5">
        <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-4">
          {heading || "No Heading Available"}
        </h2>
        <p className="text-mobile/body/2 md:text-desktop/body/1 text-left mb-4 md:mb-8">
          {/* {description || "No Description Available"} */}
          {truncateText(description, 15)}
        </p>
        <p className="text-mobile/body/2 md:text-desktop/body/2">
          No features to display.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 text-primary-white pb-5">
      <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-4">
        {heading}
      </h2>
      <p className="text-mobile/body/2 md:text-desktop/body/1 text-left mb-4 md:mb-8">
        {description}
      </p>
      <CommonSwiper
        items={features}
        renderItem={renderItem}
        slidesPerView={{
          default: 1, // 1 slide for small screens
          768: 2.5,   // 2.5 slides for tablets
          1024: 4,    // 4 slides for desktops
        }}
        spaceBetween={16} // Adjust spacing dynamically
        loop={false}
        className="mySwiper"
        arrow="hidden"
      />
    </div>
  );
};

export default Sec3CardSlider;
