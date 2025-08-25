import React, { useEffect } from 'react'
import LoyaltyProgramlevel from './Components/LoyaltyProgramlevel'
import HowItWorks from './Components/HowItWorks'
import LoyaltyProgramHeader from './Components/LoyaltyProgramHeader'
import { usePricing } from '../../context/PricingContext'
import ImageGallery from '../../Components/ImageGallery'
import { Helmet } from 'react-helmet'
import { useGetMetas } from '../../ApiHooks/useMetaHook'

const LoyaltyPrograme = () => {
  const { setIsNavColor } = usePricing()

  const { data: metas } = useGetMetas();

  const loayltyprogramm = Array.isArray(metas)
    ? metas.find(meta => meta.page === "Loyalty Program")
    : null;

  useEffect(() => {
    setIsNavColor(true);
    return () => {
      setIsNavColor(false);
    };
  }, [setIsNavColor]);


  return (
    <div>
      <Helmet>
        <title>{loayltyprogramm?.metaTitle || 'Tour & Travel - Sunstar Hotels'}</title>
        <meta name="description" content={loayltyprogramm?.metaDescription || ''} />
        <meta name="keywords" content={loayltyprogramm?.metaKeywords?.join(', ') || ''} />
      </Helmet>
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
