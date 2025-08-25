import Aos from "aos";
import { useEffect } from "react";
import { useGetAgentByEmail } from "../ApiHooks/useAgentHook";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const BannerSection = ({
    data,
    text = "text-xl md:text-4xl lg:text-5xl",
    ptext = "text-base md:text-lg lg:text-xl",
    lineh = "leading-tight md:leading-[60px] lg:leading-[75px]",
    bg = "bg-gradient-to-r from-primary-green to-teal-500",
    paddTop = "pt-10 md:pt-20 items-center",
    textC = "white",
    imgClass = "h-auto object-cover",
    ctaText,
    ctaLink,
    buttton,
    onButtonClick,

}) => {
    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    const navigate = useNavigate()
    const userInfo = (localStorage.getItem('user_email') || '').toLowerCase();
    const { data: agentRec, isLoading: loadingAgent } = useGetAgentByEmail(userInfo);

    // role checks
    const isCorporate = !!agentRec && agentRec?.role === 'corporate';
    const isCorpApproved = agentRec?.approved ?? false;
    const isVerified = agentRec?.isVerified ?? false;

    // when corporate & approved -> show "View My Profile" instead of Login/SignUp
    const showProfileBtn = !loadingAgent && isCorporate && isCorpApproved;

    const isApprovalPending = !loadingAgent && isCorporate && isVerified && !isCorpApproved;


    const onViewProfile = () => {
        navigate("/user/profile", { state: { tab: "corporate" } });
    };

    return (
        <div className={`w-full ${bg} py-8 md:py-12 lg:pt-20`}>
            <div className={`content flex flex-col lg:flex-row justify-between items-center mx-auto gap-8 lg:gap-12 ${paddTop}`}>
                {/* Text Section */}
                <div className="lg:w-1/2" data-aos="fade-up" data-aos-delay="100">
                    <h1
                        className={`${text} ${lineh} animate-fade-in font-bold text-${textC} mb-2 md:mb-6 tracking-tight`}
                    >
                        {data?.title ?? "About Us"}
                    </h1>
                    <p
                        className={`text-${textC} ${ptext} animate-fade-in whitespace-pre-line leading-relaxed tracking-wide mb-6`}
                    >
                        {data?.description ?? "We are a company dedicated to excellence."}
                    </p>

                    {/* Button Container */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        {ctaText && ctaLink && (
                            <a
                                href={ctaLink}
                                className={`inline-block px-6 py-3 bg-${textC === "white" ? "black" : "white"} text-${textC === "white" ? "white" : "black"} rounded-lg hover:bg-opacity-90 transition-colors font-medium`}
                            >
                                {ctaText}
                            </a>
                        )}

                        {/* Primary CTA (conditional) */}
                        {buttton && (
                            showProfileBtn && !loadingAgent ? (
                                <button
                                    onClick={onViewProfile}
                                    className={`px-6 py-3 border-2 border-${textC} text-${textC} rounded-lg hover:bg-${textC} hover:text-${textC === "white" ? "black" : "white"} transition-all duration-300 font-medium bg-transparent`}
                                >
                                    View My Profile
                                </button>
                            ) : isApprovalPending ? (
                                <button
                                    disabled
                                    className={`px-6 py-3 border-2 border-${textC} text-${textC} rounded-lg opacity-60 cursor-not-allowed font-medium bg-transparent`}
                                    title="Your account is verified but pending approval"
                                >
                                    Approval Pending
                                </button>
                            ) : (
                                <button
                                    onClick={onButtonClick}
                                    className={`px-6 py-3 border-2 border-${textC} text-${textC} rounded-lg hover:bg-${textC} hover:text-${textC === "white" ? "black" : "white"} transition-all duration-300 font-medium bg-transparent`}
                                >
                                    Login Or Sign Up
                                </button>
                            )
                        )}



                    </div>
                </div>

                {/* Image Section */}
                <div className="lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0" data-aos="fade-up" data-aos-delay="100">
                    <img
                        src={data?.image ? data?.image : data?.img}
                        alt={data?.title ?? "Corporate Booking Banner"}
                        className={`w-full max-h-[400px] ${imgClass} rounded-xl transition-transform duration-300`}
                    />
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
