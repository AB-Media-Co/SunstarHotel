import { useEffect, useMemo } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import HotelSelectingCards from './CardsCommonComp/HotelSelectingCards';
import PropTypes from 'prop-types';
import RoatinfImg from './RoatinfImg';
import { motion, AnimatePresence } from 'framer-motion';

const AllHotelCard = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const overlayVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Smoother fade in
      },
    },
  }), []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.9,
        when: 'beforeChildren',
        staggerChildren: 0.2, // Slight delay to stagger child elements
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }), []);

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
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 75, // Consistent with header's spring
        duration: 1,
      },
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.34, 1.56, 0.64, 1] }}
              className=' hidden md:block'
            >
              <RoatinfImg position="md:right-[-6rem]  top-[2rem] md:top-[9rem] right-6 z-0" divClass="absolute " />
            </motion.div>

            <motion.div
              className="flex justify-between items-center px-4 py-2 z-10"
              // variants={headerVariants}
            >
              <h2 className="text-[48px] font-semibold text-white">Hotels</h2>
              <motion.button
                className="text-White font-bold"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CloseOutlined style={{ height: "40px", width: "40px", color: "white" }} />
              </motion.button>
            </motion.div>

            <motion.div
              className="text-center text-lg z-10"
              variants={contentVariants}
            >
              <motion.div
                className="rounded-t-[32px] bg-primary-white md:py-12"
                initial={{ y: '100%', borderRadius: "32px" }}
                animate={{
                  y: 0,
                  transition: {
                    type: 'spring',
                    damping: 22,
                    stiffness: 65,
                    delay: 0.3,
                    duration: 1.6,
                  },
                }}
              >
                <HotelSelectingCards close={onClose} />
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
