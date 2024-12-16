/* eslint-disable react/prop-types */
const BannerSection = ({ data ,text='[75px]',ptext='[24px]', lineh='[75px]',bg='bg-[#6EC4C2]',paddTop='pt-20 items-center',textC='white',imgClass='h-auto'}) => {
    const { title, description, image } = data; // Destructure the passed data object
  
    return (
      <div className={`w-full ${bg}  py-20 px-4 md:px-8 lg:px-16`}>
        <div className={`content flex section flex-col  lg:flex-row justify-between  ${paddTop} `}>
          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className={`md:text-${text} text-3xl md:leading-${lineh} font-bold text-${textC} mb-4`}>
              {title}
            </h1>
            <p className={`text-${textC} text-lg md:text-${ptext} leading-relaxed`}>{description}</p>
          </div>
  
          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0 relative">
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
  