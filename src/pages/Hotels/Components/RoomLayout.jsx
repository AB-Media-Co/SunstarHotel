/* eslint-disable react/prop-types */
import RoomsCard from "../../../Components/RoomsCard";

const RoomLayout = ({ rooms, title = "Rooms" }) => (
    <div id="rooms" className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms?.map((room) => (
                <RoomsCard key={room.id} room={room} />
            ))}
        </div>
    </div>
);


export default RoomLayout;
