/* eslint-disable react/prop-types */

import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

const ValuesSection = ({ title, values }) => {
  useTextRevealAnimation();
  useScrollAnimations();
  return (
    <div className="w-full bg-white  py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-3xl font-bold text-gray-900 mb-8 text-reveal-animation">
          {title}
        </h2>
        <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col animation-on-scroll justify-center  h-[160px] p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold text-[#058FA2] mb-2">
                {value.title}
              </h3>
              <p className="text-gray-700">
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
