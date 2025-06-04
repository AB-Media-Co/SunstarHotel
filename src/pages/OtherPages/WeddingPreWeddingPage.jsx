import { testimonialData } from '../../Data/AboutSectionData';
import OtherPageLayout from './OtherPageLayout';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';
import { Helmet } from 'react-helmet';
import CommonUseEnquiryForm from '../../Components/CommonUseEnquiryForm';
import { useEnquiryForm } from '../../ApiHooks/useEnquiryFormHook';
const WeddingPreWeddingPage = () => {
  const { Testimonials } = useUpdatePagesHook();
  const { mutate, isLoading } = useEnquiryForm();

  const eventTypes = [
    { title: 'Wedding & Reception', image: '/images/OtherPageImages/Varmala.webp' },
    { title: 'Cocktail', image: '/images/OtherPageImages/party.webp' },
    { title: 'Roka & Sagan', image: '/images/OtherPageImages/shadi.webp' },
    { title: 'Haldi & Mehndi', image: '/images/OtherPageImages/haldi.webp' },
  ];

  const whyChooseUsFeatures = [
    { title: 'On Time', icon: '/images/othericons/Ontime.svg' },
    { title: 'System Driven', icon: '/images/othericons/systemdriven.svg' },
    { title: 'Decoration', icon: '/images/othericons/stunningvenue.svg' },
    { title: 'Buffet', icon: '/images/othericons/buffet.svg' },
    { title: 'DJ & Music', icon: '/images/othericons/Dj.svg' },
    { title: 'Coctail', icon: '/images/othericons/coctail.svg' },
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
      {/* <br /> */}
      <p className='my-4'>
        In addition to our beautiful and specially curated event spaces and exceptional catering, we offer a range of additional services to enhance your personalised event experience. These include floral arrangements, professional photography, and customised party favours, to name just a few.
      </p>
      {/* <br /> */}
      Unforgettable Social Experiences Tailored to Perfection <br />
      At Sunstar Hotels our team specialises in creating unforgettable social events that leave a lasting impression.     </>
  );


  const heroTitle = (
    <>
      <h1 className='text-mobile/h2 md:text-desktop/h3  font-bold text-primary-white max-w-full md:max-w-[680px]'>
        Celebrate love  at <span className='text-[#FDD304]'>Sunstar Hotels</span>   weddings & pre-weddings made magical.
      </h1>
      <p className='py-4 text-mobile/body/2 md:text-desktop/body/2/regular md:max-w-[600px] text-white'>
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


  const handleSubmit = (formData,callbacks) => {

    mutate({
        page:"Wedding And Conference",
        name: formData?.name,
        companyName: formData?.company,
        email: formData?.email,
        address: formData?.specialRequirements,
        phone: formData?.phone,
        enquiry: formData?.eventType,
        date: formData?.date,
        gid:[1220661421],
        submittedAt: new Date().toISOString(),
    }, callbacks);
};

  return (
    <>
      <Helmet>
        <title>Wedding & Pre-Wedding Events - Create Magical Moments at Hotel Sunstar Group</title>
        <meta name="description" content="Make your wedding celebrations extraordinary at Hotel Sunstar Group. From intimate ceremonies to grand receptions, we offer customized venues and services for all your wedding and pre-wedding events." />
        <meta name="keywords" content="wedding venues, pre-wedding events, wedding reception, cocktail party, roka ceremony, mehendi ceremony, Hotel Sunstar Group, Delhi wedding venues" />
      </Helmet>
      <OtherPageLayout
        // Page type for SEO
        pageType="Wedding & Pre-Wedding Events - Create Magical Moments at Hotel Sunstar Group"
        // Hero section
        heroImage="/images/OtherPageImages/weddinghead.webp"
        anotherText={heroTitle}
        // heroHighlightedText="the ideal destination for corporate events"
        // Intro section
        introText={introText}
        // Section titles
        sectionMainTitle="Your Special Days"
        // Event types grid
        eventTypes={eventTypes}
        // Venues slider
        venueData={venueData}
        // Features grid
        featureItems={whyChooseUsFeatures}
        // Testimonials and form
        testimonials={Testimonials}
        testimonialBackgroundImage={testimonialData.backgroundImage}
        formImage="/images/OtherPageImages/formImg3.webp"
      />


      <CommonUseEnquiryForm
        title="Wedding & Pre-Wedding Enquiry"
        subtitle="Let us make your special day truly unforgettable"
        fields={eventFormFields}
        onSubmit={handleSubmit}
        buttonLabel="Submit Enquiry"
        containerClassName=""
      />
    </>
  );
};

export default WeddingPreWeddingPage;