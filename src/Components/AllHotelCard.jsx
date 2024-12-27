/* eslint-disable react/prop-types */
import { CloseOutlined } from '@mui/icons-material'
import HotelSelctingCards from "./CardsCommonComp/HotelSelectingCards";
import { useEffect } from 'react';
import { hotels } from '../Data/AboutSectionData';

const AllHotelCard = ({ SetHotelsOpen, hotelOpen }) => {
    console.log(hotels)
    const OnclickBook = () => {
        SetHotelsOpen(false)
    }
    useEffect(() => {
        if (hotelOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [hotelOpen]);
    return (
        <div className="fixed  inset-0 bg-[#6EC4C2]  w-full flex justify-center items-center z-50">
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
                                <HotelSelctingCards key={index} hotel={hotel} link="/hotels" OnclickBook={OnclickBook} />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllHotelCard
