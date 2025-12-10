import { testimonialData } from '../../Data/AboutSectionData';
import OtherPageLayout from './OtherPageLayout';
import { Helmet } from 'react-helmet';
import { useEnquiryForm } from '../../ApiHooks/useEnquiryFormHook';
import CommonUseEnquiryForm from '../../Components/CommonUseEnquiryForm';
import { useGetEventPageBySlug } from '../../ApiHooks/useEventPageHook';
import Loader from '../../Components/Loader';

const CorporateEventsPage = () => {
  const { mutate } = useEnquiryForm();

  // Fetch dynamic content from API
  const { data: pageContent, isLoading: contentLoading } = useGetEventPageBySlug('corporateevent');

  // Extract data from API or use defaults
  const heroData = pageContent?.data?.heroSection || {};
  const descriptionText = pageContent?.data?.descriptionText || '';
  const celebrationTypesData = pageContent?.data?.celebrationTypes || {};

  const eventTypes = celebrationTypesData?.types?.length > 0
    ? celebrationTypesData.types.map(type => ({
        title: type.title || '',
        image: type.image || '/images/OtherPageImages/Training.jpg'
      }))
    : [
        { title: 'Training & Development', image: '/images/OtherPageImages/Training.jpg' },
        { title: 'Conference', image: '/images/OtherPageImages/Conference.jpg' },
        { title: 'Gala Dinner', image: '/images/OtherPageImages/GalaDinner.jpg' },
        { title: 'Awards Ceremony', image: '/images/OtherPageImages/AwardCeremony.webp' },
      ];

  const whyChooseUsFeatures = [
    { title: 'On Time', icon: '/images/othericons/Ontime.svg' },
    { title: 'System Driven', icon: '/images/othericons/systemdriven.svg' },
    { title: 'Conference Sitting', icon: '/images/othericons/ConferenceSitting.svg' },
    { title: 'Buffet', icon: '/images/othericons/buffet.svg' },
    { title: 'Projector & Mike', icon: '/images/othericons/projectormike.svg' },
    { title: 'Stationery', icon: '/images/othericons/stationary.svg' },
    { title: 'Stay', icon: '/images/othericons/stay.svg' },
    { title: 'Valet Parking', icon: '/images/othericons/valetParking.svg' },
  ];

  const introText = descriptionText || (
    <>
      Introducing Sunstar Hotels, the ideal destination for corporate events. Our cutting-edge meeting rooms and event spaces accommodate groups of all sizes. With personalised menus featuring fresh, local ingredients, our catering team caters to diverse preferences and dietary restrictions.
      {/* <br /> */}
      <p className='my-4'>
        Enjoy comfortable accommodations with workspaces and high-speed internet for business travellers. Conveniently located near businesses and attractions, Sunstar Hotels offer the perfect balance of work and leisure. Experience exceptional service and support.
      </p>
      {/* <br /> */}
      Our commitment to exceptional service and support sets us apart. Our experienced staff will assist you throughout the planning process, ensuring the success of your corporate event. Contact us today to explore our meeting spaces, catering services, and amenities, and let Sunstar Hotels be the host for your next memorable corporate event.
    </>
  );





  const eventFormFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      colSpan: "col-span-2",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      colSpan: "md:col-span-1",
    },
    {
      name: "phone",
      type: "tel",
      placeholder: "Phone",
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
      page: "Coorporte Event",
      name: formData?.name,
      companyName: formData?.company,
      email: formData?.email,
      address: formData?.specialRequirements,
      phone: formData?.phone,
      enquiry: formData?.eventType,
      date: formData?.date,
      gid: [1303810786],
      submittedAt: new Date().toISOString(),
    }, callbacks); 
  };

  // Show loading state
  if (contentLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Corporate Events - Host Professional Events at Hotel Sunstar Group</title>
        <meta name="description" content="Plan your next corporate event at Hotel Sunstar Group. From conferences and training sessions to gala dinners and award ceremonies, we offer state-of-the-art facilities and professional event management." />
        <meta name="keywords" content="corporate events, business meetings, conferences, training sessions, gala dinners, award ceremonies, Hotel Sunstar Group, Delhi corporate venues" />
      </Helmet>
      <OtherPageLayout
        // Page type for SEO
        pageType="Corporate Events - Host Professional Events at Hotel Sunstar Group"

        // Hero section
        heroImage="/images/OtherPageImages/CoorporateEvents.webp"
        heroTitle={heroData.heading || 'Introducing Sunstar Hotels,'}
        heroHighlightedText={heroData.subheading || 'the ideal destination for corporate events'}
        bannerDescription={heroData.description || "Whether you're planning a corporate conference, wedding, milestone celebration, or an intimate gathering, Hotel Sunstar Group ensures a flawless experience from start to finish."}
        bannerButtonText="Book Your Event Now"
        formId="corporate-event-form"

        // Intro section
        introText={introText}

        // Section titles
        sectionMainTitle={celebrationTypesData.heading || 'MICE & Corporate Events'}
        sectionSubtitle={celebrationTypesData.description || 'At Sunstar Hotels, we are committed to delivering exceptional service and support, ensuring the success of your corporate event.'}

        // Event types grid
        eventTypes={eventTypes}


        // Features grid
        featureItems={whyChooseUsFeatures}

        // Testimonials and form
        page='Corporate Events'
        testimonialBackgroundImage={testimonialData.backgroundImage}
        formImage="/images/OtherPageImages/formImg1.webp"
      />


      <section id="corporate-event-form">
        <CommonUseEnquiryForm
          title="Corporate Event Booking"
          subtitle="Organize seamless corporate events with our expert assistance."
          fields={eventFormFields}
          onSubmit={handleSubmit}
          buttonLabel="Submit Enquiry"
          containerClassName=""
        />
      </section>
    </>
  );
};

export default CorporateEventsPage;