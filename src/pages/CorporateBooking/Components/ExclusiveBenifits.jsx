/* eslint-disable react/prop-types */
const ExclusiveBenifits = ({ data }) => {
    // best-effort mapping from your schema
    const heading = "Exclusive Corporate Benefits";

    // Array of image paths from CoorporateBookingImg folder
    const images = [
        "/images/CoorporateBookingImg/1.svg",
        "/images/CoorporateBookingImg/2.svg",
        "/images/CoorporateBookingImg/3.svg",
        "/images/CoorporateBookingImg/4.svg",
        "/images/CoorporateBookingImg/5.svg",
        "/images/CoorporateBookingImg/6.svg",
    ];

    return (
            <section className="bg-white py-12" aria-labelledby="exclusive-corporate-benefits-heading">
                <div className="content max-w-screen-xl mx-auto px-4">
                    <h1
                        id="exclusive-corporate-benefits-heading"
                        className="text-mobile/h3 md:text-desktop/h3 pb-6 font-bold text-black mb-2 text-start"
                    >
                        {heading}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {data?.map((value, index) => (
                            <article
                                key={value.title || index}
                                className="group relative shadow-xl rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/70 p-6 ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-primary-green/20"
                            >
                                {/* Accent gradient border on hover */}
                                <div
                                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(20,184,166,0.18))',
                                        mask:
                                            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                                        WebkitMask:
                                            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                                        WebkitMaskComposite: 'xor',
                                        maskComposite: 'exclude',
                                        padding: 1,
                                    }}
                                />

                                <div className="flex items-start gap-4">
                                    <img
                                        src={images[index] || value.icon}
                                        alt={value.title}
                                        className="h-16 w-16 object-contain"
                                    />
                                </div>

                                <h2 className="mt-5 text-xl font-bold text-gray-900">
                                    {value.title}
                                </h2>

                                <p className="mt-2 text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

    );
};

export default ExclusiveBenifits;
