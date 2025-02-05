import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollAnimations from "../../../hooks/useScrollAnimations";
import useTextRevealAnimation from "../../../hooks/useTextRevealAnimation";

gsap.registerPlugin(ScrollTrigger);

const ShineSection = () => {
    useTextRevealAnimation();
    useScrollAnimations();

    useEffect(() => {
        // Select all the progress paths
        const progressPaths = document.querySelectorAll(".progress-path");
        const timelineFill = document.querySelector(".timeline-fill");

        // GSAP timeline for sequential circle animation
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".timeline-bg", // Trigger timeline when the timeline background is in view
                start: "top bottom", // Start when the top of the timeline reaches the bottom of the screen
                end: "bottom top", // End when the timeline reaches the top of the screen
                scrub: true, // Smooth scrolling effect
                markers: false,
            },
        });

        // GSAP timelines for circle and line animations
        progressPaths.forEach((path, index) => {
            const circleTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: path, // Each circle triggers its own animation
                    start: "top bottom", // Start when the circle enters the viewport
                    end: "bottom top", // End when the circle exits the viewport
                    scrub: true, // Make the animation responsive to scrolling
                    markers: false,
                },
            });

            circleTimeline.to(path, {
                strokeDashoffset: 0, // Animate the stroke dash offset to fill the circle
                ease: "none",
                duration: 0.5, // Duration for each circle fill animation
            });

            // After the circle animation completes, animate the line fill
            timeline.add(
                gsap.to(timelineFill, {
                    height: `${(index + 1) * 25}%`, // Increase height progressively after each circle
                    duration: 1, // Duration for the timeline fill animation
                    ease: "none",
                }),
                `+=0.5` // Start after the circle animation completes (with a delay)
            );

            // Add the circle animation to the main timeline
            timeline.add(circleTimeline, index * 0.5); // Delay next circle animation by 0.5 seconds
        });

        // Enhanced Text and Image Animation
        gsap.utils.toArray(".animation-on-scroll").forEach((element) => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out", // Smooth easing for more natural effect
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%", // Trigger the animation when 80% of the element is in view
                        toggleActions: "play none none none", // Play animation once
                    },
                }
            );
        });

        gsap.utils.toArray(".animation-on-scroll img").forEach((image) => {
            gsap.fromTo(
                image,
                {
                    opacity: 0,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out", // Smooth easing for image
                    scrollTrigger: {
                        trigger: image,
                        start: "top 80%", // Trigger when image comes into view
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    }, []);

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
        <div className="bg-[#6EC4C2] py-12 relative text-white">
            <div className="content">
                <h2 className="text-mobile/h3 md:text-desktop/h2 font-bold mb-4 text-reveal-animation">
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
                            className={`flex flex-col-reverse flex-wrap items-center lg:items-start gap-6 lg:gap-16 md:justify-between  lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse md:gap-10" : ""
                                }`}
                        >
                            <div className="pe-6 w-[250px] md:w-[320px] h-[182px] md:h-[282px] lg:w-[560px] flex flex-col gap-5 justify-center animation-on-scroll">
                                <h3 className="lg:w-[580px] text-mobile/h3 md:text-desktop/h3 text-white">{item.title}</h3>
                                <p className="text-justify text-mobile/body/2 md:text-desktop/body/1 text-white lowercase">
                                    {item.description}
                                </p>
                            </div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-[250px] md:w-[320px] h-[282px] lg:w-[560px] rounded-2xl lg:h-[350px] object-cover animation-on-scroll"
                            />
                        </div>
                    ))}
                </div>

                {/* Timeline nodes */}
                <div className="flex justify-center top-[33rem] lg:top-[23rem] left-[2rem] md:left-[10rem] lg:left-[46rem] absolute py-10 text-white">
                    <div className="timeline-bg w-1 h-[96rem] md:h-[115rem] lg:h-[71rem] bg-white relative">
                        <div className="timeline-fill bg-[#FDC114] w-full h-0 absolute top-0 left-0"></div>
                        {[1, 2, 3, 4].map((_, index) => (
                            <div
                                key={index}
                                className={`circle-container absolute lg:-ml-[21px] 
                                    ${index === 0 ? "top-[0px] md:top-[0px] lg:top-[0px]" :
                                    index === 1 ? "top-[400px] md:top-[680px] lg:top-[380px]" :
                                    index === 2 ? "top-[900px] md:top-[1160px] lg:top-[760px]" :
                                    "top-[1500px] md:top-[1840px] lg:top-[1140px]"}`}
                            >
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 42 42"
                                    className="progress-circle"
                                >
                                    <circle
                                        cx="21"
                                        cy="21"
                                        r="18"
                                        stroke="#FFFFFF"
                                        strokeWidth="6"
                                        fill="#6EC4C2"
                                        strokeDasharray="113"
                                        strokeDashoffset="0"
                                        className="background-path"
                                    ></circle>
                                    <circle
                                        cx="21"
                                        cy="21"
                                        r="18"
                                        stroke="#FDC114"
                                        strokeWidth="6"
                                        fill="#6EC4C2"
                                        strokeDasharray="113"
                                        strokeDashoffset="113"
                                        className="progress-path"
                                    ></circle>
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShineSection;
