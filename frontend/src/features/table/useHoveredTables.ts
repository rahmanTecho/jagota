import { useState, useCallback } from "react";

const useHoveredTables = () => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const handleRowMouseEnter = useCallback((index: number) => {
    setHoveredRowIndex(index);
  }, []);

  const handleRowMouseLeave = useCallback(() => {
    setHoveredRowIndex(null);
  }, []);

  return {
    hoveredRowIndex,
    handleRowMouseEnter,
    handleRowMouseLeave,
  };
};

export default useHoveredTables;
