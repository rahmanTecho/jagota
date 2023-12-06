import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

const generateRandomPercentage = (): string =>
  `${(Math.random() * (30 - 5) + 5).toFixed(2)}%`;
const generateRandomValue = (): number => Math.floor(Math.random() * 20) + 1;
const generateRandomGrowth = (): string =>
  `${(Math.random() * 60 - 30).toFixed(2)}%`;
const generateRandomGap = (growth: string): string =>
  `${(parseFloat(growth) - Math.random() * 5).toFixed(2)}%`;

const createSalesData = (): SalesData[] => {
  const salesData: SalesData[] = [];
  const years = Array.from({ length: 6 }, (_, i) => 2018 + i);

  years.forEach((year) => {
    for (let i = 0; i < 12; i++) {
      const margin = generateRandomPercentage();
      const dist = Math.floor(Math.random() * 10) + 1;
      const budgetPercentage = generateRandomPercentage();
      const value = generateRandomValue();
      const growth = generateRandomGrowth();
      const gap = generateRandomGap(growth);

      salesData.push({
        year,
        margin,
        dist,
        budgetPercentage,
        value,
        growth,
        gap,
      });
    }
  });

  return salesData;
};

/**
 * GET /sales
 * Returns sales data
 * Query params:
 * - from: number
 * - to: number
 */
app.get("/api/sales", (req, res) => {
  const from = req.query.from ? parseInt(req.query.from as string) : undefined;
  const to = req.query.to ? parseInt(req.query.to as string) : undefined;
  const salesData = createSalesData();

  let filteredData = salesData;
  if (from !== undefined && to !== undefined) {
    filteredData = salesData.filter(
      (data) => data.year >= from && data.year <= to
    );
  } else if (from !== undefined) {
    filteredData = salesData.filter((data) => data.year >= from);
  } else if (to !== undefined) {
    filteredData = salesData.filter((data) => data.year <= to);
  }

  res.json(filteredData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
