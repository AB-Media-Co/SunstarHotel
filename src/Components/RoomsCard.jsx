/* eslint-disable react-hooks/rules-of-hooks */
import useScrollAnimations from "../hooks/useScrollAnimations";
import useTextRevealAnimation from "../hooks/useTextRevealAnimation";
import Icon from "./Icons";

/* eslint-disable react/prop-types */

const RoomsCard = ({ room }) => {
    useTextRevealAnimation();
    useScrollAnimations();

    return <div className="bg-white shadow-md  rounded-lg overflow-hidden animation-on-scroll">
        <div className="relative">
            <img src={room.image} alt={room.title} className="w-full h-64 object-cover" />
            {room.tag && (
                <span className="absolute top-6 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-r-xl">
                    {room.tag}
                </span>
            )}
        </div>
        <div className="p-4 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-500">{room.title}</h2>
            <div className='flex justify-between'>
                <div className="flex gap-2 items-center text-sm text-gray-600 mt-2">
                    {/* <img src="/images/Icons/guests.svg" alt="guests" className="w-7 h-7"/> */}
                    <Icon name="guests" className="w-7 h-7" />

                    <span className="mr-4 font-semibold">{room.guests}</span>
                </div>
                <div className="flex gap-2 items-center text-sm text-gray-600 mt-2">
                    {/* <img src="/images/Icons/beds.svg" alt="beds" className="w-7 h-7"/> */}
                    <Icon name="beds" className="w-7 h-7" />

                    <span className='font-semibold'>{room.beds}</span>
                </div>
            </div>
            <div className='flex gap-2'>
                {/* <img src="/images/Icons/sqFt.svg" alt="area" className="w-7 h-7" /> */}
                <Icon name="sqFt" className="w-7 h-7" />

                <p className="text-sm text-gray-600 mt-1 font-semibold">{room.area}</p>
            </div>
            <div className='flex justify-between'>
                <div className="mt-1">
                    {room.originalPrice && (
                        <p className="text-sm text-gray-500 font-bold line-through">{room.originalPrice}</p>
                    )}
                    <p className="text-lg font-bold text-[#009368]">
                        {room.price} 
                        <span className="text-sm text-gray-600 font-normal">
                            /night<br /><span className='text-gray-500'>incl. Taxes</span> 
                        </span>
                    </p>
                </div>
                <div className='flex items-end'>
                    <button
                        className={`mt-4 h-[40px] ${room.available ? 'bg-yellow-400 hover:bg-yellow-500 text-[#058FA2]' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} font-bold py-2 px-4 rounded`}
                        disabled={!room.available}
                    >
                        {room.available ? 'Book Now' : 'Sold Out'}
                    </button>
                </div>
            </div>
        </div>
    </div>
}


export default RoomsCard;
