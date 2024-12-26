/* eslint-disable react/prop-types */

import Icon from "../../../Components/Icons";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

const BusinessPlatform = ({ features }) => {
  useTextRevealAnimation();
  useScrollAnimations();
  return (
    <div className="w-full py-10 px-4 content">
      <h2 className="text-2xl lg:text-3xl font-bold text-black text-center md:text-left mb-8  text-reveal-animation">
        The most complete business platform
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {features.map((feature, index) => {
          return <div
            key={index}
            className="border border-teal-400 rounded-lg p-6 flex flex-col items-center md:items-start md:text-left text-center shadow-sm hover:shadow-lg transition-shadow animation-on-scroll"
          >
            <div className=" mb-4 w-[60px] h-[60px]">
              <Icon name={feature.icon} className="w-[60px] h-[60px]" />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        })}
      </div>
    </div>
  );
};

export default BusinessPlatform;
