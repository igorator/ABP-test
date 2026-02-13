import { createContext } from "react";
import type { VinCodesData } from "../types";

export type VinCodesContextValue = {
  data: VinCodesData;
  isLoading: boolean;
  error: string | null;
  getDetailsByCode: (vin: string) => Promise<void>;
};

export const VinCodesContext = createContext<VinCodesContextValue | null>(null);
