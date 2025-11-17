// import RoatinfImg from "../../../Components/RoatinfImg";

const DayRoomTandC = ({ tandc }) => {
  return (
    <div className="bg-primary-green text-white">
      <div className="py-12 content px-4 ">
        <h2 className="text-mobile/h3 md:text-desktop/h3font-bold text-start mb-6">Terms And Conditions:</h2>
        <ul className="list-disc text-mobile/body/2 md:text-desktop/body/2/regular pl-5 space-y-3">
          {tandc?.points?.map((point, index) => (
            <li key={index} className="">{point}</li>
          ))}
        </ul>
      </div>
      {/* <RoatinfImg src="/images/HomepageImages/round.png" position="right-0 w-[10px]"/> */}
    </div>
  );
};

export default DayRoomTandC;
