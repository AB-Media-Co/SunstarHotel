import { useEffect } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import HotelSelectingCards from './CardsCommonComp/HotelSelectingCards';
import PropTypes from 'prop-types';

const AllHotelCard = ({ hotels, isOpen, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]); 

    if (!isOpen) return null;
      

    return (
        <div className="fixed inset-0 bg-[#6EC4C2] flex justify-center items-center z-50" >
            <div className="flex hotelSelection flex-col w-full md:w-[1300px] gap-6  mt-[13rem] md:mt-52" >
                <div className="flex justify-between  items-center px-4 py-2">
                    <h2 className="text-[48px] font-semibold">Hotels</h2>
                    <button
                        className="text-black text-xl font-bold"
                        onClick={onClose}
                    >
                        <CloseOutlined />
                    </button>
                </div>
                <div className="text-center pb-[13rem] text-lg h-[110vh] hotelSelection overflow-y-auto  ">

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3  rounded-t-[32px]  bg-white p-10 md:py-12 ">
                        {hotels.map((hotel, index) => (
                            <HotelSelectingCards key={index} hotel={hotel} link={`hotels/${hotel.hotelId}`}  />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

AllHotelCard.propTypes = {
    hotels: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AllHotelCard;


{/* <div className="fixed  inset-0 bg-[#6EC4C2]  w-full flex justify-center items-center z-50">
<div className="flex hotelSelection flex-col Calender  overflow-hidden mt-24 md:mt-52 md:w-[1300px]  md:flex-row gap-6">
    <div>
        <div className="flex justify-between items-center px-4 py-2">
            <div className="text-[48px] font-semibold">
                Hotels
            </div>
            <button
                className=" text-black iconb text-xl  font-bold cursor-pointer"
                onClick={() => SetHotelsOpen(false)}
            >
                <CloseOutlined className="icon" />
            </button>
        </div>
        <div className="text-center text-lg h-[100vh] hotelSelection overflow-y-auto  ">
            <div className="grid gap-6 sm:grid-cols-2  rounded-t-[32px] overflow-y-auto bg-white hotelSelection  md:w-[1300px] lg:grid-cols-3 md:py-12  md:pb-[20rem] p-10">
                {hotels?.length > 0 && hotels.map((hotel, index) => (
                    <HotelSelctingCards key={index} hotel={hotel} link="/hotels" />
                ))}

            </div>
        </div>
    </div>
</div>
</div> */}