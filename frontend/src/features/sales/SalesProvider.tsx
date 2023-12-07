import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../../common/constants";

type SalesContextType = {
  groupedData: { [key: string]: SalesData[] };
  loading: boolean;
  error: Error | null;
  getData: (from?: number, to?: number) => void;
  range: { fromYear: number; toYear: number };
  setRange: React.Dispatch<
    React.SetStateAction<{
      fromYear: number;
      toYear: number;
    }>
  >;
};

const SalesContext = createContext<SalesContextType>({
  groupedData: {},
  loading: true,
  error: null,
  getData: () => {},
  range: { fromYear: 2019, toYear: new Date().getFullYear() },
  setRange: () => {},
});

type salesProviderProps = {
  children: React.ReactNode;
};
const SalesProvider: React.FC<salesProviderProps> = ({ children }) => {
  const [groupedData, setGroupedData] = useState<{
    [key: string]: SalesData[];
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [range, setRange] = useState<{ fromYear: number; toYear: number }>({
    fromYear: 2019,
    toYear: new Date().getFullYear(),
  });

  const getData = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (range.fromYear) query.append("from", range.fromYear.toString());
      if (range.toYear) query.append("to", range.toYear.toString());
      const response = await fetch(`${API_URL}/sales?${query.toString()}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const fetchedData: SalesData[] = await response.json();

      const newGroupedData = fetchedData.reduce(
        (acc: { [key: string]: SalesData[] }, curr: SalesData) => {
          const year = curr.year.toString();
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(curr);
          return acc;
        },
        {}
      );

      setGroupedData(newGroupedData);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [range.fromYear, range.toYear]);

  return (
    <SalesContext.Provider
      value={{ groupedData, loading, error, getData, range, setRange }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSalesContext = () => useContext(SalesContext);
export { SalesProvider };
