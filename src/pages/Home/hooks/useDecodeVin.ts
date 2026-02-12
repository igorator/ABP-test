import { useState, useCallback } from "react";
import { decodeVin } from "@/services/api";
import type { VinResult } from "@/types/vin";

type UseDecodeVinState = {
  results: VinResult[];
  vin: string;
  isLoading: boolean;
  error: string | null;
};

export function useDecodeVin() {
  const [state, setState] = useState<UseDecodeVinState>({
    results: [],
    vin: "",
    isLoading: false,
    error: null,
  });

  const decode = useCallback(async (vin: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await decodeVin(vin);

      if (
        response.Message.includes("Error") ||
        response.Message.includes("error")
      ) {
        setState({
          results: [],
          vin: "",
          isLoading: false,
          error: response.Message,
        });
        return { success: false, results: [] };
      }

      setState({
        results: response.Results,
        vin,
        isLoading: false,
        error: null,
      });

      return { success: true, results: response.Results };
    } catch (err) {
      const errorMessage = "Failed to decode VIN. Please try again.";
      setState({
        results: [],
        vin: "",
        isLoading: false,
        error: errorMessage,
      });
      console.error(err);
      return { success: false, results: [] };
    }
  }, []);

  return {
    ...state,
    decode,
  };
}
