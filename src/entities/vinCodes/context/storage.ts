import { createContext, useContext } from "react";
import type { VinCodesData } from "../types";

export const EMPTY_VIN_DATA: VinCodesData = { codes: [], entities: {} };

type VinCodesContextValue = {
  data: VinCodesData;
  setData: React.Dispatch<React.SetStateAction<VinCodesData>>;
};

export const VinCodesContext = createContext<VinCodesContextValue | null>(null);

export function useVinCodesContext() {
  const ctx = useContext(VinCodesContext);
  if (!ctx) {
    throw new Error("useVinCodesContext must be used within VinCodesProvider");
  }
  return ctx;
}
