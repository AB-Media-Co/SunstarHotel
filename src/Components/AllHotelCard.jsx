import { useEffect, useMemo, lazy, Suspense } from 'react';
import { ArrowBackIos } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load heavy components
const HotelSelectingCards = lazy(() => import('./CardsCommonComp/HotelSelectingCards'));
const RoatinfImg = lazy(() => import('./RoatinfImg'));

const AllHotelCard = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Simplified animations for better performance
  const overlayVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  }), []);

  // const containerVariants = useMemo(() => ({
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       duration: 0.9,
  //       when: 'beforeChildren',
  //       staggerChildren: 0.2, // Slight delay to stagger child elements
  //       ease: [0.22, 1, 0.36, 1],
  //     },
  //   },
  // }), []);

  // const headerVariants = useMemo(() => ({
  //   hidden: { opacity: 0, y: -20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       type: 'spring',
  //       damping: 25,
  //       stiffness: 100, // More stiffness for a snappier effect
  //       duration: 1.1,
  //     },
  //   },
  // }), []);

  const contentVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }), []);

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-primary-green flex justify-center hotelSelection overflow-y-auto items-start z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="flex hotelSelection flex-col w-full md:w-[1300px] gap-6"
            // variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className='hidden md:block'>
              <Suspense fallback={<div className="w-[300px] h-[300px]" />}>
                <RoatinfImg position="md:right-[-6rem] hidden md:block top-[2rem] md:top-[9rem] right-6 z-0" divClass="absolute" />
              </Suspense>
            </motion.div>
            <motion.div
              className="flex  items-center px-4 py-2 z-10"
            // variants={headerVariants}
            >
              <ArrowBackIos
                style={{ height: "32px", width: "32px" }}
                onClick={onClose}
                className="cursor-pointer  sm:h-[36px] sm:w-[36px] md:h-[40px] md:w-[40px] text-white"
              />

              <h2
                className="text-mobile/head md:text-desktop/head  cursor-pointer text-white"
                onClick={onClose}
              >
                Hotels
              </h2>

            </motion.div>
            <motion.div
              className="text-center text-lg z-10"
              variants={contentVariants}
            >
              <motion.div
                className="rounded-t-[32px] bg-primary-white md:py-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.4, ease: 'easeOut', delay: 0.1 },
                }}
              >
                <Suspense fallback={
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-8 bg-gray-200 rounded mt-4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                }>
                  <HotelSelectingCards close={onClose} />
                </Suspense>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AllHotelCard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AllHotelCard;
