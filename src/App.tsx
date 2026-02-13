import { BrowserRouter, Route, Routes } from "react-router";
import { routes } from "@/shared/config/routes";
import { Home } from "@/pages/Home";
import { Variables } from "@/pages/Variables";
import { VariableDetails } from "@/pages/VariableDetails";
import {
  VinCodesContext,
  EMPTY_VIN_DATA,
} from "@/entities/vinCodes/context/storage";
import {
  VariablesContext,
  EMPTY_VARIABLES_DATA,
} from "@/entities/variables/context/storage";
import type { VinCodesData } from "@/entities/vinCodes/types";
import type { VariablesData } from "@/entities/variables/types";
import { useState } from "react";

export function App() {
  const [vinData, setVinData] = useState<VinCodesData>(EMPTY_VIN_DATA);
  const [variablesData, setVariablesData] =
    useState<VariablesData>(EMPTY_VARIABLES_DATA);

  return (
    <VinCodesContext.Provider value={{ data: vinData, setData: setVinData }}>
      <VariablesContext.Provider
        value={{ data: variablesData, setData: setVariablesData }}
      >
        <BrowserRouter>
          <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.variables}>
          <Route index element={<Variables />} />
          <Route path={routes.variableId} element={<VariableDetails />} />
        </Route>
          </Routes>
        </BrowserRouter>
      </VariablesContext.Provider>
    </VinCodesContext.Provider>
  );
}
