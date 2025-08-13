/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import TestimonialSection from '../../Components/TestimonialSection';
import OtherPagesEnquiryform from '../../Components/OtherPagesEnquiryform';
import CommonSwiper from '../../Components/CommonSlider';
import { useGetMetas } from '../../ApiHooks/useMetaHook';
import { useVenues } from '../../ApiHooks/useVenues';

const OtherPageLayout = ({
    // SEO and page metadata
    pageType = '',

    // Hero section
    heroImage = '',
    heroTitle = '',
    heroHighlightedText = '',
    chooseUsHead = 'Why Choose Us',

    // Intro section
    introText = '',
    anotherText = '',

    // Section titles
    sectionMainTitle = '',
    sectionSubtitle = '',

    // Event types grid
    eventTypes = [],


    sectionMainTitleexp = '',
    sectionSubtitleexp = '',
    eventTypesexp = [],


    // Features grid
    featureItems = [],

    // Testimonials and form
    // testimonials = [],
    testimonialBackgroundImage = '',
    formImage = '',
    page = '',

    // Additional props
    children
}) => {
    const { data: metas } = useGetMetas();
    const { data: venueData, } = useVenues();
    console.log(venueData)

    const pageMeta = Array.isArray(metas)
        ? metas.find(meta => meta.page === pageType.toLowerCase().replace(/\s+/g, ''))
        : null;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Render function for the venue card
    const renderVenueCard = (venue) => (
        <div className="rounded-lg shadow-md overflow-hidden h-full">
            <div className="relative">
                <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-72 object-cover"
                />
            </div>
            <div className="p-4">
                <div className='flex justify-between'>
                    <h3 className="text-xl font-semibold text-primary-dark-green">{venue.name}</h3>
                    <div className="bg-primary-yellow text-white px-2 py-1 rounded-md flex items-center">
                        <span className="text-sm font-bold mr-1">{venue.rating}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <div className="w-6 h-6 flex items-center justify-center">  {/* Icon container */}
                            <img
                                src="/images/othericons/loc.svg"
                                alt="Location"
                                className="w-5 h-5 "  // object-contain prevents cutting
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <span className="text-sm">{venue.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <img
                                src="/images/othericons/plate.svg"
                                alt="Price per plate"
                                className="w-5 h-5 object-contain"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <span className="text-sm">Price per plate ₹ {venue.pricePerPlate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <img
                                src="/images/othericons/people.svg"
                                alt="Capacity"
                                className="w-5 h-5 object-contain"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <span className="text-sm">{venue.capacityMin} to {venue.capacityMax}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-primary-white text-primary-dark-green">
            <Helmet>
                <title>{pageMeta?.metaTitle || `${pageType} - Sunstar Hotels`}</title>
                <meta name="description" content={pageMeta?.metaDescription || ''} />
                <meta name="keywords" content={pageMeta?.metaKeywords?.join(', ') || ''} />
            </Helmet>

            {/* Hero Section */}
            <header className="relative">
                <img
                    src={heroImage}
                    alt={pageType}
                    className="w-full h-[100vh] object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 capitalize content flex flex-col items-start justify-center text-start px-4">
                    <h1 className="text-mobile/h3 md:text-desktop/h3 font-bold text-primary-white">
                        {heroTitle} <br />
                        <span className='text-[#F9BF02]'>{heroHighlightedText}</span>
                    </h1>

                    {anotherText}
                </div>
            </header>

            {/* Introduction Section */}
            <section className="py-12 lg:px-4 text-mobile/body/2 md:text-desktop/body/1  text-black  content">
                {introText}
            </section>

            {/* Main Section Title */}
            <section className=" content">
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-black text-start">{sectionMainTitle}</h2>
                <p className="mt-4 text-start text-mobile/body/2 md:text-desktop/body/1 text-black mx-auto">
                    {sectionSubtitle}
                </p>
            </section>

            {/* Event Types Grid */}
            {eventTypes.length > 0 && (
                <section className="py-6 md:py-12 content md:px-4">
                    <div className="grid  grid-cols-1 md:grid-cols-2 gap-6">
                        {eventTypes.map((event, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary-white shadow-lg rounded-lg overflow-hidden flex flex-col group"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-xl text-center font-semibold mb-2 text-primary-dark-green">{event.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Main Section Title */}
            <section className="md:px-4 content">
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-black text-start">{sectionMainTitleexp}</h2>
                <p className="mt-4 text-start text-mobile/body/2 md:text-desktop/body/1 text-black mx-auto">
                    {sectionSubtitleexp}
                </p>
            </section>

            {/* Event Types Grid */}
            {eventTypesexp.length > 0 && (
                <section className="py-6 md:py-12 md:px-4">
                    <div className="grid content grid-cols-1 md:grid-cols-2 gap-6">
                        {eventTypesexp.map((event, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary-white shadow-lg rounded-lg overflow-hidden flex flex-col group"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-xl text-center font-semibold mb-2 text-primary-dark-green">{event.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Venues Slider */}
            {venueData?.total >=1 && (
                <section className="py-6 md:py-12 md:px-4">
                    <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold content text-start mb-8">Venues You May Like</h2>
                    <div className="content">
                        <CommonSwiper
                            items={venueData?.data}
                            renderItem={renderVenueCard}
                            spaceBetween={20}
                            slidesPerViewDesktop={3}
                            slidesPerViewTablet={2}
                            loop={true}
                            arrow="mt-8"
                            autoplayDelay={4000}
                            showPagination={true}
                            className="relative z-10 testiM mySwiper"
                        />
                    </div>
                </section>
            )}

            {/* Features Grid */}
            {featureItems.length > 0 && (
                <section className="py-12 md:px-4">
                    <h2 className="text-3xl font-bold content text-start">{chooseUsHead}</h2>
                    <div className="mt-8 grid grid-cols-2 content sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {featureItems.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-primary-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="mb-4">
                                    <img src={feature.icon} alt="" className='w-[80px] h-[80px] mx-auto' />
                                </div>
                                <p className="text-lg text-center font-semibold text-primary-dark-green">{feature.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Optional additional content */}
            {children}

            {/* Testimonials Section */}
            <TestimonialSection
                page={page}
                backgroundImage={testimonialBackgroundImage}
            />

            {/* Enquiry Form */}
            {/* <OtherPagesEnquiryform img={formImage} page={pageType} gid={''} /> */}
        </div>
    );
};

export default OtherPageLayout;