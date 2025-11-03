import { memo, lazy, Suspense } from 'react';

const ImageGallery = lazy(() => import("../../../Components/ImageGallery"));

const Section4 = () => {
  return (
    <div className="relative flex flex-col justify-between content items-center mt-10 py-10 z-0">
      <Suspense fallback={
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg" style={{ height: `${200 + (i % 3) * 50}px` }} />
          ))}
        </div>
      }>
        <ImageGallery />
      </Suspense>
    </div>
  );
};

export default memo(Section4);
