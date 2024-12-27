/* eslint-disable react/prop-types */

const Icon = ({ name, className = 'w-6 h-6' }) => {
  const icons = {
    iwant: '/src/Images/Icons/1.svg',
    ac: '/src/Images/Icons/ac.svg',
    air: '/src/Images/Icons/air.svg',
    almirah: '/src/Images/Icons/almirah.svg',
    bed: '/src/Images/Icons/bed.svg',
    beds: '/src/Images/Icons/beds.svg',
    bottle: '/src/Images/Icons/bottle.svg',
    bucket: '/src/Images/Icons/bucket.svg',
    cake: '/src/Images/Icons/cake.svg',
    cctv: '/src/Images/Icons/CCTV.svg',
    calendar: '/src/Images/Icons/calendar-icon.svg',
    carParking: '/src/Images/Icons/car parking.svg',
    car: '/src/Images/Icons/car.svg',
    cattle: '/src/Images/Icons/cattle.svg',
    chargerPlug: '/src/Images/Icons/chargerPlug.svg',
    cleaning: '/src/Images/Icons/cleaning.svg',
    clothHanging: '/src/Images/Icons/clothHanging.svg',
    cutlery: '/src/Images/Icons/cutllery.svg',
    dining: '/src/Images/Icons/dinning.svg',
    dryer: '/src/Images/Icons/dryer.svg',
    economicSustainability: '/src/Images/Icons/Economic_sustainability.svg',
    flight: '/src/Images/Icons/Flight.svg',
    food: '/src/Images/Icons/food.svg',
    fridge: '/src/Images/Icons/Fridge.svg',
    faqs: '/src/Images/Icons/faqs.svg',
    fridge2: '/src/Images/Icons/fridge2.svg',
    guests: '/src/Images/Icons/guests.svg',
    guestHotel: '/src/Images/Icons/guestHotel.svg',
    hanger: '/src/Images/Icons/hanger.svg',
    inventory: '/src/Images/Icons/Inventory.svg',
    iron: '/src/Images/Icons/iron.svg',
    leftIcon: '/src/Images/Icons/leftIcon.svg',
    lamp: '/src/Images/Icons/lamp.svg',
    location: '/src/Images/Icons/location.svg',
    locker: '/src/Images/Icons/locker.svg',
    monitor: '/src/Images/Icons/moniter.svg',
    message: '/src/Images/Icons/message.svg',
    noSmoking: '/src/Images/Icons/Nomoking.svg',
    nonSmokingRooms: '/src/Images/Icons/Non Smoking Rooms.svg',
    nonSmokingRoomswhite: '/src/Images/Icons/nonSmokingRoomswhite.svg',
    reception: '/src/Images/Icons/reception.svg',
    restaurant: '/src/Images/Icons/Restaurant.svg',
    rightIcon: '/src/Images/Icons/rightIcon.svg',
    roundedbed: '/src/Images/Icons/roundedbed.svg',
    safety: '/src/Images/Icons/Safety.svg',
    security: '/src/Images/Icons/Security.svg',
    service: '/src/Images/Icons/service.svg',
    shower: '/src/Images/Icons/shower.svg',
    sqFt: '/src/Images/Icons/sqFt.svg',
    support: '/src/Images/Icons/Support.svg',
    systemSet: '/src/Images/Icons/systemSet.svg',
    table: '/src/Images/Icons/table.svg',
    teethbrush: '/src/Images/Icons/teethbrush.svg',
    trollybag: '/src/Images/Icons/trollybag.svg',
    tv: '/src/Images/Icons/tv.svg',
    upArrow: '/src/Images/Icons/UpArrow.svg',
    vehical: '/src/Images/Icons/vehical.svg',
    widiRouter: '/src/Images/Icons/widiRouter.svg',
    wifi: '/src/Images/Icons/wifi.svg',
    wifiIcon: '/src/Images/Icons/WifiIcon.svg',
    email: '/src/Images/Icons/email@.svg',
    rotatePhone: '/src/Images/Icons/rotatePhone.svg',
    marketing: '/src/Images/Icons/marketing.svg',
    Group: '/src/Images/Icons/Group.svg',
    generalChat: '/src/Images/Icons/generalChat.svg',
    corporate: '/src/Images/Icons/corporate.svg',
    builders: '/src/Images/Icons/builders.svg',
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
    />
  );
};

export default Icon;
