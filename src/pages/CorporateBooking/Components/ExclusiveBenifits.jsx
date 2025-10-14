/* eslint-disable react/prop-types */
const ExclusiveBenifits = ({ data }) => {
    // best-effort mapping from your schema
    const heading =
        "Exclusive Corporate Benefits";


    return (
        <section className="content">
            {/* Heading */}
            <div className=" mx-auto  pt-10">
                <h1 className="text-mobile/h2 md:text-desktop/h3 font-bold md:font-bold text-black text-center md:text-left mb-8 text-reveal-animation">
                    {heading}
                </h1>
            </div>

    
            {/* Grid of benefits */}
            <div className=" mx-auto  pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                    {data?.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                            <h3 className="text-mobile/h5 md:text-desktop/h5/medium text-gray-900 leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-mobile/body/2 md:text-desktop/body/1 leading-6">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExclusiveBenifits;
