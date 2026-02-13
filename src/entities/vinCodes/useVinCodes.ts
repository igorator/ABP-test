import { useState, useCallback } from "react";
import { decodeVin } from "./api";
import { vinCodesStorage } from "./storage";
import type { VinCodesData, VinResult } from "./types";

const MAX_HISTORY_ITEMS = 3;

type UseVinCodesState = VinCodesData & {
  isLoading: boolean;
  error: string | null;
};

export function useVinCodes() {
  const [state, setState] = useState<UseVinCodesState>(() => {
    const data = vinCodesStorage.getData();
    return { ...data, isLoading: false, error: null };
  });

  const addCode = useCallback(
    (vin: string, results: VinResult[], prev: UseVinCodesState) => {
      const codes = [vin, ...prev.codes.filter((code) => code !== vin)].slice(
        0,
        MAX_HISTORY_ITEMS,
      );
      const entities = { ...prev.entities, [vin]: results };

      vinCodesStorage.saveData({ codes, entities });
      return { codes, entities };
    },
    [],
  );

  const moveToTop = useCallback((vin: string, prev: UseVinCodesState) => {
    const codes = [vin, ...prev.codes.filter((code) => code !== vin)];

    vinCodesStorage.saveData({ codes, entities: prev.entities });
    return codes;
  }, []);

  const getDetailsByCode = useCallback(
    async (vin: string) => {
      if (state.entities[vin]) {
        setState((prev) => ({
          ...prev,
          codes: moveToTop(vin, prev),
          error: null,
        }));
        return;
      }

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const response = await decodeVin(vin);

        if (
          response.Message.includes("Error") ||
          response.Message.includes("error")
        ) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: response.Message,
          }));
          return;
        }

        setState((prev) => ({
          ...addCode(vin, response.Results, prev),
          isLoading: false,
          error: null,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to decode VIN. Please try again.",
        }));
        console.error(err);
      }
    },
    [state.entities, addCode, moveToTop],
  );

  const latestVin = state.codes[0];
  const details = latestVin
    ? (state.entities[latestVin] ?? []).filter((item) => item.Value)
    : [];

  return {
    codes: state.codes,
    getDetailsByCode,
    details,
    error: state.error,
    loading: state.isLoading,
  };
}
