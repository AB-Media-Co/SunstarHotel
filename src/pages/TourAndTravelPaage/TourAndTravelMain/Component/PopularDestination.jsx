import { useState } from "react";
import { usePackageById, usePackagesByState, useStatesWithSummary } from "../../../../ApiHooks/useTravelPackagesHook";
import CommonSwiper from "../../../../Components/CommonSlider";
import RoatinfImg from "../../../../Components/RoatinfImg";
import { Link } from "react-router-dom"; // assuming you use React Router

const PopularDestination = () => {
  const { data: packages = [] } = useStatesWithSummary();
  console.log(packages)
  const [selectedState, setSelectedState] = useState('');
  console.log(selectedState);
  const { data, isLoading, isError, error } = usePackageById(selectedState);
  console.log(data)

  const renderCard = (item) => ( 
    <div
      to={`/destination/${item._id}`} // route to destination detail
      onClick={()=> setSelectedState(item?._id)}
      className="group rounded-2xl overflow-hidden my-10 bg-white shadow-md transition hover:shadow-xl block"
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="h-64 w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 py-10 flex gap-2 justify-between items-center">
        <h3 className="text-lg font-semibold text-primary-green">{item.name}</h3>
        <p className="text-sm">
          Starting From{" "}
          <span className="text-primary-green font-bold">₹{item.lowestPrice}/-</span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      <RoatinfImg
        divClass="relative z-0"
        position="absolute md:left-[-80px] top-[-100px] md:top-[-29px] left-[-80px] w-[200px]"
      />
      <RoatinfImg
        divClass="relative z-0"
        position="absolute md:right-[-80px] top-[400px] md:top-[500px] right-[-80px] w-[200px]"
      />

      <div className="flex relative flex-col justify-between content items-center py-10 z-20">
        <div className="flex flex-col gap-2 text-center justify-center items-center">
          <h2 className="text-mobile/h3 md:text-desktop/h3 font-bold text-primary-green">
            Explore Most Popular Destinations
          </h2>
          <p className="text-sm max-w-md font-normal">
            Plan your perfect trip with our most loved and best-selling tour packages.
          </p>
        </div>

        <div className="w-full">
          <CommonSwiper
            items={packages}
            renderItem={renderCard}
            slidesPerViewDesktop={3}
            slidesPerViewTablet={2}
            spaceBetween={20}
            arrow="mt-6"
            autoplayDelay={4000}
            enableAutoplay={true}
            showPagination={true}
            
          />
        </div>
      </div>
    </>
  );
};

export default PopularDestination;
