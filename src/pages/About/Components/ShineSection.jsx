import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

const ShineSection = () => {
    useTextRevealAnimation();
    useScrollAnimations();

    const data = [
        {
            title: "Experience",
            description:
                "When we started bloom, we set out with the goal of creating a consistent & reliable offering that gives you what you care about the most - a great room, in the best location, at a surprisingly affordable rate. Over the years we’re super proud to have expanded across India with our growing community of loyal bloomers supporting us with every new hotel opening.",
            image: "/images/ContctUsImg/cardImg1.png",
        },
        {
            title: "System Driven",
            description:
                "When we started bloom, we set out with the goal of creating a consistent & reliable offering that gives you what you care about the most - a great room, in the best location, at a surprisingly affordable rate. Over the years we’re super proud to have expanded across India with our growing community of loyal bloomers supporting us with every new hotel opening.",
            image: "/images/ContctUsImg/cardImg1.png",
        },
        {
            title: "Vital Sleep Tech",
            description:
                "When we started bloom, we set out with the goal of creating a consistent & reliable offering that gives you what you care about the most - a great room, in the best location, at a surprisingly affordable rate. Over the years we’re super proud to have expanded across India with our growing community of loyal bloomers supporting us with every new hotel opening.",
            image: "/images/ContctUsImg/cardImg1.png",
        },
        {
            title: "Clean & On Point",
            description:
                "When we started bloom, we set out with the goal of creating a consistent & reliable offering that gives you what you care about the most - a great room, in the best location, at a surprisingly affordable rate. Over the years we’re super proud to have expanded across India with our growing community of loyal bloomers supporting us with every new hotel opening.",
            image: "/images/ContctUsImg/cardImg1.png",
        },
    ];

    return (
        <div className="bg-[#6EC4C2] py-12 relative  text-white">
            <div className="content">
                <h2 className="text-mobile/h3 md:text-desktop/h2 font-bold mb-2 text-reveal-animation">
                    What Makes Us Shine?
                </h2>
                <p className="text-mobile/body/2 md:text-desktop/body/large mb-12 animation-on-scroll">
                    The journey of a hassle-free experience starts from the time you book
                    Sunstar to check out.
                </p>
                <div className="flex flex-col gap-12 md:gap-10 ">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col-reverse gap-16 md:justify-between  md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse md:gap-10" : ""
                                }`}
                        >
                            <div className="pe-6 w-full lg:w-[560px] flex flex-col gap-5 justify-center animation-on-scroll">
                                <h3 className=" lg:w-[580px] md:text-desktop/h3  text-white">{item.title}</h3>
                                <p className=" text-justify md:text-desktop/body/1 text-white lowercase">
                                    {item.description}
                                </p>
                            </div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full md:w-[560px] rounded-2xl md:h-[350px]  object-cover animation-on-scroll"
                            />

                        </div>
                    ))}
                </div>

                        {/* Timeline nodes */}

                {/* <div className="flex justify-center top-[23rem] left-[46rem]  absolute py-10  text-white">
                    <div className=" w-1 h-[71rem] bg-white">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div
                                key={index}
                                className="absolute w-[42px] h-[42px] border-[7px] border-white bg-[#6EC4C2]   rounded-full -ml-[21px]"
                                style={{ top: `${index * 380}px` }}
                            ></div>
                        ))}
                    </div>
                </div> */}


            </div>
        </div>
    );
};

export default ShineSection;
