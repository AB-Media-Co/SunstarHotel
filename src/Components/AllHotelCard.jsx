import { useEffect } from 'react';
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

  if (!isOpen) return null;

  const sectionVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' } },
  };

  return (
    <div className="fixed inset-0 bg-[#6EC4C2] flex justify-center items-center z-50">

      <div className="flex hotelSelection flex-col w-full md:w-[1300px] gap-6 mt-[13rem] md:mt-52">
        <RoatinfImg position='md:right-[-6rem] top-[-8rem] md:top-[9rem] right-[-6rem] z-0' />
        <div className="flex justify-between items-center px-4 py-2 z-10">
          <h2 className="text-[48px] font-semibold">Hotels</h2>
          <button
            className="text-White  font-bold"
            onClick={onClose}
          >
            <CloseOutlined style={{ height: "40px", width: "40px" }} />
          </button>
        </div>
        
        <motion.div
          className="text-center pb-[13rem] text-lg h-[110vh] z-10 hotelSelection overflow-y-auto"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="rounded-t-[32px] bg-white p-10 md:py-12 ">
            <HotelSelectingCards />
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