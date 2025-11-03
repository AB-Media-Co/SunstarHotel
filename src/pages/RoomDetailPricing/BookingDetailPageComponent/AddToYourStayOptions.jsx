/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePricing } from "../../../Context/PricingContext";
import { Check } from "lucide-react";

export const AddToYourStayOptions = ({ data }) => {
  const options = data?.addToYourStay;
  const { selectedOtherCharges, setSelectedOtherCharges } = usePricing();

  const toggleSelection = (option, event) => {
    if (event) event.stopPropagation();
    setSelectedOtherCharges((prevSelected) => {
      const exists = Array.isArray(prevSelected)
        ? prevSelected.find((item) => item._id === option._id)
        : null;
      if (exists) {
        return prevSelected.filter((item) => item._id !== option._id);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const isSelected = (id) => selectedOtherCharges.some((item) => item._id === id);

  return (
    <div className="bg-white ">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-mobile/h4 md:text-desktop/h4  text-gray-900">Add To Your Stay</h2>
        <p className="text-gray-600 t md:text-desktop/body/1 mt-1">Enhance your experience with optional add-ons</p>
      </div>

      {/* Options */}
      <div className="space-y-3 md:space-y-4">
        {options.map((option) => (
          <OptionCard
            key={option._id}
            option={option}
            isSelected={isSelected(option._id)}
            onToggle={(e) => toggleSelection(option, e)}
          />
        ))}
      </div>
    </div>
  );
};

const OptionCard = ({ option, isSelected, onToggle }) => {
  return (
    <div
      className={`relative rounded-lg md:rounded-xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${isSelected
        ? "border-teal-500 bg-teal-50 shadow-md"
        : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm"
        }`}
      onClick={onToggle}
    >
      {/* Main Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-3 md:gap-4">
          {/* Checkbox */}
          <div
            className={`w-5 h-5 md:w-6 md:h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected
              ? "bg-teal-500 border-teal-500 shadow-sm"
              : "border-gray-300 hover:border-teal-400"
              }`}
          >
            {isSelected && (
              <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title & Price */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className={`text-base md:text-lg font-semibold leading-tight ${isSelected ? "text-teal-700" : "text-gray-900"
                  }`}>
                  {option.heading}
                </h3>

                <p className={`text-xs md:text-sm leading-relaxed ${isSelected ? "text-primary-green font-medium" : "text-gray-600"
                  }`}>
                  {option.description}
                </p>
              </div>

              <div className={`flex-shrink-0 text-right px-2 py-1 md:px-3 md:py-1.5 rounded-md transition-colors ${isSelected
                ? "bg-teal-100"
                : ""
                }`}>
                <div className={`text-base md:text-lg font-bold ${isSelected ? "text-primary-green" : "text-gray-900"
                  }`}>
                  ₹{option.rate?.amount}
                </div>
                {option.rate?.period && (
                  <div className="text-xs text-gray-500">{option.rate.period}</div>
                )}
              </div>
            </div>

            {/* Selected Badge */}
            {/* {isSelected && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 bg-teal-100 text-teal-700 rounded-md text-xs md:text-sm font-medium border border-teal-200">
                <Check className="w-3.5 h-3.5" />
                <span>Added to your stay</span>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Left accent line when selected */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"></div>
      )}
    </div>
  );
};

export default AddToYourStayOptions;