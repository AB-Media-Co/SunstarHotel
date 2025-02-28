/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePricing } from "../../../Context/PricingContext";

export const AddToYourStayOptions = ({ data }) => {
  const options = data?.addToYourStay;
  const [expanded, setExpanded] = useState({});

  const { selectedOtherCharges, setSelectedOtherCharges } = usePricing();


  const toggleDescription = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelection = (option, event) => {
    event.stopPropagation();
    setSelectedOtherCharges((prevSelected) => {
      const exists = prevSelected.find((item) => item._id === option._id);
      if (exists) {
        return prevSelected.filter((item) => item._id !== option._id);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const isSelected = (id) => selectedOtherCharges.some((item) => item._id === id);

  return (
    <div className="bg-white w-full mx-auto">
      <div className="flex items-center mb-6">
        <div
          className="w-1 h-8 bg-primary-green rounded-full mr-3"
          style={{ backgroundColor: "#058FA2" }}
        ></div>
        <h2 className="text-3xl font-bold text-gray-800">Add To Your Stay</h2>
      </div>

      <div className="space-y-4">
        {options.map((option) => (
          <div
            key={option._id}
            className={`transition-all duration-200 border-2 rounded-lg overflow-hidden ${
              isSelected(option._id)
                ? "border-primary-green bg-teal-50"
                : "border-gray-200 hover:border-teal-200 hover:bg-gray-50"
            }`}
            style={{
              borderColor: isSelected(option._id) ? "#058FA2" : "",
              backgroundColor: isSelected(option._id) ? "#e6f7f9" : "",
            }}
          >
            <div
              className="flex w-full items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleDescription(option._id)}
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
                    isSelected(option._id)
                      ? "bg-primary-green border-primary-green"
                      : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor: isSelected(option._id) ? "#058FA2" : "",
                    borderColor: isSelected(option._id) ? "#058FA2" : "",
                  }}
                  onClick={(e) => toggleSelection(option, e)}
                >
                  {isSelected(option._id) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>

                <div className="flex gap-3 items-center flex-1">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{option.heading}</h3>
                      <div className="flex items-center">
                        <span
                          className="text-teal-600 font-medium mr-3"
                          style={{ color: "#058FA2" }}
                        >
                          ₹ {option.rate?.amount} {option.rate?.period || ""}
                        </span>
                        <button
                          className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                            expanded[option._id]
                              ? "bg-teal-100 text-teal-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                          style={{
                            backgroundColor: expanded[option._id]
                              ? "#e6f7f9"
                              : "",
                            color: expanded[option._id] ? "#058FA2" : "",
                          }}
                        >
                          {expanded[option._id] ? "−" : "+"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {expanded[option._id] && (
              <div className="px-14 pb-4 pt-0 text-gray-600 border-t border-gray-100">
                <p className="text-sm">{option.description}</p>
                {isSelected(option._id) && (
                  <div
                    className="mt-3 text-xs bg-teal-100 text-primay-green py-2 px-3 rounded-md inline-block"
                    style={{
                      backgroundColor: "#e6f7f9",
                      color: "#058FA2",
                    }}
                  >
                    ✓ Added to your stay
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
