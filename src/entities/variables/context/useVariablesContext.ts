import { useContext } from "react";
import { VariablesContext } from "./context";

export function useVariablesContext() {
  const ctx = useContext(VariablesContext);
  if (!ctx) {
    throw new Error(
      "useVariablesContext must be used within VariablesProvider",
    );
  }
  return ctx;
}
