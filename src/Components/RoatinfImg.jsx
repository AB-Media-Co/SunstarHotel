const RoatinfImg = ({ position, src = "/images/HomepageImages/RoundPatternSection2.svg" }) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt="Background Pattern"
        className={`absolute rotating-image top-0 ${position} lg:w-auto w-[10em] `}
      />
    </div>
  );
};

export default RoatinfImg;
