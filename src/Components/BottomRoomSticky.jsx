import { useNavigate } from 'react-router-dom';
import { usePricing } from '../Context/PricingContext'

const BottomRoomSticky = () => {
    const navigate = useNavigate();
    const { details, setEditAddPricing } = usePricing()
    const OncontinueClick = () => {
        setEditAddPricing(false)
        navigate('room/details')
    }

    return (
        <>
            {details.length > 0 &&
                <div className='w-full  bottom-0 left-0 right-0 bg-white shadow-lg border py-6 fixed'>
                    <div className="content  flex justify-between">
                        <h1 className='font-bold text-primary-gray text-2xl'>{details.length} Rooms</h1>

                        <div onClick={OncontinueClick} className='bg-primary-green py-2 px-4 rounded-lg text-white font-medium cursor-pointer'>
                            Continue Booking
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default BottomRoomSticky
