/* eslint-disable react/prop-types */
const RoatinfImg = ({ position = 'lg:w-auto w-[10em]', src = "/images/HomepageImages/RoundPatternSection2.svg", divClass = 'absolute ' }) => {
  return (
    <div className={`${divClass} ${position} `}>
      <img
        src={src}
        alt="Background Pattern"
        className={`    w-full h-full object-contain
      origin-center
      animate-[spin_18s_linear_infinite]
      [will-change:transform]  `}

      />
    </div>

  );
};

export default RoatinfImg;


