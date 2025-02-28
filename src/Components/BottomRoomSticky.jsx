import { useNavigate } from 'react-router-dom';
import { usePricing } from '../Context/PricingContext'

const BottomRoomSticky = () => {
    const navigate = useNavigate();
    const { details, setEditAddPricing, finalPrice } = usePricing()
    const OncontinueClick = () => {
        setEditAddPricing(false)
        navigate('/room/details')
    }

    return (
        <>
            {details.length > 0 &&
                <div className='w-full z-50 bottom-0 left-0 right-0 bg-white shadow-lg border py-6 fixed'>
                    <div className="content items-center flex justify-between">
                        <div className='flex flex-col'>
                            <div className='flex items-center gap-4'>
                                {/* <h1 className='text-primary-green text-xl font-bold'>₹ {finalPrice}</h1> */}
                                <h1 className='font-bold text-primary-gray text-xl'>{details.length} Rooms</h1>

                            </div>
                            <p>{details[0]?.cityLocation}</p>

                        </div>

                        <div onClick={OncontinueClick} className='bg-primary-green flex py-2 px-4 rounded-lg text-white font-medium cursor-pointer'>
                            Continue Booking
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default BottomRoomSticky
