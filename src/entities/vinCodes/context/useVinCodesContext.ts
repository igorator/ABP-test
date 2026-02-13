import { useContext } from "react";
import { VinCodesContext } from "./context";

export function useVinCodesContext() {
  const ctx = useContext(VinCodesContext);
  if (!ctx) {
    throw new Error("useVinCodesContext must be used within VinCodesProvider");
  }
  return ctx;
}
