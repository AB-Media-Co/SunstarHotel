import React from 'react'
import InTheMediaPage from './Component/InTheMediaPage'
import SunstarMediaSection from './Component/SunstarMediaSection'
import SunstarInfoCards from './Component/SunstarInfoCards'
import ImageGallery from '../../Components/ImageGallery'
import { Helmet } from 'react-helmet'
import { useGetMetas } from '../../ApiHooks/useMetaHook'

const IntheMediaMain = () => {
    const { data: metas } = useGetMetas();

    const inthemedia = Array.isArray(metas)
        ? metas.find(meta => meta.page === "in-the-media")
        : null; 
    return (
        <div>
            <Helmet>
                <title>{inthemedia?.metaTitle || 'Tour & Travel - Sunstar Hotels'}</title>
                <meta name="description" content={inthemedia?.metaDescription || ''} />
                <meta name="keywords" content={inthemedia?.metaKeywords?.join(', ') || ''} />
            </Helmet>
            <InTheMediaPage />
            <SunstarMediaSection />

            <SunstarInfoCards />
            <div className='content'>

                <ImageGallery />
            </div>

        </div>
    )
}

export default IntheMediaMain
