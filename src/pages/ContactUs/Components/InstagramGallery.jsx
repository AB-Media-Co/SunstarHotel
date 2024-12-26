/* eslint-disable react/prop-types */
import InstagramIcon from '@mui/icons-material/Instagram';
import useScrollAnimations from '../../../hooks/useScrollAnimations';
import useTextRevealAnimation from '../../../hooks/useTextRevealAnimation';
const InstagramGallery = ({images}) => {
  useTextRevealAnimation();
  useScrollAnimations();
  return (
    <div className="bg-white py-10">
      <div className="content mx-auto px-4">
        <div className="flex items-center space-x-2 mb-6">
          <InstagramIcon className='text-[#43AFAD]'/>
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            @sunstarhotel on Instagram
          </h2>
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="rounded-md overflow-hidden  shadow hover:shadow-lg transition-shadow duration-300 animation-on-scroll"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[362px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramGallery;
