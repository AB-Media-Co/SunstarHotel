import React from 'react'
import InTheMediaPage from './Component/InTheMediaPage'
import SunstarMediaSection from './Component/SunstarMediaSection'
import SunstarInfoCards from './Component/SunstarInfoCards'
import ImageGallery from '../../Components/ImageGallery'

const IntheMediaMain = () => {
    return (
        <div>
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
