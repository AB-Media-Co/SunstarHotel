const JoinTeamSection = () => {
    return (
        <div className="   flex items-center justify-center">
            <div className="content w-full py-8 bg-white  overflow-hidden">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    {/* Left Content Section */}
                    <div className=" flex flex-col justify-center">
                        <h1 className="text-mobile/h3  md:text-desktop/h3 font-bold text-gray-900 leading-tight mb-8">
                            Join the team that makes the world feel closer.
                        </h1>

 
                        <p className="text-gray-700 leading-relaxed text-mobile/body/2  md:text-desktop/body/1">
                            We believe in hiring locally in tourist destinations and looking beyond conventional industry backgrounds. At Sunstar, we want to build a team of entrepreneurial-minded individuals who can adapt and innovate. This mindset is critical for scaling our brand successfully. If you believe you have what it takes, apply with us
                        </p>

                    </div>

                    {/* Right Image Section */}
                    <div className="lg:w-[50%] mx-auto">
                       <img src="/images/career/jointemimg.png" alt=""  className="h-[300px]"/>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    );
}

export default JoinTeamSection
