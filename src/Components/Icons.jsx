/* eslint-disable react/prop-types */

const Icon = ({ name, className = 'w-6 h-6',styleCss={} }) => {
  const icons = {
    iwant: '/images/Icons/1.svg',
    ac: '/images/Icons/ac.svg',
    air: '/images/Icons/air.svg',
    almirah: '/images/Icons/almirah.svg',
    bed: '/images/Icons/bed.svg',
    beds: '/images/Icons/beds.svg',
    bottle: '/images/Icons/bottle.svg',
    bucket: '/images/Icons/bucket.svg',
    cake: '/images/Icons/cake.svg',
    cctv: '/images/Icons/CCTV.svg',
    calendar: '/images/Icons/calendar-icon.svg',
    carParking: '/images/Icons/car parking.svg',
    car: '/images/Icons/car.svg',
    cattle: '/images/Icons/cattle.svg',
    chargerPlug: '/images/Icons/chargerPlug.svg',
    cleaning: '/images/Icons/cleaning.svg',
    clothHanging: '/images/Icons/clothHanging.svg',
    cutlery: '/images/Icons/cutllery.svg',
    dining: '/images/Icons/dinning.svg',
    dryer: '/images/Icons/dryer.svg',
    economicSustainability: '/images/Icons/Economic_sustainability.svg',
    flight: '/images/Icons/Flight.svg',
    food: '/images/Icons/food.svg',
    fridge: '/images/Icons/Fridge.svg',
    faqs: '/images/Icons/faqs.svg',
    fridge2: '/images/Icons/fridge2.svg',
    guests: '/images/Icons/guests.svg',
    guestHotel: '/images/Icons/guestHotel.svg',
    hanger: '/images/Icons/hanger.svg',
    inventory: '/images/Icons/Inventory.svg',
    iron: '/images/Icons/iron.svg',
    leftIcon: '/images/Icons/leftIcon.svg',
    lamp: '/images/Icons/lamp.svg',
    location: '/images/Icons/location.svg',
    locker: '/images/Icons/locker.svg',
    monitor: '/images/Icons/moniter.svg',
    message: '/images/Icons/message.svg',
    noSmoking: '/images/Icons/Nomoking.svg',
    nonSmokingRooms: '/images/Icons/Non Smoking Rooms.svg',
    nonSmokingRoomswhite: '/images/Icons/nonSmokingRoomswhite.svg',
    reception: '/images/Icons/reception.svg',
    restaurant: '/images/Icons/Restaurant.svg',
    rightIcon: '/images/Icons/rightIcon.svg',
    roundedbed: '/images/Icons/roundedbed.svg',
    safety: '/images/Icons/Safety.svg',
    security: '/images/Icons/Security.svg',
    service: '/images/Icons/service.svg',
    shower: '/images/Icons/shower.svg',
    sqFt: '/images/Icons/sqFt.svg',
    support: '/images/Icons/Support.svg',
    systemSet: '/images/Icons/systemSet.svg',
    table: '/images/Icons/table.svg',
    teethbrush: '/images/Icons/teethbrush.svg',
    trollybag: '/images/Icons/trollybag.svg',
    tv: '/images/Icons/tv.svg',
    upArrow: '/images/Icons/UpArrow.svg',
    vehical: '/images/Icons/vehical.svg',
    widiRouter: '/images/Icons/widiRouter.svg',
    wifi: '/images/Icons/wifi.svg',
    wifiIcon: '/images/Icons/WifiIcon.svg',
    email: '/images/Icons/email@.svg',
    rotatePhone: '/images/Icons/rotatePhone.svg',
    marketing: '/images/Icons/marketing.svg',
    Group: '/images/Icons/corporate.svg',
    generalChat: '/images/Icons/generalChat.svg',
    corporate: '/images/Icons/corporate.svg',
    builders: '/images/Icons/hoteldev.svg',
    discount: '/images/Icons/discount.svg',
    rest: '/images/Icons/rest.svg',
    planeH: '/images/Icons/planeH.svg',
    metro: '/images/Icons/metro.svg',
    location_on: '/images/Icons/location_on.svg',
    Airport: '/images/MapIcons/Airport.svg',
    Railway: '/images/MapIcons/Airport.svg',
    Metro: '/images/MapIcons/Airport.svg',
    Attraction: '/images/MapIcons/Airport.svg',
    Reataurents: '/images/MapIcons/Airport.svg',
    NightLife: '/images/MapIcons/Airport.svg',
    Activities: '/images/MapIcons/Airport.svg',
    Reservation: '/images/Icons/reservation.svg',
    TravelAgent: '/images/Icons/travelagent.svg',
    Career: '/images/Icons/career.svg',
  };
 
  const iconPath = icons[name];

  if (!iconPath) {
    return <div>Icon not found</div>;
  }
  return (
    <img
    src={iconPath}
    alt={name}
    className={` ${className}`}
    style={styleCss} // ✅ Correct: This properly spreads the passed object.
  
    />
  );
};

export default Icon;
