// import RoatinfImg from "../../../Components/RoatinfImg";

const DayRoomTandC = () => {
  return (
    <div className="bg-primary-green text-white">
      <div className="py-12 content px-4 ">
        <h2 className="text-mobile/h3 md:text-desktop/h3font-bold text-start mb-6">Terms And Conditions:</h2>
        <ul className="list-disc text-mobile/body/2 md:text-desktop/body/2/regular pl-5 space-y-3">
          <li className="">Check-in and check-out on same day</li>
          <li className="">6 hour slot available between 8 AM to 7 PM</li>
          <li className="">100% booking amount required at the time of Check-in</li>
          <li className="">Check-in is allowed only at or after 8 AM, and check-out is before 7 PM on the same day</li>
          <li className="">Every extra hour utilized post 7 PM will be charged at 25% of the booking value, per hour, subject to room availability</li>
          <li className="">Non-cancellable, non-refundable and non-amendable for entire length of stay</li>
        </ul>
      </div>
      {/* <RoatinfImg src="/images/HomepageImages/round.png" position="right-0 w-[10px]"/> */}
    </div>
  );
};

export default DayRoomTandC;
