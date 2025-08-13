import React, { useEffect } from 'react'
import LoyaltyProgramlevel from './Components/LoyaltyProgramlevel'
import HowItWorks from './Components/HowItWorks'
import LoyaltyProgramHeader from './Components/LoyaltyProgramHeader'
import { usePricing } from '../../context/PricingContext'
import ImageGallery from '../../Components/ImageGallery'

const LoyaltyPrograme = () => {
  const { setIsNavColor } = usePricing()

  useEffect(() => {
    setIsNavColor(true);
    return () => {
      setIsNavColor(false);
    };
  }, [setIsNavColor]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <LoyaltyProgramHeader />
      <LoyaltyProgramlevel />
      <HowItWorks />
      <div className='content '>
        <ImageGallery />

      </div>
    </div>
  )
}

export default LoyaltyPrograme
