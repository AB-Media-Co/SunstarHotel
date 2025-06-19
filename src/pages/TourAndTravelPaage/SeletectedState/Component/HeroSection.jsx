
const HeroSection = ({ img }) => {
    return (
        <div className="relative h-[80vh] w-full z-10">

            {/* Background Image */}
            <img
                src={img}
                alt="Beach adventure"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

            {/* Content */}
            <div className="relative text-4xl md:text-5xl font-bold mb-4 z-20 flex md:pb-28 flex-col content justify-center md:justify-end items-start h-full  text-white">
             
                Explore the World Your Way
            </div>


            {/* Decorative element */}
            <div
                className="z-10 absolute hidden md:block  md:right-[6rem] bottom-0 md:bottom-[-5rem] 
                         w-[250px] h-[300px] animate-spin-slow 
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
