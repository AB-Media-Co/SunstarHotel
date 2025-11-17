const JoinTeamSection = ({ data }) => {
    return (
        <div className="   flex items-center bg-primary-green justify-center">
            <div className="content w-full py-8   overflow-hidden">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    {/* Left Content Section */}
                    <div className=" flex flex-col justify-center">
                        <h1 className="text-mobile/h3  md:text-desktop/h3 font-bold text-white leading-tight mb-8">
                            {data?.heading}
                            
                        </h1>

 
                        <p className="text-white leading-relaxed text-mobile/body/2  md:text-desktop/body/1">
                            {data?.description}
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
