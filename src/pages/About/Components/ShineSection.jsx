import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useUpdatePagesHook from "../../../ApiHooks/useUpdatePagesHook";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ShineSection = () => {
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


    const { shineSection } = useUpdatePagesHook();

    const baseTop = 0;
    const spacing = 400; 

    const calculateTopPosition = (index) => {
        return baseTop + index * spacing;
    };

    const calculateTopPositionMobile = (index) => {
        return baseTop + index * (spacing + 100);
    };

    const calculateTopPositionTablet = (index) => {
        return baseTop + index * (spacing + 280);
    };
    const location = useLocation(); // Get current URL
    useEffect(() => {
        if (location.hash === "#what-make-us-shine") {
            document.getElementById("what-make-us-shine")?.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    return (
        <div id="what-make-us-shine" className="bg-primary-green py-12 relative text-primary-white" >
            <div className="content" data-aos="fade-up">
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold mb-4 text-reveal-animation">
                    {shineSection?.heading}
                </h2>
                <p className="text-mobile/body/2 md:text-desktop/body/1 whitespace-pre-line mb-12 animation-on-scroll">
                    {shineSection?.description}
                </p>
                <div className="flex flex-col gap-12 md:gap-10 ">
                    {shineSection?.features?.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col-reverse  items-center lg:items-start gap-6 lg:gap-16 md:justify-between  lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse md:gap-10" : ""
                                }`}
                        >
                            <div className="w-full  h-auto md:mt-12 lg:mt-0 lg:w-[48%] flex flex-col gap-5 justify-center animation-on-scroll">
                                <h3 className="lg:w-full text-mobile/h3 md:text-desktop/h3 text-primary-white">{item.title}</h3>
                                <p className=" text-md text-mobile/body/2 whitespace-pre-line md:text-desktop/body/1 text-primary-white ">
                                    {item.description}
                                </p>
                            </div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full  h-[282px] lg:w-[48%] rounded-2xl lg:h-[350px] object-cover animation-on-scroll"
                            />
                        </div>
                    ))}
                </div>

                {/* Timeline nodes */}
                {/* <div className="flex justify-center top-[33rem] lg:top-[23rem] left-[2rem] md:left-[10rem] lg:left-[46rem] absolute py-10 text-primary-white">
                    <div className="timeline-bg w-1 h-[96rem] md:h-[115rem] lg:h-[71rem] bg-primary-white relative">
                        <div className="timeline-fill bg-[#FDC114] w-full h-0 absolute top-0 left-0"></div>
                        {shineSection?.features?.map((_, index) => (
                            <div
                                key={index}
                                className={`circle-container absolute lg:-ml-[21px]`}
                                style={{
                                    top: `${calculateTopPosition(index)}px`, // Dynamic top position
                                    "@media (max-width: 767px)": {
                                        top: `${calculateTopPositionMobile(index)}px`,
                                    },
                                    "@media (min-width: 768px) and (max-width: 1023px)": {
                                        top: `${calculateTopPositionTablet(index)}px`,
                                    },
                                }}
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
                </div> */}
            </div>
        </div>
    );
};

export default ShineSection;
