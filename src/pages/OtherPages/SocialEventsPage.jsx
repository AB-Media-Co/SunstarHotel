
import { testimonialData } from '../../Data/AboutSectionData';
import OtherPageLayout from './OtherPageLayout';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';
import { Helmet } from 'react-helmet';
import CommonUseEnquiryForm from '../../Components/CommonUseEnquiryForm';
import { useEnquiryForm } from '../../ApiHooks/useEnquiryFormHook';

const SocialEventsPage = () => {
    const { Testimonials } = useUpdatePagesHook();
    const { mutate } = useEnquiryForm();

    const eventTypes = [
        { title: 'Birthday Celebrations', image: '/images/OtherPageImages/Bdy.webp' },
        { title: 'Private Dinners', image: '/images/OtherPageImages/Aniv.webp' },
        { title: 'Get Together', image: '/images/OtherPageImages/celeb.webp' },
        { title: 'Baby Shower', image: '/images/OtherPageImages/bbyshower.webp' },
    ];

    const eventTypesexp = [
        { title: 'Candle Light Dinner', image: '/images/OtherPageImages/Cld.webp' },
        { title: 'Bachelor Party', image: '/images/OtherPageImages/bechlorsp.webp' },
        { title: 'Marriage Proposal', image: '/images/OtherPageImages/prpposal.webp' },
        { title: 'Group Party', image: '/images/OtherPageImages/groupP.webp' },
    ];

    const whyChooseUsFeatures = [
        { title: 'On Time', icon: '/images/othericons/Ontime.svg' },
        { title: 'System Driven', icon: '/images/othericons/systemdriven.svg' },
        { title: 'Decoration', icon: '/images/othericons/stunningvenue.svg' },
        { title: 'Buffet', icon: '/images/othericons/buffet.svg' },
        { title: 'DJ & Music', icon: '/images/othericons/Dj.svg' },
        // { title: 'Stationery', icon: '/images/othericons/stationary.svg' },
        { title: 'Stay', icon: '/images/othericons/stay.svg' },
        { title: 'Parking', icon: '/images/othericons/valetParking.svg' },
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



    const introText = (
        <>
            Our hotel offers a range of beautiful and unique event spaces, each of which can be customised to suit your needs and preferences. Our event planning team will work with you to create a personalised event that reflects your style and vision, from selecting the perfect venue to choosing the décor, setting and the menu.
            <p className='my-4'>
                In addition to our beautiful and specially curated event spaces and exceptional catering, we offer a range of additional services to enhance your personalised event experience. These include floral arrangements, professional photography, and customised party favours, to name just a few.            </p>
            {/* <br /> */}
            Unforgettable Social Experiences Tailored to Perfection <br />
            At Sunstar Hotels our team specialises in creating unforgettable social events that leave a lasting impression.
        </>
    );


    const heroTitle = (
        <>
            <h1 className='text-mobile/h3 md:text-desktop/h3  font-bold text-primary-white max-w-[650px]'>
                Welcome to the personalised events at <span className='text-[#FDD304]'>Sunstar Hotels !</span>
            </h1>
            <p className='py-4 text-mobile/body/2 md:text-desktop/body/1 max-w-[600px] text-white'>
                Whether you are planning a birthday party, anniversary celebration, candle light dinner, baby shower, marriage proposal, or any other special occasion, we are excited to help make your personal event a truly unforgettable experience.

            </p>

        </>
    )



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
            name: "company",
            placeholder: "Company Name",
          },
        {
            name: "date",
            placeholder: "Date of event",
            type: "date",
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
        }


    ];




    const handleSubmit = (formData, callbacks) => {

        mutate({
            page: "Social Event",
            name: formData?.name,
            companyName: formData?.company,
            email: formData?.email,
            address: formData?.specialRequirements,
            phone: formData?.phone,
            enquiry: formData?.eventType,
            date: formData?.date,
            gid: [280180929],
            submittedAt: new Date().toISOString(),
        }, callbacks);
    };

    return (
        <>
            <Helmet>
                <title>Social Events - Celebrate Special Moments at Hotel Sunstar Group</title>
                <meta name="description" content="Create unforgettable social events at Hotel Sunstar Group. Perfect for birthdays, anniversaries, kitty parties, baby showers, and intimate celebrations with personalized planning and elegant venues." />
                <meta name="keywords" content="social events, birthday parties, anniversaries, kitty parties, baby showers, Hotel Sunstar Group, Delhi event venues, celebration venues" />
            </Helmet>
            <OtherPageLayout
                // Page type for SEO
                pageType="Social Events"
                // Hero section
                heroImage="/images/OtherPageImages/socialeventhead.webp"
                anotherText={heroTitle}
                // heroHighlightedText="the ideal destination for corporate events"
                // Intro section
                introText={introText}
                // chooseUsHead="Making Your Celebrations Seamless"
                // Section titles
                // sectionMainTitle="Personalised Celebration"
                // sectionSubtitle="At Sunstar Hotels, we are committed to delivering exceptional service and support, ensuring the success of your corporate event."
                // Event types grid
                // eventTypes={eventTypes}
                sectionMainTitleexp='Personalised Celebration'
                sectionSubtitleexp='Our hotel offers a variety of beautiful and unique event spaces that can be tailored to your needs and preferences.'
                eventTypesexp={eventTypes}
                // Venues slider
                venueData={venueData}
                // Features grid
                featureItems={whyChooseUsFeatures}
                // Testimonials and form
                testimonials={Testimonials}
                testimonialBackgroundImage={testimonialData.backgroundImage}
                formImage="/images/OtherPageImages/formImg2.webp"
            />

            <CommonUseEnquiryForm
                title="Host a Social Event"
                subtitle="Whether it’s a celebration or gathering, we’ll help you plan it right."
                fields={eventFormFields}
                onSubmit={handleSubmit}
                buttonLabel="Submit Enquiry"
                containerClassName=""
            />
        </>
    );
};

export default SocialEventsPage;