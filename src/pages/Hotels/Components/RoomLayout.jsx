/* eslint-disable react/prop-types */
import RoomsCard from "../../../Components/RoomsCard";

const RoomLayout = ({ rooms, title = "Rooms" }) => (
    <div id="rooms" className="content py-6 px-4">
        <h1 className="text-mobile/h1 md:text-desktop/h2 font-bold mb-6">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms?.map((room, index) => (
                <div key={index}  
                data-aos="fade-up"
                data-aos-delay={index * 100} >
                <RoomsCard key={room._id} room={room} />

                </div>
            ))}
        </div>
    </div>
);


export default RoomLayout;
