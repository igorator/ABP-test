import { useState, useCallback } from "react";
import { decodeVin } from "../api/api";
import { useVinCodesContext } from "../context/storage";
import type { VinResult } from "../types";

const MAX_HISTORY_ITEMS = 3;

export function useVinCodes() {
  const { data, setData } = useVinCodesContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCode = useCallback((vin: string, results: VinResult[]) => {
    setData((prev) => {
      const codes = [...prev.codes.filter((code) => code !== vin)];
      const entities = { ...prev.entities };

      codes.unshift(vin);
      entities[vin] = results;

      if (codes.length > MAX_HISTORY_ITEMS) {
        const removedCode = codes.pop()!;
        delete entities[removedCode];
      }

      return { codes, entities };
    });
  }, [setData]);

  const moveToTop = useCallback((vin: string) => {
    setData((prev) => {
      const codes = [vin, ...prev.codes.filter((code) => code !== vin)];
      return { codes, entities: prev.entities };
    });
  }, [setData]);

  const getDetailsByCode = useCallback(
    async (vin: string) => {
      if (data.entities[vin]) {
        moveToTop(vin);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await decodeVin(vin);

        addCode(vin, response.Results);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to decode VIN";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [data.entities, addCode, moveToTop],
  );

  const latestVin = data.codes[0];
  const details = latestVin
    ? (data.entities[latestVin] ?? []).filter((item) => item.Value)
    : [];

  return {
    codes: data.codes,
    getDetailsByCode,
    details,
    error,
    loading: isLoading,
  };
}
