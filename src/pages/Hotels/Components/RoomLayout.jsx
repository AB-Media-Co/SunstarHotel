/* eslint-disable react/prop-types */
import RoomsCard from "../../../Components/RoomsCard";

const RoomLayout = ({ rooms }) => (
        <div className="max-w-7xl mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Rooms</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rooms?.map((room) => (
                    <RoomsCard key={room.id} room={room} />
                ))}
            </div>
        </div>
  );

export default RoomLayout;
