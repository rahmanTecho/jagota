import React from "react";

type Props = {
  value: string;
};

const TabelPercentageCell = ({ value }: Props) => {
  const gap = parseFloat(value.replace("%", ""));
  const className = gap < 0 ? "text-red-600" : "text-green-700";
  return <span className={className}>{gap > 0 && "+"}{value}</span>;
};
export default TabelPercentageCell;
