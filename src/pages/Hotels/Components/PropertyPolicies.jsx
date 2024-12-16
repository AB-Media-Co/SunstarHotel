/* eslint-disable react/prop-types */
// PropertyPolicies.js
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
const PropertyPolicies = ({ propertyData }) => {
  const [showAll, setShowAll] = useState(false);

  // Determine which policies to show
  const policiesToShow = showAll ? propertyData.policies : propertyData.policies?.slice(0, 4);

  return (
    <div className="content mx-auto p-6 pb-12">
      <h2 className="text-xl font-semibold my-4">Property Policies</h2>
      <hr />
      <ul className="list-none my-5 space-y-2">
        {policiesToShow.map((policy, index) => (
          <li
            key={index}
            className="flex items-start gap-2 "
          >
            <div className="bg-black rounded-full p-[2px] text-white ">
              <CheckIcon className="w-[2px] h-[2px]" />

            </div>
            <span className="font-semibold">{policy}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-4 text-[#058FA2] hover:underline"
      >
        {showAll ? "View less" : "View all 17 property policies"}
      </button>

     
    </div>
  );
};

export default PropertyPolicies;
