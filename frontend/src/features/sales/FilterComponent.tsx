import React, { useState } from "react";
import { useSalesContext } from "./SalesProvider";

const FilterComponent = () => {
  const { range, setRange } = useSalesContext();

  return (
    <div className="text-xs flex justify-between items-center p-2 bg-white shadow-sm rounded-lg mb-4 w-1/5 font-semibold">
      Compare Years
      <div>
        <select
          id="fromYear"
          name="fromYear"
          value={range.fromYear}
          onChange={(e) => {
            setRange({ ...range, fromYear: parseInt(e.target.value) });
          }}
          className="bg-gray-200 rounded-md text-blue-700 p-0.5"
        >
          {[...Array(new Date().getFullYear() - 2018)].map((_, index) => (
            <option key={2019 + index} value={2019 + index}>
              {2019 + index}
            </option>
          ))}
        </select>
      </div>
      to
      <div>
        <select
          id="toYear"
          name="toYear"
          value={range.toYear}
          onChange={(e) => {
            setRange({ ...range, toYear: parseInt(e.target.value) });
          }}
          className="bg-gray-200 rounded-md text-blue-700 p-0.5"
        >
          {[...Array(new Date().getFullYear() - 2018)].map((_, index) => (
            <option key={2019 + index} value={2019 + index}>
              {2019 + index}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
