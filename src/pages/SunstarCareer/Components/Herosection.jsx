const HeroSection = () => {
  return (
    <div className="relative h-[100vh] w-full z-10">

      {/* Background Image */}
      <img
        src="/images/career/hero.png"
        alt="Beach adventure"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex  flex-col content justify-center items-start h-full  text-white">
        <h1 className="text-mobile/h1 max-w-xl md:text-desktop/h2 font-bold mb-4">
          Come Shine with Us

        </h1>
        <p className="text-mobile/body/2 md:text-desktop/body/1 mb-6 max-w-xl text-white ">
          We believe in hiring locally in tourist destinations and looking beyond conventional industry backgrounds. At Sunstar, we want to build a team of entrepreneurial-minded individuals who can adapt and innovate. This mindset is critical for scaling our brand successfully. If you believe you have what it takes, apply with us.” - Always looking for great people
        </p>
        <a href='#form' className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full">

          Apply Here
        </a>
      </div>


      {/* Decorative element */}
      <div
        className="z-10 absolute hidden md:block  md:right-[5rem] bottom-0 md:bottom-[2rem] 
                         w-[300px] h-[300px] animate-spin-slow 
                         bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url("/images/HomepageImages/round.png")`
        }}
        aria-hidden="true"
      />

    </div>
  );
};

export default HeroSection;
