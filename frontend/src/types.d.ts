type SalesData = {
  margin: string;
  dist: number;
  budgetPercentage: string;
  value: number;
  growth: string;
  gap: string;
  year: number;
};

type SalesContextType = {
  data: { [key: string]: SalesData[] };
  loading: boolean;
  error: string | null;
  updateSalesData: (from: number, to: number) => Promise<void>;
};
