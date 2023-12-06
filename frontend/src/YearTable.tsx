import React from "react";
import { Column, useTable } from "react-table";
import TabelPercentageCell from "./features/table/TabelPercentageCell";

type YearTableProps = {
  year: number;
  data: SalesData[];
  hoveredRowIndex: number | null;
  onRowMouseEnter: (index: number) => void;
  onRowMouseLeave: () => void;
};

const YearTable: React.FC<YearTableProps> = ({
  year,
  data,
  hoveredRowIndex,
  onRowMouseEnter,
  onRowMouseLeave,
}) => {
  const columns: Column<SalesData>[] = React.useMemo(
    () => [
      {
        Header: "Value",
        accessor: "value",
        Cell: ({ value }) => (
          <span className="text-blue-700 font-semibold">{value}</span>
        ),
      },
      {
        Header: "Growth%",
        accessor: "growth",
        Cell: ({ value }) => <TabelPercentageCell value={value} />,
      },
      {
        Header: "Gap%",
        accessor: "gap",
        Cell: ({ value }) => <TabelPercentageCell value={value} />,
      },
      {
        Header: "Margin",
        accessor: "margin",
      },
      {
        Header: "Dist.",
        accessor: "dist",
      },
      {
        Header: "Budget %",
        accessor: "budgetPercentage",
        Cell: ({ value }) => {
          return (
            <div className="bg-gray-200 p-1 rounded-full text-xs flex justify-center">
              {value}
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable({
      columns,
      data,
    });

  const isRowInHoveredGroup = (index: number) => {
    if (hoveredRowIndex === null) return false;
    const hoveredGroupIndex = Math.floor(hoveredRowIndex / 2);
    const currentGroupIndex = Math.floor(index / 2);
    return hoveredGroupIndex === currentGroupIndex;
  };

  const rowStyle = (index: number) => {
    const isHovered = isRowInHoveredGroup(index);
    const bgColor = index % 4 < 2 ? "bg-gray-100" : "bg-gray-200";
    const hoverClass = isHovered ? "bg-blue-100 " : "";
    const borderClass = index % 2 === 1 ? "" : "";
    return `${bgColor} ${hoverClass} ${borderClass}`;
  };

  return (
    <div className="border-y border-gray-300">
      <div className="px-4 py-3 flex items-center">
        <h2 className="text-xs font-semibold text-blue-500">{year}</h2>
      </div>
      <div className="overflow-x-auto bg-white">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-300">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 text-center align-middle group-hover:border-b group-hover:border-black"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={rowStyle(index)}
                  onMouseEnter={() => onRowMouseEnter(index)}
                  onMouseLeave={onRowMouseLeave}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:border-b group-hover:border-black text-center"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearTable;
