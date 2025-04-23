/* eslint-disable react/prop-types */
import RoomsCard from "../../../Components/RoomsCard";

const RoomLayout = ({ rooms, title = "Rooms" }) => (
    <div id="rooms" className="content py-6 px-4">
        <h1 className="text-mobile/h3 md:text-desktop/h3 font-bold mb-6">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms?.filter(room => room.show)?.length > 0 ?
                (
                    <>
                        {rooms?.filter(room => room.show)?.map((room, index) => (
                            <div key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100} >
                                <RoomsCard key={room._id} room={room} />
                            </div>
                        ))}
                    </>

                )
                : (<>No data Available</>)

            }
        </div>
    </div>
);


export default RoomLayout;
