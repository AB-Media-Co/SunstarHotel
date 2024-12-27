import { ArrowRightAlt } from "@mui/icons-material";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Test = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [tempRange, setTempRange] = useState([
    {
      startDate: null, // Start as null
      endDate: null, // Start as null
      key: "selection",
    },
  ]);

  const [confirmedRange, setConfirmedRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [shake, setShake] = useState(false);

  const handleSelect = (ranges) => {
    const { startDate: selectedStartDate, endDate: selectedEndDate } = ranges.selection;

    // Handle cases when only startDate is selected
    if (selectedStartDate && !selectedEndDate) {
      setTempRange([
        {
          startDate: selectedStartDate,
          endDate: null, // Reset endDate to null until explicitly selected
          key: "selection",
        },
      ]);
      setStartDate(selectedStartDate);
      setEndDate(null); // Keep endDate null until explicitly selected
    }

    // Handle cases when both startDate and endDate are selected
    if (selectedStartDate && selectedEndDate) {
      setTempRange([
        {
          startDate: selectedStartDate,
          endDate: selectedEndDate,
          key: "selection",
        },
      ]);
      setStartDate(selectedStartDate);
      setEndDate(selectedEndDate);
    }
  };

  const handleApply = () => {
    if (!startDate || !endDate) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setConfirmedRange({
        startDate,
        endDate,
      });
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
    }
  };

  return (
    <div className="calendar-container items-center flex flex-col">
      <h2 className="mb-4 text-lg font-semibold">
        Selected Range:{" "}
        {confirmedRange.startDate && confirmedRange.endDate
          ? `${confirmedRange.startDate.toDateString()} - ${confirmedRange.endDate.toDateString()}`
          : "None"}
      </h2>
      <div className="custom-date-range-container">
        <DateRange
          onChange={handleSelect}
          moveRangeOnFirstSelection={false} // Prevent range from auto-updating
          ranges={tempRange}
          months={2} // Show two calendars
          direction="horizontal" // Arrange calendars side by side
          showDateDisplay={false} // Hide the left-side date display
          rangeColors={["#ffcc00"]}
          className="custom-date-range"
        />
      </div>

      <div className="footer -mt-10 border-2 border-gray-200 bg-[#ffcc00] w-full py-10">
        <div className="content flex flex-wrap gap-10 justify-between items-center">
          <div className="flex dates bg-white px-10 py-4 rounded-full flex-wrap gap-8">
            {/* Start Date */}
            <div
              className={`flex flex-col ${
                shake && !startDate ? "text-red-500 shake" : "text-gray-700"
              }`}
            >
              <span className="font-semibold text-[18px]">
                {startDate
                  ? startDate.toDateString()
                  : "Select Start Date"}
              </span>
              <span className="text-gray-400">Start Date</span>
            </div>
            <ArrowRightAlt className="text-yellow-400" />

            {/* End Date */}
            <div
              className={`flex flex-col ${
                shake && !endDate ? "text-red-500 shake" : "text-gray-700"
              }`}
            >
              <span className="font-semibold text-[18px]">
                {endDate
                  ? endDate.toDateString()
                  : "Select End Date"}
              </span>
              <span className="text-gray-400">End Date</span>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex items-center flex-wrap gap-6 md:gap-10">
            <button
              onClick={handleApply}
              className="confirm-btn font-bold bg-yellow-400 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
