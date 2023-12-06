import React, { useEffect, useState } from "react";
import YearTable from "../../YearTable";
import FilterComponent from "./FilterComponent";
import Container from "../../Container";
import { useSalesContext } from "./SalesProvider";
import useHoveredTables from "../table/useHoveredTables";

const Dashbored = () => {
  const { groupedData, loading, error, getData } = useSalesContext();
  const { handleRowMouseEnter, handleRowMouseLeave, hoveredRowIndex } =
    useHoveredTables();

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex justify-end w-full">
          <FilterComponent />
        </div>
        <div className="flex overflow-x-auto">
          {Object.keys(groupedData).map((year, i) => (
            <div
              className={`${i > 0 ? "border-l border-gray-300" : ""}`}
              key={year}
            >
              <YearTable
                key={year}
                year={parseInt(year)}
                data={groupedData[year]}
                hoveredRowIndex={hoveredRowIndex}
                onRowMouseEnter={handleRowMouseEnter}
                onRowMouseLeave={handleRowMouseLeave}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Dashbored;
