import React, { createContext, useContext, useState } from "react";
import { API_URL } from "../../common/constants";

type SalesContextType = {
  groupedData: { [key: string]: SalesData[] };
  loading: boolean;
  error: Error | null;
  getData: (from?: number, to?: number) => void;
};

const SalesContext = createContext<SalesContextType>({
  groupedData: {},
  loading: true,
  error: null,
  getData: () => {},
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

  const getData = async (from?: number, to?: number) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (from) query.append("from", from.toString());
      if (to) query.append("to", to.toString());
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

  return (
    <SalesContext.Provider value={{ groupedData, loading, error, getData }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSalesContext = () => useContext(SalesContext);
export { SalesProvider };
