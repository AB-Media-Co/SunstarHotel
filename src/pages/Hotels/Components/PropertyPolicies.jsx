/* eslint-disable react/prop-types */
// PropertyPolicies.js
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const PropertyPolicies = ({ propertyData }) => {
  const [showAll, setShowAll] = useState(false);

  // Determine which policies to show
  const policiesToShow = showAll
    ? propertyData.policies
    : propertyData.policies?.slice(0, 4);

  return (
    <div className="content mx-auto p-6 pb-12">
      <h2 className="text-mobile/h5 md:text-desktop/h4 font-semibold my-4">
        Property Policies
      </h2>
      <hr />
      <ul className="list-none my-5 space-y-2">
        {policiesToShow.map((policy, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="bg-black rounded-full p-[2px] text-primary-white">
              <CheckIcon className="w-[12px] h-[12px]" />
            </div>
            <span className="text-mobile/body/2 md:text-desktop/body/1 font-semibold">
              {policy}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-4 text-primary-dark-green text-mobile/button md:text-desktop/button hover:underline"
      >
        {showAll ? "View less" : "View all 17 property policies"}
      </button>
    </div>
  );
};

export default PropertyPolicies;
