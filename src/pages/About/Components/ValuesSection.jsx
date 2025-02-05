/* eslint-disable react/prop-types */

import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

const ValuesSection = ({ title, values }) => {
  useTextRevealAnimation();
  useScrollAnimations();

  return (
    <div className="w-full bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-mobile/h3 md:text-desktop/h2 font-bold text-gray-900 mb-8 text-reveal-animation text-start">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col justify-center h-[260px] p-6 rounded-lg shadow-xl bg-custom-bg bg-cover bg-bottom hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <h3 className="text-mobile/h4 md:text-desktop/h4 font-bold text-[#058FA2] mb-4">
                {value.title}
              </h3>
              <p className="text-mobile/body/2 md:text-desktop/body/1 text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
