import { BrowserRouter, Route, Routes } from "react-router";
import { routes } from "@/shared/config/routes";
import { Home } from "@/pages/Home";
import { Variables } from "@/pages/Variables";
import { VariableDetails } from "@/pages/VariableDetails";
import { VinCodesProvider } from "@/entities/vinCodes/context/provider";
import { VariablesProvider } from "@/entities/variables/context/provider";

export function App() {
  return (
    <VinCodesProvider>
      <VariablesProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.variables}>
              <Route index element={<Variables />} />
              <Route path={routes.variableId} element={<VariableDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </VariablesProvider>
    </VinCodesProvider>
  );
}
