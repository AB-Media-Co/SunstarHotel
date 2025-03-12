import { useEffect, useMemo } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import HotelSelectingCards from './CardsCommonComp/HotelSelectingCards';
import PropTypes from 'prop-types';
import RoatinfImg from './RoatinfImg';
import { motion } from 'framer-motion';

const AllHotelCard = ({ isOpen, onClose }) => {

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  }), []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary-green flex justify-center hotelSelection  overflow-y-auto items-start z-50">
      <div className="flex hotelSelection flex-col w-full md:w-[1300px] gap-6 ">
       
          <RoatinfImg position='md:right-[-6rem] top-[2rem] md:top-[9rem] right-6 z-0 ' divClass='absolute' />

        <div className="flex justify-between items-center px-4 py-2 z-10">
          <h2 className="text-[48px] font-semibold text-white">Hotels</h2>
          <button
            className="text-White font-bold"
            onClick={onClose}
          >
            <CloseOutlined style={{ height: "40px", width: "40px",color:"white" }} />
          </button>
        </div>
        <motion.div
          className="text-center text-lg  z-10 "
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="rounded-t-[32px] bg-primary-white  md:py-12">
            <HotelSelectingCards close={onClose} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

AllHotelCard.propTypes = {
  hotels: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AllHotelCard;