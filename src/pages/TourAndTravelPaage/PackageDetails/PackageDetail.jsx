import React, { useEffect } from 'react'
import { usePackageById } from '../../../ApiHooks/useTravelPackagesHook'
import { useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import HeroSectionCarousel from './component/HeroSectionCarousel';
import { usePricing } from '../../../Context/PricingContext';
import TourHiglights from './component/TourHiglights';
import PackageItinerary from './component/PackageItinerary';
import PackageInclusionBlock from './component/PackageInclusionBlock';
import TestimonialSection from '../../../Components/TestimonialSection';
import useUpdatePagesHook from '../../../ApiHooks/useUpdatePagesHook';

const PackageDetail = () => {
    const { state } = useLocation();
    const { data: packageDetails, isLoading, isError, error } = usePackageById(state?.pkg?._id)
    const { Testimonials } = useUpdatePagesHook();
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


    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <div className="text-white text-xl">Error loading packages: {error?.message}</div>
            </div>
        )
    }


    return (
        <div>
            <HeroSectionCarousel packageDetails={packageDetails} />
            <TourHiglights packageDetails={packageDetails} />
            <PackageItinerary packageDetails={packageDetails} />
            <PackageInclusionBlock packageDetails={packageDetails} />
            <TestimonialSection Testimonials={Testimonials} />


        </div>
    )
}

export default PackageDetail
