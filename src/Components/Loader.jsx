/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { lineSpinner } from 'ldrs';

const Loader = ({ size = '50', stroke = '5', speed = '1', color = '#EAB308' }) => {
  useEffect(() => {
    lineSpinner.register();
  }, []);

  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <l-line-spinner
        size={size}
        stroke={stroke}
        speed={speed}
        color={color}
      ></l-line-spinner>
    </div>
  );
};

export default Loader;
