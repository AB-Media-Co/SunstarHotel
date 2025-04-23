// src/components/CityPagesOptions.jsx
import { useEffect, useMemo } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RoatinfImg from '../../Components/RoatinfImg';
import { useGetLocations } from '../../ApiHooks/useLocationHook';
import Loader from '../../Components/Loader'

const CityPagesOptions = ({ isOpen }) => {
  const navigate = useNavigate();
  const { data: locations, isLoading, isError, error } = useGetLocations();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const sectionVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: '100%' },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    }),
    []
  );

  if (!isOpen) return null;

  const handleClose = () => {
    navigate('/');
  };

  const handleExplore = (cityName, cityId) => {
    navigate(`/citypage/${cityName.toLowerCase()}`, { state: { id: cityId } });
  };

  return (
    <div className="fixed inset-0 bg-primary-green flex justify-center items-center z-50">
      <div className="flex hotelSelection flex-col w-full md:w-[1300px] gap-6 mt-[13rem] md:mt-52">
        <RoatinfImg position="md:right-[-6rem] top-[-8rem] md:top-[9rem] right-[-6rem] z-0" />
        <div className="flex justify-between items-center px-4 py-2 z-10">
          <h2 className="text-[48px] font-semibold">Cities</h2>
          <button className="text-white font-bold" onClick={handleClose}>
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
          <div className="rounded-t-[32px] h-[110vh] bg-primary-white md:py-12">
            {isLoading && <div><Loader /></div>}
            {isError && <div>Error: {error.message}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-6">
              {locations &&
                locations.map((location) => (
                  <div
                    key={location._id}
                    onClick={() => handleExplore(location.name, location._id)}
                    className="group cursor-pointer relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                  >
                    <div
                      className="relative h-48 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${location.image})` }}
                    >
                      <div className="absolute inset-0 opacity-[0.7] bg-gradient-to-t from-primary-green to-transparent"></div>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <h2 className="text-xl font-bold text-white tracking-wide group-hover:text-primary-dark-green">
                        {location.name}
                      </h2>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <button
                        className="px-6 py-2 text-sm font-medium text-white bg-primary-green rounded-lg shadow-lg hover:bg-primary-dark-green transition"

                      >
                        Explore Hotels
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

CityPagesOptions.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired, // for prop validation, if needed
};

export default CityPagesOptions;
