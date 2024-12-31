import AmenitiesList from "../../Components/AmenitiesList"
import TestimonialSection from "../../Components/TestimonialSection"
import { Amenities, businessPlatformFeatures, OurClientsData, } from "../../Data/HotelRoomsData"
import { OtherRooms } from "../../Data/RoomsData"
import RoomLayout from "../Hotels/Components/RoomLayout"
import RoomPriceSection from "./Components/RoomPriceSection"
import RoomsBanner from "./Components/RoomsBanner"
import RoomsDescription from "./Components/RoomsDescription"

const Rooms = () => {
  return (
    <div>
      <RoomsBanner businessPlatformFeatures={businessPlatformFeatures} />
      <RoomPriceSection />
      <hr className="content h-[2px] bg-gray-400" />
      <RoomsDescription />
      <AmenitiesList
        title={Amenities.title}
        subtitle={Amenities.subtitle}
        amenities={Amenities.List}
      />
      <hr className="mb-10 content h-[2px] bg-gray-400" />

      <TestimonialSection
        title={OurClientsData.title}
        testimonials={OurClientsData.testimonials}
        backgroundImage={OurClientsData.backgroundImage}
      />
      <hr className="mt-10 content h-[2px] bg-gray-400"/>

      <RoomLayout rooms={OtherRooms} title='Other Room' />


    </div>
  )
}

export default Rooms
