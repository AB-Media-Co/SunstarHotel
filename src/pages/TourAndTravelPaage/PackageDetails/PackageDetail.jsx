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

const PackageDetail = () => {
    const { state } = useLocation();
    const pkg = state?.pkg; // Navigation से मिला data
    
    // API call with optimizations
    const { data: packageDetails, isLoading, isError, error } = usePackageById(
        pkg?._id, 
        {
            enabled: !!pkg?._id,
            // अगर navigation से data है तो initial data के रूप में use करें
            initialData: pkg,
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
        }
    );
    
    const { setIsNavColor } = usePricing();

    // Early return अगर कोई data नहीं है
    if (!pkg && !packageDetails && !isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Package not found</div>
            </div>
        );
    }

    useEffect(() => {
        setIsNavColor(true);
        return () => {
            setIsNavColor(false); 
        };
    }, [setIsNavColor]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // केवल तभी loading show करें जब कोई initial data नहीं है
    if (isLoading && !pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    if (isError && !pkg) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <div className="text-white text-xl">Error loading packages: {error?.message}</div>
            </div>
        )
    }

    // पहले updated data use करें, अगर नहीं मिला तो navigation data use करें
    const displayData = packageDetails || pkg;

    return (
        <div className="fade-in">
            <HeroSectionCarousel packageDetails={displayData} />
            <TourHiglights packageDetails={displayData} />
            <PackageItinerary packageDetails={displayData} />
            <PackageInclusionBlock packageDetails={displayData} />
            <TestimonialSection page='tours and travel' />
        </div>
    )
}

export default PackageDetail;
