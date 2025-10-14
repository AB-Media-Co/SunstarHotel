// import { BarChart3, Navigation, Battery, Flame, Globe, Unlock, TrendingUp, UserCheck } from 'lucide-react';


const WhyWorkWithUs = () => {
  const motivationalPoints = [
    { icon: '/images/career/breaklimits.svg', text: "Break limits", number: "01" },
    { icon: '/images/career/pushboundaries.svg', text: "Push boundaries", number: "02" },
    { icon: '/images/career/comfortexit.svg', text: "Comfort Exit", number: "03" },
    { icon: '/images/career/challengeyourself.svg', text: "Challenge yourself", number: "04" },
    { icon: '/images/career/explore.svg', text: "Explore", number: "05" },
    { icon: '/images/career/unlock.svg', text: "Unlock Potential", number: "06" },
    { icon: '/images/career/boldmove.svg', text: "Take a Bold Move", number: "07" },
    { icon: '/images/career/nextyou.svg', text: "Next You", number: "08" }
  ];

    return (
        <section className="content pb-10">
            <div className="text-start space-y-2 mb-20">
                <h2 className="text-mobile/h3  md:text-desktop/h3 tracking-tight">
                    Why Work With Us?
                </h2>
                <p className="text-mobile/body/2  md:text-desktop/body/1  text-gray-600 max-w-3xl  leading-relaxed">
                    At Hotel Sunstar Group, we believe that our team is the heart of our hospitality.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {motivationalPoints.map((point, index) => {
                    // const IconComponent = point.icon;
                    const isLarge = false;
              

                    return (
                        <div
                            key={index}
                            className="relative group  transform transition-all duration-300 hover:scale-105"
                        >
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full p-6">

                                {/* Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-br rounded-xl  flex items-center justify-center mb-4 transition-transform duration-300`}>
                                    {/* <IconComponent className="w-8 h-8 text-white" /> */}
                                    <img src={point.icon} alt="" />
                                </div>

                                {/* Content */}
                                <div className={isLarge ? 'space-y-4' : 'space-y-3'}>
                                    <h3 className={`font-bold text-gray-900 group-hover:text-primary-green transition-colors duration-300 ${isLarge ? 'text-2xl' : 'text-md'
                                        }`}>
                                        {point.text}
                                    </h3>


                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>   
        </section>
    );
};

export default WhyWorkWithUs;