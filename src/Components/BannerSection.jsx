/* eslint-disable react/prop-types */
import useTextRevealAnimation from "../hooks/useTextRevealAnimation"
import useScrollAnimations from "../hooks/useScrollAnimations"
const BannerSection = ({ data ,text='text-[75px]',ptext='text-[24px]', lineh='md:leading-[75px]',bg='bg-[#6EC4C2]',paddTop='md:pt-20 items-center',textC='white',imgClass='h-auto'}) => {
    const { title, description, image } = data; // Destructure the passed data object
  
    useTextRevealAnimation();
    useScrollAnimations();
    return (
      <div className={`w-full ${bg}  py-20 px-4 md:px-8 lg:px-16`}>
        <div className={`content flex section flex-col  lg:flex-row justify-between  ${paddTop} `}>
          {/* Text Section */}
          <div className="lg:w-1/2 md:text-center lg:text-left">
            <h1 className={`${'md :',text} text-3xl ${'md :',lineh} text-reveal-animation font-bold text-${textC} mb-4`}>
              {title}
            </h1>
            <p className={`text-${textC} text-lg md:${ptext}  animation-on-scroll leading-relaxed`}>{description}</p>
          </div>
  
          {/* Image Section */}
          <div className="lg:w-1/2 flex  animation-on-scroll  justify-center items-center mt-8 lg:mt-0 relative">
            <img
              src={image}
              alt="Corporate Booking Banner"
              className={`max-w-full ${imgClass}`}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default BannerSection;
  