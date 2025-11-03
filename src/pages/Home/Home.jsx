/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet';
import { HomePageSection5cards, section1Data, section2HotelData } from '../../Data/HomePageData';
import Section1 from './Components/Section1';
import { useGetMetas } from '../../ApiHooks/useMetaHook';
import { lazy, Suspense, memo } from 'react';

// Lazy load below-the-fold components with better chunk names
const Section2Hotel = lazy(() => import(/* webpackChunkName: "section2" */ './Components/Section2Hotel'));
const Section3 = lazy(() => import(/* webpackChunkName: "section3" */ './Components/Section3'));
const Section4 = lazy(() => import(/* webpackChunkName: "section4" */ './Components/Section4'));
const Section5 = lazy(() => import(/* webpackChunkName: "section5" */ './Components/Section5'));
const TestimonialSection = lazy(() => import(/* webpackChunkName: "testimonials" */ '../../Components/TestimonialSection'));

// Skeleton Component for better UX
const SectionSkeleton = memo(({ height = "200px" }) => (
  <div className={`w-full bg-gray-50 animate-pulse`} style={{ minHeight: height }}>
    <div className="content mx-auto py-8 space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
));
SectionSkeleton.displayName = 'SectionSkeleton';

const Home = () => {
  const { data: metas } = useGetMetas();

  const homeMeta = Array.isArray(metas)
    ? metas.find(meta => meta.page === "home")
    : null;

  return (
    <>
      <Helmet>
        <title>{homeMeta?.metaTitle || 'Sunstar Hotels - Affordable Luxury Accommodations in India'}</title>
        <meta name="description" content={homeMeta?.metaDescription || 'Experience affordable luxury at Sunstar Hotels. Book your perfect stay across India with exceptional hospitality and comfort.'} />
        <meta name="keywords" content={homeMeta?.metaKeywords?.join(', ') || 'sunstar hotels, affordable hotels india, budget hotels, hotel booking'} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={homeMeta?.metaTitle || 'Sunstar Hotels'} />
        <meta property="og:description" content={homeMeta?.metaDescription || ''} />
        
        {/* ✅ Preload critical resources */}
        <link rel="preload" as="image" href="/images/HomepageImages/Section1Main.avif" fetchpriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </Helmet>

      {/* Hero Section - Always visible, no lazy loading */}
      <Section1 section1Data={section1Data} />
      
      {/* Below-the-fold sections with optimized loading */}
      <Suspense fallback={<SectionSkeleton height="300px" />}>
        <Section2Hotel section2HotelData={section2HotelData} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="400px" />}>
        <Section3 />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <Section4 />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="350px" />}>
        <Section5 cards={HomePageSection5cards} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="400px" />}>
        <TestimonialSection page='home' />
      </Suspense>
    </>
  );
};

export default memo(Home);
