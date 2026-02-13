import { createContext, useContext } from "react";
import type { VariablesData } from "../types";

export const EMPTY_VARIABLES_DATA: VariablesData = { ids: [], entities: {} };

type VariablesContextValue = {
  data: VariablesData;
  setData: React.Dispatch<React.SetStateAction<VariablesData>>;
};

export const VariablesContext = createContext<VariablesContextValue | null>(
  null,
);

export function useVariablesContext() {
  const ctx = useContext(VariablesContext);
  if (!ctx) {
    throw new Error(
      "useVariablesContext must be used within VariablesProvider",
    );
  }
  return ctx;
}
