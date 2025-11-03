import { memo, lazy, Suspense } from 'react';

// Lazy load non-critical components
const RoatinfImg = lazy(() => import("../../../Components/RoatinfImg"));
const Sec3CardSlider = lazy(() => import("./Sec3CrdSlider"));

const Section3 = () => {
  return (
    <div className="relative bg-[#78C9C8] overflow-hidden z-10">
      {/* Image Container - Lazy loaded decorative element */}
      <div className="md:block hidden">
        <Suspense fallback={<div className="w-[300px] h-[300px]" />}>
          <RoatinfImg position="right-0" src="/images/HomepageImages/section3pattern.png" />
        </Suspense>
      </div>
      
      {/* Content Section */}
      <div className="content pt-5 md:pt-[50px] z-10 relative">
        <Suspense fallback={
          <div className="animate-pulse space-y-4 py-8">
            <div className="h-8 bg-white/20 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-white/20 rounded w-2/3 mx-auto"></div>
          </div>
        }>
          <Sec3CardSlider />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Section3);
