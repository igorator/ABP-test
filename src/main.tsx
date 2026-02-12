import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { routes } from "@/config/routes";
import { Home } from "@/pages/Home";
import { Variables } from "@/pages/Variables";
import { VariableDetails } from "@/pages/VariableDetails";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.variables}>
          <Route index element={<Variables />} />
          <Route path={routes.variableId} element={<VariableDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
