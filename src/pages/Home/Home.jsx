// ✅ Updated Home.jsx with lazy-loaded sections and preloaded hero images
import { Helmet } from 'react-helmet';
import { HomePageSection5cards, section1Data, section2HotelData } from '../../Data/HomePageData';
import Section1 from './Components/Section1';
import useUpdatePagesHook from '../../ApiHooks/useUpdatePagesHook';
import { useGetMetas } from '../../ApiHooks/useMetaHook';
import { lazy, Suspense } from 'react';

const Section2Hotel = lazy(() => import('./Components/Section2Hotel'));
const Section3 = lazy(() => import('./Components/Section3'));
const Section4 = lazy(() => import('./Components/Section4'));
const Section5 = lazy(() => import('./Components/Section5'));
const TestimonialSection = lazy(() => import('../../Components/TestimonialSection'));

const Home = () => {
  const { Testimonials } = useUpdatePagesHook();
  const { data: metas } = useGetMetas();
  const homeMeta = metas?.find(meta => meta.page === 'home');



  return (
    <div>
      <Helmet>
        <title>{homeMeta?.metaTitle || 'Sunstar Hotels'}</title>
        <meta name="description" content={homeMeta?.metaDescription || ''} />
        <meta name="keywords" content={homeMeta?.metaKeywords?.join(', ') || ''} />

        {/* ✅ Preload critical hero images */}
        <link rel="preload" as="image" href="/images/HomepageImages/Section1Main.webp" />
        <link rel="preload" as="image" href="/images/HomepageImages/mobileHeroSec.webp" />
      </Helmet>

      <Section1 section1Data={section1Data} />

     

      {/* ✅ Lazy load sections below the fold */}
      <Suspense fallback={<div className="min-h-[200px] bg-gray-100 animate-pulse" />}>
        <Section2Hotel section2HotelData={section2HotelData} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px] bg-gray-100 animate-pulse" />}>
        <Section3 />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px] bg-gray-100 animate-pulse" />}>
        <Section4 />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px] bg-gray-100 animate-pulse" />}>
        <Section5 cards={HomePageSection5cards} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px] bg-gray-100 animate-pulse" />}>
        <TestimonialSection Testimonials={Testimonials} />
      </Suspense>
    </div>
  );
};

export default Home;
