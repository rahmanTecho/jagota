import React from "react";
import Dashbored from "./features/sales/Dashbored";
import { SalesProvider } from "./features/sales/SalesProvider";

const App = () => {
  return (
    <SalesProvider>
      <Dashbored />
    </SalesProvider>
  );
};

export default App;
