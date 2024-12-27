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
        <div className="bg-[#6EC4C2] py-12  text-white">
            <div className="content">
                <h2 className="text-3xl md:text-[40px] font-bold mb-6 text-reveal-animation">
                    What Makes Us Shine?
                </h2>
                <p className=" mb-12 animation-on-scroll">
                    The journey of a hassle-free experience starts from the time you book
                    Sunstar to check out.
                </p>
                <div className="flex flex-col gap-12 md:gap-0 ">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col-reverse gap-6  md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse md:gap-10" : ""
                                }`}
                        >
                            <div className="pe-6 w-full lg:w-1/2 flex flex-col gap-5 justify-center animation-on-scroll">
                                <h3 className="font-semibold lg:w-[580px] text-[30px] md:text-[35px] md:leading-[51px] text-white">{item.title}</h3>
                                <p className="font-normal lg:w-[580px] md:text-[24px] md:leading-[40px] text-justify text-white lowercase">
                                    {item.description}
                                </p>
                            </div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full md:w-1/2 md:h-[500px]  object-cover animation-on-scroll"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ShineSection;
