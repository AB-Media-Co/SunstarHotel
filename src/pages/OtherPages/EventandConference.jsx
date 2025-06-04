/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import CommonSwiper from '../../Components/CommonSlider';
import { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LaunchIcon from '@mui/icons-material/Launch';
import { Plus, Minus } from "lucide-react";
import { Helmet } from 'react-helmet';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone'
import { useGetFAQsByPage } from '../../ApiHooks/useFaqsHooks'
import CommonUseEnquiryForm from '../../Components/CommonUseEnquiryForm';
import { useEnquiryForm } from '../../ApiHooks/useEnquiryFormHook';


const EventCard = ({ image, title, description, link }) => {
    return (
        <Link to={link} className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="relative h-64 cursor-pointer">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 "
                        loading="lazy"
                    />
                    <div className="absolute cursor-pointer bottom-[-14px] rounded-full w-[250px] text-center left-10 right-10 bg-teal-500 text-white py-2 px-4 transition-colors duration-300 hover:bg-teal-600">
                        <h3 className="text-sm font-semibold">{title}</h3>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-gray-600 transition-colors duration-300 hover:text-gray-800">{description}</p>
                </div>
            </div>
        </Link>
    );
};

const TestimonialCard = ({ image, guestImage, guestName, guestTitle, testimonialText, isVideo, videoUrl }) => {
    const [playVideo, setPlayVideo] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden relative p-4 text-center h-full">
            <div className="relative">
                {isVideo && playVideo ? (
                    <iframe
                        className="w-full h-60 rounded-md"
                        src={`${videoUrl}?controls=0&autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                        title="Testimonial Video"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>

                ) : (
                    <>
                        <img
                            src={image}
                            alt="testimonial"
                            className="w-full h-60 object-cover rounded-md"
                        />
                        {isVideo && (
                            <button
                                onClick={() => setPlayVideo(true)}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-14 h-14 bg-white bg-opacity-70 rounded-full flex items-center justify-center shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-gray-800" viewBox="0 0 16 16">
                                        <path d="M10.804 8.697l-4.796 2.697A.5.5 0 015 11V5a.5.5 0 01.748-.434l4.796 2.697a.5.5 0 010 .868z" />
                                    </svg>
                                </div>
                            </button>
                        )}
                    </>
                )}
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-700">{testimonialText}</p>
                <div className="flex items-center justify-center mt-4 gap-3">
                    {guestImage && (
                        <img
                            src={guestImage}
                            alt={guestName}
                            className="w-10 h-10 rounded-full border"
                        />
                    )}
                    <div className="text-left">
                        <p className="text-sm font-bold">{guestName}</p>
                        <p className="text-xs text-gray-500">{guestTitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};





const EventandConference = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openIndex, setOpenIndex] = useState(null);
    const [copiedEmail, setCopiedEmail] = useState(null);

    const { mutate, isLoading } = useEnquiryForm();

    const { data: faqs } = useGetFAQsByPage('Events & Conference'); // Fetch FAQs for the selected page


    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Split into 2 columns
    const leftFAQs = faqs?.filter((_, i) => i % 2 === 0);
    const rightFAQs = faqs?.filter((_, i) => i % 2 !== 0);


    const renderFAQItem = (faq, index) => {
        const isOpen = openIndex === index;

        return (
            <div
                key={index}
                onClick={() => toggle(index)}
                className="border-b flex flex-col gap-6 border-gray-300 pb-4 cursor-pointer"
            >
                <div className="flex items-start justify-between">
                    <p className="font-medium text-lg text-gray-800">{faq.question}</p>
                    <div className="mt-1 text-yellow-500">
                        {isOpen ? <Minus size={25} /> : <Plus size={25} />}
                    </div>
                </div>

                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 mt-2" : "max-h-0"
                        }`}
                >
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
            </div>
        );
    };


    const eventCards = [
        {
            image: '/images/OtherPageImages/PersonalCeleb.webp',
            title: 'Personal Celebrations',
            link: "/socialevents",
            description: 'Birthdays, baby showers, anniversaries, or private dinners, celebrate life\'s moments with intimate, personalized flair.'
        },
        {
            image: '/images/OtherPageImages/CoorporateE.webp',
            title: 'Corporate Events',
            link: "/coorporatevents",
            description: 'Conferences, seminars, business dinners, or gala nights — host every corporate event with elegance and impact.'
        },
        {
            image: '/images/OtherPageImages/SocialOcc.webp',
            title: 'Weddings & Special Occasions',
            link: "/weddingpreWedding",
            description: 'From elegant engagements to vibrant pre-wedding functions and dreamy receptions make every moment unforgettable.'
        }
    ];

    const whyChooseUsFeatures = [
        {
            title: 'Stunning Venues',
            icon: '/images/othericons/stunningvenue.svg',
            description: 'Every great relationship thrives on trust, which is why we obsess on being transparent.'
        },
        {
            title: 'Culinary Excellence',
            icon: '/images/othericons/excellence.svg',
            description: 'Every great relationship thrives on trust, which is why we obsess on being transparent.'
        },
        {
            title: 'Personalized Event Planning & Services',
            icon: '/images/othericons/event.svg',
            description: 'Every great relationship thrives on trust, which is why we obsess on being transparent.'
        },
        {
            title: 'Business & Corporate Event',
            icon: '/images/othericons/businesscard.svg',
            description: 'Every great relationship thrives on trust, which is why we obsess on being transparent.'
        },
        {
            title: 'Exclusive Event Benefits',
            icon: '/images/othericons/exclusiveevent.svg',
            description: 'Every great relationship thrives on trust, which is why we obsess on being transparent.'
        }
    ];

    const venueData = [
        {
            id: 1,
            name: 'Venue1',
            location: 'Rajendra Place, Delhi',
            pricePerPlate: 600,
            capacity: '30 to 200',
            rating: 4.6,
            image: '/images/OtherPageImages/CoorporateEvents.webp'
        },
        {
            id: 2,
            name: 'Venue2',
            location: 'Karol Bagh, Delhi',
            pricePerPlate: 650,
            capacity: '50 to 700',
            rating: 4.9,
            image: '/images/OtherPageImages/Conference.jpg'
        },
        {
            id: 3,
            name: 'Venue3',
            location: 'Patel Nagar, Delhi',
            pricePerPlate: 550,
            capacity: '40 to 300',
            rating: 4.4,
            image: '/images/OtherPageImages/GalaDinner.jpg'
        },
        {
            id: 4,
            name: 'Venue4',
            location: 'Pusa Road, Delhi',
            pricePerPlate: 580,
            capacity: '30 to 250',
            rating: 4.5,
            image: '/images/OtherPageImages/AwardCeremony.webp'
        }
    ];


    const handleCopyEmail = (email) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2000); // Reset after 2 seconds
    };


    const testimonialData = [
        {
            image: "/images/OtherPageImages/SocialOcc.webp",
            guestImage: "/images/othericons/prof.jpg",
            guestName: "Rohan Sharma",
            guestTitle: "Text commonly used",
            testimonialText: "They made our day truly magical!",
            isVideo: false,
            // videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            image: "/images/OtherPageImages/SocialOcc.webp",
            guestImage: "/images/othericons/prof.jpg",
            guestName: "Meera Joshi",
            guestTitle: "Text commonly used",
            testimonialText: "Absolutely wonderful service and ambiance.",
            isVideo: false
        },
        {
            image: "/images/OtherPageImages/SocialOcc.webp",
            guestImage: "/images/othericons/prof.jpg",
            guestName: "Ankit Verma",
            guestTitle: "Text commonly used",
            testimonialText: "Everything was just perfect!",
            isVideo: false
        }
    ];

    const renderVenueCard = (venue) => (
        <div className="rounded-lg shadow-md overflow-hidden h-full">
            <div className="relative">
                <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-72 object-cover"
                />
            </div>
            <div className="p-4 bg-white">
                <div className='flex justify-between '>
                    <h3 className="text-xl font-semibold text-primary-dark-green">{venue.name}</h3>
                    <div className="bg-primary-yellow text-white px-2 py-1 rounded-md flex items-center">
                        <span className="text-sm font-bold mr-1">{venue.rating}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                        <img src="/images/othericons/loc.svg" alt="" />
                        <span className="text-sm">{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <img src="/images/othericons/plate.svg" alt="" />
                        <span className="text-sm">Price per plate ₹ {venue.pricePerPlate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <img src="/images/othericons/people.svg" alt="" />
                        <span className="text-sm">{venue.capacity}</span>
                    </div>
                </div>
            </div>
        </div>
    );





    const hotels = [
        {
            name: "Hotel Sunstar Grand",
            imageUrl: "/images/HotelsImages/1.webp", // Replace with actual image URL
            location: "7A/17, Channa Market Block 7A, WEA Karol Bagh, Delhi - 110 005",
            mapUrl: "https://www.google.com/maps/dir//Hotel+Sunstar+Grand,+7A%2F17,+Channa+Market,+Block+7A,+WEA,+Karol+Bagh,+Delhi,+110005/@28.6457332,77.1810957,17z",
            contacts: "+91 9310831647 ",
            email: "booking@sunstarhospitality.com",
        },
        {
            name: "Hotel Suncourt Yatri",
            imageUrl: "/images/HotelsImages/2.webp", // Replace with actual image URL
            location: "123/45, Suncourt Complex, Delhi - 110 005",
            mapUrl: "https://www.google.com/maps/dir//Hotel+Suncourt+Yatri,+123%2F45,+Suncourt+Complex,+Delhi,+110005",
            contacts: "+91 9310831647 ",
            email: "booking@suncourtyatri.com",
        },
        {
            name: "Hotel Sunstar Grand", // Repeated as requested
            imageUrl: "/images/HotelsImages/3.webp", // Replace with actual image URL
            location: "7A/17, Channa Market Block 7A, WEA Karol Bagh, Delhi - 110 005",
            mapUrl: "https://www.google.com/maps/dir//Hotel+Sunstar+Grand,+7A%2F17,+Channa+Market,+Block+7A,+WEA,+Karol+Bagh,+Delhi,+110005/@28.6457332,77.1810957,17z",
            contacts: "+91 9310831647 ",
            email: "booking@sunstarhospitality.com",
        }
    ];



    const eventFormFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Your Name",
            colSpan: "col-span-2",
        },
        {
            name: "email",
            type: "email",
            placeholder: "Email Address",
            colSpan: "md:col-span-1",
        },
        {
            name: "phone",
            type: "tel",
            placeholder: "Phone Number",
            colSpan: "md:col-span-1",
        },
        {
            name: "eventType",
            type: "dropdown",
            placeholder: "Select Event Type",
            colSpan: "md:col-span-1",
            options: [
                { value: "corporate", label: "Corporate Event" },
                { value: "wedding", label: "Wedding & Pre-Wedding" },
                { value: "social", label: "Social Event" },
                { value: "birthday", label: "Birthday Celebration" },
                { value: "conference", label: "Conference" },
                { value: "other", label: "Other" },
            ],
        },
        {
            name: "guests",
            type: "number",
            placeholder: "Number of Guests",
            colSpan: "md:col-span-1",
        },

        {
            name: "specialRequirements",
            type: "textarea",
            placeholder: "Special Requirements or Additional Information",
            rows: 4,
            colSpan: "col-span-2",
        },
    ];


    const handleSubmit = (formData, callbacks) => {
        console.log(formData);

        mutate({
            page: "Event and conf",
            companyName: formData?.name,
            email: formData?.email,
            address: formData?.specialRequirements,
            phone: formData?.phone,
            enquiry: formData?.eventType,
            gid: [1339082905],
            submittedAt: new Date().toISOString(),
        }, callbacks);
    };

    return (
        <div className="min-h-screen">

            <Helmet>
                <title>Events and Conferences - Host Exceptional Events with Hotel Sunstar Group</title>
                <meta name="description" content="Plan your perfect event at Hotel Sunstar Group. From corporate conferences to weddings and celebrations, we offer versatile venues, expert planning, and award-winning cuisine." />
                <meta name="keywords" content="hotel events, corporate events, wedding venues, conference facilities, event planning, Hotel Sunstar Group, Delhi events" />

            </Helmet>

            <header className="relative">
                <img
                    src='images/OtherPageImages/coorporateandevent.webp'
                    alt='Events and Conferences'
                    className="w-full h-[100vh] object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 content flex flex-col items-start pt-20 md:pt-0 justify-center text-start px-4 md:px-8 lg:px-12">
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary-white leading-tight'>
                        Host Exceptional Events with Hotel Sunstar Group
                        <br />
                        <span className='text-[#FDD304] text-xl md:text-2xl lg:text-3xl block mt-3'>
                            Seamless Planning | Exquisite Cuisine | Unforgettable Moments
                        </span>
                    </h1>
                    <p className='py-4 md:py-6 text-base md:text-lg  max-w-[650px] text-white leading-relaxed'>
                        Whether you're planning a corporate conference, wedding, milestone celebration, or an intimate gathering, Hotel Sunstar Group ensures a flawless experience from start to finish. With versatile venues, expert event planning, and an award-winning culinary team, we craft extraordinary moments that leave a lasting impression.
                    </p>
                    <div className="text-center mx-auto mt-12">
                        <a href="#contact" className="bg-yellow-400 text-white px-6 py-3 rounded-md shadow hover:bg-yellow-500 transition">
                            Book Your Event Now
                        </a>
                    </div>
                </div>
            </header>

            <div className="py-8 md:py-16  content">
                <h1 className="text-mobile/h3 md:text-desktop/h3 font-bold text-start mb-12">
                    Our Events
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventCards.map((card) => (
                        <EventCard key={card.title} {...card} />
                    ))}
                </div>
            </div>

            {/* Why Choose Us Features */}
            <section className="pb-12 md:px-4">
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold content text-start">Making Your Celebrations Seamless</h2>
                <div className="mt-8 grid grid-cols-1 content sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {whyChooseUsFeatures.map((feature, index) => (
                        <div key={index} className="bg-primary-white p-6 text-center rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
                            <div className="mb-4">
                                <img src={feature.icon} alt={feature.title} className='w-[80px] h-[80px] m-auto' />
                            </div>
                            <p className="text-lg font-semibold text-primary-dark-green">{feature.title}</p>
                            <p className="text-lg pt-5 text-gray-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Venue Section */}
            <section className="py-12 bg-primary-green md:px-4">
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold content text-white text-start mb-8">Venues You May Like</h2>
                <div className="content">

                    <CommonSwiper
                        items={venueData}
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

            {/* Testimonial Section */}
            <section className="py-16 md:px-4 content bg-white">
                <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold mb-8 text-start">Testimonials</h2>
                <CommonSwiper
                    items={testimonialData}
                    renderItem={(item) => (
                        <TestimonialCard {...item} />
                    )}
                    spaceBetween={20}
                    slidesPerViewDesktop={3}
                    slidesPerViewTablet={2}
                    loop={true}
                    autoplayDelay={5000}
                    showPagination={true}
                    arrow="mt-8"
                     className="relative z-10 testiM mySwiper"
                />

            </section>




            <section id="contact" className="py-16">
                <CommonUseEnquiryForm
                    title="Plan Your Event or Conference"
                    subtitle="Share your event details and we’ll take care of the rest"
                    fields={eventFormFields}
                    onSubmit={handleSubmit}
                    buttonLabel="Submit Enquiry"
                    containerClassName=""
                />
            </section>


            <section className="py-16 bg-gray-50">
                <div className="content mx-auto md:px-4">
                    <h3 className="text-mobile/h3 md:text-desktop/h3 font-bold text-gray-900 mb-8 text-start md:text-left">
                        Venue Locations
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hotels.map((hotel, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                role="article"
                                aria-labelledby={`hotel-name-${index}`}
                            >
                                <div className="relative">
                                    <img
                                        src={hotel.imageUrl}
                                        alt={`${hotel.name} venue`}
                                        className="w-full h-56 object-cover"
                                        loading="lazy"
                                        onError={(e) => (e.target.src = '/fallback-image.jpg')} // Fallback image
                                    />
                                    {hotel.isFeatured && (
                                        <span className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h4
                                        id={`hotel-name-${index}`}
                                        className="font-semibold text-gray-900 text-xl mb-2"
                                    >
                                        {hotel.name}
                                    </h4>
                                    <p className="text-gray-600 flex items-center gap-2 mb-3">
                                        <LocationOnIcon aria-hidden="true" className="text-teal-600" />
                                        <span>{hotel.location}</span>
                                    </p>
                                    <a
                                        href={hotel.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center gap-1 mb-4 transition-colors duration-200"
                                        aria-label={`View ${hotel.name} on map`}
                                    >
                                        View on Map
                                        <LaunchIcon aria-hidden="true" fontSize="small" />
                                    </a>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-600 text-sm flex items-center gap-2">
                                            <PhoneIcon aria-hidden="true" className="text-teal-600" />
                                            {hotel.contacts}
                                        </span>
                                        <button
                                            onClick={() => handleCopyEmail(hotel.email)}
                                            className="text-gray-600 text-sm flex items-center gap-2 hover:text-teal-600 transition-colors duration-200"
                                            aria-label={`Copy email address for ${hotel.name}`}
                                            title={copiedEmail === hotel.email ? 'Copied!' : 'Copy email'}
                                        >
                                            <EmailIcon aria-hidden="true" className="text-teal-600" />
                                            <span>{hotel.email}</span>
                                            {copiedEmail === hotel.email && (
                                                <span className="text-xs text-green-600">Copied!</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            <section className="py-6  md:px-12 bg-gray-50">
                <div className="content mx-auto">
                    <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-500 mb-10">You need to come at least once in your life</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            {leftFAQs?.map((faq, i) => renderFAQItem(faq, i * 2))}
                        </div>
                        <div className="space-y-6">
                            {rightFAQs?.map((faq, i) => renderFAQItem(faq, i * 2 + 1))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default EventandConference;


