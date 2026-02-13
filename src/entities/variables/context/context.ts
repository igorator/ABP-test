import { createContext } from "react";
import type { VariablesData } from "../types";

export type VariablesContextValue = {
  data: VariablesData;
  isLoading: boolean;
  error: string | null;
};

export const VariablesContext = createContext<VariablesContextValue | null>(
  null,
);
